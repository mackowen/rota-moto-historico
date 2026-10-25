# Gates — campanha 0304 (checkpoint atual)

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
