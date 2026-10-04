# Modelo de dados RotaMoto — matriz F1

**Versão:** 1.0 · **Revisão:** 2026-10-04 · **Fontes:** CONTRACT v1/contract.js, DEC-0002/0005/0006, Registros 0033–0037, branches codex/setup-workflow, migrations PostgreSQL 0001–0008 e catálogo oficial read-only.

Matriz de campos contratuais e modelos observados; quando o contrato não fixa forma ou semântica, fica explicitamente “não definido”. IndexedDB foi inspecionado estaticamente, sem ler dados reais. PostgreSQL não foi alterado nesta execução.

## Regras comuns

| Campo | Autoridade e validação | Identificação/tempo | Offline e conflitos |
|---|---|---|---|
| id/companyId | Servidor valida tenant pela sessão/membership; companyId do payload não autoriza acesso. | ID local pode ser texto/prefixo; ID canônico UUID; local_id_maps liga tenant/app/instalação/tipo/local ID. | Alias ambíguo ou cross-tenant é rejeitado. |
| createdAt/updatedAt/version | Cliente conserva histórico local; servidor atribui revisão canônica. | domain_records.version positiva; timestamps canônicos do servidor. | baseVersion obsoleta gera conflict; sem last-write-wins. |
| deletedAt/tombstone | Só owner pode solicitar exclusão lógica; DeliveryEvent é imutável. | Tombstone contém ID/tenant/revisão/data. | Reter enquanto necessário a retry/dedup; prazo geral não definido. |
| sync metadata | Aplicação altera metadados locais; ACK rege confirmação. | localId, canonicalId, canonicalVersion, packetId/eventId/cursor. | Rede não bloqueia escrita local; conflict/rejected preserva dados e operação. |
| Campo legado/desconhecido | Não vira campo canônico por inferência. | Migration mantém campos extras; validação no application layer. | Nunca descartar silenciosamente durante merge/import/upgrade. |

Abreviações: R=Restaurante; M=Motoboy; PG=PostgreSQL; API=backend Restaurante; JSON=domain_records.payload; owner segue DEC-0006. Stores podem ser cache/projeção e não definem autoridade.

## Matriz de entidade e campos

| Entidade/campos conhecidos | Autoridade; criar/alterar/tombstone | IndexedDB R / M | PG/API/sync; IDs, versão, relações, índices e constraints | Offline, conflito, legado, sensibilidade e retenção |
|---|---|---|---|---|
| **Company:** id, name, status, createdAt, updatedAt; demais campos administrativos não enumerados | Servidor/identidade; cliente não cria tenant canônico ou altera membership. Encerramento administrativo. | R companies; M meta/cache. company_local é legado. | PG companies relacional; UUID, name 1–160, status enum, PK/timestamps, FKs/membership, RLS por id. API identidade e snapshot autorizado. | Local sem tenant real permitido; mapear legado só por onboarding. Dados comerciais; prazo pendente. |
| **User:** id, email, verified/disabled timestamps | Servidor/provisionador/admin; desabilitar em vez de apagar. | R users/profiles são UX local; M não tem identidade persistida. | PG users; identity API; unique lower(email), limites/checks e relações com credential/membership. Não é domínio push. | admin@local não é identidade real. Email pessoal; retenção/anonimização pendente. |
| **Membership:** id/companyId/userId/roleId/status/inviter/activation/timestamps | Identity/admin autorizado; convite, ativação e revogação via API. | R users/profiles e M profile são aproximações locais, não membership. | PG memberships; PK, unique tenant/user, FK role/tenant e user/company, índice user/status, RLS. | Offline não concede autoridade. Server session prevalece; dados de acesso sensíveis. |
| **Role:** id/companyId/roleKey/displayName/template/timestamps | Backend/admin tenant-scoped. | R profiles é legado UX; M sem role. | PG roles e role_permissions; unique tenant/key, FK composta, relação a Permission, RLS/FORCE. | Cache não autoriza; alterações offline não concedem permissão. |
| **Permission:** permissionKey/catalogVersion/description | Catálogo backend; cliente não escreve. | Sem store canônica; permissões locais só navegam UI. | PG permissions; PK key/version, pattern/tamanho, FK role_permissions. | Permission desconhecida falha fechada; dado técnico não pessoal. |
| **Credential:** Argon2id PHC, troca, tentativas, lock, MFA required/ref | Serviço identidade; cliente nunca lê hash. | Nunca IndexedDB/localStorage; senha só memória do formulário/request. | PG credentials, PK/FK user, hash prefix CHECK, attempts >= 0; API login/recovery sem hash na resposta. | Login remoto requer rede; hash/estado de segurança altamente sensíveis. |
| **Driver:** cadastro administrativo; schema integral de campos não definido | Restaurante/servidor administra; M não publica cadastro. Execução própria vira fato logístico. | R bikes; M profile/meta descreve executor local. | JSON Driver; API sync limitada à autoridade R; UUID; driverId aparece em Delivery payload sem FK tipada/index próprio. | M usa último snapshot offline; alteração cadastral M não sobe. Nome/telefone/documento sensíveis, prazo pendente. |
| **Order:** campos locais vistos: number, customer, phone, address, notes, items, payments, amount/source; canônico incompleto | R cria/altera/tombstone comercial; M consulta subset. | R orders; M sem store Order: cache em inbox/syncState/Delivery/races. | JSON Order; API push/pull; UUID; Delivery pode relacionar Order por FK genérica; sem field constraints, índice tenant/type/update. | R opera offline; M usa snapshot, não altera comércio. Nome/endereço/telefone/notas PII; retenção pendente. |
| **Delivery:** id/companyId/orderId/driverId/status/priority/timestamps de atribuição/execução/distâncias/version | R cria, planeja, atribui e cancela administrativamente; M grava fatos/estados permitidos; servidor valida transição. Tombstone administrativo. | R deliveries; M deliveries + races como projeção. | JSON Delivery; API ownership/revisão/ACK; UUID; relation genérica Order, status CHECK, timestamps básicos, índice tenant/type/update/related; sem FK tipada de Driver/Order ou constraints por campo. | Offline preserva fila/eventos; conflito explícito; nenhum lado sobrescreve campos do outro. Logística e PII sensíveis, prazo pendente. |
| **Route:** sequência/plano/origem; schema integral e vínculo não definidos | R planeja/altera/cancela; M consome/reporta fatos, não reescreve plano. | R routes; M sem store, cache inbox/syncState. | JSON Route; API push/pull; UUID/revision/time; sem FK Route→Delivery. | Plano offline usa último snapshot; preservar execução local. Relação permanece bloqueada; localização/endereço sensíveis. |
| **DeliveryEvent:** eventId/type/entity/entityId/occurredAt/actor/payload/protocolVersion | Fato append-only; servidor valida origem/transição. Nunca update/tombstone. | R deliveryEvents/events; M deliveryEvents/outbox. | JSON; trigger imutável; UUID + eventId único tenant; relation genérica Delivery/Order; idempotência API. | Offline/retry idempotente; mesmo ID/fato duplicate, conteúdo divergente conflict. Payload pode ter PII; retenção pendente. |
| **LocationPoint:** coordenadas/instante/evento; formato completo não definido | M escreve, R lê; ponto aceito não é editado. | R/M locations. | JSON; relation genérica Delivery; sem geospatial index por falta de shape/consulta definidos. | Offline com permissões; retry idempotente. Localização altamente sensível; retenção/consentimento pendentes. |
| **DeliveryProof:** assinatura/foto/metadados incompletos | M cria, R lê; correção via nova prova/fato, não substituição. | R/M proofs; imagem/assinatura local pode existir. | JSON; storage de binário server-side não definido; relation genérica Delivery, sem check de MIME/tamanho. | Offline possível, validar antes de renderizar. Imagem/assinatura sensíveis; criptografia/limite/retenção/eliminação pendentes. |
| **Earning:** valor/período/entrega; fórmula/moeda/arredondamento incompletos | R calcula/escreve; M somente consulta; correção R auditável. | R/M earnings, Motoboy read-only. | JSON; relation Delivery genérica; sem CHECK monetário seguro até definir escala/moeda/fórmula. | M consulta último snapshot offline, não calcula authority. Financeiro sensível; retenção fiscal pendente. |
| **Integration:** provider/status/creator/timestamps | Admin Restaurante/server autorizado; sem secret no cliente. | R settings/lab; M sem store. | PG integrations relacional; provider enum, unique tenant/provider, RLS/FORCE; API de gestão parcial. | Offline exibe último estado sanitizado. Segredos nunca locais; retenção operacional pendente. |
| **ExternalAccount:** external ID/display/status/confirmedAt/secret_ref/metadata | Backend/admin vincula ou revoga. | Sem store authority; UI só display mínimo. | PG external_accounts; FK composta integration/company, unique integration/external ID, checks, RLS. | secret_ref é ponteiro, não segredo. Metadata pode ser comercial; prazo pendente. |
| **Session:** token/CSRF digests, user/tenant, idle/absolute, revocation/rotation | Identity backend cria/renova/revoga. | Token/CSRF nunca em IndexedDB/localStorage; cookie HttpOnly e memória transitória. | PG sessions; API login/session/logout/tenant; FK membership, índices user/expiry e tenant/user, CHECK temporal. | Offline local não autentica API; expirado/revogado falha fechado. Sensibilidade crítica; expiração/revogação definidas. |
| **RecoveryToken / IdentityToken:** digest/purpose/expiry/consumed | Backend cria/consome single-use; provider entrega bruto. | Bruto só memória/form transitório; não persistir local. | PG recovery_tokens/identity_tokens; digest 32 bytes unique, purpose enum, expiry CHECK, índices user/purpose/expiry e FK membership. | Rede necessária; reuso rejeitado; bruto nunca persistido. Expiração está no schema; email real externo. |
| **ProvisioningRequest:** idempotency/request digest, company/user IDs/status | Provisionador confiável; cliente não cria. | Ausente. | PG provisioning_requests; digest PK, FK membership desde migration 0003, status/timestamps; API fail-closed. | Idempotente/transacional; não armazena credencial. |
| **SyncInstallation:** tenant/app/local device/registered user/timestamps | Server registra por sessão; source.app não autoriza. | Device ID em meta/settings. | PG sync_installations; UUID, unique tenant/app/device, FK user, RLS/FORCE, índice user/app/device; registration/push/pull API. | Sem rede pode continuar operação local, não sync protegido. Device ID pseudônimo; rotação/revogação pendente. |
| **SyncInbox:** packetId/app/install/received/digest/result | Servidor grava receipt ao processar pacote. | R/M inbox para pull/resultados. | PG sync_inbox; PK tenant/packet, digest 32 bytes, FK installation, RLS; API push/pull. | Mesmo ID+digest idem; payload diferente conflict. Retenção deve manter retry/dedup, prazo pendente. |
| **SyncOutbox:** eventId/app/install/created/published/payload | Servidor emite eventos; cliente cria operação local. | R/M outbox; ACK seguro compactado conforme 0036, conflito/rejected/transiente preservados. | PG sync_outbox; PK tenant/event, FK install, índices pending/cursor, RLS. | Não apagar retry/conflict; payload pode ter PII e não vai a logs. Retenção server-side pendente. |
| **LocalIdMap:** app/install/entity type/localId/canonicalId/first/last seen | Servidor cria ao aceitar; alias local continua. | IDs/revisões em sync metadata/inbox. | PG local_id_maps; unique tenant/app/install/type/local, FKs install/record, índice canonical, RLS. | Preservar em import/reinstalação; nunca cruzar tenant. Retenção ligada a retry/restore, prazo pendente. |
| **AuditLog:** actor/action/resource/occurred/details | Backend/worker/ator autorizado; append-only. | R logs é operacional local, não audit; M sem audit canônico. | PG audit_log; FK tenant/user, actor user required, índices tenant/time e actor/time, trigger imutável, RLS/FORCE. | Nunca senha/hash/token ou PII bruta. PG sem prazo; setting local do R declara 365d, limpeza efetiva a confirmar. |
| **RolePermission:** tenant/role/permission/version/time | Backend/admin tenant. | R profiles UX; M sem store. | PG role_permissions junction, PK e FKs role/tenant/catalog, RLS/FORCE. | Cache não autoriza; só API altera. |
| **Error/ACK/syncState:** status, error code estável, cursor e contadores | API fornece ACK; cliente mantém estado observável. | R/M syncState/inbox/outbox. | API statuses accepted/duplicate/rejected/conflict e canonical IDs/revision/error code; packet/event idempotency no PG. | Rede transitória retry; rejeição/conflito não entra retry infinito; persiste após reload. Sem segredo em log. |

## Stores IndexedDB auditadas e upgrade

| App / DB | Stores | Antes → depois | Estrutura e legado |
|---|---|---|---|
| Restaurante, rota-moto-restaurante-local-v30 | meta, companies, orders, deliveries, bikes, routes, events, deliveryEvents, locations, proofs, earnings, outbox, inbox, tombstones, syncState, logs, profiles, users (18) | DB_VERSION 4 → 6 (passo 5 acrescenta índices; passo 6 corrige chaves de evento/log) | keyPath meta.key e demais id. Antes stores criadas inline sem registry/indexes secundários. users/profiles/settings são UX legado. |
| Motoboy, RotaMotoDB | meta, races, deliveries, deliveryEvents, locations, proofs, earnings, outbox, inbox, tombstones, syncState (11) | DB_VERSION 5 → 7 (passo 6 acrescenta índices; passo 7 corrige chaves de evento) | keyPath meta.key e demais id. races já tinha indexes status/createdAt. localStorage legado rotaMoto.backup/motoboy.db.v2. races é projeção. |

Foi criado indexeddb-schema.js em cada app com passos numerados síncronos. As migrations iniciais foram seguidas por uma correção aditiva após a inspeção mostrar os campos reais dos eventos (entityId/occurredAt) e dos logs locais (at), em vez de deliveryId/createdAt. Para não reescrever migration já commitada, uma versão nova substitui somente os índices incorretos. Estado final: Restaurante migration 5 acrescenta índices secundários não únicos por company/time/sync/canonical ID/relação; migration 6 ajusta eventos/logs para entityId/occurredAt/at. Motoboy migration 6 acrescenta índices; migration 7 ajusta DeliveryEvent para entityId/occurredAt. Instalação nova percorre todos os passos. Índices não únicos evitam que duplicatas/registro legado bloqueiem upgrade. Marcador meta.storageSchemaVersion é gravado na mesma versionchange transaction. Falha aborta a transação; stores desconhecidas não são apagadas; o browser confirma tudo ou reverte tudo atomicamente. Nenhum registro de domínio é regravado e nenhum cleanup/retenção foi introduzido. Scripts HTML carregam o módulo antes do app; Service Worker Motoboy inclui o asset e ganhou cache version novo.

Índices foram escolhidos sobre campos presentes no envelope/projeções; campos ausentes no legado simplesmente não geram entrada. Constraints de domínio permanecem no application/service layer. O contrato não fixa campos completos de Order, Route, Driver, LocationPoint, DeliveryProof/Earning; não é seguro impor allowlists/uniqueness ou transformação destrutiva até fixar esses payloads.

### Backup/import encontrado no código

- Restaurante exporta schema rota-moto-restaurante-local, version 8, appVersion, protocol/schema versions, settings, companies, user, profiles, users, orders, bikes, routes, events e logs. Não inclui deliveries, deliveryEvents, locations, proofs, earnings, outbox, inbox, tombstones ou syncState. O import apresenta preview/merge apenas para companies/orders/bikes/routes/profiles/users/events/logs e settings; portanto “backup completo” não restaura todas as stores nem estado pendente de sync.
- Motoboy exporta version 8, protocol/schema, races e settings; não inclui as stores independentes deliveryEvents/locations/proofs/earnings/outbox/inbox/tombstones/syncState. Import atual substitui races/settings após validação superficial e mantém as outras stores como estavam; não é snapshot transacional integral do estado Local-First.
- A semântica de restore precisa decidir replace vs merge por store, identidade de backup/tenant, preservação de outbox/conflict/tombstones, dados pessoais/mídia e confirmação antes de substituir. Não foi alterada agora para evitar inventar regra ou perder estado. F1.2 deve especificar formato versionado, validação estrita, preview e transação multi-store, cobrindo arquivos legados, retry/rollback e operações pendentes. Até lá os exports existentes são cópias parciais/operacionais, não recuperação integral.

## PostgreSQL: JSONB versus relacional

Manter Company, users/credentials, memberships, roles/permissions, sessions/tokens, integrations/external_accounts, provisioning/audit, sync installations/inbox/outbox e aliases relacionais. Manter Order, Delivery, Route, DeliveryEvent, LocationPoint, DeliveryProof, Earning e Driver em domain_records.payload JSONB enquanto campo/consulta canônica não estiver fechado.

Migrations 0005–0008 fornecem UUID canônico, tenant, revision, installation origin, relação genérica tenant-safe, tombstone, event idempotency/immutability, índice de pull e RLS/FORCE. O envelope HTTP é JSON e não se demonstrou ganho concreto de normalizar por entidade nesta etapa; fazê-lo por inferência duplicaria campos e restringiria payloads válidos. Delivery→Order tem relação explícita genérica; Route→Delivery não está definido. Nenhuma migration PG nova criada ou aplicada; migrations 0001–0008 intactas. Futuro DDL deve usar rotamoto_migrator; runtime rotamoto_app permanece least privilege.

## Dados sensíveis e retenção

| Dado | Permitido | Proibido | Retenção/conhecido |
|---|---|---|---|
| Senha em texto | Memória durante submissão | IDB/localStorage, PG, logs, backup | Descartar após resposta; produção exige HTTPS. |
| Argon2id hash | PG credentials.password_phc | Browser, API response/log | Atualiza em troca/recovery; política da conta pendente. |
| Session token | Cookie __Host- HttpOnly e memória transitória | IDB/localStorage, URL/log | Digest PG; idle/absolute expiry e revogação já existentes. |
| CSRF | Memória da página/digest server-side | IDB/localStorage, URL/log | Ciclo vinculado a sessão. |
| MFA secret | KMS futuro por secret ref e memória breve | IDB, PG em claro, log, Git, response | MFA operacional bloqueado; rotação/recovery pendente. |
| Recovery/invite/verification token | Bruto transitório/provider; digest PG | IDB durável/log | Single-use/expiry no schema; email real externo. |
| OAuth/API/signing secrets | KMS/secret manager futuro | Browser, IDB, Git, log/audit | secret_ref é ponteiro; rotação/runbook pendente. |
| Foto/assinatura | IDB offline enquanto pendente; storage server cifrado futuro | Logs, URL, HTML não escapado, backup sem proteção | Limite/storage/retenção/eliminação pendentes. |
| GPS | IDB offline e PG tenant-scoped após sync autorizado | Telemetria pública/logs/tenant alheio | Consentimento/coarsening/retenção pendentes. |
| Endereço/telefone/nome/email | Stores/PG só na operação autorizada | URL/log genérico/export sem validação | Minimização e prazo legais/produto não definidos. |
| External account ID/metadata | PG RLS; UI display mínimo | OAuth secret no client/log | Revogação status disponível; prazo histórico pendente. |
| Eventos/audit/errors | Fatos e audit append-only; erro sanitizado | Senha/hash/token/payload PII bruto | audit PG sem prazo; setting logs local R indica 365d, limpeza efetiva a confirmar. |

Não inventar prazo nem apagar dados sem política. Não compactar outbox/conflicts/tombstones/aliases que sustentem retry, dedup ou restore.

## Lacunas genuínas restantes da F1

1. Schema canônico de campos completo de Order, Route, Driver, LocationPoint, DeliveryProof e Earning (incluindo moeda/fórmula).
2. Route→Delivery e semântica de replanejamento/cancelamento; código atual não prova vínculo inequívoco.
3. Retenção, consentimento, acesso e eliminação de GPS, prova/assinatura, PII e audit logs.
4. Limite/MIME/storage de mídia e export/backup cifrado.
5. Mapeamento de users/profiles/bikes locais para identidade/membership/Driver sem confundir identidade e executor.
6. Retenção server-side de inbox/outbox/alias preservando retry/reinstalação/auditoria.
7. Verificação do upgrade contra IndexedDB real/browser e backup antigo exige ambiente/browser; nesta execução o comportamento transacional foi testado por harness de registry, sem Browser QA.

Estes itens impedem chamar o modelo inteiro de definitivo e criar constraints/tabelas por suposição; não bloqueiam trabalho independente futuro nem migrations locais aditivas seguras.
