# Testes — Parte T.4

| Comando/ensaio | Resultado |
|---|---|
| Restaurante `npm test` (inclui `pretest`/`assets:check`) | PASS; suíte integral concluída após ajustar a asserção estrutural de toast para a nova separação de helper |
| Motoboy `npm test` (inclui `pretest`/`assets:check`) | PASS integral |
| `npm run assets:sync` e `npm run assets:check` nos apps | PASS |
| `tests/test-toast-duration.js` nos apps | PASS; políticas 5s/7s e máximo 12s mantidas |
| `tests/test-toast-position.js` nos apps | PASS; geometria medida, barra oculta e fallback cobertos |
| contrato compartilhado | PASS nas duas suítes, `test-cross-app-contract-parity` |
| cartografia/map lifecycle | PASS nas duas suítes; não substitui navegação autenticada |
| CDP live host 8083 | PASS instalação/reload/control em perfil descartável; console/rede sem erros observados |
| CDP atualização V1→V2, falha V3 | PASS conforme [CACHE-ANDROID.md](CACHE-ANDROID.md) |
| CDP offline/online | PARTIAL: sem controller após navegação offline; sem patch especulativo |
| viewports/temas DOM-CSS sintéticos | PASS sem overflow horizontal e toast afastado em 10 combinações; topbar desktop não usado como aceite |
| readiness `8083`, `8084`, `8787/health/ready`, `8788/health/ready` | HTTP 200 em todos |
| PostgreSQL | read-only status E2E confirmou 0061; nenhuma migration/alteração de dados nesta parte |
| readback de founder grant por role app | BLOCKED/PARTIAL por negação de schema; sem bypass de RLS |
| `git diff --check` | PASS após alteração final (registrar nova execução no fechamento) |

Commits locais (sem push dos apps): Restaurante `2a14989`; Motoboy `382ee16`.

Pós-commit: SHA-256 de `index.html`, `app.js`, `styles.css`, `design-system.css`, `asset-manifest.js` e `sw.js` servido em 8083 = checkout (HTTP 200/MATCH); Chromium isolado 390×844 confirmou controller/cache após reload.
