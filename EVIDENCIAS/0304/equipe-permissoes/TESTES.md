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
## Atualização autenticada — 2026-11-02

A nota acima sobre ausência de autenticação descreve somente o ensaio de 2026-11-01. Em 2026-11-02, o harness temporário ~/projetos/browser-tests/.temporarias/0304-team-invitations-e2e.cjs completou Chromium/CDP autenticado por MFA sintético em 390×844. O teste usa UI servida em 8083, handlers de produção do checkout e PostgreSQL E2E sob RLS com rollback; não usa o perfil pessoal nem falsifica sessão.

Resumo dos resultados HTTP: convite sem provedor 503; criação/reenvio sintético 202; aceitação expirada, revogada ou consumida 401; aceitação válida 200; tentativa de ação fora da permissão 403. Readbacks em PostgreSQL e recarga da página passaram. A execução encerrou com DATABASE_STATE_RESTORED, Chico como única empresa e nenhum token emitido nos corpos de resposta. Isso não é SMTP real e não simula a interface do processo persistente 8787 para os POSTs; os handlers do checkout são montados no harness com a conexão transacional.

Após o teste, o serviço rotamoto-api-e2e foi reiniciado para carregar o código do checkout; /health/ready=200, banco pronto, e rotas protegidas sem sessão responderam 401. Hashes servidos/local coincidentes: index.html abc87963c1b89091297bdea96d8e4de0d39cb3f466fb97e4dfb9d3966678e200; asset-manifest.js be11c82873775552f14c3878e162bfbb4cb31974705225e5e6fb5d01a73fa6da; identity-ui.js d6abe07c9b5d42333811b2ffe1795cce00b67a147bb2bc7083bfdc805b62dc86. Motoboy 8084=200, sem alteração. Testes direcionados bilaterais e seus comandos/resultados estão em [CONVITES-E-MAIL-RBAC-20261102.md](CONVITES-E-MAIL-RBAC-20261102.md).
