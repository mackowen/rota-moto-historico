# Migration matrix — Campanha 0304 Parte J

Snapshot read-only: 2026-10-27 UTC. Every row in this table is based on the official `rotamoto.schema_migrations` ledger and E2E migrator ledger. Official source checksums match local files through `0047`; E2E checksums match through `0055`.

| ID | Migration | Official | E2E | Dependency/order |
|---:|---|---|---|---|
| 0001 | identity_tenant_foundation | Applied | Applied | Root schema |
| 0002 | identity_provisioning_tokens | Applied | Applied | 0001 |
| 0003 | provisioning_membership_constraint | Applied | Applied | 0002 |
| 0004 | foundation_integrity_constraints | Applied | Applied | 0003 |
| 0005 | canonical_domain_sync | Applied | Applied | 0004 |
| 0006 | global_event_idempotency | Applied | Applied | 0005 |
| 0007 | sync_permissions | Applied | Applied | 0006 |
| 0008 | sync_installation_identity | Applied | Applied | 0007 |
| 0009 | domain_model_constraints | Applied | Applied | 0008 |
| 0010 | route_validation_runtime_grant | Applied | Applied | 0009 |
| 0011 | runtime_integration_read | Applied | Applied | 0010 |
| 0012 | identity_rbac_lifecycle | Applied | Applied | 0011 |
| 0013 | membership_driver_binding | Applied | Applied | 0012 |
| 0014 | native_totp_lifecycle | Applied | Applied | 0013 |
| 0015 | proof_media_upload_intents | Applied | Applied | 0014 |
| 0016 | company_timezone | Applied | Applied | 0015 |
| 0017 | logistics_fulfillment | Applied | Applied | 0016 |
| 0018 | delivery_geo_snapshots | Applied | Applied | 0017 |
| 0019 | logistics_provider_secret_least_privilege | Applied | Applied | 0018 |
| 0020 | provider_integration_runtime | Applied | Applied | 0019 |
| 0021 | provider_claim_tenant_scope | Applied | Applied | 0020 |
| 0022 | provider_ambiguous_lease_recovery | Applied | Applied | 0021 |
| 0023 | provider_worker_least_privilege | Applied | Applied | 0022 |
| 0024 | provider_tracking_status_grant | Applied | Applied | 0023 |
| 0025 | provider_event_worker_grants | Applied | Applied | 0024 |
| 0026 | provider_fulfillment_event_grants | Applied | Applied | 0025 |
| 0027 | logistics_intelligence_settings | Applied | Applied | 0026 |
| 0028 | external_account_secret_least_privilege | Applied | Applied | 0027 |
| 0029 | logistics_human_decisions | Applied | Applied | 0028 |
| 0030 | logistics_decision_stale_approval | Applied | Applied | 0029 |
| 0031 | logistics_decision_worker_projection | Applied | Applied | 0030 |
| 0032 | logistics_route_origin_settings | Applied | Applied | 0031 |
| 0033 | company_operational_location | Applied | Applied | 0032 |
| 0034 | company_route_grouping_policy | Applied | Applied | 0033 |
| 0035 | marketplace_runtime | Applied | Applied | 0034 |
| 0036 | marketplace_lifecycle_hardening | Applied | Applied | 0035 |
| 0037 | marketplace_worker_secret_boundary | Applied | Applied | 0036 |
| 0038 | marketplace_resolver_lifecycle_grants | Applied | Applied | 0037 |
| 0039 | driver_operational_availability | Applied | Applied | 0038 |
| 0040 | restaurant_driver_queue | Applied | Applied | 0039 |
| 0041 | delivery_custody_return | Applied | Applied | 0040 |
| 0042 | marketplace_99food_runtime | Applied | Applied | 0041 |
| 0043 | 99food_application_and_cash_commands | Applied | Applied | 0042 |
| 0044 | 99food_distributed_rate_limit | Applied | Applied | 0043 |
| 0045 | installation_bootstrap | Applied | Applied | 0044 |
| 0046 | bootstrap_legacy_installation_latch | Applied | Applied | 0045 |
| 0047 | administrative_mfa_recovery | Applied | Applied | 0046 |
| 0048 | platform_administration | Pending | Applied | 0047 |
| 0049 | platform_administration_hardening | Pending | Applied | 0048 |
| 0050 | company_role_descriptions | Pending | Applied | 0049 |
| 0051 | company_role_description_runtime_update | Pending | Applied | 0050 |
| 0052 | financial_ledger | Pending | Applied | 0051 |
| 0053 | financial_event_time_independence | Pending | Applied | 0052 |
| 0054 | adjustment_event_reference | Pending | Applied | 0053 |
| 0055 | financial_reference_uniqueness | Pending | Applied | 0054 |

Local source has 55 consecutive migrations, 0001–0055. Official has 47 consecutive ledger rows, 0001–0047; E2E has 55, 0001–0055. No intermediate migration is assumed promoted. The runner applies the ordered chain, one transaction per migration, under a PostgreSQL advisory lock.

## Dependency, compatibility and rollback risks

| Migration(s) | Dependencies and change | Rollback / promotion risk |
|---|---|---|
| 0001–0004 | Identity, tenant foundation and integrity constraints. | Foundational rollback can remove identity/data; not routine reversal. |
| 0005–0018 | Canonical records/sync, RBAC, timezone and logistics. | FK/RLS/constraint changes; downs may reject populated state. |
| 0019–0028 | Provider secrets, integration runtime, worker grants and marketplace integration. | Security-sensitive grants; use forward fixes. |
| 0029–0040 | Logistics decisions/settings, marketplace and driver operations. | Rollback depends on live operational rows and grants. |
| 0041 | Depends on companies/users/domain_records from 0001/0005. Exact checksum `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c` matches official and local. Adds tenant-scoped custody ledger, RETURN relationship constraint and unique one-return-per-original index. | Down drops custody records/index and restores narrower relationship check; unsafe after custody/return use. |
| 0042–0044 | 99Food runtime, cash commands and distributed rate limit over marketplace/RBAC. | Review operational data and grants before any rollback. |
| 0045–0047 | Installation bootstrap and MFA recovery. 0047 is the official head. | Down may invalidate bootstrap/recovery history. |
| 0048 | Platform administrator/bootstrap/audit tables, policies and security-definer functions; depends on users, memberships, companies and audit guard. Officially pending. | Down refuses after administrator/audit/latch history exists. |
| 0049 | Hardens 0048 functions. Officially pending. | Down always raises; retain hardened functions and correct forward. |
| 0050 | Adds `roles.description` text/check/default. Officially pending. | Down drops the column and any entered descriptions. |
| 0051 | Grants runtime column UPDATE for 0050. Officially pending. | Down revokes the grant; coordinate application compatibility. |
| 0052 | Adds `finance.read/manage`, attaches them to `company.manage`, creates immutable `financial_events` with tenant RLS, FKs to company/user/domain records/events, cents/currency/state checks and indexes. Depends on `permissions`, `role_permissions`, `companies`, `users`, and `(company_id,record_id)` uniqueness in `domain_records`. | Down refuses if any event exists; otherwise drops the ledger and permission seeds. Check existing permission semantics before promotion. |
| 0053 | Relaxes `occurred_at <= created_at` from 0052. | Down re-adds the check and can fail after accepted event timestamps violate it. |
| 0054 | Replaces event-reference check to allow adjustment references. | Down rejects adjustment references; unsafe after adjustments. |
| 0055 | Unique normalized reference index scoped to company, kind and order/earning. | Down only drops the index. Duplicate preflight is required if records could exist before index creation. |

## Read-only catalog findings and limits

Official PostgreSQL is 18.6. Authenticated as `rotamoto_auditor`, read-only transaction confirmed `on`; role is non-superuser, has no create/temp privileges, no role memberships and no `BYPASSRLS`. Its column-level access permits reading the migration ledger, while it has no `SELECT` on operational tables. The official ledger's 47 checksums all match local source. `delivery_custody_operations` exists with RLS/FORCE; `financial_events`, `platform_administrators` and `roles.description` are absent.

Official catalog reported 853 constraints, zero unvalidated constraints/FKs, 128 indexes and zero invalid indexes. This validates catalog state, not a fresh row-by-row recheck. No business-row counts or coverage were queried: the authorized auditor lacks table SELECT. Existing `permissions`/`role_permissions` values and financial-order coverage are therefore unverified. Do not substitute `rotamoto_app`, `rotamoto_migrator` or an administrator for this audit.

E2E is also PostgreSQL 18.6 and has all 55 migrations/checksums, zero invalid constraints/FKs and zero invalid indexes; financial constraints and reference index are valid. E2E is an already-migrated integration schema, not a clean copy of official business data. No authorized sanitized copy or validated promotion dump was found in accessible local checkpoint/evidence paths, so there was no fresh promotion/rollback rehearsal. The protected shared E2E database was not downgraded or reset.
