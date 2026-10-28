# Dados, DTOs e contratos

| DTO/operação | Campos lidos | Tratamento no frontend | Persistência/segurança |
|---|---|---|---|
| Empresas (`GET /platform-admin/companies`) | `id,name,status,member_count` | Validação; aceita snake/camel; status traduzido; contagem nula não vira 0 | Só ação `PATCH` já existente; MFA/CSRF/auditoria permanecem no backend |
| Usuários (`GET /platform-admin/users`) | `id,email,email_verified,disabled,company_count,platform_admin` | Booleans estritos; privilégio global atual separado; latch mostrado em Settings independente | Suspensão/reabilitação usa endpoint existente e releitura |
| Vínculos (`GET /platform-admin/memberships`) | `id,company_id,company_name,user_id,email,status,role_name,has_driver_link` | Estado/papel traduzidos; origem explicitamente não fornecida | Não há edição inventada; isolamento e contexto pertencem ao endpoint |
| Perfis (`GET .../roles`) | `id,role_key,display_name,is_system_template,protected,permissions,permission_catalog` | catálogo e grants validados; grants fora do catálogo falham fechado | `PATCH .../permissions` preserva endpoint/RBAC; `owner` bloqueado também no servidor |
| Totais financeiros | `companyId,scope,events[{eventKind,currency,eventCount,amountMinor}]` | Um tenant por consulta e datas explícitas; currency validada; unidades menores formatadas por moeda; `bank_settlement_verified=false` não é chamado de liquidação | API 0059 agrega tenant/período e audita. Nenhum valor real consultado nesta execução |
| Políticas seguras | `scope,platform_admin_mfa_required,tenant_isolation,founder_claimed,financial_review` | traduzidas e somente leitura; bootstrap histórico não equivale a privilégio efetivo | Deployment-managed; nenhuma variável/segredo é exposto ou editável |

`amountMinor` permanece string decimal inteira até a formatação com `BigInt`, evitando perda de precisão. Não se somam eventos de tenants diferentes nem se confunde valor comercial, evento financeiro e liquidação bancária. Não houve mudança em `CONTRACT.md`, migrations ou APIs.

Validação dos contratos pela suíte: `tests/test-platform-admin-http.js` sintético PASS; `tests/test-platform-admin-ui.js` valida as fronteiras e os rótulos. Navegação autenticada e readback de produção ficam BLOCKED, sem uso de credencial privilegiada alternativa.
