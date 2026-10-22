# Matriz funcional consolidada — campanhas 0290–0294

Escopo cumulativo: somente os estados comprovados nas campanhas anteriores e nesta campanha são mantidos como PASS_SCOPE. Os testes 0294 usaram Chromium/CDP autenticado, sessão backend-issued e MFA verificada. Local preferences foram exercitadas em profile isolado; persistência local não é publicação canônica no servidor.

| Seção/campo | Mecanismo | Browser/UI | Readback/reload | Defeito/correção | Estado 0294 |
|---|---|---|---|---|---|
| Empresa — nome/telefone | PUT Company com revisão, ACK e GET | PASS_SCOPE 0292 | Reload e aba independente comprovados | Feedback corrigido em 0292 | PASS_SCOPE (0292) |
| Empresa — endereço e coordenadas null | PUT localização Company e leitura canônica | PASS_SCOPE 0292 | Reload/readback e projeção Logística; sem coordenadas antigas | Projeção corrigida em 0292 | PASS_SCOPE (0292); Motoboy cross-app permanece pendente |
| Empresa — fuso horário | PUT revisionado e GET readback | PASS_SCOPE 0292 | Reload/readback comprovados | expectedVersion/ACK/readback corrigidos em 0290 | PASS_SCOPE (0292) |
| Operação — delivery.perKm | Autosave IndexedDB serializado | 0 → 0,5 pela UI | Navegação entre seções não exercitada; reload confirmou 0,5 | Sem defeito reproduzido | PASS_SCOPE para UI/reload; PARTIAL navegação |
| Operação — delivery.minFee | Autosave IndexedDB serializado | 0 → 1,25 pela UI | Navegação entre seções não exercitada; reload confirmou 1,25 | Sem defeito reproduzido | PASS_SCOPE para UI/reload; PARTIAL navegação |
| Operação — delivery.round | Autosave IndexedDB serializado | false → true pela UI | Reload confirmou true | Sem defeito reproduzido | PASS_SCOPE para UI/reload; PARTIAL navegação |
| Operação — restante do modelo, faixas, repasse e routeGroupingPolicy | local autosave/Company canônica conforme campo | Não testado nesta campanha | Sem readback 0294 | Não atribuir defeito | PARTIAL |
| Logística e Frota — campos cobertos nas matrizes 0291/0292 | APIs canônicas com ACK/readback | PASS_SCOPE nos subsets documentados | Reload/erro/retry conforme matrizes anteriores | Não repetido em 0294 | PASS_SCOPE restrito ao subset anterior |
| Impressão — enabled/mode/QR | Autosave IndexedDB | PASS_SCOPE 0293 | Navegação/reload | Sem defeito reproduzido | PASS_SCOPE (0293) |
| Origens — nome local de iFood | Autosave IndexedDB | `iFood` → `iFood 0294` via UI | Reload confirmou nome; retorno à seção não exercitado | Sem defeito reproduzido; nenhuma conexão externa | PASS_SCOPE UI/reload; PARTIAL navegação |
| Origens — demais nomes, disponibilidade, identificadores e mapeamentos | Autosave IndexedDB | Não alterados/testados nesta campanha | Sem readback 0294 | Não atribuir defeito | PARTIAL |
| Aparência — tema claro/escuro/auto, cor, idioma | Autosave IndexedDB | PASS_SCOPE 0293 | Navegação/reload/aba conforme matriz 0293 | Corrida de render/feedback corrigida em 0293 | PASS_SCOPE (0293) |
| Relatórios — período/gráficos | Autosave IndexedDB | PASS_SCOPE 0293 | Navegação/reload | Sem defeito reproduzido | PASS_SCOPE (0293) |
| Eventos — preferências | Autosave IndexedDB | PASS_SCOPE 0293 | Navegação/reload | Sem defeito reproduzido | PASS_SCOPE (0293) |
| Navegação — dez atalhos editáveis | Autosave IndexedDB | Todos toggled via UI; estados anotados no JSON sanitizado | Reload confirmou todos; ciclo de sair/voltar não comprovado nesta tentativa | Sem defeito reproduzido | PASS_SCOPE UI/reload; PARTIAL navegação |
| Segurança local — retenção de logs | Autosave IndexedDB local | 365 → 37 | Reload confirmou 37 | Política local não modifica auditoria do servidor | PASS_SCOPE UI/reload; PARTIAL navegação |
| Segurança local — histórico relacionado | Autosave IndexedDB local | true → false | Reload confirmou false | UI informa que eventos críticos do backend não podem ser desativados | PASS_SCOPE UI/reload; PARTIAL navegação |
| Integrações administrativas — iFood, 99Food, Keeta | Leitura Company/API; ações de conexão são imediatas | GET carregou estado; nenhuma autorização/conexão acionada; sem campos editáveis de configuração apresentados | Sem escrita; sem reload de estado de integração | Sem defeito de formulário reproduzido; integração externa não acionada | PASS_SCOPE de leitura; comunicação externa não executada |
| Backup — frequência, hora, retenção, destino, metas | Endpoint administrativo do serviço de backup | UI mostrou indisponibilidade; `GET /api/admin/backup` retornou 404 e nenhum formulário foi renderizado | Sem readback/configuração | Não simulado; ausência de serviço/capacidade E2E | BLOCKED_BY_CAPABILITY |
| Equipe — perfil customizado | POST `/admin/roles`, subset de permissão autorizado | Criado pela UI com somente `orders.read` | GET/lista canônica confirmou role; reload não comprovado nesta execução | Sem defeito reproduzido | PASS_SCOPE para criação/readback; PARTIAL reload |
| Equipe — convite, edição de membership e proprietário | APIs administrativas e RBAC | Não testados; owner de sistema protegido | Sem readback | Nenhuma edição real/privilegiada feita | PARTIAL/BLOCKED_BY_CAPABILITY conforme operação |
| Segurança — controles de identidade/MFA e auditoria do servidor | APIs de identidade e gate administrativo | Não acessados além da preferência local | Sem alteração de credencial/MFA/política | RBAC/gates não contornados | BLOCKED para ações administrativas não autorizadas |
| Toast Segurança (RM-AUD19-13) | Feedback de autosave | Capturas 360/390/768 claro/escuro sem overflow horizontal | Safe area física Android não testada | Nenhuma correção visual necessária/reproduzida | PASS_SCOPE limitado às capturas |

## Evidências e limites

- Sessão autenticada/MFA: `EVIDENCIAS/0294/browser-admin-settings.json`.
- Capturas responsivas: `0294-security-{360,390,768}-{light,dark}.png`.
- Fixture `cde30ba2-533c-4ea5-9613-942a0188bbd0` em `rotamoto_e2e`: `databaseCommitted=false`, cleanup `COMPLETED`, contagens tenant-scoped zero.
- Uma execução posterior que tentou ampliar navegação/reload após editar Equipe encontrou erro de lifecycle da página; não é usada como evidência de sucesso. A fixture dessa tentativa também finalizou rollback. Não declarar navegação-away para os novos campos 0294.
- Não executados: negativos HTTP 400/401/403/409/500/503, timeout, ACK perdido, resposta incompleta, readback divergente, retry, nova sessão independente, edição de usuário/membership, gravação de Backup e comunicação externa de marketplace.
- As matrizes de 0291/0292/0293 permanecem intactas e governam os subsets aprovados nas campanhas anteriores.
