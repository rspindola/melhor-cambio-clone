---
artifact: roadmap
version: "1.4"
created: 2026-11-03
status: draft
---

# Roadmap de Produto: Marketplace de Câmbio por Melhor Oferta

Este documento consolida o planejamento evolutivo do produto, combinando os resultados da [Matriz de Priorização](../02-strategy/prioritization.md), as metas operacionais dos [OKRs](../05-okrs/okrs.md) e as decisões técnicas dos [ADRs](../04-architecture/adr/).

> [!NOTE]
> Os prazos estão estruturados em **semanas relativas** (S01 a S24) contadas a partir do início formal do ciclo de desenvolvimento, marcados como `[ESTIMATIVA]` e sujeitos a calibração com as casas parceiras.

---

## Visão Geral das Fases

```mermaid
gantt
    title Roadmap Evolutivo do Produto (Estimativa em Semanas Relativas)
    dateFormat YYYY-MM-DD
    excludes weekends

    section Fase 1 - MVP Piloto
        Setup Monorepo e Fundações          :done, s01, 2026-11-03, 2w
        Auth e Onboarding KYB Casas         :active, s02, after s01, 2w
        Cotacoes Tempo Real e Cache         :active, s03, after s01, 2w
        Engine de Ofertas e Leilao          :crit, s04, after s02, 3w
        Controle de Concorrencia e Match    :crit, s05, after s04, 2w
        Vitrine de Taxas de Balcao          :s06, after s04, 1w
        Painel Admin e Auditoria            :s07, after s05, 1w
        Validacao Marco Piloto 10 Casas     :milestone, m1, after s07, 0d
        Piloto Fechado RJ e SP              :crit, s08, after m1, 4w

    section Fase 2 - Monetizacao
        Pesquisa WTP e Parecer Juridico     :s09, after m1, 3w
        Integracao Gateway de Cobranca      :crit, s10, after s09, 3w
        Chat Interno Pos Match              :s11, after s08, 2w
        Sistema de Avaliacao e Reputacao    :s12, after s11, 2w
        Virada Modelo Pago Casas            :milestone, m2, after s10, 0d

    section Fase 3 - Expansao
        Landing Pages Multi Tenant          :s13, after m2, 4w
        API Publica e Webhooks              :s14, after s13, 3w
        App Mobile React Native Expo        :s15, after s13, 6w
        Expansao Novas Cidades              :s16, after s14, 4w
        Marco Escala Regional               :milestone, m3, after s15, 0d
```

---

## Detalhamento das Fases

### Fase 1: MVP (Lançamento Piloto RJ e SP)
**Foco Estratégico:** Provar a tese de liquidez e tempo de resposta ágil sem fricção financeira, operando com 5 a 10 casas parceiras comprometidas no Rio de Janeiro e em São Paulo.

#### Escopo Entregue
- **Onboarding e KYB com MFA:** Autocadastro de casas, upload documental e aprovação administrativa com estados `PENDENTE` → `EM_ANÁLISE` → `APROVADA` → `SUSPENSA` ([US-002](user-stories.md#us-002-autocadastro-de-casa-de-câmbio-kyb), [ADR-0009](adr/adr-0009-onboarding-kyb-casas.md)), com obrigatoriedade de segundo fator MFA via TOTP para Owner e Operadores ([US-028](user-stories.md#us-028-autenticação-multifator-mfa-obrigatória-para-casas-de-câmbio)).
- **Cotações de Referência:** AwesomeAPI com fallback secundário, cache Redis (TTL 300s) e distribuição via WebSocket ([ADR-0005](adr/adr-0005-estrategia-cotacao.md)).
- **Motor de Leilão e Parâmetros:** Publicação de ofertas pelo cliente com limites e prazos parametrizados centralmente na Tabela de Parâmetros Configuráveis, teto de valor por oferta e monitoramento preventivo de fracionamento PLD ([US-030](user-stories.md#us-030-controle-de-teto-de-valor-por-oferta-e-monitoramento-de-fracionamento-pld)), e agendamento BullMQ ([ADR-0003](adr/adr-0003-redis-bullmq-filas.md)).
- **Aceite Direto e Concorrência:** Match automático ("first-come, first-served") com controle transacional atômico no PostgreSQL ([ADR-0006](adr/adr-0006-concorrencia-match.md)) utilizando relógio em tempo real `clock_timestamp()`, sem mutação de estado em rejeições, e modal obrigatório de confirmação com decomposição financeira pré-aceite ([US-029](user-stories.md#us-029-confirmação-pré-aceite-com-resumo-financeiro-vinculante)).
- **Contrapropostas:** Fluxo de contrapropostas com atendimento integral obrigatório no MVP, ordenação condicional pelo valor total em reais (VET: compra ASC, venda DESC), discriminação de IOF e tarifas informada pela casa sem alíquotas fixas, teto de 1 extensão de 5 minutos por oferta nos minutos finais, e parâmetro unificado `prazo_validade_minutos`.
- **Negociação e Gestão de No-Show:** Fluxo de negociação com checkpoint de término da janela de execução acordada, declaração de ausência (no-show) com 24h para contestação do cliente, gestão de strikes por ausência não justificada ([US-019](user-stories.md#us-019-conclusão-da-negociação-gestão-de-no-show-e-timeout)) e trilha de auditoria contra abusos de casas parceiras.
- **Notificações Multicanal:** Alertas em tempo real via WebSocket e canais complementares (Web Push, e-mail e WhatsApp para operadores offline com throttling de 30 min em digest e opt-in obrigatório) ([US-024](user-stories.md#us-024-notificações-multicanal-para-operadores-offline-com-throttling-e-opt-in)).
- **Máquina de Estados Completa:**
  - Oferta: `ABERTA` / `FECHADA` / `EXPIRADA` / `CANCELADA`
  - Proposta: `PENDENTE` / `ACEITA` / `RECUSADA` / `EXPIRADA` / `SUBSTITUÍDA` / `ENCERRADA` (gatilhos auditados: `MATCH_OUTRA_CASA`, `OFERTA_EXPIRADA`, `OFERTA_CANCELADA`, `CASA_SUSPENSA`)
  - Negociação: `AGUARDANDO_PAGAMENTO_ENTREGA` / `CONCLUÍDA` / `DISPUTA` / `CANCELADA` (com retenção preventiva `parceiro_suspenso: true` em caso de suspensão de casa, sem reaproveitar `DISPUTA`)
- **Vitrine de Taxas:** Cadastro de balcão informativo por moeda e produto ([US-021](user-stories.md#us-021-cadastro-de-taxas-de-balcão-na-vitrine)).
- **Painel Admin:** Gestão de parceiros, moderação de disputas, monitoramento de strikes/no-show, alertas PLD e trilha imutável de auditoria.
- **Gratuidade Total no Piloto:** Fase 1 operando 100% gratuita; regras de faturamento e estorno pertencem exclusivamente à Fase 2 ([ADR-0012](adr/adr-0012-modelo-cobranca.md)).

#### Critérios de Entrada
- Parecer preliminar de viabilidade regulatória atestando o modelo sem custódia ([ADR-0010](adr/adr-0010-plataforma-sem-custodia.md));
- Compromisso prévio firmado pelo parceiro comercial com 10 casas (mínimo de 5 em SP e 5 no RJ);
- Ambiente de homologação funcional com testes de concorrência aprovados.

#### Critérios de Saída (Gates para Fase 2)
- Mínimo de 10 casas ativas operando no piloto por pelo menos 4 semanas consecutivas;
- Mais de 50 ofertas transacionadas em produção com tempo médio de resposta < 20 minutos [HIPÓTESE – A VALIDAR];
- Zero casos de double-matching registrados na base de dados;
- Parecer jurídico definitivo favorável ao modelo de cobrança.

---

### Fase 2: Monetização e Confiança
**Foco Estratégico:** Validar a sustentabilidade do negócio introduzindo o modelo de faturamento nas casas parceiras e construindo recursos de confiança para mitigar riscos operacionais e vazamentos.

#### Escopo Entregue
- **Sistema de Cobrança e Faturamento (SaaS / Success Fee):** Módulo de cobrança integrado a gateway nacional (Asaas ou Iugu) para faturamento de mensalidades ou taxa fixa por match (com política de estorno em aberto mantida no [ADR-0012](adr/adr-0012-modelo-cobranca.md) sujeita a parecer jurídico).
- **Chat Interno Pós-Match:** Mensageria contextualizada dentro da plataforma após a consolidação do match, permitindo combinar retirada/entrega sem necessidade de expor WhatsApp pessoal de operadores.
- **Sistema de Avaliação e Reputação Bilateral:** Avaliação mútua com notas (1 a 5 estrelas) e tags de elogio/crítica (pontualidade, integridade da taxa, agilidade).
- **Relatórios Financeiros Avançados:** Painel de conciliação para o perfil `EXCHANGE_FINANCIAL` da casa com exportação para CSV/Excel.

#### Critérios de Entrada
- Critérios de saída da Fase 1 plenamente atingidos;
- Alinhamento comercial prévio com as casas piloto sobre a transição do modelo gratuito para o modelo pago;
- Definição da tabela de preços fundamentada na pesquisa de WTP (KR3.1).

#### Critérios de Saída (Gates para Fase 3)
- Retenção paga superior a 60% da base ativa de casas do piloto;
- Faturamento mensal comprovado e inadimplência inferior a 10%;
- Menos de 2% de transações gerando disputas ou queixas de quebra de taxa.

---

### Fase 3: Expansão de Canais e Escala Geográfica
**Foco Estratégico:** Multiplicar os pontos de contato e a densidade de mercado através de landing pages white-label para as casas parceiras, aplicativo móvel nativo, API pública para tesourarias e expansão para novas capitais brasileiras.

#### Escopo Entregue
- **Landing Pages White-Label Multi-Tenant:** Aplicação Next.js com subdomínios e temas dinâmicos por casa de câmbio para atração de tráfego local de SEO ([ADR-0011](adr/adr-0011-landing-pages-multi-tenant.md)).
- **API Pública e Webhooks:** Endpoints seguros via API Keys para permitir que grandes casas integrem robôs de negociação automática e ERPs legados.
- **Aplicativo Mobile (React Native / Expo):** App nas lojas (Google Play e Apple App Store) com notificações push nativas e biometria para clientes e operadores de campo.
- **Geolocalização Avançada:** Ordenação de ofertas e casas por raio geográfico (km de distância) para retirada presencial imediata.
- **Expansão Regional:** Abertura da plataforma para praças adicionais (Curitiba, Belo Horizonte, Porto Alegre e Brasília).

#### Critérios de Entrada
- Operação em SP e RJ financeiramente equilibrada (breakeven operacional local);
- Infraestrutura de monorepo e CI/CD escalada para suportar múltiplos deploys simultâneos;
- Acordo com parceiros comerciais locais nas novas cidades.

#### Critérios de Saída
- Presença ativa em pelo menos 5 capitais do Brasil;
- Mais de 5.000 transações mensais concluídas com sucesso na plataforma [HIPÓTESE – A VALIDAR].

---

## Marcos de Validação com as Casas Parceiras

| Marco | Semana Relativa | Objetivo da Validação | Participantes | Critério de Sucesso |
|-------|-----------------|-----------------------|---------------|---------------------|
| **M1: Validação de UX do Operador** | S06 `[ESTIMATIVA]` | Testar a interface de recebimento de ofertas e envio de contrapropostas com 3 operadores reais | Time de Produto + 3 Casas Piloto SP | Operador consegue aceitar ou contrapropor em menos de 30 segundos após login |
| **M2: Validação de Prazos e Validade** | S07 `[ESTIMATIVA]` | Alinhar prazos máximos de expiração de oferta (30m vs 1h) e validade de contraproposta (10m vs 15m) | Sócio Comercial + 10 Casas Piloto | Consenso assinado sobre prazos aceitáveis para a operação diária |
| **M3: Go/No-Go do Piloto em Produção** | S08 `[ESTIMATIVA]` | Revisão completa de prontidão técnica, aprovação do checklist jurídico e cadastros KYB aprovados conforme [Launch Checklist](../07-launch/launch-checklist.md) | Fundadores + Admin + Líderes das Casas | 100% dos blockers do Launch Checklist resolvidos e 10 casas com operadores treinados |
| **M4: Revisão de Meio de Piloto** | S12 `[ESTIMATIVA]` | Analisar taxa de resposta real, motivos de recusa de propostas e índice de vazamento pós-match | Time de Produto + Todas as Casas Ativas | Menos de 15% de desvios operacionais ou disputas |
| **M5: Validação da Tabela de Preços (WTP)** | S14 `[ESTIMATIVA]` | Apresentação do modelo de monetização definitivo e assinatura de termos comerciais pagos | Fundadores + Proprietários das Casas | Mínimo de 6 casas piloto assinando a continuidade no plano pago |

---

## Gerenciamento de Dependências e Caminho Crítico

```mermaid
flowchart LR
    subgraph CaminhoCritico["Caminho Crítico do Lançamento"]
        direction LR
        A["Parecer Jurídico Preliminar"] --> B["Onboarding KYB das Casas"]
        B --> C["Engine de Leilão & Match"]
        C --> D["Piloto Fechado em SP e RJ"]
        D --> E["Validação de WTP & Cobrança"]
    end

    subgraph DependenciasExternas["Dependências Externas"]
        API["AwesomeAPI & Fallback"] -.-> C
        Rede["Adesão via Sócio Comercial"] -.-> B
        Gateway["Gateway Pagamentos (T2)"] -.-> E
    end
```

- **Risco de Bloqueio 1 (Jurídico):** Se o parecer jurídico apontar restrições ao modelo sem custódia, o fluxo de fechamento precisará ser reestruturado antes do go-live.
- **Risco de Bloqueio 2 (Adesão de Casas):** Sem a presença ativa de pelo menos 5 casas em uma praça, a taxa de resposta cai drasticamente, inviabilizando o leilão para os clientes daquela localidade.

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Produto | Criação inicial do Roadmap em 3 fases com Gantt Mermaid |
| 1.1 | 2026-11-03 | Equipe de Produto | Alinhamento com revisão PM-Critic |
| 1.2 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.2: inclusão de notificações multicanal offline na Fase 1, adequação das regras de concorrência com lock pessimista, atualização do modelo de cobrança para cobrança no match (sujeita a parecer jurídico) e refinamento dos critérios de transição de fase. |
| 1.3 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.3: precisão de concorrência transacional com clock_timestamp() (ADR-0006); contrapropostas com atendimento integral obrigatório no MVP, ordenação condicional compra/venda e prazo_validade_minutos; throttling de WhatsApp e opt-in; retenção parceiro_suspenso; e manutenção em aberto da política de estorno no ADR-0012. |
| 1.4 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.4: inclusão de MFA obrigatório para casas (US-028), modal de confirmação pré-aceite com decomposição financeira transparente (US-029), controle de teto de valor por oferta e monitoramento preventivo de fracionamento PLD (US-030); checkpoint de fim de janela de execução acordada com gestão de no-show e strikes (US-019); teto de 1 extensão na oferta; e reforço formal de gratuidade total da Fase 1 com faturamento restrito à Fase 2 (ADR-0012). |
