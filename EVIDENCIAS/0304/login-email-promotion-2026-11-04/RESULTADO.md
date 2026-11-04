# Campanha 0304 — preflight de promoção do login por e-mail

**Data:** 2026-11-04 UTC
**Classificação da execução:** BLOCKED antes da promoção.
**Classificação da campanha:** PARTIAL; backlog existente preservado; G14 continua FAIL; 0305 não iniciada.

## Limites e preservação

Foram feitas inspeções de repositórios, serviços, metadados de arquivos, HTTP público e consultas PostgreSQL somente leitura. Nenhum SMTP/e-mail foi enviado; nenhuma senha, MFA, sessão ou login do proprietário foi usado; nenhum segredo, conteúdo pessoal, token, dado operacional ou valor do keystore foi lido ou publicado. Nenhuma migration, restart, backup novo, restore, limpeza, alteração de grants/configuração ou escrita em dados oficiais ocorreu.

Restaurante e Motoboy estavam limpos nos branches de campanha observados e não foram alterados. Baseline `v5.50-ui-mobile-fix5` preservada. No histórico foram preservados dois caminhos preexistentes não rastreados: a captura de Empresa/Operação e o diretório `login-redesign-2026-10-25`.

## Runtime e contratos

- 8083 e 8084 responderam HTTP 200; os assets de `identity-ui.js` conferem com os workspaces Restaurante e Motoboy.
- API oficial está supervisionada e ativa em 8788. O processo é anterior aos arquivos backend atuais; como o preflight proibia restart, não se validou o contrato carregado nem se atribuiu comportamento de runtime ao código atual. Health anônimo de sessão retornou 401 `UNAUTHENTICATED`, resposta esperada sem sessão.
- Há divergência operacional entre assets atuais e backend efetivamente carregado. Não houve validação de login oficial e nenhum login real foi tentado.

## PostgreSQL e migration 0071

Consulta READ ONLY confirmou ledger oficial em `0070_founder_mfa_audit_actor_kind`; `0071_identity_login_company_options` e sua função ainda não existem no banco oficial. Checksums locais conferidos:

| Arquivo | SHA-256 |
|---|---|
| 0071 up | `5f9bd787fbe3c734c490f56f0a18aa5ba248b12d7c58a8eee48e4bed66d7da5c` |
| 0071 down | `3b6500d93b7169333b2179951a815892a010fd38b2c21b51793e4aaa1f2915c` |

O SQL é aditivo, cria função `SECURITY DEFINER` de resolução e políticas de leitura para o fluxo pós-autenticação; o ensaio de compatibilidade/privilegios só pode ser considerado concluído em cópia restaurada, não no oficial. RLS e FORCE RLS foram confirmados nas relações centrais consultadas. O papel auditor não conseguiu executar `current_tenant_id()` na consulta de memberships (`permission denied`); não foi usado BYPASSRLS para contornar a falha e nenhum privilégio foi alterado. Por isso, vínculo fundador e listagem administrativa global não foram revalidados nesta passagem.

## Gate G1 — backup e recuperação

O artefato 0304-L1 já arquivado identifica o set `f96bb29f-b067-4b1c-8709-86e678b1b622`, com manifesto/componentes estruturalmente válidos em verificação histórica. A mesma evidência registra que a chave local não corresponde à chave associada ao envelope, que não foi feito decrypt/compare e que não houve restore rehearsal. Esse set não prova recuperação utilizável.

No processo/configuração corrente, as variáveis operacionais necessárias à criação/verificação de backup não estão configuradas. Não se tentou substituir chave ou recuperar credencial a partir de artefatos de campanha. O resultado é G1 **BLOCKED**: não há backup atual comprovadamente recuperável nem ensaio em banco descartável. A promoção foi interrompida aqui antes de qualquer DDL.

## Gates G1–G7

| Gate | Estado | Fundamento |
|---|---|---|
| G1 | **BLOCKED** | Custódia incompatível do set existente, sem restore rehearsal e sem configuração atual homologada para novo backup. |
| G2 | **BLOCKED** | RLS/FORCE observado; leitura necessária para memberships negada ao papel auditor; testes negativos requeridos não foram repetidos em cópia restaurada nesta execução. |
| G3 | PARTIAL | Migration e hashes inspecionados; não ensaiada na cópia restaurada e não aplicada no oficial. |
| G4 | PARTIAL | Existem evidências sintéticas históricas, mas elas não comprovam runtime oficial; frontend atualizado e API carregada desatualizada. Credenciais reais não usadas. |
| G5 | BLOCKED | Matriz requerida dos dois apps, 390/768/1440, claro/escuro e estados MFA/logout/troca não executada nesta promoção. |
| G6 | **BLOCKED** | Gate obrigatório G1–G5 não está integralmente PASS. Nenhuma migration ou restart. |
| G7 | BLOCKED | Pós-promoção não iniciada. |

## Causa e continuidade segura

A falha de acesso oficial ainda não pode ser atribuída unicamente a frontend, backend ou MFA, pois o backend atual não está carregado e a migration 0071 está ausente. O estado oficial é incompatível com o fluxo novo completo: o schema não expõe a resolução de vínculos necessária, e o processo API não acompanha o checkout atual. Isso demonstra promoção incompleta, mas não autoriza concluir qual seria a resposta final após alinhar versões.

O primeiro passo para retomada é o operador de backup restabelecer, por procedimento protegido, acesso à chave correspondente ao set ou preparar configuração homologada independente sem sobrescrever artefatos antigos. Criar um recovery set atualizado, verificar autenticidade/integridade e comprovar restore em banco descartável isolado. Em seguida, concluir G2–G5 em clone aprovado. Só então revalidar ausência de alterações concorrentes e considerar G6.

**Estado final:** PostgreSQL oficial permaneceu em 0070, sem escrita; configuração, credenciais, autorizações e keystore preservados; nenhum serviço reiniciado; nenhum envio ou login real; nenhuma promoção. Nenhuma alteração de aplicação nesta execução, portanto nenhum commit local de app. O histórico receberá commit documental e será o único repositório com push, por fast-forward.
