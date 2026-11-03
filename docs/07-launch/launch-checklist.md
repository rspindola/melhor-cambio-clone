---
artifact: launch-checklist
version: "1.4"
created: 2026-11-02
status: draft
---

# Launch Checklist: Lançamento Piloto Fechado em Rio de Janeiro e São Paulo

## Launch Overview

| Field | Value |
|-------|-------|
| What | Lançamento Piloto do Marketplace de Câmbio por Melhor Oferta (Web MVP) |
| Launch Date | Semana Relativa S08 `[ESTIMATIVA]` |
| Launch Type | Piloto Controlado (Fechado para 10 a 20 casas parceiras em RJ e SP) |
| Launch Owner | Equipe Fundadora (Produto e Comercial) |
| Go/No-Go Decision Maker | Fundador Líder e Sócio Comercial |

### Key Stakeholders

| Role | Name | Contact |
|------|------|---------|
| Product Lead | Head de Produto | produto@melhorcambio.local |
| Engineering Lead | Tech Lead Backend / Infra | tech@melhorcambio.local |
| Commercial & Partnerships | Sócio Comercial de Relações com Casas | comercial@melhorcambio.local |
| Legal Counsel | Assessoria Jurídica em Direito Bancário/Cambial | juridico@parceirolegal.local |
| Customer Support Lead | Responsável por Operações e Mediação | suporte@melhorcambio.local |

---

## Legal & Compliance (Crítico / Bloqueador)

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Parecer jurídico formal concluído atestando modelo sem custódia ([ADR-0010](../04-architecture/adr/adr-0010-plataforma-sem-custodia.md)) | Legal Counsel | S07 | Pending | **BLOQUEADOR ABSOLUTO:** Sem parecer atestando ausência de custódia e risco regulatório mitigado, o go-live não ocorre. |
| [ ] Termos de Uso da Plataforma redigidos e aprovados | Legal Counsel | S07 | Pending | Deve conter cláusulas explícitas de isenção de custódia e de que o contrato cambial é celebrado com a casa. |
| [ ] Política de Privacidade e Consentimento LGPD redigidos | Legal Counsel | S07 | Pending | Mapeamento de coleta de dados mínimos (CPF, e-mail) e termo de consentimento para compartilhamento com a casa vencedora. |
| [ ] Cláusula contratual de adesão e sigilo para as Casas Piloto | Comercial / Legal | S06 | Pending | Acordo formal com as 10 casas piloto sobre regras de conduta, sigilo de taxas e compromisso de resposta. |
| [ ] Matriz de conformidade PLD/KYC alinhada | Legal Counsel | S07 | Pending | Definição clara de que a responsabilidade pela identificação formal e prevenção à lavagem de dinheiro recai sobre a casa autorizada. |

---

## Onboarding e Prontidão das Casas Parceiras (KYB)

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Mínimo de 5 casas cadastradas e aprovadas em São Paulo | Comercial | S07 | Pending | Status `APROVADA` no sistema com documentos anexados e validados no Sisbacen. |
| [ ] Mínimo de 5 casas cadastradas e aprovadas no Rio de Janeiro | Comercial | S07 | Pending | Status `APROVADA` no sistema com pontos de atendimento físicos cadastrados. |
| [ ] Treinamento operacional dos operadores das casas realizado | Comercial / Produto | S07 | Pending | Sessão de onboarding (30 min) com os operadores de cada casa cobrindo recebimento de oferta, aceite e contraproposta. |
| [ ] Taxas de balcão cadastradas na Vitrine Informativa | Casas Piloto | S07 | Pending | Pelo menos taxas de Dólar Turismo e Euro Turismo preenchidas por todas as casas piloto. |
| [ ] Validação de canais de contato direto (WhatsApp de contingência) | Operações | S07 | Pending | Criação de canal de comunicação rápida entre a plataforma e os gerentes de mesa das casas. |
| [ ] Validação de ativação de MFA para todos os operadores | Segurança / Comercial | S07 | Pending | Verificação de que 100% dos usuários com roles Owner e Operador cadastrados configuraram TOTP MFA antes do primeiro acesso produtivo ([US-028](../03-product/user-stories.md#us-028-mfa-obrigatório-para-usuários-de-casas-de-câmbio), [AC-29](../03-product/acceptance-criteria.md#ac-29-mfa-obrigatório-para-usuários-de-casas-de-câmbio-owner-e-operador)). |

---

## Engineering & Infrastructure Readiness

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Deploy em produção da API NestJS e Banco PostgreSQL | Tech Lead | S07 | Pending | Infraestrutura provisionada em nuvem com alta disponibilidade e conexões TLS/SSL ativas. |
| [ ] Instância Redis e workers BullMQ configurados | Tech Lead | S07 | Pending | Filas de expiração de ofertas (`offer-expiration`) e cache de cotações testadas. |
| [ ] Servidor de WebSocket (Socket.IO) operando com Redis Adapter | Tech Lead | S07 | Pending | Suporte a broadcasting segmentado por cidade e moedas. |
| [ ] Frontend React (Web SPA) compilado e distribuído em CDN | Tech Lead | S07 | Pending | Build otimizado, cache headers configurados e assets estáticos servidos via Cloudflare. |
| [ ] Testes de carga de concorrência transacional aprovados | Tech Lead | S06 | Pending | Simulação de N requisições paralelas concorrentes garantindo exatamente 1 sucesso, N-1 conflitos 409, 1 negociação única gravada, validação de casa aprovada/elegível, idempotência de retry e tratamento de lock_timeout ([AC-05](../03-product/acceptance-criteria.md#ac-05-teste-de-carga-e-concorrência-de-aceite-direto-n-requisições-paralelas)). |
| [ ] Rotina de backup automatizada do PostgreSQL verificada | Tech Lead | S06 | Pending | Backups diários com retenção e teste de restauração em staging com sucesso. |
| [ ] Variáveis de ambiente e secrets gerenciados com segurança | Tech Lead | S07 | Pending | Chaves de API externas (AwesomeAPI) e segredos JWT armazenados em secrets manager. |
| [ ] Carga inicial da Tabela de Parâmetros Configuráveis (`platform_configs`) | Tech Lead | S07 | Pending | Parâmetros de negócio centralizados carregados e validados no banco/ambiente sem hardcoding ([PRD Parâmetros Configuráveis](../03-product/prd.md#parâmetros-configuráveis-da-plataforma)). |
| [ ] Mecanismos de segurança de PLD e teto de valor ativos | Tech Lead | S07 | Pending | Validação do teto de R$ 50.000 por oferta e regras de detecção/alerta de ofertas fracionadas ([US-030](../03-product/user-stories.md#us-030-teto-de-valor-por-oferta-e-monitoramento-de-fracionamento-pld), [AC-31](../03-product/acceptance-criteria.md#ac-31-teto-de-valor-por-oferta-e-alerta-de-fracionamento-pld)). |

---

## QA & Testing Readiness

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Bateria completa de testes automatizados unitários e E2E | QA / Devs | S07 | Pending | Cobertura dos fluxos de criação de oferta, aceite, contraproposta e expiração. |
| [ ] Teste de failover de cotação de referência | QA / Devs | S06 | Pending | Simulação de indisponibilidade da AwesomeAPI e entrega do cache stale com flag informativa ([AC-10](../03-product/acceptance-criteria.md#ac-10-indisponibilidade-total-das-apis-de-cotação-de-referência-awesomeapi--fallback)). |
| [ ] Teste de suspensão de casa em tempo real | QA / Devs | S06 | Pending | Validação de que casa suspensa pelo admin é imediatamente desconectada do WebSocket, suas propostas pendentes são invalidadas, e negociações ativas são retidas preventivamente com motivo próprio `SUSPENSAO_PARCEIRO` (sem reaproveitar `DISPUTA`), com mensagem neutra ao cliente ([AC-09](../03-product/acceptance-criteria.md#ac-09-casa-de-câmbio-suspensa-pelo-admin-com-negociação-em-curso)). |
| [ ] Testes de fluxo de No-Show, contestação de 24h e strikes | QA / Devs | S07 | Pending | Validação do disparo do checkpoint bilateral, prazo de 24h úteis de contestação pelo cliente, transição para CANCELADA / DISPUTA, registro de strikes e auditoria contra declarações falsas ([US-019](../03-product/user-stories.md#us-019-conclusão-da-negociação-gestão-de-no-show-e-timeout), [AC-28](../03-product/acceptance-criteria.md#ac-28-checkpoint-ao-fim-da-janela-de-execução-gestão-de-no-show-e-registro-de-strikes)). |
| [ ] Testes de extensão única de oferta e validade efetiva | QA / Devs | S07 | Pending | Validação de bloqueio de 2ª extensão e concorrência com aceite direto no final da oferta ([AC-25](../03-product/acceptance-criteria.md#ac-25-concorrência-entre-contraproposta-no-fim-da-oferta-extensão-e-aceite-direto), [AC-26](../03-product/acceptance-criteria.md#ac-26-tentativa-de-segunda-extensão-de-oferta), [AC-27](../03-product/acceptance-criteria.md#ac-27-validade-efetiva-da-contraproposta-limitada-ao-fim-da-oferta)). |
| [ ] Validação do modal de confirmação pré-aceite | QA / UX | S07 | Pending | Garantia de que nenhum aceite vinculante ocorre sem resumo detalhado (moeda, valor, total em reais, decomposição informada pela casa e aviso de sem custódia) ([US-029](../03-product/user-stories.md#us-029-modal-de-confirmação-antes-de-aceite-vinculante), [AC-30](../03-product/acceptance-criteria.md#ac-30-modal-de-confirmação-mandatório-antes-de-aceite-vinculante)). |
| [ ] Teste em dispositivos móveis (Safari iOS e Chrome Android) | QA / UX | S07 | Pending | Layout responsivo verificado nas principais resoluções de tela. |

---

## Design, UX & Content

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Textos e avisos legais de "Sem Custódia" validados na UI | UX / Legal | S07 | Pending | Banner explicativo destacado na tela de publicação e na tela pós-match. |
| [ ] Estados vazios (Empty States) e mensagens de erro polidas | UX | S06 | Pending | Feedback visual claro para "Nenhuma oferta no momento", "Oferta expirada", "Proposta aceita". |
| [ ] Notificações sonoras do painel da casa testadas | UX | S06 | Pending | Som de alerta audível configurado para entrada de nova oferta na mesa de câmbio. |

---

## Customer Support & Operations

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] FAQ operacional publicado para clientes e casas | Suporte | S07 | Pending | Dúvidas frequentes sobre como funciona o leilão, cancelamentos e segurança da transação. |
| [ ] Fluxo de escalonamento e mediação de disputas definido | Suporte | S07 | Pending | Procedimento passo a passo para o agente de suporte atuar caso a negociação entre em status `DISPUTA`. |
| [ ] Escala de plantão de suporte definida durante o horário do piloto | Suporte | S07 | Pending | Cobertura ativa das 09h às 18h em dias úteis com tempo de resposta < 10 minutos. |

---

## Analytics & Monitoring

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Monitoramento de erros em tempo real configurado (Sentry) | Tech Lead | S07 | Pending | Captura de exceções de frontend e backend com stack trace. |
| [ ] Dashboard de métricas operacionais estruturado (Metabase/SQL) | Produto / Tech | S07 | Pending | Acompanhamento ao vivo de: ofertas criadas, taxa de match, tempo mediano de resposta e casas ativas. |
| [ ] Alertas de indisponibilidade (Uptime Robot / PagerDuty) ativos | Tech Lead | S07 | Pending | Notificação imediata no Slack/WhatsApp em caso de falha de API ou conexão com o banco. |

---

## Go/No-Go Criteria

### Must Have (Blockers Absolutos - Sem estes o lançamento É CANCELADO)
1. **Parecer Jurídico Favorável:** Documento formal assinado confirmando que o modelo sem custódia não exige autorização de câmbio prévia para o software ([ADR-0010](../04-architecture/adr/adr-0010-plataforma-sem-custodia.md)).
2. **Liquidez Mínima Assegurada:** Mínimo de 5 casas cadastradas, com documentos aprovados (KYB) e operadores treinados no Rio de Janeiro e 5 em São Paulo.
3. **Controle de Concorrência Transacional Validado:** Prova de carga demonstrando zero possibilidade de duplo aceite na mesma oferta ([AC-05](../03-product/acceptance-criteria.md#ac-05-teste-de-carga-e-concorrência-de-aceite-direto-n-requisições-paralelas)).
4. **Resiliência da Cotação:** Sistema mantém funcionamento e exibe taxa de referência mesmo com oscilação na API externa.
5. **Auditoria Imutável:** Todas as ações de criação, proposta e aceite gravando registros append-only no banco.
6. **Autenticação Segura (MFA):** 100% dos operadores das casas parceiras com MFA (TOTP) ativado obrigatoriamente ([US-028](../03-product/user-stories.md#us-028-mfa-obrigatório-para-usuários-de-casas-de-câmbio), [AC-29](../03-product/acceptance-criteria.md#ac-29-mfa-obrigatório-para-usuários-de-casas-de-câmbio-owner-e-operador)).
7. **Modal de Confirmação Pré-Aceite Vinculante:** Exibição mandatória de resumo detalhado com aviso explícito de ausência de custódia antes de qualquer confirmação definitiva ([US-029](../03-product/user-stories.md#us-029-modal-de-confirmação-antes-de-aceite-vinculante), [AC-30](../03-product/acceptance-criteria.md#ac-30-modal-de-confirmação-mandatório-antes-de-aceite-vinculante)).
8. **Parâmetros e Controles PLD Configurados:** Tabela única de parâmetros carregada e monitoramento de fracionamento e teto por oferta ativos ([US-030](../03-product/user-stories.md#us-030-teto-de-valor-por-oferta-e-monitoramento-de-fracionamento-pld), [AC-31](../03-product/acceptance-criteria.md#ac-31-teto-de-valor-por-oferta-e-alerta-de-fracionamento-pld)).

### Should Have (Desejável - Permite lançamento com plano de mitigação)
1. Alertas sonoros habilitados em 100% dos navegadores dos operadores;
2. Dashboard visual automatizado (pode operar com queries diretas em SQL nos primeiros 3 dias);
3. Mais de 8 casas aprovadas por cidade.

### Nice to Have (Não atrasa o lançamento)
1. E-mails transacionais com layout customizado (podem usar templates padrão de texto);
2. Vídeo tutorial animado de onboarding (substituído por PDF explicativo).

---

## Rollback Plan (Plano de Contingência e Reversão)

### Trigger Conditions (Gatilhos de Acionamento do Rollback)
- **Gatilho 1 (Regulatório/Legal):** Notificação do Banco Central, Procon ou Ministério Público questionando a operação da plataforma.
- **Gatilho 2 (Integridade de Dados):** Ocorrência de double-matching (duas casas comitadas para a mesma oferta) ou corrupção de dados transacionais.
- **Gatilho 3 (Segurança):** Vazamento de dados pessoais ou suspeita de invasão cibernética.
- **Gatilho 4 (Instabilidade Técnica Crítica):** Taxa de erro 5xx superior a 5% por mais de 30 minutos sem resolução ou queda contínua do WebSocket.

### Rollback Steps (Passo a Passo de Execução)
1. **Ativação da Página de Manutenção:** O Tech Lead aciona flag global no Cloudflare/CDN redirecionando 100% do tráfego para a página de contingência: *"Plataforma em manutenção programada para melhorias"*.
2. **Congelamento do Motor de Ofertas:** Execução de script no backend para atualizar todas as ofertas no status `ABERTA` para `CANCELADA_SISTEMA`, limpando as filas no BullMQ para impedir novos matches.
3. **Comunicação Imediata aos Operadores das Casas:** Sócio Comercial e Suporte disparam mensagem padronizada no grupo de WhatsApp com as casas pilotos informando a pausa preventiva.
4. **Preservação de Negociações já Consolidadas:** As negociações que já alcançaram status `AGUARDANDO_PAGAMENTO_ENTREGA` permanecem salvas para que as partes possam concluir o atendimento físico se assim desejarem, com acompanhamento direto do suporte humano.
5. **Diagnóstico Técnico e Snapshot do Banco:** Geração de snapshot imediato do banco de dados PostgreSQL e dos logs de auditoria para análise de causa-raiz (Post-Mortem).

### Responsáveis pelo Rollback
- **Decisão Final:** Fundador Líder e Sócio Comercial.
- **Execução Técnica:** Tech Lead (Tempo estimado de execução do bloqueio: **< 3 minutos**).

---

## Check-in Schedule

| Checkpoint | Momento Relativo | Participantes | Pauta Principal |
|------------|------------------|---------------|-----------------|
| **Alinhamento T-7 Dias** | S07 - Segunda-feira | Todos os Stakeholders | Revisão do status dos blockers (Parecer jurídico e status KYB das 10 casas). |
| **Simulação T-2 Dias** | S07 - Quarta-feira | Tech Lead, Produto, QA | Simulação de fluxo completo em produção (oferta de teste ponta a ponta). |
| **Reunião de Go/No-Go** | S07 - Sexta-feira 16h | Decisores e Líderes | Votação formal e assinatura do termo de liberação do lançamento. |
| **Launch Day Sync (Go-Live)** | S08 - Segunda-feira 09h30 | Time Completo | Abertura do tráfego para os primeiros clientes convidados e monitoramento de logs. |
| **Review T+1 Dia** | S08 - Terça-feira 18h | Time Completo | Análise das primeiras 24 horas: volume de ofertas, latência e feedback dos operadores. |

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Produto | Versão inicial do launch checklist |
| 1.3 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.3: atualização do item de teste de carga de concorrência transacional (AC-05 com N requisições paralelas, idempotência e lock_timeout) e teste de suspensão de casa (AC-09 com retenção preventiva SUSPENSAO_PARCEIRO e mensagem neutra ao cliente [VALIDAR COM JURÍDICO]). |
| 1.4 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.4: inclusão de checagem obrigatória de MFA para operadores de casas (US-028, AC-29), validação de modal de confirmação pré-aceite (US-029, AC-30), esteira de controle de PLD/teto de valor e alertas de fracionamento (US-030, AC-31), testes do checkpoint de no-show com prazo de contestação de 24h e strikes (AC-28), testes da regra de extensão única (AC-25 a AC-27), validação da tabela única de parâmetros configuráveis e reiteração de gratuidade do piloto da Fase 1. |

