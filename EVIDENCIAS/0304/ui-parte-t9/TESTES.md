# Testes — Parte T.9

## Suítes

- Restaurante `npm test` — PASS, execução completa incluindo `assets:check`, testes administrativos, diálogos, RBAC sintético, contratos compartilhados e regressões das abas existentes.
- Restaurante `npm run assets:check` — PASS.
- Motoboy `npm test` — PASS; Motoboy não foi alterado.
- Motoboy `npm run assets:check` — PASS.
- `node --check identity-ui.js` — PASS.
- `node tests/test-platform-admin-ui.js` — PASS, incluindo estados async/DTOs/RBAC e novos contratos de compactação.
- `node tests/test-platform-admin-disclosure-contract.js` — PASS; expansão, recolhimento, confirmação do rascunho e duplo clique.
- `node tests/test-platform-permission-catalog.js` — PASS; catálogo local em português.
- Contratos compartilhados — PASS dentro das duas suítes.
- `git diff --check` — PASS.

## Chromium/CDP isolado

A página pública 8083 foi carregada em Chromium headless com perfil temporário descartável. O harness montou HTML representativo com a nova estrutura e usou `styles.css`, `design-system.css`, `identity-ui.css` e `platform-admin-disclosure.js` servidos pelo E2E.

- Viewports: 320×700, 390×844, 412×915, 768×1024, 1024×768, 1440×900.
- Temas: claro e escuro; 12 combinações.
- Resultado: zero overflow horizontal (`documentElement.scrollWidth == innerWidth` em todas as combinações).
- Painéis de empresa e perfil: fecharam/reabriram pelo botão e conservaram `hidden`/`aria-expanded` coerentes.
- Descrições de permissão e identificador de empresa: iniciaram recolhidos e abriram sob demanda.
- Botão de perfil medido com 44 px de altura; medidas de cards/linhas/navigation registradas em `browser-measurements.json`.
- Capturas sintéticas por viewport e tema: arquivos `super-admin-{tema}-{largura}-synthetic.png`; captura adicional de lista compacta em `super-admin-light-320-collapsed-synthetic.png`.

Esse ensaio não navegou a tela autenticada do Super ADM nem consultou registros empresariais reais.

## Publicação E2E

- `http://127.0.0.1:8083/` — HTTP 200.
- `http://127.0.0.1:8787/health/ready` — HTTP 200.
- SHA-256 local e HTTP coincidentes para `identity-ui.js`, `identity-ui.css`, `index.html` e `asset-manifest.js`.
- Não foi necessário repetir auditoria de Nginx; arquivos servidos são os do checkout.

## Banco e segurança

Nenhuma conexão ou escrita de banco foi feita. Nenhuma migration criada/aplicada. Founder, grants, MFA, CSRF, RLS, auditoria e dados E2E/oficiais não foram modificados.
