---
artifact: hypothesis
version: "1.0"
created: 2026-11-03
status: draft
context: Quatro hipóteses de pré-código do piloto neutro de papel-moeda em SP e RJ. Predecessor em docs/01-discovery/problem-statement.md.
---

# Hipóteses críticas antes de codar

Estas quatro hipóteses são o portão de código. A meta cravada no problem statement continua sendo 10 a 15 casas ativas e 30 trocas de contato em 90 dias de produto. Os limiares abaixo são menores de propósito: servem para falsificar a tese com concierge manual, antes de existir NestJS, PostgreSQL, Redis ou Next.js.

Ordem obrigatória:

1. H1, compromisso das casas.
2. H2, oferta completa do viajante. Só começa com H1 validada.
3. H3, primeiro aceite e troca de contato. Usa as ofertas qualificadas da H2.
4. H4, compra de papel-moeda fora da plataforma. Observa as trocas da H3.

Código do produto começa somente se H1 e H3 estiverem validadas e H4 não estiver invalidada. H2 invalidada impede H3. H4 invalidada encerra a tese, porque a casa estaria pedindo intermediação financeira. H4 inconclusiva autoriza o software de aproximação e mantém pagamento, custódia e cálculo de IOF fora do desenho.

Uma quinta hipótese, reincidência semanal da mesma casa, fica como métrica secundária da H3. Vinte e um dias de concierge não separam cortesia de hábito com segurança bastante para segurar o código.

O que este ciclo não testa: cartão pré-pago, cobrança, praças além de SP e RJ, pregão em tempo real, KYB automatizado.

---

# Hypothesis: H1 — Compromisso da casa pela tese de neutralidade

## Hypothesis Statement

**We believe that** uma abordagem fria, gratuita, explicando que o canal não tem conta internacional nem custódia e existe para devolver demanda de papel-moeda à casa

**for** donos ou gerentes de casas de câmbio autorizadas pelo Banco Central, com loja física em São Paulo ou no Rio de Janeiro

**will** gerar um compromisso escrito de receber ofertas de viajante pessoa física

**as measured by** número de casas, na amostra contatada, que devolvem o compromisso completo definido abaixo

## Background & Rationale

### Problem Context

O problem statement fecha a dor da casa que perdeu o canal neutro depois da compra do Melhor Câmbio pela Nomad em junho de 2024. O suprimento nosso é zero. A crença ainda não testada é que a tese de neutralidade, sozinha e de graça, basta para uma casa autorizada aceitar receber demanda.

### Supporting Evidence

- Estadão, 17 de junho de 2024: o Melhor Câmbio aproximava o cliente da casa, e a casa concluía a negociação direto com ele. A Nomad comprou esse canal por cerca de R$ 3 milhões.
- Valor, 18 de junho de 2024: Eduardo Baer, então diretor operacional da Nomad, descreveu o tráfego como canal para apresentar a conta internacional da Nomad.
- Valor Investe, 18 de junho de 2024: a Nomad anunciou spread zero promocional no mesmo período.
- Não há entrevista nossa com casas. A evidência sustenta o conflito. Ela não sustenta que a casa responderá a uma abordagem fria em novembro de 2026.

### Alternative Hypotheses Considered

- A casa segue satisfeita no Melhor Câmbio e ignora um canal novo sem audiência.
- A casa só volta a um canal se ele entregar pagamento, custódia ou contrato pronto.
- A casa quer demanda de cartão pré-pago, e papel-moeda é residual no balcão.
- A casa aceita a conversa e recusa compromisso escrito enquanto o canal não tiver viajantes.

A terceira alternativa é métrica secundária desta hipótese. As duas primeiras, se dominarem as recusas, invalidam H1.

## Target User Segment

### Definition

Casa que, na lista oficial do Banco Central, está autorizada a operar câmbio e tem loja física em São Paulo ou no Rio de Janeiro. Quem responde é o dono ou o gerente comercial com poder de aceitar receber ofertas. Papel-moeda faz parte da operação que a casa declara na resposta.

### Segment Size

A contagem de casas autorizadas com loja em SP e RJ ainda não foi extraída da lista do Banco Central. O teste não espera essa população inteira. A amostra operacional, registrada antes do primeiro contato, é de 40 casas alcançáveis: 20 em São Paulo e 20 no Rio de Janeiro. Se uma praça tiver menos de 20 casas alcançáveis, o déficit fica registrado. A vaga não é preenchida com a outra praça depois de ver as respostas.

### Current Behavior

Nenhuma casa recebe oferta nossa. O comportamento atual conhecido é o do canal incumbente em 2024: a casa publicava cotação, recebia a oferta do cliente e fechava com ele fora da plataforma. Quantas ainda fazem isso em novembro de 2026 é pergunta aberta do problem statement.

## Success Metrics

### Primary Metric

Compromisso completo significa, por escrito: nome de quem responde, cidade da loja, moedas que opera em papel, canal monitorado (e-mail ou WhatsApp), horário em que esse canal é lido, e aceite explícito de receber de graça ofertas de viajante pessoa física durante o piloto. A autorização no Banco Central é conferida por nós na lista oficial.

| Metric | Current Baseline | Target | Minimum Detectable Effect |
| --- | --- | --- | --- |
| Casas com compromisso completo na amostra de 40 | 0 | 10 ou mais (≥25% da amostra) | Falha abaixo de 5 (<12,5%). A faixa 5 a 9 é inconclusiva, não um meio-termo de sucesso |

### Secondary Metrics

| Metric | Current Baseline | Expected Direction |
| --- | --- | --- |
| Casas contatadas que respondem, mesmo sem compromisso | 0 | Subir o bastante para separar silêncio de recusa |
| Entre as respostas, casas que apontam papel-moeda como a demanda que querem de volta | 0 | Maioria das respostas |
| Casas que condicionam o sim a pagamento, custódia ou produto nosso | 0 | Permanecer em zero entre os compromissos aceitos |

### Guardrail Metrics

| Metric | Current Value | Acceptable Range |
| --- | --- | --- |
| Cobrança pedida à casa ou ao viajante para participar | 0 | 0 |
| Promessa nossa de conta internacional, Pix ou custódia | 0 | 0 |
| Casas admitidas sem conferência na lista do Banco Central | 0 | 0 |

## Validation Approach

### Method

Entrevista estruturada de abordagem fria, feita pelo fundador, com o mesmo roteiro nas 40 casas. O roteiro explica a neutralidade, a gratuidade e o foco em papel-moeda para viajante pessoa física. Pede o compromisso completo. Registra aceite, recusa e motivo em planilha única antes de iniciar H2.

Não há teste A/B. Não há produto. O grupo de comparação é a própria regra pré-registrada de passa e falha.

### Sample Size & Duration

- Amostra: 40 casas, 20 em SP e 20 no RJ, listadas antes do primeiro contato
- Duração: 15 dias úteis a partir de 4 de novembro de 2026, encerrando em 24 de novembro de 2026
- Alocação: censo da amostra, um roteiro só
- Análise e decisão: 25 de novembro de 2026

### Pass/Fail Criteria

- **Validated if:** 10 ou mais casas devolvem o compromisso completo até 24 de novembro de 2026, todas conferidas na lista do Banco Central, e nenhuma delas condiciona o sim a custódia ou cobrança.
- **Invalidated if:** menos de 5 compromissos completos ao fim da janela, ou 2 ou mais casas só aceitam se a plataforma receber dinheiro ou emitir o contrato.
- **Inconclusive if:** 5 a 9 compromissos completos. A extensão permitida é de mais 10 dias úteis, na mesma amostra, sem abrir código. Nova decisão no dia seguinte ao fim da extensão.

## Risks & Assumptions

### Key Assumptions

- O fundador alcança 40 casas reais em 15 dias úteis.
- Quem responde tem poder para comprometer a loja.
- A lista do Banco Central permite conferir a autorização antes de contar o compromisso.
- Gratuidade reduz atrito. Ela não será usada para mascarar uma casa que só entra se houver pagamento nosso.

### Risks

- Amostra fácil demais: as 40 primeiras casas conhecidas do fundador podem ser mais receptivas que o mercado.
- Compromisso de cortesia, sem intenção de ler o alerta quando a oferta chegar. H3 existe para pegar esse caso.
- Casas pedem exclusividade ou audiência garantida que o concierge ainda não tem.
- Confundir "achou a tese boa" com compromisso completo. Só o escrito com os seis campos conta.

## Timeline

| Phase | Dates | Duration |
| --- | --- | --- |
| Setup & instrumentation | 3 de novembro de 2026 | Extrair a amostra de 40 e congelar o roteiro |
| Test running | 4 a 24 de novembro de 2026 | 15 dias úteis |
| Analysis | 25 de novembro de 2026 | 1 dia |
| Decision | 25 de novembro de 2026 | Seguir para H2, estender, ou parar |

---

# Hypothesis: H2 — O viajante entrega uma oferta completa de papel-moeda

## Hypothesis Statement

**We believe that** um canal manual e gratuito, operado pelo fundador, que pede cidade, moeda, quantia, taxa desejada ou pedido da melhor taxa, data da viagem e WhatsApp

**for** pessoas físicas com viagem internacional que precisam de papel-moeda em São Paulo ou no Rio de Janeiro

**will** produzir ofertas completas e qualificáveis

**as measured by** número de ofertas completas recebidas em 21 dias, com esforço de distribuição também pré-registrado

## Background & Rationale

### Problem Context

O problem statement fixa o cliente em pessoa física que precisa de papel-moeda para viagem internacional. A meta de 90 dias pede 30 trocas de contato. Antes do código, a crença a testar é que esse viajante informa a oferta a um canal desconhecido, sem conta global e sem pagamento dentro do canal.

### Supporting Evidence

- A página pública do Melhor Câmbio descreve a oferta do cliente: valor desejado, anúncio às casas parceiras, aviso por e-mail se alguma aceitar.
- A imprensa de junho de 2024 reportou audiência grande nesse comparador. Essa audiência era do domínio antigo, não de um canal novo sem marca.
- Não temos teste de demanda próprio. H2 mede demanda no nosso canal, com o esforço de distribuição declarado.

### Alternative Hypotheses Considered

- O viajante só pede cotação em marca que já conhece e abandona um formulário sem casas visíveis.
- O viajante quer conta ou cartão, e a oferta de papel-moeda não se completa.
- O viajante completa a oferta apenas quando já está na porta da casa, tarde demais para um encaminhamento.
- O resultado baixo vem de distribuição insuficiente, não de falta de demanda. Por isso o esforço mínimo entra no critério de inconclusão.

## Target User Segment

### Definition

Pessoa física que declara viagem internacional, necessidade de papel-moeda, cidade São Paulo ou Rio de Janeiro, moeda, quantia, taxa desejada ou pedido explícito da melhor taxa, bairro de preferência, data da viagem, e-mail e WhatsApp. O bairro é preferência: a retirada, ou qualquer entrega, será combinada direto com a casa depois do aceite. Pedidos de cartão pré-pago, de pessoa jurídica ou de outra cidade ficam de fora da contagem.

### Segment Size

Desconhecido para o canal novo. A referência de 1 milhão de usuários únicos por mês é do Melhor Câmbio em junho de 2024, não uma previsão de chegada neste concierge.

### Current Behavior

O viajante compara preço em canal já existente e fala com a casa por telefone ou balcão. No concierge, o comportamento de partida é zero ofertas nossas.

## Success Metrics

### Primary Metric

Oferta completa: os campos da definição preenchidos, papel-moeda, SP ou RJ, pessoa física, viagem internacional.

| Metric | Current Baseline | Target | Minimum Detectable Effect |
| --- | --- | --- | --- |
| Ofertas completas em 21 dias | 0 | 15 ou mais | Falha abaixo de 8, desde que o esforço mínimo tenha sido cumprido |

### Secondary Metrics

| Metric | Current Baseline | Expected Direction |
| --- | --- | --- |
| Ofertas incompletas recebidas | 0 | Visíveis, para ver onde o pedido quebra |
| Ofertas cuja taxa vem em branco e pedem "a melhor taxa" | 0 | Aceitas como completas; a parcela informa o desenho futuro do campo |
| Pedidos de cartão pré-pago ou de outra praça | 0 | Registrados fora da métrica primária |

### Guardrail Metrics

| Metric | Current Value | Acceptable Range |
| --- | --- | --- |
| Dado de pagamento coletado do viajante | 0 | 0 |
| Oferta encaminhada a casa sem compromisso da H1 | 0 | 0 |
| Promessa de preço final ou de IOF calculado por nós | 0 | 0 |

## Validation Approach

### Method

Concierge. Um formulário de ferramenta já pronta, ou WhatsApp do fundador, com os mesmos campos da oferta do produto: cidade, moeda, quantia, taxa desejada ou pedido da melhor taxa, bairro de preferência, nome, e-mail, WhatsApp e data da viagem. O formulário explica que retirada ou entrega é combinada direto com a casa. O fundador distribui o pedido durante 21 dias no canal que escolher antes do dia 26 de novembro de 2026 e registra cada ação de distribuição numa lista: data, canal, formato e alcance aproximado que conseguir observar.

O canal específico continua em aberto no problem statement. A hipótese exige que ele esteja escolhido e anotado antes da primeira publicação. Trocar de canal no meio do teste só vale com registro da data da troca; os números não são reiniciados em silêncio.

### Sample Size & Duration

- Esforço mínimo pré-registrado: 30 ações de distribuição registradas (publicação ou conversa direta)
- Duração: 21 dias, de 26 de novembro a 16 de dezembro de 2026, somente se H1 estiver validada em 25 de novembro
- Alocação: um único fluxo, sem variante
- Cada oferta é revisada no dia útil seguinte contra a definição de completa

### Pass/Fail Criteria

- **Validated if:** 15 ou mais ofertas completas até 16 de dezembro de 2026.
- **Invalidated if:** menos de 8 ofertas completas e, ao mesmo tempo, 30 ou mais ações de distribuição registradas.
- **Inconclusive if:** menos de 30 ações de distribuição, qualquer que seja o número de ofertas. Também inconclusiva se as ofertas ficarem entre 8 e 14 com o esforço cumprido. Nesse caso, estender 14 dias no mesmo canal, sem código, e decidir no dia seguinte.

## Risks & Assumptions

### Key Assumptions

- H1 validada entregou casas para as quais a oferta pode ser encaminhada. H2 pode coletar oferta antes, e o encaminhamento espera H1.
- O viajante entende que quem vende a moeda é a casa.
- O fundador sustenta 30 ações em 21 dias no canal escolhido.

### Risks

- O canal escolhido alcança curioso, não viajante com data de viagem.
- Conhecidos do fundador inflam a conta. Oferta de conhecido entra na planilha com essa marca. Se mais da metade das ofertas completas for de conhecidos, o resultado é inconclusivo.
- Formulário longo reduz a conclusão e produz falso negativo. Os campos listados são o máximo do concierge.

## Timeline

| Phase | Dates | Duration |
| --- | --- | --- |
| Setup & instrumentation | 25 de novembro de 2026 | Escolher e anotar o canal; abrir o formulário |
| Test running | 26 de novembro a 16 de dezembro de 2026 | 21 dias |
| Analysis | 17 de dezembro de 2026 | 1 dia |
| Decision | 17 de dezembro de 2026 | Encaminhar as qualificadas para H3, estender, ou parar |

---

# Hypothesis: H3 — A primeira casa que aceita fecha a troca de contato

## Hypothesis Statement

**We believe that** encaminhar ao mesmo tempo, pelo canal que a casa escolheu, a oferta completa de papel-moeda para as casas comprometidas daquela cidade, com a regra de que a primeira aceitação fecha

**for** as casas com compromisso completo na H1 e os viajantes com oferta completa na H2

**will** fazer uma casa aceitar a condição, ou enviar proposta que o viajante aceita, e os dois lados receberem o contato um do outro

**as measured by** trocas de contato realizadas dentro de 4 horas úteis depois do encaminhamento

## Background & Rationale

### Problem Context

A mecânica clássica publicada pelo Melhor Câmbio é: a oferta é anunciada às casas parceiras; se uma aceita, o cliente é avisado; a casa fala com o cliente por telefone ou e-mail; a compra acontece entre eles. O prazo desta hipótese é o do PRD: 4 horas úteis, de segunda a sexta, das 9h inclusive às 18h exclusive, em America/Sao_Paulo. A oferta deixa de ser encaminhável depois desse prazo. O tempo até o aceite é registrado como observação e não reprova H3. A finalização da compra em si é a H4.

### Supporting Evidence

- FAQ público do Melhor Câmbio: oferta anunciada às casas, aviso ao cliente se houver aceite, contato da casa com o cliente por celular ou e-mail.
- Estadão, 17 de junho de 2024: aceita a oferta, a negociação se conclui direto com a casa.
- Não há evidência de que uma casa sem audiência prévia responda no mesmo ritmo a um encaminhamento manual de um canal novo. H3 testa exatamente isso.

### Alternative Hypotheses Considered

- A casa só responde se vir várias casas concorrendo numa tela, e um aviso simples por e-mail ou WhatsApp fica sem leitura.
- A casa responde com pergunta, e a regra da primeira aceitação gera conflito em vez de reserva.
- O viajante desiste quando descobre que o contato demora mais do que a janela em que ele ainda quer a moeda.
- A primeira casa aceita por cortesia uma única vez. A reincidência fica na métrica secundária, sem poder de segurar o código.

## Target User Segment

### Definition

Par oferta-cidade. De um lado, viajante com oferta completa da H2. Do outro, todas as casas da H1 com compromisso completo naquela cidade e moeda em papel compatível. Casa de outra praça não recebe a oferta.

### Segment Size

Depende de H1 e H2. O teste precisa de pelo menos 15 ofertas qualificadas encaminhadas para um veredito. Abaixo disso, H3 fica inconclusiva mesmo que H2 tenha passado no limite.

### Current Behavior

Zero encaminhamentos, zero aceites, zero contatos trocados. O horário de leitura é o que a casa escreveu no compromisso da H1.

## Success Metrics

### Primary Metric

Troca de contato: a casa aceita a condição do viajante, ou envia proposta que o viajante aceita por escrito, e o fundador entrega telefone ou WhatsApp e a identificação da loja aos dois lados. A primeira aceitação válida fecha. Aceite posterior fica registrado e não vira segunda reserva.

| Metric | Current Baseline | Target | Minimum Detectable Effect |
| --- | --- | --- | --- |
| Trocas de contato em ofertas qualificadas encaminhadas | 0 de 0 | 8 ou mais trocas, em pelo menos 15 ofertas encaminhadas | Falha se, com 15 ou mais ofertas encaminhadas, as trocas forem menos de 5 |

### Secondary Metrics

| Metric | Current Baseline | Expected Direction |
| --- | --- | --- |
| Tempo até o aceite, contado em horas úteis depois do encaminhamento | Sem dado | Registrar. A oferta expira em 4 horas úteis. Essa medida não entra no passa ou falha |
| Casas distintas que aceitam pelo menos uma oferta | 0 | Mais de uma casa por praça, se a praça tiver mais de uma comprometida |
| Casas com um aceite que recebem segunda oferta e aceitam de novo | 0 | Direção esperada de alta; inconclusivo se poucas casas receberem segunda oferta |

### Guardrail Metrics

| Metric | Current Value | Acceptable Range |
| --- | --- | --- |
| Reservas duplas para a mesma oferta | 0 | 0 |
| Contato revelado antes de um aceite válido | 0 | 0 |
| Oferta enviada a casa de outra cidade | 0 | 0 |

## Validation Approach

### Method

Concierge manual, no lugar do produto. Para cada oferta qualificada, o fundador envia a mesma mensagem, no mesmo minuto, a todas as casas comprometidas da cidade, pelo canal escolhido na H1. A mensagem traz cidade, moeda, quantia, bairro de preferência, taxa desejada ou pedido da melhor taxa, o horário em que completam 4 horas úteis, e a regra de primeiro aceite. Registra hora de envio, hora de cada resposta e hora da troca de contato.

Proposta da casa diferente da taxa pedida só fecha se o viajante aceitar por escrito. Silêncio não conta como aceite. Aceite depois das 4 horas úteis não fecha a reserva.

### Sample Size & Duration

- Mínimo para veredito: 15 ofertas qualificadas encaminhadas
- Janela: a mesma da H2, 26 de novembro a 16 de dezembro de 2026, mais 2 dias úteis de observação para respostas já encaminhadas, até 18 de dezembro de 2026
- Sem variante e sem produto
- Se H2 terminar inconclusiva, H3 não produz veredito de falha

### Pass/Fail Criteria

- **Validated if:** 8 ou mais trocas de contato até 18 de dezembro de 2026, com pelo menos 15 ofertas encaminhadas, zero reservas duplas e zero contatos revelados antes do aceite. Cada troca conta só se o aceite ocorreu antes de completarem 4 horas úteis.
- **Invalidated if:** 15 ou mais ofertas foram encaminhadas e houve menos de 5 trocas de contato dentro de 4 horas úteis.
- **Inconclusive if:** menos de 15 ofertas encaminhadas. Estender junto com a extensão da H2, se ela ocorrer. Também inconclusiva se as trocas ficarem entre 5 e 7 com 15 ofertas: mais 15 ofertas encaminhadas, ou 14 dias, o que vier primeiro, sem código.

## Risks & Assumptions

### Key Assumptions

- O horário declarado na H1 é o horário real de leitura.
- Envio simultâneo manual é justo o bastante para representar o alerta futuro.
- O viajante permanece disponível no WhatsApp durante a janela.

### Risks

- O fundador atrasa o encaminhamento e a demora é nossa, não da casa. Oferta encaminhada com mais de 30 minutos depois de qualificada entra na planilha com essa marca e sai da observação de tempo até o aceite. Ela continua contando para o número de trocas.
- Casas da amostra H1 são conhecidas e respondem mais rápido que uma casa fria futura.
- Uma única casa muito rápida concentra os aceites. A métrica secundária de casas distintas torna isso visível. Concentração não invalda H3 sozinha.

## Timeline

| Phase | Dates | Duration |
| --- | --- | --- |
| Setup & instrumentation | 25 de novembro de 2026 | Modelo único de mensagem e planilha de horários |
| Test running | 26 de novembro a 18 de dezembro de 2026 | 21 dias mais 2 dias úteis |
| Analysis | 19 de dezembro de 2026 | 1 dia |
| Decision | 19 de dezembro de 2026 | Seguir para o julgamento da H4 no mesmo dia |

---

# Hypothesis: H4 — A compra de papel-moeda acontece fora da plataforma

## Hypothesis Statement

**We believe that** depois da troca de contato, a casa informa o valor final com encargos e o viajante combina a retirada do papel-moeda direto com ela

**for** os pares viajante-casa que tiveram contato trocado na H3

**will** resultar em compra agendada ou concluída entre eles, com nenhum pagamento passando pela plataforma

**as measured by** confirmação dos dois lados, em até 7 dias, de que a compra foi agendada ou feita com a casa, e de que nenhum valor foi pago a nós

## Background & Rationale

### Problem Context

O problem statement proíbe custódia, Pix, cálculo de IOF e contrato cambial nosso. A tese só sobrevive se a aproximação bastar. H4 testa se, na prática, casa e viajante fecham fora, com a casa dizendo o valor final.

### Supporting Evidence

- Estadão e o FAQ do Melhor Câmbio descrevem o fechamento direto com a casa.
- A cartilha do Banco Central trata IOF, tarifas e VET como informação da instituição autorizada na operação de câmbio.
- Não sabemos se, num canal novo e gratuito, a casa exige que o intermediário receba o dinheiro, nem se o viajante abandona ao saber que precisa ir até a loja.

### Alternative Hypotheses Considered

- O viajante só entrega o dinheiro se a plataforma custodiar ou gerar um Pix.
- A casa aceita o contato e perde o viajante porque o preço final com encargos só aparece tarde demais.
- Os dois combinam e não avisam o fundador. Silêncio, nesse caso, é inconclusão, não falha automática.

## Target User Segment

### Definition

Pares produzidos pela H3: viajante pessoa física com oferta completa de papel-moeda em SP ou RJ, e a casa cujo aceite fechou a reserva. Pares sem troca de contato não entram.

### Segment Size

O veredito pede pelo menos 8 trocas de contato, o alvo da H3. Com menos de 8 pares, H4 fica inconclusiva.

### Current Behavior

Não há par nosso em acompanhamento. O comportamento esperado do mercado clássico é a casa falar com o cliente e concluir a operação no balcão, com o valor final informado por ela.

## Success Metrics

### Primary Metric

Confirmação dupla em até 7 dias corridos da troca de contato: viajante e casa dizem, cada um, se a compra de papel-moeda foi agendada ou concluída entre eles, e se algum valor foi pago à plataforma.

| Metric | Current Baseline | Target | Minimum Detectable Effect |
| --- | --- | --- | --- |
| Pares com confirmação dupla de compra agendada ou concluída, e zero pagamento à plataforma | 0 | 50% ou mais dos pares da H3, com no mínimo 8 pares | Falha abaixo de 25% quando houver 8 ou mais pares |

### Secondary Metrics

| Metric | Current Baseline | Expected Direction |
| --- | --- | --- |
| Casas que informam valor final com encargos sem pedir que nós calculemos IOF | 0 | Todas as casas que responderem |
| Viajantes que desistem ao saber que a retirada é na casa | 0 | Minoria dos pares |
| Pares em que só um lado responde | 0 | Registrados à parte, sem entrar no numerador |

### Guardrail Metrics

| Metric | Current Value | Acceptable Range |
| --- | --- | --- |
| Reais recebidos pela plataforma | 0 | 0 |
| Casas que só seguem se nós recebermos o Pix ou emitirmos o contrato | 0 | 0. Duas casas nessa condição invalidam H4 |
| Cálculo nosso de IOF entregue ao viajante | 0 | 0 |

## Validation Approach

### Method

Acompanhamento do concierge. Sete dias depois de cada troca, o fundador faz uma pergunta curta aos dois lados: a compra foi agendada ou feita entre vocês, e algum valor foi pago à plataforma? Não pede valor da operação, documento nem comprovante. Registra sim, não, ou sem resposta.

Não há produto, não há pagamento de teste, não há variante.

### Sample Size & Duration

- Unidade: par com contato trocado na H3
- Mínimo para veredito: 8 pares
- Janela de confirmação: 7 dias corridos após cada troca, o que leva a última leitura a até 26 de dezembro de 2026 se a última troca for em 18 de dezembro
- Decisão agregada: 28 de dezembro de 2026, deixando margem para as respostas

### Pass/Fail Criteria

- **Validated if:** com 8 ou mais pares, 50% ou mais têm confirmação dupla de compra agendada ou concluída, nenhum pagamento à plataforma em qualquer par, e nenhuma casa condicionou o seguimento a Pix ou contrato nosso.
- **Invalidated if:** duas ou mais casas só continuam se a plataforma receber o dinheiro ou emitir o contrato, ou se, com 8 ou mais pares, menos de 25% confirmam a compra em duplicidade.
- **Inconclusive if:** menos de 8 pares, ou se a soma de "sem resposta" nos dois lados passar de 40% dos pares. Inconclusão de H4, com H1 e H3 validadas, autoriza código apenas do fluxo de aproximação. Pagamento continua fora.

## Risks & Assumptions

### Key Assumptions

- Os dois lados respondem uma pergunta de uma linha sete dias depois.
- "Agendada" é desfecho suficiente nesta fase. Exigir comprovante da operação cambial vazaria dado que não precisamos guardar.
- A casa entende que o preço final com encargos é dela.

### Risks

- Desejo de agradar o fundador produz "sim" sem compra. A confirmação dupla reduz, e não elimina, esse viés.
- Compra real sem resposta cai no inconclusivo e pode atrasar o código. Esse atraso é preferível a tratar silêncio como sucesso.
- Um viajante pede para pagar a nós por conveniência. Recusar é o procedimento do teste. Se isso se repetir a ponto de impedir a compra, o fato entra na narrativa da decisão de 28 de dezembro.

## Timeline

| Phase | Dates | Duration |
| --- | --- | --- |
| Setup & instrumentation | 25 de novembro de 2026 | Texto único da pergunta de 7 dias |
| Test running | Da primeira troca até 7 dias após a última | Sobreposto à H3, leitura final até 26 de dezembro de 2026 |
| Analysis | 28 de dezembro de 2026 | 1 dia |
| Decision | 28 de dezembro de 2026 | Autorizar código de aproximação, ou encerrar a tese |

---

# Portão de código

| Resultado | Decisão |
| --- | --- |
| H1 validada, H3 validada, H4 validada | Codar somente o fluxo de aproximação do piloto: vitrine enxuta, oferta, alerta, primeiro aceite, troca de contato. Sem pagamento. |
| H1 validada, H3 validada, H4 inconclusiva | Mesma autorização de código. Nova leitura de H4 no piloto de 90 dias, ainda sem pagamento. |
| H1 inconclusiva, ou H2 inconclusiva, ou H3 inconclusiva | Sem código. Cumprir a extensão já escrita na hipótese. |
| H1 invalidada, ou H2 invalidada, ou H3 invalidada, ou H4 invalidada | Sem código. Reabrir o problem statement antes de desenhar outra solução. |
