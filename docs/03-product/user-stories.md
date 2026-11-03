---
artifact: user-stories
version: "1.0"
created: 2026-11-03
status: draft
context: 13 histórias do MVP de aproximação neutra. Requisitos em docs/03-product/prd.md. Cenários de QA em docs/03-product/acceptance-criteria.md.
---

# User Stories: MVP de aproximação para papel-moeda

Estas histórias detalham as 13 linhas do PRD. Cada uma entrega uma capacidade que a persona consegue usar. O PRD vence se houver conflito. Os cenários observáveis de QA, inclusive concorrência e expiração, estão em [`acceptance-criteria.md`](acceptance-criteria.md).

Os tamanhos são relativos (P, M, G) para ordenar o trabalho. Não são velocidade nem compromisso de prazo. Implementação de todas continua bloqueada pelo portão de código em [`hypotheses.md`](../01-discovery/hypotheses.md).

| ID | História | Persona | Prioridade | Tamanho | Depende de |
| --- | --- | --- | --- | --- | --- |
| US-1 | Ver cotações de balcão | Viajante | P0 | P | US-12 |
| US-2 | Criar oferta | Viajante | P0 | M | US-12 |
| US-3 | Acompanhar status e prazo | Viajante | P0 | M | US-2 |
| US-4 | Receber a casa que aceitou | Viajante | P0 | P | US-9 |
| US-5 | Cancelar oferta aberta | Viajante | P0 | P | US-3 |
| US-6 | Ser avisado da expiração | Viajante | P0 | P | US-3 |
| US-7 | Entrar no painel | Operador da casa | P0 | M | US-12 |
| US-8 | Receber alerta de nova demanda | Operador da casa | P0 | M | US-2, US-7 |
| US-9 | Aceitar e saber se ganhou | Operador da casa | P0 | G | US-8 |
| US-10 | Ver contato do viajante | Operador da casa | P0 | P | US-9 |
| US-11 | Publicar cotação de venda | Operador da casa | P0 | P | US-7 |
| US-12 | Credenciar e desativar casas | Operação interna | P0 | M | Nenhuma história |
| US-13 | Ver histórico de aceites | Operador da casa | P1 | P | US-10 |

---

## US-1: Ver cotações de balcão

### Story Header

| Field | Value |
| --- | --- |
| ID | US-1 |
| Title | Ver cotações de balcão |
| Persona | Viajante pessoa física |
| Priority | P0 |
| Epic/Feature | Vitrine pública |
| Estimate | P |

### User Story Statement

**As a** viajante pessoa física em São Paulo ou no Rio de Janeiro,

**I want** ver o nome, a cidade e a cotação de balcão das casas autorizadas para a moeda que escolhi,

**so that** eu decida se vale criar uma oferta sem receber o contato da casa antes disso.

### Context & Background

A vitrine é a porta do fluxo de demanda. Ela mostra referência de preço e esconde o contato, para a métrica de match depender do aceite. Requisitos: FR-1 a FR-5.

### Acceptance Criteria

#### AC-1: Lista só com nome, cidade e cotação

**Given** casas ativas na cidade escolhida com cotação de papel-moeda da moeda escolhida atualizada há 24 horas ou menos

**When** eu seleciono a cidade e a moeda

**Then** vejo cada casa com apenas nome, cidade e cotação de venda, da menor cotação para a maior

#### AC-2: Contato ausente

**Given** a lista da vitrine está visível

**When** eu inspeciono cada item e o conteúdo da página

**Then** não há telefone, WhatsApp, bairro nem endereço de nenhuma casa

#### AC-3: Cotação velha some

**Given** a cotação de uma casa foi atualizada há mais de 24 horas

**When** eu abro a vitrine daquela cidade e moeda

**Then** essa casa não aparece

### Design Notes

- Cidade e moeda são escolhas explícitas antes da lista. Moedas: USD, EUR, GBP. Cidades: São Paulo e Rio de Janeiro.
- Texto visível: a cotação é referência da casa; IOF, tarifas e valor final são informados por ela; pagamento e contrato acontecem com a loja.
- Sem wireframe.

### Technical Notes

- A ordenação e os campos públicos são contrato testável da resposta da vitrine.
- A idade de 24 horas usa o relógio do servidor.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-12 casa credenciada e ativa | História | Blocked |

### Out of Scope

- Telefone ou endereço na vitrine.
- Cartão pré-pago, outras moedas e outras cidades.
- Ordenação por distância ou por avaliação.

---

## US-2: Criar oferta

### Story Header

| Field | Value |
| --- | --- |
| ID | US-2 |
| Title | Criar oferta |
| Persona | Viajante pessoa física |
| Priority | P0 |
| Epic/Feature | Oferta do viajante |
| Estimate | M |

### User Story Statement

**As a** viajante pessoa física,

**I want** informar quantia, taxa desejada ou "quero a melhor taxa", bairro, nome, e-mail e WhatsApp,

**so that** as casas da minha cidade possam aceitar minha intenção de compra de papel-moeda.

### Context & Background

A oferta é a demanda que o painel da casa recebe. O e-mail existe para o link de acompanhamento. O WhatsApp existe para o alerta de aceite e para a casa falar com o viajante depois. Requisitos: FR-6 a FR-11.

### Acceptance Criteria

#### AC-1: Oferta criada com taxa desejada

**Given** existe ao menos uma casa ativa que opera a moeda na cidade, e eu informo quantia entre 100 e 10.000, taxa positiva, bairro, nome, e-mail válido, WhatsApp válido e o consentimento de compartilhamento

**When** eu envio a oferta

**Then** uma oferta `ABERTA` é criada e eu vejo a confirmação

#### AC-2: Melhor taxa sem número

**Given** eu marco "quero a melhor taxa disponível" e deixo a taxa em branco, com os demais campos válidos e o consentimento marcado

**When** eu envio a oferta

**Then** a oferta é criada sem taxa desejada

#### AC-3: Quantia fora do intervalo

**Given** a quantia é 99 ou 10.001, ou não é inteira

**When** eu envio a oferta

**Then** a oferta não é criada e eu vejo qual campo corrigir

### Design Notes

- Consentimento explícito, desmarcado por padrão: nome e WhatsApp serão compartilhados só com a casa que aceitar.
- O e-mail é da plataforma para o viajante. A casa não o recebe.
- O campo aparece como "Bairro de preferência". O texto de ajuda diz que a retirada, ou qualquer entrega, é combinada diretamente com a casa depois do aceite.

### Technical Notes

- WhatsApp armazenado em E.164.
- Taxa com no máximo 4 casas decimais.
- Clique duplo e reenvio da mesma submissão criam uma única oferta.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-12 ao menos uma casa ativa na cidade e moeda | História | Blocked |

### Out of Scope

- Conta de viajante e senha.
- Verificação do WhatsApp por código.
- Pagamento.

---

## US-3: Acompanhar status e prazo

### Story Header

| Field | Value |
| --- | --- |
| ID | US-3 |
| Title | Acompanhar status e prazo |
| Persona | Viajante pessoa física |
| Priority | P0 |
| Epic/Feature | Ciclo de vida da oferta |
| Estimate | M |

### User Story Statement

**As a** viajante pessoa física,

**I want** abrir um link privado e ver o estado da minha oferta e o horário exato em que ela expira,

**so that** eu saiba se ainda estou esperando uma casa, sem criar uma conta.

### Context & Background

A página de status é a fonte de verdade. O e-mail leva até ela. A validade é de 4 horas úteis, de segunda a sexta, das 9h inclusive às 18h exclusive, em America/Sao_Paulo. Requisitos: FR-12 a FR-15. Os horários de fronteira estão nos critérios de aceite desta história.

### Acceptance Criteria

#### AC-1: Confirmação com horário exato

**Given** acabei de criar uma oferta

**When** a confirmação aparece

**Then** vejo o estado `ABERTA`, o resumo da oferta e a data e hora exatas de expiração

#### AC-2: E-mail com o mesmo link

**Given** a oferta foi criada com um e-mail válido

**When** o e-mail de acompanhamento é entregue

**Then** ele contém o mesmo link privado da confirmação, e a confirmação na tela também mostra esse link

#### AC-3: Sexta no fim da janela

**Given** uma oferta é criada na sexta-feira às 17h30

**When** eu abro a página de status

**Then** a expiração exibida é segunda-feira às 12h30

### Design Notes

- O estado atual e o horário de expiração ficam em destaque.
- Quem tem o link vê o status. O link não é adivinhável.

### Technical Notes

- Horários persistidos em UTC e exibidos em America/Sao_Paulo.
- No instante exato da expiração a oferta já não pode ser aceita, mesmo que o aviso ainda não tenha sido enviado.
- Feriado de segunda a sexta conta como dia de janela neste MVP.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-2 oferta criada | História | Blocked |
| Provedor de e-mail | Externo | Blocked |

### Out of Scope

- Login de viajante.
- WhatsApp com o link de acompanhamento.
- Calendário de feriados.

---

## US-4: Receber a casa que aceitou

### Story Header

| Field | Value |
| --- | --- |
| ID | US-4 |
| Title | Receber a casa que aceitou |
| Persona | Viajante pessoa física |
| Priority | P0 |
| Epic/Feature | Troca de contatos |
| Estimate | P |

### User Story Statement

**As a** viajante pessoa física,

**I want** receber o nome, o endereço e o telefone da casa que aceitou minha oferta,

**so that** eu conclua a compra de papel-moeda diretamente com a loja.

### Context & Background

O alerta crítico de aceite vai por WhatsApp. A página de status mostra os mesmos dados. Requisitos: FR-25 e FR-16 para o que deixa de estar disponível depois do aceite.

### Acceptance Criteria

#### AC-1: Dados da casa na página

**Given** uma casa aceitou minha oferta

**When** eu abro o link de acompanhamento

**Then** vejo nome da casa, endereço da loja, telefone ou WhatsApp comercial e, se houver, a taxa do aceite, com o texto de que o valor final e o pagamento são tratados com a loja

#### AC-2: Um alerta de WhatsApp

**Given** uma casa aceitou minha oferta

**When** o alerta é enviado

**Then** eu recebo uma única mensagem de WhatsApp com esses dados da casa

#### AC-3: Cancelar deixa de existir

**Given** minha oferta está `ACEITA`

**When** eu abro a página de status

**Then** não há ação de cancelar, e a página me orienta a falar com a casa

### Design Notes

- A mensagem deixa claro que a plataforma não calcula IOF nem recebe pagamento.

### Technical Notes

- Falha do WhatsApp não desfaz o aceite. A página continua mostrando a casa, e o envio é tentado de novo.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-9 aceite vencedor | História | Blocked |
| Template de WhatsApp aprovado | Externo | Blocked |

### Out of Scope

- Chat dentro da plataforma.
- Confirmação de que a compra no balcão aconteceu.

---

## US-5: Cancelar oferta aberta

### Story Header

| Field | Value |
| --- | --- |
| ID | US-5 |
| Title | Cancelar oferta aberta |
| Persona | Viajante pessoa física |
| Priority | P0 |
| Epic/Feature | Ciclo de vida da oferta |
| Estimate | P |

### User Story Statement

**As a** viajante pessoa física,

**I want** cancelar minha oferta enquanto nenhuma casa aceitou,

**so that** eu não seja contatado depois de desistir.

### Context & Background

Cancelamento só existe em `ABERTA`. A corrida com um aceite simultâneo está especificada em US-9, para o cenário ter um dono só. Requisito: FR-16.

### Acceptance Criteria

#### AC-1: Cancelamento de oferta aberta

**Given** minha oferta está `ABERTA` e nenhuma casa aceitou

**When** eu cancelo na página de status

**Then** o estado passa a `CANCELADA` e a oferta sai da fila das casas

#### AC-2: Aceite já concluído

**Given** minha oferta já está `ACEITA`

**When** eu tento cancelar

**Then** o estado permanece `ACEITA` e eu vejo os dados da casa

### Design Notes

- A ação de cancelar fica na página de status e pede confirmação antes de concluir.

### Technical Notes

- `CANCELADA` é terminal.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-3 página de status | História | Blocked |
| US-9 corrida com aceite | História | Blocked |

### Out of Scope

- Cancelar depois do aceite.
- Reabrir oferta cancelada.

---

## US-6: Ser avisado da expiração

### Story Header

| Field | Value |
| --- | --- |
| ID | US-6 |
| Title | Ser avisado da expiração |
| Persona | Viajante pessoa física |
| Priority | P0 |
| Epic/Feature | Ciclo de vida da oferta |
| Estimate | P |

### User Story Statement

**As a** viajante pessoa física,

**I want** ser avisado por e-mail quando minha oferta expira sem aceite,

**so that** eu saiba que nenhuma casa vai me chamar por aquela oferta.

### Context & Background

O relógio é o da US-3. Esta história cobre o aviso e o estado terminal. Requisito: FR-15.

### Acceptance Criteria

#### AC-1: E-mail de expiração

**Given** minha oferta chegou ao horário de expiração ainda `ABERTA`

**When** passam até 5 minutos

**Then** o estado fica `EXPIRADA` e eu recebo um e-mail dizendo isso, com o link de acompanhamento

#### AC-2: Página sem expectativa de aceite

**Given** minha oferta está `EXPIRADA`

**When** eu abro o link

**Then** vejo o estado expirado e não vejo dados de casa nem ação de cancelar

### Design Notes

- O e-mail diz que a oferta não foi aceita e que o viajante pode criar outra.

### Technical Notes

- Um único e-mail de expiração por oferta, mesmo com reprocessamento.
- Falha do e-mail não impede o estado `EXPIRADA`.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-3 cálculo do horário de expiração | História | Blocked |

### Out of Scope

- WhatsApp de expiração.
- Renovação automática da oferta.

---

## US-7: Entrar no painel

### Story Header

| Field | Value |
| --- | --- |
| ID | US-7 |
| Title | Entrar no painel |
| Persona | Operador da casa |
| Priority | P0 |
| Epic/Feature | Painel da casa |
| Estimate | M |

### User Story Statement

**As a** operador de uma casa credenciada,

**I want** entrar com e-mail e senha,

**so that** só quem trabalha na casa veja as ofertas daquela praça.

### Context & Background

Não há MFA no MVP. A casa e o operador nascem em US-12. Requisito: FR-17.

### Acceptance Criteria

#### AC-1: Login válido

**Given** tenho e-mail e senha de operador ativo

**When** eu entro

**Then** acesso o painel da minha casa

#### AC-2: Senha errada

**Given** a senha está incorreta

**When** eu tento entrar

**Then** permaneço fora e vejo que o acesso foi recusado, sem indicação de qual campo está errado

#### AC-3: Casa desativada

**Given** minha casa foi desativada

**When** eu tento entrar com credenciais que antes funcionavam

**Then** o acesso é recusado

### Design Notes

- O painel cabe na tela do celular do balcão.
- Formulário com rótulos visíveis e erro anunciado para leitor de tela.

### Technical Notes

- Senha armazenada só como hash adaptativo.
- Tentativas limitadas por conta e por IP. O número do limite fica com o Tech Lead e entra na configuração, não nesta história.
- A sessão termina após 10 horas sem atividade do operador.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-12 operador criado | História | Blocked |

### Out of Scope

- MFA, recuperação de senha por autoatendimento e autocadastro.
- Login do viajante.

---

## US-8: Receber alerta de nova demanda

### Story Header

| Field | Value |
| --- | --- |
| ID | US-8 |
| Title | Receber alerta de nova demanda |
| Persona | Operador da casa |
| Priority | P0 |
| Epic/Feature | Painel da casa |
| Estimate | M |

### User Story Statement

**As a** operador de uma casa credenciada,

**I want** ser avisado por e-mail e no painel quando surge uma oferta na minha cidade,

**so that** eu possa aceitar antes de outra casa.

### Context & Background

O painel atualiza sozinho em cerca de 30 segundos. O som depende de o operador ligar o alerta. A casa vê a demanda sem nome e sem WhatsApp do viajante. Requisitos: FR-19 a FR-21.

### Acceptance Criteria

#### AC-1: Fila sem dado pessoal

**Given** existe uma oferta `ABERTA` na minha cidade, numa moeda que minha casa opera

**When** eu abro a fila

**Then** vejo moeda, quantia, bairro de preferência, taxa desejada ou "melhor taxa" e tempo restante, e não vejo nome nem WhatsApp do viajante

#### AC-2: E-mail único

**Given** uma oferta compatível acabou de ser criada e eu sou operador ativo

**When** o alerta é processado, inclusive uma segunda vez

**Then** eu recebo um único e-mail dessa oferta

#### AC-3: Painel aberto

**Given** estou com o painel aberto e liguei o alerta sonoro

**When** uma oferta compatível é criada

**Then** em até 30 segundos ela aparece em destaque e toca um som curto

### Design Notes

- Oferta de outra cidade não aparece.
- O som é um aviso de item novo, sem contagem regressiva e sem lance.

### Technical Notes

- A atualização do painel é consulta periódica. WebSocket fica fora.
- Falha do e-mail não esconde a oferta de quem está no painel.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-2 oferta criada | História | Blocked |
| US-7 sessão do operador | História | Blocked |

### Out of Scope

- Contraproposta.
- Alerta sonoro antes de o operador autorizar o áudio no navegador.

---

## US-9: Aceitar e saber se ganhou

### Story Header

| Field | Value |
| --- | --- |
| ID | US-9 |
| Title | Aceitar e saber se ganhou |
| Persona | Operador da casa |
| Priority | P0 |
| Epic/Feature | Aceite |
| Estimate | G |

### User Story Statement

**As a** operador de uma casa credenciada,

**I want** aceitar uma oferta e saber na hora se a minha casa ganhou o atendimento,

**so that** eu não chame um viajante que outra casa já atendeu.

### Context & Background

A primeira casa que aceita fecha. Aceites no mesmo segundo, aceite contra cancelamento e aceite contra expiração têm um único vencedor. Esta história é o dono desses cenários. Requisitos: FR-22 a FR-24 e FR-23 para a corrida com FR-15 e FR-16.

### Acceptance Criteria

#### AC-1: Aceite da taxa pedida

**Given** a oferta está `ABERTA`, não venceu e traz uma taxa desejada

**When** eu clico em "Aceitar oferta" e nenhuma outra casa vence

**Then** a oferta fica `ACEITA` para a minha casa e eu vejo que ganhei o atendimento

#### AC-2: Melhor taxa pede um número

**Given** a oferta pede a melhor taxa

**When** eu tento aceitar sem informar uma taxa positiva

**Then** o aceite não acontece e eu vejo que a taxa é necessária

#### AC-3: Duas casas no mesmo segundo

**Given** duas casas elegíveis disparam o aceite no mesmo segundo

**When** os dois pedidos são processados

**Then** exatamente uma casa ganha, a outra vê "Oferta já atendida por outra casa", e o viajante recebe um único alerta de aceite

### Design Notes

- O botão só aparece para oferta aberta e não vencida.
- A casa perdedora não vê nome nem WhatsApp em nenhuma tela nem em nenhuma resposta.

### Technical Notes

- O vencedor único é decidido na mesma operação que grava `ACEITA`. Redis, checagem seguida de escrita e ordem de fila não são garantia aceitável.
- O aceite verifica o prazo mesmo que o estado ainda apareça aberto por até 5 minutos.
- Cada tentativa perdida fica auditada.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-8 fila visível | História | Blocked |
| US-5 cancelamento, para a corrida | História | Blocked |
| US-3 prazo, para a corrida com expiração | História | Blocked |

### Out of Scope

- Contraproposta e leilão.
- A casa alterar a taxa depois de aceitar uma oferta que já tinha taxa desejada.

---

## US-10: Ver contato do viajante

### Story Header

| Field | Value |
| --- | --- |
| ID | US-10 |
| Title | Ver contato do viajante |
| Persona | Operador da casa |
| Priority | P0 |
| Epic/Feature | Troca de contatos |
| Estimate | P |

### User Story Statement

**As a** operador da casa que ganhou o aceite,

**I want** ver o nome e o WhatsApp do viajante assim que o aceite é confirmado,

**so that** eu inicie a conversa e combine a retirada do papel-moeda.

### Context & Background

O contato só existe para a casa vencedora. O e-mail do viajante permanece com a plataforma. Requisito: FR-24 e FR-29.

### Acceptance Criteria

#### AC-1: Contato da casa vencedora

**Given** minha casa venceu o aceite

**When** a confirmação do aceite aparece

**Then** vejo nome e WhatsApp do viajante e um atalho que abre conversa no WhatsApp

#### AC-2: E-mail do viajante oculto

**Given** eu ganhei o aceite

**When** eu olho a confirmação e as respostas disponíveis para a minha casa

**Then** o e-mail do viajante não aparece

### Design Notes

- O atalho usa o WhatsApp do viajante em E.164, no aplicativo ou na web, sem chat da plataforma.

### Technical Notes

- A leitura do contato pela casa vencedora gera registro de auditoria.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-9 aceite vencedor | História | Blocked |

### Out of Scope

- Enviar mensagem em nome da casa.
- Mostrar o contato para outra casa da mesma praça.

---

## US-11: Publicar cotação de venda

### Story Header

| Field | Value |
| --- | --- |
| ID | US-11 |
| Title | Publicar cotação de venda |
| Persona | Operador da casa |
| Priority | P0 |
| Epic/Feature | Vitrine pública |
| Estimate | P |

### User Story Statement

**As a** operador da casa,

**I want** publicar a cotação de venda de papel-moeda de cada moeda que opero,

**so that** o viajante veja meu preço de balcão na vitrine da cidade.

### Context & Background

Sem cotação atualizada nas últimas 24 horas a casa não aparece na vitrine, e ainda pode receber oferta. Requisito: FR-18, efeito em FR-3.

### Acceptance Criteria

#### AC-1: Publicar e aparecer

**Given** estou autenticado e minha casa opera USD

**When** eu publico uma cotação de venda positiva para USD

**Then** a vitrine da minha cidade em USD passa a me mostrar com essa cotação

#### AC-2: Atualização substitui a anterior

**Given** eu já tinha uma cotação de USD

**When** eu publico outro valor

**Then** a vitrine mostra o valor novo e a cotação anterior deixa de ser a exibida

### Design Notes

- Uma cotação por moeda operada. O campo aceita até 4 casas decimais.

### Technical Notes

- Cada publicação guarda data e hora.
- Cotação zero ou negativa é recusada.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-7 sessão | História | Blocked |

### Out of Scope

- Cotação de compra.
- A plataforma sugerir ou corrigir o preço.

---

## US-12: Credenciar e desativar casas

### Story Header

| Field | Value |
| --- | --- |
| ID | US-12 |
| Title | Credenciar e desativar casas |
| Persona | Operação interna |
| Priority | P0 |
| Epic/Feature | Credenciamento |
| Estimate | M |

### User Story Statement

**As a** operação interna,

**I want** cadastrar, editar e desativar casas autorizadas e seus operadores,

**so that** só uma casa conferida na lista do Banco Central receba oferta e apareça na vitrine.

### Context & Background

Não há autocadastro. A conferência na lista do Banco Central é manual e a data fica registrada. Requisitos: FR-27 e FR-28.

### Acceptance Criteria

#### AC-1: Cadastro completo

**Given** sou a operação interna e conferi a casa na lista do Banco Central

**When** eu gravo razão social, nome de exibição, CNPJ, cidade, bairro, endereço, telefone ou WhatsApp comercial, moedas, data da conferência, ao menos um operador e a senha inicial desse operador

**Then** a casa fica ativa e o operador consegue entrar com essa senha

#### AC-2: Operador de casa não credencia

**Given** estou autenticado como operador de casa

**When** eu tento criar ou desativar uma casa

**Then** a ação é recusada

#### AC-3: Desativação

**Given** uma casa ativa tem oferta já aceita

**When** eu a desativo

**Then** ela sai da vitrine, deixa de receber alerta, não aceita oferta nova, e o aceite antigo permanece

#### AC-4: Exclusão manual de dados pessoais

**Given** uma oferta com dados pessoais do viajante ainda legíveis

**When** eu aciono a exclusão manual prevista em FR-31

**Then** nome, e-mail e WhatsApp deixam de ser legíveis, o link privado passa a responder como oferta não encontrada, e nenhum job agendado foi necessário

### Design Notes

- Tela interna, separada do painel da casa. Pode ser simples. O uso é do fundador.

### Technical Notes

- Cidade restrita a São Paulo e Rio de Janeiro.
- Moedas restritas a USD, EUR e GBP.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| Nenhuma história | - | Ready |

### Out of Scope

- Consulta automática à lista do Banco Central.
- KYB automatizado.

---

## US-13: Ver histórico de aceites

### Story Header

| Field | Value |
| --- | --- |
| ID | US-13 |
| Title | Ver histórico de aceites |
| Persona | Operador da casa |
| Priority | P1 |
| Epic/Feature | Troca de contatos |
| Estimate | P |

### User Story Statement

**As a** operador da casa vencedora,

**I want** rever as ofertas que a minha casa aceitou,

**so that** eu recupere o contato do viajante se eu fechar a tela.

### Context & Background

O histórico é da casa vencedora. Os dados do viajante permanecem enquanto não houver exclusão manual pelo administrador (FR-26 e FR-31). Não há apagamento automático no piloto.

### Acceptance Criteria

#### AC-1: Histórico da vencedora

**Given** minha casa aceitou uma oferta e o administrador ainda não excluiu os dados pessoais dessa oferta

**When** eu abro o histórico

**Then** vejo essa oferta com nome e WhatsApp do viajante

#### AC-2: Outra casa não vê

**Given** outra casa perdeu o aceite da mesma oferta

**When** o operador dela abre o histórico

**Then** essa oferta não aparece

#### AC-3: Depois da exclusão manual

**Given** o administrador excluiu os dados pessoais de uma oferta que minha casa aceitou

**When** eu abro o histórico

**Then** a oferta ainda aparece, mas nome e WhatsApp do viajante não são legíveis

### Design Notes

- Lista simples, da mais recente para a mais antiga, utilizável no celular.

### Technical Notes

- Ofertas expiradas ou canceladas nunca entram no histórico de contato da casa, porque não houve aceite.

### Dependencies

| Dependency | Type | Status |
| --- | --- | --- |
| US-10 contato revelado | História | Blocked |

### Out of Scope

- Exportar a base de viajantes.
- Histórico de ofertas que a casa viu e não aceitou.
