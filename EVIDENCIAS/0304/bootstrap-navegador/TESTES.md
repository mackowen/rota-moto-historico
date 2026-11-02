# Testes

## Executados

- `node --check backend/identity/bootstrap-setup.js`, `backend/identity/service.js`, `backend/identity/http.js`, `server.js`, `bootstrap-wizard.js`, `scripts/prepare-browser-bootstrap.js`: sintaxe válida.
- `node tests/test-bootstrap-setup.js`: PASS; payloads, localização confirmada, modelos/taxas/limites e centavos decimais.
- `node tests/test-bootstrap-status-http.js`: PASS; estados/contrato público e não exposição de dados.
- `node tests/test-browser-bootstrap-cli.js`: PASS; emissão proibida sem TTY, canário do keystore removido e credencial SMTP lida apenas por referência; erro externo sanitizado.
- Provider externo de keystore: PASS para write/read/remove validado e provider read-only corretamente não pronto para MFA.
- `env NODE_ENV=test E2E_RUNTIME_DATABASE_URL=postgresql://rotamoto_app@127.0.0.1:5432/rotamoto_e2e E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node tests/test-identity-http-postgres.js`: PASS em HTTP + PostgreSQL, fixture por savepoint/rollback; as rotas existentes de identidade continuaram funcionais em 0066, status do novo instalador ficou `not_ready`, founder preexistente permaneceu intacto. O ramo de first-install foi explicitamente NOT EXECUTED por estado/latch persistente; não é prova do bootstrap completo.
- Migration 0067: aplicada em transação de teste e revertida; DDL/funções aceitos pelo PostgreSQL. Nenhum ledger persistente alterado.
- Browser QA CDP: seis viewport/tema sintéticos, sete etapas, validação, draft, 409/retry e lock `complete`; PASS para UI, não para instalação real.
- `npm run assets:sync` gerou build `a8d45146b9f52e5c`; `npm run assets:check`: PASS.
- `npm test`: PASS (suíte integral do Restaurante após a validação final dos campos; inclui paridade contratual com Motoboy; exit code 0).
- `npm run assets:check`: PASS no checkout final.
- `git diff --check`: PASS antes dos commits locais e documentais.

## Não executados / não provados

- Fluxo real contra API atualizada: bloqueado porque API 8787 `/api/identity/bootstrap/status` retorna 404 e 8083 `/bootstrap.html` retorna 404.
- Bootstrap integral em PostgreSQL vazio, convite entregue, ativação de senha, novo enrollment TOTP, founder latch, concorrência e rollback: não executados. O E2E persistente está concluído com founder existente; não é uma fixture vazia e não foi alterado. Não se declarou PASS por mock.
- Teste visual/auth bilateral Motoboy: não aplicável a alteração de UI; apenas o teste compartilhado de contrato rodou.
