---
artifact: adr
version: "1.0"
created: 2026-11-03
status: complete
context: Atualização do painel da casa, entrega de e-mail e WhatsApp e acompanhamento sem login pelo viajante
---

# ADR-003: Polling HTTP no painel, notificações assíncronas e link privado do viajante

## Status

Accepted

**Date:** 2026-11-03
**Deciders:** Renato (produto), Tech Lead

## Context

A casa precisa ver uma oferta nova em até 30 segundos com o painel aberto (FR-21) e receber e-mail mesmo com o painel fechado (FR-20). O guarda-corpo de escopo proíbe pregão em tempo real e WebSocket no MVP. O piloto tem de 10 a 15 casas, com poucos operadores cada.

O viajante não tem conta. Ele recebe por e-mail o link de acompanhamento e o aviso de expiração, e por WhatsApp o alerta de aceite (FR-12, FR-15, FR-25). Quem tem o link vê o status e pode cancelar uma oferta aberta. Por isso o link funciona como uma credencial.

E-mail e WhatsApp são provedores externos, lentos e instáveis. A falha deles não pode desfazer um aceite já confirmado nem bloquear a resposta ao operador (ADR-002).

## Decision

### Painel da casa por polling

- O painel faz `GET` da fila de ofertas da casa a cada 30 segundos, com o intervalo configurável. A resposta traz só ofertas `ABERTA`, ainda dentro do prazo, da cidade da casa e de moedas que ela opera, sem nome, e-mail ou WhatsApp do viajante (FR-19).
- O navegador destaca as ofertas cujo identificador ainda não tinha visto e toca um som curto, uma vez, se o operador ligou o alerta sonoro nesta visita (FR-21).
- A consulta periódica é marcada como passiva e não renova a sessão do operador (ADR-004).
- Não há WebSocket, Server-Sent Events, push do navegador nem fila de mensagens para o navegador.

Ordem de grandeza: 15 casas, 3 operadores por casa e 2 consultas por minuto dão cerca de 90 requisições por minuto. Uma consulta indexada por cidade, moeda e status atende essa carga sem cache.

### Notificações com caixa de saída

1. O módulo que muda o estado registra o evento em `notificacoes.caixa_saida`, na mesma transação da mudança. Exemplos: oferta criada gera o link do viajante e o alerta das casas; aceite gera o WhatsApp do viajante; expiração gera o e-mail do viajante.
2. Um relay no worker lê eventos pendentes e os coloca em filas BullMQ sobre Redis: `email` e `whatsapp`. O identificador do evento é o identificador do job.
3. Cada destinatário ganha uma linha em `notificacoes.entrega`, com chave única por evento e destinatário. Reprocessamento não envia segunda mensagem (FR-20, US-4-AC-2, US-6-AC-2).
4. As tentativas usam espera exponencial, com número máximo configurado. Esgotado esse número, a entrega fica `FALHOU`, visível para a operação interna. O estado da oferta não muda por causa disso.
5. E-mail e WhatsApp ficam atrás de duas portas em `notificacoes`, com um adaptador por provedor. Os provedores ainda não foram escolhidos, e as portas também são a costura de teste.

| Evento | Canal | Destinatário |
| --- | --- | --- |
| Oferta criada | E-mail | Viajante, com o link de acompanhamento |
| Oferta criada | E-mail | Operadores ativos das casas elegíveis, sem dado do viajante |
| Oferta aceita | WhatsApp | Viajante, com os dados da casa vencedora |
| Oferta expirada | E-mail | Viajante, com o link de acompanhamento |

O alerta das casas é endereçado pelo módulo `casas` no momento da criação: o evento já sai com a lista de destinatários. `notificacoes` nunca escolhe quem recebe um dado pessoal.

O prazo de retenção de nome, e-mail e WhatsApp está pendente de análise jurídica (FR-31). Não há job que apague esses dados. No piloto, se a exclusão for necessária, o administrador a dispara manualmente. A ação apaga o dado pessoal da oferta e das entregas já gravadas, e invalida o token.

### Jobs agendados

- **Expiração:** a cada minuto, um job do worker roda o `UPDATE` em lote de ADR-002 e registra o e-mail de cada oferta expirada. Isso atende ao limite de 5 minutos de FR-15. O aceite verifica o prazo sozinho, então um job atrasado não deixa uma oferta vencida ser aceita.
- O agendamento usa o agendador do BullMQ, com execução única por intervalo, mesmo com mais de um worker. O único job recorrente do piloto é a expiração.

### Link privado do viajante

- O token é um valor aleatório de 32 bytes, gerado por gerador criptograficamente seguro e codificado em base64url. Ele vai no caminho do link: `/oferta/{token}`.
- O banco guarda só o hash SHA-256 do token. O token não é cifrado nem reversível. Quem lê o banco não reconstrói o link.
- O token não carrega dado nenhum. Não há JWT, identificador de oferta nem e-mail embutido.
- A página de status responde com `Cache-Control: no-store` e `Referrer-Policy: no-referrer`. O token não aparece em log de aplicação, em mensagem de erro nem em ferramenta de monitoramento.
- Token inexistente ou invalidado por exclusão manual responde como oferta não encontrada, sem diferenciar os dois casos.
- A rota do token tem limite de requisições por IP.
- O token vale enquanto os dados pessoais da oferta existirem. Cancelar exige o token e `status = 'ABERTA'` (ADR-002). A exclusão manual pelo administrador invalida o token (FR-31).

## Consequences

### Positive

- Não há conexão persistente, gateway de WebSocket nem estado de conexão para escalar ou monitorar.
- Uma oferta nova chega ao painel em até 30 segundos com um `GET` simples, fácil de testar e de depurar.
- Falha de provedor ou de Redis atrasa a mensagem, mas não perde evento, porque a caixa de saída está no PostgreSQL. Também não desfaz aceite.
- Vazamento do banco não entrega links utilizáveis.

### Negative

- O painel pode mostrar uma oferta até 30 segundos depois de ela existir. Uma casa com o painel aberto pode clicar numa oferta que outra já ganhou e receber "Oferta já atendida por outra casa". Isso é aceito.
- Quem obtém o link do viajante, por encaminhamento ou por um dispositivo compartilhado, vê o status e pode cancelar a oferta enquanto ela estiver aberta. Não há segundo fator para o viajante.
- O relay, as filas e os jobs são mais uma peça para monitorar: atraso da caixa de saída e entregas `FALHOU` precisam de alerta.

### Neutral

- A escolha dos provedores de e-mail e WhatsApp continua em aberto no PRD. Trocar de provedor é trocar um adaptador.
- O WhatsApp depende de template aprovado pela Meta. Enquanto não houver aprovação, o aceite aparece na página de status e a entrega fica pendente.

### Verificação

- Teste do relay: um evento confirmado gera um único job, mesmo quando o relay roda duas vezes.
- Teste de idempotência: reprocessar uma entrega já enviada não chama o provedor de novo.
- Teste de falha: com o adaptador falhando, a oferta continua `ACEITA` e a entrega termina `FALHOU`.
- Teste do job de expiração com relógio fixo, incluindo a corrida com aceite descrita em ADR-002.
- Teste de contrato: a fila da casa e o e-mail da casa não contêm nome, e-mail nem WhatsApp do viajante.
- Teste de segurança: só o hash do token é gravado, e um token alterado responde como não encontrado.
- Verificação manual no navegador: oferta nova em até 30 segundos, com destaque, e som só depois de ativado.

## Alternatives Considered

### WebSocket ou Server-Sent Events

Entregariam a oferta em menos de um segundo. Foram rejeitados porque o guarda-corpo proíbe pregão em tempo real no MVP, exigem estado de conexão, balanceamento com afinidade e reconexão, e a vantagem de alguns segundos não muda a regra do primeiro aceite.

### Enviar e-mail e WhatsApp dentro da requisição

Seria mais simples no início. Foi rejeitado porque o tempo do provedor entraria no aceite, e uma falha depois de confirmar o banco perderia a mensagem sem rastro.

### Login com senha ou link mágico para o viajante

Daria mais controle sobre quem vê a oferta. Foi rejeitado porque o PRD dispensa conta de viajante e porque um link mágico já seria, na prática, o mesmo token privado com uma etapa a mais.

### JWT assinado ou token cifrado no link

Permitiria validar sem consultar o banco. Foi rejeitado porque o link precisa de revogação na exclusão manual e o status sempre vem do banco. Um token com conteúdo também expõe mais do que um valor aleatório.

## References

- [PRD v1.1](../../03-product/prd.md): FR-12, FR-15, FR-19 a FR-21, FR-25, FR-31
- [Critérios de aceite](../../03-product/acceptance-criteria.md): US-3, US-4, US-6, US-8, US-9-AC-14
- [ADR-002](ADR-002-monolito-modular-aceite-atomico.md): transações e `UPDATE` condicional
- [ADR-004](ADR-004-autenticacao-operador-sessao.md): requisição passiva e sessão do operador
- BullMQ, documentação oficial: https://docs.bullmq.io/
