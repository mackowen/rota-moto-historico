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
