# `BOOTSTRAP_PREPARATION_FAILED` — correção da emissão local

## Classificação

**PASS técnico e de regressão.** Causa raiz identificada e corrigida; a emissão real pelo operador não foi repetida por segurança. Nenhum token real foi emitido durante este diagnóstico, nenhuma instalação foi iniciada e nenhum dado/migration/role/policy do banco oficial foi alterado.

## Causa raiz comprovada

O commit anterior `feb593e7eca16ded738e2748941a2701218d8803` estava presente no checkout executado e já carregava `loadOperatorRuntimeConfig()`. A configuração resolvia corretamente `config.operatorAudit.file` e `config.operatorAudit.actorRef`; o arquivo de auditoria existia, era regular, do UID do Termux, modo `0600` e link único. As variáveis `ROTAMOTO_OPERATOR_AUDIT_LOG` e `ROTAMOTO_OPERATOR_ACTOR_REF` não estavam no shell, como esperado para o operador privado.

Depois de inserir o digest de uso único e confirmar `COMMIT`, o CLI chamava `appendOperatorAudit()` sem passar `config.operatorAudit`. Esse helper exige as variáveis do ambiente quando não recebe opções; lançava `OPERATOR_AUDIT_CONFIGURATION_REQUIRED`. Como o código só classificava alguns códigos conhecidos, o erro terminava como `BOOTSTRAP_PREPARATION_FAILED`. A exceção ocorria após o commit, então o caminho fail-closed do CLI tentava consumir a autorização antes de devolver o erro. A leitura oficial encontrou exatamente 1 registro histórico consumido e 0 ativos, consistente com a execução reportada. Nenhum registro novo foi criado durante esta investigação.

## Correção

O CLI passa agora a configuração privada `config.operatorAudit` para o helper, sem depender de export no shell. Falhas da auditoria retornam `BOOTSTRAP_AUDIT_UNAVAILABLE`; se a confirmação do consumo seguro também falhar, o CLI retorna `BOOTSTRAP_AUTHORIZATION_CLEANUP_FAILED` e orienta aguardar a expiração. O classificador percorre causas encadeadas para keystore, configuração de operador, conexão/permissão/schema/lock PostgreSQL e conflito, mas imprime apenas um código e mensagem segura. Nenhuma causa, mensagem técnica, token, senha, chave ou URL é incluída na saída.

O contrato de autorização não mudou: Termux local, TTY, confirmação explícita, identidade SQL exata, lock, Bootstrap inicial, digest no banco, validade curta, consumo de uso único, MFA, RLS/RBAC e latch permanecem intactos.

## Reprodução e validação

O E2E descartável agora inicia o CLI sem as duas variáveis de auditoria, com a configuração padrão de operador isolada. O fluxo normal emite token sintético utilizável pelo verificador e grava auditoria sem revelar o token. Um cenário controlado sem diretório de auditoria reproduz falha após `COMMIT`: CLI retorna `BOOTSTRAP_AUDIT_UNAVAILABLE`, não imprime token e deixa zero autorizações ativas. Depois desse cancelamento, nova emissão sintética passa. O restante do cenário conclui handoff local, senha, TOTP/MFA, concorrência e latch em PostgreSQL descartável, que é descartado ao final.

Testes PASS:

- `node tests/test-browser-bootstrap-cli.js`
- `node tests/test-operator-runtime-config.js`
- `node tests/test-bootstrap-setup.js`
- `node tests/test-bootstrap-status-http.js`
- `node tests/test-identity-crypto.js`
- `npm run test:bootstrap-local-only-disposable`
- `npm run test:smtp-bootstrap`
- `git diff --check`

## Banco e serviços oficiais

Consultas SQL somente dentro de `BEGIN READ ONLY`/`ROLLBACK`, papel `rotamoto_app`, banco `rotamoto`: status canônico `ready`; 1 registro de autorização, 1 consumido e 0 ativos. Não foram lidos digests. API oficial `/health/ready` e `/api/identity/bootstrap/status`: HTTP 200/`ready`. Bootstrap não inicializado; status reporta `localOnlyBootstrapAvailable=true`. SMTP e entrega externa seguem como estados separados e não são dependência da emissão da autorização local.

O ledger de migrations não é legível pelo papel `rotamoto_app`; a API reportou `databaseAndMigrations=true`. Não houve aplicação/alteração de migration, permissão, grant, RLS ou role.

## Commits e próxima ação

Commits locais do Restaurante: `850c0e032f1c037fb13d9253b88a51088da34875` (`fix(bootstrap): pass private audit config during issuance`) e `631c5628392a7bcb8da31c38c48293754d6922c1` (`test(bootstrap): assert failed CLI never prints token`), branch `codex/campaign-0304-browser-bootstrap`; sem push do aplicativo. Este histórico será o único repositório publicado.

Após revisão desta correção, o proprietário pode executar no Termux local:

```sh
cd "$HOME/projetos/repos/rota-moto-restaurante" && npm run bootstrap:prepare-browser
```

O CLI pedirá a confirmação local antes de emitir. Não execute o comando em automação/pipe nem compartilhe o token exibido.

Campanha 0304 permanece aberta; G14 FAIL e backlog anterior preservados; 0305 não iniciada.
