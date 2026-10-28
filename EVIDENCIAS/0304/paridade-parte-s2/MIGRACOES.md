# Gate específico MIG-0056-0061

## Pré-aplicação — PASS

1. **Integridade/checksums:** runner `status` validou checksums aplicados locais. `rotamoto` estava aplicado até 0055; E2E já em 0061. Somente seis migrations estavam pendentes no principal.
2. **Pré-condições:** schema inclui `installation_bootstrap`, `bootstrap_authorizations`, `provisioning_requests`, `memberships`, `roles`, `companies`, `users`, `platform_administrators`, `platform_admin_bootstrap_latch`, `platform_admin_audit_log`, `financial_events` e funções de contexto requeridas.
3. **Compatibilidade dos dados:** consulta READ ONLY encontrou zero ações ou tipos de recurso de auditoria incompatíveis com as duas constraints de 0059. As constraints resultantes foram validadas.
4. **Escopo:** 0056–0058 substituem funções; 0059 recria duas constraints de auditoria e define funções globais; 0060–0061 refinam validação de `reason_code`. Não há backfill ou DML de migração sobre dados existentes. Os `DELETE/INSERT` dentro das funções financeiras/de delegação são executados apenas quando chamadas autorizadas, não durante DDL.
5. **Segurança/RLS:** migrations não removem policies nem desabilitam RLS. App/migrator sem BYPASSRLS; contexto administrativo continua exigido. ACLs esperados são `platform_admin_bootstrap_founder(text)` somente migrator e novas funções administrativas de contexto somente app/migrator, não PUBLIC.
6. **Testes aplicáveis:** identidade HTTP, negativas globais/financeiras, schema/data-plane RLS com rollback, logística e sync/domain passaram no E2E persistente. B (instalação vazia) e C (sessão MFA real) separados como NOT EXECUTED.
7. **Plano:** runner oficial, uma migration por transação com advisory lock; em erro parar, manter commits já aplicados no ledger e retomar apenas após diagnóstico; sem rollback automático/destrutivo.

## Aplicação — PASS

Runner oficial aplicou exatamente 0056, 0057, 0058, 0059, 0060, 0061. Nenhum usuário, empresa ou grant foi copiado do E2E; nenhum Super ADM foi concedido.

## Pós-aplicação — PASS

- `migrate.js status`: ambos os bancos listam 0001–0061 aplicadas e sem divergência de checksum.
- Tabelas e policies: comparação normalizada de 55 relações, flags RLS/FORCE e policies completa sem diff.
- Constraints e índices: comparação de definições sem diff; as duas constraints administrativas estão `convalidated=true`; zero índices inválidos.
- Funções: definições, owners, security-definer/search_path e hashes sem diff. As seis rotinas novas têm ACLs conforme contrato; `PUBLIC` não executa funções administrativas.
- Privilégios: zero grant global e latch não reivindicado no principal; founder/grant persistentes no E2E continuam vinculados.
- APIs: readiness oficial e E2E HTTP 200.

A única diferença de ACL identificada é específica de deployment e anterior à migration: role de backup/ACL de trigger entre os bancos. Está detalhada em README e não foi alterada.
