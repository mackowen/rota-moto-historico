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
| G9 — Integração | PARTIAL | Contratos e testes de sync/domínio passaram; jornada autenticada dos dois clientes, com persistência/ACK remoto, não executada neste checkpoint. |
| G10 — Sync/concorrência | PARTIAL | Ensaio backend PostgreSQL em schema E2E isolado comprovou commits visíveis entre sessões independentes, disputas de atribuição/aceite, conflito de revisão, idempotência, retry e isolamento tenant. Não exercitou outbox/inbox real dos clientes, sincronização Route/Delivery Restaurante↔Motoboy nem concorrência de reordenação/cancelamento/devolução. Evidência sanitizada em `e2e-sync-concurrency-resilience-2026-10-24.json`. |
| G11 — Segurança/RBAC | PARTIAL | No E2E backend isolado, isolamento entre tenants e rejeição de sessão não proprietária foram exercitados. Matriz completa de payload adulterado, sessão expirada durante sync, permissões de rota e replay cross-tenant ainda não executada nos dois clientes. |
| G12 — Offline/resiliência | PARTIAL | Testes automatizados cobrem partes do protocolo e o ensaio backend cobre retry/idempotência; não foram exercitados outbox offline após fechar/reabrir clientes, ACK remoto real e recuperação cross-app. |
| G13 — E2E | PARTIAL | MFA real sintético, navegação Início↔Rotas, Leaflet e salvamento/readback local passaram; ensaio PostgreSQL autenticado com sessões independentes cobre concorrência logística no backend. A jornada ponta a ponta pelos dois clientes, outbox/inbox, ACK cross-app e retomada offline não foi executada. O CDP compartilhado `9222` estava indisponível nesta checagem; sites 8083/8084 e APIs 8787/8788 responderam. Ver `auth-e2e-navigation-2026-10-24.json` e `e2e-sync-concurrency-resilience-2026-10-24.json`. |
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
