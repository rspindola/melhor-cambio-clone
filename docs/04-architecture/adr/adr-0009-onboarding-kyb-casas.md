---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0009: Fluxo de Onboarding e Validação KYB (Know Your Business) de Casas de Câmbio

## Status

Proposed

**Date:** 2026-11-02
**Deciders:** Em discussão pela equipe técnica e fundadora

## Context

O mercado de câmbio no Brasil é estritamente regulamentado pela Lei nº 14.286/2021 (Novo Marco Cambial) e por resoluções do Banco Central do Brasil (BCB). Apenas instituições financeiras e entidades formalmente autorizadas pelo Banco Central podem operar no mercado de câmbio ou atuar como correspondentes cambiais.

Permitir que uma empresa não autorizada ou com pendências graves participe do leilão e feche negócios traria responsabilidade solidária gravíssima para os fundadores da plataforma, risco iminente de autuação pelo regulador e dano irreparável à reputação da marca.

Portanto, o acesso de casas de câmbio ao marketplace não pode ser imediato nem irrestrito. Exige-se um processo de onboarding com verificação institucional e documental (KYB - Know Your Business).

## Decision

Adotaremos um **fluxo estruturado de autocadastro com aprovação administrativa manual e máquina de estados para casas de câmbio**:

1. **Máquina de Estados da Casa de Câmbio:**
   - `PENDENTE`: Cadastro inicial criado; dados básicos preenchidos, mas documentação ainda não enviada ou com correções solicitadas.
   - `EM_ANÁLISE`: Dados institucionais e documentos obrigatórios submetidos; aguardando revisão do Administrador.
   - `APROVADA`: Verificação documental e regulatória concluída com sucesso; a casa é ativada e passa a receber ofertas compatíveis.
   - `SUSPENSA`: Casa temporariamente bloqueada por denúncia, inadimplência, expiração de licença ou decisão administrativa.
2. **Requisitos de Cadastro e Documentos Obrigatórios:**
   - CNPJ ativo na Receita Federal com CNAE compatível com atividade financeira/cambial;
   - Razão Social e Nome Fantasia;
   - Nome e CPF do Responsável Legal / Procurador;
   - Número de autorização / homologação no Banco Central (consulta Sisbacen/Cademp);
   - Cópia do Contrato Social consolidado ou Estatuto Social;
   - Cadastro de pontos de atendimento físicos (endereço, telefone, horário para retirada) e áreas de cobertura para entrega (delivery);
   - Seleção de moedas operadas (USD, EUR, GBP, etc.) e produtos suportados (papel-moeda e/ou cartão pré-pago).
3. **Mecanismo de Análise e Aprovação no MVP:**
   - No MVP piloto (5 a 10 casas por praça), a verificação será realizada manualmente pelo Administrador no Painel Admin, com checagem ativa nas bases públicas do Banco Central e Receita Federal.
   - Somente após o Admin acionar o comando "Aprovar Casa", o backend atualiza o status para `APROVADA` e registra a evidência na trilha de auditoria.
4. **Proteção Operacional de Acesso:**
   - O `RolesGuard` e o Gateway WebSocket verificam ativamente a condição: `exchange.status === 'APROVADA'`.
   - Se uma casa estiver em qualquer outro status (`PENDENTE`, `EM_ANÁLISE`, `SUSPENSA`), seus operadores são bloqueados de receber broadcasts de ofertas, aceitar lances ou enviar contrapropostas.

## Consequences

### Positive

- **Conformidade regulatória e blindagem jurídica:** Garante documentalmente que 100% dos parceiros transacionando na plataforma possuem autorização regulatória legítima perante o Banco Central.
- **Prevenção de fraudes e golpes:** Evita a entrada de intermediários oportunistas ou fraudulentos, protegendo o cliente final.
- **Relacionamento próximo no GTM:** Permite que a equipe fundadora valide pessoalmente cada uma das 5–10 casas piloto em SP e RJ, estreitando laços comerciais.

### Negative

- **Fricção no onboarding:** A necessidade de envio de documentos e aprovação humana impede ativação instantânea (self-service automático).
- **Gargalo operacional de escala:** O processo manual funciona para o piloto (10–20 casas), mas exigirá automatização com APIs de background check (ex: idwall, Serpro, BigDataCorp) na fase de expansão.

### Neutral

- A arquitetura prevê campos extensíveis no modelo `Exchange` para receber webhooks de provedores automatizados de KYB no futuro.

## Alternatives Considered

### Aprovação Totalmente Automática via Consulta de CNPJ
Descartada devido ao risco regulatório extremo. A presença de um CNAE não garante que a casa esteja com autorização vigente no Banco Central para atuar na modalidade pretendida.

### Apenas Casas Prévias Conhecidas (Sem Autocadastro)
Descartada porque criaria dependência de cadastros manuais diretos via banco de dados pelos desenvolvedores, gerando débito técnico e impedindo que as casas gerenciem suas filiais e equipes.

## References

- Lei nº 14.286/2021 (Novo Marco Cambial)
- [PRD - Seção de Cadastro de Casas (KYB)](../03-product/prd.md)
- [User Story US-002 e US-003](../03-product/user-stories.md)

