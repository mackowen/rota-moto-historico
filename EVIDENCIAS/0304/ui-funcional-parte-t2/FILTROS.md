# Filtros e borda reportada

**T2-02 — PARTIAL.** O código atual apresenta quatro modos (`Todos`, `Entregas`, `Motoboys`, `Rotas`) e uma ação `Ajustar`. Os modos são exclusivos, preservam a semântica de camada e chamam `renderLayers()`. A ação de ajuste chama `fitOverview()` sem trocar o modo. Não há outro conjunto de cinco campos/controles nem combinação cumulativa para preservar.

Em 320×700, cada controle mediu 56 px × 38 px em uma faixa de 296 px; em 390×844 mediu 70 px × 38 px numa faixa de 366 px. Em tablet retrato e desktop os cinco controles ficam na mesma linha. Não ocorreu overflow horizontal. A caixa de filtros não tem `border-top`, sombra ou conteúdo de `::before`/`::after` no DOM calculado.

**T2-03 — PARTIAL.** A faixa atual não reproduz a linha fantasma; não foi escondida com `overflow:hidden`. A caixa anterior é o resumo operacional com borda própria, separado pela lacuna de grid. Sem a tela autenticada que originou a reclamação, não é possível afirmar que a linha antiga foi corrigida.

**T2-04 — PARTIAL.** Não há modal, popover, drawer ou painel inline de filtros avançados. Não existe fechamento por X, clique externo ou Escape para restaurar. Não foi resgatado código histórico nem criado um controle sem contrato.

Testes: `tests/test-routes-v2.js` (modo/fit/estado ARIA e ausência do diálogo), harness CDP com DOM real, medição de border/shadow/pseudo.
