# Campanha 0304 — Parte L: atualização controlada do PostgreSQL

**Data:** 2026-10-27 UTC
**Base Restaurante:** `4fcb095bae2f7f2803668207a488ccae391d20a6`
**Resultado:** **BLOCKED antes de qualquer alteração.** A autorização do proprietário para atualizar `rotamoto` foi respeitada, mas o gate obrigatório de backup recuperável não passou. Nenhum banco foi criado; nenhum backup/export ou migration foi executado.

## Pré-voo e estado confirmado

| Repositório | Branch / HEAD | Estado observado |
|---|---|---|
| Restaurante | `codex/campaign-0304-visual-consolidated` / `4fcb095bae2f7f2803668207a488ccae391d20a6` | Limpo; tag `v5.50-ui-mobile-fix5` presente |
| Motoboy | `main` / `64d2e13d8e455f48b20b32b396e9c49ba7553e0b` | Limpo |
| browser-tests | `codex/campaign-0294-admin-settings` / `57cb7745828e24d50502bec89061d2ceb59e0200` | Alterações e remoções preexistentes extensas preservadas, sem tocar |
| codex-historico | `main` / `412e0326a25574360a0f755ec671231b3fac136c` | HEAD Parte K; diretório untracked `login-redesign-2026-10-25/` preexistente preservado |

PostgreSQL oficial acessado como `rotamoto_auditor`, apenas em `BEGIN READ ONLY`: server 18.6, database `rotamoto`, ledger contíguo 47 linhas de `0001_identity_tenant_foundation` a `0047_administrative_mfa_recovery`. Os 47 checksums comparados ao código local tiveram zero divergência. O conjunto pendente local é exatamente 0048–0055: `platform_administration`, `platform_administration_hardening`, `company_role_descriptions`, `company_role_description_runtime_update`, `financial_ledger`, `financial_event_time_independence`, `adjustment_event_reference`, `financial_reference_uniqueness`.

`rotamoto_e2e` foi consultado em transação read-only com `rotamoto_migrator`: 55 migrations, da 0001 à 0055. Não foi alterado. A tag baseline permanece intacta. Estado do histórico anterior a L é commit K acima.

## Gate obrigatório de backup

Mecanismo existente inspecionado: recovery set do projeto, dump PostgreSQL custom criptografado, autenticação AES-256-GCM/HMAC e hashes, com `rotamoto_backup`; verificação por `backup:verify`/`backup:inventory`. Runbook também requer chave privada recuperável, diretórios privados de backup e mídia, log privado de auditoria/ator, além de configuração da origem exata `rotamoto`.

Nesta sessão faltavam as configurações de origem, key file, destino, mídia, log/ator e opt-in operacional; `~/projetos/backups` era privado e vazio. Espaço observado no filesystem: cerca de 115 GB disponíveis. Capacidade não resolve falta de chave/configuração/custódia. Os requisitos de recuperação não permitem gerar silenciosamente uma nova chave sem definir sua custódia e cópia recuperável.

Por isso, **não executei `backup:create`, `pg_dump`, inventário que dependa da chave, nem tentei usar outra role**. Nenhum artefato foi criado, substituído ou apagado. Nenhum valor de credencial/chave foi lido ou registrado. Sem backup validado, não invoquei `backend/postgres/migrate.js up`, não apliquei migrations e não fiz rollback.

## Pós-condição e integridade

Após a decisão de interrupção, `rotamoto` continua no ledger 0001–0047 e `rotamoto_e2e` em 0001–0055, conforme leituras read-only. Não há lançamento financeiro artificial criado por esta Parte L. Nenhuma tabela, configuração, permissão, schema ou dado foi escrito em qualquer banco. Não foram executados testes que escrevem fixtures, pois nenhuma alteração de código/schema ocorreu e o objetivo de migração foi bloqueado antes da operação.

## Gates

| Requisito | Estado | Evidência/limite |
|---|---|---|
| Destino e ponto inicial | PASS | `rotamoto`, PG 18.6, ledger contíguo 0001–0047. |
| Checksums e migrations pendentes | PASS | 47/47 checksums locais iguais; pending 0048–0055. |
| `rotamoto_e2e` preservado | PASS | Read-only: 55 migrations; nenhum write. |
| Backup recuperável oficial | **BLOCKED** | Key/destino/mídia/auditoria/opt-in não configurados; nenhum backup feito. |
| Migrations 0048–0055 | **BLOCKED** | Não aplicadas porque o gate de backup falhou; sem chamada ao executor. |
| Pós-validação/API | BLOCKED | Não aplicável antes da atualização; schema permaneceu inalterado. |
| Dados financeiros artificiais | PASS | Nenhum criado em `rotamoto`; nenhuma fixture executada. |
| Banco oficial sem escrita nesta Parte L | PASS | Somente consultas `READ ONLY` de identificação e ledger; nenhum DDL/DML. |
| Campanha / G14 | PARTIAL / **FAIL** | 0304 permanece aberta; G14 continua exigindo aprovação visual expressa. |

## Retomada necessária

Para prosseguir, o proprietário/operador precisa provisionar e confirmar, por canal seguro, a chave existente recuperável e sua custódia, diretório privado de backup/mídia, origem `rotamoto` na role `rotamoto_backup`, log privado/ator operacional e opt-in do executor compatível com o ambiente. Então: gerar recovery set sem sobrescrever artefatos, verificar criptografia/hash/tamanho/TOC e acessibilidade da chave. Se esse gate passar, fazer preflight novamente e executar o migration runner oficial em ordem com log de duração por migration, interrompendo na primeira falha. Sem necessidade, não criar bancos adicionais; esta Parte L não criou nenhum.

Não se recomenda retry antes que o gate de backup esteja concretamente satisfeito. Nenhuma correção automática ou rollback é necessário porque nenhuma migration foi iniciada.
