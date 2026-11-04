---
artifact: prd
version: "1.2"
created: 2026-11-03
updated: 2026-11-03
status: spec-locked
---

# PRD: MVP de aproximação neutra para compra de papel-moeda (SP e RJ)

Especificação travada. Implementação de código bloqueada até validação do portão em [`docs/01-discovery/hypotheses.md`](../01-discovery/hypotheses.md).

## Overview

### Problem Statement

Casas de câmbio físicas autorizadas pelo Banco Central em São Paulo e no Rio de Janeiro perderam o canal neutro que levava o viajante até elas. Desde junho de 2024 esse canal, o Melhor Câmbio, pertence à Nomad, que vende conta internacional e passou a disputar a atenção do mesmo cliente. O viajante pessoa física continua precisando de papel-moeda e continua comprando numa casa autorizada. Falta um lugar neutro onde a demanda dele chegue à casa.

Problema completo em [`docs/01-discovery/problem-statement.md`](../01-discovery/problem-statement.md).

### Solution Summary

Uma aplicação web responsiva com dois lados, que só aproxima:

1. **Viajante:** consulta a vitrine pública de cotações de papel-moeda e cartão pré-pago por cidade e moeda. A vitrine mostra só nome da casa, cidade e cotação de balcão. O viajante cria uma oferta com modalidade (papel-moeda ou cartão pré-pago), quantia, taxa desejada ou "quero a melhor taxa", bairro de preferência, nome, e-mail e WhatsApp. Recebe o link de acompanhamento por e-mail e o alerta de aceite por WhatsApp.
2. **Casa de câmbio:** acessa um painel com login e senha. Recebe alerta por e-mail e no painel quando surge oferta na sua cidade, vê a oferta sem os dados pessoais do viajante e aceita. A primeira casa que aceita fecha a reserva. Os contatos são revelados só entre o viajante e essa casa.

Contrato cambial, IOF, tarifas, pagamento e entrega do numerário ou carga de cartão acontecem fora da plataforma, entre a casa e o viajante.

### Target Users

- **Viajante:** pessoa física com viagem internacional que precisa comprar papel-moeda ou cartão pré-pago (USD, EUR ou GBP) em São Paulo ou no Rio de Janeiro.
- **Operador da casa:** dono, gerente ou atendente de casa de câmbio com loja física em SP ou RJ, autorizada pelo Banco Central e credenciada manualmente por nós.
- **Operação interna:** o fundador, que credencia e desativa casas. Não há tela de autoatendimento para isso no MVP.

## Goals & Success Metrics

### Goals

1. Fazer ofertas de papel-moeda e cartão pré-pago de viajantes chegarem a casas autorizadas e terminarem em aceite com troca de contato.
2. Garantir que cada oferta tenha no máximo uma casa vencedora e que os dados do viajante só cheguem a ela.
3. Operar sem tocar em dinheiro, contrato cambial ou cálculo de IOF.

### Success Metrics

Os alvos vêm do problem statement. Contam a partir do lançamento do piloto, que só acontece depois do portão de código das hipóteses (ver Timeline).

| Metric | Current Baseline | Target | Timeline |
| --- | --- | --- | --- |
| Ofertas que terminam em `ACEITA` com contatos revelados aos dois lados (primária) | 0 | 30 | 90 dias após o lançamento |
| Casas ativas em SP ou RJ: casa credenciada que aceitou ao menos uma oferta no período | 0 | 10 a 15 | 90 dias após o lançamento |
| Mediana do tempo entre criação da oferta e aceite, em horas úteis | Sem dado | Medir; sem alvo no MVP | Contínuo |
| Parcela de ofertas que terminam em `EXPIRADA` | Sem dado | Medir; sem alvo no MVP | Contínuo |
| Ofertas com mais de uma casa vencedora (guardrail) | 0 | 0 | Contínuo |
| Dados do viajante exibidos a casa não vencedora (guardrail) | 0 | 0 | Contínuo |
| Reais recebidos, Pix gerado ou IOF calculado pela plataforma (guardrail) | 0 | 0 | Contínuo |

### Non-Goals

- Ser instituição de pagamento, correspondente cambial ou intermediário financeiro.
- Calcular preço final, VET ou IOF.
- Mediar a negociação depois do aceite.
- Formar preço em tempo real ou leilão entre casas.
- Monetizar o piloto. O MVP é gratuito para casas e viajantes. A monetização futura prevê modelo de assinatura mensal de software para as casas parceiras, descartando percentual ou cobrança sobre operações cambiais.

## User Stories

Histórias resumidas. O detalhe está em [`user-stories.md`](user-stories.md) e os cenários de QA em [`acceptance-criteria.md`](acceptance-criteria.md).

| ID | User Story | Priority |
| --- | --- | --- |
| US-1 | Como viajante, quero ver as cotações de papel-moeda e cartão pré-pago das casas da minha cidade para a moeda escolhida, para saber se vale a pena fazer uma oferta | P0 |
| US-2 | Como viajante, quero criar uma oferta com modalidade, quantia, taxa desejada ou "melhor taxa", bairro, nome e WhatsApp, para que casas autorizadas me atendam | P0 |
| US-3 | Como viajante, quero ver o status e o prazo da minha oferta, para saber se ainda estou esperando | P0 |
| US-4 | Como viajante, quero receber os dados da casa que aceitou, para fechar a compra diretamente com ela | P0 |
| US-5 | Como viajante, quero cancelar minha oferta enquanto nenhuma casa aceitou, para não ser contatado se desistir | P0 |
| US-6 | Como viajante, quero ser avisado quando minha oferta expirar sem aceite, para buscar outra alternativa | P0 |
| US-7 | Como operador da casa, quero entrar no painel com e-mail e senha, para ver as ofertas da minha cidade | P0 |
| US-8 | Como operador da casa, quero ser alertado por e-mail e no painel quando surgir oferta na minha cidade, para responder antes das outras casas | P0 |
| US-9 | Como operador da casa, quero aceitar uma oferta e saber na hora se ganhei ou se outra casa chegou antes, para não atender cliente que não é meu | P0 |
| US-10 | Como operador da casa, quero ver nome e WhatsApp do viajante depois de ganhar o aceite, para iniciar o contato imediatamente | P0 |
| US-11 | Como operador da casa, quero publicar minha cotação de venda por moeda e modalidade, para aparecer na vitrine | P0 |
| US-12 | Como operação interna, quero credenciar e desativar casas autorizadas, para que só casas conferidas recebam ofertas | P0 |
| US-13 | Como operador da casa, quero ver o histórico das ofertas que minha casa aceitou, para recuperar o contato depois | P1 |

## Scope

### In Scope

- Web responsiva para o viajante: vitrine, criação de oferta, página de status com cancelamento.
- Web responsiva para a casa: login, cotações, fila de ofertas abertas, aceite, histórico de aceites.
- Cidades: São Paulo e Rio de Janeiro.
- Moedas e Modalidades: USD, EUR, GBP (papel-moeda físico e cartão pré-pago internacional).
- E-mail transacional ao viajante com o link de acompanhamento e com o aviso de expiração. WhatsApp ao viajante apenas no alerta de aceite. A página de status é a fonte de verdade.
- Notificação à casa por e-mail e por alerta visual e sonoro no painel aberto.
- Regra do primeiro aceite com garantia atômica de vencedor único.
- Expiração automática e cancelamento pelo viajante.
- Credenciamento interno de casas, com conferência manual na lista do Banco Central.

### Out of Scope

- Qualquer pagamento: Pix, TED, boleto, cartão de crédito, custódia, escrow, sinal.
- Pregão em tempo real, WebSocket, contraproposta ou leilão entre casas.
- Chat dentro da plataforma. A conversa acontece no WhatsApp dos envolvidos.
- Cálculo de IOF, VET, tarifas ou preço final.
- App nativo iOS ou Android.
- Outras moedas além de USD/EUR/GBP, outras cidades além de SP/RJ, pessoa jurídica.
- Gestão de entrega ou logística de numerário/cartões. O campo é só "Bairro de preferência". A retirada, ou qualquer entrega, é combinada diretamente com a casa depois do aceite.
- Autocadastro de casas, KYB automatizado, MFA.
- Avaliação, ranking de atendimento, cupom, programa de fidelidade.
- Cobrança das casas ou dos viajantes.

### Future Considerations

- Novas praças: depois de a meta de 90 dias em SP e RJ ser atingida.
- Novas praças: depois de a meta de 90 dias em SP e RJ ser atingida.
- Verificação do WhatsApp do viajante por código: depende do volume de ofertas com número inválido observado no piloto.
- Modelo de receita: depois de provar que a aproximação acontece de graça.
- Calendário de feriados na contagem de horas úteis: depende da quantidade de ofertas criadas perto de feriados.

## Solution Design

### Functional Requirements

#### Vitrine pública

- FR-1: A vitrine exige a escolha de cidade (São Paulo ou Rio de Janeiro), modalidade (papel-moeda ou cartão pré-pago) e de moeda (USD, EUR ou GBP) e lista as casas credenciadas e ativas daquela cidade que publicaram cotação de venda para aquela moeda e modalidade.
- FR-2: Cada item da vitrine mostra apenas o nome da casa, a cidade, a modalidade e a cotação de venda de balcão em reais por unidade, com até 4 casas decimais. A lista vem ordenada da menor para a maior cotação. Bairro, telefone, WhatsApp, endereço e horário da cotação não aparecem na vitrine.
- FR-3: Cotação atualizada há mais de 24 horas não aparece na vitrine. Se nenhuma casa tiver cotação válida, a vitrine informa isso e continua permitindo criar a oferta, desde que FR-8 seja atendido.
- FR-4: Telefone, WhatsApp e endereço da casa só aparecem para o viajante depois do aceite (FR-25). A vitrine pública não os contém.
- FR-5: A vitrine e a página da oferta informam, em texto visível, que a cotação é referência da casa, que o valor final com IOF e tarifas é informado pela casa, e que pagamento e contrato acontecem diretamente com ela.

#### Oferta do viajante

- FR-6: O formulário de oferta pede cidade, modalidade (papel-moeda ou cartão pré-pago), moeda, quantia, taxa desejada ou a opção "quero a melhor taxa disponível", bairro de preferência, nome, e-mail e WhatsApp. O rótulo do campo é "Bairro de preferência". O texto de ajuda diz que a retirada, entrega ou carga do cartão é combinada diretamente com a casa depois do aceite. Todos são obrigatórios, exceto a taxa quando "melhor taxa" estiver marcada.
- FR-7: A quantia é um número inteiro de unidades da moeda, de 100 a 10.000 inclusive, para USD, EUR e GBP. A taxa desejada é positiva, em reais por unidade, com até 4 casas decimais. O e-mail tem formato válido. O WhatsApp é um celular brasileiro válido, armazenado em E.164.
- FR-8: A criação é recusada com mensagem clara se não houver nenhuma casa credenciada e ativa que opere aquela moeda naquela cidade.
- FR-9: Antes de enviar, o viajante marca um aceite explícito informando que nome e WhatsApp serão compartilhados apenas com a casa que aceitar a oferta, para contato sobre essa compra.
- FR-10: Cada WhatsApp pode ter no máximo uma oferta `ABERTA` ao mesmo tempo. Uma nova tentativa mostra a oferta aberta existente em vez de criar outra.
- FR-11: Um envio repetido do mesmo formulário, por clique duplo ou nova tentativa de rede, não cria duas ofertas.
- FR-12: Criada a oferta, o viajante vê uma página de confirmação com status, data e hora exatas de expiração, resumo da oferta e um link privado e não adivinhável para acompanhá-la. O mesmo link segue por e-mail transacional para o endereço informado. A página de confirmação também mostra o link, para o viajante não depender da entrega do e-mail.

#### Ciclo de vida da oferta

- FR-13: A oferta tem exatamente quatro estados: `ABERTA`, `ACEITA`, `EXPIRADA`, `CANCELADA`. As únicas transições permitidas são de `ABERTA` para cada um dos outros três. Estados terminais não mudam.
- FR-14: A validade é de 4 horas úteis, aprovada, contadas na janela de segunda a sexta, das 9h inclusive às 18h exclusive, no fuso America/Sao_Paulo. Uma oferta criada fora da janela começa a contar na próxima abertura. No instante exato da expiração a oferta já não pode ser aceita. Feriados que caem de segunda a sexta contam como dia de janela no MVP. A janela e a validade são configuráveis sem alterar código.
- FR-15: Ao fim da validade, uma oferta ainda `ABERTA` passa a `EXPIRADA` e o viajante é notificado por e-mail. A transição ocorre em até 5 minutos depois do horário de expiração. Uma oferta vencida nunca pode ser aceita, mesmo que o aviso de expiração ainda não tenha sido processado.
- FR-16: Pela página de status, o viajante pode cancelar a oferta enquanto ela estiver `ABERTA`. Depois de `ACEITA`, o cancelamento não está disponível na plataforma, e a página orienta o viajante a falar diretamente com a casa.

#### Painel da casa

- FR-17: O operador entra com e-mail e senha. Não há MFA no MVP. Senhas são armazenadas com hash adaptativo. Tentativas de login são limitadas por conta e por IP. A sessão expira após 10 horas sem ação do operador, o equivalente a uma jornada comercial, e é encerrada imediatamente se a casa ou o operador for desativado. A atualização automática do painel não conta como ação.
- FR-18: O operador publica e atualiza a cotação de venda de papel-moeda da casa para cada moeda que ela opera. Cada atualização registra data e hora.
- FR-19: A fila de ofertas mostra só ofertas `ABERTA` da cidade da casa e de moedas que ela opera. Cada uma traz moeda, quantia, bairro de preferência, taxa desejada ou "melhor taxa", e o tempo restante. Nome e WhatsApp do viajante não aparecem em nenhuma resposta da API para a casa antes de ela vencer o aceite.
- FR-20: A cada nova oferta compatível, a plataforma envia e-mail aos operadores ativos de cada casa elegível. Envio duplicado da mesma oferta para o mesmo operador não acontece.
- FR-21: Com o painel aberto, a fila se atualiza por consulta periódica (padrão: 30 segundos). Uma nova oferta gera destaque visual e um som curto. O som só toca depois que o operador ativa o alerta sonoro no painel, por exigência dos navegadores.

#### Aceite e troca de contatos

- FR-22: O botão "Aceitar oferta" fica disponível apenas para oferta `ABERTA` e não vencida. Para oferta de "melhor taxa", o aceite exige que a casa informe a taxa em reais por unidade que se compromete a praticar. Para oferta com taxa desejada, o aceite é a concordância com essa taxa.
- FR-23: A transição de `ABERTA` para `ACEITA` é atômica no banco de dados. Entre aceites concorrentes, inclusive no mesmo segundo, exatamente um vence. Todo outro aceite, cancelamento ou expiração concorrente sobre a mesma oferta falha sem efeito colateral.
- FR-24: A casa vencedora vê imediatamente nome e WhatsApp do viajante, com um atalho para abrir conversa no WhatsApp. A casa perdedora vê "Oferta já atendida por outra casa" e a oferta sai da sua fila.
- FR-25: O viajante recebe por WhatsApp o alerta de aceite, e vê na página de status nome da casa, endereço da loja, telefone ou WhatsApp comercial e, quando houver, a taxa informada no aceite. A mensagem diz que IOF, tarifas, valor final, pagamento e contrato serão tratados diretamente com a loja. WhatsApp do viajante não é usado para o link de acompanhamento nem para o aviso de expiração.
- FR-26: Ofertas aceitas ficam no histórico da casa vencedora, com os dados do viajante, até uma exclusão manual feita pelo administrador (FR-31).

#### Credenciamento

- FR-27: Só a operação interna cria, edita e desativa casas e operadores. O cadastro registra razão social, nome de exibição, CNPJ, cidade, bairro, endereço da loja, WhatsApp ou telefone comercial, moedas operadas e a data da conferência na lista oficial do Banco Central. Ao criar ou redefinir um operador, o administrador define a senha inicial; a entrega à casa é por canal seguro fora da plataforma. Não há senha temporária gerada pelo sistema nem troca obrigatória no primeiro login.
- FR-28: Uma casa desativada para de receber alertas, some da vitrine e não consegue aceitar ofertas. Ofertas que ela já aceitou permanecem válidas.

#### Privacidade e auditoria

- FR-29: Nome, e-mail e WhatsApp do viajante só podem ser lidos pelo próprio viajante, via link privado, e, depois do aceite, pelos operadores da casa vencedora. O e-mail do viajante não é exibido à casa.
- FR-30: A plataforma registra criação, aceite, tentativa de aceite perdida, cancelamento e expiração de cada oferta, com data e hora, e cada leitura dos dados do viajante pela casa vencedora.
- FR-31: Não há job de anonimização. O prazo de retenção de nome, e-mail e WhatsApp fica pendente de análise jurídica. No piloto, se for necessário apagar esses dados, o administrador faz a exclusão manual. Depois dela, nome, e-mail e WhatsApp deixam de ser legíveis e o link privado responde como oferta não encontrada.

### User Experience

**Viajante:** vitrine, depois formulário, depois página de status. Não há conta de viajante. O link privado substitui o login. A página de status mostra, em destaque, o estado atual e o horário de expiração. Quando a oferta é aceita, ela mostra os dados da casa e o texto de que o atendimento continua fora da plataforma.

**Casa:** login, depois fila de ofertas da cidade, depois aceite, depois contato do viajante. Fora isso, há uma tela de cotações e uma de histórico. O painel precisa caber numa tela de celular, porque o atendente da loja pode estar no balcão.

**Textos obrigatórios:** a neutralidade da plataforma, a ausência de pagamento e o valor final dado pela casa aparecem na vitrine, no formulário, na confirmação e na mensagem de aceite. O conteúdo exato vai para revisão jurídica.

Wireframes ainda não existem. Serão feitos após as histórias detalhadas.

### Edge Cases

| Scenario | Expected Behavior |
| --- | --- |
| Duas casas clicam "Aceitar" no mesmo segundo | Uma vence e vê o contato do viajante. A outra vê "Oferta já atendida por outra casa". O viajante recebe uma única notificação de aceite. |
| A casa clica "Aceitar" depois de a oferta expirar, mas antes do job de expiração rodar | Aceite recusado, a oferta é tratada como `EXPIRADA`, a casa vê que a oferta expirou. |
| O viajante cancela e uma casa aceita ao mesmo tempo | Vence a transição que o banco registrar primeiro. A outra falha e o lado perdedor vê o estado final real. |
| O viajante tenta cancelar uma oferta já aceita | O cancelamento é recusado. A página mostra os dados da casa e orienta o contato direto. |
| Oferta criada às 17h30 de uma sexta | Expira às 12h30 da segunda seguinte. 30 minutos contam na sexta e 3h30 na segunda. O horário exato aparece na confirmação. |
| Oferta criada no sábado ou fora da janela | Começa a contar na próxima abertura da janela. O horário exato aparece na confirmação. |
| Não há casa ativa para aquela moeda e cidade | A criação é recusada antes do envio, com mensagem explicando. |
| O WhatsApp já tem uma oferta `ABERTA` | A plataforma não cria outra e mostra o link da oferta existente. |
| O e-mail com o link ou com a expiração falha | A oferta segue válida, a página de status continua mostrando o estado real, e a falha fica registrada com novas tentativas. |
| O WhatsApp de aceite falha | O aceite permanece. A página de status mostra os dados da casa. A falha fica registrada com novas tentativas. |
| O e-mail para a casa falha | O alerta do painel continua funcionando. A falha fica registrada com novas tentativas. |
| A casa é desativada com oferta aberta na sua fila | Ela deixa de ver a oferta e não consegue aceitar. As outras casas seguem elegíveis. |
| Oferta de "melhor taxa" aceita com taxa absurda, como zero ou valor muito acima da cotação publicada pela própria casa | Taxa zero ou negativa é recusada. Taxa positiva é aceita como informada pela casa. A plataforma não valida preço de mercado. |
| O viajante informa um WhatsApp de terceiro | O MVP não verifica o número. O risco é aceito e medido (ver Riscos). |
| O link privado é compartilhado | Quem tiver o link vê o status e pode cancelar enquanto a oferta estiver `ABERTA`. Por isso o link não é adivinhável e não aparece em logs públicos. |

## Technical Considerations

### Constraints

- Stack: NestJS no backend, PostgreSQL como banco, Redis para filas e jobs agendados, Next.js no frontend.
- Arquitetura assíncrona e simples: requisição HTTP para comandos, fila para notificações e expiração, consulta periódica no painel. WebSocket fica proibido no MVP.
- O vencedor único do aceite é garantido pelo PostgreSQL na mesma transação que muda o estado. Não pode depender de Redis, de verificação na aplicação seguida de escrita, ou de ordem de chegada na fila.
- A expiração precisa ser correta mesmo se o job atrasar. O aceite verifica o prazo na própria transação.
- Notificações saem da transação de negócio por um mecanismo de entrega garantida. Falha de provedor não pode desfazer um aceite já gravado.
- Horários são armazenados em UTC e calculados na janela em America/Sao_Paulo.
- Fronteiras de módulos, transações e filas serão decididas em ADR na Etapa 3.

### Integration Points

- Provedor de e-mail transacional: link de acompanhamento e aviso de expiração para o viajante, e alerta de nova oferta para operadores das casas.
- Provedor de WhatsApp Business: somente o alerta de aceite ao viajante. Exige template aprovado pela Meta e número remetente verificado.
- Lista oficial de instituições autorizadas do Banco Central: conferência manual no credenciamento. Sem integração automática no MVP.

### Data Requirements

- Dados pessoais do viajante: nome, e-mail e WhatsApp. Base legal, texto de aceite e prazo de retenção precisam de revisão jurídica antes do lançamento.
- Dados de operadores: nome, e-mail, hash de senha, casa vinculada.
- Dados de casa: cadastro de FR-27 e cotações com histórico de atualização.
- Logs de aplicação não registram nome, e-mail nem WhatsApp do viajante em texto claro.
- Não há dado de pagamento, documento do viajante, nem contrato cambial na base.

## Agent Execution Contract

### Authoritative Sources

| Source | Path or link | Definitive for |
| --- | --- | --- |
| Este PRD | `docs/03-product/prd.md` | Comportamento, escopo, requisitos FR-1 a FR-31. Em conflito com histórias ou critérios, este documento vence. |
| Histórias | `docs/03-product/user-stories.md` | Recorte das 13 histórias e o benefício de cada uma |
| Critérios de aceite | `docs/03-product/acceptance-criteria.md` | Cenários observáveis de QA, inclusive concorrência e expiração |
| Problem statement | `docs/01-discovery/problem-statement.md` | Por que o produto existe, guarda-corpos, metas do piloto |
| Hipóteses | `docs/01-discovery/hypotheses.md` | Portão de código. Nenhum código de produto começa antes dele. |
| ADRs da Etapa 3 | `docs/04-architecture/adr/` (ADR-001 a ADR-004) | Arquitetura e fronteiras técnicas. Prevalecem sobre a seção Technical Considerations quando forem mais específicos, mas não alteram comportamento definido aqui. |
| Regras do repositório | `.cursor/rules/` | Convenções de engenharia NestJS |

### Do Not Touch

| Path or system | Reason it is off limits |
| --- | --- |
| `.cursor/rules/` e `.agents/skills/` | São o processo de trabalho da equipe, não código do produto |
| `docs/01-discovery/` | Registro de decisões já tomadas. Mudanças ali exigem decisão de produto. |
| Qualquer integração de pagamento, Pix, banco ou carteira | Proibido pelo guarda-corpo de zero custódia |
| Cálculo de IOF, VET ou tarifas | Responsabilidade legal da casa autorizada |

### Requirement Verification Map

| Requirement | How it is verified | Who verifies |
| --- | --- | --- |
| FR-1 | Teste de integração: só casas ativas da cidade com cotação na moeda aparecem | Automated |
| FR-2 | Teste de contrato: cada item público tem só nome, cidade e cotação, ordenado da menor para a maior | Automated |
| FR-3 | Teste com cotação de 24h01 de idade: excluída. Teste de vitrine vazia com criação de oferta disponível | Automated |
| FR-4 | Teste de contrato: resposta pública não contém telefone, WhatsApp, bairro nem endereço | Automated |
| FR-5 | Revisão dos textos em vitrine, formulário e confirmação | PM |
| FR-6 | Teste de validação: cada campo obrigatório ausente é recusado; taxa opcional com "melhor taxa" | Automated |
| FR-7 | Testes de 99, 100, 10.000 e 10.001 unidades, taxa e formatos de e-mail e WhatsApp | Automated |
| FR-8 | Teste: cidade e moeda sem casa ativa recusam a criação | Automated |
| FR-9 | Teste: criação sem aceite de compartilhamento é recusada | Automated |
| FR-10 | Teste: segunda oferta para WhatsApp com oferta `ABERTA` retorna a existente | Automated |
| FR-11 | Teste: duas requisições idênticas com a mesma chave criam uma oferta | Automated |
| FR-12 | Teste: confirmação traz expiração exata e link. Teste de entropia do token | Automated |
| FR-13 | Teste de todas as transições inválidas a partir de cada estado terminal | Automated |
| FR-14 | Testes de cálculo com horário fixo: dentro da janela, sexta 17h30, sábado, fora do horário | Automated |
| FR-15 | Teste do job com relógio controlado. Teste de aceite após o prazo antes do job rodar | Automated |
| FR-16 | Teste: cancelar `ABERTA` funciona; cancelar `ACEITA` é recusado | Automated |
| FR-17 | Teste de login, de limite de tentativas e de hash de senha | Automated |
| FR-18 | Teste de atualização e histórico de cotação | Automated |
| FR-19 | Teste de contrato: nenhuma resposta da fila contém nome ou WhatsApp. Teste de filtro por cidade e moeda | Automated |
| FR-20 | Teste de job: um e-mail por operador elegível por oferta, inclusive com reprocessamento | Automated |
| FR-21 | Verificação manual no navegador: nova oferta aparece em até 30 segundos, com destaque e som após ativação | QA |
| FR-22 | Teste: "melhor taxa" sem taxa da casa é recusada; taxa desejada aceita sem campo extra | Automated |
| FR-23 | Teste de concorrência no PostgreSQL real: N aceites simultâneos produzem exatamente um vencedor. Também aceite contra cancelamento e contra expiração | Automated |
| FR-24 | Teste: vencedora recebe contato; perdedora recebe mensagem de oferta já atendida | Automated |
| FR-25 | Teste do conteúdo da mensagem e da página de status após aceite | Automated |
| FR-26 | Teste do histórico da casa vencedora e da ausência para as outras | Automated |
| FR-27 | Teste: rotas de credenciamento recusam operador de casa | Automated |
| FR-28 | Teste: casa desativada sai da vitrine, não recebe alerta e não aceita | Automated |
| FR-29 | Teste de autorização para cada leitor não permitido | Automated |
| FR-30 | Teste: cada evento listado gera registro de auditoria | Automated |
| FR-31 | Teste da exclusão manual pelo administrador. Não existe job agendado de anonimização | Automated |

### Stop and Escalate

| Condition | Escalate to |
| --- | --- |
| Qualquer requisito parece exigir receber, reter ou movimentar dinheiro | Renato (produto) |
| Qualquer requisito parece exigir calcular IOF, VET, tarifa ou preço final | Renato (produto) |
| Qualquer mudança expõe nome ou WhatsApp do viajante a quem não venceu o aceite | Renato (produto) e Tech Lead |
| A garantia de vencedor único só parece possível fora do PostgreSQL | Tech Lead |
| A solução proposta exige WebSocket, chat, contraproposta ou leilão | Renato (produto) |
| Um provedor de WhatsApp exige fluxo ou dado que este PRD não prevê | Renato (produto) |
| A implementação começa antes do portão de código das hipóteses estar fechado | Renato (produto) |
| Um texto legal, de consentimento ou de retenção precisa ser escrito sem revisão jurídica | Renato (produto) |

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if Delayed |
| --- | --- | --- | --- |
| Portão de código de `hypotheses.md` (H1 e H3 validadas, H4 não invalidada) | Renato (produto) | Concierge começa em 4 de novembro de 2026 | Sem portão, não começa código de produto |
| Conta e template de aceite aprovados no WhatsApp Business | Renato (produto) | Não iniciado | O aceite continua visível na página de status. O alerta no WhatsApp do viajante atrasa. |
| Provedor de e-mail transacional com domínio verificado | Tech Lead | Não iniciado | O viajante depende do link mostrado na confirmação. A casa só recebe alerta com o painel aberto. |
| Revisão jurídica de consentimento, retenção e textos de neutralidade | Renato (produto) | Não iniciado | O lançamento do piloto fica bloqueado |
| Casas credenciadas de H1, conferidas na lista do Banco Central | Renato (produto) | Concierge em andamento a partir de 4 de novembro de 2026 | Lançamento sem oferta do lado das casas |

### Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| A casa aceita a taxa e depois cobra tarifa que muda o preço final | M | H | Textos de FR-5 e FR-25. A taxa aceita fica registrada. Reclamações viram dado do piloto. |
| O viajante informa WhatsApp de terceiro ou errado | M | M | Medir contatos inválidos reportados pelas casas. A verificação por código é a próxima medida. |
| A casa contorna a plataforma e não aceita pelo painel | M | M | Painel no celular, alerta por e-mail, aceite em um clique. Medir aceites por casa. |
| Ofertas criadas à noite ficam paradas até o dia seguinte | H | M | A expiração conta só na janela, e o horário exato aparece para o viajante. |
| Aprovação do template de aceite no WhatsApp atrasa | M | M | A página de status mostra a casa vencedora. O e-mail do link não depende desse template. |
| A consulta periódica do painel gera carga além do esperado | L | L | Intervalo configurável. A consulta é barata e filtrada por cidade e moeda. |
| O alerta sonoro cria a sensação de pregão | L | M | Um som por nova oferta, sem contagem regressiva competitiva nem lances. |

## Timeline & Milestones

Datas absolutas antes do portão seriam palpite. Os marcos de construção contam a partir dele.

| Milestone | Description | Target Date |
| --- | --- | --- |
| Portão de código | Decisão agregada das hipóteses H1 a H4 | 28 de dezembro de 2026 |
| Histórias, critérios de aceite e ADRs | Etapas 2 e 3 concluídas; revisão por `utility-pm-critic` | Antes do portão, em paralelo ao concierge |
| M1: Fundação | Credenciamento interno, login da casa, cotações, vitrine | Portão + 2 semanas |
| M2: Oferta e ciclo de vida | Criação, status, cancelamento, expiração, alerta por e-mail | Portão + 4 semanas |
| M3: Aceite e contatos | Aceite atômico, revelação de contatos, WhatsApp, painel com alerta | Portão + 6 semanas |
| Lançamento do piloto | Casas de H1 credenciadas; revisão jurídica concluída | Portão + 7 semanas |
| Fim do piloto | Leitura das metas de 90 dias | Lançamento + 90 dias |

## Decisões travadas em 2026-11-03

- A vitrine pública mostra apenas nome da casa, cidade e cotação de balcão. Telefone, WhatsApp, bairro e endereço ficam para depois do aceite.
- A quantia aceita é de 100 a 10.000 unidades inteiras, inclusive, para USD, EUR e GBP.
- O link de acompanhamento e o aviso de expiração vão por e-mail transacional. O alerta de aceite vai por WhatsApp. Por isso a oferta passa a pedir e-mail.
- A expiração de 4 horas úteis, de segunda a sexta, das 9h inclusive às 18h exclusive, está aprovada. Sábado e domingo ficam fora da janela.
- A sessão do operador expira após 10 horas sem atividade.

## Open Questions

- [ ] Qual prazo de retenção de nome, e-mail e WhatsApp a assessoria jurídica vai definir? No piloto não há apagamento automático; a exclusão, se necessária, é manual pelo administrador. O texto de consentimento também aguarda essa revisão. - Owner: Renato (produto), com assessoria jurídica
- [ ] Qual provedor de WhatsApp Business será usado, e qual o custo por mensagem de aceite no piloto gratuito? - Owner: Tech Lead
- [ ] Depois do aceite, a plataforma deve registrar se a compra aconteceu, para repetir a medição da H4 no piloto? - Owner: Renato (produto)
## Appendix

### Related Documents

- Problem Statement: [`docs/01-discovery/problem-statement.md`](../01-discovery/problem-statement.md)
- Hipóteses e portão de código: [`docs/01-discovery/hypotheses.md`](../01-discovery/hypotheses.md)
- Histórias: [`docs/03-product/user-stories.md`](user-stories.md)
- Critérios de aceite: [`docs/03-product/acceptance-criteria.md`](acceptance-criteria.md)
- User Research: concierge das hipóteses H1 a H4, em andamento
- Design Specs: a criar
- Technical Design: [`docs/04-architecture/adr/`](../04-architecture/adr/)

### Revision History

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | 2026-11-03 | Tech Lead e PM | Rascunho inicial |
| 1.1 | 2026-11-03 | Tech Lead e PM | Trava vitrine sem contato, limites 100 a 10.000, e-mail do link e WhatsApp só no aceite, janela de 4 horas úteis, sessão de 10 horas de inatividade |
| 1.2 | 2026-11-03 | Tech Lead e PM | Ajustes F-01 a F-08: casa ativa, bairro de preferência, status spec-locked, exclusão manual sem job de 90 dias |
