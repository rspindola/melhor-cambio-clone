---
artifact: launch-checklist
version: "1.5"
created: 2026-11-02
status: draft
---

# Launch Checklist: Lançamento Piloto Fechado em Rio de Janeiro e São Paulo

## Launch Overview

| Field | Value |
|-------|-------|
| What | Lançamento Piloto da Plataforma de Comunicação e Aproximação Cambial (Web MVP) |
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
| Customer Support Lead | Responsável por Operações e Moderação | suporte@melhorcambio.local |

---

## Legal & Compliance (Crítico / Bloqueador)

Desmembrado na v1.5 em 6 frentes com entregáveis formais, prazos relativos e responsáveis definidos:

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] **1. Parecer sobre enquadramento como canal de comunicação/aproximação** | Legal Counsel | S07 | Pending | **BLOQUEADOR ABSOLUTO:** Atestar formalmente a não-intermediação financeira, ausência de custódia e dispensa de autorização prévia de câmbio para a plataforma de software ([ADR-0010](../04-architecture/adr/adr-0010-plataforma-sem-custodia.md)) `[VALIDAR COM ADVOGADO]`. |
| [ ] **2. Parecer tributário sobre VET e ausência de fixação de IOF pelo software** | Legal Counsel | S07 | Pending | Validar o modelo onde o software exibe o valor total em reais e a decomposição informada pela casa sem fixar nem calcular alíquotas de IOF no código `[VALIDAR COM ESPECIALISTA TRIBUTÁRIO]`. |
| [ ] **3. Revisão de linguagem dos Termos de Uso e Política de Privacidade** | Legal Counsel | S07 | Pending | Inclusão de cláusulas inequívocas de isenção de responsabilidade sobre pagamento, entrega e execução cambial, fixando que o contrato cambial ocorre exclusivamente entre cliente e casa `[VALIDAR COM ADVOGADO]`. |
| [ ] **4. Parecer sobre governança de PLD e teto de valor por oferta** | Legal Counsel | S07 | Pending | Diretrizes de compliance para o teto de R$ 50.000,00 no piloto e posicionamento sobre alertas de fracionamento (responsabilidade formal de PLD recai sobre a instituição autorizada no Sisbacen). |
| [ ] **5. Adequação à LGPD no repasse bilateral de contatos pós-match** | Legal Counsel | S07 | Pending | Mapeamento da base legal (execução de procedimentos preliminares a pedido do titular / legítimo interesse) e consentimento explícito no modal pré-aceite para revelação de telefone e e-mail. |
| [ ] **6. Parecer sobre obrigações contratuais do fundador** | Legal Counsel | S06 | Pending | Análise de salvaguarda jurídica garantindo que o fundador não possui restrições ativas de não-concorrência (non-compete) ou confidencialidade derivadas de relações anteriores e verificação de não violação de IP de terceiros `[VALIDAR COM ADVOGADO]`. |

---

## Onboarding e Prontidão das Casas Parceiras (KYB)

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Mínimo de 5 casas cadastradas e aprovadas em São Paulo | Comercial | S07 | Pending | Status `APROVADA` no sistema com documentos anexados e validados no Sisbacen. |
| [ ] Mínimo de 5 casas cadastradas e aprovadas no Rio de Janeiro | Comercial | S07 | Pending | Status `APROVADA` no sistema com pontos de atendimento físicos cadastrados. |
| [ ] Treinamento operacional dos operadores das casas realizado | Comercial / Produto | S07 | Pending | Sessão de onboarding (30 min) com os operadores de cada casa cobrindo recebimento de oferta, aceite, contraproposta e painel de atendimento pós-match. |
| [ ] Taxas de balcão cadastradas na Vitrine Informativa | Casas Piloto | S07 | Pending | Pelo menos taxas de Dólar Turismo e Euro Turismo preenchidas por todas as casas piloto ([US-021](../03-product/user-stories.md#us-021-cadastro-de-taxas-de-balcão-na-vitrine)). |
| [ ] Validação de canais de contato direto (WhatsApp de contingência) | Operações | S07 | Pending | Criação de canal de comunicação rápida entre a plataforma e os gerentes de mesa das casas. |
| [ ] Validação de ativação de MFA para todos os operadores | Segurança / Comercial | S07 | Pending | Verificação de que 100% dos usuários com roles Owner e Operador cadastrados configuraram TOTP MFA antes do primeiro acesso produtivo ([US-026](../03-product/user-stories.md#us-026-autenticação-multifator-mfa-obrigatória-para-casas-de-câmbio), [AC-26](../03-product/acceptance-criteria.md#ac-26-autenticação-multifator-mfa-obrigatória-para-usuários-de-casas-de-câmbio-owner-e-operador)). |

---

## Engineering & Infrastructure Readiness

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Deploy em produção da API NestJS e Banco PostgreSQL | Tech Lead | S07 | Pending | Infraestrutura provisionada em nuvem com alta disponibilidade e conexões TLS/SSL ativas. |
| [ ] Instância Redis e workers BullMQ configurados | Tech Lead | S07 | Pending | Filas de expiração de ofertas (`offer-expiration`) e cache de cotações testadas. |
| [ ] Servidor de WebSocket (Socket.IO) operando com Redis Adapter | Tech Lead | S07 | Pending | Suporte a broadcasting segmentado por cidade e moedas. |
| [ ] Frontend React (Web SPA) compilado e distribuído em CDN | Tech Lead | S07 | Pending | Build otimizado, cache headers configurados e assets estáticos servidos via Cloudflare. |
| [ ] Testes de carga de concorrência transacional aprovados | Tech Lead | S06 | Pending | Simulação de N requisições paralelas concorrentes garantindo exatamente 1 sucesso, N-1 conflitos 409, 1 atendimento único gravado (`EM_ATENDIMENTO`), validação de casa aprovada/elegível, idempotência de retry e tratamento de lock_timeout ([AC-05](../03-product/acceptance-criteria.md#ac-05-teste-de-carga-e-concorrência-de-aceite-direto-n-requisições-paralelas)). |
| [ ] Rotina de backup automatizada do PostgreSQL verificada | Tech Lead | S06 | Pending | Backups diários com retenção e teste de restauração em staging com sucesso. |
| [ ] Variáveis de ambiente e secrets gerenciados com segurança | Tech Lead | S07 | Pending | Chaves de API externas (AwesomeAPI) e segredos JWT armazenados em secrets manager. |
| [ ] Carga inicial da Tabela de Parâmetros Configuráveis (`platform_configs`) | Tech Lead | S07 | Pending | Parâmetros de negócio centralizados carregados e validados no banco/ambiente sem hardcoding ([PRD Parâmetros Configuráveis](../03-product/prd.md#parâmetros-configuráveis-da-plataforma)). |
| [ ] Validação do teto de valor por oferta no piloto | Tech Lead | S07 | Pending | Bloqueio de ofertas acima de R$ 50.000,00 com mensagem explicativa amigável ([US-028](../03-product/user-stories.md#us-028-controle-de-teto-de-valor-por-oferta-no-piloto), [AC-28](../03-product/acceptance-criteria.md#ac-28-controle-de-teto-de-valor-por-oferta-no-piloto)). |

---

## QA & Testing Readiness

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Bateria completa de testes automatizados unitários e E2E | QA / Devs | S07 | Pending | Cobertura dos fluxos de criação de oferta, contraproposta, aceite direto, concorrência e expiração. |
| [ ] Teste de failover de cotação de referência | QA / Devs | S06 | Pending | Simulação de indisponibilidade da AwesomeAPI e entrega do cache stale com flag informativa ([AC-10](../03-product/acceptance-criteria.md#ac-10-indisponibilidade-total-das-apis-de-cotação-de-referência-awesomeapi--fallback)). |
| [ ] Teste de suspensão de casa em tempo real | QA / Devs | S06 | Pending | Validação de que casa suspensa é desconectada, propostas pendentes são invalidadas, e atendimentos ativos retidos preventivamente com motivo `SUSPENSAO_PARCEIRO` e aviso neutro ([AC-09](../03-product/acceptance-criteria.md#ac-09-casa-de-câmbio-suspensa-pelo-admin-com-atendimento-em-curso)). |
| [ ] Testes de relato bilateral de desfecho e timeout | QA / Devs | S07 | Pending | Validação do relato independente de desfecho (`CONCLUÍDO` vs `NÃO_CONCLUÍDO` com motivo) e timeout automático para `SEM_RETORNO` após janela configurada ([US-019](../03-product/user-stories.md#us-019-relato-bilateral-de-desfecho-do-atendimento-comercial), [AC-04](../03-product/acceptance-criteria.md#ac-04-relato-bilateral-de-desfecho-do-atendimento-comercial), [AC-30](../03-product/acceptance-criteria.md#ac-30-timeout-de-atendimento-para-sem_retorno)). |
| [ ] Testes de desistência voluntária pós-match | QA / Devs | S07 | Pending | Validação de permissão de desistência justificada com notificação imediata à contraparte ([AC-08](../03-product/acceptance-criteria.md#ac-08-desistência-voluntária-do-atendimento-pós-match)). |
| [ ] Testes do fluxo "Relatar Problema" à moderação | QA / Devs | S07 | Pending | Envio de ticket de suporte e relato estruturado para auditoria administrativa sem mediação de custódia ([US-020](../03-product/user-stories.md#us-020-relato-de-problema-operacional-para-moderação-da-plataforma), [AC-29](../03-product/acceptance-criteria.md#ac-29-relato-de-problema-operacional-para-moderação-da-plataforma)). |
| [ ] Testes de validade efetiva de contraproposta | QA / Devs | S07 | Pending | Validação de truncamento da validade da contraproposta quando superior ao tempo restante da oferta ([US-025](../03-product/user-stories.md#us-025-truncamento-da-validade-da-proposta-pelo-fim-da-oferta), [AC-25](../03-product/acceptance-criteria.md#ac-25-validade-efetiva-da-contraproposta-limitada-ao-fim-da-oferta)). |
| [ ] Validação do modal de confirmação pré-aceite | QA / UX | S07 | Pending | Garantia de que nenhum aceite vinculante ocorre sem resumo detalhado (moeda, valor, total em reais, decomposição informada pela casa e aviso de sem custódia) ([US-027](../03-product/user-stories.md#us-027-confirmação-pré-aceite-com-resumo-financeiro-vinculante), [AC-27](../03-product/acceptance-criteria.md#ac-27-modal-de-confirmação-mandatório-antes-de-aceite-vinculante)). |
| [ ] Teste em dispositivos móveis (Safari iOS e Chrome Android) | QA / UX | S07 | Pending | Layout responsivo verificado nas principais resoluções de tela. |

---

## Design, UX & Content

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Textos e avisos legais de "Plataforma de Comunicação / Sem Custódia" | UX / Legal | S07 | Pending | Banner explicativo destacado na tela de publicação, no modal pré-aceite e no painel de atendimento pós-match `[VALIDAR COM ADVOGADO]`. |
| [ ] Estados vazios (Empty States) e mensagens de erro polidas | UX | S06 | Pending | Feedback visual claro para "Nenhuma oferta no momento", "Oferta expirada", "Atendimento iniciado". |
| [ ] Notificações sonoras do painel da casa testadas | UX | S06 | Pending | Som de alerta audível configurado para entrada de nova oferta na mesa de câmbio. |

---

## Customer Support & Operations

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] FAQ operacional publicado para clientes e casas | Suporte | S07 | Pending | Dúvidas frequentes sobre como funciona a aproximação, responsabilidade direta pela entrega/pagamento e uso dos canais de contato. |
| [ ] Procedimento de moderação de relatos de problemas definido | Suporte / Admin | S07 | Pending | Fluxo para triagem de tickets de "Relatar Problema" e acompanhamento de casas com queixas de "taxa não mantida" para aplicação de suspensão administrativa. |
| [ ] Escala de plantão de suporte definida durante o horário do piloto | Suporte | S07 | Pending | Cobertura ativa das 09h às 18h em dias úteis com tempo de resposta < 10 minutos. |

---

## Analytics & Monitoring

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Monitoramento de erros em tempo real configurado (Sentry) | Tech Lead | S07 | Pending | Captura de exceções de frontend e backend com stack trace. |
| [ ] Dashboard de métricas operacionais estruturado (Metabase/SQL) | Produto / Tech | S07 | Pending | Acompanhamento ao vivo de: ofertas criadas, atendimentos iniciados (`EM_ATENDIMENTO`), desfechos declarados (`CONCLUÍDO` vs `NÃO_CONCLUÍDO` vs `SEM_RETORNO`), tempo mediano de resposta e casas ativas. |
| [ ] Alertas de indisponibilidade (Uptime Robot / PagerDuty) ativos | Tech Lead | S07 | Pending | Notificação imediata no Slack/WhatsApp em caso de falha de API ou conexão com o banco. |

---

## Go/No-Go Criteria

### Must Have (Blockers Absolutos - Sem estes o lançamento É CANCELADO)
1. **Pareceres Jurídicos Favoráveis Concluídos:** Entregáveis das 6 frentes legais aprovados, confirmando a atuação estrita como canal de comunicação e software sem intermediação financeira ([ADR-0010](../04-architecture/adr/adr-0010-plataforma-sem-custodia.md)) e regularidade contratual do fundador.
2. **Liquidez Mínima Assegurada:** Mínimo de 5 casas cadastradas, com documentos aprovados (KYB) e operadores treinados no Rio de Janeiro e 5 em São Paulo.
3. **Controle de Concorrência Transacional Validado:** Prova de carga demonstrando zero possibilidade de duplo aceite na mesma oferta e criação atômica do atendimento comercial ([AC-05](../03-product/acceptance-criteria.md#ac-05-teste-de-carga-e-concorrência-de-aceite-direto-n-requisições-paralelas)).
4. **Resiliência da Cotação:** Sistema mantém funcionamento e exibe taxa de referência mesmo com oscilação na API externa.
5. **Auditoria Imutável:** Todas as ações de criação, proposta, aceite, relato de desfecho e moderação gravando registros append-only no banco.
6. **Autenticação Segura (MFA):** 100% dos operadores das casas parceiras com MFA (TOTP) ativado obrigatoriamente ([US-026](../03-product/user-stories.md#us-026-autenticação-multifator-mfa-obrigatória-para-casas-de-câmbio), [AC-26](../03-product/acceptance-criteria.md#ac-26-autenticação-multifator-mfa-obrigatória-para-usuários-de-casas-de-câmbio-owner-e-operador)).
7. **Modal de Confirmação Pré-Aceite Vinculante:** Exibição mandatória de resumo financeiro completo e aviso de plataforma de comunicação sem custódia ([US-027](../03-product/user-stories.md#us-027-confirmação-pré-aceite-com-resumo-financeiro-vinculante), [AC-27](../03-product/acceptance-criteria.md#ac-27-modal-de-confirmação-mandatório-antes-de-aceite-vinculante)).
8. **Teto de Valor no Piloto Ativo:** Bloqueio mandatório de intenções acima de R$ 50.000,00 ([US-028](../03-product/user-stories.md#us-028-controle-de-teto-de-valor-por-oferta-no-piloto), [AC-28](../03-product/acceptance-criteria.md#ac-28-controle-de-teto-de-valor-por-oferta-no-piloto)).
9. **Painel de Atendimento e Relato de Desfecho Operacionais:** Revelação bilateral de contatos pós-match, opção de desistência voluntária e registro de desfecho com motivos padronizados funcionando ponta a ponta ([US-018](../03-product/user-stories.md#us-018-painel-de-atendimento-comercial-e-revelação-bilateral-de-contatos-pós-match), [US-019](../03-product/user-stories.md#us-019-relato-bilateral-de-desfecho-do-atendimento-comercial)).

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
- **Gatilho 1 (Regulatório/Legal):** Notificação de autoridade pública (BACEN, Ministério Público, Procon) questionando a atuação da plataforma.
- **Gatilho 2 (Integridade de Dados):** Ocorrência de double-matching (duas casas comitadas para a mesma oferta) ou corrupção de dados transacionais.
- **Gatilho 3 (Segurança):** Vazamento de dados pessoais ou suspeita de invasão cibernética.
- **Gatilho 4 (Instabilidade Técnica Crítica):** Taxa de erro 5xx superior a 5% por mais de 30 minutos sem resolução ou queda contínua do WebSocket.

### Rollback Steps (Passo a Passo de Execução)
1. **Ativação da Página de Manutenção:** O Tech Lead aciona flag global no Cloudflare/CDN redirecionando 100% do tráfego para a página de contingência: *"Plataforma em manutenção programada para melhorias"*.
2. **Congelamento do Motor de Ofertas:** Execução de script no backend para atualizar todas as ofertas no status `ABERTA` para `CANCELADA_SISTEMA`, limpando as filas no BullMQ para impedir novos matches.
3. **Comunicação Imediata aos Operadores das Casas:** Sócio Comercial e Suporte disparam mensagem padronizada no grupo de WhatsApp com as casas pilotos informando a pausa preventiva.
4. **Preservação de Atendimentos já Consolidados:** Os atendimentos que já alcançaram status `EM_ATENDIMENTO` permanecem com seus dados e contatos preservados para que as partes possam concluir o contato comercial diretamente entre si se assim desejarem, com apoio informativo do suporte.
5. **Diagnóstico Técnico e Snapshot do Banco:** Geração de snapshot imediato do banco de dados PostgreSQL e dos logs de auditoria para análise de causa-raiz (Post-Mortem).

### Responsáveis pelo Rollback
- **Decisão Final:** Fundador Líder e Sócio Comercial.
- **Execução Técnica:** Tech Lead (Tempo estimado de execução do bloqueio: **< 3 minutos**).

---

## Check-in Schedule

| Checkpoint | Momento Relativo | Participantes | Pauta Principal |
|------------|------------------|---------------|-----------------|
| **Alinhamento T-7 Dias** | S07 - Segunda-feira | Todos os Stakeholders | Revisão do status dos blockers (Pareceres jurídicos das 6 frentes e status KYB das 10 casas). |
| **Simulação T-2 Dias** | S07 - Quarta-feira | Tech Lead, Produto, QA | Simulação de fluxo completo em produção (oferta de teste até transição para `EM_ATENDIMENTO` e relato de desfecho). |
| **Reunião de Go/No-Go** | S07 - Sexta-feira 16h | Decisores e Líderes | Votação formal e assinatura do termo de liberação do lançamento. |
| **Launch Day Sync (Go-Live)** | S08 - Segunda-feira 09h30 | Time Completo | Abertura do tráfego para os primeiros clientes convidados e monitoramento de logs. |
| **Review T+1 Dia** | S08 - Terça-feira 18h | Time Completo | Análise das primeiras 24 horas: volume de ofertas, tempo mediano de resposta e primeiros relatos de desfecho. |

---

## Histórico de Revisão

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-11-02 | Equipe de Produto | Versão inicial do launch checklist |
| 1.3 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.3: atualização do item de teste de carga de concorrência transacional (AC-05 com N requisições paralelas, idempotência e lock_timeout) e teste de suspensão de casa (AC-09 com retenção preventiva SUSPENSAO_PARCEIRO e mensagem neutra ao cliente [VALIDAR COM JURÍDICO]). |
| 1.4 | 2026-11-03 | Equipe de Produto | Alinhamento com PRD v1.4: inclusão de checagem obrigatória de MFA para operadores de casas (US-028, AC-29), validação de modal de confirmação pré-aceite (US-029, AC-30), esteira de controle de PLD/teto de valor e alertas de fracionamento (US-030, AC-31), testes do checkpoint de no-show com prazo de contestação de 24h e strikes (AC-28), testes da regra de extensão única (AC-25 a AC-27), validação da tabela única de parâmetros configuráveis e reiteração de gratuidade do piloto da Fase 1. |
| 1.5 | 2026-11-03 | Equipe de Produto | Reposicionamento para plataforma de comunicação e aproximação tecnológica (estilo Melhor Câmbio / Nomad). Desmembramento da seção Legal & Compliance em 6 itens detalhados com prazos e owners (incluindo salvaguardas contratuais do fundador e parecer tributário sem fixação de IOF). Substituição de testes de no-show/strikes por testes de Atendimento Comercial (`EM_ATENDIMENTO`), relato bilateral de desfecho (`CONCLUÍDO`, `NÃO_CONCLUÍDO`, `SEM_RETORNO`), desistência voluntária com motivo e canal "Relatar Problema". Atualização dos critérios Go/No-Go e de rollback. |

