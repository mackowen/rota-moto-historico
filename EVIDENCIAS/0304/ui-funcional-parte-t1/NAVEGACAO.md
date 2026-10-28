# Navegação compartilhada

## Revisão desta parte

Os dois apps mantiveram seus arquivos de navegação sem alterações nesta parte. Foram reexecutados testes existentes de shell, intenção de navegação, layout responsivo e safe-area nas suítes completas. A cobertura é de contratos DOM/estáticos e não mede pixels renderizados.

## Resultado

- Restaurante `npm test`: PASS.
- Motoboy `npm test`: PASS.
- `assets:check` nos dois: PASS.
- `tests/test-cross-app-contract-parity.js` no Motoboy: PASS.

Não houve correção de código de navegação porque os defeitos visuais reportados (margens por aba, deslocamento do header, dimensões do sino, barra inferior/notificações) não foram reproduzidos com evidência visual autenticada nesta execução. Browser QA autenticado móvel/desktop: **BLOCKED**, acesso autenticado não disponível; não se repetiu tentativa de login/Chromium conforme instrução. Safe-area visual e posição de toast continuam pendentes.
