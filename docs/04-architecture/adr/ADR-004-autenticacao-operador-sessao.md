---
artifact: adr
version: "1.0"
created: 2026-11-03
status: complete
context: Login do operador da casa, sessão de uma jornada comercial e credenciamento interno
---

# ADR-004: Autenticação do operador e sessão comercial

## Status

Accepted

**Date:** 2026-11-03
**Deciders:** Renato (produto), Tech Lead

## Context

O operador da casa usa o painel no balcão, muitas vezes pelo celular, durante uma jornada comercial. Ele entra com e-mail e senha, sem MFA no MVP (FR-17). A sessão não pode cair no meio do expediente. Por decisão de produto, ela expira após 10 horas sem ação do operador.

Uma casa ou um operador desativado precisa perder o acesso na hora: deixa de ver a fila e de aceitar ofertas (FR-28, US-7-AC-5, US-9-AC-11). O contato do viajante só é lido por operador da casa vencedora (FR-29).

O credenciamento é feito pelo fundador, depois de conferir a casa na lista oficial do Banco Central (FR-27). Não há autocadastro nem recuperação de senha por autoatendimento.

O frontend é Next.js e o backend é NestJS (ADR-002).

## Decision

### Sessão no servidor com cookie HTTP-only

Vamos usar sessão no servidor, identificada por um cookie opaco. Não vamos usar JWT.

- No login bem-sucedido, a API gera um identificador aleatório de 32 bytes e grava o hash dele em `casas.sessao`, com operador, criação, última ação e revogação.
- O cookie traz só esse identificador: `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`. O JavaScript do painel não lê o cookie.
- A sessão é válida enquanto `ultima_acao_em + 10 horas` for maior que o instante atual, a sessão não estiver revogada e o operador e a casa estiverem ativos.
- Toda requisição autenticada passa por uma guarda do módulo `casas` que confere essas condições numa consulta indexada.
- Uma ação do operador renova `ultima_acao_em`: navegar, abrir a fila manualmente, aceitar, publicar cotação. A consulta periódica de 30 segundos é passiva e não renova (ADR-003). A gravação de renovação é limitada a uma por minuto por sessão.
- Login cria uma sessão nova e invalida o identificador anterior daquele navegador. Logout revoga a sessão.
- Desativar a casa ou o operador revoga todas as sessões afetadas, na mesma transação da desativação. A guarda também confere o estado ativo em cada requisição.

### Mesma origem para o cookie

O Next.js reescreve `/api/*` para o NestJS. O navegador fala com uma única origem, o cookie é primário e a API não precisa de CORS com credenciais.

Requisições que mudam estado exigem, além do cookie, a verificação do cabeçalho `Origin` contra a origem configurada. `SameSite=Lax` sozinho não fica como única defesa contra CSRF.

### Senha e tentativas

- Senhas são armazenadas com Argon2id, com parâmetros configurados e revistos no início da implementação.
- O limite de tentativas é por e-mail e por IP, com contadores no Redis. Perder o Redis afrouxa o limite temporariamente e não autentica ninguém.
- A mensagem de falha é a mesma para e-mail inexistente e senha errada (US-7-AC-3).

### Papéis

- `OPERADOR`: pertence a uma casa e só acessa a fila, as cotações, o histórico e o contato das ofertas que a própria casa venceu.
- `ADMIN`: não pertence a casa e acessa somente as rotas do módulo `admin`.
- A guarda de papel fica nas rotas. A autorização por casa fica nas consultas: toda leitura de contato do viajante filtra pela casa vencedora da sessão.
- A primeira conta `ADMIN` é criada por um comando de linha de comando no ambiente, não por uma tela. Não há rota pública para criar `ADMIN`.

### Credenciamento

1. O fundador confere a autorização da casa na lista oficial do Banco Central.
2. Na área `admin`, ele grava o cadastro de FR-27, inclusive a data e a referência dessa conferência.
3. Ele cria o operador. O administrador define a senha inicial e a repassa à casa por um canal seguro fora da plataforma. O sistema armazena só o hash.
4. Se o operador esquecer a senha, o administrador define uma nova senha pelo mesmo caminho.
5. Desativar casa ou operador é uma ação de `admin`. A desativação revoga as sessões e mantém aceites antigos válidos.

Todas as gravações de credenciamento passam pelo serviço exportado por `casas`. O módulo `admin` não grava tabela de `casas` diretamente (ADR-002).

## Consequences

### Positive

- Desativação e logout têm efeito na próxima requisição, sem lista de bloqueio nem espera de expiração de token.
- O cookie HTTP-only mantém o identificador longe de JavaScript de terceiros na página.
- Uma jornada das 9h às 18h, só acompanhando a fila, fica dentro das 10 horas sem novo login.
- O credenciamento não depende de envio de e-mail nem de fluxo de recuperação para o piloto começar.

### Negative

- Cada requisição autenticada consulta a sessão no PostgreSQL. No volume do piloto, isso é aceitável e indexado.
- Um operador que esquece o painel aberto num computador compartilhado deixa a sessão válida por até 10 horas desde a última ação. Sem MFA, uma senha vazada dá acesso à fila e aos contatos já vencidos por aquela casa.
- A senha inicial repassada fora da plataforma depende do cuidado do fundador e da casa no canal usado.

### Neutral

- A guarda de sessão e o modelo de papéis servem também ao `admin`. Não há um segundo mecanismo de autenticação.
- MFA, recuperação por autoatendimento e autocadastro de casa ficam para depois do piloto, com novo ADR se entrarem.

### Verificação

- Teste da guarda com relógio fixo: sessão com última ação há 9h59 é aceita e renovada; com última ação há 10h00 é recusada.
- Teste: a consulta periódica não altera `ultima_acao_em`.
- Teste: desativar casa ou operador recusa a próxima requisição de todas as sessões afetadas.
- Teste de autorização: operador de outra casa não lê contato, e operador de casa não acessa rota `admin`.
- Teste do cookie: atributos `HttpOnly`, `Secure` e `SameSite=Lax`, e recusa de mutação com `Origin` diferente da origem configurada.
- Teste de senha: o armazenamento contém só hash Argon2id. O operador entra com a senha definida pelo administrador, sem fluxo obrigatório de troca no primeiro acesso.

## Alternatives Considered

### JWT de 10 horas

Validaria a sessão sem consultar o banco. Foi rejeitado porque revogar no momento da desativação exigiria lista de bloqueio, que é estado no servidor de qualquer forma. Também seria preciso reemitir o token a cada ação para manter a inatividade deslizante.

### Sessão no Redis

Seria rápida e com expiração nativa. Foi rejeitada porque a revogação na desativação acontece na mesma transação do PostgreSQL. Com sessão no Redis, uma falha entre os dois sistemas deixaria uma sessão viva para uma casa já desativada.

### Login com link por e-mail para o operador

Eliminaria a senha. Foi rejeitado porque o atendente no balcão perderia tempo procurando e-mail a cada sessão, e porque criaria dependência de e-mail para entrar no painel.

### Autocadastro da casa com aprovação posterior

Reduziria trabalho manual. Foi rejeitado porque a conferência na lista do Banco Central é feita pelo fundador e o piloto tem poucas casas. Uma casa sem conferência não pode receber oferta.

## References

- [PRD v1.1](../../03-product/prd.md): FR-17, FR-26 a FR-29
- [Histórias](../../03-product/user-stories.md): US-7, US-10, US-12
- [Critérios de aceite](../../03-product/acceptance-criteria.md): US-7, US-10, US-12
- [ADR-002](ADR-002-monolito-modular-aceite-atomico.md): módulos e donos das gravações
- [ADR-003](ADR-003-polling-notificacoes-link-privado.md): consulta periódica passiva
- OWASP, *Session Management Cheat Sheet*: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP, *Password Storage Cheat Sheet*: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
