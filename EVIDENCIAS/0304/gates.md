# Gates — campanha 0304 (checkpoint atual)

| Gate | Estado | Evidência/limite |
|---|---|---|
| G0 — Referências | PASS | Três referências abertas, medidas, identificadas e SHA-256 registrados. |
| G1 — Auditoria | PARTIAL | Contratos e serviços centrais inventariados; testes operacionais e conflitos não executados. |
| G2 — Design System | PARTIAL | Tokens/regras V2 reaproveitados; fidelidade visual comparativa Rotas pendente. |
| G3 — Celular | PARTIAL | Layout mapa-primeiro implementado; Browser autêntico pós-change bloqueado. |
| G4 — Tablet | PARTIAL | Grid dedicado 600–1023px; referência verificada, render final não comparado. |
| G5 — PC | PARTIAL | Lista/mapa/detalhe em painéis; render final não comparado. |
| G6 — Mapa/cartografia | PARTIAL | Leaflet e serviços existentes preservados; geocode tácito removido; falha/resize/tiles E2E pendentes. |
| G7 — Planejamento | PARTIAL | Plano sintético com sequência de 2 paradas criado/salvo/readback em Browser; edição, ACK servidor, regras de duplicidade sob concorrência e sincronização cross-app não testados. |
| G8 — Persistência | PASS (escopo local-first) | E2E autenticado criou planejamento com 2 paradas, salvou e confirmou seleção/readback no IndexedDB após reload. Confirmação remota/ack permanece fora deste gate e depende de G10. Evidência `auth-e2e-navigation-2026-10-24.json`. |
| G9 — Integração | PARTIAL | E2E com MFA real nas duas UIs: criação no Restaurante, ACK/projeção local, pull e entrega disponível no Motoboy; aceite Motoboy aceito pela API e projeção canônica `ACCEPTED` recebida pelo Restaurante. Fixture rollback-only, sem commit durável cross-process; loja local de eventos do Restaurante não mostrou linha e Orders renderizado não foi conferido. Evidência `e2e-cross-app-browser-2026-10-24.json`. |
| G10 — Sync/concorrência | PARTIAL | Ensaio backend PostgreSQL em schema E2E isolado comprovou commits visíveis entre sessões independentes, disputas de atribuição/aceite, conflito de revisão, idempotência, retry e isolamento tenant. E2E Browser também observou ACK de criação/aceite e entrega de evento após reconexão, mas rollback-only; replay cross-app durável e concorrência operacional entre clientes ainda não testados. Evidências `e2e-sync-concurrency-resilience-2026-10-24.json` e `e2e-cross-app-browser-2026-10-24.json`. |
| G11 — Segurança/RBAC | PARTIAL | No E2E backend isolado, isolamento entre tenants e rejeição de sessão não proprietária foram exercitados. Matriz completa de payload adulterado, sessão expirada durante sync, permissões de rota e replay cross-tenant ainda não executada nos dois clientes. |
| G12 — Offline/resiliência | PARTIAL | Ação de retirada offline criou outbox pendente; após reconexão, reload e sync retornaram `accepted`, estado virou `acknowledged` e pendências zeraram. Não se testou fechar/reabrir ainda offline nem visibilidade ACK em processo independente com commit durável. |
| G13 — E2E | PARTIAL | Duas UIs autenticadas por MFA real, criação Restaurante→Motoboy, aceite Motoboy→projeção Restaurante e pendência offline→ACK após reconexão passaram em fixture rollback-only. O journey não provou commit PostgreSQL durável cross-process, linha DeliveryEvent no store local do Restaurante, texto final de Orders, fluxo RETURN, replay/tenant adversarial ou ciclo de reload offline. CDP 9222 indisponível; Chromium isolado 9223 funcionou. Ver `e2e-cross-app-browser-2026-10-24.json`. |
| G14 — Fidelidade visual | FAIL | Reprovação expressa do proprietário. Ajustes técnicos e capturas fixture não alteram este estado; aprovação final pertence exclusivamente ao proprietário. |
| G15 — Sem regressões | PARTIAL | Testes direcionados de mapas/logística/contrato passaram; regression Browser Início/Pedidos/Motoboys autenticado bloqueado. |

## Checkpoint documental e E2E — 2026-10-24

Os estados acima são a classificação canônica vigente. Testes unitários e de contrato são evidência de domínio/integração; renderers isolados/CDP fixtures são evidência estrutural; nenhum deles é E2E autenticado operacional. No follow-up de 2026-10-24, MFA e sessão válida após reload foram confirmados; `auth-ready` e `app-ready` ocorreram, `#app`/`#main` permaneceram montados, sem `auth-revoked`. O bootstrap inicia em dashboard; o mapa não existe até a navegação de Rotas. A tentativa de navegação posterior ainda não montou o módulo e a causa não está comprovada. Nenhum patch de produção ou bypass foi feito. O diagnóstico anterior permanece preservado e o follow-up está vinculado em G13.

Os identificadores adicionais passam a ser **G16 Integridade dos repositórios**, **G17 Histórico e evidências**, **G18 Política de publicação**. A numeração suplementar antiga permanece documentada como nomenclatura histórica em `adendo-desktop/gates.md`: suplemento antigo G15→atual G16, antigo G16→atual G17, antigo G17→atual G18. G15 da matriz principal continua “Sem regressões”.

Não há PASS global. A tela de login e render isolado do renderer não são aceites como comparação final de aplicação.


## Continuação autenticada de navegação — 2026-10-24

A classificação G8/G13 acima foi atualizada com a evidência desta execução, sem apagar os relatórios históricos. O E2E completou MFA real em tenant sintético; cliques CDP navegaram Início→Rotas→Início→Rotas; Leaflet inicializou; filtro foi exercitado; um planejamento sintético de duas paradas foi salvo e confirmado localmente após reload. Fixture em `rotamoto_e2e`, rollback-only. A tela/medidas não constituem referência visual nem aprovam G14. G10 continua BLOCKED para sincronização/conflitos; G13 fica PARTIAL até os cenários operacionais restantes serem executados. O parágrafo legado abaixo descreve o estado anterior ao resultado e deve ser lido apenas como checkpoint histórico, não como classificação vigente.

Causa demonstrada para o bloqueio observado neste runner: o predicado de reload consultava prontidão do shell sem exigir identidade de documento nova; por isso podia avançar com o documento anterior durante o unload. Com a espera pelo `performance.timeOrigin` alterado, documento completo, shell montado e sessão validada, a navegação passou. Não foi observado defeito de autenticação/guard/roteamento nesta jornada; nenhuma proteção foi contornada. O Browser QA ganhou helper e testes de regressão locais, sem push. Ver [evidência sanitizada](auth-e2e-navigation-2026-10-24.json).

## E2E PostgreSQL, concorrência e resiliência — 2026-10-24

`npm test` passou no Restaurante e no Motoboy; os testes PostgreSQL de domínio/sync e logística do Restaurante passaram. O teste de domínio usa transação rollback-only e permanece classificado apenas como cobertura de contrato/serviço, não como prova de persistência durável. Para responder ao requisito de commits independentes, uma cópia temporária do ensaio logístico existente foi adaptada fora dos repositórios: utilizou schema único descartável derivado das migrations E2E, sessões autenticadas independentes e transações comprometidas. Foram observados conflitos de revisão na disputa de atribuição, rejeição do não proprietário na aceitação, idempotência de retry/recibo, bloqueios de despacho/disponibilidade e isolamento tenant. A visibilidade entre PIDs PostgreSQL distintos foi confirmada. Ao fim, o schema foi removido e o manifest confirmou zero schemas residuais. Esta é evidência PASS_SCOPE de concorrência/backend logístico, não confirmação de sincronização operacional dos dois clientes.

Não foi executada a jornada autenticada Restaurante UI → IndexedDB/outbox → API → PostgreSQL → Motoboy UI/IndexedDB e o caminho inverso de eventos. Embora os sites 8083/8084 e APIs 8787/8788 estivessem respondendo, CDP compartilhado em 9222 não estava disponível na checagem e não se iniciou um fluxo alternativo que pudesse confundir o resultado. Tampouco foi executado ciclo offline fechar/reabrir/reconectar com ACK remoto. Nenhum dado foi escrito no banco oficial `rotamoto`; nenhuma migration oficial foi aplicada. A evidência sanitizada e sem IDs sintéticos está em [`e2e-sync-concurrency-resilience-2026-10-24.json`](e2e-sync-concurrency-resilience-2026-10-24.json).

G8 permanece PASS somente para o readback local-first já demonstrado. G9 PARTIAL; G10 PARTIAL (concorrência backend delimitada, sincronização cross-app pendente); G11 PARTIAL; G12 PARTIAL; G13 PARTIAL; G14 **FAIL**; G15 PARTIAL. A campanha continua PARTIAL/aberta, sem aprovação visual e sem início da 0305.

## E2E cross-app autenticado e reconexão — 2026-10-24

O CDP compartilhado `9222` não estava ativo; uma instância Headless Chrome isolada (CDP `9223`, perfil temporário) permitiu duas sessões de navegador/origens independentes. Ambas as interfaces concluíram login e MFA real com o mesmo tenant sintético; nenhum cookie/token foi registrado. Não houve exceção JS nem HTTP 5xx observado. O fluxo de criação pela UI Restaurante foi persistido no IndexedDB, recebeu status de operação `accepted` e projeção ACK canônica; o outbox Restaurante ficou sem pendências. Motoboy fez pull de duas páginas, persistiu a Delivery canônica no IndexedDB e o botão Aceitar acionou um DeliveryEvent aceito. O pull subsequente do Restaurante atualizou sua projeção local para `ACCEPTED`.

Na parte offline, a ação de retirada feita sem rede criou `DELIVERY_PICKED_UP` pendente. Após reconectar, recarregar e aguardar o novo documento autenticado, `syncNow` recebeu `accepted`, a linha passou a `acknowledged` e `pendingCount` chegou a zero. Isso comprova retomada outbox no cliente dentro desta fixture; não comprova fechar/reabrir enquanto ainda offline. O relatório do runner possui um booleano derivado de consulta ao store `deliveryEvents` que ficou falso porque o fluxo não criou linha nesse store; a classificação usa o resultado direto do sync e os estados do outbox, sem tratar aquele booleano como falha da reconexão.

**Limites mantidos:** o ciclo dos dois clientes usou fixture `rotamoto_e2e` rollback-only, portanto não houve commit PostgreSQL durável visível em outro processo após o run. O ACK foi observado na resposta/projeção do cliente, não como confirmação de transação persistida independente. Motoboy→Restaurante convergiu a projeção `Delivery.status=ACCEPTED`, porém `deliveryEvents` local do Restaurante não continha linha correspondente e o texto final da linha Orders não foi assertado. Não foram exercitados retorno após retirada, replay em duas sessões, adversarial cross-tenant/RBAC/sessão expirada nem concorrência operacional entre as UIs. A fixture terminou `COMPLETED`; auditoria somente leitura encontrou zero empresa/membership e zero linhas em 41 tabelas com escopo de empresa. Banco oficial permaneceu sem escrita e sem migrations. Relatório sanitizado: [`e2e-cross-app-browser-2026-10-24.json`](e2e-cross-app-browser-2026-10-24.json).

G8 segue PASS apenas para persistência local-first. G9–G13 permanecem PARTIAL com escopos delimitados; G14 continua **FAIL** por decisão do proprietário e G15 PARTIAL. A campanha continua aberta e sem PASS global; 0305 não foi iniciada.

## Tentativa de commit durável e diagnóstico DeliveryEvent — 2026-10-24

`npm test` passou novamente nos dois aplicativos (exit 0). Foi criada uma instância PostgreSQL temporária e isolada, com migrations E2E 0001–0051; comparação de ACLs foi somente leitura no `rotamoto_e2e` compartilhado e privilégios de runtime foram aplicados somente ao cluster temporário. Chromium/CDP isolado 9223 respondeu. Ainda assim, o provisionamento de tenant do fixture falhou com HTTP 500 antes da autenticação e antes de abrir o fluxo no navegador. Não foram observados commits de operação, nem foram executados cancelamento/devolução, concorrência de UI, RBAC adversarial ou reload ainda offline. O cluster temporário foi parado e seu diretório removido; 9223 foi fechado. Banco oficial e E2E compartilhado permaneceram sem escrita. Evidência sanitizada: [`e2e-durable-attempt-2026-10-24.json`](e2e-durable-attempt-2026-10-24.json).

Investigação de código indica que `DeliveryEvent` usa `eventId` como identidade do evento e `entityId`/`canonicalId` como identidade canônica relacionada; o reconciliador Restaurante armazena o fato recebido no store `deliveryEvents`. O verificador da execução anterior filtrava somente por `deliveryId`, então a ausência reportada é provavelmente um falso negativo do query de verificação. Isso ainda não foi confirmado por readback browser bem-sucedido nesta tentativa. Nenhum código de aplicação foi alterado.

G8 permanece PASS exclusivamente para IndexedDB/local-first. G9 PARTIAL; G10 PARTIAL; G11 PARTIAL; G12 PARTIAL (reconexão após reload online comprovada anteriormente, reload ainda offline pendente); G13 PARTIAL; G14 **FAIL**; G15 PARTIAL. Sem PASS global; campanha aberta e 0305 não iniciada.

## Provisionamento corrigido e sync durável — 2026-10-24

**Causa raiz comprovada do 500 de provisionamento:** o cluster PostgreSQL descartável havia executado migrations, mas não recebeu a ACL runtime existente no E2E funcional para `rotamoto.provisioning_requests`. A primeira consulta de `provisionInitialOwner` foi negada; reproduzido com `rotamoto_app` como SQLSTATE `42501`. Após conceder apenas SELECT/INSERT/UPDATE nessa tabela no cluster temporário, o tenant foi provisionado. A etapa seguinte expôs outra ACL ausente, `recovery_tokens`, necessária para confirmação de MFA; reproduziu-se o HTTP 500 nessa etapa e a concessão mínima temporária permitiu concluir MFA. Nenhuma migration ou ACL persistente foi alterada.

Com as ACLs mínimas temporárias, duas sessões Browser autenticadas por MFA real concluíram: criação de entrega no Restaurante, recebimento e aceite na UI Motoboy, pull da projeção e evento no Restaurante. A consulta corrigida associou `DeliveryEvent.entityId` a `Delivery.sync.canonicalId`: encontrou um fato no `deliveryEvents` local. Ao abrir o pedido e expandir “Gestão avançada”, a tela de histórico técnico exibiu `DELIVERY_ACCEPTED`. A verificação SQL independente, depois do encerramento do runner, encontrou no último pedido sintético uma Delivery `PICKED_UP` e os eventos `DELIVERY_ACCEPTED` e `DELIVERY_PICKED_UP`; leitura somente leitura em conexão separada, sem registrar IDs do pedido. Assim, a ausência anterior era falso negativo do verificador, não defeito demonstrado do reconciliador.

A retirada offline permaneceu pendente até reconexão; o sync retornou `accepted`, ambos os eventos ficaram `acknowledged` e a outbox ficou zerada. Limite: não houve reload enquanto ainda offline e a UI Restaurante não foi sincronizada após a retirada posterior. Cancelamento/devolução, conflitos de UI e matriz adversarial browser não foram executados. `npm test` passou nos dois apps. O cluster PostgreSQL e perfil Chromium temporários foram removidos, CDP 9223 encerrado, sem escrita em `rotamoto` oficial ou no E2E compartilhado. Evidência: [`e2e-durable-cross-app-2026-10-24.json`](e2e-durable-cross-app-2026-10-24.json).

G8 PASS continua limitado à persistência local-first definida para esse gate; a durabilidade PostgreSQL do fluxo específico está comprovada como evidência complementar. G9 PARTIAL (criação/aceite e histórico convergiram; atualização da retirada na UI Restaurante ainda pendente); G10 PARTIAL; G11 PARTIAL; G12 PARTIAL (reconexão/outbox passou; reload ainda offline pendente); G13 PARTIAL; G14 **FAIL**; G15 PARTIAL. Sem PASS global; campanha aberta e 0305 não iniciada.

## Adendo visual consolidado — 2026-10-24

| Gate | Estado | Evidência desta intervenção |
|---|---|---|
| Sidebar/header | PASS técnico / PARTIAL visual | Renderizador emite um nome por item; toggle/tooltip testados; header compartilhado preservado. Não houve E2E RBAC novo. |
| Rotas mobile | PARTIAL | 320–430 px, dois temas; mapa antes dos indicadores, abas compactas, card sintético e sem sobreposição na fixture. |
| Tablet | PARTIAL | Retrato em coluna única; paisagem lista+mapa; navegação física pendente. |
| PC | PARTIAL | Estado sem seleção e seleção sintética medidos até 1920 px; tiles reais pendentes. |
| Testes Restaurante | PASS | `npm test`, `test-routes-v2.js`, `test-navigation-shell-renderer.js`, checagens JS/diff. |
| E2E autenticado pós-patch | BLOCKED | Fixture CDP não autentica; não havia tenant MFA sintético provisionado com limpeza verificável nesta execução. |
| G14 aprovação do proprietário | **FAIL** | A reprovação anterior permanece; aguarda aprovação expressa. |

A descrição completa, medições, hashes das referências e capturas estão em [intervencao-consolidada-2026-10-24](intervencao-consolidada-2026-10-24/README.md). Os demais gates operacionais G8–G13 mantêm exatamente os limites do checkpoint E2E durável imediatamente acima; esta atualização não fecha pendências anteriores.
