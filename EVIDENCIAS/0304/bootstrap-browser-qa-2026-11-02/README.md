# Browser Bootstrap — correção E2E (2026-11-02)

**Resultado: PASS para a correção solicitada; envio final depende de SMTP.**

## Correção e bancos

A migration `0068_bootstrap_runtime_identity_pairing` altera somente os guards das funções `SECURITY DEFINER` de status e conclusão do Bootstrap. Os pares aceitos são exatamente `rotamoto_app/rotamoto` e `rotamoto_e2e_app/rotamoto_e2e`; o papel `rotamoto_app` continua obrigatório como papel efetivo no runtime E2E. O par de lote E2E já existente permanece específico. `PUBLIC` continua sem execução; o grant de execução permanece somente em `rotamoto_app`. As verificações de proof, latch com `FOR UPDATE`, MFA, convite, founder, auditoria e RLS não foram removidas.

Aplicação confirmada pelo runner oficial nos dois bancos. Não houve reset, criação de usuário/empresa, backup ou reexecução de migrations anteriores. Ambos agora têm 68 migrations; o checksum 0067 continua `1d9930ca4c30d8a3d52da57e7b9ceff3838466875ae2c81cd304f875e08fa9ba`; checksum 0068 `7860c046e0208beb8fd503c48ac3809fdf55488f88978c1193b6b331d1a9ddc3`.

| Banco | Dados de aplicação antes do reset | Depois | Após 0068 | Catálogo RBAC | RLS/FORCE | Estado do latch |
|---|---:|---:|---:|---:|---:|---|
| `rotamoto` | 0 | 0 | 0 em 52 tabelas | 10 permissões | 41 tabelas; 44 policies | founder vazio; instalação inicial |
| `rotamoto_e2e` | 179 | 0 | 0 em 52 tabelas | 10 permissões | 41 tabelas; 44 policies | founder vazio; instalação inicial |

Contagens detalhadas do reset anterior continuam em [`bootstrap-final-2026-11-02/sql-counts-before-after.csv`](../bootstrap-final-2026-11-02/sql-counts-before-after.csv). Verificação SQL atual e estados HTTP completos em [`deployment-verification.json`](deployment-verification.json). O teste de estado concluído sem founder mudou o latch apenas dentro de `BEGIN`/`ROLLBACK` e retornou `unavailable` nos dois bancos.

Testes de identidade provaram os dois pares permitidos, ambos os pares cruzados bloqueados (`unavailable`/SQLSTATE `42501` na conclusão) e o papel migrator não autorizado. 60 consultas HTTP de status concorrentes (30 por ambiente) retornaram `ready`. Nenhum fixture persistente foi criado.

## Publicação e Browser QA

A publicação já existente do nginx em 8083 serve o checkout atualizado do Restaurante; nenhuma regra nginx foi alterada nesta correção. `/bootstrap.html`, CSS e JS responderam HTTP 200 com MIME correto e SHA-256 idêntico ao checkout; URLs de assets têm hashes atualizados. API `8787` (E2E) e `8788` (oficial) retornam `state=ready`; `/health/ready` retorna `ready` em ambos. Configuração E2E segue conectada a `rotamoto_e2e` como `rotamoto_e2e_app` e assumindo `rotamoto_app`; serviço oficial continua em `rotamoto`.

Chromium/CDP verificou estado inicial e etapa editável em claro/escuro nos viewports 390×844, 768×1024 e 1440×900 (12 capturas no total). Sem overflow, erros de console ou respostas 4xx/5xx; página, JS e CSS carregaram. O fluxo chegou à etapa **Administrador fundador** e percorreu até a revisão/finalização usando apenas valores sintéticos `.invalid` no perfil descartável do browser; não houve envio de dados nem POST de provisionamento. O botão final permaneceu desabilitado enquanto `invitationDeliveryConfigured=false`. QA: **4/5**, por o serviço de convite ainda não estar configurado. O instalador pode ser aberto e preenchido; a submissão permanece protegida até que convite/MFA estejam corretamente configurados. Capturas e medições estão nesta pasta.

## Testes e observação separada

Passaram: `assets:check`, `node --check bootstrap-wizard.js`, `test-bootstrap-setup.js`, `test-bootstrap-status-http.js`, `test-e2e-bootstrap-guard.js`, `test-postgres-migration-targets.js`, assertions PostgreSQL de role/status/conclusão/latch em transações revertidas, hashes HTTP e Browser QA. O gate migração 0234 foi atualizado para reconhecer a nova migration aditiva sem permitir destinos novos.

A verificação ampla de paridade PostgreSQL expôs uma diferença ACL preexistente e alheia à migration 0068: `PUBLIC EXECUTE` em uma função trigger-only de imutabilidade financeira no E2E, ausente no oficial. A 0068 não altera essa função; nenhum grant fora das duas funções de Bootstrap foi modificado. O comparador foi atualizado para não ignorar diferenças entre tabelas, políticas, constraints ou índices, e por isso reporta essa diferença de função. A suíte legacy `test-postgres-migrations.js` recusa explicitamente executar contra o banco E2E compartilhado.

Evidências sanitizadas não contêm dados de proprietário, credenciais ou valores de formulário. Campanha 0304 permanece aberta; G14 e demais pendências permanecem abertas; 0305 não iniciada.
