# Filtros de Rotas

## Implementação

Restaurante `app.js`, `initRouteMap()` ligava diretamente os modos `all`, `delivery`, `bike`, `route` e o controle de enquadramento. A marcação ativa e `aria-pressed` eram atualizadas junto com a renderização das camadas, mas não havia unidade isolada para exercitar os cliques sem Chromium.

## Correção

Extraído `bindRouteMapControls(buttons, overviewButton, fitOverview, renderLayers)` em `app.js`. Aceita apenas os quatro modos documentados, ignora controles desabilitados, sincroniza estado acessível e classes, atualiza camada e mantém o filtro ao enquadrar todos os elementos. `tests/test-routes-v2.js` executa os botões DOM de cada modo e o quinto controle de ajuste.

## Resultado

- `node tests/test-routes-v2.js`: PASS; seleciona cada modo, confirma exclusividade e `aria-pressed`, confirma rerender, bloqueia botão desabilitado e restaura “Todos”.
- `npm run assets:sync` e `npm run assets:check`: PASS após alteração.

A fila/lista depende de dados reais e não foram criadas rotas fictícias. A borda fantasma e fechamento de modal externo não foram reproduzidos no código disponível; não foi feito ajuste CSS especulativo. Inspeção visual nos viewports e confirmação da borda seguem **BLOCKED** sem sessão autenticada de Browser QA.
