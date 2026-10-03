# Decisões Técnicas

## DEC-0001 — Manter o histórico fora dos repositórios dos aplicativos

### Data
2026-10-01

### Projeto
RotaMoto Motoboy e Restaurante

### Contexto
Foi solicitada memória estruturada permanente para o trabalho do Codex, sem alterações nos aplicativos e fora dos respectivos repositórios.

### Decisão
Manter o histórico em `~/projetos/codex-historico/`, separado dos repositórios de aplicação, com registros numerados e arquivos de síntese dedicados.

### Motivo
Preservar a documentação de trabalho sem misturá-la com o código dos aplicativos e manter um histórico append-only por interação.

### Alternativas consideradas
Não foram solicitadas nem avaliadas alternativas na configuração inicial.

### Impacto
Atualizações do histórico não modificam os repositórios nem requerem commits neles. O histórico local depende de cópia/backup próprio para recuperação em caso de perda do ambiente.

### Status
ATIVA

## Revisão do Registro 0005 — 2026-10-01

A auditoria de consolidação não introduziu nem alterou decisões técnicas. As decisões de identidade e autorização analisadas no Registro 0004 continuam propostas, sem implementação autorizada nesta interação.

## DEC-0002 — Arquitetura de identidade, tenant e callers

### Data
2026-10-01

### Projeto
RotaMoto Restaurante e Motoboy

### Contexto
As pendências do Registro 0004 impediam expor operações e dados reais por um backend. O usuário autorizou elaborar e aplicar um plano de correção. Os checkouts ainda não contêm PostgreSQL, autenticação humana, membership ou autorização de servidor; portanto esta decisão fixa a arquitetura alvo e orienta implantação faseada sem fingir que as capacidades já existem.

### Decisão

1. **Tenant e onboarding:** usuários são identidades globais; `Membership` associa pessoa a `Company` e contém estado e role. A criação inicial de empresa e primeiro owner será provisionada por operação administrativa controlada após prova de titularidade; não haverá cadastro público que permita reivindicar um tenant. Convites terão token de uso único, prazo e escopo da empresa. Email verificado é atributo de contato/login, não o identificador interno.
2. **Credenciais:** autenticação inicial será email verificado + senha armazenada com Argon2id. O modelo separa `User`, `Credential`, `RecoveryToken` e `Membership`; secrets de recuperação são de uso único. MFA será obrigatório para operações globais/administrativas e opcional para usuários comuns na primeira entrega; OIDC/passkeys podem ser adicionados sem mudar a identidade interna.
3. **Sessão web:** sessão opaca persistida no servidor, cookie `Secure`, `HttpOnly`, `SameSite=Lax`, rotação após login/elevação, proteção CSRF e revogação por sessão ou global. Política inicial: 30 minutos de inatividade e 12 horas absolutas; logout e troca de credencial revogam sessões. Troca de empresa requer membership ativa e atualiza o contexto de sessão no servidor. Não guardar bearer/session tokens no IndexedDB ou URL.
4. **Autorização:** catálogo de permission keys versionado no backend; negar por padrão, verificar usuário, membership, empresa, recurso e operação em cada chamada. Roles são templates por tenant; somente owner/admin autorizado pode atribuir roles já permitidas pelo seu próprio nível. IDs, perfis, nomes, flags de módulo e `can()` do frontend continuam apenas como UX. RLS PostgreSQL será defesa adicional, com tenant context configurado por transação a partir da sessão validada.
5. **Integrações:** `Company → Integration → ExternalAccount`; instalação e credenciais pertencem à empresa e ao provedor, não ao usuário que operou o fluxo. OAuth/API provider deve confirmar merchant/shop/store e vínculo antes de ativar. Segredos ficam em secret manager/KMS; banco guarda apenas referência e metadados não secretos. Webhooks autenticam o provedor; não concedem identidade humana.
6. **Identificadores e migração:** novas entidades server-side usam UUIDv7 gerado no servidor. IDs locais são aliases de migração com namespace de instalação/app e mapeamento explícito para o ID canônico. IDs compartilhados já emitidos não serão reescritos; colisões ou pertencimento ambíguo vão para reconciliação, nunca para fusão automática entre empresas.
7. **Offline e sync:** IndexedDB continua cache/outbox/inbox de domínio e nunca autoridade de identidade ou permissão. Leituras em cache podem funcionar offline; comando enfileirado é reautorizado ao chegar ao servidor. Comandos que alterem acesso, associação, credenciais, contas externas ou ações irreversíveis de provedor exigem sessão/conexão. Sync usa event/packet IDs idempotentes, verifica tenant e revision; conflito retorna estado/conflito explícito para reconciliação, sem replay privilegiado após logout.
8. **Backup/import:** backup pode conter apenas dados operacionais autorizados do tenant e metadados compatíveis. Import não cria nem altera usuário, credencial, sessão, membership, role/permissão, empresa, integração autenticada ou segredo. Import autenticado verifica tenant, schema, limites, referências e revisões; conflitos exigem política explícita e resultado auditável.
9. **Callers:** operações humanas exigem sessão web; worker usa identidade técnica e credencial curta/escopada; webhook verifica assinatura do provedor, timestamp/nonce quando suportado e deduplicação persistente. CORS e origem não substituem autenticação. Até API auth e tenant estarem prontas, o serviço atual só pode escutar loopback; acesso remoto deve passar por proxy autenticado que encaminhe para loopback.
10. **Persistência e validação:** PostgreSQL é a autoridade futura para identidade, membership, autorização, integrações e dados remotos. Constraints/FKs garantem pertencimento; RLS usa política default-deny. Migrações são versionadas e reversíveis quando possível; import/sync aplicam autorização e consistência na mesma transação.

### Plano aprovado
Fase 0: conter a exposição do serviço atual em loopback (implementada no Registro 0009). Fase 1: schema e migrações PostgreSQL para identidade, membership, sessão, role/permission, integration/external account e mapeamento de IDs. Fase 2: provisionamento de tenant/owner, convite, credencial, verificação e recuperação. Fase 3: sessão/CSRF e autorização por recurso; migrar endpoints humanos de integração e adicionar audit log. Fase 4: integração protegida de secrets, webhooks e workers. Fase 5: migração do Local-First, importação e sync idempotentes, conflitos e reconciliação. Fase 6: suite de autorização, tenant isolation/RLS, replay/offline, import/migração e rollout com dados sintéticos.

### Motivo e limites
A separação evita tratar estado local como autoridade e mantém compatibilidade do contrato de domínio até que IDs e reconciliação sejam implantados. Não existe entrega de email, PostgreSQL ou secret manager configurado neste ambiente; não criar credenciais de teste ou armazenamento improvisado para simular esses serviços.

### Referências técnicas consultadas
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [RFC 9700 — OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html)
- [PostgreSQL 17 — CREATE POLICY](https://www.postgresql.org/docs/17/sql-createpolicy.html)

### Impacto
Esta decisão substitui as propostas provisórias do Registro 0004. A contenção de loopback é implementação imediata. As demais fases continuam pendentes de infraestrutura e implementação; não declarar o backend seguro para exposição até completá-las e validar o deploy.

### Reconciliação de escopo — Registro 0020 (2026-10-03)

DEC-0002 mantém autoridade sobre o nome e o escopo da Fase 1: schema/migrations PostgreSQL para identidade, tenant, sessão, roles/permissões, integrações e mapeamento de IDs. O roadmap técnico posterior de persistência do Restaurante é complementar e não substitui esta decisão. A reconciliação não declara implementação concluída.

## DEC-0003 — Publicar estado sincronizado somente após commit

### Data
2026-10-01

### Projeto
RotaMoto Motoboy e Restaurante

### Contexto
O recebimento de pacotes no Motoboy gravava corridas, entregas e recibo em transações separadas e alterava `state.races` durante o processamento. Uma falha intermediária podia deixar dados persistidos parcialmente aplicados e memória divergente. No Restaurante, o recebimento já agrupava staged writes, settings e `syncReceipts` numa transação, atualizando memória após o commit.

### Decisão
Fluxos de recebimento de pacote devem preparar as projeções em estruturas temporárias sem alterar o estado ativo, confirmar os dados de domínio e o recibo idempotente na mesma transação IndexedDB e só então publicar a projeção em memória e atualizar a interface. A checagem de duplicidade dentro da transação é autoritativa; leituras anteriores podem servir apenas como atalho.

### Motivo
Essa fronteira mantém atomicidade entre dados e recibo, evita sucesso antes de `oncomplete`, permite repetir o pacote após falha e torna verificável o estado anterior e posterior ao commit.

### Impacto e limites
Aplicada ao recebimento de pacotes do Restaurante pelo Motoboy no Registro 0015. Não introduz outro mecanismo de armazenamento nem altera o contrato compartilhado. `persistOnly` do Motoboy e comandos gerais ainda recebem estado global mutável já alterado pelos chamadores; esse fluxo amplo requer uma etapa própria para comandar alterações por snapshot/commit e recuperação sem sobrescrever operações concorrentes.

### Status
ATIVA


## DEC-0004 — Serializar comandos locais de corrida por snapshot

### Data
2026-10-01

### Projeto
RotaMoto Motoboy

### Contexto
Os comandos selecionados alteravam corridas globais antes da confirmação da persistência e podiam publicar em ordem diferente da confirmação. `persistOnly()` já tinha a transação multi-store necessária.

### Decisão
Os fluxos migrados devem enfileirar comandos, preparar um snapshot isolado a partir do estado mais recente após a operação anterior, persistir esse snapshot por `persistOnly()` e só então publicar memória/UI. Falha rejeita sem publicar o snapshot. Não se substitui a transação nem se generaliza `persistOnly()` além do argumento opcional de snapshot.

### Impacto e limite
Aplicada no Registro 0016 a cadastro/edição, transições selecionadas e recálculo de taxas. Ajustes gerais, exclusão e outros mutadores ainda precisam migrar.

### Status
ATIVA
