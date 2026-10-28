# Testes e resultados

- Restaurante `npm test`: PASS (saída zero; suíte completa, repetida após correção do timeout de toast); `test-toast-duration.js` PASS. O `pretest` executou `npm run assets:check`: PASS. `git diff --check`: PASS.
- Motoboy testes direcionados (`test-command-persistence`, `test-command-cross-tab`, `test-configuration-ownership`, `test-driver-owned-goal-persistence`): PASS.
- Motoboy `npm test`: PASS (saída zero; suíte completa, repetida após correção do timeout de toast); `test-toast-duration.js` PASS. O `pretest` executou `assets:check`: PASS. Após edição, manifesto sincronizado e verificado.
- Restaurante PostgreSQL `test-logistics-e2e-postgres.js`: PASS; transação rollback.
- Contrato compartilhado: incluído e PASS em `npm test` para ambos.
- PWA/service worker: contratos e testes de instalação atômica passaram em ambos; teste de update/cache real no browser não executado.
- PostgreSQL migrations: Parte S.2 registra ambos os bancos em 0061; não repetido e sem migrations nesta parte.
- Browser QA: BLOCKED por screenshot CDP falhar e processo GPU fatal no runtime; sessão autenticada já retornara 401 e não foi repetida.
- APIs: nenhuma alteração de readiness foi solicitada por mudança de servidor; disponibilidade autenticada não foi atestada nesta execução.
