---
artifact: adr
version: "1.0"
created: 2026-11-02
status: proposed
---

# ADR-0010: Posicionamento como Camada de Tecnologia e Intermediação sem Custódia de Fundos

## Status

Proposed (Dependente de Parecer Jurídico Especializado)

**Date:** 2026-11-02
**Deciders:** Equipe fundadora e assessoria jurídica regulatória (a contratar)

## Context

A legislação financeira brasileira, sob supervisão rigorosa do Banco Central do Brasil (BACEN) e do Conselho Monetário Nacional (CMN), impõe barreiras regulatórias severas para qualquer entidade que realize a intermediação de câmbio com custódia de valores ou liquidação financeira de moeda estrangeira:
- Exigência de licença como Instituição Financeira, Corretora de Câmbio, DTVM ou contratação formal como Correspondente Cambial credenciado (Resolução BCB nº 277/2022);
- Exigências estritas de capital social mínimo, governança corporativa, compliance de PLD/FTP (Prevenção à Lavagem de Dinheiro e Financiamento do Terrorismo);
- Obrigações tributárias e operacionais acessórias de reporte direto via Sisbacen para cada contrato de câmbio emitido.

Se a plataforma tentasse receber pagamentos em Reais dos clientes (via Pix/TED), reter valores em conta gráfica (escrow) e transferir para as casas de câmbio (ou vice-versa), ela estaria praticando **intermediação financeira não autorizada**, o que constitui crime contra o sistema financeiro nacional (Lei nº 7.492/1986).

## Decision

Propõe-se que a plataforma atue **estritamente como camada de tecnologia e facilitação de negócios (Software as a Service / Marketplace Ponto de Encontro)**, com as seguintes premissas invioláveis de desenho:

1. **Ausência Absoluta de Custódia Financeira:** A plataforma **nunca** custodia, recebe, retém, movimenta ou liquida moeda nacional (BRL) nem moeda estrangeira (USD, EUR, etc.). Nenhuma conta de escrow ou liquidação financeira passará pelos balanços da empresa proprietária do software.
2. **Titularidade da Operação Cambial:** O contrato de câmbio, a identificação formal do cliente (KYC cambial), a emissão do boleto/contrato no Banco Central e a entrega física ou eletrônica da moeda são de **responsabilidade jurídica e operacional exclusiva da Casa de Câmbio autorizada**.
3. **Ponto de Encontro Tecnológico:** O software limita-se a conectar a intenção de negociação (oferta) à disponibilidade das casas (aceite/contraproposta). Ao haver o match, o sistema apenas fornece às partes as informações necessárias para que celebrem a operação diretamente entre si (balcão da loja ou delivery próprio da casa).
4. **Isolamento de Responsabilidade e Avisos Contratuais:** Os Termos de Uso e todas as telas da aplicação conterão avisos explícitos e destacados reiterando a ausência de intermediação bancária pela plataforma e orientando o cliente a realizar pagamentos apenas para contas de titularidade da instituição autorizada cadastrada.
5. **Recomendação Mandatória:** A decisão permanece como `Proposed` até a emissão formal de **parecer jurídico especializado em regulação cambial e bancária**, atestando a regularidade do modelo e confirmando se a atividade não se enquadra compulsoriamente como correspondente no país ou arranjo de pagamento.

## Consequences

### Positive

- **Eliminação de barreira regulatória inicial:** Permite o lançamento ágil do MVP sem a necessidade de obter autorização prévia ou processos burocráticos de homologação no Banco Central que durariam anos.
- **Redução drástica do custo operacional:** Não exige contratação de estruturas pesadas de tesouraria, custódia bancária especializada, seguros de valores ou sistemas legados de conexão direta ao Sisbacen.
- **Risco de fraude financeira minimizado:** Se a plataforma não toca no dinheiro, ataques cibernéticos ou invasões de conta não conseguem desviar fundos monetários diretamente do software.

### Negative

- **Risco de Vazamento (Disintermediation / Leakage):** Como as partes precisam se comunicar e liquidar a transação fora do software (na loja física ou via contato direto), existe incentivo para que cliente e casa fechem negócios futuros diretamente sem retornar à plataforma.
- **Impossibilidade de Garantia Financeira Direta (Escrow):** A plataforma não pode oferecer garantias monetárias automáticas caso a casa atrase a entrega ou o cliente desista após o match.
- **Insegurança Jurídica Residual:** Mesmo sem custódia, o regulador pode avaliar se a apresentação de taxas e o fechamento do match caracterizam atividade de correspondente cambial por meio eletrônico.

### Neutral

- A mitigação do risco de vazamento depende de estratégias de produto (retenção de dados até o match, sistema de reputação pós-MVP e comodidade da plataforma).

## Alternatives Considered

### Atuação como Correspondente Cambial Oficial
Requer celebração de contrato de correspondente formal e exclusivo com uma única instituição financeira, eliminando o modelo de marketplace multi-casas competitivo.

### Plataforma com Conta Escrow Integrada
Descartada liminarmente no estágio atual por exigir licença de Instituição de Pagamento ou parceria de Banking as a Service (BaaS) complexa e de alto custo, além de potencial ilegalidade sem autorização de câmbio.

## References

- Lei nº 14.286/2021 (Novo Marco Legal do Câmbio)
- Resolução BCB nº 277/2022 (Regulamentação do Mercado de Câmbio)
- Lei nº 7.492/1986 (Crimes contra o Sistema Financeiro Nacional)
- [PRD - Seção de Riscos Regulatórios](../03-product/prd.md)

