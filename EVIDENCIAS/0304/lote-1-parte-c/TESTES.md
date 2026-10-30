# Testes — Parte C

| Aplicativo/área | Comando | Resultado |
|---|---|---|
| Motoboy | `npm test` | PASS; suíte completa, inclusive `test-settings-write-serialization.js`; `pretest` também executou `assets:check` |
| Motoboy | `npm run assets:check` | PASS após gerar manifesto com `npm run assets:sync` |
| Motoboy | `node tests/test-settings-write-serialization.js` | PASS: corrida reproduzida, draft só limpo após ACK |
| Motoboy | `node tests/test-configuration-ownership.js` | PASS |
| Motoboy | `node tests/test-driver-owned-goal-persistence.js` | PASS |
| Restaurante | `npm test` | PASS; suíte completa, incluindo Company Settings/readback, identidade, admin, RBAC, contratos e persistência |
| Restaurante | `npm run assets:check` | PASS via `pretest` |
| Ambos | `git diff --check` | PASS no diff do aplicativo alterado |
| Motoboy E2E | HTTP GET `/` e `/app.js?v=ee80204c6cbd062e`, hash do corpo versus checkout | PASS; HTTP 200 e bytes idênticos (`index.html` SHA-256 `c7f1065c5cb3fcff311a951823bed1fcc64b7a465b5d1e09338451cdbc6f8bf617`; `app.js` SHA-256 `ee80204c6cbd062e1ffccf642975c8d81d78cf77e3db7e92c9faf607bf5b216f`) |
| Browser QA autenticado da Parte C | Chromium/CDP descartável + fixture 0304B/MFA sintético | PARTIAL: Restaurante Company Profile ACK/readback/409/reload passou; Motoboy login/MFA e sessão/reload passaram, mas navegação para Ajustes falhou antes do teste da aparência |

O browser autenticado sintético da Parte B está detalhado em `../lote-1-parte-b/BROWSER-AUTENTICADO.md`; ele não prova os campos não cobertos. A validação da Parte C está descrita em `BROWSER-QA.md`.
