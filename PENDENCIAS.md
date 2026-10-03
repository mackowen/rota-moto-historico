# Pendências

## Atualização — Registro 0032 (2026-10-03)

- [x] Diagnóstico read-only de owners, grants, schemas/tabelas/sequences, funções/triggers, policies/RLS, default privileges, memberships e database ACL concluído.
- [x] Script e runbook versionados para separar `u0_a436` (DBA), `rotamoto_migrator` (ownership/DDL/migrations) e `rotamoto_app` (runtime/API com DML explícito); preparados, não executados.
- [ ] Produzir e validar checkpoint completo com DBA; o dump parcial `.incomplete` do Registro 0031 não é backup válido.
- [ ] Executar manualmente `role-split.sql` como `u0_a436`, definir senha do migrator com `\\password` em sessão interativa e executar as queries pós-execução do runbook. Até então database/objetos continuam no ownership atual.
- [ ] Adaptar `test:postgres` para conexões separadas de migrator e runtime antes de validar o estado pós-split; não usar migrator para afirmar RLS/grants runtime testados.
- Ver [Registro 0032](REGISTROS/0032.md) e `rota-moto-restaurante/backend/postgres/admin/role-split-runbook.md`.

## Atualização — Registro 0031 (2026-10-03)

- [ ] Separação estrutural PostgreSQL segue bloqueada: o único acesso pgpass disponível autentica `rotamoto_app`, que não tem `CREATEROLE`/superuser e é owner do database/schema/tabelas. Não criar owner/migrator nem alterar grants sem sessão DBA autorizada.
- [ ] Antes da operação administrativa, obter procedimento de checkpoint completo que leia os dados sob RLS forced. `pg_dump` com a role runtime parou em `audit_log`; o arquivo `.incomplete` não é backup restaurável. O dump schema-only validado não substitui backup de dados.
- [ ] Após disponibilizar acesso DBA e checkpoint completo, criar role dedicada owner/migrator, transferir ownership/grants, reduzir runtime a privilégios DML mínimos, verificar RLS forced/default-deny e separar configuração do migration runner da conexão HTTP; testar migrations/status e conexão/runtime.
- Ver [Registro 0031](REGISTROS/0031.md). Nenhuma alteração foi feita no banco ou nos aplicativos nesta execução.

## Atualização — Registro 0030 (2026-10-03)

- [x] Auditoria da estrutura base, constraints, FKs, índices, RLS e migration runner concluída. Migration `0004_foundation_integrity_constraints` aplicada; fecha integridade do actor de auditoria, ordem de expiração da sessão e timestamp de publicação da outbox.
- [x] Migration runner testado para checksums, detecção de migration ausente, reexecução concorrente/idempotente, rollback transacional, down fail-closed e clean install em schema temporário rollback.
- [ ] Bloqueio estrutural: a role runtime `rotamoto_app` é owner do database, schema e todas as tabelas e tem `CREATE` efetivo no database. Pode alterar policies/triggers/RLS; não é fronteira de privilégio segura para fases expostas.
- [ ] Separar owner/migrator da role runtime exige operação DBA de ownership/grants/roles. Não realizada porque alterar privilégios está proibido; PostgreSQL permanece sem mudança de roles/configuração.
- Conclusão: schema local tem integridade validada, mas fundação segura para avançar fases com acesso operacional ou exposição não está completa até existir separação de ownership. Não expor API; manter loopback.
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
