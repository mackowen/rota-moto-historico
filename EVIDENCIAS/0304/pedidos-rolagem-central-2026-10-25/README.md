# Pedidos V2 — rolagem da Central operacional (2026-10-25)

## Diagnóstico

A regra desktop em `orders-v2.css`, dentro da container query `orders-v2-page (min-width:680px)`, aplicava `max-height:calc(100vh - 132px)`, `overflow:auto` e `overscroll-behavior:contain` diretamente em `.orders-v2-operations`. Os containers ancestrais (`.orders-v2-workspace`, `.orders-v2-side`, `#main` e documento) não impunham altura/overflow interno. Com bastante conteúdo, a Central criava seu próprio scroller enquanto o documento preservava praticamente só a altura da coluna esquerda.

A captura `before-1280-light-expanded.png` e `before-measurements.json` reproduzem a regra anterior exatamente como estava antes do patch, aplicada como regra temporária sobre o CSS servido. A captura `after-1280-light-expanded.png` e `after-measurements.json` usam a regra corrigida do CSS servido. O conteúdo é sintético; não é pedido real nem sessão operacional autenticada.

## Comparação geométrica

`scrollHeight / clientHeight / overflowY / max-height` da Central. Valores no tema claro, sidebar expandida; as medições completas incluem temas claro/escuro e sidebar recolhida nos viewports desktop.

| Viewport | Antes | Depois | Documento antes → depois |
|---|---|---|---|
| 1024×768 | 1961 / 634 / `auto` / 636 px | 1946 / 1946 / `visible` / `none` | 942/768 → 2253/768 |
| 1280×800 | 1924 / 666 / `auto` / 668 px | 1924 / 1924 / `visible` / `none` | 979/800 → 2241/800 |
| 1920×1080 | 1924 / 946 / `auto` / 948 px | 1924 / 1924 / `visible` / `none` | 1265/1080 → 2248/1080 |

Após o patch, a rolagem Chromium moveu o documento (`pageYOffset` positivo) e manteve `panelScrollTop=0`; no estado medido em 1280×800, documento `scrollHeight=2241`, `clientHeight=800`, Central `scrollHeight=clientHeight=1924`, `overflowY=visible`. O teste confirma que a rolagem acontece no documento e não em uma barra interna da Central.

## Estados e matriz

- Estado reduzido: 1 pedido em espera, 0 motoboys elegíveis e mensagem de erro sintética.
- Estado volumoso: 12 pedidos, 14 motoboys sintéticos e mensagem de erro sintética.
- Larguras: 320, 360, 390, 430, 600, 768, 1024, 1280, 1440 e 1920 px; alturas correspondentes documentadas nos JSONs.
- Temas claro e escuro; sidebar aberta e recolhida a partir de 1024 px.
- Nas 28 combinações do caso volumoso e nas 28 do caso reduzido após a correção: `overflowY=visible`, sem rolagem interna da Central e sem overflow horizontal. Em layouts altos, a altura do documento cresce; quando o conteúdo cabe, a Central permanece compacta.
- O layout de duas colunas e o aside sticky foram mantidos. Em celular/tablet estreito, a regra desktop não se aplica e os painéis continuam empilhados.

## Evidências

- `before-1280-light-expanded.png`: regra anterior reproduzida; scrollbar interna visível.
- `after-1280-light-expanded.png`: regra corrigida, conteúdo fluindo no documento.
- `few-measurements.json`, `many-measurements.json`, `before-measurements.json`, `after-measurements.json`: geometria e métricas de rolagem por caso.
- `few-1280-light-content-fit.png`: caso curto que cabe no viewport; `many-1280-light-page-scroll.png`: captura durante a rolagem do documento.

O Chromium usou os CSS reais da aplicação servidos por HTTP em `127.0.0.1:8083`; a fixture isolada não executou JS da aplicação, autenticação, dispatch, persistência ou sincronização. Portanto, isto é validação de layout/renderização, não E2E operacional nem teste físico no Chrome Android. Nenhum dado ou banco foi alterado.

## Resultado

- Causa raiz confirmada e removida: limite de altura + `overflow:auto` no painel.
- Teste estático de regressão impede que a Central volte a receber `max-height` ou overflow vertical próprio.
- Suíte `npm test` do Restaurante: PASS.
- E2E autenticado e Chrome Android físico: não executados nesta intervenção.
- G14 permanece **FAIL / aprovação do proprietário pendente**; campanha 0304 continua PARTIAL e aberta.

O CSS servido `orders-v2.css?v=0304.8` retornou o mesmo SHA-256 do arquivo local após a alteração (`faecd0d0be60bc8df3d58c133e49757e08609f0502d47771d0777caeeff0d030`). `index.html` anuncia esse URL e o service worker usa o cache shell `v113`.
