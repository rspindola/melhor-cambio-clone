---
artifact: adr
version: "1.0"
created: 2026-11-02
status: draft
---

# ADR-0004: WebSocket (Socket.IO) para comunicação em tempo real

## Status

Proposed

**Date:** 2026-11-02
**Deciders:** Em discussão pela equipe técnica e fundadora

## Context

O Melhor Câmbio é um sistema de negociação onde a latência da informação impacta diretamente a experiência do usuário e a efetividade do match entre clientes e casas de câmbio. Três cenários centrais exigem comunicação em tempo real:

1. **Casas recebendo ofertas:** quando um cliente publica uma intenção de câmbio, todas as casas elegíveis (aprovadas, na mesma praça, operando a moeda solicitada) precisam recebê-la imediatamente para poderem enviar contrapropostas competitivas.
2. **Clientes recebendo contrapropostas:** o cliente precisa ver as contrapropostas chegando em tempo real para comparar e decidir antes da expiração.
3. **Cotações de referência:** cotações comercial, turismo e PTAX precisam ser atualizadas na interface do usuário conforme mudam, sem necessidade de refresh manual.

Além desses, notificações de expiração, confirmação de match e atualizações de status de negociação se beneficiam de entrega push.

## Decision

Usaremos **Socket.IO** como camada de comunicação WebSocket em tempo real.

O backend NestJS utilizará `@nestjs/websockets` com o adapter Socket.IO para gerenciar conexões, rooms e namespaces. Cada casa de câmbio conectada será automaticamente adicionada às rooms correspondentes (por praça, por moeda). Ofertas publicadas serão emitidas para as rooms relevantes. Contrapropostas serão emitidas diretamente para o room do cliente específico.

Para escala horizontal futura, o Redis adapter do Socket.IO (`@socket.io/redis-adapter`) será utilizado para sincronizar eventos entre múltiplas instâncias do backend, aproveitando a mesma instância Redis definida na ADR-0003.

## Consequences

### Positive

- **Reconexão automática:** Socket.IO gerencia reconexão com backoff exponencial transparente para o desenvolvedor, essencial para usuários em redes instáveis (mobile, Wi-Fi público).
- **Rooms e namespaces:** permitem segmentar a distribuição de mensagens por casa, por praça, por moeda ou por sessão de negociação, sem broadcast desnecessário.
- **Fallback para HTTP long-polling:** em ambientes corporativos ou proxies que bloqueiam WebSocket, Socket.IO degrada graciosamente para polling HTTP, mantendo a funcionalidade.
- **Integração nativa com NestJS:** `@nestjs/websockets` fornece decorators (`@WebSocketGateway`, `@SubscribeMessage`, `@WebSocketServer`) e suporte a guards, pipes e interceptors nos gateways WebSocket.
- **Acknowledgements:** Socket.IO suporta callbacks de confirmação de entrega, úteis para garantir que eventos críticos (nova oferta, match confirmado) foram recebidos pelo cliente.
- **Ecossistema de clientes:** SDKs oficiais para browser, React Native, iOS e Android, facilitando o desenvolvimento futuro do app mobile.

### Negative

- **Overhead de protocolo:** Socket.IO adiciona uma camada sobre WebSocket nativo (handshake HTTP, upgrade, pacotes de heartbeat, engine.io), o que aumenta ligeiramente o tráfego e a complexidade de debugging comparado a WebSocket puro.
- **Escalabilidade horizontal requer Redis adapter:** cada instância do backend mantém suas próprias conexões Socket.IO em memória. Para que eventos emitidos em uma instância cheguem a clientes conectados em outra, é necessário o Redis adapter — uma dependência adicional (embora o Redis já esteja presente por decisão da ADR-0003).
- **Debugging mais complexo:** o protocolo proprietário do Socket.IO (engine.io) dificulta o uso de ferramentas padrão de debugging de WebSocket (como `wscat`); é necessário o Socket.IO client ou ferramentas específicas.
- **Sticky sessions em load balancer:** quando o fallback para polling é ativado, o load balancer precisa garantir sticky sessions para manter o cliente conectado à mesma instância durante o upgrade para WebSocket.

### Neutral

- Socket.IO não é um protocolo padrão (não é WebSocket puro), o que significa que clientes devem usar o SDK Socket.IO em vez de conectar com qualquer cliente WebSocket genérico. Para a API pública futura (landing pages de casas — ver ADR-0011), será necessário avaliar se Socket.IO é adequado ou se uma camada SSE/REST é preferível.
- A versão 4.x do Socket.IO resolve problemas de performance e segurança de versões anteriores, mas a reputação histórica de "pesado" ainda persiste em discussões técnicas.

## Alternatives Considered

### WebSocket nativo (ws)

Biblioteca Node.js de WebSocket puro, sem abstração adicional. Oferece máxima performance e mínimo overhead. Descartada porque: (1) sem reconexão automática — toda lógica de reconnect, heartbeat e timeout precisa ser implementada manualmente no cliente e servidor, (2) sem rooms ou namespaces nativos — roteamento de mensagens para grupos específicos exigiria implementação custom, (3) sem fallback para polling em ambientes que bloqueiam WebSocket, (4) integração com NestJS requer mais configuração manual. Para um produto onde confiabilidade da conexão é crítica (casas precisam receber ofertas sem falhas), a reconexão automática do Socket.IO é um diferencial significativo.

### Server-Sent Events (SSE)

Protocolo HTTP unidirecional (servidor → cliente) suportado nativamente por browsers. Descartado porque: (1) comunicação é unidirecional — o cliente não pode enviar contrapropostas ou acknowledgements pelo mesmo canal, necessitando REST separado para upstream, (2) limite de conexões simultâneas por domínio em HTTP/1.1 (6 conexões), (3) reconexão é mais básica que Socket.IO, (4) sem suporte nativo a rooms. SSE pode ser adequado para o cenário específico de cotações em tempo real na API pública/landing pages (unidirecional por natureza), mas não substitui a necessidade de WebSocket bidirecional para o fluxo de negociação.

### HTTP Polling (curto ou longo)

O cliente faz requisições periódicas ao servidor para verificar novidades. Descartado porque: (1) latência inerente (proporcional ao intervalo de polling), (2) desperdício de recursos (maioria das requisições retorna vazio), (3) não escala com número de clientes conectados simultaneamente, (4) experiência de usuário inferior para negociação em tempo real. Polling pode ser aceitável como fallback (e Socket.IO já o utiliza automaticamente quando WebSocket não está disponível), mas não como mecanismo primário.

### Mercure

Protocolo de pub/sub baseado em SSE, com hub centralizado e suporte a autenticação via JWT. Descartado porque: (1) ecossistema menor que Socket.IO, especialmente no contexto NestJS/TypeScript, (2) baseado em SSE (unidirecional), com as mesmas limitações para comunicação bidirecional, (3) requer componente de infraestrutura adicional (Mercure hub), (4) comunidade significativamente menor, com menos recursos de debugging e monitoramento disponíveis.

## References

- [Socket.IO documentação oficial](https://socket.io/docs/v4/)
- [NestJS WebSocket Gateways](https://docs.nestjs.com/websockets/gateways)
- [Socket.IO Redis Adapter](https://socket.io/docs/v4/redis-adapter/)
- [Socket.IO vs WebSocket nativo](https://socket.io/docs/v4/how-it-works/)
