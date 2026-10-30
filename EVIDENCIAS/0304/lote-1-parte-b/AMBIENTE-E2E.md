# Ambiente E2E descartável

## Alvo e isolamento

Banco criado para esta execução: `rotamoto_e2e_lote1b_20261030_3e9a4c12`. O runner exige `NODE_ENV=test`, marcador `ROTAMOTO_DISPOSABLE_CAMPAIGN=0304B`, nome gerado com sufixo aleatório, loopback/porta local e role migrator. A opção descartável não permite downgrade. Não foi usada conexão de `rotamoto` nem do `rotamoto_e2e` persistente para escrita.

## Schema e correções de infraestrutura

O runner oficial aplicou migrations 0001–0063 no banco descartável; consulta `status --part-b-disposable` confirmou ledger e checksums. Foram necessárias duas migrations aditivas:

- `0062_disposable_e2e_runtime_access`: corrige o acesso de runtime/schema e permite o bootstrap de instalação apenas no alvo descartável explicitamente guardado, mantendo as provas de founder, latch, autorização de uso único e auditoria.
- `0063_identity_runtime_role_grants`: grants de runtime de menor privilégio que faltavam em instalação limpa, mantendo FORCE RLS.

Reprodução: a instalação limpa retornava HTTP 500/SQLSTATE 42501 por grants ausentes. Depois da correção, bootstrap real por HTTP passou. As duas migrations foram aplicadas **somente** no banco descartável. Os bancos persistentes foram consultados em leitura: ambos continuam em 0061; founder/latch/grant de `rotamoto_e2e` preservados.

## Provisionamento e limpeza

Fixtures sintéticas incluíram empresa, Super ADM via bootstrap legítimo, administrador empresarial, usuário limitado e entregador vinculado. MFA foi estabelecido pelo fluxo suportado e códigos permaneceram apenas em memória do harness. Testes com escrita usaram transação/savepoint e cleanup; consulta final mostrou zero usuários/empresas/memberships/grants/dados operacionais residuais na fixture transacional. O banco de schema permanece vazio de fixtures e identificado como descartável para reprodução; não é banco persistente do proprietário.

## Verificações executadas

- Primeiro bootstrap em banco vazio e repetição idempotente/conflito: PASS.
- Bootstrap com founder pré-existente e segundo owner sem elevação: PASS; replay não alterou identidade/grant.
- Identidade HTTP, login/MFA, sessão, CSRF e respostas de conflito: PASS.
- RLS multi-tenant e ACL em 55 tabelas/40 tabelas FORCE RLS: PASS.
- Lifecycle integrado e sincronização com rollback: PASS.
- Status/checksums 0063 no descartável: PASS.

As saídas completas e comandos estão em `TESTES.md`; URLs com senha não foram registradas.
