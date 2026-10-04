# Pendências

## Reconciliação pré-F9 — Registro 0048 (2026-10-04)

- F1–F8 reconciliadas contra contratos, código atual, testes e PostgreSQL: F1 B, F2 A, F3 B, F4 B, F5 B, F6 B, F7 B, F8 B. **Não há pendência interna estrutural bloqueando a F9. READY_FOR_F9 = YES.**
- Itens marcados como abertos em seções históricas abaixo representam o estado na data daqueles registros. Em especial, o vínculo User/Membership↔Driver do 0043 foi resolvido pelo 0044; login/RBAC listado antes de 0041, rotas/provas/backup anteriores a F1 e adapters externos não verificados anteriores a 0046 não são backlog interno atual.
- Antes/durante F9: Browser QA real nos fluxos integrados e IndexedDB; documentar limitações de Chromium/Termux e evidências. Isso é validação planejada, não defeito de implementação.
- Bloqueios externos isolados: protocolos, contas e homologação iFood/99Food/Keeta; primeiro owner/operator auditável; provider email; MFA com armazenamento seguro; blob storage; domínio/TLS/host/PostgreSQL de produção; decisão de retenção/RPO/RTO e restore em alvo isolado. Nenhum foi simulado ou declarado disponível.
- Validação desta reconciliação: `npm test` nos dois apps; `npm run test:postgres` Restaurante; `migrate.js status` (0001–0013 aplicadas); `node --check` JS nos dois apps; `git diff --check`; igualdade byte a byte de `CONTRACT.md`, `contract.js` e `backup-format.js`. Nenhuma migration foi executada nem dado/role/configuração foi alterado. Ver [Registro 0048](REGISTROS/0048.md).

## Atualização — Registro 0047 / F8 operação (2026-10-04)

- [x] Configuração development/test/production com defaults locais somente fora de produção; startup production fail-closed para DB runtime/TLS/CA/secret provider, HTTPS origins, Host e proxy confiável.
- [x] Backend loopback, headers seguros, limites/timeouts/pool, readiness de schema compatível sem migration automática, request ID/log JSON sanitizado e shutdown SIGTERM/SIGINT com drain.
- [x] Runbooks versionados de deploy/rollback, PostgreSQL e IndexedDB backup/restore, retenção; nginx apenas exemplo não instalado.
- [x] Service worker Motoboy cacheia somente assets same-origin exatos, nunca API, usa ativação aguardando abas antigas e não apaga IndexedDB; contrato estático testado.
- [ ] Produção ainda depende de domínio/TLS, host e PostgreSQL de produção, secret provider/KMS/CA, email/MFA, operadores/distribuição; executar deploy e restore em alvo isolado com RPO/RTO aprovado.
- [ ] Definir retenção legal/operacional para GPS, proofs, PII, audit/logs, inbox/outbox, aliases e backups; não foi inventado TTL.
- F8 classificada **B — preparação local concluída com dependências externas isoladas**. Nenhuma configuração real do Termux/nginx/PostgreSQL mudou. Ver [Registro 0047](REGISTROS/0047.md).

## Atualização — Registro 0046 / F4 integrações (2026-10-04)

- [x] Registry provider-neutral bloqueado por padrão; estados administrativos nunca inferem conexão por cadastro/credencial declarada.
- [x] Rotas legadas de iFood/99Food/Keeta e serviços de 99Food/Keeta desativados fail-closed; nenhum polling automático ou verificação presumida de webhook.
- [x] Catálogo administrativo protegido por sessão, tenant/RLS e `integrations.manage`; não expõe `secret_ref`, credenciais ou payload.
- [x] UI distingue origem local, simulador de laboratório e provider não conectado; pedidos sintéticos iFood ficam em memória e não alteram Orders/IndexedDB.
- [ ] Implementar os protocolos reais somente após documentação oficial aplicável, credenciais/conta e homologação por provider. KMS/secret manager, autenticidade webhook e armazenamento/retention de payload também precisam de suporte operacional.
- F4 classificada **B — infraestrutura/implementação local concluída com dependências externas claramente isoladas**. Sem migration; sem Browser QA ou push. Ver [Registro 0046](REGISTROS/0046.md).


## Atualização — Registro 0045 / F7 UI/UX (2026-10-04)

- [x] Consolidação estática de navegação, conta/sessão e diálogos acessíveis nos dois apps; foco por teclado, Escape/Tab, retorno de foco e fundo inerte.
- [x] Restaurante: administração visual de vínculo Membership↔Driver por API existente, labels de busca/filtros e estilos de identidade responsivos.
- [x] Motoboy: estados de navegação/filtros semanticamente corretos, toast acessível, modal de execução e layout com safe-area/teclado virtual.
- [x] Ajuste de contraste do acento verde e remoção de regras CSS obsoletas/ineficazes; suítes `npm test` dos dois apps passaram.
- [x] As configurações agora informam o escopo local deste aparelho; o Motoboy esclarece que custos/metas são estimativas e Earning canônico vem do Restaurante.
- [ ] Validação visual renderizada e em dispositivos assistivos permanece para F9; não houve Browser QA, screenshots ou CDP conforme escopo.
- F7 classificada **B — implementação concluída / Browser QA pendente para F9**. Commits dos apps: Restaurante `69e3492e6ace36c781425baaeba199a208eb451e` e `3e84fad04eb877b466a6757a4fedf2db8e0f66c8`; Motoboy `7e41182e55f365c368e3ca730ddb7e9231b337a5` e `2c82d094ef8a2f04aa436507a36682b4f36e95fc`. Ver [Registro 0045](REGISTROS/0045.md).

## Atualização — Registro 0044 / F6 Motoboy (2026-10-04)

- [x] Vínculo canônico User/Membership↔Driver: migration `0013_membership_driver_binding`, FK composta tenant/type, unicidade por Driver, RLS/FORCE mantida e rollback protegido contra perda de vínculo/notificação.
- [x] API administrativa PUT/DELETE para associar/desassociar; RBAC `company.manage`, CSRF, MFA, validação de tenant/Driver/membership, idempotência e auditoria.
- [x] Sessão resolve `driverId` server-side. Instalação, push/pull Motoboy e leituras não administrativas sem Driver ficam bloqueados/escopados. `source.app`, `actor` e hints de `driverId` não autorizam.
- [x] Reatribuição envia notificação mínima ao Driver anterior; fatos aceitos não são removidos; push atrasado de evento/localização/prova é rejeitado e conflito local preservado. Operações locais offline continuam possíveis.
- [x] Testes relacionados de migration, integridade/grants/RLS, membership, MFA/CSRF, sessão, pull/push, ownership, reatribuição e Motoboy foram executados; fixtures transacionais revertidas. Sem Browser QA.
- [ ] Provider de blob para envio real de DeliveryProof; acesso a GPS/câmera físicos permanece dependente de hardware/permissões; Browser QA integrado permanece em F9. Esses itens não mantêm F6 parcial.
- F6 classificada **B — implementação concluída / Browser QA pendente para F9**. Baselines e `main` preservadas; sem push. Ver [Registro 0044](REGISTROS/0044.md).

## Atualização — Registro 0043 / F6 Motoboy (2026-10-04)

- [x] Ciclo local de execução `ACCEPTED/PICKED_UP/OUT_FOR_DELIVERY/ARRIVED/DELIVERED/FAILED/RETURNED`, motivos, eventos/outbox idempotentes e preservação offline.
- [x] Pull de Delivery/Order/Route/Earning atualiza stores e telas depois de commit; revisões stale não regridem cache; reentrega arquiva tentativa anterior.
- [x] GPS real validado/throttled e persistido localmente; assinatura PNG limitada/hash fica explicitamente local até provider seguro; Motoboy não publica Earning.
- [x] API sync projetando eventos de aceite/coleta; Service Worker não armazena resposta `/api/`. `npm test` Motoboy e PostgreSQL dirigido passaram.
- [ ] **F6 bloqueada para conclusão segura:** modelar vínculo canônico autenticado User/Membership↔Driver e limitar server-side o pull/push às Deliveries do próprio motorista. `driverId`, `actor` e `source.app` vindos do cliente não são autoridade.
- [ ] Provider de blob para envio de prova/foto; permissões/hardware GPS/câmera real; Browser QA somente em F9. Ver [Registro 0043](REGISTROS/0043.md).

## Atualização — Registro 0042 / F5 Restaurante (2026-10-04)

- [x] Pedidos locais: criar/editar/validar e persistir Order+Delivery+Earning numa transação; IDs canônicos e projeções não substituem fatos de execução.
- [x] Entregas: atribuição/change de motorista com transição permitida e `driverId`; cancelamento mantém Order/Delivery e histórico; estados Motoboy, eventos e provas aparecem no detalhe; rejected/conflict ficam observáveis via syncState.
- [x] Reentrega: UI solicita somente a partir de `DELIVERED`, `FAILED` ou `RETURNED`; servidor mapeia `DELIVERY_RETURNED`, aplica a transição de contrato, audita com actor da sessão e permite reatribuição posterior.
- [x] Rotas: gestão por `Route.deliveryIds`, ordenação de paradas, prevenção de associação duplicada/entre empresas e preservação de membros históricos terminalizados.
- [x] Motoristas: administração de nome/telefone/status sem editar GPS/presença de execução; atribuição usa Driver ID.
- [x] Earnings/relatórios: registros usam `amountMinor`, moeda, componentes e regra; repasse em relatório soma inteiros; indicadores de conclusão usam horário de conclusão.
- [x] Backup/restore existente foi conectado à área de dados com aviso de JSON plaintext sensível e merge seguro sem sobrescrever registros/outbox/conflitos atuais.
- [x] Sync constrói Order/Driver/Delivery/Route em shape do contrato, preserva status canônico de execução ao enviar edição comercial e não depende de geocoding para montar pacote.
- [x] Testes: `npm test`, `npm run test:sync`, teste PostgreSQL dirigido `tests/test-domain-sync-postgres.js`, syntax checks e `git diff --check` passaram. Sem alteração de schema/migration; sem Browser QA.
- [ ] Browser QA integrado F5 fica em F9 e não mantém F5 aberta.
- F5 classificada **B — implementação concluída / Browser QA pendente**. Próximo bloco planejado: F6. Ver [Registro 0042](REGISTROS/0042.md).

## Histórico de pendências anteriores

## Atualização — Registro 0041 / F3 Identidade (2026-10-04)

- [x] Política de lifecycle User/Membership/Role/Permission; grants de permission subset; sem autoelevação; último owner protegido com serialização transacional; tenant e actor derivados no servidor; auditoria.
- [x] APIs de role e membership e convite administrativo protegidas por sessão, CSRF, permission keys e MFA exigida; signup público inexistente.
- [x] Migração aditiva `0012_identity_rbac_lifecycle` aplicada; runtime/migrator, RLS/FORCE e grants mínimos preservados.
- [x] Restaurante e Motoboy: login, logout, restore/expiração, recuperação, convite, MFA fail-closed, troca de tenant e estados de UI; pós-login dispara sync best-effort sem bloquear operação local offline.
- [x] Administração no Restaurante para empresa ativa, memberships/status, roles/permissões, convites e metadados suportados de integrações; controles limitados por permission key. Profiles locais identificados como locais.
- [x] Testes finais `npm test` nos dois apps, `npm run test:postgres` no Restaurante, `node --check` dos JS modificados e `git diff --check` passaram.
- [ ] Provisionamento do primeiro owner requer operador autorizado e ato administrativo auditável. Não foi criado operador ou conta real.
- [ ] MFA operacional requer adapter/verificador e armazenamento seguro de segredo/chave; challenge permanece fail-closed, sem modo de desenvolvimento que reduza a proteção.
- [ ] Envio real de convite/recuperação requer provider de email e domínio/configuração operacional; sem envio real ou exposição de token bruto.
- [ ] Browser QA dos formulários, cookies, redirects e layout fica para F9; não executado conforme escopo.
- F3 classificada **PARCIAL** apenas pelas dependências externas acima. Próximo bloco: F5; não iniciar F4 neste registro. Ver [Registro 0041](REGISTROS/0041.md).

## Atualização — Registro 0040 / F2 (2026-10-04)

- [x] Inventário e documentação versionada da API v1 do Restaurante em `docs/API-v1.md`, com métodos, autenticação, permission keys, entradas, saídas, erros e idempotência.
- [x] Health liveness/readiness, request ID, logs estruturados sem payload, respostas de erro estáveis, rate limit e consultas autenticadas/paginadas por entidade com tenant/RLS/RBAC.
- [x] Administração de leitura para company, memberships, roles/permissions e status de integrações sem secrets. Operações de domínio mutáveis permanecem nos casos de uso do sync Local-First.
- [x] Migration `0011_runtime_integration_read`: runtime recebeu somente SELECT em integrations/external_accounts; RLS/FORCE mantida, sem DDL/escrita runtime.
- [x] Testes HTTP/PostgreSQL de permissões, tenant, cursor/IDs, métodos, estado readiness, grants e migration rollback/reapply; `npm test`, `npm run test:postgres`, checks JS e `git diff --check` passaram.
- [ ] Mutação de memberships/roles e convite genérico entram em F3 após fechar lifecycle, proteção contra escalada e UX; provisionamento do primeiro owner continua fail-closed sem adapter operacional. Isso não bloqueia as operações de domínio v1 cobertas em F2.
- [ ] Browser QA das novas superfícies e dos clientes permanece para F9; não foi executado nesta etapa.
- F2 classificada **concluída para operações internas v1 definidas**. Próximo bloco recomendado: F3, sem iniciar nesta execução. Ver [Registro 0040](REGISTROS/0040.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Atualização — Registro 0039 / F1 (2026-10-04)

- [x] F1 concluída como implementação. Classificação B: Browser QA/IndexedDB real segue no checkpoint F9 e não mantém a F1 aberta.
- [x] Schemas canônicos compartilhados, Route→Delivery, Earning seguro em minor units, modelo de mídia/storageRef, migrations PostgreSQL 0009–0010 e backup Local-First v1 com merge transacional não sobrescrevente.
- [x] Migrações IndexedDB explícitas do Registro 0038 permanecem sem bump; nenhuma estrutura local nova foi necessária.
- [ ] Blob storage real/cifrado e backup cifrado aguardam provider e decisão de chave/UX. Retenção de GPS/PII/provas/audit aguarda política produto/legal. Estes itens são capacidades bloqueadas independentes, não impedem F1.
- Ver [Registro 0039](REGISTROS/0039.md), [MODELO_DADOS.md](MODELO_DADOS.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Registro 0038 — estado histórico da F1 antes da conclusão

- [x] F1.1: matriz versionada das entidades/campos conhecidos, authority, local/PG/API/sync, IDs/revisões/relações, constraints/índices, offline, legado, sensibilidade e retenção criada em [MODELO_DADOS.md](MODELO_DADOS.md).
- [x] Revisão read-only das migrations PostgreSQL 0001–0008 e schema instalado; `migrate.js status` confirmou todas aplicadas. Decidido manter entidades de domínio em JSONB até campos/consultas estarem definidos; sem migration PG nova.
- [x] Registry de migrations IndexedDB aditivas implementado: Restaurante 4→6 e Motoboy 5→7; adiciona índices secundários não únicos e marcador versionado sem regravar registros; paths de eventos/logs corrigidos em novas migrations aditivas; aborta upgrade em erro.
- [x] Testes dirigidos dos registries, bootstrap/upgrade de versões anteriores simulado, sentinel local preservado, lifecycle Motoboy; syntax checks e `git diff --check` passaram.
- [x] Os schemas, relação, moeda, mídia e backup/merge foram implementados no Registro 0039; ver a matriz vigente em MODELO_DADOS.md.
- [x] Export/import v1 cobre todas as stores; colisões são preservadas e operações pendentes/conflitos/tombstones não são sobrescritos.
- [x] F1.2 foi implementada no Registro 0039: schemas, Route→Delivery, Earning minor units, mídia referenciada, migrations 0009–0010 e backup/restore v1 seguro.
- [ ] Validar upgrade/import no Chromium real no checkpoint F9; não é pendência de implementação F1.
- Contrato e migrations/banco mudaram no Registro 0039; main, tags e baselines permaneceram intactas. Ver [Registro 0038](REGISTROS/0038.md), [Registro 0039](REGISTROS/0039.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Plano mestre — Registro 0037 (2026-10-04)

Use [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) como fonte de verdade e não duplique trabalho concluído em 0033–0036.

- [x] F1.1: matriz versionada de entidades/campos/autoridade e decisão JSONB/relacional criada; registry IndexedDB e upgrades aditivos base implementados no Registro 0038.
- [x] F1.2: schemas, Route→Delivery, Earning, mídia, backup/merge e migrations aditivas concluídos no Registro 0039.
- [ ] Validar o upgrade/import em IndexedDB real no checkpoint F9; F1 não fica aberta por essa validação.
- [x] F2: API v1 interna definida e implementada para identidade, domínio read, sync write, administração de leitura, health/readiness, RBAC/RLS e erros/logs; migration/grants e documentação concluídos no Registro 0040.
- [x] F3: implementação local de clientes/telas e APIs de identidade concluída no 0041; permanecem apenas o primeiro operador/owner, MFA operacional segura, email real e Browser QA em F9 conforme bloqueios externos registrados.
- [x] F5 Restaurante: fluxos administrativos/operacionais registrados no 0042.
- [x] F6 Motoboy: vínculo User/Membership↔Driver e enforcement server-side concluídos no Registro 0044; Browser QA continua em F9. Provider de blob e hardware/permissões físicos são dependências de capacidade, não bloqueios da implementação F6.
- [x] F4: registry/catalog e bloqueio local seguro concluídos no Registro 0046. [ ] Adapters reais, fila/inbox, ingestão e configuração operativa continuam condicionados a documentação oficial, credenciais/contas, homologação e secret manager por provider.
- [x] F7: implementação estática concluída no Registro 0045; Browser QA/renderização permanece para F9.
- [x] F8: preparação local de runtime/proxy/shutdown, logs/readiness, backup/restore e runbooks concluída no Registro 0047; [ ] deploy real, provider TLS/secrets, RPO/RTO e restore isolado aguardam infraestrutura/operador.
- [ ] F9: QA integrado CDP desktop/tablet/mobile e hardening depois das fases anteriores.
- Route→Delivery foi decidido e implementado em F1/Registro 0039. Retenção legal/operacional de localização/provas permanece pendente, sem prazo inventado.
- [ ] Provider de email, primeiro operador/owner, MFA seguro, contas/documentação de fornecedores e ambiente de produção são bloqueios externos apenas para as capacidades correspondentes; continuar trabalho independente local.

O inventário estático de IndexedDB não leu dados reais; não rodar Browser QA nem reimplementar sync/reconciliação 0034–0036 nesta etapa de planejamento. Ver [Registro 0037](REGISTROS/0037.md).

## Atualização — Registro 0036 (2026-10-04)

- [x] Pull canônico reconciliado às projeções IndexedDB dos dois apps, com validação de tenant/ID/revisão, preservação de alterações pendentes e tombstones explícitos.
- [x] ACK por operação integrado aos clientes; accepted/duplicate confirmam canonical ID/revisão; rejected/conflict preservam dados/estado e evitam retry infinito da mesma versão.
- [x] Outbox/inbox/syncState têm ciclo de vida, status observável, retry transitório, single-flight/Web Locks e compactação conservadora documentada.
- [x] Bootstrap de sessão existente, retomada CSRF, sync após gravação local/retorno de conectividade/manual; operação local permanece independente de rede.
- [ ] Implementar login visual/sessão nos dois clientes com estado fail-closed; ativação do primeiro owner permanece dependente de operador e MFA seguro.
- [x] Route→Delivery foi formalizada em F1/Registro 0039 por `Route.deliveryIds`, sem relação inversa redundante.
- [ ] QA end-to-end via Chromium/CDP permanece para checkpoint posterior, conforme solicitação de não executar Browser QA nesta etapa.
- [ ] Email real, domínio/TLS e serviços/credenciais de fornecedores externos continuam pendências externas independentes.
- Ver [Registro 0036](REGISTROS/0036.md), DEC-0006 e commits Motoboy `1eb7e6a`/`6a1574f`, Restaurante `de53138`/`df562f7`.

## Atualização — Registro 0035 (2026-10-04)

- [x] Formalizar ownership de Order, Earning, Delivery, DeliveryEvent, LocationPoint, DeliveryProof, Route, Driver e Company em DEC-0006 e manter `CONTRACT.md`/`contract.js` sincronizados.
- [x] Vincular instalação sync à sessão/usuário/tenant e app key escolhida por endpoint server-side; não confiar em `source.app`.
- [x] ACK inequívoco por operação (`accepted`, `duplicate`, `rejected`, `conflict`), canonical ID/revision/código; revisão e transições explícitas sem LWW; retry de packet/event idempotente.
- [x] Corrigir divergência de Earning: Restaurante calcula/escreve canonical Earning; Motoboy não publica Earning.
- [x] Integrar os dois clientes aos endpoints de instalação/push/pull preservando IndexedDB e operação offline, outbox retry, ACK no `syncState`, aliases/revisões e cursor/cache em transações.
- [x] Migration aditiva 0008 aplicada e testada; migrations 0001–0007 permaneceram intactas.
- [x] Pull guardava snapshots/eventos antes de haver reconciliação automática; estratégia de merge que preserva edições pendentes foi implementada no Registro 0036. Não reimplementar; cobrir regressões em QA final.
- [x] Route→Delivery e seus campos/regras de membership foram formalizados e implementados em F1/Registro 0039.
- [ ] Email real, HTTPS/domínio de implantação e eventuais segredos/provedores externos continuam dependências externas; não bloqueiam os fluxos locais/offline nem o backend de sync loopback.
- Ver [Registro 0035](REGISTROS/0035.md), DEC-0006 e commits Restaurante `78e10f2`, Motoboy `d88aeea`.

## Atualização — Registro 0033 (2026-10-03)

- [x] PostgreSQL role split concluído e validado: database sob ownership DBA, schema/objetos sob `rotamoto_migrator`, runtime `rotamoto_app` sem CREATE/TEMP/DDL nem acesso ao ledger; RLS/FORCE e append-only confirmados.
- [x] Runner e configuração separados: `DATABASE_URL` só para runtime `rotamoto_app`; `MIGRATOR_DATABASE_URL` apenas para migrations, com validação de role/destino e senha fora da URL.
- [x] `npm run test:postgres`, teste da configuração de segurança, `migrate.js status` como migrator e smoke HTTP como runtime passaram. Nenhum dado sintético ficou persistido.
- [ ] Fase 2 operacional depende de adapter de operador/prova de titularidade, provider de email, HTTPS/domínio e MFA com KMS/secret manager. Não provisionar tenant/owner real antes disso.
- [ ] Fases posteriores de integração humana, secrets, sync e import/export dependem da identidade operacional e do contrato/rollout Local-First. Não foi identificado bloco independente seguro nesta execução sem antecipar essas dependências ou inventar semântica/permissões.
- Ver [Registro 0033](REGISTROS/0033.md) e commit Restaurante `c96907bc46165ec8ff2f7dda721bdc6b8160b0a2`.

## Atualização — Registro 0032 (2026-10-03)

- [x] Diagnóstico read-only de owners, grants, schemas/tabelas/sequences, funções/triggers, policies/RLS, default privileges, memberships e database ACL concluído.
- [x] Script/runbook, checkpoint completo validado e execução manual do split concluídos; queries pós-flight confirmadas no Registro 0033.
- [x] Runner e suíte PostgreSQL separados entre conexão de migrations/DDL e conexão runtime/RLS.
- Ver [Registro 0032](REGISTROS/0032.md) e `rota-moto-restaurante/backend/postgres/admin/role-split-runbook.md`.

## Atualização — Registro 0031 (2026-10-03)

- [x] Bloqueio administrativo resolvido após checkpoint íntegro e operação manual; conclusão verificável no Registro 0033.
- Ver [Registro 0031](REGISTROS/0031.md). Nenhuma alteração foi feita no banco ou nos aplicativos nesta execução.

## Atualização — Registro 0030 (2026-10-03)

- [x] Auditoria da estrutura base, constraints, FKs, índices, RLS e migration runner concluída. Migration `0004_foundation_integrity_constraints` aplicada; fecha integridade do actor de auditoria, ordem de expiração da sessão e timestamp de publicação da outbox.
- [x] Migration runner testado para checksums, detecção de migration ausente, reexecução concorrente/idempotente, rollback transacional, down fail-closed e clean install em schema temporário rollback.
- [x] Bloqueio estrutural de ownership/runtime foi resolvido e validado após a operação DBA manual no Registro 0033.
- [x] Owner/migrator e runtime estão separados; migration runner/status e testes específicos usam credenciais/roles distintas.
- Conclusão do Registro 0030 foi superada: a separação de privilégios está pronta, mas API permanece loopback e fases operacionais ainda aguardam dependências descritas no Registro 0033.
- Ver [Registro 0030](REGISTROS/0030.md) para diagnóstico, migration, testes, commits e limites.

## Atualização — Registro 0029 (2026-10-03)

- [x] API HTTP local de identidade no Restaurante: login/logout/sessão, seleção tenant, recuperação/consumo, aceitação de convite/verificação e endpoint administrativo protegido por adapter. Não há signup público.
- [x] Middleware HTTP: cookie opaco `__Host-`, CSRF/origem, contexto tenant por sessão, permission key/RLS, payload limitado e validado, rate limit por IP/endpoint, erros e logs seguros. Servidor permanece loopback.
- [x] Compatibilidade de Argon2id resolvida para o requisito do servidor Node >=18 com `argon2` 0.45.1; compilação local Termux validada. Auditoria npm reportou zero vulnerabilidades.
- [x] Testes HTTP/RLS com fixtures sintéticas em transação revertida; nenhum tenant/usuário sintético permaneceu no PostgreSQL oficial.
- [ ] Configurar adapter operacional de operador privilegiado/prova de titularidade. A rota de provisionamento falha fechada sem ele; teste fake não é credencial real.
- [ ] Configurar provider real de email, domínio/HTTPS e MFA/TOTP com KMS/secret manager. Owners permanecem obrigados a MFA e não concluem login até existir esse fluxo.
- [ ] Integrar UI/frontend aos endpoints em origem segura; nenhum browser flow de identidade existe ainda. Browser QA visual não aplicável até essa integração.
- [ ] Rate limit atual é memória por processo/socket; antes de operação atrás de proxy ou múltiplas instâncias, definir proxy confiável para IP e storage compartilhado sem confiar em headers arbitrários.
- [ ] Continuam pendentes: convites de membros, rotas humanas de iFood/Keeta/99Food, caller/worker e webhooks autenticados, sync Local-First autenticado, import/export por tenant e fases restantes DEC-0002.
- Ver [Registro 0029](REGISTROS/0029.md) para endpoints, decisões de segurança, testes, Argon2, commit e limitações.

## Atualização — Registro 0028 (2026-10-03)

- [x] Base técnica local da Fase 2 no Restaurante: provisionamento transacional/idempotente de owner, role/permissões versionadas, UUIDv7, auditoria, convite/verificação de email por token digest e recuperação por token digest.
- [x] Primitivas internas de Argon2id, bloqueio de tentativas, sessão opaca, CSRF, idle/absolute expiry, revogação, troca de tenant validada por membership, RBAC e transação RLS; testes com provider fake e dados PostgreSQL revertidos.
- [x] Migrations `0002_identity_provisioning_tokens` e `0003_provisioning_membership_constraint` aplicadas ao PostgreSQL oficial; FKs impedem request cujo user e empresa não formam a mesma membership.
- [ ] Instalar adapter operacional confiável para prova de titularidade/autorizar provisionador e entregar `actorRef` auditável; não há tenant ou owner real criado.
- [ ] Configurar email provider, domínio/origem HTTPS e fluxo operacional. A interface existe e falha fechada sem provider; nenhum envio real foi feito.
- [ ] Implementar MFA/TOTP com KMS/secret manager. Owners são gravados com MFA obrigatório e autenticação bloqueada até essa etapa.
- [ ] Integrar serviços a uma API HTTP: rotas login/logout/recuperação/provisionamento, validação e erros padronizados, rate limit por IP, middleware CSRF, cookies HTTPS e autorização. Nenhuma rota foi montada.
- [ ] Identidade requer `crypto.argon2` (Node >=24.7, API release-candidate); decidir/validar runtime de produção ou adotar implementação Argon2id suportada antes de deploy. O serviço de integração legado ainda declara Node >=18.
- [ ] Convites de membros existentes e integração da identidade aos apps não foram conectados. Sync/autorização, providers e rollout continuam após as dependências acima.
- `npm audit --omit=dev --offline` Restaurante retornou zero; consulta online ao registry falhou por DNS. Audit online do Motoboy retornou zero. QA por browser não se aplica enquanto não há endpoint/fluxo visual de identidade.
- Ver [Registro 0028](REGISTROS/0028.md) para commits, testes, schema, auditoria e limites.

## Atualização — Registro 0027 (2026-10-03)

- O P1 do Registro 0019 segue resolvido pelo Registro 0026: comandos/escritas Motoboy compartilham Web Lock e relêem IndexedDB antes do snapshot.
- Fase 1 DEC-0002 agora concluída no PostgreSQL de desenvolvimento oficial via `.pgpass`; migrations, tabelas, checksum e RLS default-deny testados. Nenhuma conta/tenant foi provisionada.
- [ ] Confirmar Web Locks na matriz real de navegadores de produção. O projeto não declara essa matriz; Chromium 149 foi testado, e gravações falham explicitamente sem lock.
- A Fase 2 depende de processo de prova de titularidade/provisionamento do primeiro owner e serviço de email verificado, inexistentes. Fases 3–6 aguardam essa identidade operacional.
- Ver [Registro 0027](REGISTROS/0027.md) para estado cruzado, QA, Fase 1, commits e limites; o histórico anterior do P1 está em [Registro 0026](REGISTROS/0026.md).

## QA de navegador — Registro 0022 (2026-10-03)

- [x] Teste de captura Motoboy concluído com câmera sintética: Chromium headless sem câmera física falha com `NotFoundError`, mas dispositivo virtual 640×480 gerou imagem no fluxo de captura. Teste em hardware real segue para validação de campo.
- [x] Chegada, assinatura e finalização Motoboy validadas com geolocalização CDP; estado `done` e assinatura PNG sobreviveram ao reload. Teste em GPS físico não disponível nesta sessão.
- Fluxos dos dois apps passaram em desktop/tablet/mobile, backup/import e conteúdo não confiável; sem HTTP local 4xx/5xx nem overflow horizontal da página. Detalhes anteriores em [Registro 0022](REGISTROS/0022.md), repetição em [Registro 0027](REGISTROS/0027.md).

## Alta prioridade — antes de expor operações ou dados reais fora do host local

- [ ] Manter o serviço Node em loopback até existir autenticação humana e autorização tenant server-side. Proteção atual: Registro 0009; não remover sem concluir as fases 1–3.
- [x] PostgreSQL 18.6 oficial acessível em `127.0.0.1:5432`, banco `rotamoto`, usuário `rotamoto_app` por `.pgpass`; Fase 1 versionada aplicada. [ ] Secret manager/KMS, backup/restore e rotação de chaves continuam sem infraestrutura.
- [x] Fase 1: schema/migrations para User, Credential, RecoveryToken, Company, Membership, Session, Role/Permission, Integration, ExternalAccount, audit log, canonical ID map e inbox/outbox persistentes.
- [ ] Implementar processo operacional auditável de criação de tenant/owner com prova de titularidade, convite de uso único e verificação/entrega de email.
- [x] Implementar primitives internas de Argon2id PHC, verificação de convite/email, recuperação single-use, lockout de credencial, sessão digest, CSRF digest, idle/absolute expiry, revogação e camada HTTP local (Registros 0028–0029). MFA e integração de frontend seguem abertas.
- [x] Implementar role owner com catálogo inicial server-side versionado, permission check no serviço e troca de empresa validada por membership/RLS (Registro 0028). Catálogo completo por rota/recurso e convite de membros seguem abertos.
- [x] Montar sessão/API local com cookie opaco, CSRF em mutações, rate limit e API de sessão no listener loopback (Registro 0029). [ ] Configurar HTTPS/domínio/proxy seguro antes de qualquer exposição externa.
- [ ] Atualizar rotas iFood, Keeta e 99Food: sessão humana para ações de operador; caller de worker escopado; webhooks com autenticação/replay/deduplicação persistentes; vínculos merchant/shop/store confirmados; secrets no secret manager. CORS permanece apenas política de navegador.
- [x] Implementar contexto tenant de identidade por sessão, constraints e RLS default-deny com teste de bypass/negação cross-tenant (Registros 0027–0029). [ ] Aplicar autorização equivalente às futuras rotas de negócio e sync.
- [ ] Implementar mapeamento/reconciliação dos IDs locais por instalação e migração de `company_local` sem colisão nem fusão entre empresas; manter IDs de Order/Delivery relacionados.
- [ ] Migrar sync/offline com autorização no servidor, idempotência persistente, validação de revision/tombstone, conflitos explícitos e política de reautenticação; nunca aceitar identidade/permissão do payload local.
- [ ] Restringir import/export autenticado a dados operacionais permitidos; rejeitar entidades de acesso e segredos; validar tenant/schema/tamanho/referências e auditar conflito/resultado.
- [x] Suites sintéticas de credenciais, sessão/CSRF, RBAC, tenant/RLS, recovery, convite, rate limit e API HTTP passam (Registro 0029). [ ] Continuam pendentes replay/webhooks, offline, import/migração e validação de rollout.

## Ordem de execução

1. Fase 0 loopback e Fase 1 schema/migrations concluídas.
2. Próxima: completar a operação da Fase 2 com adapter auditável de operador, email, MFA/KMS e onboarding real; não criar dados/usuários reais até isso existir.
3. Depois: conectar frontend em HTTPS e migrar rotas humanas para sessão/permission checks; avançar integrações/webhooks/workers, Local-First sync/import/export e rollout na ordem DEC-0002.

As decisões arquiteturais permanecem em `DECISOES.md` (DEC-0002). O listener continua em loopback. Não expor backend com dados reais antes das fases 2–6 e dos itens operacionais bloqueadores acima. IndexedDB continua como persistência local/offline; PostgreSQL é a camada canônica do servidor.

## Reconciliação do plano — Registro 0020 (2026-10-03)

DEC-0002 continua definindo oficialmente a Fase 1: schema e migrations PostgreSQL de identidade, tenant/membership, sessão, roles/permissões, integrações/contas externas e mapeamento de IDs. O roadmap técnico posterior de persistência do Restaurante complementa o planejamento de persistência local-first e evolução para sincronização; não substitui essa Fase 1. Nenhum item da Fase 1 foi implementado na execução do Registro 0020.

## Histórico resolvido

- Registro 0006: corpo HTTP acima de 1 MiB recebe 413.
- Registro 0007: gravação principal do estado Motoboy é atômica.
- Registro 0008: estado, evento operacional e outbox Motoboy são persistidos na mesma transação; `npm test` padrão do Motoboy executa a suíte.
- Registro 0009: serviço de integrações Restaurante recusa inicialização em host não-loopback enquanto não houver autenticação humana/tenant. Isso reduz exposição acidental, mas não substitui autenticação das rotas locais.
- Registro 0010: renderização do Restaurante não reflete status desconhecido fornecido por backup ou integração como HTML; fallback seguro e teste contra markup malicioso adicionados.
- Registro 0026: snapshots gerados por abas Motoboy diferentes já não se sobrescrevem silenciosamente; a atualização é rebaseada nos dados persistidos sob Web Lock.

## Revisão do Registro 0009 — 2026-10-01

As pendências foram convertidas em fases de implementação sob DEC-0002. A barreira de loopback foi implementada no Restaurante. Nenhuma fase dependente de PostgreSQL, KMS/secret manager ou email foi marcada como concluída; não expor operações ou dados reais externamente antes de implementar autenticação e autorização tenant server-side. Consulte o Registro 0009.


## Revisão do Registro 0011 — 2026-10-01

Corrigida a precedência incorreta entre uma entrega e um tombstone mais antigo no mesmo pacote recebido pelo Restaurante. Segue como próximo passo técnico recomendado acrescentar testes executáveis de falha/recuperação para recebimentos multi-store. As pendências de backend/identidade acima continuam abertas.

## Revisão do Registro 0012 — 2026-10-01

O Restaurante agora confirma se o `packetId` já foi recebido dentro da transação que grava domínio e recibo, prevenindo reaplicação concorrente do mesmo pacote. A cobertura atual verifica a estrutura do fluxo por teste automatizado de sincronização; um teste executável com IndexedDB simulado para abortos/recuperação de transações multi-store continua como possível próximo passo. As pendências de backend/identidade, tenant e infraestrutura permanecem abertas.

## Revisão do Registro 0013 — 2026-10-01

O Motoboy agora recupera a abertura do IndexedDB após erro, fecha conexões em `versionchange` e trata abertura bloqueada sem vazar uma conexão que conclua tardiamente. Foi acrescentado teste isolado do ciclo de vida da conexão. Permanecem abertas as pendências de backend/identidade, tenant e infraestrutura; testes de abortos reais de transações multi-store seguem como possível trabalho futuro.

## Revisão do Registro 0014 — 2026-10-01

Corrigida a exclusão parcial do histórico no Motoboy: tombstones, corridas, projeções, eventos, outbox e demais stores afetados agora participam de uma transação, e a UI só atualiza após `oncomplete`. Próxima lacuna técnica específica desta frente: exercitar abort/falha/retentativa das transações multi-store do Motoboy e do recebimento no Restaurante com IndexedDB simulado leve ou em runtime que o forneça. O ambiente atual não tem IndexedDB nem simulador; os testes desta etapa confirmam estruturalmente a ordem e o escopo transacional. Pendências de backend/identidade, tenant e infraestrutura seguem abertas.

## Revisão do Registro 0015 — 2026-10-01

Concluída a lacuna de teste da fronteira de recebimento: o Motoboy agora grava projeções atualizadas e recibo atomicamente e publica a memória só após commit; testes nos dois projetos verificam erro e abort após writes staged, rollback de stores, ausência de atualização em memória/UI, retry e idempotência. A arquitetura global ainda não tem uma fronteira geral entre comando de negócio e estado mutável: `persistOnly` persiste a projeção atual e não desfaz por si só mutações antecipadas feitas por seus chamadores. Próximo ponto técnico concreto: introduzir uma fronteira de comando para as operações gerais Motoboy que hoje mutam `state` antes de `persistOnly`, começando pelos fluxos de corrida e ajustes, com rollback de memória sem sobrescrever operações concorrentes. Para validação nativa de IndexedDB, executar esses mesmos invariantes em runtime que o forneça; os testes locais atuais modelam somente commit/erro/abort na fronteira de transação. Pendências de identidade, tenant e infraestrutura permanecem abertas.


## Revisão do Registro 0016

A fila de snapshots protege os comandos de corrida migrados. Continua pendente completar a fronteira para salvamento/autosave de ajustes, tema/idioma/fechamento diário, exclusão com tombstone atômico e outros mutadores de rota/GPS que persistem após alteração global. Testes de IndexedDB nativo permanecem limitados ao runtime apropriado.


## Revisão do Registro 0017

Resolvida a exclusão de corrida fora da fronteira: corrida/projeção e tombstone agora confirmam juntos via `commitRiderCommand`, e replay de exclusão de ID ausente é no-op. Os ajustes foram tratados no Registro 0018. Mutadores gerais de rota/GPS que persistem após alteração global permanecem fora desta sequência de escopo restrito. QA Chromium concluiu sem SIGKILL; o stderr de desligamento mencionou GPU após QA, sem falha durante o fluxo.

## Revisão do Registro 0018

Autosave/salvamento de settings, tema/idioma e fechamento diário agora serializam snapshots via `commitRiderCommand`; falha de persistência preserva o estado ativo. Cobertura estrutural passou, junto à suíte padrão. Ainda não foi validada transação IndexedDB nativa neste registro. Mutadores gerais de rota/GPS não foram migrados; permanecem como trabalho técnico separado. Nenhuma decisão arquitetural nova foi necessária.


## Revisão do Registro 0019

Corrigidos: transação parcial de normalização inicial; publicação prematura em cálculo de distâncias/ordem e GPS; importação de backup antes da persistência; exclusão/limpeza sem coordenação com a fila e backup; recebimento que não retinha tombstone e podia reaplicar entrega antiga; escape de IDs/assinatura em HTML.

Pendente P1: a fila `commitRiderCommand` é local à instância JavaScript. Duas abas simultâneas podem calcular snapshots independentes e uma gravação posterior pode substituir a mais recente; esta rodada não introduziu lock/CAS entre abas para evitar ampliar a arquitetura sem cobertura de runtime. Também não há teste com IndexedDB nativo neste runtime.

Limitação existente: atualização de `localStorage` após commit continua best-effort; falha de quota/escrita é registrada no console, mantendo IndexedDB como estado principal. Browser QA não executado.
