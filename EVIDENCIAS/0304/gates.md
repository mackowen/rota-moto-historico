# Gates — campanha 0304 (checkpoint atual)

## Intervenção QR, layout paisagem e vazio de Rotas — 2026-10-25

| Gate | Estado | Evidência e limite |
|---|---|---|
| QR: erro genérico corrigido | PASS técnico | Regressão HTTP reproduz a classificação errada e verifica 503 `PRESENCE_QR_UNAVAILABLE`, request ID e diagnóstico sem segredo. |
| Serviço emite QR assinado com chave configurada | PASS unitário | Chave sintética e cliente DB falso; tenant/nonce e ausência de consulta da fila confirmados. Não é emissão no runtime autenticado. |
| QR renderizado e check-in Restaurante↔Motoboy autenticado | BLOCKED | Runtime E2E sem referência/ID de chave; sem sessão sintética autorizada nesta execução. Nenhuma emissão real ou leitura foi declarada. |
| Layout horizontal Início/Pedidos/Rotas/Motoboys | PASS técnico / aprovação física pendente | Chromium/CDP com CSS real 8083, cache/SW bypassados, fixture DOM: 104 combinações de viewport, módulo e tema, sem overflow. Em 720×320, conteúdo principal aumentou (Rotas 314→641 px; Pedidos 333→644 px). |
| Estado vazio “Nenhuma rota planejada” | PASS estrutural / revisão visual pendente | SVG e estilos semânticos conferidos em screenshots fixture claro/escuro; não há ação fictícia. |
| Chrome Android físico e comparação às novas imagens do proprietário | BLOCKED/PENDING | Capturas novas não encontradas localmente; teste foi Chromium/CDP emulado. |
| Regressão Restaurante | PASS | `npm test` completo (exit 0), `node --check` nos JS/SW alterados e `git diff --check`. |
| G14 — aprovação visual do proprietário | **FAIL** | Estado mantido até aprovação expressa; nenhuma fixture pode promovê-lo. |

G8–G13 não avançam: não houve check-in autenticado/cross-app, sincronização operacional ou persistência remota nova. Campanha 0304 segue PARTIAL/aberta; pendências anteriores continuam vigentes.

| Gate | Estado | Evidência/limite |
|---|---|---|
| G0 — Referências | PASS | Três referências abertas, medidas, identificadas e SHA-256 registrados. |
| G1 — Auditoria | PARTIAL | Contratos e serviços centrais inventariados; testes operacionais e conflitos não executados. |
| G2 — Design System | PARTIAL | Tokens/regras V2 reaproveitados; fidelidade visual comparativa Rotas pendente. |
| G3 — Celular | PARTIAL | CDP fixture 320/360/390/430 claro/escuro; cinco filtros em linha e 27,6–27,8 px entre último painel e navegação fixa no scroll inferior. E2E pós-patch/Android físico pendentes. |
| G4 — Tablet | PARTIAL | Grid dedicado 600–1023px; referência verificada, render final não comparado. |
| G5 — PC | PARTIAL | Home/Pedidos em 1024–1920, Rotas em 1280–1920; detalhes Pedidos 320–380 px. Fixtures comparativas, conteúdo autenticado e fidelidade final pendentes. |
| G6 — Mapa/cartografia | PARTIAL | Causa do fallback Carto sem chave corrigida; Leaflet raster OSM exibiu 20 tiles no Chromium sem GPU. Rede móvel, resize e E2E autenticado pendentes. |
| G7 — Planejamento | PARTIAL | Plano sintético com sequência de 2 paradas criado/salvo/readback em Browser; edição, ACK servidor, regras de duplicidade sob concorrência e sincronização cross-app não testados. |
| G8 — Persistência | PASS (escopo local-first) | E2E autenticado criou planejamento com 2 paradas, salvou e confirmou seleção/readback no IndexedDB após reload. Confirmação remota/ack permanece fora deste gate e depende de G10. Evidência `auth-e2e-navigation-2026-10-24.json`. |
| G9 — Integração | PARTIAL | MFA real em duas UIs, criação/aceite e projeção bidirecional; em cluster descartável, readback independente após encerramento do runner confirmou Delivery/eventos duráveis e evento canônico no detalhe Pedidos. UI Restaurante após retirada ainda pendente. Ver `e2e-durable-cross-app-2026-10-24.json`. |
| G10 — Sync/concorrência | PARTIAL | Commits independentes, conflitos de revisão, idempotência, retry e isolamento backend comprovados; sync de aceite/retirada com ACK e readback independente comprovados. Reload ainda offline e concorrência operacional entre UIs pendentes. |
| G11 — Segurança/RBAC | PARTIAL | No E2E backend isolado, isolamento entre tenants e rejeição de sessão não proprietária foram exercitados. Matriz completa de payload adulterado, sessão expirada durante sync, permissões de rota e replay cross-tenant ainda não executada nos dois clientes. |
| G12 — Offline/resiliência | PARTIAL | Retirada offline, outbox pendente, reconexão, ACK e commit independente foram comprovados. Reload ainda offline, cancelamento/RETURN e falhas parciais continuam pendentes. |
| G13 — E2E | PARTIAL | MFA real nos dois apps, criação, aceite, eventos, PostgreSQL durável independente e reconexão offline passaram no escopo documentado. E2E pós-patch visual, reload offline, RETURN, concorrência UI e RBAC adversarial não executados. |
| G14 — Fidelidade visual | FAIL | Reprovação expressa do proprietário. Ajustes técnicos e capturas fixture não alteram este estado; aprovação final pertence exclusivamente ao proprietário. |
| G15 — Sem regressões | PARTIAL | `npm test` Restaurante completo e direcionados passaram nesta intervenção; E2E autenticado pós-patch e Android físico pendentes. |

## Refinamento visual e rolagem — 2026-10-24

| Área | Estado | Evidência/limite |
|---|---|---|
| Pedidos desktop | PARTIAL | Lista resumida sem endereço repetido, painel completo sticky abaixo do cabeçalho, ação primária única; renderizador/ações reais em fixture sintética. |
| Pedidos tablet 700–850 px | PASS (fixture) | Lista e detalhes empilhados; seleção por teclado foca o título e enquadra o painel após `scrollend` (`panelTop=296,1px`, `headerBottom=76px`, viewport 768×1024). |
| Rotas desktop | PARTIAL | Cartões em 1024–1920 px empilham conteúdo e ação compacta; estrutura lista/mapa preservada. Dados e coordenadas sintéticos sem geografia; comparação visual final pendente. |
| Rotas celular | PARTIAL | Nenhum novo controle ou altura adicionados; filtros, mapa, legenda, cartões e reserva inferior preservados. Fixture 320–430 px, temas claro/escuro. |
| Início desktop | PARTIAL | Renderer V2 revisado com quatro KPIs, uma entrega e gráficos sintéticos; espaço restante corresponde à baixa densidade de registros e não foi artificialmente preenchido. |
| Rolagem sticky | PASS (fixture) | Lista extensa rolada ao topo/fim; seleção de detalhe medida depois de `scrollend`. Nenhum bloqueio reproduzível de acesso. Chrome Android físico pendente. |
| Testes automatizados | PASS | `npm test` completo terminou exit 0; testes dirigidos, `node --check app.js`, `node --check sw.js` e `git diff --check` passaram. |
| E2E autenticado nesta intervenção | BLOCKED | Instância disponível exibia login; não havia tenant/sessão MFA sintéticos isolados com limpeza verificável. Nenhum bypass ou escrita em banco oficial. |
| G14 — Fidelidade/aprovação | **FAIL** | Reprovação anterior continua em vigor. Fixtures e imagens técnicas não substituem avaliação do proprietário. |

102 cenários de Chromium/CDP (Rotas 9 larguras × 2 temas × 4 densidades; Pedidos 5 larguras × 2 temas × 2 densidades e seleção; Início 4 larguras × 2 temas) foram registrados em [`refinamento-final-2026-10-24`](refinamento-final-2026-10-24/README.md). A composição da imagem de referência PC é mais completa do que o fixture, portanto G14 não avança. A Campanha 0304 segue PARTIAL/aberta; nenhuma pendência anterior foi encerrada e 0305 não foi iniciada.

## Intervenção visual e responsiva — 2026-10-24

| Área | Estado | Evidência/limite |
|---|---|---|
| Rotas mobile | PARTIAL | Cinco filtros em linha; abas sem contagens duplicadas; vazio compacto; 27,6–27,8 px de folga no scroll. Fixture, safe-area física pendente. |
| Home desktop | PARTIAL | Saudação e header compartilhado; 32 combinações Home/Pedidos comparadas antes/depois em renderer CDP. Autenticação e dispositivo físico pendentes. |
| Pedidos desktop | PARTIAL | Painel de detalhes mediu 320/320/329,3/380 px em 1024/1280/1440/1920; conteúdo sintético. |
| Rotas PC/mapa | PARTIAL | Fallback OSM real carregou tiles no browser; composição com dados operacionais autenticados pendente. |
| Testes automatizados | PASS | `npm test` Restaurante e 8 testes direcionados; checagens JS/ESM e diff. |
| E2E pós-patch | BLOCKED | Fixture de captura não é sessão autenticada; não havia tenant/sessão MFA sintéticos com cleanup verificável nesta rodada. |
| G14 visual | **FAIL** | Reprovação vigente; somente proprietário aprova. |

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


## Continuação — cabeçalhos e cartões de Pedidos (2026-10-24)

| Área/gate | Estado | Evidência e limite |
|---|---|---|
| Header compartilhado e gutters | PASS técnico (fixture) | 130 pares antes/depois; getBoundingClientRect nos quatro lados; nove larguras, cinco páginas, claro/escuro e sidebar aberta/recolhida; zero overlap/overflow. Chrome Android físico pendente. |
| Cartão único por pedido | PASS técnico (fixture/unit) | 72 casos 0/1/5/20; um article por linha de dado, sem painel lateral permanente, Abrir visível, sem overflow. |
| Abrir e imprimir | PARTIAL | Handlers existentes foram exercitados por fixture/unit; fluxo autenticado e impressão física pendentes. |
| Regressão automatizada Restaurante | PASS | `npm test` integral após atualizar expectativas de cache antigas. |
| Publicação servida em 8083 | PASS técnico | SHA-256 de index, design-system.css, orders-v2.css e app.js coincide fonte↔HTTP 200 servido. |
| E2E autenticado | BLOCKED | Nenhuma sessão/tenant sintéticos autorizados com cleanup verificável nesta intervenção; sem bypass e sem escrita oficial. |
| G14 aprovação visual | **FAIL** | Reprovação anterior continua vigente; imagens CDP são fixtures e não autorizam aceite humano. |
| G15 regressões globais | PARTIAL | Suíte automatizada passou; Android físico e jornada autenticada dos módulos não cobertos. |

Medições, método, capturas, status da evidência exploratória anterior e limites: [README cabeçalhos/pedidos](cabecalhos-pedidos-2026-10-24/README.md). Nenhum gate operacional anterior G8–G13 foi ampliado por estes testes visuais/unitários.


## Commits da intervenção visual de 2026-10-24

Implementação Restaurante: `288d62fb38eb78440daf6a8f9e1ce9ce453649a4` (header compartilhado, cartões responsivos, cache e testes). Evidência controlada adicional: `fef04776d70718ea20f3b49d20ac9f218f726156`. Branch `codex/campaign-0304-visual-consolidated`; ambos são commits locais, sem push do app. HEAD final local Restaurante: `193bbb9fb89f67593b1ce1b279f222d843648a6d`; implementação `288d62f`; evidências `fef0477` (header) e `fec751c` (tablet); documentação local `e19d6c9`/`f12a550`; referências e registro de campanha `193bbb9`. Todos locais, sem push do app. Motoboy e Browser QA não alterados.

## Atualização — Pedidos V2 central operacional (2026-10-24)

| Área | Estado | Evidência/limite |
|---|---|---|
| Cartão único e responsivo | PARTIAL | Renderer/CDP sintético em 390, 768, 1280 e 1920 px, dois temas; lista 0/1/5/20 coberta em teste. Não substitui comparação humana. |
| Central operacional | PARTIAL | Elegibilidade/faixa recente e fallbacks testados; distribuição delega fluxo existente. UI autenticada com despacho real não executada. |
| Ação Abrir | PASS (componente) | Um único acionador de detalhe por cartão; ação repetida “Gerenciamento completo” removida e teste de regressão incluído. |
| Persistência/sincronização cross-app | BLOCKED | Sem jornada autenticada de pedido nesta rodada. |
| E2E autenticado | BLOCKED | Sem tenant/MFA sintéticos com cleanup verificável disponível. |
| G14 fidelidade visual | **FAIL** | Reprovação anterior permanece; capturas desta rodada são fixtures sintéticas. |
| Campanha 0304 | PARTIAL | Aberta; pendências anteriores preservadas; sem PASS global ou início da 0305. |

## Atualização — Pedidos V2 responsivo, ajuda e Filtros (2026-10-25)

| Gate/critério desta intervenção | Estado | Evidência e limite |
|---|---|---|
| Largura útil/container e layout lado a lado | PASS técnico (fixture CDP) | A 1024 px, container útil 706,56 px: lista 372,61 + central 317,95, gap 16. Sidebar aberta/recolhida testada; regra é container query. |
| Empilhamento em largura menor | PASS técnico (fixture CDP) | Containers de 320 a 768 px abaixo do limite 680 permanecem empilhados. |
| Filtros e atalho contextual | PASS técnico (fixture CDP) | Filtros 100×44 px, rótulo cabe; disclosure abriu; atalho visível no layout empilhado e oculto em duas colunas. |
| Conteúdo de ajuda operacional | PASS técnico / PARTIAL visual | Orientação encurtada e confirmação junto às ações; comparação humana pendente. |
| Regressões automatizadas | PASS | `npm test` Restaurante completo passou, incluindo novo teste de contrato responsivo; sem validação operacional autenticada nesta rodada. |
| E2E autenticado/despacho | BLOCKED / não executado | Sessão sintética com MFA e limpeza verificável não foi exercitada nesta intervenção. |
| G14 aprovação visual | **FAIL** | Reprovação prévia do proprietário permanece; fixture CDP não é aprovação. |

As medidas, capturas antes/depois e limites estão em `pedidos-layout-controles-2026-10-25/README.md`. G8–G13 permanecem nos estados e escopos históricos; esta correção visual não os amplia. G15 continua PARTIAL em escopo de regressão global. Sem PASS global.

## Atualização pontual — rolagem da Central operacional (2026-10-25)

| Critério | Estado | Evidência/limite |
|---|---|---|
| Causa da barra interna identificada | PASS | `max-height:calc(100vh - 132px)` e `overflow:auto` aplicados ao próprio painel desktop. |
| Rolagem vertical interna removida | PASS técnico | Central `overflowY=visible`, sem max-height; conteúdo curto/volumoso medido em 10 larguras/temas/sidebar. |
| Documento acompanha listas longas | PASS técnico (fixture) | 1280×800 documento 979→2241 px; rolagem documentada, painel `scrollTop=0`. Não é sessão autenticada. |
| Duas colunas/empilhamento e áreas fixas preservados | PASS técnico (fixture) | Regra de container query, aside sticky e cabeçalho permanecem; sem overflow horizontal na matriz. |
| Regressão automatizada | PASS | `npm test` integral Restaurante; teste estático impede retorno a max-height/overflow interno. |
| E2E autenticado / Chrome Android físico | BLOCKED / não executado nesta intervenção | O ambiente usado foi fixture CDP visual sem autenticação; sem declaração de validação operacional/física. |
| Acesso ao fim do painel após rolagem | PASS técnico (fixture CDP) | Em 1280×800, documento scrollTop=1035; ação final totalmente visível; Central scrollTop=0. Captura/JSON no mesmo pacote. |
| G14 — aprovação visual do proprietário | **FAIL** | Aprovação expressa continua pendente. |

As capturas antes/depois e métricas estão em [pedidos-rolagem-central-2026-10-25](pedidos-rolagem-central-2026-10-25/README.md). G8–G13 não avançam; G15 permanece PARTIAL no escopo global. Campanha 0304 PARTIAL/aberta; nenhuma pendência anterior encerrada.

## Motoboys V2 — checkpoint 2026-10-25

| Área | Estado | Evidência/limite |
|---|---|---|
| Referências PC/tablet/celular claro/escuro | PASS (identificação) | Seis referências visuais abertas; caminhos, dimensões e SHA-256 no pacote `motoboys-v2-2026-10-25`. |
| PC responsivo | PARTIAL | Fixture CDP mediu dois painéis quando cabem (1280: 458+458; 1440: 533+533; 1920: 744+744; gap 16); captura 1672×941 claro/escuro. Aprovação visual humana pendente. |
| Tablet responsivo | PARTIAL | Container útil governa layout após sidebar; 768/820/1024 com sidebar expandida empilham; 1024 recolhida oferece 428+428. Sem overflow na fixture; revisão humana pendente. |
| Mobile claro/escuro | PARTIAL | Uma coluna e navegação lista→detalhe, em conformidade com a exigência textual de usabilidade; a referência desenha painéis lado a lado, então a adaptação precisa de avaliação do proprietário. Capturas sintéticas e safe-area/nav presentes. |
| Dados/estados visuais | PASS (fixture) | Renderização 0/1/5/20; avatar apenas iniciais; lease Online/Offline, presença/check-in, execução e elegibilidade distintos (inclusive lease Online sem check-in); sem localização e valores inventados. |
| Busca/filtros/ordenação/seleção | PARTIAL | Renderer e controles cobertos por teste/unit; interação autenticada Browser não executada. |
| Cadastro/edição | BLOCKED | Fluxos existentes preservados, mas sem sessão MFA sintética para validação browser nesta rodada. |
| Distribuição operacional | BLOCKED | Chamador reutiliza `openAssignment()`, valida módulo Pedidos e identidade canônica; despacho real, concorrência e ACK não executados nesta rodada. |
| Regressão automatizada | PASS | `npm test` Restaurante completo, exit 0; alterações de cache cobertas. |
| E2E autenticado cross-app | BLOCKED | Sem usuário/tenant MFA sintético autorizado e ambiente de escrita E2E isolado disponibilizado nesta execução; nenhum bypass ou escrita oficial. |
| G14 — aprovação visual do proprietário | **FAIL** | Reprovação global anterior segue vigente; capturas fixture não mudam o gate. |

Evidências, limites, matriz comparativa e hashes: [`Motoboys V2`](motoboys-v2-2026-10-25/README.md). G8–G13 e suas pendências operacionais conservam os estados anteriores; esta rodada não amplia sincronização, persistência remota ou RBAC. Campanha permanece PARTIAL/aberta.

## Motoboys V2 — refinamento visual e navegação mobile (2026-10-25)

| Gate desta intervenção | Estado | Evidência/limite |
|---|---|---|
| Contraste dos ícones vazios/indicadores nos temas claro/escuro | PASS técnico | CDP: 5,74:1 claro e 6,46:1 escuro nos ícones principais; verde 3,87:1. |
| Indicadores e cartões compactos no celular | PASS técnico / revisão visual pendente | 390×844: indicador 179,5×64,2 px; capturas fixture. |
| Lista inicial sem painel completo de detalhes | PASS técnico | CDP fixture: lista `block`, detalhe `none`. |
| Seleção abre apenas detalhes; voltar restaura lista | PASS técnico (fixture CDP) | Detalhes `grid`, lista `none`; troca para Localização e retorno concluídos. |
| Preservação de rolagem não-zero após retorno | PARTIAL | Runner não conseguiu produzir scroll não-zero; não se declara restauração integral. |
| Tablet/PC e ausência de overflow horizontal | PASS técnico (fixture) | Viewports registrados em `geometry.json`; sem overflow medido. |
| Regressão automatizada Restaurante | PASS | `npm test` completo, exit 0; `node --check` e `git diff --check`. |
| E2E autenticado, dispatch, CRUD, sync e RBAC | BLOCKED/não executado | Renderer/CDP fixture não prova sessão ou operações reais. |
| Chrome Android físico e novas capturas do proprietário | BLOCKED/PENDING | Não disponíveis nesta execução. |
| G14 — aprovação visual do proprietário | **FAIL** | Somente aprovação expressa do proprietário altera o estado. |

Evidências completas e hashes: `motoboys-v2-refinamento-2026-10-25/README.md`. G8–G13 não avançam; G15 permanece PARTIAL na cobertura global. Campanha PARTIAL/aberta; sem PASS global e sem 0305.

### Adendo QR de presença — 2026-10-25

| Requisito | Estado | Evidência/limite |
|---|---|---|
| Diagnóstico da configuração de assinatura E2E | PASS | Unit E2E sem `ROTAMOTO_DELIVERY_QR_SIGNING_KEY_REF` e `ROTAMOTO_DELIVERY_QR_KEY_ID`; chave Ed25519 cifrada e lida com contexto correto. |
| Serviço E2E reiniciado e pronto | PASS | Unit E2E validado por `sh -n`; readiness HTTP 200 em 8787. Serviço oficial 8788 continuou saudável e não foi modificado. |
| Emissão HTTP autenticada/renderização QR | BLOCKED | Sem credenciais MFA sintéticas recuperáveis; nenhum QR emitido. |
| Leitura Motoboy e confirmação de presença | BLOCKED | Jornada autenticada não executada. |
| Persistência/readback, tenant e elegibilidade pós check-in | BLOCKED | Nenhuma operação durável iniciada. |
| Concorrência/replay/QR adversarial nesta execução | BLOCKED | A suíte disponível deixa registros persistentes sem cleanup autorizado; não executada. |
| Regressões direcionadas | PASS no escopo | `test-logistics-domain.js`, `test-logistics-http.js`, `node --check` dos módulos QR e `git diff --check`; não são E2E de QR. |
| Banco oficial e publicação de aplicativos | PASS | Nenhuma escrita oficial; sem commit/push de aplicativo. |
| G14 — aprovação visual | **FAIL** | Estado anterior permanece. |

Relatório: [`qr-signing-e2e-setup-2026-10-25`](qr-signing-e2e-setup-2026-10-25/README.md). A configuração da chave não transforma a jornada operacional em PASS.
# Atualização — login desktop e modal QR (2026-10-26)

| Requisito | Estado | Evidência e limite |
|---|---|---|
| Login 980 CSS px / Chrome Android desktop-mode | PASS técnico | CDP mediu apresentação e formulário lado a lado, gap 39,19 px, ambos y=22 px, sem overflow horizontal; o breakpoint anterior foi reproduzido na captura “antes”. Não foi Chrome Android físico. |
| Login celular/tablet/PC, claro/escuro | PASS técnico de layout | 33 estados CDP; celular ≤600 px mantém formulário prioritário; 768 px retrato empilha; tablet paisagem e PC usam duas colunas. Capturas são browser emulado. |
| Fluxos autenticados do login (MFA, recuperação, convite) | BLOCKED | Sessão 401 esperada e nenhum POST de login enviado; credenciais MFA sintéticas autorizadas não estavam disponíveis. |
| Modal QR — layout responsivo e geometrias | PASS técnico de fixture | 26 medidas, canvas quadrado 220–300 px, sem overflow horizontal, dois temas. Canvas branco em captura é fixture sem token, não QR emitido. |
| QR emitido/assinado em sessão autenticada | BLOCKED | Não houve emissão no runtime autenticado, validação do token ou renovação real nesta rodada. |
| Scan físico/check-in Motoboy e presença persistida | BLOCKED | Nenhuma jornada cross-app foi executada nesta intervenção; gates anteriores continuam valendo. |
| `npm test` Restaurante | PASS | Exit 0 após as alterações de layout/cache e testes QR. |
| Sintaxe e diff | PASS | `node --check app.js`, `node --check sw.js`, `git diff --check`. |
| G14 — aprovação visual do proprietário | **FAIL** | Mantido até aprovação expressa. Captura recente de reprovação não estava acessível localmente; teste CDP emulado não a substitui. |

Campanha 0304 permanece PARTIAL/aberta; G8–G13 não avançam por este trabalho visual. Pendências anteriores, inclusive backlog desde 0257, permanecem abertas. Nenhum aplicativo foi publicado e o banco oficial não recebeu escrita.

## Atualização — Recuperação de acesso/MFA/convite (2026-10-26)

| Requisito | Estado | Evidência e limite |
|---|---|---|
| Recuperação: menu e uma etapa por vez | PASS técnico UI | CDP navegou menu, solicitar código, redefinir senha e MFA; não exibiu formulários simultâneos. |
| Convite exclusivo com retorno | PASS técnico UI | Convite não sobrepõe login nem recuperação; link com token sintético abriu o form existente. |
| Links de email para redefinição/MFA | PASS de navegação client-side | Campo pré-preenchido e tela correta; token usado foi sintético local, sem POST. |
| Celular, tablet, PC e 980 CSS px em claro/escuro | PASS técnico visual | 184 estados, 40 capturas, sem overflow ou exceções; altura reduzida 390×560 confirmou rolagem até ação. Emulação CDP, não Chrome Android físico. |
| Email inválido / submit repetido na UI | PASS client-side | Email inválido parado pelo navegador; nenhuma requisição POST foi emitida. Guardas `working` cobertas por teste de código. |
| Email real, redefinição persistida, expiração/reuso, aprovação MFA e convites autenticados | BLOCKED | Nenhuma identidade/MFA sintética autorizada foi usada. `npm test` não equivale a jornada E2E autenticada. |
| `npm test` Restaurante e testes dirigidos | PASS | Suíte completa exit 0, identity UI/cache/QR/dashboard/dispatch e sintaxe/diff-check passaram. |
| PostgreSQL oficial | PASS de preservação | Nenhuma escrita ou migration nesta intervenção. |
| G14 — aprovação visual do proprietário | **FAIL** | Aguardar inspeção/aprovação expressa. Captura de referência de recuperação não estava disponível localmente. |

Campanha permanece PARTIAL/aberta; integração/auth persistente não avança por testes visuais. Pendências anteriores, inclusive desde 0257, continuam preservadas.


## Correção estrutural Relatórios V2 — Parte 1 (2026-10-26)

| Gate local | Estado | Evidência/limite |
|---|---|---|
| Executivo é padrão e exclui as oito seções detalhadas | PASS | Teste de renderer e DOM/CDP confirmaram painel operacional oculto no Executivo. |
| Alternância das abas sem reload | PASS técnico | Funções atuais do app exercitadas no CDP isolado. |
| Oito seções acessíveis uma de cada vez | PASS técnico | Índice acionado individualmente; uma seção visível em cada mudança. |
| Filtros persistem entre abas | PASS estrutural | Datas e motoboy preservados em teste DOM; atualização de dados autenticada PARTIAL/BLOCKED. |
| Teclado/foco das abas | PASS técnico | Setas e seleção/foco exercitados; leitor de tela não auditado instrumentalmente. |
| Browser responsivo/temas sem overflow | PASS técnico | 26 combinações em 13 viewports; fixture sem overflow/exceções/HTTP inválido. Fidelidade estética PARTIAL. |
| Exportação e fluxos preexistentes | PASS regressão de contrato; E2E PARTIAL | Serializer e testes existentes preservados; download autenticado nesta execução não exercitado. |
| Sessão/RBAC/isolamento e sync | BLOCKED | Browser desta rodada é renderer isolado, sem sessão autorizada. |
| Mapa integrado autenticado | BLOCKED | Não foi consultado com sessão/tenant real; não atribuir PASS com fixture. |
| Android Chrome desktop-mode/físico | BLOCKED | Chromium headless com dimensões emuladas não substitui o device. |
| G14 — aprovação visual do proprietário | **FAIL** | Gate continua pendente de aprovação expressa. |

Evidências: [`Relatórios V2 — separação`](relatorios-v2-separacao-2026-10-26/README.md). Parte 2 visual não iniciada. Campanha 0304 PARTIAL/aberta; 0305 não iniciada.

## Relatórios V2 — acabamento visual Parte 2 — 2026-10-26

| Gate da intervenção | Estado | Justificativa |
|---|---|---|
| Celular retrato claro/escuro | PARTIAL | Fixture cobre 320/360/390/430 px nos dois temas; aprovação e aparelho físico pendentes. |
| Celular paisagem claro/escuro | PARTIAL | 720/800/844/932 px emulados; sem desenhos de referência independentes. |
| Tablet claro | PARTIAL | 768×1024 e 1024×768 medidos; uma composição PC/tablet, sem aparelho físico. |
| PC claro/escuro | PARTIAL | 1280×800, 1440×900 e 1920×1080 medidos; desenho ainda aguarda aceite humano. |
| Abas, filtros persistidos e oito seções | PASS técnico | 20 checks CDP da fixture; sem E2E autenticado. |
| Gráficos e KPIs | PARTIAL | SVG/rosca renderizam; fonte de faturamento indisponível, dados operacionais não autenticados. |
| Rankings e mapa | PARTIAL | Sem geografia inventada; integração real não autenticada. |
| Overflow e responsividade | PASS técnico | 26 viewport/tema sem overflow horizontal; JSON arquivado. |
| Regressões, cache/offline, sintaxe | PASS | 12 testes direcionados, `node --check` em cinco arquivos e `git diff --check`. |
| Acessibilidade/contraste | PARTIAL | Foco/semântica e cores consultados; WCAG instrumental/assistiva não executada. |
| E2E autenticado/Android físico | BLOCKED | Sessão/tenant E2E autorizados e dispositivo Android indisponíveis. |
| G14 aprovação visual | **FAIL** | Somente o proprietário pode aprovar. |

Detalhes: [`relatorios-v2-acabamento-2026-10-26`](relatorios-v2-acabamento-2026-10-26/README.md). Campanha 0304 segue PARTIAL/aberta; 0305 não iniciada. Esta classificação não encerra gates ou backlog anteriores.

## Relatórios V2 — Parte B visual (2026-10-26)

| Gate | Estado | Evidência |
|---|---|---|
| Eixos e barras | PASS técnico | DOM 12 px, marcas distribuídas, contagem de pontos 0/1/5/20 coberta. |
| KPIs e oito seções | PASS técnico | Medições 1440×900 registradas; todas continuam acessíveis. |
| Receita e mapa indisponíveis | PASS renderer | Estados distintos, compacto e retry testado; sem dados fabricados. |
| Responsividade técnica em claro/escuro | PASS em emulação | 28 combinações, sem overflow/erros. |
| Regressão automatizada | PASS | `npm test` completo exit 0. |
| Acessibilidade instrumental | PARTIAL | Semântica/foco cobertos, sem auditoria WCAG externa/leitor de tela. |
| E2E autenticado / Android físico | BLOCKED | Não há autenticação nesta fixture; emulação não é aparelho físico. |
| Fidelidade/aprovação visual | PARTIAL; G14 **FAIL** | Comparação visual arquivada, aguardando aprovação expressa do proprietário. |

Esta matriz não encerra gates anteriores, backlog ou a Campanha 0304. Sem PASS global; 0305 não iniciada.


## Relatórios V2 — Parte C estrutural (2026-10-26)

| Gate | Estado | Evidência |
|---|---|---|
| Cabeçalho PC compartilhado/título único | PASS técnico | Renderer CDP; shell comum reutilizado; arquivo servido verificado por SHA-256. |
| Painel de filtros e expansão persistente | PASS técnico | Um painel no DOM; campos completos em 320 px; avançados fechados por padrão, preservados ao alternar. |
| Navegação operacional e grids | PASS técnico | Duas colunas em largura efetiva estreita, quatro em 1440; texto sem clipping. |
| Responsividade renderer claro/escuro | PASS técnico | 28 casos executivos + 10 operacionais, overflow/cortes zero. |
| Testes e sintaxe | PASS | `npm test` completo exit 0, `node --check`, `git diff --check`. |
| E2E autenticado/dados tenant | PARTIAL | Não executado nesta etapa de apresentação. |
| Chrome Android físico/modo computador | BLOCKED | Dispositivo físico não acessível. |
| Acessibilidade instrumental | PARTIAL | Semântica/foco cobertos, sem leitor de tela ou auditoria externa. |
| Fidelidade/aprovação | PARTIAL; G14 **FAIL** | Esboços acessíveis e capturas técnicas arquivadas; decisão visual final pertence ao proprietário. |

A fixture CDP não equivale a E2E autenticado nem a dispositivo físico. Campanha permanece PARTIAL/aberta e backlog cumulativo preservado.

## Relatórios V2 — Parte D

| Gate | Estado | Evidência |
|---|---|---|
| Origem/situação de sync | PASS técnico | IndexedDB declarado; confirmação exige ciclo completo e tenant atual; estados de pendência, tenant divergente, offline, sessão e erro cobertos. |
| API/PostgreSQL E2E isolado | PASS | `test-domain-sync-postgres.js` em `rotamoto_e2e`; tenant isolation, revisão, handover/idempotência, rollback sem resíduo. |
| Auditoria PostgreSQL oficial | BLOCKED | Papel `rotamoto_auditor` sem senha; nenhuma leitura/paridade nem contorno. |
| Suíte/sintaxe/cache | PASS | `npm test` exit 0, node checks, diff check e hashes Nginx conferidos. |
| Fonte de faturamento | PARTIAL/BLOCKED | Liquidação e razão consolidada de ajustes não comprovadas. |
| Browser autenticado/Android físico | BLOCKED | Sessão autorizada e dispositivo ausentes. |
| G14 | **FAIL** | Aprovação visual expressa pendente. |

Detalhes: [`relatorios-v2-parte-d-2026-10-26`](relatorios-v2-parte-d-2026-10-26/README.md). Campanha 0304 PARTIAL/aberta; Parte E/0305 não iniciadas.

## Relatórios V2 — Parte E financeira — 2026-10-26

| Gate | Estado | Evidência/limite |
|---|---|---|
| Valores brutos/descontos de pedidos canônicos | PASS no escopo do modelo | Unit tests: centavos exatos, moeda, cancelamentos excluídos, cobertura, fuso, CSV; não equivale a pagamento recebido. |
| Fluxo de sync/API/PostgreSQL isolado e reconciliação | PASS isolado | `test-domain-sync-postgres.js`: readback API reconciliado independentemente, replay idempotente, isolamento de empresa e sem resíduos. |
| Recebimentos e contas a receber | BLOCKED | `Order.payments` não tem estado/contrato canônico validado; não inferido de Order ou `Order.status`. |
| Estornos/ajustes | BLOCKED | Sem razão financeira/eventos compensatórios canônicos; valor líquido liquidado não calculado. |
| Repasse pago/margem logística | BLOCKED | `Earning` apenas calcula valor devido; custo real e evento de liquidação não comprovados. |
| API/modelagem financeira nova | PARTIAL | Nenhuma ledger concorrente, endpoint ou migration criada sem ownership/fonte e regra autorizada. |
| PostgreSQL oficial | BLOCKED | `rotamoto_auditor` sem credencial autorizada; nenhuma leitura/escrita/migration oficial. |
| Renderer visual financeiro | PASS fixture; integração PARTIAL | Chromium/CDP real renderer, fixture sintética em 390×844 e 1440×900, 2 temas; DOM sem overflow/erro, não autenticado. |
| Suíte unitária completa `npm test` | PASS | Processo integral finalizado com exit 0; log de execução inclui analytics, sync, billing, segurança, shell/cache e renderer Motoboys. |
| G14 — aprovação visual | **FAIL** | Nenhuma captura técnica substitui aprovação expressa do proprietário. |

Capturas, medidas, fonte/formula e limites: [`relatorios-v2-financeiro-parte-e`](relatorios-v2-financeiro-parte-e/README.md). Campanha 0304 continua aberta/PARTIAL; backlog preservado; 0305 não iniciada.

## Pagamentos e razão financeiro — Parte F (2026-10-26)

| Gate | Estado | Evidência/limite |
|---|---|---|
| Razão imutável e migrations | PASS em E2E | 0052–0054 aplicadas em `rotamoto_e2e`; RLS, imutabilidade, down guarded para razão não vazia. Nenhuma migration oficial. |
| API autenticada, tenant, RBAC/MFA, CSRF | PASS nos cenários E2E | Handlers HTTP reais + PostgreSQL E2E; corrida concorrente single-client harness, multi-connection pendente. |
| Recebimentos manuais e replay | PASS no escopo testado | Pagamentos parciais, concorrência, conflitos e excesso; fonte rotulada `operator_declaration`. |
| Estornos, ajustes, repasses | PASS API E2E parcial | Estorno limitado, ajuste referenciado, payout parcial/limite Earning; formulários de estorno/ajuste/repasse ainda não existem. |
| Relatórios V2 | PASS no renderer/testes; PARTIAL em integração visual | Eventos servidor/tenant confirmados separados de venda/logística; callbacks externos não integrados, sem cobertura completa. |
| Offline e reconciliação | PARTIAL | Outbox IndexedDB e estados/retentativas implementados; sessão financeira browser autenticada não exercitada. |
| `npm test` / E2E / cleanup | PASS | Suíte Restaurante PASS; API/PostgreSQL E2E autenticada PASS, cleanup sem resíduos. |
| Chromium/CDP autenticado | BLOCKED | 401 esperado sem sessão autorizada; tela login sem overflow a 390/768/1440, sem erros JS; fluxos financeiros não navegados. |
| Auditoria e promoção PostgreSQL oficial | BLOCKED | `rotamoto_auditor` ausente; consultas não executadas, segredo não recuperado, nenhuma escrita oficial. |
| G14 / aprovação visual | **FAIL** | Exige aprovação visual expressa. |

**Pendências cumulativas:** obter credencial/acesso autorizado ao papel `rotamoto_auditor`; executar as consultas somente leitura registradas na evidência Parte F; decidir e autorizar promoção em gate separado; implementar callbacks somente quando contrato e autenticação oficial estiverem disponíveis; completar UI de estorno, ajuste e liquidação; testar offline/reconciliação em sessão autenticada; executar browser QA financeiro autenticado e regressão Android quando disponível; obter aprovação visual expressa para G14. Baselines, backlog desde 0257 e Campanha 0304 permanecem preservados/abertos; 0305 não iniciada.

## Financeiro — interface e concorrência — Parte G (2026-10-26)

| Gate | Estado | Evidência/limite |
|---|---|---|
| UI de recebimento, estorno, ajuste e pagamento de repasse | PARTIAL | Formulários integrados ao razão/endpoints; confirmação explícita, erros e estado local pendente. Sem browser autenticado. Valores Earning apresentados como cálculo local; endpoint valida valor canônico. |
| Unicidade e corridas PostgreSQL | PASS | Migration 0055 + teste com duas conexões/backends independentes: referência repetida, excesso de recebimento/estorno/repasse e retry idempotente bloqueados; ajustes simultâneos persistem; cleanup zero. |
| Relatórios e CSV | PARTIAL | CSV separa recebimentos/estornos/ajustes somente do ledger confirmado; analytics e view unitários PASS. Cobertura externa/callback bancário não integrado; validação visual autenticada BLOCKED. |
| Suíte Restaurante `npm test` | PASS | Execução final completa exit 0, incluindo cross-app contract parity; código Motoboy não foi modificado. |
| Integração HTTP/PostgreSQL autenticada | BLOCKED | Fixture `test-domain-sync-postgres.js` falhou antes dos casos com `42501` em insert sintético via `rotamoto_app` sob RLS; não contornado. Teste de concorrência serviço/PostgreSQL isolado passou separadamente. |
| Browser financeiro autenticado | BLOCKED | Nenhuma credencial E2E autorizada disponível; não foi alegado teste visual autenticado. |
| PostgreSQL oficial e promoção | BLOCKED | Não executados. `rotamoto_auditor` indisponível; migrações 0052–0055 não foram aplicadas no oficial. |
| G14 / aprovação visual expressa | **FAIL** | Nenhuma aprovação visual expressa recebida. |

Evidência detalhada/checklist não executado de promoção: [`financeiro-parte-g-2026-10-26`](financeiro-parte-g-2026-10-26/README.md). Restaurante commit local `46d1c4d0288a422a2f589782ea80a21db079d026`; histórico será push exclusivamente via fast-forward. Campanha 0304 permanece aberta; backlog 0257 preservado; 0305 não iniciada.

## Parte H — provisionamento E2E autenticado e reconciliação — 2026-10-26

| Gate | Estado | Evidência/limite |
|---|---|---|
| Causa `42501` e restauração RLS E2E | PASS | `users` global ficou com RLS ligado por teardown da concorrência; migration não o habilita. Estado E2E restaurado e fixture passa a restaurar flags originais. |
| HTTP/API PostgreSQL autenticada | PASS | Pagamentos parciais, estornos/ajustes, payout, MFA/RBAC/CSRF, tenant isolation, idempotência, retry e reconciliação; cleanup zero. |
| Concorrência PostgreSQL duas conexões | PASS | Backends distintos, limites, duplicação, retry e ajustes; sete eventos, cleanup zero. |
| Roteamento de revogação sync | PASS | Só Motoboy destinatário recebe `CANONICAL_ASSIGNMENT_REVOKED`; excluído do canonical pull Restaurante. |
| Browser autenticado | PARTIAL/BLOCKED | Bootstrap e sync passaram; pedido sintético não expôs o seletor `data-detail` esperado. UI de operações financeiras, filtros e exportações não comprovadas. |
| Regressão `npm test` | PASS | Suíte completa exit 0 após sincronizar as referências de cache. |
| Oficial/auditoria/promoção | BLOCKED | Credencial `rotamoto_auditor` ausente. Nenhuma consulta, escrita ou promoção; 0052–0055 somente E2E. |
| G14 | **FAIL** | Aprovação visual expressa pendente. |

Detalhes: [`financeiro-parte-h-2026-10-26`](financeiro-parte-h-2026-10-26/README.md). Commit Restaurante local `7b3ea730b792050edf22bf79840988bade260fa2`; push somente do histórico. Campanha 0304 aberta/PARTIAL, backlog 0257 preservado; 0305 não iniciada.

## Parte I — E2E financeiro autenticado — 2026-10-27

| Gate | Estado | Evidência e limite |
|---|---|---|
| Causa do timeout de detalhe | PASS | Pedido persistido/sincronizado; teste usava seletor obsoleto `[data-detail]` em vez de `[data-orders-open]`. Sem mudança de produção ou aumento genérico de timeout. |
| API autenticada | PASS | Recebimentos, parcial, duplicidade, estorno, ajuste, repasse, CSRF/RBAC/MFA/sessão, tenant e retry exercitados em PostgreSQL E2E. |
| Navegador autenticado | PASS | Fluxos financeiros e relatórios reais com sessão E2E; confirmação cancelada, erros e sessão expirada verificados. Não é fixture visual isolada. |
| Sync offline e reconciliação | PASS | Falha de rede manteve evento pendente local; reconexão confirmou evento e leitura canônica do servidor. |
| Integridade financeira | PASS (E2E) | Referências de recebimento, estorno, ajuste, retry offline e payout lidas no PostgreSQL E2E; sete casos concorrentes/two-connection coerentes e cleanup zero. Não comprova liquidação bancária externa. |
| Relatórios e CSV | PASS | Executivo/Operacional, filtro de dia e export CSV conferidos com eventos persistidos; comercial, financeiro e logístico separados e cobertura visível. |
| Responsividade e teclado | PASS técnico / limite registrado | Relatório em 320/390/430/768/980/1440 px, claro/escuro; modal cabe sem overflow interno, foco/Tab conferidos. Orders V2 sob overlay mede largura acima da viewport em larguras estreitas; limite preexistente não alterado nesta Parte I. |
| `npm test`, sintaxe/diff | PASS | Suite completa exit 0; `node --check tests/test-domain-sync-postgres.js`, `git diff --check`. |
| Chrome Android físico | BLOCKED | Não disponível/verificável na execução; Chromium/CDP emulado não substitui aparelho físico. |
| Banco oficial/auditoria/promoção | BLOCKED | `rotamoto_auditor` indisponível. Nenhuma consulta/escrita no banco oficial; migrations 0052–0055 não promovidas. |
| G14 — aprovação visual do proprietário | **FAIL** | Continua aguardando aprovação expressa; evidências técnicas não mudam o gate. |

Evidência detalhada/capturas: [`financeiro-parte-i-2026-10-27`](financeiro-parte-i-2026-10-27/README.md). Campanha 0304 PARTIAL/aberta; backlog 0257 preservado; 0305 não iniciada.

## Parte J — auditoria de prontidão financeira — 2026-10-27

| Requisito | Estado | Evidência/limite |
|---|---|---|
| Inventário completo | PASS | 55 migrations; oficial 0001–0047, E2E 0001–0055, checksum matching e cadeia sem lacunas; 0041 confirmada aplicada em ambos. |
| Credencial e consulta oficial | PASS (READ ONLY) | `rotamoto_auditor` autenticou no oficial; `transaction_read_only=on`, acesso de ledger/catalog confirmado, sessão encerrada por rollback. |
| Catálogo/schema | PASS | Oficial PostgreSQL 18.6: 853 constraints válidas, 128 índices válidos; custody com RLS/FORCE. Finance tables ainda ausentes. |
| Cobertura e conflitos de dados | BLOCKED | Auditor sem SELECT operacional; pedidos, Earning, permission seeds e role assignments não consultados. Não foi usada outra role. |
| Compatibilidade de migration | PASS no E2E / PARTIAL oficial | checksums locais e constraints E2E validados; oficial ainda está em 0047. Migrations pendentes 0048–0055. |
| Cópia sanitizada/backup | BLOCKED | Nenhum artefato local aprovado/verificável; restore não ensaiado. |
| Ensaio de promoção/tempo/rollback | PARTIAL | Schema E2E final consultado; scripts inspecionados. Sem banco descartável/cópia autorizada, sem aplicar/reverter ou medir duração. |
| Plano de promoção | PASS (preparado) | Checklist de autorização, backup/restore, pre/postflight, parada, ledger/idempotência, janela e recuperação documentado; não executado. |
| Banco oficial sem escrita | PASS | Só SELECT de metadados/ledger em transações read-only; nenhuma migration, grant ou evento financeiro. |
| G14 | **FAIL** | Aprovação visual expressa permanece pendente. |

Matriz e roteiro: [`financeiro-parte-j-2026-10-27`](financeiro-parte-j-2026-10-27/README.md) e [`migration-matrix.md`](financeiro-parte-j-2026-10-27/migration-matrix.md). Campanha 0304 PARTIAL/aberta, backlog 0257 preservado, 0305 não iniciada.

## Parte K — backup/restore e rehearsal 0048–0055

| Gate | Estado | Limite |
|---|---|---|
| K1 backup oficial autorizado/íntegro | BLOCKED | Sem autorização/configuração atual; nenhum dump oficial. |
| K2 restauração de cópia oficial | BLOCKED | Recovery set histórico citado não disponível. |
| K3 migrations no clone | PARTIAL | Pipeline sintético 0001–0055 passou; sem checkpoint 0047→upgrade incremental. |
| K4 integridade pós-migration | PARTIAL | Validação do schema/ledger sintético passou; sem conteúdo oficial. |
| K5 permissões/RLS/isolation | PARTIAL | Harness isolado confirmou RLS/policies; sem auditoria ACL do clone oficial. |
| K6 recuperação/rollback | PARTIAL | Backup/restore sintético PASS; rollback de 0048–0055 não ensaiado. |
| K7 duração/recursos | PARTIAL | Parede ~20 s observados; sem medição por migration/CPU/memória. |
| K8 limpeza | PARTIAL | Cluster encerrado e seu resíduo próprio removido; resíduos preexistentes preservados. |
| K9 prontidão futura | BLOCKED / NO-GO | Dependências oficiais e ensaio incremental pendentes. |
| Banco oficial sem escrita / G14 | PASS / **FAIL** | Oficial intacto; G14 aguarda aprovação visual expressa. |

Detalhes, autorização, runbook de retomada e limitações: [`financeiro-parte-k`](financeiro-parte-k/README.md). Campanha 0304 PARTIAL/aberta; sem promoção ou 0305.
