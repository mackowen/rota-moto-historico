# Matriz funcional — Campanha 0295

Execução autenticada via Chromium/CDP em fixture backend-issued com MFA verificada, `rotamoto_e2e`, rollback transacional. Não usar linhas agregadas como PASS para cenários não executados.

| Área/operação | Mecanismo/expectativa | UI executada e evidência | ACK/readback / reload | Defeito/causa | Estado |
|---|---|---|---|---|---|
| Backup GET status | GET canônico `/api/admin/backup`; somente leitura | 0294 fixture UI registrou 404; 0295 backend atual consultado sem sessão respondeu HTTP 503 `BACKUP_ADMIN_NOT_CONFIGURED`; [investigação](backup-route-investigation.md) | Nenhum estado canônico gravado; sem reload UI por runtime configurado | 404 era fallback do harness de fixture sem handler, não rota ausente. Runtime API reconhece rota mas capability/configuração de Backup não habilitada. | BLOCKED_BY_CAPABILITY |
| Backup config/jobs/destination/restore | API exige store, MFA recente e audit; restore destrutivo proibido | Não exercitado; nenhuma escrita ou restauração | Sem ACK/readback | Operações permanecem sem ambiente configurado/autorizado | BLOCKED |
| Perfil de acesso sintético | POST/PATCH canônicos de role e GET readback | Em 0294, perfil `orders.read` criado pela UI e lido; em 0295 testes de identidade passaram, sem nova UI administrativa | 0295 não repetiu reload/readback na UI | Sem defeito novo reproduzido; CRUD total não coberto nesta campanha | PARTIAL |
| Usuário sintético — editar campos | Contrato atual autoriza membership role/status, não nome/email do User | Não exercitado pela UI nesta campanha; sem edição de User canônico | Não aplicável | Não inventar capacidade/endpoint; preservar owner e contas reais | BLOCKED_BY_CAPABILITY (nome/email); PARTIAL (demais operações) |
| Membership — role/status | PATCH `/api/admin/memberships/:id`, ownership e RBAC | Suite `test-identity-ui.js` passou; UI E2E não percorreu editar membership em 0295 | Sem readback UI novo | Sem defeito reproduzido nesta execução | PARTIAL |
| Membership — vínculo Driver | PUT/DELETE canônico; associação tenant-scoped | Fixture sintética criada e vínculo alterado pelo handler autorizado para preparar identidade operacional; Browser Motoboy abriu autenticado por MFA. Sem interação UI da Equipe | Sessão retornou Driver canônico; cleanup reverteu fixture | Fixture inicial tentou usar owner como identidade de Driver; corrigimos setup para respeitar ownership | PARTIAL |
| Distribuição — card “Distribuir” | UI envia alteração e aguarda ACK/readback | Executado com pedido/Driver sintéticos; modal, seleção e confirmação pela UI Restaurante | Delivery canônico `ASSIGNED`, Driver esperado; toast sucesso | Nenhum defeito no fluxo Restaurante reproduzido | PASS_SCOPE |
| Distribuição — “Distribuir mais corridas” | UI seleciona Order pendente para Driver selecionado | Executado via modal da UI Restaurante com segunda entrega sintética | Delivery canônico `ASSIGNED`, mesmo Driver, revisão confirmada e toast | Nenhum defeito reproduzido | PASS_SCOPE |
| Distribuição — sem elegíveis | Estado vazio sem envio de operação | Driver indisponível e Orders já atribuídas; modal mostrou zero elegíveis | Nenhum novo ACK de atribuição | Sem defeito observado | PASS_SCOPE |
| Motoboy — pull/visualização da corrida atribuída | Sync pull Motoboy e projeção IndexedDB/UI | Browser autenticado; pull incluiu Delivery `ASSIGNED`; cliente primeiro reproduziu mismatch e após correção mostrou as corridas em “Entregas”; [report](dispatch-cross-app-report.json) e [trace](dispatch-cross-app-trace.jsonl) | ACK/readback canônico, IndexedDB com 2 corridas e tela com pedidos sintéticos; reload manteve as corridas | `SYNC_PACKET_IDENTITY_MISMATCH` vinha de resolver device ID duas vezes no ciclo. Um snapshot único agora é passado a `buildSyncPacket()`; regressão automatizada e Browser repetido passaram. | PASS_SCOPE (após correção) |
| Concorrência, clique duplo, replay de assignment, HTTP error, sem permissão | Uma atribuição por Delivery; idempotência/revisão e feedback | Não executados. 0289 replay de packet de cadastro Driver não equivale a replay/conflito de atribuição | Sem readback desses cenários | Sem extrapolação | PARTIAL |
| Visual dispatch Restaurante | 360/390/768; claro/escuro | Modal e estado vazio; capturas anexas. Medidas 360/390/768 claro/escuro coletadas no runner | Resultado textual correspondente ao estado | Sem overflow no escopo visual coletado | PASS_SCOPE limitado às capturas/medidas |

## Fixture e segurança

A execução final E2E está `COMPLETED` com rollback e `databaseCommitted=false`; `tenantDatabaseCounts` confirma zero residual de companies, users, auth records, memberships, sessions, domain records, sync inbox/outbox e audit log após cleanup. Nenhuma escrita em `rotamoto` oficial. Nenhuma integração externa, credencial externa, restore ou alteração de roles/grants/MFA oficial. GET anônimo do runtime foi somente leitura.


## Correção de device ID

Motoboy agora recebe o mesmo `deviceId` capturado no início de `performServerSync()` ao construir o packet. `tests/test-sync-packet-device-identity.js` comprova uso do ID do ciclo e preserva o comportamento autônomo do export do packet. Browser autenticado repetido confirmou sync pull, duas corridas renderizadas e reload. Capturas `motoboy-deliveries-{360,390,768}-{light,dark}.png`.
