# Parte T — estado e evidências

**Estado global: PARTIAL.** Foram feitas correções e executados testes reais de persistência, assets, contratos e PostgreSQL E2E. A validação completa dos fluxos autenticados e o Browser QA visual ficaram bloqueados por falta de sessão útil e falha fatal do Chromium/GPU no Termux. Não houve migration nem escrita no banco principal.

## Checkpoint

- Restaurante: branch `codex/campaign-0304-parity-s`, baseline `v5.50-ui-mobile-fix5` preservada; nenhuma alteração desta Parte T.
- Motoboy: branch `codex/campaign-0304-parity-s`, baseline `v39.6-ui-mobile-fix2` preservada; commit local `90277dc` removeu duplicação idêntica dos helpers de rascunho de Configurações e atualizou `asset-manifest.js`/referência em `index.html`.
- Histórico: branch `codex/campaign-0304-bootstrap-p`; alteração preexistente não rastreada `EVIDENCIAS/0304/login-redesign-2026-10-25/` preservada.
- PostgreSQL: paridade 0061 conforme gate e evidência da Parte S.2; investigação não repetida.
- Campanha 0304 aberta; G14 FAIL; 0305 não iniciada.

## Evidência objetiva desta execução

- `npm test` Restaurante: PASS, suíte completa, incluindo settings persistence, analytics/reporting, logistics, dispatch, contracts e service worker; `assets:check` e `git diff --check` também PASS.
- `npm test` Motoboy: PASS, suíte completa; testes direcionados `test-command-persistence`, `test-command-cross-tab`, `test-configuration-ownership` e `test-driver-owned-goal-persistence` PASS; assets atualizados e `assets:check` PASS.
- Restaurante PostgreSQL E2E logística: PASS; cenário confirmou execução transacional e rollback.
- Sessão autenticada: tentativa já realizada na rodada, HTTP 401; não repetida.
- Browser QA: páginas públicas responderam HTTP 200 em 8083/8084; CDP capturou 12 screenshots de telas anônimas (Restaurante: 320×700, 390×844, 768×1024, 1024×768 e 1440×900, temas claro/escuro; Motoboy: 320×700, claro/escuro). A execução falhou durante a 13ª captura (`Unable to capture screenshot`) e Chromium terminou com falha fatal do processo GPU (`GPU process isn't usable`), sem gravar o relatório JSON final. As imagens mostram apenas autenticação anônima, não telas operacionais. A infraestrutura compartilhada também não iniciou no modo padrão porque 8788 estava ocupado por endpoint que não serve o HTML esperado. As capturas parciais estão em `screenshots-anonimos/`; nenhuma evidência visual autenticada foi produzida.

## Arquivos e commits

- Motoboy `app.js`, `asset-manifest.js`, `index.html` — commit `90277dc` local, sem push.
- Restaurante sem diff nesta parte.
- Nenhum commit/push histórico ainda nesta etapa.

Detalhamento por item: [matriz T01–T18](MATRIZ-T01-T18.md) e notas especializadas nos arquivos abaixo.
