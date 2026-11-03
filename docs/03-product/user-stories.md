---
artifact: user-story
version: "1.5"
created: 2026-11-03
status: draft
---

# User Stories: Marketplace de Câmbio por Melhor Oferta (MVP — Versão 1.5)

Este documento consolida as 30 User Stories do MVP, estruturadas por Épico e Perfil de Usuário, seguindo a especificação do [PRD](prd.md) (versão 1.5) e o formato da skill `deliver-user-stories`.

---

## Sumário de User Stories

| ID | Título | Persona | Prioridade | Épico |
|----|--------|---------|------------|-------|
| US-001 | Autocadastro de Cliente | Cliente | P0 | Épico 1: Onboarding e Autenticação |
| US-002 | Autocadastro de Casa de Câmbio (KYB) | Casa (Owner) | P0 | Épico 1: Onboarding e Autenticação |
| US-003 | Aprovação/Reprovação de Casa pelo Admin | Admin | P0 | Épico 1: Onboarding e Autenticação |
| US-004 | Consulta de Cotação de Referência | Cliente / Casa | P0 | Épico 2: Cotações de Referência |
| US-005 | Fallback e Cache de Cotação | Sistema | P0 | Épico 2: Cotações de Referência |
| US-006 | Publicação de Oferta de Câmbio | Cliente | P0 | Épico 3: Ofertas |
| US-007 | Configuração de Prazo de Expiração da Oferta | Cliente | P0 | Épico 3: Ofertas |
| US-008 | Cancelamento de Oferta sem Match | Cliente | P0 | Épico 3: Ofertas |
| US-009 | Visualização e Histórico de Ofertas | Cliente | P0 | Épico 3: Ofertas |
| US-010 | Recebimento de Ofertas Elegíveis em Tempo Real | Casa (Operador) | P0 | Épico 4: Aceite e Contrapropostas |
| US-011 | Aceite Direto de Oferta (Match Automático) | Casa (Operador) | P0 | Épico 4: Aceite e Contrapropostas |
| US-012 | Envio de Contraproposta por Casa | Casa (Operador) | P0 | Épico 4: Aceite e Contrapropostas |
| US-013 | Visualização e Comparação de Contrapropostas | Cliente | P0 | Épico 4: Aceite e Contrapropostas |
| US-014 | Aceite de Contraproposta pelo Cliente | Cliente | P0 | Épico 4: Aceite e Contrapropostas |
| US-015 | Recusa de Contraproposta pelo Cliente | Cliente | P1 | Épico 4: Aceite e Contrapropostas |
| US-016 | Resolução Transacional de Concorrência de Aceite | Sistema | P0 | Épico 5: Match e Atendimento Comercial |
| US-017 | Encerramento em Cascata de Propostas Concorrentes | Sistema | P0 | Épico 5: Match e Atendimento Comercial |
| US-018 | Acompanhamento do Atendimento Comercial e Revelação Segura de Contatos | Cliente / Casa | P0 | Épico 5: Match e Atendimento Comercial |
| US-019 | Relato de Desfecho do Atendimento Comercial e Conclusão / Sem Retorno | Casa (Operador) / Cliente | P0 | Épico 5: Match e Atendimento Comercial |
| US-020 | Relato de Problema à Moderação da Plataforma (Qualidade sem Mediação Financeira) | Cliente / Casa | P1 | Épico 5: Match e Atendimento Comercial |
| US-021 | Cadastro de Taxas de Balcão na Vitrine | Casa (Owner/Operador) | P1 | Épico 6: Vitrine Informativa |
| US-022 | Consulta da Vitrine de Taxas | Cliente | P1 | Épico 6: Vitrine Informativa |
| US-023 | Notificações em Tempo Real via WebSocket | Cliente / Casa | P0 | Épico 7: Notificações |
| US-024 | Notificações Multicanal para Operadores Offline | Casa (Operador) / Cliente | P1 | Épico 7: Notificações |
| US-025 | Gestão de Operadores e Membros da Casa | Casa (Owner) | P1 | Épico 8: Gestão e Governança |
| US-026 | Suspensão Preventiva de Casa pelo Admin | Admin | P0 | Épico 8: Gestão e Governança |
| US-027 | Log de Auditoria de Ações Transacionais | Admin / Sistema | P0 | Épico 8: Gestão e Governança |
| US-028 | Autenticação Multifator (MFA) Obrigatória para Casas de Câmbio | Casa (Owner/Operador) | P0 | Épico 1: Onboarding e Autenticação |
| US-029 | Confirmação Pré-Aceite com Resumo Financeiro Vinculante | Cliente / Casa (Operador) | P0 | Épico 4: Aceite e Contrapropostas |
| US-030 | Controle de Teto de Valor por Oferta no Piloto | Sistema / Admin | P0 | Épico 3: Ofertas |

---

## Épico 1: Onboarding e Autenticação

### US-001: Autocadastro de Cliente com Validação Mínima
**Story Header:**
- **ID:** US-001
- **Título:** Autocadastro e ativação de conta de Cliente com verificação de identidade e telefone
- **Persona:** Cliente (Pessoa Física ou Representante PJ)
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Onboarding e Autenticação

**Statement:**
> **Como** cliente interessado em negociar moeda estrangeira,
> **quero** me cadastrar na plataforma informando meus dados básicos e validando meu e-mail e telefone via código OTP,
> **para que** eu possa publicar ofertas e receber propostas de casas autorizadas com perfil verificado.

**Context & Background:**
O cliente precisa ter conta ativa para vincular suas ofertas. A plataforma realiza validação cadastral de CPF (para Pessoa Física) ou CNPJ (para Pessoa Jurídica) e verificação de telefone (OTP via SMS ou WhatsApp) para inibir contas falsas ou spam. A verificação documental rigorosa (KYC cambial completo) ocorre na própria casa de câmbio durante a formalização do contrato de câmbio (sem custódia pela plataforma [A VALIDAR COM ADVOGADO]). A plataforma coleta dados mínimos e consentimento LGPD.

**Acceptance Criteria:**
- **AC-1 (Cadastro PF/PJ com verificação de telefone OTP):**
  - **Given** que sou um usuário não autenticado na página de cadastro,
  - **When** preencho nome/razão social, CPF ou CNPJ válido, e-mail, telefone celular e senha forte, aceito os Termos e a Política de Privacidade (LGPD) e envio,
  - **Then** recebo código de verificação OTP por SMS ou WhatsApp e código por e-mail, e minha conta é criada no status `PENDENTE_CONFIRMACAO`.
- **AC-2 (Validação de duplicidade):**
  - **Given** que já existe uma conta cadastrada com o CPF, telefone ou e-mail informado,
  - **When** tento submeter o formulário de cadastro,
  - **Then** o sistema exibe mensagem de erro amigável sem vazar detalhes sensíveis e impede a criação de conta duplicada.
- **AC-3 (Ativação e primeiro acesso):**
  - **Given** que informei os códigos de confirmação corretos,
  - **When** os códigos são validados com sucesso,
  - **Then** minha conta passa para status `ATIVA` e recebo um token JWT para acessar as rotas autenticadas.

**Technical Notes:**
- Senhas com hash Argon2id ou bcrypt (cost factor >= 12).
- Autenticação via JWT com access token (15m) e refresh token em cookie seguro httpOnly.
- Provedor de SMS/WhatsApp OTP integrado (ex.: Zenvia, Twilio).
- Conformidade com LGPD: registro de timestamp e versão dos termos aceitos.

---

### US-002: Autocadastro de Casa de Câmbio (KYB)
**Story Header:**
- **ID:** US-002
- **Título:** Submissão de Cadastro Institucional e Documental de Casa de Câmbio
- **Persona:** Casa de Câmbio (Owner)
- **Prioridade:** P0 | **Estimativa:** L | **Épico:** Onboarding e Autenticação

**Statement:**
> **Como** proprietário ou responsável legal de uma casa de câmbio,
> **quero** cadastrar os dados da minha empresa, pontos de atendimento e documentação regulatória,
> **para que** o administrador da plataforma aprove meu acesso para operar no marketplace.

**Context & Background:**
Câmbio é atividade regulada pelo Banco Central do Brasil. Somente instituições autorizadas podem participar. O fluxo inicia com status `PENDENTE` e avança para `EM_ANÁLISE` após envio dos documentos.

**Acceptance Criteria:**
- **AC-1 (Submissão completa de dados e documentos):**
  - **Given** que sou o Owner de uma casa de câmbio iniciando o onboarding,
  - **When** informo CNPJ, Razão Social, Nome Fantasia, Responsável Legal, número de registro/autorização no Banco Central, cidades atendidas (RJ e/ou SP), moedas operadas, produtos suportados (papel-moeda e/ou cartão pré-pago) e anexo contrato social e comprovante de autorização BC,
  - **Then** o cadastro é gravado com status `EM_ANÁLISE` e o Admin da plataforma é notificado para revisão.
- **AC-2 (Bloqueio operacional antes de aprovação):**
  - **Given** que minha casa está no status `PENDENTE` ou `EM_ANÁLISE`,
  - **When** logo no painel da casa,
  - **Then** vejo um banner informativo indicando que o cadastro está em revisão e não recebo nenhuma oferta em tempo real.

**Dependencies:** US-003 (Aprovação pelo Admin).

---

### US-003: Aprovação/Reprovação de Casa pelo Admin
**Story Header:**
- **ID:** US-003
- **Título:** Análise e Aprovação KYB de Casas de Câmbio
- **Persona:** Admin da Plataforma
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Onboarding e Autenticação

**Statement:**
> **Como** administrador da plataforma,
> **quero** analisar os documentos e a regularidade de uma casa de câmbio cadastrada,
> **para que** eu aprove ou reprove sua habilitação, garantindo que apenas casas autorizadas pelo Banco Central operem.

**Acceptance Criteria:**
- **AC-1 (Aprovação de casa elegível):**
  - **Given** uma casa no status `EM_ANÁLISE` com documentação anexada,
  - **When** o Admin verifica os dados no Sisbacen/Cademp e clica em "Aprovar Casa",
  - **Then** o status da casa muda para `APROVADA`, um evento de auditoria é registrado com o ID do Admin e a casa passa a estar elegível a receber ofertas no WebSocket.
- **AC-2 (Reprovação com motivo):**
  - **Given** uma casa com documentos ilegíveis ou dados divergentes,
  - **When** o Admin clica em "Reprovar" e preenche a justificativa obrigatória,
  - **Then** o status da casa retorna para `PENDENTE`, e o Owner recebe e-mail com as pendências apontadas.

---

## Épico 2: Cotações de Referência

### US-004: Consulta de Cotação de Referência
**Story Header:**
- **ID:** US-004
- **Título:** Exibição de Cotação Comercial, Turismo e PTAX em Tempo Real
- **Persona:** Cliente / Operador de Casa
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Cotações de Referência

**Statement:**
> **Como** usuário (cliente ou operador),
> **quero** visualizar na interface a cotação de mercado atualizada da moeda desejada,
> **para que** eu tenha referência financeira justa ao definir ou avaliar taxas de câmbio.

**Acceptance Criteria:**
- **AC-1 (Exibição via WebSocket/Cache):**
  - **Given** que selecionei o par USD/BRL na tela de negociação,
  - **When** a interface carrega ou recebe atualização do WebSocket,
  - **Then** são exibidas as cotações Comercial (compra/venda), Turismo e última PTAX disponível, com timestamp de atualização legível.
- **AC-2 (Isolamento da API externa):**
  - **Given** qualquer interação na interface do cliente ou da casa,
  - **When** inspecionadas as requisições de rede,
  - **Then** nenhuma requisição direta é feita pelo frontend ao provedor externo (AwesomeAPI); todos os dados vêm do backend via `/api/quotes` ou WebSocket `/quotes`.

---

### US-005: Fallback e Cache de Cotação no Backend
**Story Header:**
- **ID:** US-005
- **Título:** Resiliência de Coleta de Cotações com Cache Redis e Fallback
- **Persona:** Sistema
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Cotações de Referência

**Statement:**
> **Como** sistema,
> **quero** coletar cotações em job agendado, armazenar em Redis com TTL e acionar fallback em caso de falha,
> **para que** o frontend sempre disponha de cotações com baixa latência e alta disponibilidade.

**Acceptance Criteria:**
- **AC-1 (Coleta periódica e cache):**
  - **Given** o cron de 60 segundos no NestJS,
  - **When** a AwesomeAPI responde com sucesso,
  - **Then** os dados são gravados no Redis com TTL de 300 segundos e emitidos no canal Socket.IO `quotes:rates`.
- **AC-2 (Fallback em indisponibilidade):**
  - **Given** que a AwesomeAPI falhe com timeout ou erro 5xx,
  - **When** o job tenta consultar a cotação,
  - **Then** o sistema aciona o provedor secundário de fallback [HIPÓTESE – A VALIDAR provedor secundário], ou serve a última cotação válida do cache sinalizando flag `stale: true`.

---

## Épico 3: Ofertas

### US-006: Publicação de Oferta de Câmbio com Limite e Alerta de Taxa
**Story Header:**
- **ID:** US-006
- **Título:** Criação e Publicação de Nova Oferta pelo Cliente com Limite Simultâneo e Alerta de Discrepância
- **Persona:** Cliente
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Ofertas

**Statement:**
> **Como** cliente autenticado com telefone verificado,
> **quero** publicar uma oferta especificando moeda, operação (compra/venda), valor, taxa desejada (BRL por unidade), produto e modalidade de entrega,
> **para que** as casas de câmbio elegíveis avaliem e respondam à minha solicitação.

**Acceptance Criteria:**
- **AC-1 (Publicação com campos válidos e dados territoriais):**
  - **Given** que estou autenticado, possuo menos ofertas ativas simultâneas que o limite permitido ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)) e preencho: Moeda (ex: USD), Operação (COMPRA - perspectiva do cliente), Valor (abaixo do teto parametrizado), Taxa Desejada (expressa em valor total final tudo incluso, conforme recomendação em aberto nº 1; IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas), Produto (PAPEL_MOEDA), Modalidade (RETIRADA ou DELIVERY), Cidade (SP), Região/Bairro (ex: "Zona Sul - Moema"), Prazo (ex: 30 minutos),
  - **When** clico em "Publicar Oferta",
  - **Then** a oferta é criada com status `ABERTA` e `extensions_count = 0`, recebe um ID único, agenda job de expiração no BullMQ e emite evento WebSocket `offer:created` para as casas elegíveis com dados anônimos (incluindo Região/Bairro, sem expor dados pessoais nem logradouro/CEP).
- **AC-2 (Alerta de taxa discrepante e ausência de cotação):**
  - **Given** que informei uma taxa desejada com desvio superior ao limite parametrizado em relação à cotação de mercado de referência ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
  - **When** clico em "Publicar Oferta",
  - **Then** o sistema exibe modal de confirmação alertando sobre a grande diferença em relação à cotação do momento antes de efetivar a publicação; caso o serviço de cotação de referência esteja temporariamente indisponível, o sistema exibe banner informativo, solicita confirmação atenta dos valores e **permite a publicação sem bloqueio**.
- **AC-3 (Bloqueio por limite de ofertas simultâneas):**
  - **Given** que já possuo o número máximo de ofertas no status `ABERTA` simultaneamente ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
  - **When** tento criar uma nova oferta concorrente,
  - **Then** o sistema bloqueia a criação com HTTP 422 Unprocessable Entity (`OFFER_LIMIT_REACHED`) e mensagem: *"Limite de ofertas abertas simultâneas atingido. Cancele uma oferta ativa ou aguarde seu encerramento."*.

---

### US-007: Configuração de Prazo de Expiração da Oferta
**Story Header:**
- **ID:** US-007
- **Título:** Definição de Prazo de Validade e Expiração Automática
- **Persona:** Cliente / Sistema
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Ofertas

**Statement:**
> **Como** cliente,
> **quero** selecionar o tempo de validade da minha oferta (respeitando limites mínimo e máximo configuráveis),
> **para que** minha intenção de compra não fique aberta caso o mercado se mova.

**Acceptance Criteria:**
- **AC-1 (Agendamento no BullMQ):**
  - **Given** uma oferta criada com prazo de 30 minutos,
  - **When** a oferta é persistida no PostgreSQL,
  - **Then** é agendado no BullMQ um job com delay exato de 30 minutos indexado pelo ID da oferta e data `expires_at` sincronizada no relógio do banco.
- **AC-2 (Transição para EXPIRADA com encerramento de propostas):**
  - **Given** que o prazo de 30 minutos transcorreu e a oferta permanece no status `ABERTA`,
  - **When** o worker do BullMQ processa o job (ou na varredura periódica de segurança com base no relógio oficial `clock_timestamp()` via [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)),
  - **Then** a oferta transiciona atomicamente para `EXPIRADA`, todas as contrapropostas pendentes vinculadas mudam para `ENCERRADA` (registrando o motivo `OFERTA_EXPIRADA` em auditoria) e eventos WebSocket correspondentes são emitidos.

---

### US-008: Cancelamento de Oferta sem Match
**Story Header:**
- **ID:** US-008
- **Título:** Cancelamento Voluntário de Oferta Ativa pelo Cliente com Encerramento de Propostas
- **Persona:** Cliente
- **Prioridade:** P0 | **Estimativa:** S | **Épico:** Ofertas

**Statement:**
> **Como** cliente que publicou uma oferta,
> **quero** cancelar minha oferta enquanto nenhum match tiver ocorrido,
> **para que** eu encerre a negociação sem compromisso caso desista da operação.

**Acceptance Criteria:**
- **AC-1 (Cancelamento bem-sucedido com encerramento em cascata):**
  - **Given** uma oferta no status `ABERTA`,
  - **When** o cliente clica em "Cancelar Oferta" e confirma,
  - **Then** o status da oferta muda para `CANCELADA`, o job de expiração no BullMQ é removido, todas as contrapropostas pendentes existentes mudam para `ENCERRADA` (com motivo `OFERTA_CANCELADA` registrado em auditoria) e as casas são notificadas.
- **AC-2 (Bloqueio de cancelamento pré-match se atendimento já iniciado):**
  - **Given** que uma casa acabou de efetuar o match no mesmo milissegundo,
  - **When** a requisição de cancelamento pré-match chega ao banco,
  - **Then** a transação detecta o status `FECHADA` e rejeita o cancelamento com status HTTP 422 Unprocessable Entity (`OFFER_ALREADY_CLOSED`) e mensagem padronizada: *"Esta oferta já foi aceita e resultou em um atendimento comercial em andamento. Para desistir do atendimento, acesse a tela de atendimento e selecione 'Desistir'."*.

---

## Épico 4: Aceite Direto e Contrapropostas

### US-010: Recebimento de Ofertas Elegíveis em Tempo Real (Oferta Anônima)
**Story Header:**
- **ID:** US-010
- **Título:** Filtragem e Distribuição de Ofertas Anônimas para Casas Elegíveis
- **Persona:** Casa de Câmbio (Operador)
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Aceite e Contrapropostas

**Statement:**
> **Como** operador de casa de câmbio logado no painel,
> **quero** receber ofertas publicadas que correspondam exatamente às moedas, produtos e cidades em que minha casa atua,
> **para que** eu visualize apenas oportunidades reais de negócio sem poluição visual e com total respeito à privacidade.

**Acceptance Criteria:**
- **AC-1 (Entrega no room do Socket.IO com oferta anônima):**
  - **Given** que minha casa está `APROVADA` e opera USD, PAPEL_MOEDA na cidade de SP,
  - **When** um cliente publica oferta com esses exatos parâmetros,
  - **Then** recebo em tempo real (latência < 500ms) a notificação com os dados da oferta contendo apenas: ID da oferta, Moeda, Operação, Valor, Taxa Desejada (BRL/unidade), Produto, Cidade, Região/Bairro e Modalidade (sem nome, sem CPF/CNPJ, sem e-mail, sem telefone e sem endereço detalhado de entrega/logradouro/CEP).
- **AC-2 (Não recebimento de ofertas incompatíveis):**
  - **Given** que minha casa não opera EUR ou não atende a cidade do RJ,
  - **When** uma oferta nesses parâmetros é publicada,
  - **Then** o socket da minha casa não recebe o evento correspondente.

---

### US-011: Aceite Direto de Oferta (Match Automático)
**Story Header:**
- **ID:** US-011
- **Título:** Aceite Integral da Taxa e Condições da Oferta com Decomposição Transparente
- **Persona:** Casa de Câmbio (Operador)
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Aceite e Contrapropostas

**Statement:**
> **Como** operador de casa de câmbio autenticado com MFA,
> **quero** aceitar integralmente a taxa e as condições de uma oferta publicada informando a decomposição de taxas e encargos,
> **para que** haja match automático imediato e eu garanta a operação para minha casa (ciente de que no aceite direto o cliente não escolhe a casa; a primeira a confirmar vence).

**Acceptance Criteria:**
- **AC-1 (Match imediato na primeira aceitação com modal de confirmação):**
  - **Given** uma oferta com status `ABERTA`,
  - **When** o operador preenche a decomposição informada pela casa (taxa de câmbio pura, IOF e tarifas para fins de transparência; IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas), revisa no modal de confirmação ([US-027]) e clica em "Confirmar Aceite Vinculante",
  - **Then** o backend executa transação atômica serializada conforme [ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md), valida cumulativamente que `status = 'ABERTA'`, `expires_at > clock_timestamp()` no relógio em tempo real do banco de dados e casa `APROVADA`, transiciona a Oferta para `FECHADA`, gera o registro de Atendimento Comercial no status `EM_ATENDIMENTO`, encerra as contrapropostas concorrentes pendentes com motivo `MATCH_OUTRA_CASA` e revela bilateralmente os contatos diretos (telefone e e-mail) para cliente e casa.
- **AC-2 (Perda da disputa concorrente):**
  - **Given** que outro operador de outra casa enviou o aceite antes,
  - **When** minha requisição é avaliada pela transação,
  - **Then** o sistema retorna HTTP 409 Conflict (`OFFER_ALREADY_ACCEPTED`) avisando que a oferta já foi aceita por outra casa e meu aceite não é processado.

---

### US-012: Envio de Contraproposta Estruturada por Casa
**Story Header:**
- **ID:** US-012
- **Título:** Formulação e Envio de Contraproposta com Campos Estruturados
- **Persona:** Casa de Câmbio (Operador)
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Aceite e Contrapropostas

**Statement:**
> **Como** operador de casa de câmbio que não pode cumprir a taxa exata solicitada,
> **quero** enviar uma contraproposta especificando taxa em reais, montante integral da moeda, prazo_validade_minutos, impostos/tarifas discriminados e local de atendimento,
> **para que** o cliente possa avaliar minha proposta competitiva de forma clara.

**Acceptance Criteria:**
- **AC-1 (Criação de Proposta PENDENTE com campos estruturados e atendimento integral):**
  - **Given** uma oferta `ABERTA`,
  - **When** informo a Taxa Proposta (BRL/unidade), o Valor (obrigatoriamente idêntico ao montante da oferta original no MVP — atendimento integral obrigatório), o `prazo_validade_minutos` (conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)), o Ponto/Local de Atendimento (`local_atendimento`, informando região/bairro da loja ou área de entrega pré-match) e a decomposição informada pela casa (taxa pura, IOF e eventuais tarifas; IOF e demais encargos: valor informado pela casa; alíquotas variam por operação e produto e mudam com frequência [VALIDAR COM ESPECIALISTA TRIBUTÁRIO]. O sistema não calcula nem fixa alíquotas) e envio,
  - **Then** a proposta é gravada como `PENDENTE`, calcula o valor total final em reais (VET), define a validade efetiva como $\min(\text{prazo\_validade\_minutos}, \text{tempo restante da oferta})$, não altera o status da oferta e aparece na listagem de contrapropostas do cliente.
- **AC-2 (Substituição com teto de revisões e cooldown):**
  - **Given** que minha casa já tinha uma contraproposta `PENDENTE` para aquela oferta e respeitou o cooldown entre envios ([Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
  - **When** envio uma nova contraproposta mais agressiva (dentro do teto máximo de revisões por oferta por casa),
  - **Then** a proposta anterior muda para `SUBSTITUÍDA` e a nova proposta assume o status `PENDENTE`.

---

### US-013: Visualização e Comparação de Contrapropostas pelo Valor Total em Reais (VET)
**Story Header:**
- **ID:** US-013
- **Título:** Painel de Contrapropostas Recebidas pelo Cliente com Comparação por Valor Total
- **Persona:** Cliente
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Aceite e Contrapropostas

**Statement:**
> **Como** cliente com oferta publicada,
> **quero** ver em tempo real todas as contrapropostas recebidas organizadas pelo valor total em reais (VET) e com detalhes da condição,
> **para que** eu compare objetivamente e decida qual aceitar.

**Acceptance Criteria:**
- **AC-1 (Listagem e ordenação condicional pelo valor total em reais):**
  - **Given** que minha oferta está `ABERTA`,
  - **When** contrapropostas são recebidas de diferentes casas,
  - **Then** a lista exibe cada proposta com Taxa (BRL/unidade), Valor Total a Pagar/Receber em Reais (VET), Prazo Restante da Proposta e Local de Atendimento, ordenando no topo a melhor condição financeira:
    - Operação `COMPRA`: ordenação **ascendente** (`ORDER BY total_brl ASC`, menor desembolso total no topo);
    - Operação `VENDA`: ordenação **descendente** (`ORDER BY total_brl DESC`, maior valor total recebido no topo).
- **AC-2 (Destaque visual da melhor taxa):**
  - **Given** múltiplas contrapropostas pendentes,
  - **When** visualizo a lista,
  - **Then** a proposta com menor desembolso total (na compra) ou maior recebimento total (na venda) recebe badge de "Melhor Oferta".

---

### US-014: Aceite de Contraproposta pelo Cliente
**Story Header:**
- **ID:** US-014
- **Título:** Escolha e Aceite de Contraproposta pelo Cliente
- **Persona:** Cliente
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Aceite e Contrapropostas

**Statement:**
> **Como** cliente,
> **quero** aceitar uma das contrapropostas recebidas da lista com revisão prévia em modal vinculante ([US-027]),
> **para que** o match seja consolidado com aquela casa específica e iniciemos o atendimento comercial com acesso aos contatos diretos.

**Acceptance Criteria:**
- **AC-1 (Consolidação do Match via Contraproposta):**
  - **Given** uma contraproposta no status `PENDENTE` com prazo não expirado,
  - **When** clico em "Aceitar Esta Proposta" e confirmo no modal pré-aceite,
  - **Then** a transação atômica serializada ([ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)) valida `expires_at > clock_timestamp()`, muda a Proposta selecionada para `ACEITA`, a Oferta para `FECHADA`, todas as demais propostas para `ENCERRADA` com motivo `MATCH_OUTRA_CASA` e gera o Atendimento Comercial `EM_ATENDIMENTO` com revelação bilateral de contatos.
- **AC-2 (Tentativa de aceite em proposta expirada):**
  - **Given** que a contraproposta acabou de atingir seu prazo limite de validade,
  - **When** o cliente tenta aceitar,
  - **Then** o sistema rejeita a operação com HTTP 400 Bad Request (`PROPOSAL_EXPIRED`) sem alterar estado na requisição, avisa que a proposta expirou e atualiza a listagem mantendo a oferta principal aberta.

---

### US-015: Recusa de Contraproposta pelo Cliente e Reenvio
**Story Header:**
- **ID:** US-015
- **Título:** Rejeição Individual de Contraproposta Inadequada e Possibilidade de Nova Proposta
- **Persona:** Cliente / Casa (Operador)
- **Prioridade:** P1 | **Estimativa:** S | **Épico:** Aceite e Contrapropostas

**Statement:**
> **Como** cliente,
> **quero** recusar individualmente uma contraproposta que não me interesse,
> **para que** ela suma da minha lista de opções ativas e a casa seja informada, permitindo que ela contraproponha uma taxa melhor caso deseje.

**Acceptance Criteria:**
- **AC-1 (Recusa de proposta):**
  - **Given** uma proposta `PENDENTE`,
  - **When** o cliente clica em "Recusar",
  - **Then** o status da proposta muda para `RECUSADA`, sai da lista de opções ativas do cliente e a casa recebe aviso de que sua proposta foi recusada.
- **AC-2 (Reenvio de contraproposta pela casa após recusa):**
  - **Given** que a proposta da casa foi marcada como `RECUSADA` e a oferta principal permanece `ABERTA`,
  - **When** o operador da casa formula uma nova contraproposta respeitando o cooldown de 30 segundos e o teto máximo de 3 revisões por oferta [HIPÓTESE – A VALIDAR],
  - **Then** o sistema permite a submissão e a nova proposta entra na lista do cliente com status `PENDENTE`.

---

## Épico 5: Match e Atendimento Comercial

### US-016: Resolução Transacional de Concorrência de Aceite
**Story Header:**
- **ID:** US-016
- **Título:** Controle de Concorrência Transacional no Match Simultâneo
- **Persona:** Sistema
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Match e Atendimento Comercial

**Statement:**
> **Como** arquitetura de dados do sistema,
> **quero** que o processo de match seja executado sob controle transacional atômico serializado no backend ([ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)),
> **para que** sob nenhuma circunstância duas casas consigam dar match na mesma oferta.

**Acceptance Criteria:**
- **AC-1 (Concorrência simultânea controlada com validação no banco):**
  - **Given** duas casas A e B disparando requisição de aceite para a mesma oferta no mesmo milissegundo,
  - **When** o backend executa a transação serializada ([ADR-0006](../04-architecture/adr/adr-0006-concorrencia-match.md)), validando cumulativamente que `status = 'ABERTA'`, `expires_at > clock_timestamp()` no relógio em tempo real do banco de dados e casa operadora `APROVADA`,
  - **Then** apenas a primeira transação comita com sucesso (HTTP 200/201 OK gerando atendimento no status `EM_ATENDIMENTO`) e a segunda é abortada com status HTTP 409 Conflict (`OFFER_ALREADY_ACCEPTED`), sem alterar o estado do registro da oferta na requisição rejeitada.
- **AC-2 (Garantia de unicidade de Atendimento Comercial):**
  - **Given** a tabela de atendimentos (`atendimentos` / `negotiations`),
  - **When** consultada para uma oferta com match,
  - **Then** existe exatamente 1 registro de atendimento associado ao `offer_id` (garantido por controle de concorrência e constraint `UNIQUE (offer_id)` no schema).

---

### US-017: Encerramento em Cascata de Propostas Concorrentes
**Story Header:**
- **ID:** US-017
- **Título:** Finalização Automática de Propostas Concorrentes após Match, Expiração ou Cancelamento
- **Persona:** Sistema
- **Prioridade:** P0 | **Estimativa:** S | **Épico:** Match e Atendimento Comercial

**Statement:**
> **Como** sistema,
> **quero** que, ao consolidar qualquer match, ou quando uma oferta expira ou é cancelada pelo cliente, todas as contrapropostas pendentes recebam status ENCERRADA,
> **para que** os operadores das casas saibam imediatamente que a oferta não está mais disponível e o motivo específico seja auditado.

**Acceptance Criteria:**
- **AC-1 (Atualização em cascata no match):**
  - **Given** uma oferta com contrapropostas `PENDENTE`,
  - **When** ocorre o match da oferta (aceite direto ou aceite de contraproposta),
  - **Then** todas as demais propostas `PENDENTE` mudam para `ENCERRADA` na mesma transação registrando motivo `MATCH_OUTRA_CASA` em auditoria, e operadores recebem notificação via WebSocket e canais configurados.
- **AC-2 (Atualização em cascata na expiração ou cancelamento):**
  - **Given** uma oferta com contrapropostas `PENDENTE`,
  - **When** a oferta expira por tempo verificado no relógio atômico do banco (`clock_timestamp()`) ou é cancelada pelo cliente,
  - **Then** todas as contrapropostas vinculadas mudam para `ENCERRADA` com motivo auditado `OFERTA_EXPIRADA` ou `OFERTA_CANCELADA`.

---

### US-018: Acompanhamento do Atendimento Comercial e Revelação Segura de Contatos
**Story Header:**
- **ID:** US-018
- **Título:** Painel de Atendimento Comercial com Revelação Bilateral de Contatos Pós-Match
- **Persona:** Cliente / Casa (Operador)
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Match e Atendimento Comercial

**Statement:**
> **Como** cliente ou operador de casa participante de um match recém-formado,
> **quero** visualizar na tela de atendimento os canais diretos de contato da contraparte (telefone, WhatsApp, e-mail e endereço da loja ou de entrega),
> **para que** possamos estabelecer contato imediato e concluir a operação cambial diretamente fora da plataforma durante a janela informada.

**Acceptance Criteria:**
- **AC-1 (Liberação bilateral de dados de contato exclusivamente pós-match):**
  - **Given** que o match foi confirmado transacionalmente e o status é `EM_ATENDIMENTO`,
  - **When** cliente e operador acessam a tela de atendimento,
  - **Then** os canais de contato mútuos são revelados: telefone/WhatsApp e e-mail do cliente para a casa vencedora; e telefone, WhatsApp, e-mail institucional e endereço da loja física da casa (ou área de entrega acordada) para o cliente.
- **AC-2 (Aviso explícito de plataforma de comunicação sem custódia):**
  - **Given** a tela de atendimento,
  - **When** visualizada por qualquer das partes,
  - **Then** é exibido aviso legal destacado: *"A plataforma atua estritamente como canal de comunicação e aproximação tecnológica [VALIDAR COM ADVOGADO]. O pagamento, a entrega do dinheiro e a formalização do contrato cambial ocorrem diretamente entre o cliente e a instituição autorizada."*
- **AC-3 (Janela comercial informada):**
  - **Given** a tela de atendimento ativa,
  - **When** consultada,
  - **Then** a interface indica a Janela Comercial de Atendimento (`JANELA_ATENDIMENTO_HORAS`, padrão: 24h úteis) para que as partes entrem em contato direto, informando que a plataforma não realiza a execução do câmbio.

---

### US-019: Relato de Desfecho do Atendimento Comercial e Conclusão / Sem Retorno
**Story Header:**
- **ID:** US-019
- **Título:** Relato Bilateral de Desfecho do Atendimento Comercial e Encerramento
- **Persona:** Casa (Operador) e Cliente
- **Prioridade:** P0 | **Estimativa:** S | **Épico:** Match e Atendimento Comercial

**Statement:**
> **Como** operador de casa de câmbio ou cliente participante de um atendimento comercial pós-match,
> **quero** relatar voluntariamente à plataforma se o atendimento foi concluído com sucesso ou se houve insucesso/desistência,
> **para que** o histórico operacional seja encerrado de forma transparente e alimente as métricas qualitativas da rede.

**Acceptance Criteria:**
- **AC-1 (Relato de conclusão com sucesso):**
  - **Given** um atendimento no status `EM_ATENDIMENTO`,
  - **When** cliente e casa selecionam o desfecho "Concluído", ou uma das partes confirma e a outra não manifesta divergência dentro do prazo da janela,
  - **Then** o atendimento transiciona para o status `CONCLUÍDO`, com registro de timestamp em log de auditoria.
- **AC-2 (Relato de insucesso ou desistência voluntária com motivo):**
  - **Given** um atendimento no status `EM_ATENDIMENTO`,
  - **When** qualquer uma das partes seleciona "Não Concluído" ou aciona "Desistir do Atendimento",
  - **Then** o sistema exige a seleção de um motivo padronizado (`CLIENTE_DESISTIU`, `CASA_NAO_ATENDEU`, `TAXA_NAO_MANTIDA` ou `OUTRO`), notifica a contraparte imediatamente e transiciona o status para `NÃO_CONCLUÍDO`, gravando os detalhes em auditoria.
- **AC-3 (Timeout automático por ausência de manifestação bilateral):**
  - **Given** um atendimento que atinja o timeout limite de inatividade (`TIMEOUT_RELATO_DESFECHO_DIAS`, padrão: 5 dias úteis com aviso prévio de 48h) sem que nenhuma parte tenha registrado desfecho,
  - **When** o job periódico de varredura do BullMQ executa,
  - **Then** o sistema transiciona o atendimento automaticamente para `SEM_RETORNO`, arquivando o histórico sem bloqueios ou penalidades financeiras.

---

### US-020: Relato de Problema à Moderação da Plataforma (Qualidade sem Mediação Financeira)
**Story Header:**
- **ID:** US-020
- **Título:** Relato de Irregularidade para Moderação de Cadastro pelo Admin
- **Persona:** Cliente / Casa (Operador) / Admin
- **Prioridade:** P1 | **Estimativa:** M | **Épico:** Match e Atendimento Comercial

**Statement:**
> **Como** cliente ou operador, caso identifique descumprimento injustificado de taxa, contato fraudulento ou conduta inadequada da contraparte,
> **quero** acionar a funcionalidade "Relatar Problema" para notificar a equipe de suporte e governança da plataforma,
> **para que** a administração aplique moderação sobre o cadastro dos envolvidos, sem envolver mediação financeira ou custódia de valores.

**Acceptance Criteria:**
- **AC-1 (Envio de relato de problema):**
  - **Given** um atendimento com status `EM_ATENDIMENTO` ou recém-finalizado,
  - **When** o usuário clica em "Relatar Problema" e submete uma descrição objetiva do ocorrido (ex.: "casa recusou a taxa combinada na loja", "cliente informou telefone inexistente"),
  - **Then** o relato é gravado em auditoria vinculado ao atendimento e uma notificação de alta prioridade é enviada à fila de moderação do painel Admin.
- **AC-2 (Ações de governança administrativa):**
  - **Given** a fila de relatos no painel Admin,
  - **When** o administrador revisa a reincidência de relatos de uma casa ou cliente,
  - **Then** o Admin pode: (a) Manter advertência interna, (b) Suspender preventivamente a casa parceira (`SUSPENSA`) caso haja quebra reiterada de taxas combinadas, ou (c) Limitar a publicação de novas ofertas do cliente caso haja padrão de contatos falsos ou desistências abusivas, resguardando a qualidade da rede sem praticar qualquer mediação ou retenção financeira.

---

## Épico 6: Vitrine Informativa

### US-021: Cadastro de Taxas de Balcão na Vitrine
**Story Header:**
- **ID:** US-021
- **Título:** Manutenção de Tabela de Taxas Padrão de Balcão
- **Persona:** Casa de Câmbio (Owner/Operador)
- **Prioridade:** P1 | **Estimativa:** S | **Épico:** Vitrine Informativa

**Statement:**
> **Como** operador ou gestor de uma casa de câmbio,
> **quero** manter atualizadas minhas taxas padrão de balcão (compra/venda por moeda e produto),
> **para que** elas sejam exibidas como vitrine informativa na plataforma.

**Acceptance Criteria:**
- **AC-1 (Atualização da tabela de taxas):**
  - **Given** que estou autenticado no painel da casa,
  - **When** altero a taxa de balcão do Dólar Turismo papel-moeda para 5,55 e clico em "Salvar Taxas",
  - **Then** os novos valores são gravados com timestamp e atualizam a visualização pública da vitrine.

---

### US-022: Consulta da Vitrine de Taxas pelo Cliente
**Story Header:**
- **ID:** US-022
- **Título:** Consulta Comparativa de Taxas de Balcão
- **Persona:** Cliente
- **Prioridade:** P1 | **Estimativa:** S | **Épico:** Vitrine Informativa

**Statement:**
> **Como** cliente explorando a plataforma,
> **quero** consultar a tabela comparativa de taxas de balcão cadastradas pelas casas da minha cidade,
> **para que** eu conheça os preços praticados antes de criar minha oferta personalizada.

**Acceptance Criteria:**
- **AC-1 (Visualização clara de balcão vs. melhor oferta):**
  - **Given** que acesso a página principal,
  - **When** seleciono minha cidade (SP ou RJ) e moeda,
  - **Then** vejo a lista de casas com suas taxas de balcão cadastradas, acompanhada de um banner convidando a "Publicar uma Oferta com sua taxa desejada".

---

## Épico 7: Notificações em Tempo Real e Multicanal

### US-023: Notificações em Tempo Real via WebSocket
**Story Header:**
- **ID:** US-023
- **Título:** Infraestrutura de Eventos em Tempo Real para Clientes e Casas
- **Persona:** Cliente / Casa de Câmbio
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Notificações

**Statement:**
> **Como** usuário logado no sistema,
> **quero** receber alertas visuais e sonoros imediatos sobre eventos que me afetam (novas ofertas, contrapropostas, matches, expirações),
> **para que** eu aja com agilidade durante o processo de negociação.

**Acceptance Criteria:**
- **AC-1 (Recebimento de evento e feedback de UI):**
  - **Given** que o cliente está com a tela da oferta aberta,
  - **When** o backend emite `proposal:new`,
  - **Then** uma notificação toast aparece na tela em < 300ms e a lista de contrapropostas é recalculada sem reload de página.
- **AC-2 (Reconexão automática transparente):**
  - **Given** uma oscilação de rede que desconecte o socket momentaneamente,
  - **When** a conexão de rede é restabelecida,
  - **Then** o cliente Socket.IO reconecta automaticamente, reingressa nos rooms correspondentes e busca o estado atualizado via API REST para evitar inconsistências.

---

### US-024: Notificações Multicanal para Operadores Offline com Throttling e Opt-in
**Story Header:**
- **ID:** US-024
- **Título:** Alertas de Novas Ofertas e Prazos por E-mail, Push no Navegador e WhatsApp com Throttling
- **Persona:** Casa de Câmbio (Operador) / Cliente
- **Prioridade:** P1 | **Estimativa:** M | **Épico:** Notificações

**Statement:**
> **Como** operador de casa de câmbio que não está com o painel aberto na tela ativa,
> **quero** receber notificações complementares por Web Push, e-mail transacional e WhatsApp para ofertas urgentes com frequência controlada,
> **para que** minha mesa não perca oportunidades de negócio sem que meu canal corporativo seja inundado por spam ou banido.

**Acceptance Criteria:**
- **AC-1 (Push Notification no Navegador):**
  - **Given** que o operador autorizou notificações push no navegador e está com o navegador em segundo plano,
  - **When** uma oferta compatível de alta prioridade é publicada na sua cidade,
  - **Then** uma notificação nativa do sistema operacional é exibida com som de alerta e link direto para a tela de aceite da oferta.
- **AC-2 (Notificação via WhatsApp com Throttling e Opt-in):**
  - **Given** que nenhum operador da casa está conectado ao WebSocket há mais de 5 minutos durante o horário comercial e a casa realizou opt-in formal,
  - **When** uma ou mais novas ofertas elegíveis são recebidas,
  - **Then** o sistema dispara e-mail institucional e mensagem no WhatsApp corporativo da mesa limitada a no máximo 1 envio a cada 30 minutos em formato condensado (digest consolidado: *"Você possui X novas ofertas compatíveis aguardando no painel"*), utilizando templates homologados pela Meta [verificar na documentação atual da WhatsApp Business Platform].

---

## Épico 8: Gestão e Governança

### US-025: Gestão de Operadores e Membros da Casa
**Story Header:**
- **ID:** US-025
- **Título:** Convite e Gestão de Usuários da Casa de Câmbio
- **Persona:** Casa de Câmbio (Owner)
- **Prioridade:** P1 | **Estimativa:** S | **Épico:** Gestão e Governança

**Statement:**
> **Como** Owner de uma casa de câmbio aprovada,
> **quero** cadastrar operadores e visualizadores financeiros para minha equipe,
> **para que** múltiplos colaboradores possam operar e monitorar ofertas simultaneamente.

**Acceptance Criteria:**
- **AC-1 (Criação de operador):**
  - **Given** o painel de equipe da casa,
  - **When** o Owner informa nome, e-mail e seleciona o perfil `OPERADOR`,
  - **Then** um convite é enviado por e-mail com link de ativação vinculado àquela casa específica.
- **AC-2 (Isolamento estrito de permissões):**
  - **Given** um usuário com role `FINANCEIRO`,
  - **When** ele acessa a plataforma,
  - **Then** ele consegue visualizar histórico de negociações e relatórios, mas os botões de "Aceitar Oferta" e "Enviar Contraproposta" ficam desabilitados na interface, e qualquer tentativa de chamada direta aos endpoints transacionais é bloqueada com HTTP 403 Forbidden (`INSUFFICIENT_PERMISSIONS`).

---

### US-026: Suspensão Preventiva de Casa pelo Admin e Retenção de Negociações
**Story Header:**
- **ID:** US-026
- **Título:** Suspensão Imediata de Casa Inadimplente ou Sob Denúncia
- **Persona:** Admin da Plataforma
- **Prioridade:** P0 | **Estimativa:** S | **Épico:** Gestão e Governança

**Statement:**
> **Como** administrador, caso uma casa de câmbio sofra denúncia de irregularidade pelo Banco Central ou descumpra as regras da plataforma,
> **quero** suspender seu acesso imediatamente,
> **para que** ela seja desconectada e não participe de novos matches, mantendo negociações ativas retidas preventivamente com comunicação neutra.

**Acceptance Criteria:**
- **AC-1 (Suspensão, desconexão e retenção com estado isolado):**
  - **Given** uma casa no status `APROVADA`,
  - **When** o Admin clica em "Suspender Casa" e insere a justificativa,
  - **Then** o status da casa passa para `SUSPENSA`, seus sockets são desconectados das salas de ofertas, suas propostas pendentes são invalidadas (`CASA_SUSPENSA`), e eventuais negociações em curso são retidas preventivamente com flag `parceiro_suspenso: true` e motivo de auditoria `SUSPENSAO_PARCEIRO` (sem transicionar indevidamente para `DISPUTA`), emitindo mensagem neutra ao cliente [VALIDAR COM JURÍDICO]. Permanece em aberto se o Admin poderá conceder autorização para que negociações em andamento seguro sejam concluídas normalmente [VALIDAR COM JURÍDICO].

---

### US-027: Log de Auditoria de Ações Transacionais
**Story Header:**
- **ID:** US-027
- **Título:** Trilha Imutável de Auditoria para Operações e Eventos Críticos
- **Persona:** Admin / Compliance
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Gestão e Governança

**Statement:**
> **Como** auditor ou admin do sistema,
> **quero** que cada ação relevante (criação de oferta, aceite, contraproposta, alteração de status e logins) gere um log imutável com timestamp, IP e payload,
> **para que** haja transparência completa e suporte a eventuais fiscalizações ou investigações de disputas.

**Acceptance Criteria:**
- **AC-1 (Gravação de registro de auditoria):**
  - **Given** qualquer transação de match ou alteração de status de oferta/proposta/negociação,
  - **When** a operação é persistida no banco,
  - **Then** uma linha é inserida na tabela `audit_logs` contendo `entity_type`, `entity_id`, `actor_id`, `actor_role`, `action`, `ip_address`, `before_state`, `after_state` e `created_at`.
- **AC-2 (Imutabilidade de logs):**
  - **Given** a tabela `audit_logs`,
  - **When** qualquer usuário (inclusive Admin) tentar executar `UPDATE` ou `DELETE`,
  - **Then** o banco rejeita via trigger/permissão de schema (append-only).

---

### US-028: Autenticação Multifator (MFA) Obrigatória para Casas de Câmbio
**Story Header:**
- **ID:** US-028
- **Título:** Ativação e Validação Obrigatória de MFA para Usuários de Casa de Câmbio
- **Persona:** Casa de Câmbio (Owner / Operador)
- **Prioridade:** P0 | **Estimativa:** M | **Épico:** Onboarding e Autenticação

**Statement:**
> **Como** operador ou responsável legal de uma casa de câmbio aprovada,
> **quero** ser obrigado a configurar e validar autenticação em dois fatores (TOTP) no meu perfil,
> **para que** o acesso às ferramentas de pregão em tempo real e de compromisso cambial esteja protegido contra sequestro de contas e acessos indevidos.

**Acceptance Criteria:**
- **AC-1 (Obrigatoriedade de configuração no primeiro acesso):**
  - **Given** um usuário com perfil `CASA_OWNER` ou `CASA_OPERADOR` recém-cadastrado ou sem MFA ativo,
  - **When** efetua login com sucesso com e-mail e senha,
  - **Then** o sistema redireciona obrigatoriamente para a tela de pareamento de chave TOTP (QR Code), bloqueando o acesso a qualquer outra rota da aplicação até a validação do primeiro código de 6 dígitos.
- **AC-2 (Bloqueio transacional sem segundo fator ativo):**
  - **Given** uma requisição a endpoints transacionais (`POST /offers/:id/accept` ou `POST /offers/:id/proposals`),
  - **When** a sessão JWT não possui a claim de verificação MFA ativa,
  - **Then** o backend intercepta na guarda de autenticação e retorna HTTP 403 Forbidden com código `MFA_REQUIRED` e mensagem: *"Autenticação multifator (MFA) obrigatória para este perfil."*.

---

### US-029: Confirmação Pré-Aceite com Resumo Financeiro Vinculante
**Story Header:**
- **ID:** US-029
- **Título:** Modal de Confirmação Prévia com Decomposição Financeira antes de Aceite Vinculante
- **Persona:** Cliente / Casa de Câmbio (Operador)
- **Prioridade:** P0 | **Estimativa:** S | **Épico:** Aceite e Contrapropostas

**Statement:**
> **Como** cliente ou operador de mesa prestes a formalizar um match contratual,
> **quero** revisar um modal de confirmação com a decomposição integral dos valores (taxa pura, IOF e tarifas discriminadas, total em reais VET e local de atendimento),
> **para que** eu confirme conscientemente a operação antes que uma transação atômica vinculante seja disparada.

**Acceptance Criteria:**
- **AC-1 (Abertura obrigatória de modal de revisão):**
  - **Given** a tela de oferta ou lista de contrapropostas,
  - **When** o usuário clica em "Aceitar Oferta" ou "Aceitar Contraproposta",
  - **Then** a interface impede o envio imediato da requisição à API e abre um modal central com o resumo estruturado: moeda, valor em moeda estrangeira, taxa pura de câmbio, IOF e tarifas discriminadas informadas pela casa, total líquido a pagar/receber em Reais (VET) e forma/local de atendimento acordados.
- **AC-2 (Confirmação ativa e envio do payload):**
  - **Given** o modal de revisão aberto,
  - **When** o usuário clica expressamente no botão "Confirmar Aceite Vinculante",
  - **Then** o frontend dispara o payload de aceite para a API sob controle transacional serializado; se o usuário fechar o modal ou clicar em "Voltar", a transação é abortada sem submissão de dados.

---

### US-030: Controle de Teto de Valor por Oferta no Piloto
**Story Header:**
- **ID:** US-030
- **Título:** Aplicação de Teto de Valor Máximo por Oferta no Piloto
- **Persona:** Sistema / Admin
- **Prioridade:** P0 | **Estimativa:** S | **Épico:** Ofertas

**Statement:**
> **Como** administrador da plataforma,
> **quero** que o sistema limite o montante máximo transacionável por oferta durante a fase piloto,
> **para que** o marketplace controle o perfil de risco operacional nas praças de teste (RJ e SP).

**Acceptance Criteria:**
- **AC-1 (Rejeição de ofertas acima do teto do piloto):**
  - **Given** um cliente tentando criar uma oferta,
  - **When** o valor pretendido em Reais ultrapassar o teto parametrizado (`OFFER_MAX_VALUE_BRL`, padrão: R$ 50.000,00 conforme [Tabela de Parâmetros](prd.md#parâmetros-configuráveis-da-plataforma)),
  - **Then** a criação é imediatamente rejeitada com HTTP 422 Unprocessable Entity (`OFFER_VALUE_LIMIT_EXCEEDED`) e mensagem: *"Valor da oferta excede o teto máximo permitido para o piloto."*.
- **AC-2 (Validação em moeda estrangeira equivalente):**
  - **Given** a taxa informada na oferta pelo cliente,
  - **When** o produto entre o valor em moeda estrangeira e a taxa resultar em montante em reais superior ao teto,
  - **Then** o sistema bloqueia a submissão no frontend e valida o limite na API antes da gravação do registro.

---

## Future Considerations / Removido do MVP na v1.5

Os fluxos abaixo foram removidos do escopo do MVP na versão 1.5 e arquivados para consideração futura:

1. **Disputa Formal com Mediação Financeira e SLAs:**
   - *Texto original (v1.4 US-020):* Previa intervenção do Admin para decidir devoluções financeiras e cumprimento de contratos cambiais com SLA de 24h a 5 dias.
   - *Razão da remoção:* A plataforma não é intermediadora financeira nem custodia valores; o acordo e o pagamento são diretos entre as partes. Foi substituída pela funcionalidade de "Relatar Problema" para moderação de cadastro.
2. **Sistema de Strikes, Checkpoint de No-Show e Contestação de 24h:**
   - *Texto original (v1.4 US-019 AC-2):* Previa disparo de checkpoint às 18h / fim da janela com contadores de ausências e sanções a clientes.
   - *Razão da remoção:* Desnecessário no piloto sem custódia monetária. Substituído pelo relato de desfecho voluntário pelas partes (`CONCLUÍDO` vs. `NÃO_CONCLUÍDO` com motivo padronizado).
3. **Extensão Automática de Oferta nos Minutos Finais ("Janela de Decisão"):**
   - *Texto original (v1.4 FR-24 / ADR-0006):* Previa prorrogação de 5 minutos da oferta caso chegasse contraproposta no fim.
   - *Razão da remoção:* Simplificação do motor de concorrência e eliminação de prorrogações especulativas.
4. **Bloqueio Rígido de Cancelamento Pós-Match:**
   - *Texto original (v1.4 US-008 AC-2 / AC-08):* Bloqueava unilateralmente o cancelamento com HTTP 422.
   - *Razão da remoção:* Substituído pela opção de "Desistir do Atendimento" com motivo informado e notificação bilateral.
5. **Alerta Automatizado de Fracionamento PLD:**
   - *Texto original (v1.4 US-030 AC-2):* Algoritmo de agregação de ofertas em janela de 24h para compliance.
   - *Razão da remoção:* Convertido em pergunta em aberto para parecer jurídico regulatório.

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Produto | Criação inicial das 26 user stories do MVP |
| 1.1 | 2026-11-03 | Equipe de Produto | Alinhamento com revisão PM-Critic |
| 1.2 | 2026-11-03 | Equipe de Produto | Inclusão de US-024 (notificações multicanal offline); atualização de US-001 (validação OTP/identidade); US-006 (limite de 3 ofertas e alerta de taxa discrepante); US-010 (oferta anônima pré-match); US-012/US-013 (contraproposta estruturada e ranking por valor total em reais); US-016 (concorrência com lock_timeout e NOW() do banco); US-017 (cascata para ENCERRADA em expiração e cancelamento com auditoria); US-018 (endereço liberado somente pós-match); US-019/US-020 (timeout e resolução de disputas). |
| 1.3 | 2026-11-03 | Equipe de Produto | Revisão ampla v1.3: sincronização completa com o PRD; substituição de NOW() por clock_timestamp() via ADR-0006 e remoção de detalhes SQL das stories (US-007, US-011, US-016, US-017); validação cadastral para PF (CPF) ou PJ (CNPJ) em US-001; oferta anônima com Região/Bairro em US-006 e US-010; comportamento sem bloqueio para ausência de cotação em US-006; registro de que no aceite direto o cliente não escolhe a casa (US-011); atendimento integral obrigatório no MVP, prazo_validade_minutos, VET discriminado, teto de 3 revisões com cooldown de 30s em US-012; reenvio após recusa em US-015; ordenação condicional de contrapropostas (compra ASC, venda DESC em US-013); revelação segura bidirecional pós-match em US-018; regra de conclusão unificada bilateral, janela de execução e timeout de 5 dias úteis com política de estorno em aberto (US-019); throttling de WhatsApp em digest e opt-in obrigatório (US-024); isolamento de permissões do perfil Financeiro com bloqueio de operação (US-025); e suspensão de casa com estado isolado SUSPENSAO_PARCEIRO e mensagem neutra ao cliente [VALIDAR COM JURÍDICO] em US-026. |
| 1.4 | 2026-11-03 | Equipe de Produto | Revisão ampla v1.4: correção do erro em US-008 AC-2 para HTTP 422 OFFER_ALREADY_CLOSED (alinhado à Tabela Unificada de Erros); remoção de qualquer alíquota fixa de IOF em US-006, US-011 e US-012, adotando valor informado pela casa [VALIDAR COM ESPECIALISTA TRIBUTÁRIO] e recomendação de valor total final VET (Decisão nº 1); adequação de limites operacionais para referenciar a Tabela de Parâmetros Configuráveis; atualização de US-019 com checkpoint de no-show, prazo de 24h úteis para contestação, gestão de strikes por ausência e nota de gratuidade no MVP (Fase 1 / ADR-0012); inclusão de 3 novas User Stories: US-028 (MFA obrigatório para Owner e Operador com HTTP 403 MFA_REQUIRED), US-029 (modal de confirmação pré-aceite com resumo vinculante decomposto), e US-030 (controle de teto de valor por oferta no piloto e monitoramento preventivo de fracionamento PLD); totalizando 30 User Stories sincronizadas com o PRD. |
| 1.5 | 2026-11-03 | Equipe de Produto | Revisão ampla v1.5: reposicionamento para PLATAFORMA DE COMUNICAÇÃO inspirada no Melhor Câmbio (Nomad); substituição de "negociação" por "Atendimento Comercial" em Épico 5 e em US-016, US-017 e US-018; atualização de US-019 com relato de desfecho bilateral (CONCLUÍDO vs NÃO_CONCLUÍDO com motivo) e timeout SEM_RETORNO; reescrita de US-020 como Relato de Problema à Moderação da Plataforma (qualidade sem mediação financeira); ajuste em US-030 focando no teto de valor por oferta no piloto; e migração de disputas mediadas financeiras, strikes/no-show, extensão de oferta e alertas de PLD para Future Considerations. Total de 30 User Stories sincronizadas. |

