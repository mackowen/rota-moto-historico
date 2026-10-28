# PostgreSQL e bootstrap

## Checkpoint sem escrita principal

- E2E em 0061 com checksum local confirmado; principal em 0055, pendentes 0056–0061.
- Grant global ativo único e latch apontando para ele, confirmados por consulta read-only. Identidade pessoal não registrada.
- A leitura de membership sob RLS sem tenant retornou vazio; isso não prova ausência. Sem contexto empresarial autenticado, vínculo owner ficou BLOCKED.
- Nenhum comando de migration foi executado contra `rotamoto`.

## Correções/testes

- `test-identity-http-postgres.js`: removido reset de latch. Estado bootstrap agora é consultado em transação READ ONLY pelo migrator. No E2E persistente, segundo bootstrap sem autorização é negado (403 `PROVISIONER_UNAUTHORIZED`) e grant/latch/histórico/completion ficam iguais antes/depois. Teste PASS.
- `test-integrated-founder-bootstrap-postgres.js` e `...service-postgres.js`: founder persistente conduz a resultado PARTIAL e retorno sem escrita; instalação vazia segue isolada, sem forçar estado. Testes emitiram PARTIAL corretamente.
- `test-platform-admin-postgres-e2e.js`: contexto persistente valida negação global/financeira via role runtime sem MFA/session e prova que grant não mudou. Resultado PARTIAL; operação positiva não foi impersonada.
- `test-tenant-rls-isolation-e2e.js`: baseline antiga falhava em 55 tabelas contra 54 esperado. Corrigida para 55 tabelas, 40 FORCE-RLS, 43 policies e assert de `financial_events`. Novo `ROTAMOTO_RLS_SCHEMA_ONLY=1` valida catálogo/ACL em read-only sem fixtures persistentes; PASS.
- Identity HTTP, identidade PostgreSQL, logística PostgreSQL, sync/domain e schema/RLS foram executados no E2E; os fluxos transacionais indicaram rollback/sem resíduos onde informado.

## Gates

- **DB-01 PARTIAL**: negação de segundo bootstrap, preservação do fundador e testes aplicáveis passaram; first-claim/idempotência em instalação vazia e grants globais positivos com MFA não executados em estado seguro.
- **DB-02 BLOCKED**: dependerá de DB-01 PASS. Não avançar migrations 0056–0061 no principal até satisfazer o gate, conforme ordem obrigatória.
