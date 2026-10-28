# Checkpoint inicial — Parte S.1

Coletado em 2026-10-28, antes das alterações da Parte S.1. O primeiro arquivo de trabalho da fase registra este estado; nenhuma alteração do aplicativo ou banco foi feita para produzir o checkpoint.

## Git e baselines

| Repositório | Branch / HEAD inicial | Estado inicial | Baseline verificada |
|---|---|---|---|
| Restaurante | `codex/campaign-0304-parity-s` / `bc818cca8846e4e626a2f9040f1a0ac5c7d9b088` | Tinha alteração pré-existente não commitada em `tests/test-identity-http-postgres.js`. O diff separa bootstrap por estado global, consulta estado por conexão migrator e compara estado antes/depois; será revisado e preservado, não descartado. | `v5.50-ui-mobile-fix5` → `9ebb7098725200bdec82e79be1e9ea622fe20120` |
| Motoboy | `codex/campaign-0304-parity-s` / `16f000994b81fb87f53e8c0c606deb8b20b2754c` | Limpo. | `v39.6-ui-mobile-fix2` → `d5b8f463f9daec615fecf1b01ff7f61533fd1827` |
| Histórico | `codex/campaign-0304-bootstrap-p` / `6f33064c122e04a50ab10bca59377e50306b3e31` | Mantém diretório preexistente e não rastreado `EVIDENCIAS/0304/login-redesign-2026-10-25/`; será preservado sem staging. | Nenhuma alteração de tag nesta fase. |

A Parte S anterior já tem commits locais Restaurante `bc818cc` e Motoboy `16f0009`; histórico `6f33064` está em `origin/main` por fast-forward.

## Serviços

- PostgreSQL loopback `127.0.0.1:5432`: `pg_isready` respondeu “accepting connections”; processo PostgreSQL ativo.
- Nginx: processo master e worker ativos.
- Endpoints locais `8081`, `8082`, `8083`: `/` responde HTTP 200; `/api/identity/session` responde HTTP 401 sem sessão, indicando API atrás do proxy e gate anônimo esperado. `/health`, `/ready` e `/api/health` retornam 404; não são endpoints de health configurados. Não alterei serviços.

## Bancos e fundador E2E

- `rotamoto_e2e`: runner oficial `status` confirma ledger 0001–0061 aplicado e checksums compatíveis com os arquivos locais.
- `rotamoto`: runner oficial confirma ledger 0001–0055 e 0056–0061 pendentes.
- Consulta READ ONLY autorizada no E2E confirmou exatamente um grant global ativo e que o `founder_user_id` do latch corresponde ao grant ativo. A conta vinculada ao latch está habilitada e verificada.
- Tentativa de contar memberships/roles pelo `rotamoto_migrator` retornou zero sob o contexto sem tenant; como há RLS e a consulta não abriu contexto empresarial autenticado, isso **não comprova ausência de membership**. Vínculo empresarial atual: BLOCKED para esta leitura; nenhuma RLS foi contornada. Nenhum ID/email/segredo foi registrado.
- Não houve escrita em nenhum banco durante o checkpoint. O teste falho de bootstrap da Parte S anterior já havia executado e revertido sua transação; esta fase preserva o fundador e seu grant.

## Registros existentes lidos

Foram lidos `REGISTROS/0304.md`, `RESUMOS/0304.md`, `EVIDENCIAS/0304/paridade-parte-s/README.md`, `MATRIZ_FUNCIONAL.md` e o backlog. A Parte S está **PARTIAL**: paridade semântica, editor de permissões, cache/assets e suítes npm PASS; E2E PostgreSQL parcial; principal em 0055; Browser autenticado bloqueado. Esta fase complementa esses artefatos sem reiniciar nem apagar o inventário.

## Pendências herdadas preservadas (lista de navegação, sem encerrar linhas existentes)

1. **0257–0258 Administração global:** `RM-0257-GLOBAL-ADMIN-E2E`, `RM-0255-GLOBAL-UI`, `RM-D1-ADMIN-AUDIT`/`RM-AUD19-11`, `RM-0258-GLOBAL-GATE` e `RM-0255-FOUNDER` permanecem PARTIAL/BLOCKED por leitura de auditoria, privilégio de operador e evidência/autorização histórica conforme seus registros.
2. **0256-D1 Configurações e MFA:** `RM-0256D1-SETTINGS-PERSISTENCE`, `AUTH-RESUME`, `MFA-QR`, `PRINT-QR`, `ADMIN-AUDIT-READ` e `VISUAL` mantêm requisitos campo a campo, recuperação/MFA, leitura auditada e revisão física.
3. **0256-C Identidade e Driver:** `RM-0256C-TEAM-RBAC`, `RM-0256C-DRIVER-LINK-UI`, `RM-0259-IDENTITY-INVITE-LIFECYCLE` e `RM-AUD19-18/19` continuam dependentes de ações UI, concorrência, reuso multiempresa e vínculo Driver sem autoassociação.
4. **0256-D e provedores externos:** `RM-0256D-MARKETPLACE-ADMIN`, `RM-0256D-EXTERNAL-HOMOLOGATION` e `RM-0256D-ANDROID` permanecem condicionados a sandbox/credenciais autorizadas e aparelho físico; nenhuma conectividade comercial foi presumida.
5. **0260–0264 identidade, persistência e operação:** edição de User, Company, localização, sync entre dispositivos, ACK/readback, corrida concorrente e ciclo logístico completo permanecem PARTIAL em seus registros.
6. **0265–0268 provedores/relatórios/lançamento:** homologação iFood/99Food/Keeta, readback canônico de relatórios e gate global de lançamento permanecem PARTIAL/BLOCKED.
7. **0275–0277 logística/mapas:** matriz restante de campos, geometria Route confirmada e disponibilidade de runtime OSRM no Termux/host Linux permanecem PARTIAL/BLOCKED.
8. **0285–0298 UI e persistência:** navegação/visual de todas as telas, preferências por campo, componentes legados, autenticação e QA físico seguem com os estados originais em `BACKLOG_MESTRE.md`/`PENDENCIAS.md`.
9. **0303-A:** `0303-A-AUTH`, `0303-A-VISUAL` e `0303-A-ACCOUNT` permanecem BLOCKED/PARTIAL, sem sessão visual autorizada.
10. **0304 atual:** `0304-PLAN-PERSIST`, `0304-SYNC-CONFLICT`, `0304-CROSS-APP-E2E`, `0304-OFFLINE-RECOVERY`, `0304-MAP-VISUAL`, `0304-RBAC-TENANT`, `0304-OWNER-APPROVAL`, `0304-ANDROID-HEADER`, `0304-DURABLE-E2E`, `0304-DELIVERY-EVENT-READBACK` e `0304-OFFLINE-REOPEN-RETURN` permanecem conforme estados registrados, sem fechamento nesta fase.
11. **Backlog anterior à 0257:** gates de recovery/DR/cópia externa, auditoria/escopos, QA físico e integrações continuam rastreados nos registros/crosswalks originais; nenhuma linha nem ID histórico será removido.

Fonte autoritativa para estado e critérios individuais: `PENDENCIAS.md`, `BACKLOG_MESTRE.md` e registros numerados. Esta lista é índice da retomada, não substitui nem altera essas linhas.
