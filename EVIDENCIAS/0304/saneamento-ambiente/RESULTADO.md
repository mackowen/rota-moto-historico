# Campanha 0304 — saneamento do ambiente

**Resultado geral: PARTIAL.** Nenhuma limpeza destrutiva foi feita sem backup e leitura autoritativa do E2E.

## Estado verificado

| Verificação | Resultado |
|---|---|
| PostgreSQL | 18.6, aceita conexões em loopback. |
| `rotamoto` | Migrations 0001–0064; checksums 0062–0064 conferidos. Zero empresas e zero linhas nas tabelas operacionais verificadas. |
| `rotamoto_e2e` | Migrations 0001–0061; 0062–0064 pendentes. Contagem e conteúdo não confirmados: RLS impede leitura autoritativa com os papéis disponíveis. |
| Recovery oficial | Dump custom criado em `~/rotamoto-data/maintenance/saneamento-0304-20261030/rotamoto-pre-saneamento.dump`, 400.594 bytes, modo 0600, SHA-256 `8308669d22a6843929b9284b454524682b462ef4b82b8cd74c6cdb11ee20d2d5`; `pg_restore --list` passou. Restauração integral não ensaiada. |
| Recovery E2E | BLOQUEADO: `rotamoto_backup` não tem CONNECT ao E2E; `rotamoto_migrator` não tem BYPASSRLS. Não alterei grants nem usei role de aplicação como backup completo. |
| API E2E 8787 | Serviço RotaMoto ativo, PID 20636, checkout Restaurante. `/health` 200; GET Empresa sem sessão 401; GET preços 404 (processo não expõe a rota nova). Não reiniciado enquanto schema E2E permanece 0061. |
| Frontends E2E | Restaurante 8083 e Motoboy 8084 retornaram HTTP 200. |
| Browser QA autenticado | BLOCKED: fixture de login não tem fator MFA utilizável; login exige MFA. Nenhuma sessão foi falsificada. |
| Arquivos temporários | Nenhum removido; arquivos localizados pertencem a evidências, configurações ou históricos não comprovadamente descartáveis. Espaço recuperado: 0 bytes. |

## Alterações e verificações

- Runner oficial aplicou `0062_disposable_e2e_runtime_access`, `0063_identity_runtime_role_grants` e `0064_company_delivery_pricing` no `rotamoto`, em transações. A nova tabela tem RLS e FORCE RLS. Não havia linhas operacionais a remover nas tabelas existentes consultadas.
- No E2E não houve limpeza nem migration. Não foi possível provar que existe exatamente Chico Restaurante; resultado sujeito a RLS não foi usado como contagem real.
- Passaram: `node tests/test-company-settings.js`, `node tests/test-company-settings-persistence.js`, `node tests/test-company-delivery-pricing.js`, `node tests/test-postgres-migration-targets.js`, `node tests/test-cross-app-contract-parity.js`, `npm run assets:check` em ambos e `git diff --check` em ambos.
- Dois nomes tentados como scripts npm não existem (`test:postgres-migration-targets`, `test:cross-app-contract-parity`); os arquivos de teste equivalentes foram executados diretamente e passaram.
- `npm test` completo e restore integral do dump não foram executados nesta etapa. A promoção oficial ocorreu após conferência de ledger/checksums e validação do arquivo de recovery, porém sem ensaio integral de recuperação; permanece limitação explícita.

## Política permanente

Adicionada `DEVELOPMENT-DATA-POLICY.md` nos dois apps: apenas dois bancos persistentes, Chico como única empresa E2E, sem criação automática de bancos/empresas, fixtures transacionais e segurança preservada. Commits locais: Restaurante `575d028`; Motoboy `cbc31c5`.

## Pendências e gates

- `rotamoto`: 0064 e vazio operacionalmente; dump privado validado por listagem/checksum — **PARTIAL** (restore não ensaiado).
- Backup completo e leitura DBA do E2E para identificar Chico e limpar registros/empresas remanescentes — **BLOCKED**.
- E2E em 0064, atualização controlada da API 8787 e validação de GET/PUT/readback/conflito — **BLOCKED**.
- MFA sintético utilizável e Browser QA autenticado — **BLOCKED**.
- Limpeza de arquivos temporários — **PARTIAL**, sem remoções seguras comprovadas.

Nenhum banco foi criado ou apagado. `rotamoto_e2e` permanece separado de `rotamoto`. Campanha 0304 aberta; G14 FAIL; 0305 não iniciada.
