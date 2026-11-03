---
artifact: adr
version: "1.5"
created: 2026-11-03
status: proposed
---

# ADR-0010: Plataforma de Comunicação sem Participação no Pagamento ou Liquidação Financeira

## Status

Proposed (Dependente de Parecer Jurídico Especializado [VALIDAR COM ADVOGADO])

**Date:** 2026-11-03  
**Deciders:** Equipe fundadora e assessoria jurídica regulatória (a contratar)

## Context

A plataforma é concebida como uma evolução tecnológica de mensageria e aproximação inspirada no modelo do Melhor Câmbio (`melhorcambio.com`), conectando clientes interessados em moeda estrangeira a casas de câmbio autorizadas pelo Banco Central do Brasil (BACEN).

A legislação financeira brasileira, sob a supervisão do BACEN e do Conselho Monetário Nacional (CMN) — notadamente a Lei nº 14.286/2021 (Novo Marco Legal do Câmbio) e a Resolução BCB nº 277/2022 —, estabelece que a contratação de operações de câmbio, a identificação cadastral formal dos clientes (KYC cambial), a liquidação financeira de moeda estrangeira e o reporte regulatório ao Sisbacen são atos privativos de instituições autorizadas a operar no mercado de câmbio.

Qualquer atuação tecnológica que receba recursos de clientes (via Pix, TED ou cartão), retenha valores em contas gráficas (*escrow*), gerencie pagamentos, efetue a entrega física de numerário ou execute a liquidação financeira das operações incorreria no risco severo de caracterização como instituição de pagamento não autorizada ou exercício irregular de atividade financeira privativa (Lei nº 7.492/1986).

## Decision

Determina-se formalmente que a plataforma atuará **EXCLUSIVAMENTE COMO PLATAFORMA DE COMUNICAÇÃO, MENSAGERIA E APROXIMAÇÃO TECNOLÓGICA ENTRE AS PARTES**, com as seguintes premissas operacionais e jurídicas [VALIDAR COM ADVOGADO]:

1. **Ausência Absoluta de Participação no Pagamento e na Custódia:**
   A plataforma **NÃO recebe**, **NÃO custodia**, **NÃO transaciona**, **NÃO processa** e **NÃO liquida** quaisquer valores monetários, sejam em Reais (BRL) ou em moedas estrangeiras. Nenhuma conta gráfica, conta de pagamento ou mecanismo de custódia (*escrow*) existe ou existirá na infraestrutura do software.
2. **Pagamento e Entrega Diretos entre as Partes:**
   Todo o pagamento (dinheiro em espécie, Pix ou TED diretamente para a conta bancária da instituição autorizada), a conferência documental e a entrega física ou eletrônica da moeda acontecem **DIRETAMENTE ENTRE A CASA DE CÂMBIO E O CLIENTE**, fora do ambiente da plataforma. A plataforma não gerencia logística de entrega, motoboys, retiradas em loja ou confirmações financeiras de liquidação bancária.
3. **Compromisso Comercial de Atendimento (Não Executado pela Plataforma):**
   Ao ocorrer o match (por aceite direto ou escolha de contraproposta), a plataforma limita-se a gerar um registro de **Atendimento Comercial** (`EM_ATENDIMENTO`), disponibilizando às partes os dados necessários para contato direto durante uma janela comercial informada (conforme parâmetro configurável). O cumprimento da taxa e a formalização do negócio são obrigações de trato direto entre cliente e casa autorizada.
4. **Relato Qualitativo de Desfecho sem Mediação Financeira:**
   A plataforma não realiza mediação de valores nem impõe sanções financeiras em caso de desacordo. As partes apenas informam o desfecho qualitativo do atendimento (`CONCLUÍDO`, `NÃO_CONCLUÍDO` com motivo, ou `SEM_RETORNO`), servindo estritamente para moderação e reputação de mercado na plataforma.
5. **Termos de Uso e Isenção de Responsabilidade:**
   Os Termos de Uso e todas as telas do sistema conterão avisos destacados ressaltando a natureza de canal de comunicação e orientando os clientes a efetuarem pagamentos exclusivamente para a titularidade jurídica da casa de câmbio autorizada informada no Sisbacen [VALIDAR COM ADVOGADO].

## Consequences

### Positive

- **Enquadramento Regulatório Seguro:** Ao atuar estritamente como canal de comunicação e aproximação (mensageria tecnológica similar ao modelo estabelecido do Melhor Câmbio), mitiga-se expressivamente o risco de enquadramento como instituição financeira ou arranjo de pagamento não autorizado [VALIDAR COM ADVOGADO].
- **Agilidade e Simplicidade Operacional no MVP:** Elimina a necessidade de integrar gateways de pagamento bancários, estruturas de conciliação de faturamento no piloto, custódia e risco de chargeback no MVP.
- **Isolamento de Risco Cibernético:** O software não armazena dados de contas bancárias de clientes, chaves Pix transacionais ou dados de cartão de crédito.

### Negative

- **Risco de Vazamento Comercial (Desintermediação):** Como a comunicação, o pagamento e o cumprimento ocorrem fora do software, as partes podem negociar diretamente em operações futuras sem retornar à plataforma.
- **Ausência de Garantia Financeira:** A plataforma não pode estornar dinheiro ou garantir a entrega caso a casa descumpra o combinado, dependendo do relato de desfecho e de moderação de cadastro para manter a integridade da rede.
- **Necessidade de Parecer Formal Específico:** Permanece necessária a emissão de parecer jurídico regulatório atestando que a aproximação e o anúncio de lances não exigem credenciamento como correspondente no país [VALIDAR COM ADVOGADO].

### Neutral

- A monetização futura da plataforma (Fase 2 / ADR-0012) migra para cobrança por lead/atendimento aceito ou plano de assinatura SaaS das casas, mantendo a ausência de participação na liquidação das moedas.

## Alternatives Considered

### Atuação como Correspondente Cambial Credenciado
Exigiria vínculo contratual formal e exclusivo com uma única instituição autorizada no Banco Central, inviabilizando o marketplace multi-casas competitivo.

### Plataforma com Custódia ou Escrow Integrado
Descartada terminantemente por configurar intermediação financeira privativa e exigir licenças bancárias/regulatórias incompatíveis com a proposta de valor do produto.

## References

- Lei nº 14.286/2021 (Novo Marco Legal do Câmbio)
- Resolução BCB nº 277/2022 (Regulamentação Cambial)
- [Contexto Competitivo: Análise do Melhor Câmbio](../../01-discovery/competitive-context.md)
- [PRD - Seção de Posicionamento e Solução](../../03-product/prd.md)

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Arquitetura | Versão inicial focada em modelo sem custódia |
| 1.5 | 2026-11-03 | Equipe de Arquitetura | Revisão completa v1.5: reposicionamento estrito como plataforma de comunicação e mensageria entre casa e cliente; explicitação de que pagamento, entrega e acordo ocorrem diretamente entre as partes fora do software; substituição de "negociação" por "atendimento comercial" e relato qualitativo sem mediação financeira [VALIDAR COM ADVOGADO]. |
