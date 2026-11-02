# Equipe, convites, e-mail e permissões — 2026-11-02

## Resultado

O ciclo interno de convites foi exercitado em Chromium/CDP autenticado, a 390×844, com a interface Restaurante servida em 8083, handlers reais de produção do checkout e PostgreSQL `rotamoto_e2e` sob o papel de aplicação e RLS. O harness utilizou uma transação externa e savepoints; todas as alterações de teste foram revertidas e a verificação final confirmou Chico Restaurante como a única empresa. Isso comprova o fluxo interno sintético, mas não equivale a envio SMTP real nem a uma jornada HTTP protegida executada pelo processo persistente 8787.

## Proveniência dos registros de QA

- A identidade `qa-saneamento-0304-20261031@rotamoto.invalid` e sua membership estão em `rotamoto_e2e`, vinculadas a Chico Restaurante. A auditoria `e2e.fixture.created` identifica o escopo `saneamento-0304` e marca a fixture como sintética; o registro remete à preparação E2E da Campanha 0304. O papel existente é `qa_settings` / “QA Configurações”, com MFA habilitado. A fixture foi reutilizada para o login legítimo com MFA; não foi criada, promovida nem removida nesta execução.
- O perfil temporário `QA Convites <nonce>` e as identidades de convite foram criados somente dentro da transação de teste e desapareceram no rollback. Não há persistência desses registros depois da execução.
- Não foi alterada a conta do proprietário, o fundador global, MFA real, empresa, bancos, grants ou migrations.

## Fluxos comprovados

| Ação | Evidência | Resultado |
|---|---|---|
| Perfil limitado | Criação pelo formulário e leitura no PostgreSQL; exatamente `orders.read` | PASS dentro da transação |
| Negativas de RBAC | Concessão de `platform.admin`, revogação do próprio vínculo administrativo e seleção de tenant não associado | Negadas; nenhuma elevação aplicada |
| Falta de provedor de e-mail | Handler sem provedor respondeu `503 EMAIL_PROVIDER_NOT_CONFIGURED`; UI preservou o endereço digitado e nenhum vínculo foi criado | PASS fail-closed |
| Criar e persistir convite | `POST` 202; membership e token ativo lidos do PostgreSQL; página recarregada e lista voltou a mostrar o convite | PASS |
| Reenvio/duplicidade | Reenvios retornaram 202, mantiveram uma membership e renovaram o token conforme o serviço; sink sintético capturou as mensagens | PASS interno |
| Revogação | Cancelamento no diálogo não alterou o convite; confirmação revogou a membership e o readback mostrou zero token ativo | PASS |
| Expiração | Token expirado permaneceu auditável, a UI mostrou “Convite expirado” após reload e a aceitação recebeu 401 | PASS |
| Aceitação válida | `POST` 200; readback mostrou vínculo ativo em Chico com o papel limitado; reload e novo login conservaram apenas `orders.read` | PASS |
| Reuso de token | Token revogado, expirado ou consumido recebeu 401 e mensagem em português, sem revelar sua causa técnica | PASS |
| Sessão/MFA | A identidade de QA autorizada entrou pelo fluxo de recuperação sintética e completou MFA; a nova conta de baixo privilégio não exigiu MFA porque sua política não exige esse fator | PASS conforme política |

Os tokens permaneceram apenas na memória do processo de teste. O harness confirmou que corpos HTTP não continham token. O teste terminou com `DATABASE_STATE_RESTORED=PASS` e `companyInvariant=PASS_CHICO_ONLY`.

## E-mail: estados separados

- Convite criado/persistido: comprovado.
- Mensagens entregues ao sink sintético: 5, sem destinatários reais.
- Entrega por SMTP/API real: **BLOCKED**; o runtime não tem provedor montado nem configuração de SMTP. O comportamento observado é falhar fechado com 503. Nenhuma credencial foi criada e nenhum e-mail de teste foi enviado a uma pessoa real.

## Concorrência e escopo que permanece aberto

O teste atual serializa as chamadas do harness em uma conexão transacional para garantir rollback. Assim, ele não comprova uma disputa real entre sessões independentes para convite duplicado nem uma corrida simultânea de aceitação contra revogação. A correção de revogação consome tokens pendentes na mesma transação e segue a ordem de locks token→membership da aceitação; o teste unitário verifica essa ordem. O teste concorrente de duas sessões fica **PARTIAL**, sem alegar que a corrida foi exercitada.

Também não foi exercitada a edição geral de memberships/perfis nem a associação/revogação de um cadastro de Motoboy nesta rodada. O repositório Motoboy não teve alterações; sua UI autenticada de vínculo continua fora do resultado desta prova.

## Alterações de código

- `backend/admin/repository.js`: seleciona `invitation_expires_at` no DTO tenant-scoped de membros; ao suspender/revogar uma membership ainda convidada, consome os tokens pendentes na transação antes do lock da membership, mantendo a mesma ordem de lock da aceitação.
- `identity-ui.js`: converte `INVALID_TOKEN` em orientação em português para código inválido, expirado ou já usado.
- `tests/test-admin-membership-invitations.js` e `tests/test-identity-ui.js`: regressões para o campo de expiração e consumo/ordem de locks e mensagem clara.
- `index.html` e `asset-manifest.js`: atualização do hash de asset. Não houve mudança de CSS nem redesign; o layout anteriormente aprovado foi preservado.

Commit local Restaurante: `97c84ae` (`fix: close invitation lifecycle gaps`). Motoboy: sem alteração de código.

## Execução, runtime e publicação local

O harness reproduzível, mantido fora dos repositórios de produto, é `~/projetos/browser-tests/.temporarias/0304-team-invitations-e2e.cjs`. Ele usa Chromium/CDP isolado e não registra senha, TOTP, cookie ou token.

Depois do ensaio, o runit `rotamoto-api-e2e` foi reiniciado controladamente para carregar o checkout atualizado (PID anterior 5288; novo 12276). `GET /health/ready` respondeu 200 com PostgreSQL pronto. Sem sessão, `/api/admin/memberships`, `/api/admin/company` e `/api/admin/company/delivery-pricing` responderam 401, confirmando que continuam protegidos; `GET /api/admin/company/profile` e `/api/admin/company/settings` responderam 405 porque são rotas PUT. Não foi executada escrita no processo persistente da API durante o ciclo com rollback.

O Restaurante 8083 respondeu 200 e os SHA-256 HTTP coincidiram com o checkout:

| Arquivo | SHA-256 local = HTTP |
|---|---|
| `index.html` | `abc87963c1b89091297bdea96d8e4de0d39cb3f466fb97e4dfb9d3966678e200` |
| `asset-manifest.js` | `be11c82873775552f14c3878e162bfbb4cb31974705225e5e6fb5d01a73fa6da` |
| `identity-ui.js` | `d6abe07c9b5d42333811b2ffe1795cce00b67a147bb2bc7083bfdc805b62dc86` |

Motoboy 8084 respondeu 200 e não foi alterado. Não houve revalidação visual completa porque nenhum CSS/layout foi modificado e a seção já tinha aprovação do proprietário; o Chromium autenticado validou as interações de convites no mobile.

## Testes

- Browser QA/CDP autenticado sintético, 390×844: ciclo completo interno, MFA legítimo da fixture, RBAC positivo/negativo, reload, sem exceções JavaScript.
- Restaurante: `node tests/test-admin-membership-invitations.js`, `node tests/test-identity-ui.js`, `node tests/test-dialog-service-contract.js`, `node --check backend/admin/repository.js`, `node --check identity-ui.js`, `npm run assets:check`, `git diff --check` — PASS.
- Motoboy: `node tests/test-cross-app-contract-parity.js`, `node tests/test-identity-ui.js`, `node tests/test-identity-session-first-access.js` — PASS.
- Serviço E2E: `/health/ready` 200; endpoints protegidos sem sessão retornaram 401; hosts 8083 e 8084 responderam 200.

## Gates

| Gate | Estado | Motivo |
|---|---|---|
| Ciclo interno criar/reler/recarregar/reenviar/revogar/expirar/aceitar/rejeitar replay | PASS | Chromium autenticado, handlers de produção, PostgreSQL/RLS e rollback |
| RBAC exercitado nesta jornada | PASS | perfil limitado e negativas de escalonamento/autorrevogação/tenant |
| Entrega de e-mail real | BLOCKED | provedor SMTP/API ausente; sink foi sintético |
| Corrida entre sessões independentes | PARTIAL | harness serializa em conexão transacional rollback-only |
| Link operacional Motoboy | PARTIAL | não exercitado nesta rodada; app não alterado |
| Aprovação visual global/G14 | FAIL | permanece dependente da aprovação expressa do proprietário para o conjunto visual da campanha |

Os IDs canônicos `RM-0256C-TEAM-RBAC`, `RM-0256C-DRIVER-LINK-UI` e `RM-0259-IDENTITY-INVITE-LIFECYCLE` continuam **PARTIAL** no backlog global: esta evidência fecha o ciclo interno específico, mas não todos os critérios amplos de RBAC, associação Motoboy, concorrência e serviço de e-mail real.
