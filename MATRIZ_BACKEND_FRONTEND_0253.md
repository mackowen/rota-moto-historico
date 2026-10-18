# Matriz funcional — Campanha 0253

| Funcionalidade | Backend/API | Aplicativo/UI | Autorização | Persistência | Situação 0253 | Teste/evidência |
|---|---|---|---|---|---|---|
| Administrador geral/fundador | Não há conjunto completo de APIs globais comprovado | Painel global não existe como fluxo funcional comprovado | Deve ser papel global separado; promoção continua proibida sem autorização | Sem alteração | BLOCKED | Histórico 0234 descreve bootstrap de proprietário e CLI não executado; 0253 não criou grant nem migration. |
| Relatórios | Agregações canônicas `analytics.js`, renderer `analytics-view.js` | Tela Relatórios existente | Permissões/tenant do perfil atual | Dados locais/projeções server-side existentes | PARTIAL | `npm test` cobre analytics; não houve Browser autenticado, revisão visual por largura ou CSV nesta execução. |
| Atualização de Administração | Endpoints `/admin/company`, `/admin/memberships`, `/admin/roles`, `/admin/invitations`, `/admin/integrations` | `identity-ui.js` e páginas administrativas Restaurante | Mutation só anuncia após HTTP bem-sucedido; a leitura posterior é feita pelo endpoint autenticado e escopado | PostgreSQL authoritative; evento não carrega registros | PARTIAL | `BroadcastChannel` validado entre duas instâncias no mesmo contexto Browser e no teste unitário; não houve teste entre abas independentes, mutação autenticada Browser nem persistência SQL corrente. |
| Sincronização de domínio | `/sync/push`, `/sync/pull`, ACK por operação | `app.js` nos dois apps | Sessão, CSRF, instalação, tenant, MFA e autorização já existentes | PostgreSQL após ACK; IndexedDB mantém outbox/cache | PARTIAL | Publica somente após ACK validado com `accepted`/`duplicate`; unit e contrato passaram. Sem rodada runit autenticada em Browser. |
| Edição concorrente local | Snapshots e ACK canônico | Formulários Restaurant | Backend revalida permissões | Dados locais/server conforme contrato | PARTIAL | Refresh evita modal, formulário `data-userEdited` e foco em campo; teste estático e suíte completa. Conflito/offline não provado. |
| Convite de motoboy | `/admin/invitations`, membership invite/accept e binding driver existem | Equipe/Motoboys existente | `members.invite`, aceite autenticado e vínculo explícito | PostgreSQL | PARTIAL | Sem jornada nova em Browser nesta campanha; sem envio Gmail. |
| iFood/99Food/Keeta | Adaptadores/estados reais existentes | Páginas administrativas existentes | `integrations.manage`; consentimento externo necessário | PostgreSQL/worker/secret provider | PARTIAL / externo | Suítes de contrato passaram; nenhuma conta comercial conectada. |
| Equipe/identidade | PostgreSQL identity memberships/roles | Equipe no Restaurante e conta compartilhada | RBAC server-side; cache local não concede acesso | PostgreSQL + cache local | PARTIAL | `npm test` e 401 anônimo; `admin@local` não auditado em armazenamento persistente nesta execução. |
| Endereço empresarial | `/admin/company/location` | Administração → Empresa | `company.manage` e revisão otimista | PostgreSQL | PARTIAL nesta campanha; correção herdada de 0252 | Regressões anteriores mantidas; não houve novo write/readback SQL autenticado. |
| Motoboy sem sessão | `/identity/session`, `/admin/company`, `/domain/drivers` | Shell bloqueado até sessão | API nega anônimo | Nenhuma gravação | PASS anônimo | CDP real nos 2 frontends: acesso direto aos endpoints protegidos retorna 401. Autorização autenticada não retestada. |
| PWA update | Arquivos estáticos e Service Worker | Cache Restaurante v54, Motoboy v43.50 | Não aplicável | Cache shell; IndexedDB preservado | PASS no contrato | Testes atom-install/cache e navegação real; sem remoção de stores persistentes. |

## Evidências desta campanha

- Browser/CDP: `~/projetos/browser-tests/evidencias/campanhas/0253/browser-report.json` e capturas PNG privadas (0600); 10 screens por origem/largura e 20 imagens incluindo os dois temas.
- Chamadas não autenticadas: 401 para Company e Drivers nas duas origens; 0 exceções JS e 0 HTTP 5xx.
- Suítes completas `npm test` dos dois repositórios: PASS.
- A prova de sessão autenticada e PostgreSQL sob runit/role `rotamoto_e2e_app` permanece pendente; nenhuma fixture foi tratada como equivalente.
