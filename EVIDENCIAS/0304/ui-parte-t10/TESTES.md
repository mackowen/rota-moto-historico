# Testes — Parte T.10

## Automatizados

- `npm test` no Restaurante — PASS, suíte completa; o pretest executou `assets:check`.
- `node tests/test-platform-admin-ui.js` — PASS, incluindo a regra terminal e a preservação dos separadores internos.
- `node tests/test-platform-admin-disclosure-contract.js` — PASS, abertura/recolhimento e proteção contra ação duplicada.
- `npm run assets:check` — PASS.
- `git diff --check` — PASS.

## Chromium/CDP isolado

Carregado o host `8083` em perfil descartável, sem login. O harness usou os arquivos CSS publicados e o componente `platform-admin-disclosure.js`, com duas categorias, linhas de permissão, ações Cancelar/Salvar e o card Proprietário seguinte.

- Viewports: 320×700, 390×844, 768×1024 e 1440×900.
- Temas: claro e escuro (8 combinações).
- Última linha: `border-bottom` computado em 0 px.
- Linha anterior de outra categoria: `border-bottom` computado em 1 px.
- Largura do documento igual à viewport; botões dentro dos limites.
- Em 320 px, as ações empilham em dois botões de 44 px; em 390 px, ficam lado a lado com 44 px; no tablet/desktop permanecem alinhadas à direita.
- Espaçamento entre ações e cartão Proprietário: 19 px medidos no DOM (inclui o gap do cartão); espaçamento de início das ações segue token de 8 px.
- Consulta do perfil e detalhes da permissão abriram e recolheram; o card Proprietário seguinte permaneceu no fluxo.

O harness não representa autenticação real nem executou salvamento de permissão.

## Publicação E2E

- Restaurante `8083/` — HTTP 200.
- API `8787/health/ready` — HTTP 200.
- SHA-256 local e HTTP coincidentes para `identity-ui.css`, `asset-manifest.js` e `index.html`.
- O CSS servido contém a regra que remove apenas a divisória terminal.

Nenhuma consulta ou escrita PostgreSQL foi necessária.
