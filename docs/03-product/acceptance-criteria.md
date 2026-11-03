---
artifact: acceptance-criteria
version: "1.4"
created: 2026-11-03
status: draft
---

# Acceptance Criteria: Mecanismo de Negociação e Cenários Críticos de Borda (MVP)

## Story Context

Este documento define os critérios de aceitação executáveis (em formato `Given/When/Then`) para o motor central de negociação do marketplace de câmbio, integrando os requisitos do [PRD](prd.md), das [User Stories](user-stories.md) e as decisões técnicas de concorrência do [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md).

O escopo abrange o ciclo de vida completo de Ofertas, Contrapropostas e Negociações, detalhando o **caminho feliz**, a **tabela unificada de erros**, os **cenários críticos de concorrência e borda**, o tratamento de **estados de erro e degradação**, as **garantias não funcionais** e as **notificações multicanal**.

---

## Tabela Unificada de Códigos de Erro e Status HTTP

Todas as respostas de falha da API da plataforma seguem rigorosamente a padronização abaixo, com payload no formato `{ "error_code": string, "message": string, "details"?: object }`:

| Código de Erro (`error_code`) | HTTP Status | Mensagem Padrão / Comportamento |
|-------------------------------|-------------|----------------------------------|
| `OFFER_NOT_FOUND` | 404 Not Found | "Oferta não encontrada." |
| `OFFER_ALREADY_ACCEPTED` | 409 Conflict | "Esta oferta acabou de ser aceita por outra casa de câmbio." |
| `OFFER_CANCELED` | 409 Conflict | "Esta oferta foi cancelada pelo cliente e não aceita mais ações." |
| `OFFER_EXPIRED` | 410 Gone | "Esta oferta expirou e não aceita mais propostas ou aceites." |
| `OFFER_ALREADY_CLOSED` | 422 Unprocessable Entity | "A oferta já foi aceita e gerou uma negociação em andamento." |
| `OFFER_LIMIT_REACHED` | 422 Unprocessable Entity | "Limite de ofertas abertas simultâneas atingido. Cancele uma oferta ativa ou aguarde seu encerramento." |
| `PROPOSAL_NOT_FOUND` | 404 Not Found | "Contraproposta não encontrada." |
| `PROPOSAL_EXPIRED` | 400 Bad Request | "Esta contraproposta expirou e a casa não está mais vinculada a esta taxa." |
| `PROPOSAL_SUPERSEDED` | 409 Conflict | "Esta contraproposta foi substituída por uma versão mais recente da casa de câmbio." |
| `PROPOSAL_REVISION_LIMIT_REACHED` | 422 Unprocessable Entity | "Limite de 3 revisões de contraproposta para esta oferta foi atingido." |
| `PROPOSAL_COOLDOWN_ACTIVE` | 429 Too Many Requests | "Aguarde o intervalo de 30 segundos antes de submeter uma nova contraproposta." |
| `LOCK_TIMEOUT` | 503 Service Unavailable | "O sistema está processando alta demanda concorrente nesta oferta. Tente novamente." |
| `MFA_REQUIRED` | 403 Forbidden | "Autenticação multifator (MFA) obrigatória para este perfil." |
| `INSUFFICIENT_PERMISSIONS` | 403 Forbidden | "Seu perfil de usuário não possui permissão para executar esta operação." |
| `EXCHANGE_NOT_ELIGIBLE` | 403 Forbidden | "Casa de câmbio não elegível para a moeda, produto ou localidade informada." |
| `EXCHANGE_NOT_APPROVED` | 403 Forbidden | "Casa de câmbio não está aprovada para operar na plataforma." |
| `EXCHANGE_SUSPENDED` | 403 Forbidden | "Operações suspensas temporariamente para esta casa de câmbio." |
| `OFFER_VALUE_LIMIT_EXCEEDED` | 422 Unprocessable Entity | "Valor da oferta excede o teto máximo permitido para o piloto." |
| `OFFER_EXTENSION_LIMIT_REACHED` | 422 Unprocessable Entity | "Limite de extensões de prazo para esta oferta já foi atingido." |
| `VALIDATION_ERROR` | 400 Bad Request | "Dados da requisição inválidos ou incompletos." |

---

## 1. Happy Path (Fluxos Principais de Sucesso)

### AC-01: Publicação de Oferta Válida pelo Cliente
- **Given** que um cliente autenticado possui telefone verificado via OTP, CPF (PF) ou CNPJ (PJ) validado e quantidade de ofertas ativas inferior ao limite parametrizado ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **When** preenche todos os campos obrigatórios: Moeda = "USD", Operação = "COMPRA" (perspectiva do cliente), Valor = 1000.00 (abaixo do teto parametrizado), Taxa Desejada = R$ 5,40 por USD (expressa em valor total final tudo incluso, conforme recomendação em aberto nº 1; IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas), Produto = "PAPEL_MOEDA", Modalidade = "RETIRADA", Cidade = "SP", Região/Bairro = "Zona Sul - Moema", e Prazo = 30 minutos, e clica em "Publicar Oferta",
- **Then** o sistema:
  1. Cria o registro da oferta com status `ABERTA` e `extensions_count = 0`;
  2. Agenda um job assíncrono de expiração no BullMQ sincronizado com o campo `expires_at` no banco;
  3. Dispara o evento WebSocket `offer:new` como oferta anônima para as casas elegíveis da praça contendo apenas Moeda, Operação, Valor, Taxa Desejada (VET), Produto, Cidade, Região/Bairro e Modalidade (sem dados de identificação pessoal nem logradouro/CEP);
  4. Retorna status HTTP 201 Created com o payload da oferta e URL de acompanhamento.

### AC-02: Aceite Direto por Casa Elegível com Match Automático
- **Given** uma oferta com status `ABERTA` visível no painel da Casa A (status `APROVADA`, elegível para a praça e com operador autenticado via MFA [AC-29]),
- **When** o operador da Casa A preenche a decomposição informada pela casa (taxa de câmbio pura, IOF e eventuais tarifas informados pela casa apenas para fins de transparência; IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas), confirma no modal de resumo vinculante ([AC-30]) e clica em "Confirmar Aceite Vinculante",
- **Then** o sistema:
  1. Executa a operação sob controle de concorrência transacional no backend conforme [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md);
  2. Valida cumulativamente que o status da oferta é `ABERTA`, que `expires_at > clock_timestamp()` no relógio atômico em tempo real do banco de dados e que a casa operadora possui status `APROVADA`;
  3. Atualiza o status da oferta para `FECHADA`;
  4. Cria o registro na entidade de negociação com status `AGUARDANDO_PAGAMENTO_ENTREGA`;
  5. Atualiza todas as outras contrapropostas pendentes daquela oferta para `ENCERRADA` registrando o motivo auditado `MATCH_OUTRA_CASA`;
  6. Registra a trilha imutável no log de auditoria dentro da mesma transação e efetua o commit;
  7. Pós-commit: despacha evento WebSocket `match:confirmed` liberando os dados de contato bilaterais para o cliente e para a Casa A, e emite `offer:closed` para as demais casas.

### AC-03: Envio e Aceite de Contraproposta Estruturada
- **Given** uma oferta `ABERTA` do cliente (operação COMPRA de 1.000 USD) e a Casa B elegível (operador com MFA ativo),
- **When** a Casa B submete contraproposta estruturada com valor idêntico ao montante da oferta (1.000 USD - atendimento integral obrigatório no MVP), taxa de R$ 5,45 por USD, `prazo_validade_minutos` conforme parametrização, ponto/local de atendimento (loja física de Moema), e campos discriminados informados pela casa: IOF e eventuais tarifas da casa, totalizando o VET final em reais (IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas), e o cliente clica subsequentemente em "Aceitar Contraproposta da Casa B" confirmando no modal de resumo vinculante ([AC-30]),
- **Then** o sistema:
  1. No envio: persiste a proposta com status `PENDENTE`, calcula o Valor Efetivo Total (VET) em reais, define a validade efetiva como $\min(\text{validade\_proposta}, \text{validade\_oferta})$, emite WebSocket `proposal:new` para o cliente e mantém a oferta `ABERTA`;
  2. Na visualização: exibe a lista de contrapropostas ordenada condicionalmente pelo valor total em reais:
     - Operação `COMPRA`: ordenação **ascendente** (`ASC`, menor desembolso total em reais no topo);
     - Operação `VENDA`: ordenação **descendente** (`DESC`, maior valor total recebido em reais no topo);
  3. No aceite do cliente: abre transação atômica serializada conforme [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md), valida que a proposta B está `PENDENTE` e com `expires_at > clock_timestamp()`, atualiza a proposta B para `ACEITA`, transiciona a oferta para `FECHADA`, transiciona todas as outras propostas ativas daquela oferta para `ENCERRADA` (motivo auditado `MATCH_OUTRA_CASA`), cria a negociação no status `AGUARDANDO_PAGAMENTO_ENTREGA` e notifica todas as partes após o commit.

### AC-04: Conclusão Normal da Negociação
- **Given** uma negociação com status `AGUARDANDO_PAGAMENTO_ENTREGA`,
- **When** a casa de câmbio e o cliente confirmam a conclusão da operação cambial dentro da janela de execução acordada conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma) (recomendação: mesmo dia útil para papel-moeda [HIPÓTESE – A VALIDAR com as casas]), ou uma das partes confirma e a outra não contesta em até 24 horas úteis,
- **Then** o sistema atualiza o status da negociação para `CONCLUÍDA`, registra o timestamp de fechamento no log de auditoria e encerra o ciclo operacional da transação. Caso a janela de execução expire sem manifestação de conclusão, o sistema dispara o checkpoint bilateral de no-show ([AC-28]).

---

## 2. Edge Cases e Concorrência Transacional

### AC-05: Teste de Carga e Concorrência de Aceite Direto ($N$ Requisições Paralelas)
- **Given** uma oferta `#OF-100` com status `ABERTA`, e $N$ requisições paralelas concorrentes (ex.: $N \ge 10$) submetidas no mesmo milissegundo por operadoras de casas distintas,
- **When** as requisições de aceite direto atingem o backend simultaneamente,
- **Then** o sistema garante observavelmente:
  1. **Validação de Habilitação:** Cada requisição valida que a respectiva casa operadora possui status `APROVADA` e elegibilidade geográfica e de produto (qualquer casa inabilitada é imediatamente rejeitada com HTTP 403 `EXCHANGE_NOT_APPROVED` ou `EXCHANGE_NOT_ELIGIBLE`);
  2. **Exatamente 1 Vencedor:** Exatamente 1 (uma) requisição comita com sucesso (HTTP 200/201 OK), transicionando a oferta para `FECHADA`;
  3. **$N-1$ Conflitos Tratados:** Exatamente $N-1$ requisições concorrentes são abortadas e retornam status HTTP 409 Conflict com código `OFFER_ALREADY_ACCEPTED` e mensagem "Esta oferta acabou de ser aceita por outra casa de câmbio";
  4. **Unicidade de Negociação:** É criado exatamente 1 (um) registro na tabela de negociações vinculado à oferta `#OF-100` (assegurado por controle de concorrência e constraint `UNIQUE (offer_id)` no banco);
  5. **Idempotência de Retry:** Se a casa vencedora retransmitir a mesma requisição com a mesma chave de idempotência (`Idempotency-Key`), o sistema responde com a mesma confirmação de sucesso sem duplicar registros nem emitir erro 409;
  6. **Tratamento de Timeout de Espera de Conexão (`lock_timeout`):** Caso o tempo de espera na fila de serialização atinja o teto de timeout configurado na sessão do banco (conforme [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)), a transação excedente é abortada de forma limpa, liberando recursos do pool e retornando HTTP 503 Service Unavailable com código `LOCK_TIMEOUT` e mensagem padronizada.

### AC-06: Tentativa de Aceite em Oferta Expirada (Race Condition com Worker Assíncrono)
- **Given** uma oferta `#OF-200` cujo prazo limite de 30 minutos vence às `14:30:00.000` no relógio do banco de dados,
- **When** um operador clica em "Aceitar" às `14:30:00.100` enquanto o worker assíncrono do BullMQ está em fila de execução,
- **Then** o sistema:
  1. Na transação de aceite, avalia atômica e diretamente a condição contra o relógio em tempo real do banco de dados (`clock_timestamp()`);
  2. Detecta que o horário corrente já ultrapassou o `expires_at`, rejeitando imediatamente a requisição com HTTP 410 Gone, código `OFFER_EXPIRED` e mensagem "Esta oferta expirou e não aceita mais propostas ou aceites";
  3. **Comportamento sem alteração de estado na rejeição:** A requisição rejeitada **NÃO altera estado** no banco de dados (não realiza mutação nem lock de escrita concorrente);
  4. A efetiva transição da oferta para `EXPIRADA` e de suas propostas para `ENCERRADA` é processada pelo worker idempotente do BullMQ ou pela rotina de varredura periódica de segurança no banco de dados;
  5. Sob nenhuma hipótese uma oferta expirada transiciona para `FECHADA`.

### AC-07: Tentativa de Aceite de Contraproposta Expirada pelo Cliente
- **Given** que a Casa A submeteu a contraproposta `#PR-50` com `prazo_validade_minutos` = 10 minutos (vencimento às `10:15:00.000`),
- **When** o cliente tenta aceitar a proposta às `10:15:00.500` (tela mantida aberta sem refresh),
- **Then** o sistema:
  1. Na avaliação transacional de aceite, verifica a condição contra `clock_timestamp()` do banco;
  2. Identifica que a proposta atingiu o prazo de validade;
  3. **Comportamento sem alteração de estado na rejeição:** A requisição rejeitada **NÃO altera o estado** da proposta diretamente, abortando a transação;
  4. Retorna HTTP 400 Bad Request com código `PROPOSAL_EXPIRED` e mensagem "Esta contraproposta expirou e a casa não está mais vinculada a esta taxa";
  5. Mantém a oferta principal do cliente no status `ABERTA`, permitindo que ele continue aguardando outras contrapropostas ou novos aceites;
  6. A proposta é posteriormente marcada como `EXPIRADA` pelo worker ou job de varredura.

### AC-08: Tentativa de Cancelamento de Oferta pelo Cliente após Consolidação de Match
- **Given** uma oferta `#OF-300` com match confirmado e status `FECHADA` (gerando negociação em andamento),
- **When** o cliente tenta acionar o cancelamento da oferta (via API direta ou interface com cache desatualizado),
- **Then** o sistema:
  1. Avalia a regra da máquina de estados e impede a transição de `FECHADA` para `CANCELADA`;
  2. Rejeita a requisição com HTTP 422 Unprocessable Entity, código `OFFER_ALREADY_CLOSED`;
  3. Retorna a mensagem de erro padronizada: *"A oferta já foi aceita e gerou uma negociação em andamento. Para resolver divergências, acesse a tela de negociação ou solicite mediação de suporte."*;
  4. Mantém a negociação intacta no status `AGUARDANDO_PAGAMENTO_ENTREGA`.
  > [!NOTE]
  > O bloqueio do cancelamento unilateral pós-match visa resguardar a segurança jurídica e operacional da negociação iniciada [A VALIDAR COM ADVOGADO].

### AC-09: Casa de Câmbio Suspensa pelo Admin com Negociação em Curso
- **Given** uma negociação ativa no status `AGUARDANDO_PAGAMENTO_ENTREGA` entre um Cliente e a Casa C,
- **When** o Administrador altera o status da Casa C para `SUSPENSA` no painel de governança,
- **Then** o sistema:
  1. Imediatamente invalida todas as propostas `PENDENTE` da Casa C em outras ofertas ativas (motivo auditado `CASA_SUSPENSA`) e desconecta seus operadores dos canais de ofertas em tempo real;
  2. **Isolamento de Estado (Não reaproveitamento de DISPUTA):** Para a negociação em curso, o sistema **NÃO transiciona para `DISPUTA`**; em vez disso, retém a negociação em estado de pausa preventiva com flag própria `parceiro_suspenso: true` e motivo de auditoria `SUSPENSAO_PARCEIRO`;
  3. Apresenta ao cliente uma mensagem institucional neutra e preventiva: *"Sua negociação está temporariamente retida para verificação operacional da plataforma. Nossa equipe de suporte entrará em contato em breve para orientar os próximos passos."* [VALIDAR COM JURÍDICO];
  4. Abre notificação de alta prioridade no painel administrativo para análise de conformidade.
  > [!NOTE]
  > Permanece em aberto a decisão se o Administrador poderá conceder liberação manual para que negociações em andamento concluam normalmente quando a entrega já estiver adiantada [VALIDAR COM JURÍDICO].

### AC-17: Cancelamento de Oferta pelo Cliente vs. Aceite Direto Simultâneos
- **Given** uma oferta `ABERTA`, o cliente submetendo o cancelamento voluntário no exato milissegundo em que uma casa elegível submete o aceite direto,
- **When** ambas as requisições chegam simultaneamente ao backend sob controle de concorrência serializado ([ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)),
- **Then** o sistema:
  1. Se a transação de cancelamento obtiver a serialização primeiro: transiciona a oferta para `CANCELADA`, responde HTTP 200 OK ao cliente e rejeita a requisição da casa com HTTP 409 Conflict (`OFFER_CANCELED`);
  2. Se a transação de aceite obtiver a serialização primeiro: transiciona a oferta para `FECHADA`, gera a negociação, responde HTTP 200 OK à casa e rejeita a tentativa de cancelamento do cliente com HTTP 422 Unprocessable Entity (`OFFER_ALREADY_CLOSED`);
  3. Sob nenhuma condição ocorrem ambos os desfechos simultaneamente.

### AC-18: Aceite de Contraproposta pelo Cliente vs. Aceite Direto por Outra Casa Simultâneos
- **Given** uma oferta `ABERTA` com uma contraproposta pendente da Casa B, onde o cliente submete o aceite da contraproposta da Casa B no exato momento em que a Casa C submete o aceite direto da oferta original,
- **When** ambas as requisições disputam o fechamento da oferta no backend,
- **Then** o sistema:
  1. Serializa as operações no banco de dados de modo atômico;
  2. Se o aceite do cliente processar primeiro: consolida o match com a Casa B, fecha a oferta e rejeita o aceite direto da Casa C com HTTP 409 Conflict (`OFFER_ALREADY_ACCEPTED`);
  3. Se o aceite da Casa C processar primeiro: consolida o match direto com a Casa C, fecha a oferta, encerra a contraproposta da Casa B (`ENCERRADA` com motivo `MATCH_OUTRA_CASA`) e rejeita a tentativa do cliente com HTTP 409 Conflict (`OFFER_ALREADY_ACCEPTED`);
  4. Garante a criação de estritamente 1 negociação para a oferta.

### AC-19: Duplo Aceite Simultâneo de Contrapropostas pelo Cliente
- **Given** uma oferta com duas contrapropostas ativas (Proposta 1 e Proposta 2), e o cliente clicando em "Aceitar" em abas simultâneas ou por duplo clique acidental,
- **When** as duas requisições de aceite de propostas distintas atingem o endpoint em paralelo,
- **Then** o sistema:
  1. Processa a primeira requisição com sucesso, mudando a Proposta 1 para `ACEITA` e a oferta para `FECHADA`;
  2. Força a segunda requisição a ler o estado já atualizado da oferta (`FECHADA`);
  3. Rejeita imediatamente a segunda requisição com HTTP 422 Unprocessable Entity (`OFFER_ALREADY_CLOSED`);
  4. Garante que nenhuma segunda negociação seja criada para o mesmo cliente na mesma oferta.

### AC-20: Tentativa de Aceite de Proposta com Versão Desatualizada (`SUBSTITUÍDA`)
- **Given** que a Casa A emitiu a contraproposta `#PR-10` (versão 1) e, em seguida, emitiu uma nova contraproposta revisada (versão 2), transitando a versão 1 para `SUBSTITUÍDA`,
- **When** o cliente tenta aceitar a versão 1 enviando `{ "proposal_id": "PR-10", "version": 1 }` (mantida em tela aberta sem sincronização),
- **Then** o sistema:
  1. Verifica a tupla ID + versão na transação atômica;
  2. Detecta que o status da proposta na versão submetida não é mais `PENDENTE` (encontra-se `SUBSTITUÍDA`);
  3. Rejeita a operação com HTTP 409 Conflict, código `PROPOSAL_SUPERSEDED` e mensagem "Esta contraproposta foi substituída por uma versão mais recente da casa de câmbio";
  4. Retorna no payload os dados da nova contraproposta vigente (versão 2) para atualização imediata da interface do cliente.

### AC-21: Tentativa de Operação por Usuário com Perfil Financeiro
- **Given** um usuário autenticado na plataforma vinculado a uma casa de câmbio com role `FINANCEIRO`,
- **When** este usuário tenta invocar endpoints transacionais operacionais (`POST /offers/:id/accept` ou `POST /offers/:id/proposals`),
- **Then** o sistema:
  1. Intercepta a requisição na camada de autorização RBAC do backend;
  2. Bloqueia a execução antes de abrir qualquer conexão ou lock no banco;
  3. Retorna HTTP 403 Forbidden com código `INSUFFICIENT_PERMISSIONS` e mensagem "Seu perfil de usuário não possui permissão para executar esta operação";
  4. Registra a tentativa nos logs de segurança da plataforma.

### AC-22: Tentativa de Aceite ou Contraproposta por Casa Não Elegível ou Suspensa
- **Given** uma oferta publicada em São Paulo para moeda EUR e a Casa D que opera apenas no Rio de Janeiro com USD (ou que esteja com status `SUSPENSA`),
- **When** um operador da Casa D tenta forçar o envio de aceite direto ou contraproposta via API,
- **Then** o sistema:
  1. Valida a matriz de elegibilidade e o ciclo de vida da casa no banco;
  2. Se a casa não atender aos critérios de cidade, moeda ou produto: rejeita com HTTP 403 Forbidden, código `EXCHANGE_NOT_ELIGIBLE`;
  3. Se a casa estiver com cadastro no status `SUSPENSA` ou `EM_ANÁLISE`: rejeita com HTTP 403 Forbidden, código `EXCHANGE_SUSPENDED` ou `EXCHANGE_NOT_APPROVED`;
  4. Não cria nenhum registro de proposta nem altera o estado da oferta.

### AC-23: Concorrência na Criação de Ofertas no Limite Simultâneo por Cliente
- **Given** um cliente que já possui 2 ofertas com status `ABERTA` (estando a 1 oferta do limite de 3 ofertas simultâneas),
- **When** o cliente dispara em paralelo 2 requisições concorrentes de criação de nova oferta (`POST /offers`),
- **Then** o sistema:
  1. Serializa a checagem de ofertas ativas por cliente de forma atômica no banco de dados;
  2. Permite que exatamente 1 (uma) criação tenha sucesso, retornando HTTP 201 Created (completando o teto de 3 ofertas);
  3. Rejeita a requisição concorrente excedente com HTTP 422 Unprocessable Entity, código `OFFER_LIMIT_REACHED` e mensagem padronizada;
  4. Impede que o cliente mantenha 4 ofertas abertas simultâneas no banco.

### AC-24: Sincronização do Countdown de Expiração baseado no Horário do Servidor
- **Given** um cliente ou operador cuja máquina local apresente relógio descalibrado em relação ao horário oficial (ex.: relógio adiantado ou atrasado em 5 minutos),
- **When** acessa a tela de acompanhamento de oferta com contagem regressiva,
- **Then** o sistema:
  1. Entrega em todo payload de oferta/proposta o timestamp oficial do servidor (`server_timestamp`) juntamente com `expires_at`;
  2. O cliente web calcula o delta de desvio do relógio local e ancora a contagem regressiva estritamente no tempo restante real do servidor;
  3. Impede que o botão de aceite seja desabilitado precipitadamente ou mantido ativo erroneamente por divergência no relógio do sistema operacional do usuário.

### AC-25: Contraproposta nos Minutos Finais com Extensão Única da Oferta vs. Aceite Direto Concorrente
- **Given** uma oferta `#OF-400` com status `ABERTA` com vencimento em menos de 5 minutos e sem extensões prévias (`extensions_count = 0`),
- **When** a Casa A submete contraproposta que dispara a extensão automática no exato milissegundo em que a Casa B submete um aceite direto,
- **Then** a transação serializada no backend sob lock pessimista na oferta garante que:
  1. Se a contraproposta processar primeiro: adquire o lock na oferta, valida `status = 'ABERTA'`, verifica `extensions_count === 0`, atualiza `expires_at = expires_at + INTERVAL '5 minutes'`, atualiza `extensions_count = 1`, grava a proposta A como `PENDENTE`, emite WebSocket `offer:extended` e comita; o aceite direto da Casa B processa subsequentemente fechando a oferta estendida com sucesso (HTTP 200/201 OK);
  2. Se o aceite direto processar primeiro: fecha a oferta (`FECHADA`) e comita; a transação da contraproposta da Casa A é abortada, retornando HTTP 409 Conflict (`OFFER_ALREADY_ACCEPTED` ou `OFFER_ALREADY_CLOSED`), sem aplicar extensão nem criar proposta;
  3. A fonte da verdade de expiração é `expires_at` no banco (avaliado com `clock_timestamp()`); o worker assíncrono do BullMQ não precisa de reagendamento: ao disparar, relê o banco e constata que a oferta ainda não expirou, postergando a expiração para o novo momento.

### AC-26: Tentativa de Segunda Extensão da Oferta (Teto de 1 Extensão Atingido)
- **Given** uma oferta `#OF-401` que já recebeu a extensão única de 5 minutos (`extensions_count = 1`),
- **When** outra contraproposta é submetida pela Casa C faltando menos de 5 minutos para o vencimento do prazo estendido,
- **Then** o sistema:
  1. Avalia atômica e cumulativamente `status = 'ABERTA'` e `extensions_count === 1`;
  2. Nega qualquer prorrogação adicional de prazo na oferta (`OFFER_EXTENSION_LIMIT_REACHED` / 422 caso haja tentativa explícita de extensão), mantendo estritamente o `expires_at` vigente;
  3. Persiste a contraproposta da Casa C como `PENDENTE` desde que a oferta ainda esteja aberta;
  4. Atribui à contraproposta a validade efetiva restrita ao tempo remanescente da oferta ($\min(\text{validade\_proposta}, \text{expires\_at - clock\_timestamp()})$);
  5. Impede categoricamente o prolongamento indefinido do leilão (teto máximo de 1 extensão por oferta [HIPÓTESE – A VALIDAR]).

### AC-27: Cálculo da Validade Efetiva de Contraproposta com Oferta Estendida
- **Given** uma oferta `#OF-402` com prazo estendido restando 8 minutos para expirar,
- **When** a Casa D submete contraproposta com `prazo_validade_minutos` = 10 minutos (conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **Then** o sistema:
  1. Calcula a validade efetiva como $\min(\text{prazo\_validade\_minutos}, \text{tempo restante da oferta}) = \min(10\text{ min}, 8\text{ min}) = 8\text{ minutos}$;
  2. Grava `expires_at` da contraproposta com timestamp idêntico ao `expires_at` da oferta;
  3. Exibe na interface do cliente e do operador a contagem regressiva sincronizada em 8 minutos;
  4. Garante que nenhuma contraproposta permaneça ativa ou aceitável após o encerramento da oferta principal.

### AC-28: Checkpoint de Fim de Janela de Execução e Declaração de No-Show (Ausência)
- **Given** uma negociação no status `AGUARDANDO_PAGAMENTO_ENTREGA` atingindo o término da janela de execução acordada (conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **When** o sistema aciona o checkpoint de término da janela e a casa de câmbio seleciona a opção "Não compareceu" (No-Show),
- **Then** o sistema:
  1. Registra a declaração de no-show na tabela `audit_logs` vinculada à negociação com `actor_id` do operador, timestamp e IP;
  2. Notifica imediatamente o cliente via push e e-mail informando sobre a declaração de ausência e concedendo prazo de 24 horas úteis para manifestação ou contestação;
  3. Se o cliente **não contestar** dentro das 24 horas úteis: transiciona o status da negociação para `CANCELADA` com motivo auditado `CANCELADA_NO_SHOW`, incrementa 1 strike no perfil do cliente e, se o cliente atingir o limite de strikes parametrizado, aplica restrição preventiva para novas ofertas;
  4. Se o cliente **contestar** dentro das 24 horas úteis (alegando comparecimento, recusa da casa ou reagendamento): transiciona o status da negociação para `DISPUTA`, notifica o painel de moderação administrativa e bloqueia a aplicação de strikes até a decisão do mediador;
  5. Registra o monitoramento de taxas de no-show declaradas por cada casa para coibir e sancionar eventuais abusos morais da casa (ex.: declaração indevida para escapar de taxa pactuada após variação de mercado).

### AC-29: Autenticação Multifator (MFA) Obrigatória para Operadores de Casas de Câmbio
- **Given** um usuário cadastrado com role `CASA_OWNER` ou `CASA_OPERADOR`,
- **When** tenta realizar login e acessar telas operacionais ou invocar endpoints transacionais (`POST /offers/:id/accept` ou `POST /offers/:id/proposals`) sem ter concluído o pareamento de MFA (segundo fator via aplicativo autenticador TOTP),
- **Then** o sistema intercepta a requisição na camada de autenticação/guarda do backend, bloqueia a operação retornando HTTP 403 Forbidden com código `MFA_REQUIRED` e mensagem: *"Autenticação multifator (MFA) obrigatória para este perfil."*, redirecionando o usuário para o fluxo de ativação de segundo fator.

### AC-30: Modal de Confirmação Prévia antes de Aceite Vinculante
- **Given** um operador de casa clicando em "Aceitar Oferta (Match Direto)" ou um cliente clicando em "Aceitar Contraproposta",
- **When** o clique de aceite é acionado na interface,
- **Then** o frontend obrigatoriamente exibe modal de confirmação pré-aceite contendo: resumo dos valores (moeda estrangeira, taxa de câmbio pura, IOF e tarifas discriminadas informadas pela casa, e VET final total em Reais), forma de entrega/retirada, local de atendimento e prazo acordado;
- **And** somente após o usuário clicar expressamente em "Confirmar Aceite Vinculante", o payload de fechamento transacional é disparado para a API backend.

### AC-31: Validação de Teto de Valor por Oferta e Alerta de Fracionamento (PLD)
- **Given** a publicação de uma nova oferta por um cliente,
- **When** o valor pretendido em Reais ultrapassar o teto máximo parametrizado por oferta para o piloto (`OFFER_MAX_VALUE_BRL` conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **Then** o sistema rejeita a criação da oferta com HTTP 422 Unprocessable Entity, código `OFFER_VALUE_LIMIT_EXCEEDED` e mensagem: *"Valor da oferta excede o teto máximo permitido para o piloto."*;
- **And** se um mesmo cliente (CPF ou CNPJ) submeter ofertas consecutivas abaixo do teto que somadas na janela de 24 horas ultrapassem o limiar de agregação, o backend emite automaticamente um alerta preventivo de suspeita de fracionamento (PLD) para análise imediata no painel Admin de compliance, sem revelar o alerta ao cliente.

---

## 3. Error States e Resiliência (Falhas de Dependência)

### AC-10: Indisponibilidade Total das APIs de Cotação de Referência (AwesomeAPI + Fallback)
- **Given** que a AwesomeAPI está fora do ar (retornando HTTP 503 ou Timeout > 3s) e a API de fallback secundário também falha consecutivamente,
- **When** um cliente ou operador acessa a tela de negociação ou o backend roda a rotina periódica de coleta,
- **Then** o sistema:
  1. Consulta a última cotação persistida no cache Redis;
  2. Se os dados existirem no Redis (mesmo com TTL vencido, servindo via stale-while-revalidate): entrega a cotação com a propriedade `is_stale: true` e a indicação de timestamp da última leitura válida;
  3. Exibe na interface um badge visual informativo: *"Cotação de referência desatualizada devido a instabilidade no provedor financeiro. Horário de referência: [timestamp]"*;
  4. Se o cache estiver completamente vazio (cold start): exibe banner alertando sobre a indisponibilidade momentânea da cotação de mercado, mas **não bloqueia** o cliente de preencher livremente a taxa desejada em sua oferta;
  5. Dispara alerta nos logs estruturados para monitoramento da equipe técnica.

### AC-11: Queda e Reconexão de Conexão WebSocket Durante o Leilão
- **Given** um cliente conectado aguardando contrapropostas com socket ativo no canal da oferta,
- **When** ocorre uma perda de pacote ou oscilação de rede do cliente (socket desconectado temporariamente),
- **Then** o sistema:
  1. Detecta o evento de reconexão do cliente Socket.IO;
  2. Reautentica a sessão do cliente e reinscreve automaticamente o cliente nos rooms das suas ofertas ativas;
  3. O cliente web dispara imediatamente chamada REST de sincronização para recuperar o estado total das propostas recebidas durante o período offline;
  4. Renderiza as novas propostas sem duplicar elementos visuais e sem necessidade de reload de página pelo usuário.

---

## 4. Non-Functional Criteria e Notificações Multicanal

### AC-12: Latência de Notificação de Novas Ofertas e Propostas
- **Given** a publicação de uma oferta ou submissão de contraproposta,
- **When** o backend confirma o commit da operação no PostgreSQL,
- **Then** o evento WebSocket correspondente deve ser entregue aos navegadores conectados dos participantes elegíveis em um tempo de trânsito (P95) inferior a 500ms em condições normais de rede.

### AC-13: Trilha de Auditoria Imutável (Compliance e PLD/KYC)
- **Given** qualquer mutação de estado nas entidades `offers`, `proposals`, `negotiations` ou `exchanges`,
- **When** a transação de banco comita,
- **Then** uma entrada correspondente deve ser gravada na tabela `audit_logs` na mesma transação contendo:
  - `actor_id` e `actor_role` (Admin, Casa, Cliente ou Sistema);
  - `action` (ex: `OFFER_CREATED`, `DIRECT_ACCEPT`, `COUNTERPROPOSAL_SENT`, `MATCH_CONFIRMED`);
  - `reason` (ex: `MATCH_OUTRA_CASA`, `OFERTA_EXPIRADA`, `OFERTA_CANCELADA`, `SUSPENSAO_PARCEIRO`);
  - `ip_address` e `user_agent`;
  - `payload_diff` com valores prévios e posteriores em formato estruturado;
  - A tabela de auditoria opera estritamente em modo append-only, rejeitando qualquer tentativa de `UPDATE` ou `DELETE`.

### AC-14: Privacidade, Anonimização e Conformidade com LGPD
- **Given** uma oferta publicada e aberta para disputa no marketplace,
- **When** operadores de diferentes casas visualizam a oferta antes do match,
- **Then** a oferta é apresentada de forma estritamente anônima: visualiza-se apenas ID, Moeda, Operação, Valor, Taxa Desejada (BRL/unidade), Produto, Cidade, Região/Bairro e Modalidade (retirada ou delivery);
- **And** nenhum dado pessoal do cliente (Nome, CPF, CNPJ, Telefone ou E-mail) nem dados de endereço detalhado (logradouro, número, complemento e CEP) são expostos na fase pré-match;
- **And** somente após a consolidação transacional do match com a casa vencedora, o endereço de entrega (caso delivery) e os dados essenciais de contato são compartilhados exclusivamente com aquela casa.

### AC-15: Notificações Multicanal para Operadores Offline com Throttling e Opt-in
- **Given** um operador de casa de câmbio elegível que não está com o painel aberto na janela ativa,
- **When** uma oferta compatível de alta relevância é publicada na sua praça de atuação,
- **Then** o sistema:
  1. Se o navegador estiver em background com permissão concedida: emite Web Push nativo com alerta sonoro e link direto para o aceite;
  2. Se a casa não mantiver nenhuma conexão WebSocket ativa por mais de 5 minutos durante o horário comercial:
     - Envia e-mail transacional de alerta;
     - Para envio via WhatsApp corporativo da mesa: aplica mecanismo estrito de limitação de frequência (*throttling*), permitindo no máximo 1 alerta a cada 30 minutos por operador offline em formato consolidado (digest: *"Você possui X novas ofertas compatíveis aguardando no painel"*), exigindo consentimento prévio (*opt-in*) e templates aprovados pela Meta [verificar na documentação atual da WhatsApp Business Platform], prevenindo bloqueios ou banimento do número corporativo.

### AC-16: Resolução de Disputa e Timeout de Inatividade na Negociação
- **Given** uma negociação com status `AGUARDANDO_PAGAMENTO_ENTREGA` ou `DISPUTA`,
- **When** uma das partes aciona "Abrir Disputa" ou a negociação atinge 5 dias úteis sem confirmação [HIPÓTESE – A VALIDAR],
- **Then** o sistema:
  1. Na abertura de disputa: move o status para `DISPUTA`, notifica o painel administrativo com SLA de primeiro atendimento de até 24 horas úteis;
  2. Na mediação: o Admin dispõe de ferramentas para transicionar a negociação para `CONCLUÍDA` (acordo mútuo alcançado) ou `CANCELADA` (cancelamento justificado), com registro de justificativa obrigatória;
  3. No timeout de inatividade: dispara notificação preventiva aos 5 dias úteis concedendo 48 horas adicionais para manifestação antes de encerrar automaticamente por inatividade com status `CANCELADA`.
  > [!NOTE]
  > **Nota de Escopo (MVP Gratuito):** No MVP (Fase 1 / T1), o uso da plataforma é 100% gratuito. Nenhuma rotina de cobrança ou estorno de tarifa financeira deve ser implementada na Fase 1. A discussão arquitetural sobre faturamento de taxa de match e modelos de estorno pertence estritamente à Fase 2 (T2), documentada no [ADR-0012](../04-architecture/adr/adr-0012-modelo-cobranca.md).

---

## Notes & Open Questions

- **Composição da Oferta e do VET (Decisão em Aberto nº 1):** Oferta expressa em valor total final, tudo incluso (recomendação em aberto; alternativa: taxa pura + encargos). O aceite direto e as contrapropostas trazem a decomposição (câmbio, IOF, tarifas) informada pela casa apenas para transparência; a lista é comparada pelo total. IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas.
- **Validade padrão de contraproposta e extensão de oferta:** `prazo_validade_minutos` assumido operacionalmente em 10 minutos conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma). A validade efetiva no leilão é sempre $\min(\text{prazo\_validade\_minutos}, \text{tempo restante da oferta})$. Extensão automática de 5 minutos permitida no máximo 1 vez por oferta nos minutos finais [HIPÓTESE – A VALIDAR].
- **Limite de revisões e cooldown:** Cada casa pode ter apenas 1 proposta `PENDENTE` por oferta. O envio de nova taxa sobrescreve a anterior para status `SUBSTITUÍDA`, com teto de revisões e cooldown parametrizados ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)). Casas com propostas recusadas podem contrapropor de novo respeitando esses limites.
- **No-Show e Strikes:** Checkpoint disparado ao fim da janela de execução acordada. A declaração de ausência pela casa concede 24h úteis para contestação do cliente, transicionando para `CANCELADA` com acúmulo de strike (ou `DISPUTA` se contestada), sob monitoramento e auditoria estrita contra abusos de casas que pretendam fugir de taxas acordadas.
- **Cancelamento pelo cliente após match:** Não é permitido diretamente via autoatendimento para preservar o compromisso operacional da negociação [A VALIDAR COM ADVOGADO].
- **Escopo de Cobrança e Estorno (Fase 2 / ADR-0012):** O piloto do MVP (Fase 1 / T1) opera com gratuidade total (sem faturamento ou cobrança). Hipóteses sobre cobrança no match e opções de estorno (disputa formal vs. cancelamento por inatividade) pertencem à Fase 2 e encontram-se documentadas no [ADR-0012](../04-architecture/adr/adr-0012-modelo-cobranca.md) como decisões em aberto sujeitas a parecer jurídico.
- **Suspensão de Casa com Negociação Ativa:** Negociações em curso são retidas com motivo `SUSPENSAO_PARCEIRO` e alerta neutro ao cliente. Permanece em aberto se o Admin poderá autorizar o desfecho normal de negociações em andamento seguro [VALIDAR COM JURÍDICO].

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Produto | Versão inicial com 11 critérios de aceitação |
| 1.1 | 2026-11-03 | Equipe de Produto | Expansão de critérios de resiliência e LGPD |
| 1.2 | 2026-11-03 | Equipe de Produto | Atualização de AC-05 (lock_timeout de 2000ms e relógio atômico NOW()); AC-06 (rejeição atômica se expirada); AC-08 (linguagem neutra); AC-13 (auditoria); AC-14 (oferta anônima); inclusão de AC-15 e AC-16. |
| 1.3 | 2026-11-03 | Equipe de Produto | Revisão ampla de concorrência e PM-Critic: introdução da Tabela Unificada de Códigos de Erro e HTTP; substituição de NOW() por clock_timestamp() via ADR-0006; registro de que requisições rejeitadas não alteram estado; remoção completa de detalhes SQL dos critérios; reescrita do AC-05 como teste de carga com N requisições paralelas, validação de casa aprovada/elegível, idempotência de retry e estouro de lock_timeout; inclusão de 8 novos critérios executáveis (AC-17 ao AC-24); calibração de AC-07 (sem extensão de prazo) e AC-08 (remoção de tag interna da mensagem ao usuário); adequação de AC-09 (isolamento de estado com flag e motivo próprio, sem reaproveitar DISPUTA, e mensagem neutra ao cliente [VALIDAR COM JURÍDICO]); ordenação condicional de contrapropostas (compra ASC, venda DESC em AC-03); oferta anônima com Região/Bairro em AC-01/AC-14; atendimento integral obrigatório no MVP; throttling de 30 min em digest e opt-in no WhatsApp (AC-15); e padronização terminológica do parâmetro prazo_validade_minutos. |
| 1.4 | 2026-11-03 | Equipe de Produto | Revisão ampla v1.4: inclusão de novos códigos na Tabela Unificada de Erros (MFA_REQUIRED, OFFER_VALUE_LIMIT_EXCEEDED, OFFER_EXTENSION_LIMIT_REACHED); remoção completa de alíquotas fixas de IOF em AC-01/02/03 e substituição por valor informado pela casa [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]; registro da recomendação de oferta expressa em valor total final tudo incluso com decomposição transparente informada pela casa (Decisão nº 1); inclusão de 7 novos critérios executáveis: AC-25 (extensão de oferta nos minutos finais concorrendo com aceite sob lock pessimista no banco), AC-26 (segunda extensão negada respeitando teto de 1 extensão), AC-27 (validade efetiva atrelada ao tempo restante da oferta estendida), AC-28 (checkpoint de fim de janela de execução, declaração de no-show, prazo de 24h úteis para contestar, cancelamento com strikes vs DISPUTA se contestada, e auditoria contra abuso da casa), AC-29 (MFA obrigatório para Owner e Operador de casa com HTTP 403 MFA_REQUIRED), AC-30 (modal de confirmação prévia com resumo vinculante), e AC-31 (teto de valor por oferta no piloto e alerta de fracionamento PLD); remoção de qualquer menção a faturamento/estorno de tarifas no fluxo do MVP, com nota explícita de escopo de gratuidade na Fase 1 (ADR-0012); e vinculação de limites e prazos à Tabela de Parâmetros Configuráveis. |
