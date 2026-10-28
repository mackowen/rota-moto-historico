# Layout de Rotas

**T2-05 — PASS para componente/layout; PARTIAL ponta a ponta.** `routes()` mantém a hierarquia resumo/faixa → mapa → alternância Rotas/Entregas → planejamentos/detalhes/lista. O componente foi renderizado pela função real em estado vazio e com duas rotas/duas entregas sintéticas isoladas. O painel de detalhes exibiu a parada selecionada; teste DOM de `bindRoutesV2Selection()` confirmou troca Rotas/Entregas, `aria-pressed`, seleção e releitura do detalhe.

Causa corrigida no tablet: em `styles.css`, a regra global `.sidebar{display:none!important}` dentro de `@media(max-width:1100px)` anulava as regras mais específicas do `routes-v2.css`, apesar do shell de Rotas alocar um trilho lateral. Retirado `!important` da regra global; páginas não-Rotas continuam escondendo sidebar pela cascata normal e Rotas pode exibir o trilho responsivo.

Após a correção, em 768×1024: shell 753 px de largura útil (15 px de scrollbar), conteúdo Rotas 657 px, mapa 657 px, cinco controles em linha; antes, o harness reproduzia faixa de 40 px e mapa de 40 px. Em 1024×768 o mapa mediu 457 px; em 1440×900, 797 px. A largura do documento não ultrapassou a viewport.

Capturas: `IMAGENS/rotas-768x1024-claro.png` (tablet vazio), `rotas-320-claro.png`, `rotas-390-escuro.png`; `rotas-amostra-sintetica-390-claro.png` é dado sintético. Não há screenshot autenticado.
