---
artifact: acceptance-criteria
version: "1.0"
created: 2026-11-03
status: draft
context: Critérios Given/When/Then das 13 histórias do MVP. Concorrência do aceite e fronteiras de expiração estão em US-9 e US-3.
---

# Acceptance Criteria: MVP de aproximação para papel-moeda

Cada bloco abaixo é o conjunto de QA de uma história de [`user-stories.md`](user-stories.md). O PRD vence em conflito. Um cenário prova um resultado. Concorrência do primeiro aceite vive em US-9. O relógio de 4 horas úteis vive em US-3. As outras histórias apontam para esses blocos em vez de repetir o caso.

Relógio usado em todos os horários: America/Sao_Paulo. Janela aprovada: segunda a sexta, início inclusive às 9h00, fim exclusive às 18h00. Quantia aprovada: inteiro de 100 a 10.000.

---

# US-1: Ver cotações de balcão

## Story Context

O viajante escolhe São Paulo ou Rio de Janeiro e USD, EUR ou GBP, e vê só nome, cidade e cotação de balcão. O contato da casa fica para depois do aceite.

## Happy Path

### US-1-AC-1: Lista ordenada com três campos

**Given** duas casas ativas em São Paulo publicaram cotação de USD há menos de 24 horas, a 5,5012 e a 5,4800

**When** o viajante seleciona São Paulo e USD

**Then** a lista mostra primeiro a casa de 5,4800 e depois a de 5,5012, e cada item contém somente nome, cidade e cotação

## Edge Cases

### US-1-AC-2: Cidade e moeda sem cotação fresca

**Given** a única cotação de GBP no Rio de Janeiro foi atualizada há 24 horas e 1 minuto

**When** o viajante seleciona Rio de Janeiro e GBP

**Then** a lista fica vazia, a página diz que não há cotação no momento, e o caminho para criar oferta continua disponível

### US-1-AC-3: Casa de outra cidade

**Given** uma casa do Rio de Janeiro tem cotação fresca de EUR

**When** o viajante seleciona São Paulo e EUR

**Then** essa casa não aparece

## Error States

### US-1-AC-4: Vitrine indisponível

**Given** a consulta da vitrine falha

**When** o viajante pede a lista

**Then** ele vê um erro dizendo para tentar de novo, e nenhuma casa parcial é exibida como se fosse a lista completa

## Non-Functional Criteria

### US-1-AC-5: Resposta pública sem contato

**Given** qualquer casa com telefone, WhatsApp, bairro e endereço cadastrados

**When** a vitrine dessa cidade e moeda é consultada, inclusive por quem não está logado

**Then** a resposta não contém telefone, WhatsApp, bairro nem endereço

## Notes

- A cotação velha continua permitindo oferta se houver casa ativa na praça. A recusa por falta de casa é US-2.

---

# US-2: Criar oferta

## Story Context

O viajante registra a intenção de compra. A casa ainda não vê nome nem WhatsApp.

## Happy Path

### US-2-AC-1: Oferta com taxa desejada

**Given** há casa ativa de USD em São Paulo, e o viajante informa 500, taxa 5,4321, bairro, nome, e-mail válido, WhatsApp válido e o consentimento

**When** ele envia o formulário

**Then** existe uma oferta `ABERTA` e a tela de confirmação abre

### US-2-AC-2: Melhor taxa

**Given** os mesmos dados, com "quero a melhor taxa disponível" marcado e a taxa em branco

**When** ele envia

**Then** a oferta `ABERTA` existe sem taxa desejada

## Edge Cases

### US-2-AC-3: Limites de quantia

**Given** o restante do formulário é válido

**When** a quantia enviada é 100, 10000, 99, 10001 ou 100,5

**Then** 100 e 10000 criam a oferta, e 99, 10001 e 100,5 não criam e apontam a quantia

### US-2-AC-4: Uma oferta aberta por WhatsApp

**Given** o WhatsApp já tem uma oferta `ABERTA`

**When** o viajante envia outra oferta com o mesmo WhatsApp

**Then** nenhuma oferta nova é criada e ele vê o link da oferta que já está aberta

### US-2-AC-5: Clique duplo

**Given** o viajante dispara duas vezes o mesmo envio

**When** os dois pedidos chegam

**Then** existe uma única oferta

## Error States

### US-2-AC-6: Sem casa na praça

**Given** não há casa ativa que opere EUR no Rio de Janeiro

**When** o viajante envia uma oferta de EUR no Rio de Janeiro

**Then** a oferta não é criada e a mensagem diz que não há casa disponível para essa moeda nessa cidade

### US-2-AC-7: Consentimento desmarcado

**Given** o formulário está válido e o consentimento está desmarcado

**When** ele envia

**Then** a oferta não é criada e o consentimento é indicado como obrigatório

### US-2-AC-8: E-mail ou WhatsApp inválido

**Given** o e-mail não tem formato de e-mail, ou o WhatsApp não é celular brasileiro

**When** ele envia

**Then** a oferta não é criada e o campo inválido é indicado

## Non-Functional Criteria

### US-2-AC-9: Dados pessoais fora da fila

**Given** a oferta acabou de ser criada

**When** um operador elegível consulta a fila antes de aceitar

**Then** nome, e-mail e WhatsApp do viajante não aparecem nessa consulta

## Notes

- Taxa zero ou negativa é recusada. Taxa positiva com até 4 casas decimais é aceita.
- O rótulo do campo é "Bairro de preferência". O texto de ajuda esclarece que retirada ou qualquer entrega é combinada diretamente com a casa depois do aceite (FR-6).

---

# US-3: Acompanhar status e prazo

## Story Context

A página de status mostra o estado e o horário exato de expiração. Quatro horas úteis correm só dentro da janela. Estes cenários são a suíte de fronteira do relógio.

## Happy Path

### US-3-AC-1: Confirmação e e-mail

**Given** uma oferta é criada na terça-feira às 10h00

**When** a confirmação é exibida e o e-mail de acompanhamento é entregue

**Then** a página e o e-mail mostram expiração na terça-feira às 14h00, e os dois apontam para o mesmo link privado

### US-3-AC-2: Link abre sem login

**Given** o viajante não tem conta

**When** ele abre o link privado

**Then** vê o estado atual e o horário de expiração

## Edge Cases

### US-3-AC-3: Início exato da janela

**Given** uma oferta é criada na segunda-feira às 9h00

**When** a confirmação é exibida

**Then** a expiração é na segunda-feira às 13h00

### US-3-AC-4: Um minuto antes da janela

**Given** uma oferta é criada na segunda-feira às 8h59

**When** a confirmação é exibida

**Then** a expiração é na segunda-feira às 13h00

### US-3-AC-5: Fim exclusive da janela

**Given** uma oferta é criada na segunda-feira às 18h00

**When** a confirmação é exibida

**Then** a expiração é na terça-feira às 13h00

### US-3-AC-6: Uma hora no fim do dia

**Given** uma oferta é criada na segunda-feira às 17h00

**When** a confirmação é exibida

**Then** a expiração é na terça-feira às 12h00

### US-3-AC-7: Sexta às 17h30

**Given** uma oferta é criada na sexta-feira às 17h30

**When** a confirmação é exibida

**Then** a expiração é na segunda-feira às 12h30

### US-3-AC-8: Sábado e domingo

**Given** uma oferta é criada no sábado às 15h00, e outra no domingo às 23h00

**When** as confirmações são exibidas

**Then** as duas expiram na segunda-feira às 13h00

### US-3-AC-9: Feriado em dia de semana

**Given** uma quinta-feira é feriado e uma oferta é criada nessa quinta às 10h00

**When** a confirmação é exibida

**Then** a expiração é nessa quinta às 14h00

### US-3-AC-10: Instante exato da expiração

**Given** a oferta expira na terça-feira às 14h00

**When** uma casa tenta aceitar às 13h59 e outra tentativa ocorre às 14h00

**Then** a tentativa das 13h59 vence se nenhuma outra casa já tiver aceitado, e a tentativa das 14h00 é recusada sem revelar o contato do viajante

### US-3-AC-11: Aviso atrasado não prolonga a oferta

**Given** o horário de expiração já passou e o estado ainda não foi marcado como `EXPIRADA`

**When** uma casa tenta aceitar

**Then** o aceite é recusado e a casa vê que a oferta expirou

## Error States

### US-3-AC-12: E-mail de acompanhamento falha

**Given** o provedor de e-mail recusa o envio do link

**When** a oferta acaba de ser criada

**Then** a oferta permanece `ABERTA`, a confirmação na tela mostra o link, e a falha fica registrada para nova tentativa

### US-3-AC-13: Link inexistente

**Given** o endereço não corresponde a uma oferta

**When** alguém o abre

**Then** vê que a oferta não foi encontrada e nenhum dado de viajante ou de casa aparece

## Non-Functional Criteria

### US-3-AC-14: Link não adivinhável

**Given** uma oferta existente

**When** se comparam links emitidos para ofertas diferentes

**Then** o link de uma não dá acesso à outra, e o link não aparece em mensagem de erro nem em log legível por quem opera o painel da casa

## Notes

- O aviso de expiração em si é US-6. A corrida entre aceite e expiração é US-9.

---

# US-4: Receber a casa que aceitou

## Story Context

Depois do aceite, o viajante vê a loja na página de status e recebe um WhatsApp. A negociação formal acontece fora da plataforma.

## Happy Path

### US-4-AC-1: Página com a loja

**Given** a oferta está `ACEITA` por uma casa com endereço e WhatsApp comercial, e a casa informou taxa no aceite de "melhor taxa"

**When** o viajante abre o link

**Then** vê nome da casa, endereço, WhatsApp comercial e a taxa informada, mais o texto de que IOF, tarifas, valor final, pagamento e contrato são com a loja

### US-4-AC-2: Um WhatsApp

**Given** a oferta acabou de ser aceita

**When** o alerta de aceite é entregue

**Then** o viajante recebe uma mensagem de WhatsApp, e uma segunda entrega do mesmo evento não gera outra mensagem

## Edge Cases

### US-4-AC-3: Aceite da taxa que o viajante pediu

**Given** a oferta tinha taxa desejada e a casa aceitou essa taxa

**When** o viajante abre o status

**Then** a página mostra a taxa desejada como a taxa aceita

## Error States

### US-4-AC-4: WhatsApp falha

**Given** o provedor de WhatsApp recusa o alerta

**When** o viajante abre o link

**Then** a oferta continua `ACEITA`, os dados da casa estão na página, e a falha fica registrada para nova tentativa

## Non-Functional Criteria

### US-4-AC-5: Sem pagamento na mensagem

**Given** o alerta de aceite e a página de status

**When** o conteúdo é lido

**Then** não há chave Pix, valor a pagar à plataforma nem cálculo de IOF

## Notes

- Quem envia o WhatsApp é a plataforma, para o número informado na oferta. A conversa seguinte é entre viajante e casa.

---

# US-5: Cancelar oferta aberta

## Story Context

O viajante desiste só enquanto a oferta está `ABERTA`.

## Happy Path

### US-5-AC-1: Cancelar

**Given** a oferta está `ABERTA`

**When** o viajante confirma o cancelamento na página de status

**Then** o estado fica `CANCELADA` e a oferta deixa de aparecer na fila das casas

## Edge Cases

### US-5-AC-2: Segunda confirmação

**Given** a oferta já está `CANCELADA`

**When** o mesmo link tenta cancelar de novo

**Then** o estado permanece `CANCELADA`

## Error States

### US-5-AC-3: Oferta já aceita

**Given** a oferta está `ACEITA`

**When** o viajante tenta cancelar

**Then** o cancelamento é recusado, o estado permanece `ACEITA` e a página mostra a casa

## Non-Functional Criteria

### US-5-AC-4: Cancelamento auditado

**Given** um cancelamento concluído

**When** o registro da oferta é consultado pela operação interna

**Then** há data e hora da transição para `CANCELADA`

## Notes

- Cancelamento simultâneo a um aceite está em US-9-AC-8.

---

# US-6: Ser avisado da expiração

## Story Context

Oferta não aceita no prazo vira `EXPIRADA` e o viajante recebe e-mail. O relógio testado é o de US-3.

## Happy Path

### US-6-AC-1: E-mail e estado

**Given** uma oferta `ABERTA` atinge o horário de expiração

**When** passam até 5 minutos

**Then** o estado é `EXPIRADA` e o e-mail do viajante recebe um aviso com o link de acompanhamento

## Edge Cases

### US-6-AC-2: Reprocessamento

**Given** o aviso de expiração é processado duas vezes

**When** a segunda execução termina

**Then** o viajante tem um único e-mail de expiração e o estado continua `EXPIRADA`

## Error States

### US-6-AC-3: E-mail falha

**Given** o provedor de e-mail falha

**When** o prazo acaba

**Then** o estado ainda fica `EXPIRADA`, a página mostra oferta expirada, e a falha fica registrada para nova tentativa

## Non-Functional Criteria

### US-6-AC-4: Expirada não volta

**Given** a oferta está `EXPIRADA`

**When** alguém tenta aceitar ou cancelar

**Then** as duas ações são recusadas e o estado não muda

## Notes

- Aceite depois do prazo, antes da marcação, está em US-3-AC-11 e US-9-AC-9.

---

# US-7: Entrar no painel

## Story Context

Operador ativo entra com e-mail e senha. Sem MFA no MVP.

## Happy Path

### US-7-AC-1: Entrar

**Given** um operador ativo com senha correta

**When** ele envia e-mail e senha

**Then** entra no painel da própria casa

## Edge Cases

### US-7-AC-2: Sessão inativa

**Given** a última ação do operador foi há 10 horas, e desde então só houve a atualização automática do painel

**When** ele tenta abrir a fila

**Then** volta para o login e a fila não é exibida

### US-7-AC-2b: Ação renova a sessão

**Given** a última ação do operador foi há 9 horas e 59 minutos

**When** ele abre a fila, aceita uma oferta ou publica uma cotação

**Then** a ação é atendida e as 10 horas de inatividade recomeçam a contar dela

## Error States

### US-7-AC-3: Senha errada

**Given** a senha não confere

**When** ele tenta entrar

**Then** permanece deslogado e a mensagem não revela se o e-mail existe

### US-7-AC-4: Limite de tentativas

**Given** a conta ou o IP já atingiu o limite configurado de tentativas

**When** ele tenta de novo dentro da janela de bloqueio

**Then** o acesso é recusado e ele vê que deve esperar para tentar outra vez

### US-7-AC-5: Casa desativada

**Given** a casa do operador foi desativada

**When** ele usa a senha correta

**Then** o acesso é recusado

## Non-Functional Criteria

### US-7-AC-6: Senha ilegível

**Given** um operador cadastrado

**When** o armazenamento de credenciais é inspecionado

**Then** a senha não está em texto legível

### US-7-AC-7: Erro acessível

**Given** o login falha

**When** a mensagem aparece

**Then** ela está associada ao formulário de um modo que um leitor de tela anuncia, e o foco vai para o formulário

## Notes

- O número de tentativas é configuração. A inatividade é fixada em 10 horas.
- A atualização automática do painel, a cada 30 segundos, não conta como atividade. Sem essa regra, um painel esquecido aberto nunca expiraria. Uma jornada das 9h às 18h só olhando a fila continua dentro das 10 horas.

---

# US-8: Receber alerta de nova demanda

## Story Context

A casa vê a oferta da própria cidade sem o contato do viajante, por e-mail e no painel.

## Happy Path

### US-8-AC-1: Fila

**Given** uma oferta `ABERTA` de 1.000 USD em São Paulo, bairro Pinheiros, taxa 5,4000, e a casa opera USD em São Paulo

**When** o operador abre a fila

**Then** vê moeda, quantia, bairro, taxa e tempo restante, e não vê nome nem WhatsApp

### US-8-AC-2: E-mail da casa

**Given** dois operadores ativos dessa casa

**When** a oferta é criada

**Then** cada um recebe um e-mail, e um reprocessamento não envia o segundo e-mail para o mesmo operador

## Edge Cases

### US-8-AC-3: Moeda que a casa não opera

**Given** a casa opera só USD e surge oferta de GBP na mesma cidade

**When** o operador abre a fila e o e-mail é processado

**Then** a oferta não aparece e nenhum e-mail dessa oferta é enviado à casa

### US-8-AC-4: Som só depois da permissão

**Given** o painel está aberto e o alerta sonoro ainda não foi ligado pelo operador

**When** uma oferta compatível surge

**Then** em até 30 segundos ela aparece em destaque e nenhum som toca

### US-8-AC-5: Som depois de ligar

**Given** o operador ligou o alerta sonoro nesta visita ao painel

**When** outra oferta compatível surge

**Then** em até 30 segundos ela aparece em destaque e toca um som curto, uma vez

## Error States

### US-8-AC-6: E-mail da casa falha

**Given** o provedor de e-mail falha

**When** o operador está com o painel aberto

**Then** a oferta ainda aparece na próxima consulta, em até 30 segundos, e a falha do e-mail fica registrada para nova tentativa

## Non-Functional Criteria

### US-8-AC-7: Sem dado pessoal em trânsito para a casa

**Given** a oferta contém nome, e-mail e WhatsApp

**When** a fila e o e-mail de alerta são produzidos

**Then** nenhum dos dois contém nome, e-mail ou WhatsApp do viajante

## Notes

- O intervalo de 30 segundos é o padrão e pode ser configurado. O teste usa o padrão.

---

# US-9: Aceitar e saber se ganhou

## Story Context

A primeira casa que aceita ganha. Pedidos simultâneos, cancelamento e expiração disputam a mesma oferta e só uma transição vence. O perdedor não recebe contato.

## Happy Path

### US-9-AC-1: Aceite da taxa pedida

**Given** uma oferta `ABERTA`, dentro do prazo, com taxa desejada, visível para uma única casa elegível

**When** o operador clica em "Aceitar oferta"

**Then** a oferta fica `ACEITA` para essa casa e a tela confirma que ela ganhou o atendimento

### US-9-AC-2: Melhor taxa com número

**Given** a oferta pede a melhor taxa e está `ABERTA`

**When** o operador informa 5,5100 e aceita

**Then** a oferta fica `ACEITA` e a taxa registrada é 5,5100

## Edge Cases

### US-9-AC-3: Duas casas no mesmo segundo

**Given** a Casa A e a Casa B são elegíveis para a mesma oferta `ABERTA`

**When** as duas submetem o aceite no mesmo segundo

**Then** exatamente uma fica vencedora, a outra vê "Oferta já atendida por outra casa", a oferta sai da fila da perdedora, e o viajante tem um único alerta de aceite

### US-9-AC-4: Dez aceites simultâneos

**Given** dez casas elegíveis submetem o aceite ao mesmo tempo

**When** todos os pedidos terminam

**Then** existe um único estado `ACEITA`, uma única casa vencedora e nove resultados de oferta já atendida

### US-9-AC-5: Clique duplo da mesma casa

**Given** a casa ainda não venceu

**When** o operador dispara dois aceites da mesma oferta

**Then** a casa vence uma vez e o segundo resultado não cria outro atendimento nem outra notificação

### US-9-AC-6: Taxa absurda em "melhor taxa"

**Given** a oferta pede a melhor taxa e a cotação publicada pela casa é 5,5000

**When** o operador tenta aceitar com taxa 0, com taxa negativa e com taxa 9,9999

**Then** 0 e a taxa negativa são recusados sem mudar o estado, e 9,9999 é aceito se essa casa vencer

### US-9-AC-7: Casa de outra cidade ou moeda

**Given** a oferta é de USD em São Paulo

**When** uma casa do Rio de Janeiro, ou uma casa de São Paulo que não opera USD, submete aceite

**Then** o aceite é recusado e o estado da oferta não muda por causa desse pedido

## Error States

### US-9-AC-8: Aceite contra cancelamento

**Given** a oferta está `ABERTA`

**When** o viajante confirma o cancelamento e uma casa submete o aceite ao mesmo tempo

**Then** só uma das duas transições permanece, o outro lado vê o estado final, e não existem ao mesmo tempo `ACEITA` e `CANCELADA`

### US-9-AC-9: Aceite contra expiração

**Given** a oferta atinge o instante de expiração enquanto uma casa submete o aceite

**When** os dois pedidos terminam

**Then** ou a casa venceu antes do instante e o viajante recebe o alerta, ou o aceite é recusado e a oferta fica `EXPIRADA`, nunca os dois

### US-9-AC-10: Aceite depois do prazo com marcação atrasada

**Given** o instante de expiração já passou e o estado ainda não foi atualizado para `EXPIRADA`

**When** a casa clica em aceitar

**Then** o aceite é recusado, a casa vê que a oferta expirou e nenhum contato do viajante é exibido

### US-9-AC-11: Casa desativada no meio da fila

**Given** a casa via a oferta e é desativada antes do clique

**When** o operador aceita

**Then** o aceite é recusado e as outras casas elegíveis continuam podendo aceitar

### US-9-AC-12: Melhor taxa sem número

**Given** a oferta pede a melhor taxa

**When** o operador aceita sem informar taxa

**Then** o estado continua `ABERTA` e a tela pede a taxa

## Non-Functional Criteria

### US-9-AC-13: Perdedor sem contato

**Given** a Casa B perdeu US-9-AC-3, US-9-AC-4 ou US-9-AC-8

**When** a resposta do aceite, a fila e o histórico da Casa B são lidos

**Then** nenhum deles contém nome, e-mail ou WhatsApp do viajante

### US-9-AC-14: Falha de notificação não desfaz o vencedor

**Given** o aceite vencedor foi gravado e o WhatsApp do viajante falha

**When** a falha é registrada

**Then** a oferta continua `ACEITA` pela mesma casa e a página de status mostra essa casa

### US-9-AC-15: Tentativa perdida auditada

**Given** uma casa perdeu o aceite por concorrência, cancelamento ou expiração

**When** a operação interna consulta o registro da oferta

**Then** a tentativa perdida está registrada com data, hora e casa, sem o contato do viajante nesse registro de perda

## Notes

- O teste de US-9-AC-3 e US-9-AC-4 dispara os pedidos juntos, contra o banco real do projeto, e confere o resultado observável. Não basta simular a ordem na aplicação.
- Taxa positiva fora da cotação publicada é decisão da casa. A plataforma não corrige preço.

---

# US-10: Ver contato do viajante

## Story Context

Só a casa vencedora vê nome e WhatsApp. O e-mail do viajante não vai para a casa.

## Happy Path

### US-10-AC-1: Contato e atalho

**Given** a casa venceu o aceite de uma oferta com nome e WhatsApp

**When** a confirmação do aceite é exibida

**Then** o operador vê nome e WhatsApp e um atalho que abre conversa com esse número

## Edge Cases

### US-10-AC-2: Segunda abertura

**Given** o operador fechou a tela e voltou ao histórico antes de qualquer exclusão manual dos dados pessoais da oferta

**When** ele abre a oferta aceita

**Then** nome e WhatsApp continuam visíveis

## Error States

### US-10-AC-3: Operador de outra casa

**Given** outra casa da mesma cidade está autenticada

**When** ela pede o contato dessa oferta

**Then** o pedido é recusado e o contato não aparece

## Non-Functional Criteria

### US-10-AC-4: E-mail oculto e leitura auditada

**Given** a casa vencedora abre o contato

**When** a tela e o registro de auditoria são conferidos

**Then** o e-mail do viajante não está na tela, e a leitura fica registrada com data, hora e operador

## Notes

- O atalho não envia mensagem pela plataforma.

---

# US-11: Publicar cotação de venda

## Story Context

O operador publica o preço de balcão que a vitrine exibe.

## Happy Path

### US-11-AC-1: Publicar USD

**Given** o operador está autenticado e a casa opera USD

**When** ele publica 5,5050

**Then** a vitrine da cidade em USD mostra a casa com 5,5050

## Edge Cases

### US-11-AC-2: Substituição

**Given** a cotação exibida é 5,5050

**When** ele publica 5,4900

**Then** a vitrine mostra 5,4900

### US-11-AC-3: Quatro casas decimais

**Given** o operador publica 5,4321

**When** a vitrine é consultada

**Then** o valor exibido é 5,4321

## Error States

### US-11-AC-4: Valor inválido ou moeda não operada

**Given** a casa não opera GBP

**When** o operador publica 0, um valor negativo, ou uma cotação de GBP

**Then** a publicação é recusada e a vitrine não muda

## Non-Functional Criteria

### US-11-AC-5: Horário da publicação

**Given** uma publicação aceita

**When** a cotação é lida 24 horas e 1 minuto depois sem nova publicação

**Then** a casa não aparece na vitrine dessa moeda

## Notes

- A casa sem cotação fresca ainda pode receber oferta se estiver ativa. Isso é FR-3 com FR-8.

---

# US-12: Credenciar e desativar casas

## Story Context

A operação interna credencia casa conferida na lista do Banco Central e pode desativá-la.

## Happy Path

### US-12-AC-1: Credenciar

**Given** a operação interna conferiu a autorização

**When** grava razão social, nome, CNPJ, São Paulo, bairro, endereço, WhatsApp comercial, USD, data da conferência, um operador e a senha inicial desse operador

**Then** a casa fica ativa e esse operador consegue entrar com essa senha, sem troca obrigatória no primeiro acesso

## Edge Cases

### US-12-AC-2: Cidade ou moeda fora do piloto

**Given** a operação interna tenta salvar uma casa em Belo Horizonte ou com moeda diferente de USD, EUR e GBP

**When** ela grava

**Then** o cadastro é recusado e a casa não fica ativa

## Error States

### US-12-AC-3: Operador tenta credenciar

**Given** um operador de casa autenticado

**When** ele cria, edita ou desativa uma casa

**Then** a ação é recusada

### US-12-AC-4: Desativar com aceite antigo

**Given** a casa tem uma oferta `ACEITA` e outra `ABERTA` na fila

**When** a operação interna desativa a casa

**Then** a casa sai da vitrine, a oferta aberta deixa de ser aceitável por ela, o aceite antigo permanece, e ela não recebe alerta novo

## Non-Functional Criteria

### US-12-AC-5: Data da conferência obrigatória

**Given** os outros campos estão preenchidos e a data da conferência está vazia

**When** a operação interna grava

**Then** a casa não é ativada

### US-12-AC-6: Exclusão manual de dados pessoais

**Given** uma oferta com nome, e-mail e WhatsApp do viajante ainda legíveis

**When** a operação interna aciona a exclusão manual de FR-31

**Then** esses dados deixam de ser legíveis, o link privado responde como oferta não encontrada, e nenhum job agendado executou a ação

## Notes

- Não há integração automática com o Banco Central neste MVP.

---

# US-13: Ver histórico de aceites

## Story Context

A casa vencedora recupera o contato enquanto os dados pessoais da oferta existirem. No piloto não há apagamento automático; a exclusão, se necessária, é manual pelo administrador (FR-31).

## Happy Path

### US-13-AC-1: Histórico recente

**Given** a casa aceitou uma oferta e o administrador ainda não excluiu os dados pessoais dessa oferta

**When** o operador abre o histórico

**Then** a oferta aparece, da mais recente para a mais antiga, com nome e WhatsApp

## Edge Cases

### US-13-AC-2: Oferta perdida

**Given** a casa tentou aceitar e perdeu

**When** o operador abre o histórico

**Then** essa oferta não aparece

## Error States

### US-13-AC-3: Outra casa

**Given** a oferta foi aceita pela Casa A

**When** a Casa B abre o histórico

**Then** a oferta da Casa A não aparece para a Casa B

## Non-Functional Criteria

### US-13-AC-4: Exclusão manual pelo administrador

**Given** a operação interna excluiu os dados pessoais de uma oferta `ACEITA` da Casa A

**When** o operador da Casa A abre o histórico e o viajante abre o link privado

**Then** a oferta ainda aparece no histórico da Casa A sem nome, e-mail nem WhatsApp legíveis, o link privado responde como oferta não encontrada, e nenhum job agendado executou essa exclusão

## Notes

- O prazo de retenção de dados pessoais aguarda confirmação jurídica. Até lá, os dados permanecem acessíveis conforme FR-26.
