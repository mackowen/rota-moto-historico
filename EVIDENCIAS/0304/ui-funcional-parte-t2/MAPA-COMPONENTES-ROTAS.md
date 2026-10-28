# Mapa de componentes — Restaurante Rotas

| Camada | Implementação real |
|---|---|
| Item de navegação | `layout()` (app.js): destinos primários `dashboard`, `orders`, `routes`, `bikes`; também `navigationGroups()`/`navGroupMarkup()` |
| Handler | `goTab('routes')` valida `canModule`, define `state.tab`, chama `render()` e atualiza `syncNavActive()` |
| Renderização | `render()` seleciona `routes` do mapa `views`; `routes()` gera conteúdo em `#main[data-module="routes"]` |
| Dados e lista | `routes()` filtra planejamentos não excluídos, entregas elegíveis e motoboys; pagina entregas via `pageSlice('routes', activeDeliveries)` |
| Seleção e detalhe | `bindRoutesV2Selection()` trata `[data-route-select]` e `[data-routes-view]`; `routeCard()` gera cartões; `routeDetailsV2()` gera parada/detalhe |
| Faixa visível | `.routes-v2-filterbar`: `[data-map-mode]` com `all`, `delivery`, `bike`, `route` e `[data-map-overview]` (“Ajustar”) |
| Filtro de lista | Não há cinco campos de lista nem filtro avançado em Rotas V2. Há paginação de entregas; filtros de status/período aparecem em outros contextos, como histórico de corridas |
| Mapa | `initRouteMap()` inicia Leaflet; `bindRouteMapControls()` liga modos e enquadramento; `renderLayers()` atualiza camadas |
| Geometria viária | `loadRouteGeometries()` solicita `/api/logistics/routes/:id/geometry` com sessão; cache por id/versão; `renderRouteLines()` desenha somente resposta `known` válida |
| Modais/painéis | `openRouteEditor()` edita planejamento. Não há diálogo de filtros avançados em `routes()` ou seus seletores atuais |
| CSS | `styles.css`, `design-system.css`, `routes-v2.css`; carregados nessa ordem no `index.html` |
| Estado vazio | `routes-v2-plan-empty`, `routes-v2-empty-inline`, `#routeMapEmpty`; cada estado distingue rota/plano sem inventar dados |

Quatro botões são filtros mutuamente exclusivos de camadas. “Ajustar” não filtra: chama o fit-to-overview. Portanto, a faixa de cinco botões não corresponde a cinco filtros independentes.
