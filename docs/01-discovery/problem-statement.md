---
artifact: problem-statement
version: "1.0"
created: 2026-11-03
status: complete
context: Canal neutro de demanda para casas de câmbio autorizadas em SP e RJ, depois da compra do Melhor Câmbio pela Nomad
---

# Problem Statement: Casas autorizadas ficaram sem canal neutro de demanda

## Problem Summary

Donos e gerentes de casas de câmbio físicas, autorizadas pelo Banco Central, em São Paulo e no Rio de Janeiro, perderam um canal cuja única função era levar o cliente até eles. Desde 18 de junho de 2024, esse canal pertence à Nomad, fintech de conta internacional. A Nomad declarou, na época, que usaria o tráfego para apresentar a própria conta. A casa continua podendo atender o viajante, e o viajante pessoa física continua precisando de papel-moeda para viagem internacional, mas o lugar onde a demanda aparece também vende um produto que compete com a casa.

## User Impact

### Who is affected?

Dono ou gerente comercial de casa de câmbio com loja física em São Paulo ou no Rio de Janeiro, autorizada a operar câmbio pelo Banco Central, que dependia de um comparador público para receber viajantes em busca de papel-moeda e cartão pré-pago.

O lado da demanda é a pessoa física, com viagem internacional, que precisa comprar papel-moeda físico (espécie) ou carregar cartão pré-pago internacional na mesma praça, modalidades onde a loja física atende com segurança e agilidade.

### How are they affected?

A casa deixa de receber, num só lugar, o viajante que já escolheu cidade, moeda e disposição de preço. Para repor essa demanda ela volta ao balcão, ao telefone e ao anúncio próprio, sem saber quem está pronto para fechar hoje.

O viajante encontra um comparador cujo dono tem incentivo para oferecer conta global no lugar da casa. A cotação da casa e o produto do dono do canal passam a disputar a mesma atenção.

A liquidação continua com a casa e o viajante. Contrato cambial, IOF, tarifas e entrega do numerário acontecem fora de qualquer software de aproximação. O que falta é a aproximação neutra.

### Scale of impact

A base da plataforma hoje é zero. Nenhuma casa está ativa, nenhuma oferta foi registrada, nenhum contato foi trocado. O suprimento começa do zero, com abordagem fria sustentada pela tese de neutralidade diante da Nomad.

Referência de mercado, não medição nossa. Em 17 e 18 de junho de 2024, Estadão e Valor reportaram que o Melhor Câmbio tinha cerca de 1 milhão de usuários únicos por mês, cerca de 4 milhões de pageviews por mês e perto de R$ 1 milhão por dia em compra de moeda. O Estadão descreveu a mecânica clássica: o cliente vê as casas da cidade e da moeda, faz uma oferta, e se uma casa aceita, conclui a negociação direto com ela. Não há fonte pública, nesta pesquisa, do quanto disso ainda vale em novembro de 2026, nem de quantas casas de SP e RJ ainda anunciam lá.

## Business Context

### Strategic Alignment

A empresa existe para ser o canal neutro das casas autorizadas pelo Banco Central. O sucesso é a casa receber a demanda de papel-moeda e cartão pré-pago e o viajante pessoa física chegar numa casa autorizada. Conta internacional própria, custódia e contrato cambial ficam fora do negócio.

### Business Impact

Para a casa, o prejuízo é demanda qualificada de viajante que deixa de chegar sem que o dono do canal dispute o cliente. Não temos o GMV perdido por casa, nem a receita que o canal antigo retinha. O R$ 1 milhão por dia citado na imprensa de 2024 é compra de moeda nas casas, não receita de plataforma.

No piloto, o canal é gratuito para a casa e para o viajante. Cobrança fica fora desta fase para não criar atrito antes de provar que a aproximação acontece. A monetização futura prevê assinatura mensal fixa de software para as casas parceiras (sem taxa ou percentual por operação cambial), a ser testada após o piloto.

### Why Now?

A compra foi anunciada em 17 e 18 de junho de 2024, por cerca de R$ 3 milhões, segundo o Estadão. A urgência em novembro de 2026 é o conflito estrutural.

Eduardo Baer, então diretor operacional da Nomad, disse ao Valor em 18 de junho de 2024 que o tráfego serviria para apresentar o que a Nomad oferece em conta internacional. No mesmo período, a Nomad anunciou spread zero promocional no canal. O dono do comparador passou a ser, ao mesmo tempo, um concorrente de produto das casas que o abastecem.

Quem construir o substituto neutro enquanto essas casas ainda procuram para onde mandar o viajante de papel-moeda ocupa o lugar que o canal antigo deixou de ocupar. A medição que falta é conversa com casas de SP e RJ e com viajantes reais.

## Success Criteria

Baselines nossos são zero porque o canal ainda não existe. Os alvos abaixo foram cravados para o piloto de 90 dias em SP e RJ.

Casa ativa, neste piloto: casa credenciada que aceitou ao menos uma oferta no período. Ela é autorizada pelo Banco Central, com loja em São Paulo ou no Rio de Janeiro, e recebe de graça ofertas de papel-moeda e cartão pré-pago de viajante pessoa física.

| Métrica | Baseline atual | Alvo | Prazo |
| --- | --- | --- | --- |
| Casas ativas em SP ou RJ | 0 | 10 a 15 | 90 dias de piloto |
| Ofertas de viajante que terminam em aceite de uma casa e troca de contato | 0 | 30 | os mesmos 90 dias |
| Reais sob custódia da plataforma, Pix recebido ou contrato cambial emitido por nós | 0 | 0 | contínuo |
| Vezes em que a plataforma calcula IOF ou publica preço final no lugar da casa | 0 | 0 | contínuo |

A métrica primária é a segunda linha: oferta que vira aceite e contato. Casa credenciada que não aceitou nenhuma oferta no período não conta como ativa. Aceite sem troca de contato não conta como sucesso.

Os limiares menores que antecedem o código estão na hipótese do piloto. Eles não substituem esta meta de 90 dias.

## Constraints & Considerations

- A plataforma aproxima. Quem liquida é a casa autorizada, com o viajante, fora da plataforma.
- Não há Pix, saldo, entrega de numerário nem cálculo de IOF do nosso lado. O valor final com encargos é informado pela casa.
- Só entra casa autorizada pelo Banco Central. A lista oficial é dependência de cadastro.
- O piloto cobre São Paulo e Rio de Janeiro nas modalidades de papel-moeda físico e cartão pré-pago internacional (USD, EUR, GBP).
- O cliente do piloto é somente pessoa física que precisa de papel-moeda ou cartão pré-pago para viagem internacional.
- O piloto é gratuito para casas e para viajantes.
- Não há produto próprio de conta internacional.
- A arquitetura do piloto, quando houver código, é assíncrona e simples. Pregão e leilão contínuos ficam fora desta fase, assim como KYB automatizado complexo. Um som curto e pontual de nova oferta no painel web, só quando o operador habilita o alerta, faz parte do MVP.
- Stack prevista para o produto: NestJS, PostgreSQL, Redis, React/Next.js.
- Contatos trocados entre viajante e casa são dado pessoal. LGPD vale no desenho do produto.
- Regulamentação de câmbio e identificação do cliente na operação formal permanecem com a instituição autorizada.
- O suprimento inicial é zero. A entrada das casas depende de abordagem fria com a tese de neutralidade.

## Open Questions

- [ ] Quantas casas de SP e RJ ainda publicam cotação no Melhor Câmbio em novembro de 2026?
- [ ] O volume e a audiência de junho de 2024 ainda descrevem esse canal?
- [ ] Qual canal o fundador usará para encontrar viajantes pessoa física antes de existir produto? A escolha precisa estar feita antes do concierge descrito nas hipóteses.
- [ ] Cartão pré-pago entra em alguma fase posterior, e com qual evidência de dor separada da do papel-moeda?
