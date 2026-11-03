---
artifact: adr
version: "1.5"
created: 2026-11-03
status: proposed
---

# ADR-0006: Controle de Concorrência Transacional no Match de Ofertas

## Status

Proposed

**Date:** 2026-11-03  
**Deciders:** Em discussão pela equipe técnica e de produto

## Context

No marketplace de câmbio (reposicionado na v1.5 como plataforma de comunicação e mensageria inspirada no Melhor Câmbio), o mecanismo de leilão estabelece uma regra de negócio crítica: **se uma casa aceita exatamente a oferta original do cliente, há match automático de atendimento e a primeira a aceitar vence ("first-come, first-served")**. A oferta é imediatamente encerrada para as demais. Da mesma forma, se o cliente aceita uma contraproposta pendente e vigente, o atendimento comercial é consolidado exclusivamente com aquela casa e todas as demais propostas concorrentes são encerradas em cascata.

Em momentos de volatilidade cambial ou para ofertas com valores expressivos, múltiplos operadores de diferentes casas de câmbio podem visualizar a notificação em tempo real e clicar no botão "Aceitar" simultaneamente (dentro da mesma janela de poucos milissegundos).

Se o sistema processasse esses aceites sem isolamento transacional estrito, ocorreria o grave problema de **double-matching**: duas casas acreditariam ter fechado o compromisso de atendimento para o mesmo cliente, gerando dois atendimentos conflitantes, frustração dos parceiros e quebra de credibilidade da plataforma.

Além disso, como o processamento de expiração de ofertas e propostas via worker assíncrono (BullMQ) está sujeito a atrasos ocasionais de fila (queue latency), a expiração não pode depender exclusivamente do worker: a transação de match deve validar o tempo de relógio atômico no banco de dados.

## Decision

Propõe-se que o controle de concorrência seja implementado diretamente na camada de banco de dados relacional (PostgreSQL), utilizando **transação ACID sob nível de isolamento READ COMMITTED com lock pessimista explícito (`SELECT ... FOR UPDATE`) e lock_timeout**:

1. **Configuração de Sessão Transacional:**
   - A transação é iniciada com isolamento padrão `READ COMMITTED`. Não é necessário usar `SERIALIZABLE` (o que geraria overhead desnecessário e exceções de serialização `40001` demandando retries complexos), pois o lock pessimista em nível de linha já serializa deterministicamente os acessos concorrentes à oferta.
   - Aplicação imediata de timeout de lock para evitar travamento de conexões do pool: `SET LOCAL lock_timeout = '2000ms'`.

2. **Bloqueio de Linha e Validação Atômica Abrangente:**
   - A linha da oferta é lida com bloqueio:
     ```sql
     SELECT id, status, expires_at 
     FROM offers 
     WHERE id = :offerId 
     FOR UPDATE;
     ```
   - O service valida cumulativamente:
     - `offer.status === 'ABERTA'`;
     - `offer.expires_at > clock_timestamp()` (utilizando estritamente a função `clock_timestamp()` do PostgreSQL. No PostgreSQL, a função `NOW()` ou `CURRENT_TIMESTAMP` retorna o timestamp de início da transação — `transaction_timestamp()` — e permanece estática; se uma requisição aguardar na fila de lock pessimista por centenas de milissegundos ou segundos, `NOW()` estará defasado no momento em que o lock for adquirido. Já `clock_timestamp()` devolve o horário real corrente no exato instante da avaliação da cláusula, prevenindo que ofertas vencidas durante a espera de lock recebam match);
     - Casa de câmbio operadora possui status `APROVADA` no momento exato do aceite.
   - No caso de **aceite de contraproposta pelo cliente**, a proposta também é bloqueada e validada:
     ```sql
     SELECT id, status, expires_at, exchange_id 
     FROM proposals 
     WHERE id = :proposalId 
     FOR UPDATE;
     ```
     Validando que `proposal.status === 'PENDENTE'` e `proposal.expires_at > clock_timestamp()`.

3. **Comportamento em Caso de Requisição Rejeitada (Sem Mutação de Estado):**
   - Caso qualquer validação falhe (oferta já fechada, oferta/proposta expirada com `expires_at <= clock_timestamp()`, casa não aprovada ou não elegível), **a requisição rejeitada NÃO altera estado no banco de dados** (a transação é abortada com rollback limpo ou executada em modo somente leitura sem persistir mutação).
   - A transição do status da oferta para `EXPIRADA` e o encerramento em cascata de contrapropostas para `ENCERRADA` é responsabilidade estrita e assíncrona do **worker idempotente do BullMQ**, complementado por uma **varredura periódica de segurança** (background sweep job) no PostgreSQL.
   - Isso impede amplificação de concorrência ou contenção de escrita provocada por centenas de requisições rejeitadas tentando atualizar o mesmo registro. (Ver Alternativa 4 para discussão de transação própria).

4. **Mutação e Gravação de Auditoria Atômica:**
   - O status da oferta é atualizado para `FECHADA`;
   - No caso de contraproposta aceita, a proposta vitoriosa transiciona para `ACEITA`;
   - O registro na tabela de atendimentos (`atendimentos` / `negotiations`) é inserido vinculando `offer_id` e `exchange_id` com status inicial `EM_ATENDIMENTO`;
   - Todas as demais propostas vinculadas à oferta com status `PENDENTE` transitam para `ENCERRADA`, registrando o motivo específico do encerramento (padronizado em toda a documentação: `MATCH_OUTRA_CASA`, `OFERTA_EXPIRADA`, `OFERTA_CANCELADA` ou `CASA_SUSPENSA`);
   - O log de auditoria é inserido na tabela `audit_logs` **dentro da mesmíssima transação**, garantindo consistência estrita entre o evento e sua rastreabilidade.

5. **Notificações Pós-Commit:**
   - Os eventos de WebSocket (`match:confirmed`, `offer:closed`, `proposal:closed`) e notificações multicanal **só são despachados após o commit bem-sucedido** da transação (via Transactional Outbox pattern ou evento emitido pós-commit). Isso impede o envio de notificações falsas em caso de rollback.

6. **Proteção em Profundidade na Camada de Schema:**
   - A tabela de atendimentos possui uma constraint estrutural: `UNIQUE (offer_id)`. Mesmo na hipótese remota de falha na lógica de lock, o banco rejeita qualquer segunda inserção com erro de violação de unicidade (`23505 unique_violation`).

## Consequences

### Positive

- **Prevenção robusta de double-matching:** A serialização determinística no banco impede que duas casas comitem aceite para a mesma oferta [HIPÓTESE – A VALIDAR com teste de carga].
- **Resiliência a atrasos de filas:** A validação contra `clock_timestamp()` do banco impede que ofertas vencidas sejam aceitas, independente de qualquer atraso nos workers do BullMQ e sem sofrer defasagem por tempo de espera na fila de lock.
- **Simplicidade operacional com READ COMMITTED:** Evita a complexidade e a taxa de abortos de transações associada ao nível `SERIALIZABLE`.
- **Auditoria garantida:** O evento transacional e sua trilha de auditoria são indissociáveis (comitam ou sofrem rollback juntos).

### Negative

- **Retenção de conexão sob concorrência:** Requisições concorrentes aguardam na fila de lock do PostgreSQL. Sob rajadas intensas, isso consome conexões do pool; o uso de `SET LOCAL lock_timeout = '2000ms'` mitiga esse risco abortando requisições excedentes.
- **Duração da transação:** O tempo de execução da transação de match (estimado em < 15ms) permanece como [HIPÓTESE – A VALIDAR com teste de carga].
- **Necessidade de idempotência:** Operações de retry de rede devem carregar cabeçalho de idempotência para evitar erros falsos de concorrência para o mesmo operador.

### Neutral

- A capacidade de escalar horizontalmente mantendo o banco como ponto central de verdade permanece como [HIPÓTESE – A VALIDAR com teste de carga].

## Alternatives Considered

### Alternativa 1: UPDATE Condicional Atômico (Sem SELECT FOR UPDATE prévio)
- **Mecanismo:**
  ```sql
  UPDATE offers 
  SET status = 'FECHADA', updated_at = clock_timestamp() 
  WHERE id = :offerId 
    AND status = 'ABERTA' 
    AND expires_at > clock_timestamp() 
  RETURNING *;
  ```
- **Comparação:**
  - *Vantagens:* Não mantém lock aberto entre um SELECT e um UPDATE; executa em uma única instrução SQL extremamente rápida.
  - *Desvantagens:* Torna mais complexa a atualização em cascata das contrapropostas (`proposals`) e a inserção simultânea do atendimento e auditoria caso seja necessário validar regras adicionais da casa na mesma transação.
  - *Avaliação:* Excelente candidato de otimização de performance. Ambas as abordagens mantêm a obrigatoriedade da constraint `UNIQUE(offer_id)` na tabela de atendimentos.

### Alternativa 2: Lock Distribuído em Memória via Redis (Redlock)
Descartado para o MVP devido à complexidade de gerenciar sincronia de relógio, leases expirados e tolerância a partições de rede.

### Alternativa 3: Isolamento SERIALIZABLE Global
Descartado porque `READ COMMITTED + FOR UPDATE` fornece exatamente o mesmo isolamento para a linha disputada sem gerar falhas de serialização em tabelas correlatas.

### Alternativa 4: Transação Própria Dedicada para Marcar Expiração em Requisição Rejeitada
- **Mecanismo:** Ao detectar `expires_at <= clock_timestamp()` durante uma tentativa de aceite, o backend abriria uma transação autônoma independente para forçar a atualização imediata da oferta para `EXPIRADA`.
- **Comparação:** 
  - *Desvantagens:* Em cenários de tráfego concorrente intenso (rajadas de dezenas de casas tentando aceitar no instante exato da expiração), disparar múltiplas transações de escrita concorrentes para marcar o mesmo registro geraria contenção e disputa de locks desnecessária no banco.
  - *Decisão:* Descartado. A requisição rejeitada opera em modo seguro sem alterar estado (retornando HTTP 410 Gone), confiando a transição de estado ao worker idempotente do BullMQ e à varredura periódica de segurança.

---

## Future Considerations / Removido do MVP na v1.5

### Extensão Automática de Oferta nos Minutos Finais ("Janela de Decisão")
- **Texto original (v1.4, Seção 7):** Previa a prorrogação automática da oferta por 5 minutos caso uma contraproposta chegasse nos minutos finais, com controle atômico via `extensions_count === 0` e lock pessimista para evitar extensões em cascata.
- **Razão da Remoção do MVP na v1.5:** Decisão de produto visando simplificar drasticamente o motor do pregão no MVP e evitar incentivos para extensão especulativa por operadores no final do prazo. A validade da oferta passa a ser rígida conforme configurada pelo cliente na publicação; as propostas têm validade restrita ao tempo remanescente da oferta. A conveniência de extensão poderá ser reavaliada na Fase 2 a partir do feedback real de uso das casas e clientes.

---

## References

- [Contexto Competitivo: Análise do Melhor Câmbio](../../01-discovery/competitive-context.md)
- [PRD - Seção de Regras de Negociação e Concorrência](../../03-product/prd.md)
- [Acceptance Criteria - AC-05 e AC-06](../../03-product/acceptance-criteria.md)
- PostgreSQL Documentation: Explicit Locking (`FOR UPDATE`) & Transaction Isolation

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Arquitetura | Versão inicial propondo controle de concorrência |
| 1.1 | 2026-11-03 | Equipe de Arquitetura | Alinhamento com revisão PM-Critic |
| 1.2 | 2026-11-03 | Equipe de Arquitetura | Status alterado para Proposed; lock_timeout e clock_timestamp() |
| 1.3 | 2026-11-03 | Equipe de Arquitetura | clock_timestamp() e requisições rejeitadas sem mutação de estado |
| 1.4 | 2026-11-03 | Equipe de Arquitetura | Detalhamento da concorrência na extensão automática de oferta |
| 1.5 | 2026-11-03 | Equipe de Arquitetura | Revisão v1.5: adequação da terminologia para "Atendimento Comercial" e status `EM_ATENDIMENTO`; remoção da Seção 7 (extensão automática de oferta) do escopo do MVP, migrada para "Future Considerations / Removido do MVP na v1.5" para simplificação do core de concorrência. |
