# Evidências de testes — Conta e segurança

## Execução autenticada sintética

Chromium/CDP com perfil temporário, proxy de QA e ciclo de fixture reversível; nenhum perfil pessoal, cookie ou token externo foi lido. A identity fixture foi vinculada a Chico Restaurante no escopo E2E. Eventos e relatórios completos permaneceram em `/data/data/com.termux/files/usr/tmp/rotamoto-0304-account-security/` e `/data/data/com.termux/files/usr/tmp/rotamoto-0304-motoboy-account-security/`; nenhum segredo ou UUID de fixture é transcrito neste documento.

| Fluxo | Restaurante | Motoboy |
|---|---|---|
| Login e MFA válidos | PASS; sessão marcada autenticada e MFA verificado | PASS; sessão restaurada após novo login |
| Dados de conta/vínculo | PASS; identidade e empresa de fixture | PASS; identidade e associação do entregador |
| Senha atual incorreta | HTTP 400; mensagem compreensível, draft preservado e sem sucesso falso | HTTP 400; draft preservado e sem sucesso falso |
| Troca autorizada | Duas mudanças HTTP 200, reload entre elas | Duas mudanças HTTP 200, reload entre elas |
| MFA existente | Substituição exige senha + TOTP atual; segredo existente não foi rerevelado | Login e estado MFA verificados; fator real não alterado |
| Recovery | Request 202, token capturado somente no sink sintético, consume 204 | Não aplicável à interface do Motoboy; sem endpoint próprio alegado |
| Logout/relogin | Logout 204; login com senha recuperada e novo TOTP; sessão MFA verificada | Logout 204; login com senha nova e MFA; vínculo recuperado |
| JavaScript/rede funcional | Sem exceções; requests esperadas | Sem exceções; availability/queue/sync HTTP 200 |
| Viewports e temas | 390×844, 768×1024, 1440×900; claro/escuro; sem overflow horizontal | Mesma matriz; sem overflow horizontal |

## Suítes automatizadas

- Restaurante `npm test`: PASS completo.
- Motoboy `npm test`: PASS completo.
- Restaurante e Motoboy `npm run assets:check`: PASS.
- `node tests/test-identity-session-race.js` e `node tests/test-identity-ui.js` no Restaurante: PASS.
- `node tests/test-identity-session-first-access.js` e `node tests/test-identity-ui.js` no Motoboy: PASS.
- Restaurante `node tests/test-identity-http-postgres.js`: PASS. A saída informa explicitamente que o caso bootstrap vazio foi **NOT EXECUTED**, para não apagar/recriar o fundador.
- `git diff --check`: PASS nos dois.

## Limites de interpretação

O Browser QA é autenticado com serviços e dados sintéticos, não é aprovação física do Chrome Android. Recovery exercitou o sink de teste, não SMTP externo. A validação não percorreu todos os formulários de Configurações; os testes gerais apenas preservam regressões cobertas pelas suítes existentes.

## Revalidação dos modais — 2026-11-01

| Verificação | Restaurante | Motoboy |
|---|---|---|
| Chromium/CDP autenticado com MFA sintético e fixture revertida | PASS | PASS |
| MFA: visão geral sem enrollment/QR/chave prematuros; reautenticação isolada; enrollment autorizado; cancelamento preserva o fator ativo; chave limpa após confirmação | PASS | PASS |
| Códigos: aviso de invalidação, Cancelar não grava, confirmação explícita recebe HTTP 200 | PASS | PASS |
| Empresas: endpoint autorizado HTTP 200, nome/estado legíveis, uma empresa selecionada, seletor de troca oculto, ID recolhido | PASS | PASS |
| Diálogo: Escape/rascunho, um painel por vez, bounds no viewport e sem overflow horizontal | PASS | PASS |
| 390×844, 768×1024, 1440×900 em claro/escuro | PASS, sem exceções JS/overflow | PASS, sem exceções JS/overflow |
| 390×500 com campo focado, corpo rolável e rodapé dentro do viewport | PASS, simulação reduzida | PASS, simulação reduzida |
| Teclado físico do Chrome Android | Não dirigido pelo Chromium headless | Não dirigido pelo Chromium headless |

No fluxo Restaurante, a reautenticação do fator atual e o novo TOTP foram aceitos pelo backend. Cancelar a confirmação de identidade não criou enrollment; cancelar o enrollment recebeu HTTP 200 e preservou o MFA ativo; confirmar o novo fator recebeu HTTP 200 e limpou a nova chave da interface. A regeneração cancelada não enviou POST; a confirmação recebeu HTTP 200. No Motoboy, a etapa de reautenticação também mostrou somente uma ação de cancelar e nenhum campo futuro. Nenhum segredo ou código foi incluído nos relatórios/capturas.

### Regressão e assets

- Restaurante `npm test`: PASS, exit 0.
- Motoboy `npm test`: PASS, exit 0.
- `npm run assets:check`: PASS em ambos (também executado pelo `pretest`).
- `git diff --check`: PASS em ambos antes do commit; `git diff --cached --check`: PASS.
- `GET /health/ready` na API E2E 8787: HTTP 200.
- `/api/health/ready` via 8083 e 8084: HTTP 200.
- `/api/identity/companies` sem sessão: HTTP 401 esperado; na sessão de fixture autorizada: HTTP 200.

Hashes SHA-256 dos arquivos efetivamente servidos versus checkout:

| App | Arquivo | SHA-256 | HTTP | Paridade |
|---|---|---|---:|---|
| Restaurante 8083 | `index.html` | `1d11b44120ca2be18d5719bda95089e7f71d21e9772e8dc7f66d4e2801d4cd1c` | 200 | MATCH |
| Restaurante 8083 | `asset-manifest.js` | `ca6a8e2340a5471c29d6e4b1231824eef79e8fe2d929e3b6846abc87c9031e42` | 200 | MATCH |
| Restaurante 8083 | `identity-ui.js` | `c3fd95fb8c4bdb7798ca155c0e215cfce2b97fc5efc05545bc569eec62549a87` | 200 | MATCH |
| Restaurante 8083 | `identity-ui.css` | `deabf8c467745b3eedd78023a8692a410fb8fb4914fd7da3a1fb149af51ea494` | 200 | MATCH |
| Restaurante 8083 | `identity-session-guard.js` | `a756dc6c863d76b955f99aa3e0c39f92ce67f372577f27b597423c8053a5faf7` | 200 | MATCH |
| Motoboy 8084 | `index.html` | `bb88f816a6dc4e83ecdb8034ce2b063fb41bceb447436882d2753188e8f165b7` | 200 | MATCH |
| Motoboy 8084 | `asset-manifest.js` | `edfea83dcae33e909d2acdc7bb2afab8f9041675d697e13c673b09ab0f0cdf3c` | 200 | MATCH |
| Motoboy 8084 | `identity-ui.js` | `1c6bf4c48ff4595d94454d2d4b2db77597a4206d04db97261285bf690d688d2b` | 200 | MATCH |
| Motoboy 8084 | `identity-ui.css` | `353c5ed5544c10906c2f51da0383c19f86b5935b36d678088afc2e1b65127f3b` | 200 | MATCH |
| Motoboy 8084 | `identity-session-guard.js` | `a756dc6c863d76b955f99aa3e0c39f92ce67f372577f27b597423c8053a5faf7` | 200 | MATCH |
