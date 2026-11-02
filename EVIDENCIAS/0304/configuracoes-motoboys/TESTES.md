# Testes — Configurações → Motoboys

## Execução automatizada

- Restaurante `npm test` — **PASS** na execução serial final, incluindo `test-admin-driver-links.js`, identidade/UI, autorização de Driver, dispatch e contratos compartilhados.
- Motoboy `npm test` — **PASS**, incluindo `test-identity-ui.js`, navegação, topbar, offline/sync e contratos compartilhados.
- `npm run assets:check` nos dois aplicativos — **PASS**.
- `git diff --check` nos dois aplicativos — **PASS**.
- `node tests/test-backup-control.js` isolado — **PASS**. Uma primeira suíte Restaurante executada junto de Browser QA parou em `BACKUP_CONTROL_LOCK_UNSAFE`; a repetição integral serial passou, inclusive esse teste.

## Browser QA autenticado

Comando: `node .temporarias/0304-team-invitations-e2e.cjs --drivers-only`, em `~/projetos/browser-tests`.

Resultado final: `PASS_AUTHENTICATED_DRIVER_LINK_LIFECYCLE`; `browserErrors=0`; `DATABASE_STATE_RESTORED=PASS`; `companyInvariant=PASS_CHICO_ONLY`.

O Chromium usou perfil temporário isolado e login/MFA legítimos da fixture sintética de QA. As páginas estáticas foram obtidas dos serviços 8083 e 8084; as chamadas de negócio foram roteadas pelo harness para os handlers de produção e repositório PostgreSQL/RLS dentro da transação revertida. Portanto, a prova autenticada do fluxo não é um POST anônimo nem uma escrita persistente na API runit.

### Operações observadas

| Operação | HTTP | Readback/resultado |
|---|---:|---|
| Vincular membership ao Driver ativo | 200 | Membership PostgreSQL aponta para o Driver; UI confirma após reload da lista. |
| Repetir vínculo do mesmo Driver | 409 | `DRIVER_ALREADY_LINKED`; duplicidade não criada. |
| Vincular cadastro operacional inativo | 409 | `DRIVER_INACTIVE`. |
| Vincular sem `company.manage` | 403 | `FORBIDDEN`. |
| Ler Driver no Motoboy com vínculo ativo | 200 | Apenas o Driver autorizado da empresa ativa. |
| Encerrar vínculo com entrega ativa | 409 | `DRIVER_HAS_ACTIVE_DELIVERIES`; vínculo e acesso ficam intactos. |
| Encerrar após entrega terminal | 200 | `driver_id=null`, disponibilidade offline, presença encerrada; registro `DELIVERED` preservado. |
| Ler Driver no Motoboy após revogação | 403 | `DRIVER_LINK_REQUIRED`. |

### Viewports e hashes

Nos 12 casos (`restaurante|motoboy` × `claro|escuro` × `390×844|768×1024|1440×900`), largura de documento = largura útil; não houve overflow horizontal.

Hashes SHA-256 dos assets comparados local ↔ HTTP:

| Origem | Arquivo | HTTP | SHA-256 |
|---|---|---:|---|
| 8083 | `index.html` | 200 | `321a9d5c4a1137f522bd2263307f606a99f7fba85e11fae86c6f44f19b828eaf` |
| 8083 | `identity-ui.js` | 200 | `ae00f9057e75c083f6c6127a8fba574a5fa45f0bca1e7a9c40c4e5fa0ce0c421` |
| 8083 | `identity-ui.css` | 200 | `0db959dce7ff81e998467641da9359017d967ef63c5e65ef0a22f79bbaa8ce4f` |
| 8083 | `asset-manifest.js` | 200 | `801299968e3314a5af05b2f3da112e0eb1e63cfefb6c991dcb11f35549d5b668` |
| 8084 | `index.html` | 200 | `c3ad7c2c951cf388ec0d5c2fec29084cfce4882e08a6a7ba00249d1dfd9a8e03` |
| 8084 | `identity-ui.js` | 200 | `bac14492f5357f65e15f13d998e3d4782e98e5f839453c4aedc92625636bf0f8` |
| 8084 | `identity-ui.css` | 200 | `158c5fbd84e4144511ed8ad1aad6c2bf1009e03ea8d573bfd8756ee9e6d48918` |
| 8084 | `asset-manifest.js` | 200 | `c1f14f138d0274ccc244d601a3fa7effad9b01eb27c5a358eea2eb9c6d08b1a7` |

API 8787: `/health/ready` 200; `/api/admin/memberships` and `/api/motoboy/domain/drivers?limit=1` return 401 without a session, as expected. A positive authenticated write was exercised through the rollback-backed production handlers, not persisted through the runit process.
