---
artifact: acceptance-criteria
version: "1.5"
created: 2026-11-03
status: draft
---

# Acceptance Criteria: Mecanismo de Atendimento Comercial e Cenários Críticos de Borda (MVP — Versão 1.5)

## Story Context

Este documento define os 30 critérios de aceitação executáveis (em formato `Given/When/Then`) para o motor central de aproximação, leilão e atendimento comercial do marketplace de câmbio, integrando os requisitos do [PRD](prd.md) (versão 1.5), das [User Stories](user-stories.md) e as decisões técnicas de concorrência do [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md) e de não-intermediação financeira do [ADR-0010](../04-architecture/adr/adr-0010-plataforma-sem-custodia.md).

O produto é concebido formalmente como uma **plataforma tecnológica de comunicação e mensageria** inspirada no modelo do Melhor Câmbio (`melhorcambio.com`), sem recebimento, custódia, intermediação ou liquidação de valores financeiros pelas partes. Todo pagamento e entrega de numerário ocorrem diretamente entre a casa de câmbio e o cliente.

---

## Tabela Unificada de Códigos de Erro e Status HTTP

Todas as respostas de falha da API da plataforma seguem rigorosamente a padronização abaixo, com payload no formato `{ "error_code": string, "message": string, "details"?: object }`:

| Código de Erro (`error_code`) | HTTP Status | Mensagem Padrão / Comportamento |
|-------------------------------|-------------|----------------------------------|
| `OFFER_NOT_FOUND` | 404 Not Found | "Oferta não encontrada." |
| `OFFER_ALREADY_ACCEPTED` | 409 Conflict | "Esta oferta acabou de ser aceita por outra casa de câmbio." |
| `OFFER_CANCELED` | 409 Conflict | "Esta oferta foi cancelada pelo cliente e não aceita mais ações." |
| `OFFER_EXPIRED` | 410 Gone | "Esta oferta expirou e não aceita mais propostas ou aceites." |
| `OFFER_ALREADY_CLOSED` | 422 Unprocessable Entity | "Esta oferta já foi aceita e resultou em um atendimento comercial em andamento." |
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
| `PARTIAL_VALUE_NOT_SUPPORTED` | 422 Unprocessable Entity | "O montante da contraproposta deve atender integralmente o valor solicitado na oferta." |
| `VALIDATION_ERROR` | 400 Bad Request | "Dados da requisição inválidos ou incompletos." |

---

## 1. Happy Path (Fluxos Principais de Sucesso)

### AC-01: Publicação de Oferta Válida pelo Cliente
- **Given** que um cliente autenticado possui telefone verificado via OTP, CPF (PF) ou CNPJ (PJ) validado e quantidade de ofertas ativas inferior ao limite parametrizado ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **When** preenche todos os campos obrigatórios: Moeda = "USD", Operação = "COMPRA" (perspectiva do cliente), Valor = 1000.00 (abaixo do teto parametrizado de R$ 50k), Taxa Desejada = R$ 5,40 por USD (expressa em valor total final tudo incluso, conforme recomendação em aberto nº 1; IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas), Produto = "PAPEL_MOEDA", Modalidade = "RETIRADA", Cidade = "SP", Região/Bairro = "Zona Sul - Moema", e Prazo = 30 minutos, e clica em "Publicar Oferta",
- **Then** o sistema:
  1. Cria o registro da oferta com status `ABERTA`;
  2. Agenda um job assíncrono de expiração no BullMQ sincronizado com o campo `expires_at` no banco;
  3. Dispara o evento WebSocket `offer:new` como oferta anônima para as casas elegíveis da praça contendo apenas Moeda, Operação, Valor, Taxa Desejada (VET), Produto, Cidade, Região/Bairro e Modalidade (sem dados de identificação pessoal nem logradouro/CEP);
  4. Retorna status HTTP 201 Created com o payload da oferta e URL de acompanhamento.

### AC-02: Aceite Direto por Casa Elegível com Match Automático e Abertura de Atendimento
- **Given** uma oferta com status `ABERTA` visível no painel da Casa A (status `APROVADA`, elegível para a praça e com operador autenticado via MFA [AC-26]),
- **When** o operador da Casa A preenche a decomposição informada pela casa (taxa de câmbio pura, IOF e eventuais tarifas informados apenas para transparência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]), confirma no modal de resumo vinculante ([AC-27]) e clica em "Confirmar Aceite Vinculante",
- **Then** o sistema:
  1. Executa a operação sob controle de concorrência transacional no backend conforme [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md);
  2. Valida cumulativamente que o status da oferta é `ABERTA`, que `expires_at > clock_timestamp()` no relógio atômico do banco e que a casa operadora possui status `APROVADA`;
  3. Atualiza o status da oferta para `FECHADA`;
  4. Cria o registro na entidade de atendimento (`atendimentos` / `negotiations`) com status inicial `EM_ATENDIMENTO`;
  5. Atualiza todas as outras contrapropostas pendentes daquela oferta para `ENCERRADA` registrando o motivo auditado `MATCH_OUTRA_CASA`;
  6. Registra a trilha imutável no log de auditoria dentro da mesma transação e efetua o commit;
  7. Pós-commit: despacha evento WebSocket `match:confirmed` liberando os dados de contato bilaterais para o cliente e para a Casa A, indica a Janela Comercial de Atendimento (`JANELA_ATENDIMENTO_HORAS`, padrão: 24h úteis) e exibe o aviso destacado de não-custódia [VALIDAR COM ADVOGADO]; e emite `offer:closed` para as demais casas.

### AC-03: Envio e Aceite de Contraproposta Estruturada
- **Given** uma oferta `ABERTA` do cliente (operação COMPRA de 1.000 USD) e a Casa B elegível (operador com MFA ativo),
- **When** a Casa B submete contraproposta estruturada com valor idêntico ao montante da oferta (1.000 USD - atendimento integral obrigatório no MVP), taxa de R$ 5,45 por USD, `prazo_validade_minutos` conforme parametrização, ponto/local de atendimento (loja física de Moema), e campos discriminados informados pela casa: IOF e eventuais tarifas da casa, totalizando o VET final em reais (sem alíquotas fixas pelo sistema [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]), e o cliente clica subsequentemente em "Aceitar Contraproposta da Casa B" confirmando no modal de resumo vinculante ([AC-27]),
- **Then** o sistema:
  1. No envio: persiste a proposta com status `PENDENTE`, define a validade efetiva como $\min(\text{validade\_proposta}, \text{tempo restante da oferta})$, emite WebSocket `proposal:new` para o cliente e mantém a oferta `ABERTA`;
  2. Na visualização: exibe a lista de contrapropostas ordenada condicionalmente pelo valor total em reais:
     - Operação `COMPRA`: ordenação **ascendente** (`ASC`, menor desembolso total em reais no topo);
     - Operação `VENDA`: ordenação **descendente** (`DESC`, maior valor total recebido em reais no topo);
  3. No aceite do cliente: abre transação atômica serializada conforme [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md), valida que a proposta B está `PENDENTE` e com `expires_at > clock_timestamp()`, atualiza a proposta B para `ACEITA`, transiciona a oferta para `FECHADA`, transiciona todas as outras propostas ativas daquela oferta para `ENCERRADA` (motivo auditado `MATCH_OUTRA_CASA`), cria o atendimento no status `EM_ATENDIMENTO`, revela os contatos mútuos e notifica todas as partes após o commit.

### AC-04: Relato Bilateral de Desfecho do Atendimento Comercial
- **Given** um atendimento comercial com status `EM_ATENDIMENTO` dentro da janela comercial acordada,
- **When** o cliente e a casa de câmbio acessam a tela de atendimento e selecionam a opção "Concluído" (ou uma das partes relata a conclusão e a outra não manifesta divergência dentro do prazo),
- **Then** o sistema:
  1. Atualiza o status do atendimento para `CONCLUÍDO`;
  2. Registra o timestamp de encerramento e o ator no log de auditoria;
  3. Encerra o ciclo operacional do atendimento na plataforma, alimentando as métricas de conversão da rede.

---

## 2. Edge Cases e Concorrência Transacional

### AC-05: Teste de Carga e Concorrência de Aceite Direto ($N$ Requisições Paralelas)
- **Given** uma oferta `#OF-100` com status `ABERTA`, e $N$ requisições paralelas concorrentes (ex.: $N \ge 10$) submetidas no mesmo milissegundo por operadoras de casas distintas,
- **When** as requisições de aceite direto atingem o backend simultaneamente,
- **Then** o sistema garante observavelmente:
  1. **Validação de Habilitação:** Cada requisição valida que a respectiva casa operadora possui status `APROVADA` e elegibilidade geográfica e de produto (qualquer casa inabilitada é imediatamente rejeitada com HTTP 403 `EXCHANGE_NOT_APPROVED` ou `EXCHANGE_NOT_ELIGIBLE`);
  2. **Exatamente 1 Vencedor:** Exatamente 1 (uma) requisição comita com sucesso (HTTP 200/201 OK), transicionando a oferta para `FECHADA` e gerando 1 registro em `atendimentos` (`EM_ATENDIMENTO`);
  3. **$N-1$ Conflitos Tratados:** Exatamente $N-1$ requisições concorrentes são abortadas e retornam status HTTP 409 Conflict com código `OFFER_ALREADY_ACCEPTED` e mensagem "Esta oferta acabou de ser aceita por outra casa de câmbio.";
  4. **Unicidade de Atendimento:** É criado exatamente 1 (um) registro na tabela de atendimentos vinculado à oferta `#OF-100` (assegurado por controle de concorrência e constraint `UNIQUE (offer_id)` no banco);
  5. **Idempotência de Retry:** Se a casa vencedora retransmitir a mesma requisição com a mesma chave de idempotência (`Idempotency-Key`), o sistema responde com a mesma confirmação de sucesso sem duplicar registros nem emitir erro 409;
  6. **Tratamento de Timeout de Espera de Conexão (`lock_timeout`):** Caso o tempo de espera na fila de serialização atinja o teto de timeout configurado na sessão do banco (conforme [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)), a transação excedente é abortada de forma limpa, liberando recursos do pool e retornando HTTP 503 Service Unavailable com código `LOCK_TIMEOUT` e mensagem padronizada.

### AC-06: Tentativa de Aceite em Oferta Expirada (Race Condition com Worker Assíncrono)
- **Given** uma oferta `#OF-200` cujo prazo limite de 30 minutos vence às `14:30:00.000` no relógio do banco de dados,
- **When** um operador clica em "Aceitar" às `14:30:00.100` enquanto o worker assíncrono do BullMQ está em fila de execução,
- **Then** o sistema:
  1. Na transação de aceite, avalia atômica e diretamente a condição contra o relógio em tempo real do banco de dados (`clock_timestamp()`);
  2. Detecta que o horário corrente já ultrapassou o `expires_at`, rejeitando imediatamente a requisição com HTTP 410 Gone, código `OFFER_EXPIRED` e mensagem "Esta oferta expirou e não aceita mais propostas ou aceites.";
  3. **Comportamento sem alteração de estado na rejeição:** A requisição rejeitada **NÃO altera estado** no banco de dados;
  4. A efetiva transição da oferta para `EXPIRADA` e de suas propostas para `ENCERRADA` é processada pelo worker idempotente do BullMQ ou pela rotina de varredura periódica de segurança no banco de dados;
  5. Sob nenhuma hipótese uma oferta expirada transiciona para `FECHADA`.

### AC-07: Tentativa de Aceite de Contraproposta Expirada pelo Cliente
- **Given** que a Casa A submeteu a contraproposta `#PR-50` com `prazo_validade_minutos` = 10 minutos (vencimento às `10:15:00.000`),
- **When** o cliente tenta aceitar a proposta às `10:15:00.500` (tela mantida aberta sem refresh),
- **Then** o sistema:
  1. Na avaliação transacional de aceite, verifica a condição contra `clock_timestamp()` do banco;
  2. Identifica que a proposta atingiu o prazo de validade;
  3. **Comportamento sem alteração de estado na rejeição:** A requisição rejeitada **NÃO altera o estado** da proposta diretamente, abortando a transação;
  4. Retorna HTTP 400 Bad Request com código `PROPOSAL_EXPIRED` e mensagem "Esta contraproposta expirou e a casa não está mais vinculada a esta taxa.";
  5. Mantém a oferta principal do cliente no status `ABERTA`, permitindo que ele continue aguardando outras contrapropostas ou novos aceites;
  6. A proposta é posteriormente marcada como `EXPIRADA` pelo worker ou job de varredura.

### AC-08: Desistência Voluntária do Atendimento Comercial pós-Match
- **Given** um atendimento comercial no status `EM_ATENDIMENTO`,
- **When** o cliente ou a casa de câmbio decide não prosseguir com a operação direta e clica no botão "Desistir do Atendimento",
- **Then** o sistema:
  1. Exibe modal exigindo a seleção obrigatória de um motivo: `CLIENTE_DESISTIU`, `CASA_NAO_ATENDEU`, `TAXA_NAO_MANTIDA` ou `OUTRO` (com campo de observações livres);
  2. Atualiza o status do atendimento para `NÃO_CONCLUÍDO`, registrando o autor, o motivo e o timestamp em `audit_logs`;
  3. Notifica a contraparte imediatamente via push notification e e-mail informando sobre a desistência comercial registrada;
  4. Encerra o ciclo de atendimento sem aplicar bloqueios rígidos ou travas no autoatendimento.

### AC-09: Casa de Câmbio Suspensa pelo Admin com Atendimento em Curso
- **Given** um atendimento ativo no status `EM_ATENDIMENTO` entre um Cliente e a Casa C,
- **When** o Administrador altera o status da Casa C para `SUSPENSA` no painel de governança,
- **Then** o sistema:
  1. Imediatamente invalida todas as propostas `PENDENTE` da Casa C em outras ofertas ativas (motivo auditado `CASA_SUSPENSA`) e desconecta seus operadores dos canais em tempo real;
  2. Para o atendimento em curso: retém o atendimento em estado de pausa preventiva com flag própria `parceiro_suspenso: true` e motivo de auditoria `SUSPENSAO_PARCEIRO`;
  3. Apresenta ao cliente uma mensagem institucional neutra e preventiva: *"A parceria comercial com esta instituição foi suspensa preventivamente pela plataforma para verificação de conformidade. Não realize transferências caso a operação ainda não tenha sido concluída."* [VALIDAR COM JURÍDICO];
  4. Abre notificação de alta prioridade no painel administrativo para análise de governança.

### AC-10: Indisponibilidade Total das APIs de Cotação de Referência (AwesomeAPI + Fallback)
- **Given** que a AwesomeAPI está fora do ar (retornando HTTP 503 ou Timeout > 3s) e a API de fallback secundário também falha consecutivamente,
- **When** um cliente ou operador acessa a tela de cotações ou o backend roda a rotina periódica de coleta,
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

### AC-12: Tentativa de Envio de Contraproposta com Atendimento Parcial do Valor
- **Given** uma oferta `ABERTA` com valor de 2.000 USD,
- **When** um operador tenta submeter uma contraproposta informando valor diferente (ex.: 1.000 USD),
- **Then** o sistema bloqueia a requisição no schema de validação com HTTP 422 Unprocessable Entity, código `PARTIAL_VALUE_NOT_SUPPORTED` e mensagem: *"O montante da contraproposta deve atender integralmente o valor solicitado na oferta."*.

### AC-13: Contraproposta com Variação Expressiva em Relação à Taxa de Mercado
- **Given** a submissão de uma contraproposta por um operador de casa de câmbio,
- **When** a taxa digitada apresentar desvio superior a 15% em relação à cotação de referência do momento ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **Then** a interface do operador exibe modal de confirmação em destaque com aviso visual (alerta amarelo) exigindo clique ativo de confirmação antes do envio para evitar erros de digitação.

### AC-14: Tentativa de Obtenção de Dados Pessoais do Cliente antes do Match
- **Given** uma oferta no status `ABERTA`,
- **When** um operador ou terceiro consulta o endpoint público ou autenticado de listagem de ofertas (`GET /offers` ou `GET /offers/:id`),
- **Then** o payload retornado omite categoricamente nome, e-mail, telefone, CPF/CNPJ e dados de logradouro/número/CEP do cliente, entregando apenas: ID, moeda, operação, valor, taxa desejada, produto, modalidade, cidade e região/bairro macro.

### AC-15: Throttling e Limitação de Frequência de Alertas no WhatsApp
- **Given** um operador de casa de câmbio offline que habilitou notificações via WhatsApp (opt-in ativo),
- **When** 5 novas ofertas compatíveis são publicadas em um intervalo de 10 minutos na sua praça,
- **Then** o sistema dispara no máximo 1 mensagem digest via WhatsApp no intervalo de 30 minutos (`WHATSAPP_ALERT_THROTTLING_MINUTES`), consolidando os avisos em um único template aprovado pela Meta.

### AC-16: Limite de Revisões de Contraproposta e Cooldown entre Envios
- **Given** uma casa que já enviou 3 contrapropostas para a mesma oferta (atingindo o teto parametrizado),
- **When** o operador tenta submeter uma 4ª versão de contraproposta,
- **Then** o sistema rejeita a operação com HTTP 422 Unprocessable Entity, código `PROPOSAL_REVISION_LIMIT_REACHED`;
- **And** se uma nova submissão ocorrer antes de decorridos 30 segundos da proposta anterior, o backend rejeita com HTTP 429 Too Many Requests, código `PROPOSAL_COOLDOWN_ACTIVE`.

### AC-17: Cancelamento de Oferta pelo Cliente vs. Aceite Direto Simultâneos
- **Given** uma oferta `ABERTA`, o cliente submetendo o cancelamento voluntário no exato milissegundo em que uma casa elegível submete o aceite direto,
- **When** ambas as requisições chegam simultaneamente ao backend sob controle de concorrência serializado ([ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)),
- **Then** o sistema:
  1. Se a transação de cancelamento obtiver a serialização primeiro: transiciona a oferta para `CANCELADA`, responde HTTP 200 OK ao cliente e rejeita a requisição da casa com HTTP 409 Conflict (`OFFER_CANCELED`);
  2. Se a transação de aceite obtiver a serialização primeiro: transiciona a oferta para `FECHADA`, gera o atendimento comercial (`EM_ATENDIMENTO`), responde HTTP 200 OK à casa e rejeita a tentativa de cancelamento do cliente com HTTP 422 Unprocessable Entity (`OFFER_ALREADY_CLOSED`);
  3. Sob nenhuma condição ocorrem ambos os desfechos simultaneamente.

### AC-18: Aceite de Contraproposta pelo Cliente vs. Aceite Direto por Outra Casa Simultâneos
- **Given** uma oferta `ABERTA` com uma contraproposta pendente da Casa B, onde o cliente submete o aceite da contraproposta da Casa B no exato momento em que a Casa C submete o aceite direto da oferta original,
- **When** ambas as requisições disputam o fechamento da oferta no backend,
- **Then** o sistema:
  1. Serializa as operações no banco de dados de modo atômico;
  2. Se o aceite do cliente processar primeiro: consolida o match com a Casa B, fecha a oferta e rejeita o aceite direto da Casa C com HTTP 409 Conflict (`OFFER_ALREADY_ACCEPTED`);
  3. Se o aceite da Casa C processar primeiro: consolida o match direto com a Casa C, fecha a oferta, encerra a contraproposta da Casa B (`ENCERRADA` com motivo `MATCH_OUTRA_CASA`) e rejeita a tentativa do cliente com HTTP 409 Conflict (`OFFER_ALREADY_ACCEPTED`);
  4. Garante a criação de estritamente 1 atendimento comercial para a oferta.

### AC-19: Duplo Aceite Simultâneo de Contrapropostas pelo Cliente
- **Given** uma oferta com duas contrapropostas ativas (Proposta 1 e Proposta 2), e o cliente clicando em "Aceitar" em abas simultâneas ou por duplo clique acidental,
- **When** as duas requisições de aceite de propostas distintas atingem o endpoint em paralelo,
- **Then** o sistema:
  1. Processa a primeira requisição com sucesso, mudando a Proposta 1 para `ACEITA` e a oferta para `FECHADA`;
  2. Força a segunda requisição a ler o estado já atualizado da oferta (`FECHADA`);
  3. Rejeita imediatamente a segunda requisição com HTTP 422 Unprocessable Entity (`OFFER_ALREADY_CLOSED`);
  4. Garante que nenhum segundo atendimento comercial seja criado para o mesmo cliente na mesma oferta.

### AC-20: Tentativa de Aceite de Proposta com Versão Desatualizada (`SUBSTITUÍDA`)
- **Given** que a Casa A emitiu a contraproposta `#PR-10` (versão 1) e, em seguida, emitiu uma nova contraproposta revisada (versão 2), transitando a versão 1 para `SUBSTITUÍDA`,
- **When** o cliente tenta aceitar a versão 1 enviando `{ "proposal_id": "PR-10", "version": 1 }` (mantida em tela aberta sem sincronização),
- **Then** o sistema:
  1. Verifica a tupla ID + versão na transação atômica;
  2. Detecta que o status da proposta na versão submetida não é mais `PENDENTE` (encontra-se `SUBSTITUÍDA`);
  3. Rejeita a operação com HTTP 409 Conflict, código `PROPOSAL_SUPERSEDED` e mensagem "Esta contraproposta foi substituída por uma versão mais recente da casa de câmbio.";
  4. Retorna no payload os dados da nova contraproposta vigente (versão 2) para atualização imediata da interface do cliente.

### AC-21: Tentativa de Operação por Usuário com Perfil Financeiro
- **Given** um usuário autenticado na plataforma vinculado a uma casa de câmbio com role `FINANCEIRO`,
- **When** este usuário tenta invocar endpoints transacionais operacionais (`POST /offers/:id/accept` ou `POST /offers/:id/proposals`),
- **Then** o sistema:
  1. Intercepta a requisição na camada de autorização RBAC do backend;
  2. Bloqueia a execução antes de abrir qualquer conexão ou lock no banco;
  3. Retorna HTTP 403 Forbidden com código `INSUFFICIENT_PERMISSIONS` e mensagem "Seu perfil de usuário não possui permissão para executar esta operação.";
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

### AC-25: Validade Efetiva da Contraproposta Limitada ao Término da Oferta
- **Given** uma oferta `#OF-402` restando 8 minutos para expirar,
- **When** a Casa D submete contraproposta com `prazo_validade_minutos` = 10 minutos (conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **Then** o sistema:
  1. Calcula a validade efetiva como $\min(\text{prazo\_validade\_minutos}, \text{tempo restante da oferta}) = \min(10\text{ min}, 8\text{ min}) = 8\text{ minutos}$;
  2. Grava `expires_at` da contraproposta com timestamp idêntico ao `expires_at` da oferta;
  3. Exibe na interface do cliente e do operador a contagem regressiva sincronizada em 8 minutos;
  4. Garante que nenhuma contraproposta permaneça ativa ou aceitável após o encerramento da oferta principal.

### AC-26: Autenticação Multifator (MFA) Obrigatória para Operadores de Casas de Câmbio
- **Given** um usuário cadastrado com role `CASA_OWNER` ou `CASA_OPERADOR`,
- **When** tenta realizar login e acessar telas operacionais ou invocar endpoints transacionais (`POST /offers/:id/accept` ou `POST /offers/:id/proposals`) sem ter concluído o pareamento de MFA (segundo fator via aplicativo autenticador TOTP),
- **Then** o sistema intercepta a requisição na camada de autenticação/guarda do backend, bloqueia a operação retornando HTTP 403 Forbidden com código `MFA_REQUIRED` e mensagem: *"Autenticação multifator (MFA) obrigatória para este perfil."*, redirecionando o usuário para o fluxo de ativação de segundo fator.

### AC-27: Modal de Confirmação Mandatório antes de Aceite Vinculante
- **Given** um operador de casa clicando em "Aceitar Oferta (Match Direto)" ou um cliente clicando em "Aceitar Contraproposta",
- **When** o clique de aceite é acionado na interface,
- **Then** o frontend obrigatoriamente exibe modal de confirmação pré-aceite contendo: resumo dos valores (moeda estrangeira, taxa de câmbio pura, IOF e tarifas discriminadas informadas pela casa, e VET final total em Reais), dados da loja/entrega, aviso explícito de canal de comunicação sem custódia de fundos e janela comercial de atendimento informada;
- **And** somente após o usuário clicar expressamente em "Confirmar Aceite Vinculante", o payload transacional é disparado para a API backend.

### AC-28: Validação de Teto de Valor por Oferta no Piloto
- **Given** a publicação de uma nova oferta por um cliente,
- **When** o valor pretendido em Reais ultrapassar o teto máximo parametrizado por oferta para o piloto (`OFFER_MAX_VALUE_BRL`, padrão: R$ 50.000,00 conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
- **Then** o sistema rejeita a criação da oferta com HTTP 422 Unprocessable Entity, código `OFFER_VALUE_LIMIT_EXCEEDED` e mensagem: *"Valor da oferta excede o teto máximo permitido para o piloto."*.

### AC-29: Relato de Problema à Moderação da Plataforma (Governança sem Mediação Financeira)
- **Given** um atendimento no status `EM_ATENDIMENTO` ou recém-finalizado,
- **When** o cliente ou a casa de câmbio aciona "Relatar Problema" e submete uma descrição circunstanciada da irregularidade (ex.: recusa injustificada em praticar a taxa acordada, fornecimento de telefone inexistente ou conduta lesiva),
- **Then** o sistema:
  1. Registra o relato no log imutável de auditoria vinculado ao atendimento com timestamp, autor e evidências anexadas;
  2. Dispara alerta na fila de moderação do painel Admin para análise da equipe de suporte;
  3. Não executa retenção de dinheiro, estorno financeiro ou mediação cambial (a plataforma não custodia fundos);
  4. Permite ao Admin aplicar sanções cadastrais (advertência, limitação de ofertas de cliente ou suspensão preventiva da casa da rede).

### AC-30: Transição Automática de Atendimento para `SEM_RETORNO` após Timeout
- **Given** um atendimento no status `EM_ATENDIMENTO` que atinja o término do prazo de inatividade parametrizado (`TIMEOUT_RELATO_DESFECHO_DIAS`, padrão: 5 dias úteis com aviso prévio de 48h) sem manifestação de desfecho por nenhuma das partes,
- **When** a rotina assíncrona de verificação periódica do BullMQ é executada,
- **Then** o sistema:
  1. Atualiza o status do atendimento para `SEM_RETORNO`;
  2. Registra o motivo em auditoria como `TIMEOUT_INATIVIDADE_ATENDIMENTO`;
  3. Arquiva o atendimento sem aplicação de sanções punitivas ou bloqueios ao cliente ou à casa.

---

## 3. Future Considerations / Removido do MVP na v1.5

Os seguintes critérios de aceitação foram retirados do escopo do MVP na versão 1.5 e arquivados para fases posteriores:

1. **Extensão Automática de Oferta nos Minutos Finais (antigo AC-25):**
   - *Motivo da remoção:* Simplificação do motor do leilão no MVP; a oferta possui prazo rígido e contrapropostas têm validade limitada ao tempo restante da oferta.
2. **Segunda Extensão Negada (antigo AC-26):**
   - *Motivo da remoção:* Consequência da remoção da extensão automática da oferta no MVP.
3. **Checkpoint de No-Show, Contestação de 24h e Registro de Strikes (antigo AC-28):**
   - *Motivo da remoção:* Desnecessário em plataforma sem liquidação financeira integrada. Substituído pelo relato voluntário de desfecho (`CONCLUÍDO` vs. `NÃO_CONCLUÍDO` com motivo) e moderação qualitativa.
4. **Alerta Automatizado de Fracionamento PLD (antigo AC-31 parte 2):**
   - *Motivo da remoção:* Risco de falsos positivos em canal de aproximação sem custódia; convertido em pergunta em aberto para parecer jurídico regulatório.
5. **Discussão de Estornos Financeiros de Tarifas (antigo AC-16 / Notas):**
   - *Motivo da remoção:* MVP é 100% gratuito; monetização e eventuais créditos de leads pertencem exclusivamente à Fase 2 ([ADR-0012](../04-architecture/adr/adr-0012-modelo-cobranca.md)).

---

## 4. Notes & Open Questions

- **Composição da Oferta e do VET (Decisão em Aberto nº 1):** Oferta expressa em valor total final, tudo incluso (recomendação em aberto; alternativa: taxa pura + encargos). O aceite direto e as contrapropostas trazem a decomposição (câmbio, IOF, tarifas) informada pela casa apenas para transparência; a lista é comparada pelo total. IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas.
- **Contato Pós-Match (Decisão em Aberto nº 2):** Revelar telefone/WhatsApp e e-mail do cliente para a casa e dados institucionais da casa para o cliente, conforme padrão consolidado pelo Melhor Câmbio. Chat interno proprietário permanece fora do MVP.
- **Validade padrão de contraproposta:** `prazo_validade_minutos` assumido operacionalmente em 10 minutos conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma). A validade efetiva no leilão é sempre $\min(\text{prazo\_validade\_minutos}, \text{tempo restante da oferta})$.
- **Limite de revisões e cooldown:** Cada casa pode ter apenas 1 proposta `PENDENTE` por oferta. O envio de nova taxa sobrescreve a anterior para status `SUBSTITUÍDA`, com teto de revisões (máx. 3) e cooldown (30s) parametrizados. Casas com propostas recusadas podem contrapropor de novo respeitando esses limites enquanto a oferta estiver aberta.
- **Suspensão de Casa com Atendimento Ativo:** Atendimentos em curso são retidos com motivo `SUSPENSAO_PARCEIRO` e alerta neutro ao cliente orientando cautela [VALIDAR COM JURÍDICO].
- **Escopo de Cobrança (Fase 2 / ADR-0012):** O piloto do MVP (Fase 1 / T1) opera com gratuidade total. Hipóteses de cobrança por lead aceito ou mensalidade SaaS pertencem à Fase 2 e encontram-se documentadas no [ADR-0012](../04-architecture/adr/adr-0012-modelo-cobranca.md) como decisões em aberto sujeitas a parecer jurídico.

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Produto | Versão inicial com 11 critérios de aceitação |
| 1.1 | 2026-11-03 | Equipe de Produto | Expansão de critérios de resiliência e LGPD |
| 1.2 | 2026-11-03 | Equipe de Produto | Atualização de AC-05, AC-06, AC-08, AC-13, AC-14, AC-15 e AC-16 |
| 1.3 | 2026-11-03 | Equipe de Produto | Tabela Unificada de Erros, clock_timestamp(), teste de carga AC-05, novos critérios AC-17 ao AC-24, ordenação condicional VET |
| 1.4 | 2026-11-03 | Equipe de Produto | Parâmetros configuráveis, VET sem alíquotas fixas de IOF, extensão única de oferta, checkpoint de no-show/strikes, MFA, modal pré-aceite e teto de valor (total de 31 ACs) |
| 1.5 | 2026-11-03 | Equipe de Produto | Reposicionamento estrutural v1.5 para PLATAFORMA DE COMUNICAÇÃO inspirada no Melhor Câmbio (Nomad); substituição do conceito de "negociação" por "Atendimento Comercial" e status `EM_ATENDIMENTO`; introdução do relato bilateral de desfecho em AC-04 (`CONCLUÍDO` vs. `NÃO_CONCLUÍDO` com motivo); substituição do bloqueio rígido pós-match por desistência voluntária em AC-08; criação de AC-29 (Relato de Problema à Moderação da Plataforma sem mediação financeira) e AC-30 (Timeout de Atendimento para `SEM_RETORNO`); migração de extensão de oferta, checkpoint de no-show, strikes e alertas de PLD para Future Considerations; atualização da Tabela Unificada de Erros; e fixação em 30 Critérios de Aceitação ativos no MVP. |
