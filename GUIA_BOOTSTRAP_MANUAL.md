# Guia de instalação manual do RotaMoto

Este guia descreve a instalação local do Restaurante e Motoboy, com foco no Termux. Os comandos E2E abaixo foram conferidos no código da Campanha 0243. A sequência de produção documenta o contrato existente; não foi executada nesta campanha. Não copie valores de senha para URLs, argumentos, histórico do shell ou Git.

## 1. Pré-requisitos

- Android com Termux atualizado, Node.js, PostgreSQL 18, Nginx e runit.
- Repositórios Restaurante e Motoboy clonados e dependências instaladas conforme seus `package.json`.
- Chromium e a infraestrutura CDP de `~/projetos/browser-tests` para validação de navegador.
- Espaço privado persistente em `$HOME/rotamoto-data`; permissões `0700` nos diretórios e `0600` nos arquivos sensíveis.
- PostgreSQL local em loopback e backups verificados antes de mudanças de schema.
- Um domínio, DNS e HTTPS reais antes de convites de produção. Não use `https://localhost` como URL pública.

## 2. Serviços e portas

No perfil desta implantação, runit administra `postgres`, `nginx`, `rotamoto-api-official` e `rotamoto-api-e2e`. O Nginx encaminha as aplicações oficiais `8081/8082` para a API oficial `8788`, e as aplicações E2E `8083/8084` para a API E2E `8787`. Os listeners devem permanecer em loopback; valide com `sv status`, `nginx -t`, `/health/ready` nas APIs 8787/8788, `/` nos frontends 8081–8084 e `ss -ltn` antes de operar. Não exponha as portas diretamente à LAN ou à internet.

## 3. Configuração e segredos

- Os processos recebem variáveis por configurações privadas de runit, com ambiente separado para oficial e E2E.
- URLs PostgreSQL não devem conter senha. O arquivo `~/.pgpass` deve ser privado (modo `0600`) e limitado às bases/roles necessárias.
- O runtime oficial usa `DATABASE_URL` para `rotamoto`; o runtime de homologação usa `NODE_ENV=test` e `E2E_RUNTIME_DATABASE_URL` para `rotamoto_e2e`.
- A API E2E usa `rotamoto_e2e_app` como `session_user` e assume `rotamoto_app` sem herança automática. Não conceda à role E2E `CONNECT` no banco oficial.
- O provedor de segredos oficial é configurado por `ROTAMOTO_SECRET_STORE_DIRECTORY` e `ROTAMOTO_SECRET_MASTER_KEY_FILE` ou pelo provider aprovado em produção. O keystore E2E da 0243 é separado e nunca deve compartilhar chaves/arquivos com a identidade oficial.
- SMTP de produção utiliza referências do keystore (`SMTP_PASSWORD_REF`), TLS verificado e `PUBLIC_BASE_URL` HTTPS definitivo. Não use o SMTP real em testes E2E.

## 4. Banco novo e migrations

Crie uma base vazia por procedimento PostgreSQL revisado e aplique os scripts de roles/grants de `backend/postgres/admin/` com papel administrativo controlado. O migrator deve ter privilégios de DDL necessários; a role HTTP não deve receber privilégios de migração. Preserve RLS, `FORCE ROW LEVEL SECURITY`, policies e grants mínimos.

Migrations oficiais são operadas pelo runner após backup e aprovação de mudança. Para consultar o estado E2E já existente (somente status):

```sh
cd ~/projetos/repos/rota-moto-restaurante
env NODE_ENV=test E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node backend/postgres/migrate.js status --e2e
```

Para novo E2E, revise primeiro `node backend/postgres/migrate.js up --e2e`; esse comando altera schema e só deve ser executado contra o banco E2E de destino explicitamente identificado. Nunca use `--e2e` como substituto de confirmação de base.

## 5. Diferenças E2E e produção

| Item | E2E | Produção |
|---|---|---|
| Banco | `rotamoto_e2e` | `rotamoto` |
| Runtime | `NODE_ENV=test`, `E2E_RUNTIME_DATABASE_URL` | `NODE_ENV=production`, `DATABASE_URL` |
| Bootstrap | `scripts/bootstrap-owner-e2e.js`, TTY, confirmações E2E, captura local em memória | `scripts/bootstrap-owner.js --confirm-database=rotamoto`, TTY e SMTP/keystore/auditoria operacionais |
| Email | Token capturado em memória; sem rede/SMTP | Convite enviado por SMTP TLS a endereço confirmado |
| MFA | Segredo persistido somente no keystore E2E privado | Keystore/provedor oficial sob controles de produção |
| Endereço | `127.0.0.1`, interfaces 8083/8084 | domínio real com HTTPS e proxy confiável |

O servidor HTTP não oferece endpoint de Bootstrap. O executor E2E é CLI local, recusa banco/role/host diferentes e valida `current_database()`, `current_user`, `session_user` e IP servidor. Ele usa a lógica de identidade, transação e latch existente.

## 6. Roles e privilégios

Use as roles provisionadas e documentadas nos scripts de administração: `rotamoto_app` (runtime), `rotamoto_e2e_app` (login runtime E2E, `CONNECT` somente E2E), `rotamoto_migrator` (migrações) e `rotamoto_auditor` (leitura restrita). Verifique privilégios com `pg_database`/`has_database_privilege` e consulte RLS/policies sem conceder `BYPASSRLS`. Não conceda à aplicação HTTP papel de superusuário, ownership ou capacidade de migração.

## 7. Bootstrap E2E desta implementação

1. Confirme, por leitura, que não existem empresas, usuários nem pedidos de provisionamento e que `installation_bootstrap` está disponível. Se houver qualquer identidade, não faça reset automático.
2. Confirme que os serviços PostgreSQL, API e Nginx estão ativos e as URLs E2E são 8083/8084 → API 8787.
3. Para habilitar MFA persistente no E2E, inicialize uma única vez o keystore E2E. Esta chave criptografa segredos de homologação; não é envelope de recuperação. Não execute se o keystore já existir:

```sh
cd ~/projetos/repos/rota-moto-restaurante
env NODE_ENV=test ROTAMOTO_E2E_CAMPAIGN=0243 ROTAMOTO_E2E_RUNTIME_ROLE=rotamoto_e2e_app E2E_RUNTIME_DATABASE_URL=postgresql://rotamoto_e2e_app@127.0.0.1:5432/rotamoto_e2e ROTAMOTO_E2E_SECRET_STORE_DIRECTORY="$HOME/rotamoto-data/e2e/identity/keystore" ROTAMOTO_E2E_SECRET_MASTER_KEY_FILE="$HOME/rotamoto-data/e2e/identity/keys/master.key" node scripts/initialize-e2e-secret-store.js --confirm-e2e-secret-store=0243
```

Digite a confirmação solicitada diretamente no Termux. O processo cria diretório `0700` e arquivo de chave `0600`, recusa caminhos inválidos e não substitui arquivos existentes. Depois, acrescente ao ambiente privado do serviço `rotamoto-api-e2e` as três variáveis `ROTAMOTO_E2E_CAMPAIGN=0243`, `ROTAMOTO_E2E_SECRET_STORE_DIRECTORY=$HOME/rotamoto-data/e2e/identity/keystore` e `ROTAMOTO_E2E_SECRET_MASTER_KEY_FILE=$HOME/rotamoto-data/e2e/identity/keys/master.key`; reinicie somente esse serviço e confirme readiness. Não coloque variáveis do keystore E2E no serviço oficial.

4. Execute o CLI abaixo em um TTY local. O operador informa empresa e email de teste; a confirmação e senha são lidas interativamente. A senha não aparece na tela. Convite é capturado somente em memória, sem Gmail/SMTP. Use os dados E2E autorizados para esta campanha:

```sh
env NODE_ENV=test ROTAMOTO_E2E_CAMPAIGN=0243 ROTAMOTO_E2E_RUNTIME_ROLE=rotamoto_e2e_app E2E_RUNTIME_DATABASE_URL=postgresql://rotamoto_e2e_app@127.0.0.1:5432/rotamoto_e2e ROTAMOTO_E2E_SECRET_STORE_DIRECTORY="$HOME/rotamoto-data/e2e/identity/keystore" ROTAMOTO_E2E_SECRET_MASTER_KEY_FILE="$HOME/rotamoto-data/e2e/identity/keys/master.key" node scripts/bootstrap-owner-e2e.js --confirm-environment=e2e --confirm-database=rotamoto_e2e
```

Não copie a senha para este chat, logs, terminal command line, screenshots ou histórico do shell. O programa rejeita segundo Bootstrap e dados preexistentes. O schema de identidade atual não possui campo de nome pessoal nem o serviço de provisionamento aceita nome do proprietário: o nome informado pelo operador não será persistido. A campanha deve registrar essa limitação; não invente uma coluna nem altere migrations sem revisão própria.

## 8. Bootstrap oficial de produção

Pré-condições: banco `rotamoto`, migrations exigidas pelo build aplicadas/revisadas, keystore válido, segredo SMTP armazenado por referência, auditoria privada configurada, SMTP TLS verificado, domínio HTTPS definitivo, backup recente testado e autorização explícita do operador. O comando real existente é:

```sh
cd ~/projetos/repos/rota-moto-restaurante
node scripts/bootstrap-owner.js --confirm-database=rotamoto
```

O script recusa `NODE_ENV=test`, aceita somente `rotamoto_app` em `rotamoto`, exige TTY, empresa/email e confirmação textual. Ele não é para E2E. O convite real envia um link de ativação ao proprietário; só o execute após confirmar empresa, endereço e envio. Não inclua senha em `DATABASE_URL` ou argumentos.

## 9. Ativação, senha, MFA e login

No fluxo oficial, o proprietário usa o link de uso único entregue por email, confirma o endereço, define sua senha e entra pela interface. Na primeira sessão administrativa, faz enrollment TOTP, confirma um código atual, guarda os códigos de recuperação em local privado e encerra a sessão. Em seguida, faz novo login com senha e segundo fator. Nunca publique QR, segredo TOTP ou códigos de recuperação.

No fluxo E2E 0243, o CLI consome a capacidade de convite pelo serviço de identidade e chama `consumeOwnerInvitation` com senha oculta; ele não envia email. MFA é depois enrolado no app usando o keystore E2E persistente. Login/logout e segundo fator precisam ser comprovados na interface antes de declarar a instalação funcional.

## 10. Configuração do Restaurante e Motoboy

Entre no Restaurante pela origem do ambiente correto. Confira empresa, fuso horário, telefone operacional e localização somente com dados confirmados; nenhum CNPJ, conta bancária ou marketplace é requerido para o primeiro acesso. Cadastre motoboy fictício em E2E pelo fluxo administrativo do Restaurante, atribua-o à membership quando a autenticação individual for necessária, crie pedido fictício e faça a atribuição/despacho. No Motoboy, aceite, marque retirada, avance a execução e finalize; no Restaurante confirme os estados canônicos após sync.

O contrato compartilhado `CONTRACT.md` é a autoridade: Restaurante controla pedido, atribuição e rota; Motoboy controla fatos de execução, localização e prova; eventos usam `eventId` idempotente e a API valida tenant/ownership. Não conecte iFood, 99Food, Keeta nem outro provedor real em homologação.

## 11. Verificações SQL somente leitura

Conecte por socket/loopback com `psql -X -w` e a role autorizada, sem senha na linha de comando. Confira identidade da sessão:

```sql
SELECT current_database(), current_user, session_user, inet_server_addr();
```

Para inspecionar migrações, use o comando `migrate.js status` acima com `rotamoto_migrator`. A role de runtime pode não ter SELECT no ledger. Para Bootstrap, um operador de leitura autorizado deve confirmar contagens de `rotamoto.companies`, `rotamoto.users`, `rotamoto.provisioning_requests` e `rotamoto.installation_bootstrap`; não contorne RLS nem eleve a role para superuser. Após instalação, confirme `completed_at` preenchido, usuários/empresa esperados e credenciais MFA ativadas, sem selecionar tokens, hashes ou segredos.

## 12. Diagnóstico

- `E2E_BOOTSTRAP_TARGET_INVALID` ou `IDENTITY_MISMATCH`: pare; confira `NODE_ENV`, campanha, host, base, role e sessão. Não troque a URL para apontar a outro banco.
- `BOOTSTRAP_ALREADY_INITIALIZED` ou `E2E_NOT_EMPTY`: não repita nem resete; preserve banco e investigue provisionamento existente.
- `E2E_SECRET_STORE_CONFIGURATION_INVALID`: valide paths absolutos, loopback, owner e permissões; não imprima chave.
- Keystore ausente no startup: serviço E2E não está pronto para MFA; habilite somente o serviço E2E e confirme `health/ready`.
- Senhas divergentes ou inválidas: reexecute só se nenhum Bootstrap foi concluído; a CLI não grava senha quando a validação falha.
- Email oficial falhou: preserve `operationKey` e estado, corrija SMTP/HTTPS e siga o procedimento de retry documentado; nunca envie um segundo convite sem análise.
- 401/403, CSRF ou MFA: verifique origem, cookies, sessão, relógio TOTP e role; não desative as proteções.

## 13. Interromper instalação incompleta

Use Ctrl+C nos prompts antes do commit da operação. Em erro SQL, a transação em andamento sofre rollback e a CLI fecha o pool. Se o provisionamento foi commitado mas entrega/ativação falhou, não apague empresa ou latch nem execute reset. Pare a API E2E se necessário, preserve auditoria e backups, diagnostique com leitura e recupere em base descartável antes de decidir qualquer reparo. Produção requer runbook de restore e aprovação de mudança; nunca restaure sobre a base ativa para “tentar de novo”.

## 14. Confirmar se já foi instalado

Combine leitura do singleton `rotamoto.installation_bootstrap`, existência de empresa/usuário e registros de provisionamento. `completed_at` e `request_digest` preenchidos, empresa/usuário existentes ou convite pendente significam que não se deve executar Bootstrap de primeira instalação. O executor E2E faz essas verificações antes de gravar e recusa uma segunda execução. Não conclua instalação apenas pela resposta HTTP; valide ativação, MFA, login, sessão e um ciclo de reinício dos serviços.

## 15. Primeiro acesso e suporte

Endereços locais do perfil atual: Restaurante oficial `http://127.0.0.1:8081`, Motoboy oficial `http://127.0.0.1:8082`, Restaurante E2E `http://127.0.0.1:8083`, Motoboy E2E `http://127.0.0.1:8084`. O painel administrativo de Bootstrap em produção não é iniciado por este guia sem autorização e HTTPS. A API 8787/8788 não deve ser acessada diretamente por redes externas.
