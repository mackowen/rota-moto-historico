# Campanha 0304 — publicação e verificação preventiva de Configurações

**Resultado: PARTIAL.** Os commits de Conta e segurança estão servidos em 8083/8084. Os contratos e testes direcionados das outras categorias passaram; não foi reproduzido defeito de produto nesses testes. A navegação autenticada das telas protegidas não foi concluída, portanto os fluxos dessas telas não recebem PASS nesta execução.

## Publicação verificada

Os serviços estáticos apontam para os checkouts locais; 8083 e 8084 responderam HTTP 200. Os bytes servidos conferem com o checkout nos arquivos alterados pela implementação de Conta e segurança:

| Serviço | Arquivo | SHA-256 HTTP | Resultado |
|---|---|---|---|
| Restaurante 8083 | `index.html` | `bc915867fec6a3b2d511bb70dff9586020be8ce23d8da68c823d795fbf39b19d` | MATCH |
| Restaurante 8083 | `asset-manifest.js` | `c4a75290c3c51b3d8ed22df3b00b312a7b6d635235042c643696c36c398eaf54` | MATCH |
| Restaurante 8083 | `identity-ui.js` | `6f4b9d6aa1b6f513ae7ca434b655cd6f933b4060dbb6dbd0bd7b58db7f0eca49` | MATCH |
| Restaurante 8083 | `identity-session-guard.js` | `a756dc6c863d76b955f99aa3e0c39f92ce67f372577f27b597423c8053a5faf7` | MATCH |
| Motoboy 8084 | `index.html` | `4ad3429186504a178bf80c4f5156ed7eb8c5bee20f3e6f38fd511c0d5f9da2af` | MATCH |
| Motoboy 8084 | `asset-manifest.js` | `5a08b342d247751bdf4b7c0012dc708d18ec6b883a4c2f72b6d4b1feb58abb6b` | MATCH |
| Motoboy 8084 | `identity-ui.js` | `6a721e435d0f792873513418621b2aefc8e8d9679906684f0e67c4b5db9ff7ba` | MATCH |
| Motoboy 8084 | `identity-session-guard.js` | `a756dc6c863d76b955f99aa3e0c39f92ce67f372577f27b597423c8053a5faf7` | MATCH |

`index.html` e `asset-manifest.js` responderam com `Cache-Control: no-cache`; os módulos de identidade também são referenciados com versão derivada do conteúdo. O serviço runit da API E2E está ativo, com working directory no checkout Restaurante; `/health/ready` respondeu 200. `GET /api/identity/session` e `GET /api/admin/memberships` sem sessão responderam 401, como esperado. Nenhum Nginx restart foi necessário: ele serve diretamente os diretórios verificados. A API foi reiniciada controladamente na etapa anterior da mesma continuação e não foi reiniciada novamente nesta verificação.

Commits publicados localmente nos checkouts, sem push de aplicação: Restaurante `3279c2b` (`feat(identity): complete account security flows`) e Motoboy `0552668` (`feat(identity): secure account and session flows`). Os dois worktrees permaneceram limpos.

## Verificação direcionada

Passaram os testes de contrato/serviço para Equipe e permissões, catálogo e requisições administrativas, associação e disponibilidade de Motoboys, integrações de marketplace, controles de backup, navegação de Configurações e serialização de preferências do Motoboy. Os comandos foram executados diretamente nos repositórios; não foi repetido `npm test` integral.

| Área | Evidência automatizada | Limite nesta execução |
|---|---|---|
| Equipe e permissões | `test-identity-ui`, `test-platform-admin-ui`, `test-platform-admin-request`, `test-platform-admin-disclosure-contract`, `test-platform-permission-catalog` — PASS | Sem convite/edição autenticados via UI, readback ou reload nesta execução. |
| Motoboys | `test-driver-access`, `test-dispatch-assignment`, `test-driver-availability-service`, `test-restaurant-driver-queue-http` — PASS | Sem alteração de vínculo persistente nem Browser QA autenticado. |
| Integrações | `test-integrations`, `test-provider-adapter-registry`, `test-provider-integration-runtime`, `test-marketplace-admin-http`, `test-keeta-protocol`, `test-keeta-adapter`, `test-99food-protocol` — PASS | Nenhum provedor externo conectado ou chamado; status comercial em navegador não foi conferido. |
| Super ADM Global | Testes de UI, catálogo, disclosures, cancelamento/concorrência e HTTP administrativo — PASS | Não havia sessão autorizada para verificar a tela positiva global. Não foram alterados founder, grants ou privilégios. |
| Backup | `test-backup-admin-audit`, `test-backup-admin-http`, `test-backup-inventory` — PASS | Nenhum backup, restore ou ação administrativa foi disparado. |
| Sistema Local e navegação | `test-mobile-more-navigation`, `test-navigation-shell-renderer`, `test-visual-shell-cache`, `test-help-center` — PASS | Sem inspeção autenticada dos dados do dispositivo ou dos estados da página Sistema Local. |
| Laboratório Avançado | Sem teste Browser autenticado nesta execução | Os adaptadores/protocolos foram testados; não equivale à operação do laboratório na UI. |

Nos dois aplicativos passaram `npm run assets:check` e `git diff --check`. Motoboy também passou `test-identity-ui`, `test-identity-session-first-access` e `test-settings-write-serialization`. Um comando combinado adicional tentou chamar arquivos de navegação que não existem no repositório Motoboy; essa chamada encerrou com `MODULE_NOT_FOUND` após o teste de serialização passar. Não é falha de produto nem teste aplicável, e não foi contabilizada como aprovação.

## Bloqueio de Browser QA autenticado

O estado persistente do banco E2E foi preservado. A consulta, feita em transação `READ ONLY` e com o tenant canônico definido para respeitar RLS, confirmou que o registro de Chico Restaurante está visível nesse escopo. Essa consulta não comprova a contagem global cross-tenant; a última verificação administrativa de contagem continua sendo a registrada em `saneamento-ambiente/RESULTADO.md`. A consulta sem contexto de tenant retornava zero linhas por isolamento RLS; não era evidência de banco vazio.

Não havia sessão MFA de QA reutilizável disponível para o Chromium. O harness antigo `campaign-0256-settings-e2e.cjs` falhou antes da interação por procurar `.settings-nav`, seletor removido da interface atual, que usa `.settings-cards`. Esse erro pertence ao harness, não comprova defeito de produto. A execução anterior do harness usou ciclo transacional rollback-only; não deixou empresa nem outros dados persistentes. Não foi repetida: o provisionamento padrão desse harness cria temporariamente um tenant e isso não é compatível com a restrição desta tarefa de não criar empresas.

Por consequência, **não houve Browser QA autenticado** para convites, edição/readback, vínculo de Motoboy, estado positivo Super ADM, Backup, Sistema Local ou Laboratório. Não foram feitas capturas autenticadas nem alterações persistentes de produto, banco, empresa ou privilégio nesta rodada. Os testes de contrato não substituem essa validação.

## Gates desta execução

| Gate | Estado | Evidência |
|---|---|---|
| Commits de Conta e segurança servidos em 8083/8084 | PASS | Hashes HTTP acima coincidem com os checkouts. |
| API E2E ativa e atualizada | PASS | Processo no checkout Restaurante; readiness 200; rotas autenticadas negam sem sessão (401). |
| Testes direcionados das categorias | PASS no escopo automatizado | Lista de testes acima; não implica CRUD autenticado pela UI. |
| Defeitos de produto reproduzidos e corrigidos nesta rodada | N/A | Nenhum defeito de produto foi reproduzido; nenhuma fonte de produção foi alterada. |
| UI autenticada, readback e reload nas categorias protegidas | BLOCKED | Sem sessão MFA autorizada reutilizável; harness padrão exige tenant temporário vedado pelo pedido. |
| Layout mobile claro/escuro dessas categorias | BLOCKED | A validação visual autenticada não foi executada. |

Backlog amplo permanece aberto, inclusive `RM-D1-SETTINGS-SAVE`, `RM-0256C-TEAM-RBAC`, `RM-0256C-DRIVER-LINK-UI`, `RM-0259-IDENTITY-INVITE-LIFECYCLE`, `RM-D1-INTEGRATION-UX`, `RM-0255-GLOBAL-UI`, `RM-0257-GLOBAL-ADMIN-E2E`, `RM-0256E-BACKUP-RECOVERY` e `RM-0256D-LAB`. Empresa, Operação, Logística e Origens não foram modificadas. G14 permanece FAIL; Campanha 0304 permanece aberta; 0305 não iniciada.
