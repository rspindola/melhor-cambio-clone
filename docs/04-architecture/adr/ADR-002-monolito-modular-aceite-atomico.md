---
artifact: adr
version: "1.0"
created: 2026-11-03
status: complete
context: Estrutura do backend do MVP e garantia de vencedor único no primeiro aceite
---

# ADR-002: Backend NestJS em monólito modular, com PostgreSQL e aceite atômico

## Status

Accepted

**Date:** 2026-11-03
**Deciders:** Renato (produto), Tech Lead

## Context

O MVP tem uma equipe pequena, um piloto de 10 a 15 casas e meta de 30 trocas de contato em 90 dias. A carga prevista é de dezenas de ofertas, não de milhares por minuto. A stack é fixa: NestJS, PostgreSQL, Redis e Next.js.

A regra de negócio mais crítica é a do primeiro aceite (US-9, FR-23). A oferta tem um único vencedor, inclusive quando duas ou dez casas aceitam no mesmo segundo, quando o viajante cancela ao mesmo tempo e quando o prazo termina durante o clique. A casa que perde nunca vê nome, e-mail ou WhatsApp do viajante.

Há quatro capacidades com donos claros: o ciclo de vida da oferta, o cadastro e o acesso da casa, a entrega de notificações e o credenciamento interno. Nenhuma tem hoje escala, equipe ou falha independentes que justifiquem um serviço separado.

O repositório ainda não tem código. Esta decisão define a estrutura inicial.

## Decision

Vamos construir um único backend NestJS, organizado em módulos por capacidade, com um único PostgreSQL como fonte de verdade. O primeiro aceite será decidido por um `UPDATE` condicional no PostgreSQL, na mesma transação que grava o vencedor, a auditoria e as notificações pendentes. Redis não participa dessa decisão.

### Processos

A mesma base de código gera dois processos:

- **API:** HTTP para o Next.js, o painel da casa e a área interna.
- **Worker:** consome filas, entrega notificações e roda o job agendado de expiração de ofertas.

Os dois são o mesmo monólito e o mesmo deploy, com entrypoints diferentes. Separar o worker impede que um provedor de e-mail lento atrase o aceite.

### Módulos e donos

| Módulo | Dono de | Expõe para outros módulos | Depende de |
| --- | --- | --- | --- |
| `ofertas` | Tabela de ofertas, estados `ABERTA`/`ACEITA`/`EXPIRADA`/`CANCELADA`, cálculo da expiração em horas úteis, token do viajante, aceite, cancelamento, expiração, exclusão manual de dados pessoais quando o admin acionar (FR-31), auditoria da oferta | Consulta de auditoria para `admin` | `casas`, `notificacoes` |
| `casas` | Casas, operadores, sessões, cotações, vitrine pública, elegibilidade | Verificação de elegibilidade dentro de uma transação, destinatários de alerta, serviço de credenciamento, guarda de sessão | Nenhum módulo de negócio |
| `notificacoes` | Caixa de saída (outbox), entregas, adaptadores de e-mail e WhatsApp, filas | Registro de evento dentro de uma transação | Nenhum módulo de negócio |
| `admin` | Rotas internas de credenciamento, consulta e exclusão manual de dados pessoais de oferta (FR-31) | Nada | `casas`, `ofertas` |

O grafo é acíclico: `admin` depende de `casas` e `ofertas`; `ofertas` depende de `casas` e `notificacoes`; `casas` e `notificacoes` não dependem de módulo de negócio. `forwardRef()` não é usado. Um ciclo novo é sinal de que alguma responsabilidade está no módulo errado.

Cada módulo exporta só o serviço de aplicação listado acima. Repositórios e entidades ficam privados. Nenhum módulo grava em tabela de outro. `admin` grava casas chamando o serviço de credenciamento de `casas`.

`notificacoes` não lê ofertas. Quem registra o evento entrega destinatário e conteúdo prontos. Isso evita o ciclo entre `ofertas` e `notificacoes` e coloca a decisão de quem pode receber dado pessoal no módulo que é dono desse dado.

### Banco

- Um PostgreSQL. Um schema por módulo: `ofertas`, `casas`, `notificacoes`. Chaves estrangeiras entre schemas são permitidas para integridade (por exemplo, a casa vencedora referencia a casa). Escrita cruzada não é.
- Migrações versionadas no repositório, aplicadas antes da nova versão da API subir.
- Horários gravados em `timestamptz`. O relógio de negócio vem de um provedor de tempo injetável no NestJS. As consultas de prazo recebem esse instante como parâmetro, para os testes de fronteira de US-3 fixarem o relógio.
- A biblioteca de acesso a dados é escolhida na implementação. O requisito é suportar transações explícitas, `UPDATE ... RETURNING`, `SELECT ... FOR SHARE` e SQL parametrizado quando a abstração não alcançar.

### Primeiro aceite

Numa única transação, no isolamento padrão `READ COMMITTED`:

1. Ler a oferta para obter cidade e moeda.
2. `casas` verifica, na mesma transação, se a casa e o operador estão ativos e se a casa opera aquela cidade e moeda. A linha da casa é lida com `FOR SHARE`, para uma desativação simultânea esperar o aceite ou vencer antes dele.
3. Fazer a transição condicional:

```sql
UPDATE ofertas.oferta
SET status = 'ACEITA',
    casa_vencedora_id = $casa_id,
    operador_vencedor_id = $operador_id,
    taxa_aceita = COALESCE(taxa_desejada, $taxa_informada),
    aceita_em = $agora
WHERE id = $oferta_id
  AND status = 'ABERTA'
  AND expira_em > $agora
RETURNING id;
```

4. Com uma linha retornada, a casa venceu. Na mesma transação: registrar a auditoria do aceite e o evento de WhatsApp do viajante na caixa de saída de `notificacoes`.
5. Com zero linhas retornadas, a casa perdeu. Reler o estado para responder "Oferta já atendida por outra casa", "Oferta expirada" ou "Oferta cancelada". Registrar a tentativa perdida na auditoria, sem dado do viajante, e confirmar a transação.

No PostgreSQL, dois `UPDATE` sobre a mesma linha se serializam pelo lock de linha. O segundo espera o primeiro confirmar e reavalia o `WHERE` contra a versão nova. Com `status = 'ACEITA'`, ele não encontra a linha. Esse é o único mecanismo de exclusão do aceite.

Cancelamento e expiração usam a mesma forma, para disputarem a mesma linha com as mesmas regras:

- Cancelamento: `WHERE id = $id AND token_hash = $hash AND status = 'ABERTA' AND expira_em > $agora`.
- Expiração em lote: `WHERE status = 'ABERTA' AND expira_em <= $agora RETURNING id`, registrando o aviso por e-mail de cada oferta retornada.

A resposta da casa perdedora é montada sem ler nome, e-mail ou WhatsApp. O contato só é carregado depois de uma linha retornada no passo 4.

### Outras garantias no banco

- **Uma oferta aberta por WhatsApp (FR-10):** índice único parcial em `whatsapp_e164` com `status = 'ABERTA'`. Se o conflito vier de uma oferta já vencida e ainda não marcada, a criação expira essa oferta na mesma transação e tenta de novo uma vez.
- **Clique duplo na criação (FR-11):** chave de idempotência gerada no formulário, com índice único.
- **Estados terminais (FR-13):** restrição de checagem no `status`. Toda mudança passa por `UPDATE` condicionado a `status = 'ABERTA'`.

## Consequences

### Positive

- O vencedor único depende de uma garantia nativa e testável do PostgreSQL. Não depende de TTL de lock, relógio de outro servidor ou ordem de mensagens.
- Aceite, auditoria e evento de notificação são confirmados juntos ou desfeitos juntos.
- Um deploy, um banco e um log simplificam a operação de uma equipe pequena.
- Os limites de módulo deixam uma extração futura possível, se um dia houver motivo.

### Negative

- Módulos no mesmo processo não impedem, sozinhos, uma importação proibida. A regra precisa de teste de arquitetura.
- O `UPDATE` condicional e o `FOR SHARE` puxam SQL explícito para a camada de persistência. A biblioteca de acesso a dados não esconde essa parte.
- Banco e API são pontos únicos de falha no piloto. A indisponibilidade derruba todo o produto.

### Neutral

- Redis fica com filas, agendamento e limite de tentativas de login (ADR-003 e ADR-004). Perder Redis atrasa notificações. Não corrompe ofertas.
- O cálculo de 4 horas úteis é uma função pura do módulo `ofertas`. O resultado é gravado em `expira_em` na criação e só é comparado depois.

### Verificação

- Teste de integração contra PostgreSQL real, sem mock do banco: 10 aceites simultâneos produzem exatamente uma linha `ACEITA` e nove respostas de oferta já atendida.
- Testes de corrida: aceite contra cancelamento, aceite contra expiração no instante `expira_em`, aceite contra desativação da casa.
- Teste de contrato: a resposta da casa perdedora não contém nome, e-mail nem WhatsApp.
- Teste de arquitetura no CI: falha com importação fora do grafo da tabela de módulos, ou com acesso a repositório privado de outro módulo.
- Teste de migração: o índice único parcial bloqueia uma segunda oferta `ABERTA` do mesmo WhatsApp.

## Alternatives Considered

### Lock distribuído no Redis

Exigiria TTL, renovação e tratamento de expiração do lock no meio do aceite. Um lock perdido por pausa de processo permitiria dois vencedores, e o PostgreSQL continuaria precisando da verificação final. Rejeitado como garantia: soma complexidade sem eliminar a condição de corrida.

### Ler, verificar e gravar na aplicação

Ler `status = 'ABERTA'`, decidir em código e depois gravar abre uma janela entre a leitura e a escrita. Rejeitado, porque é exatamente a corrida de US-9-AC-3.

### `SELECT ... FOR UPDATE` seguido de `UPDATE`

Também é correto. Foi preterido porque tem duas instruções e mais chances de alguém retirar o lock numa refatoração. O `UPDATE` condicional decide e grava de uma vez.

### Microsserviços por capacidade

Não há equipe, escala, dado ou falha independentes no piloto. Rejeitado: acrescentaria transações distribuídas para resolver um problema que hoje não existe.

## References

- [PRD v1.1](../../03-product/prd.md): FR-10, FR-11, FR-13, FR-15, FR-16, FR-22 a FR-24, FR-28, Technical Considerations
- [Critérios de aceite](../../03-product/acceptance-criteria.md): US-3-AC-10, US-3-AC-11, US-9-AC-3 a US-9-AC-15
- [ADR-001](ADR-001-comunicacao-sem-custodia.md): dados que o esquema pode conter
- [ADR-003](ADR-003-polling-notificacoes-link-privado.md): caixa de saída, filas e token do viajante
- [ADR-004](ADR-004-autenticacao-operador-sessao.md): sessão e credenciamento
- PostgreSQL, *Transaction Isolation*, `READ COMMITTED`: https://www.postgresql.org/docs/current/transaction-iso.html
