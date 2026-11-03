---
artifact: problem-statement
version: "1.0"
created: 2026-11-02
status: draft
---

# Problem Statement: Falta de Transparência e Eficiência no Mercado de Câmbio para Pessoas Físicas e Jurídicas

## Problem Summary

Pessoas físicas e jurídicas que precisam comprar ou vender moeda estrangeira no Brasil enfrentam um processo opaco, fragmentado e ineficiente. Não existe uma forma simples de comparar taxas entre casas de câmbio, forçando o cliente a ligar ou visitar múltiplas casas presencialmente — o que consome tempo e elimina poder de barganha. Do outro lado do balcão, casas de câmbio autorizadas perdem oportunidades de negócio por dependerem de fluxo de porta e indicações, enquanto enfrentam crescente concorrência de bancos digitais e fintechs sem ter ferramentas acessíveis de aquisição digital de clientes.

## User Impact

### Who is affected?

Dois segmentos são diretamente impactados:

1. **Cliente de câmbio (pessoa física ou jurídica):** viajantes, expatriados, importadores/exportadores, estudantes com gastos no exterior e qualquer pessoa que precise converter moeda — inicialmente nas regiões metropolitanas do Rio de Janeiro e São Paulo.

2. **Casa de câmbio autorizada pelo Banco Central:** operadores de pequeno e médio porte que possuem autorização regulatória para operar câmbio mas não têm escala digital para competir com grandes bancos e fintechs.

### How are they affected?

**Clientes:**

- **Falta de comparabilidade:** não há ferramenta consolidada que permita comparar taxas de câmbio praticadas por diferentes casas em tempo real. O cliente precisa consultar fontes dispersas (sites individuais, telefone, visita presencial).
- **Processo de negociação custoso:** para conseguir uma taxa competitiva, o cliente precisa ligar ou visitar várias casas de câmbio, repetindo suas necessidades a cada contato — um processo que pode consumir horas.
- **Assimetria de informação:** o cliente não tem visibilidade sobre o spread real aplicado em relação à cotação de referência (PTAX ou interbancário), dificultando a avaliação de uma oferta como justa ou abusiva.
- **Ausência de poder de barganha individual:** sem volume significativo ou capacidade de comparação imediata, o cliente aceita a taxa oferecida sem contrapartida.

**Casas de câmbio:**

- **Captação dependente de localização física:** a maioria dos clientes vem por fluxo de porta ou indicação pessoal, limitando o raio de alcance geográfico e o volume de operações.
- **Concorrência assimétrica:** bancos digitais e fintechs oferecem câmbio com experiência 100% digital, enquanto casas de câmbio tradicionais ainda operam predominantemente offline.
- **Ociosidade operacional:** em horários e dias de baixo movimento, a estrutura operacional (equipe, sistemas, caixa) fica subutilizada, elevando o custo por operação.
- **Alto custo de aquisição de clientes:** investimento em marketing digital (Google Ads, redes sociais) é caro e pouco eficiente sem marca reconhecida ou diferencial digital claro.

### Scale of impact

- O mercado de câmbio manual (turismo + remessas de PF) no Brasil movimenta [HIPÓTESE – A VALIDAR] bilhões de reais por ano.
- Existem [HIPÓTESE – A VALIDAR] casas de câmbio autorizadas pelo Banco Central operando nas regiões de São Paulo e Rio de Janeiro.
- [HIPÓTESE – A VALIDAR] % das operações de câmbio de turismo ainda são realizadas presencialmente ou por telefone, sem comparação prévia de taxas.
- O tempo médio que um cliente gasta para pesquisar e fechar uma operação de câmbio é de [HIPÓTESE – A VALIDAR] horas.

## Business Context

### Strategic Alignment

A plataforma se posiciona como **camada de tecnologia e intermediação** entre clientes e casas de câmbio autorizadas, criando um marketplace de "melhor oferta" (modelo de leilão reverso). Essa estratégia está alinhada com:

- **Tendência de desintermediação digital** em serviços financeiros no Brasil.
- **Regulamentação favorável:** a plataforma não executa operações de câmbio — conecta as partes. A operação cambial permanece com a casa autorizada pelo Banco Central.
- **Modelo de negócio baseado em rede (network effects):** quanto mais casas de câmbio e clientes na plataforma, maior o valor para ambos os lados.

### Business Impact

- **Receita potencial:** modelo de monetização a ser definido (comissão por match, assinatura da casa de câmbio, ou modelo híbrido) — [HIPÓTESE – A VALIDAR].
- **Volume potencial:** se capturar [HIPÓTESE – A VALIDAR] % do mercado de câmbio manual em RJ e SP, o volume transacionado pode atingir [HIPÓTESE – A VALIDAR] por mês.
- **Retenção:** experiência superior de comparação e negociação pode gerar alta recorrência entre viajantes e empresas com operações internacionais regulares.
- **Efeito de rede:** cada nova casa de câmbio atrai mais clientes (mais ofertas = melhor preço) e vice-versa, criando barreira competitiva orgânica.

### Why Now?

- **Parceiro comercial com acesso a casas de câmbio:** o founder possui parceiro com relacionamento direto com casas de câmbio, permitindo bootstrap do lado da oferta (cold-start problem) sem investimento massivo em vendas.
- **Digitalização acelerada pós-pandemia:** clientes e casas de câmbio estão mais dispostos a adotar canais digitais para serviços financeiros.
- **Consolidação do mercado:** fintechs e bancos digitais estão capturando marketshare de câmbio; casas tradicionais precisam urgentemente de ferramentas digitais para competir — a plataforma oferece esse caminho sem exigir que elas desenvolvam tecnologia própria.
- **Janela competitiva:** não há marketplace dominante de câmbio por leilão reverso no Brasil. Plataformas existentes de comparação são passivas (listagem de taxas) e não oferecem negociação ativa (oferta → match → contraproposta).

## Success Criteria

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| Número de casas de câmbio ativas na plataforma (RJ + SP) | 0 | [HIPÓTESE – A VALIDAR] | 6 meses pós-lançamento |
| Número de ofertas criadas por clientes / mês | 0 | [HIPÓTESE – A VALIDAR] | 6 meses pós-lançamento |
| Taxa de match (oferta → negociação aceita) | N/A [HIPÓTESE – A VALIDAR] | [HIPÓTESE – A VALIDAR] % | 6 meses pós-lançamento |
| Tempo médio para o cliente receber a primeira resposta | N/A | [HIPÓTESE – A VALIDAR] minutos | 6 meses pós-lançamento |
| NPS do cliente após operação concluída | N/A | ≥ 50 [HIPÓTESE – A VALIDAR] | 6 meses pós-lançamento |
| Spread médio obtido pelo cliente vs. cotação de referência | [HIPÓTESE – A VALIDAR] % (mercado off-line) | Redução de [HIPÓTESE – A VALIDAR] % vs. mercado | 6 meses pós-lançamento |
| Custo de aquisição de cliente (CAC) para casas de câmbio | [HIPÓTESE – A VALIDAR] | [HIPÓTESE – A VALIDAR] | 12 meses pós-lançamento |

## Constraints & Considerations

- **Regulação do Banco Central (RISCO CRÍTICO):** câmbio é atividade regulada. A plataforma **não executa operações de câmbio** e **não custodia dinheiro**. Toda operação cambial deve ser realizada por casa de câmbio devidamente autorizada pelo Banco Central do Brasil. O enquadramento jurídico da plataforma como intermediadora tecnológica precisa ser validado com assessoria jurídica especializada antes do lançamento.
- **Compliance e KYC:** casas de câmbio são obrigadas a cumprir normas de prevenção à lavagem de dinheiro (PLD/FT). A plataforma precisa definir até onde vai sua responsabilidade em coleta e verificação de dados do cliente vs. o que fica com a casa de câmbio.
- **Modelo de monetização indefinido:** o modelo de receita (comissão, assinatura, freemium) ainda não foi decidido. Isso impacta o posicionamento de preço e a proposta de valor para as casas.
- **Cold-start problem (marketplace):** é necessário ter casas de câmbio e clientes simultaneamente para gerar valor. A estratégia de bootstrap via parceiro comercial mitiga parcialmente esse risco no lado da oferta.
- **Escopo geográfico inicial:** Rio de Janeiro e São Paulo. Expansão para outras regiões depende de validação do modelo e capacidade operacional.
- **Moedas suportadas:** todas as moedas disponíveis para câmbio manual, mas o volume se concentrará inicialmente em USD, EUR, GBP e ARS [HIPÓTESE – A VALIDAR].
- **Produtos de câmbio:** papel-moeda e cartão pré-pago (VTM). Outros produtos (remessa, câmbio comercial) podem ser adicionados futuramente.
- **Modalidades de entrega:** retirada na loja e entrega (delivery). Logística de delivery de papel-moeda envolve questões de segurança e seguro que precisam ser endereçadas.
- **Dependência de dados em tempo real:** cotações de referência e taxas praticadas mudam ao longo do dia. A plataforma precisa de mecanismo de expiração de ofertas e atualização de cotações.

## Open Questions

- [ ] Qual o enquadramento jurídico correto da plataforma perante o Banco Central? É necessário algum tipo de registro ou autorização específica para operar como intermediador tecnológico de câmbio?
- [ ] Qual a responsabilidade da plataforma em relação a KYC/PLD (Know Your Customer / Prevenção à Lavagem de Dinheiro)? A coleta de dados do cliente é feita pela plataforma ou delegada integralmente à casa de câmbio?
- [ ] Qual modelo de monetização é mais adequado para o momento (comissão por match, assinatura mensal para casas, freemium com funcionalidades premium)?
- [ ] Qual o volume mínimo de casas de câmbio necessário por região para que o marketplace gere valor perceptível ao cliente (liquidez mínima)?
- [ ] Como lidar com a validade temporal das ofertas, dado que a cotação do câmbio oscila ao longo do dia?
- [ ] A plataforma deve intermediar o pagamento (escrow) ou apenas conectar as partes e a transação financeira ocorre diretamente entre cliente e casa?
- [ ] Quais são os requisitos de segurança e seguro para a modalidade de entrega (delivery) de papel-moeda?
- [ ] Existe risco regulatório de a plataforma ser interpretada como "correspondente cambial" ou outra figura regulada?
- [ ] Como validar a qualidade e confiabilidade das casas de câmbio listadas (rating, reclamações, status da autorização no BC)?
- [ ] Qual a estratégia de lançamento: iniciar com foco em uma cidade (ex.: SP) ou lançar simultaneamente em RJ e SP?
