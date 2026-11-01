# Testes — Equipe e permissões

## Automatizados

Restaurante:

- `npm test` — **PASS**, exit 0 em 2026-11-01. Inclui `test-identity-ui.js`, o novo `test-admin-membership-invitations.js`, contratos de diálogo, catálogo/escopo de permissões e regressões existentes.
- `npm run assets:check` — **PASS** (também executado pelo `pretest`).
- `git diff --check` — **PASS** antes do commit.

Motoboy:

- `npm test` — **PASS**, suíte completa concluída; inclui paridade dos contratos compartilhados e regressões de identidade/navegação.
- `npm run assets:check` — **PASS**.
- `git diff --check` — **PASS**; working tree permaneceu limpa.

Testes direcionados adicionados/atualizados:

- `tests/test-identity-ui.js`: estrutura da área de equipe, acionadores do diálogo, estados do formulário e visibilidade dos controles de descarte.
- `tests/test-admin-membership-invitations.js`: mapeamento do vencimento do convite e filtro de token não consumido da mesma empresa e usuário; nenhuma informação secreta entra no DTO.
- O estado `hidden` dos botões do formulário é coberto para impedir que a regra flex os mostre durante a confirmação de descarte.

## Browser/CDP

Chromium headless/CDP com perfil temporário descartável carregou `http://127.0.0.1:8083/` em 390×844:

- `document.readyState=complete`, `#rmIdentityRoot` presente e scripts `identity-ui.js`/`admin-form-dialog.js` carregados.
- Largura do documento 390 px, igual ao viewport.
- Zero exceções JavaScript e zero respostas inesperadas 4xx/5xx.
- `GET /api/identity/session` retornou 401 no perfil anônimo, esperado.

O teste não autenticou nem navegou para a área protegida. Browser QA autenticado fica **BLOCKED** pela ausência de identidade de QA autorizada/reutilizável; não se declara sucesso real de convite, edição, readback ou reload.

## Publicação HTTP

Os recursos abaixo retornaram HTTP 200 e os hashes SHA-256 coincidiram com o checkout do Restaurante:

| Arquivo | SHA-256 servido |
|---|---|
| `/` (`index.html`) | `df54cfc193db827d7e8646d8a27f68fcafdf484326728d5075349b25ed9cbe43` |
| `/identity-ui.js` | `8f41d3761ea1543aa54a4c9160859b853af9aa8e0ff6ab6b281acfb66666f831` |
| `/identity-ui.css` | `076f7812a28792ec35ffd8f38d18a0d839e1c81fbc946438a84a0df74a5ca038` |
| `/admin-form-dialog.js` | `f88137aac742bb55cba0bc05ed4eb25a5b21c470acc19fb5fd66d3cc6a116b26` |

Readiness: Restaurante 8083=200; Motoboy 8084=200; API E2E 8787 `/health`=200. Rotas protegidas sem sessão retornam 401; nenhum bypass foi usado.
