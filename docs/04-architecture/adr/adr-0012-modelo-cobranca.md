---
artifact: adr
version: "1.5"
created: 2026-11-03
status: proposed
---

# ADR-0012: Modelo de Monetização e Estratégia de Cobrança (Fase 2)

## Status

Proposed (Dependente de Parecer Jurídico Especializado e Validação Comercial no Piloto [VALIDAR COM ADVOGADO])

**Date:** 2026-11-03  
**Deciders:** Equipe fundadora, comercial e assessoria jurídica regulatória

## Context

A plataforma é posicionada na versão 1.5 como um **canal tecnológico de comunicação, mensageria e aproximação** entre casas de câmbio autorizadas pelo Banco Central e clientes, inspirado na mecânica comprovada de mercado do Melhor Câmbio (`melhorcambio.com`), sem qualquer participação no pagamento, custódia ou liquidação cambial direta ([ADR-0010](adr-0010-plataforma-sem-custodia.md)).

Nesse modelo de aproximação, a monetização da plataforma não incide — e legalmente não deve incidir — como percentual (*take-rate*) sobre o volume de moeda estrangeira transacionado, sob risco de equiparação indevida a intermediação cambial ou spread de câmbio privativo de instituições financeiras (Lei nº 14.286/2021). A monetização viável e sustentável reside na cobrança por serviços de software e geração de oportunidades de negócio (leads qualificados / atendimentos iniciados).

## Decision

Propõe-se que a monetização seja implementada **exclusivamente na Fase 2 (T2)**, sob parecer jurídico regulatório prévio [VALIDAR COM ADVOGADO], com as seguintes diretrizes:

1. **Piloto 100% Gratuito (Fase 1 / MVP / T1):**
   - Durante o lançamento piloto com 10 a 20 casas parceiras em São Paulo e Rio de Janeiro, o uso do software é **totalmente gratuito** para clientes e casas de câmbio.
   - O objetivo do piloto é construir densidade de liquidez local, aferir tempos de resposta das mesas e validar o engajamento dos operadores sem qualquer atrito comercial de faturamento.
   - **Nenhum código de cobrança, faturamento, cartão ou gateway de pagamento será desenvolvido no MVP.**
2. **Modelos de Receita Avaliados para a Fase 2 (T2):**
   - **Modelo 1: Taxa Fixa por Lead / Atendimento Aceito (Success Fee em R$):** Cobrança de valor fixo em reais (ex.: R$ 10 a R$ 25) por atendimento comercial gerado (match consolidado onde a casa recebe os dados de contato do cliente com intenção firme de compra/venda). Trata-se do modelo clássico de geração de leads qualificados adotado no setor de serviços.
   - **Modelo 2: Assinatura Mensal (SaaS Fixo por Mesa/Praça):** Mensalidade fixa para que a casa tenha acesso contínuo ao pregão em tempo real via WebSocket, direito a emitir contrapropostas ilimitadas e presença institucional destacada na Vitrine Informativa.
   - **Modelo 3: Modelo Híbrido:** Mensalidade de manutenção com pacote de créditos de atendimentos inclusos, cobrando taxa unitária adicional por atendimento excedente.
3. **Mecanismo Anti-Vazamento Estrutural:**
   - Durante o leilão, os dados de contato direto (telefone, e-mail e endereço exato) permanecem rigorosamente protegidos.
   - A revelação dos contatos ocorre exclusivamente após a consolidação formal do match (`EM_ATENDIMENTO`), garantindo que a oportunidade de negócio seja devidamente registrada na plataforma antes da interação direta.
4. **Parecer Jurídico Obrigatório:**
   - A homologação final do modelo escolhido na Fase 2 é condicionada à emissão de parecer por banca especializada confirmando que a cobrança por lead ou software não descaracteriza a natureza de plataforma de tecnologia perante o BACEN e a Receita Federal [VALIDAR COM ADVOGADO].

## Consequences

### Positive

- **Aceleração da Adesão no Piloto:** Zero atrito de onboarding para as primeiras casas parceiras captadas pelo sócio comercial.
- **Segurança Jurídica:** Desassocia completamente a receita da plataforma do valor financeiro das moedas negociadas, eliminando questionamentos sobre spread cambial.
- **Simplicidade de Engenharia no MVP:** A equipe foca 100% na experiência em tempo real e concorrência transacional no leilão.

### Negative

- **Monetização Postergada:** A plataforma não gera receita no ciclo T1, exigindo investimento dos fundadores até o go-live da Fase 2.
- **Risco de Churn na Virada da Fase 2:** Algumas casas habituadas à gratuidade inicial podem demonstrar resistência à contratação de planos pagos, demandando demonstração clara do ROI de conversão gerado pelo canal.

---

## Future Considerations / Removido do MVP na v1.5

### Gestão de Estornos Financeiros e Disputas de Faturamento
- **Texto original (v1.3 e v1.4):** Discutia opções de estorno automático da taxa de match em caso de cancelamento por inatividade vs. retenção e estorno condicionado a disputa formal para evitar desintermediação combinada.
- **Razão da Remoção do MVP na v1.5:** Como o MVP é 100% gratuito e a plataforma é estritamente de comunicação (sem fluxo financeiro ou retenção de valores de clientes ou casas), qualquer discussão sobre devolução ou estorno de tarifas é inaplicável à Fase 1. A política de compensação de leads inválidos (ex.: créditos para números de telefone comprovadamente falsos) será modelada estritamente quando a cobrança por lead for implementada na Fase 2.

---

## References

- [Contexto Competitivo: Análise do Melhor Câmbio](../../01-discovery/competitive-context.md)
- [ADR-0010: Plataforma de Comunicação sem Participação no Pagamento](adr-0010-plataforma-sem-custodia.md)
- [PRD - Seção de Modelo de Negócio](../../03-product/prd.md)

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe fundadora | Versão inicial propondo modelos de monetização |
| 1.3 | 2026-11-03 | Equipe fundadora | Registro de política de estorno em aberto |
| 1.4 | 2026-11-03 | Equipe fundadora | Formalização de gratuidade do piloto no T1 |
| 1.5 | 2026-11-03 | Equipe fundadora | Revisão completa v1.5: reposicionamento como monetização da Fase 2 via taxa por lead/atendimento ou assinatura SaaS de software; remoção de discussões de estorno no MVP (migradas para Future Considerations); reafirmação de gratuidade do piloto e ausência de cobrança sobre transações cambiais [VALIDAR COM ADVOGADO]. |
