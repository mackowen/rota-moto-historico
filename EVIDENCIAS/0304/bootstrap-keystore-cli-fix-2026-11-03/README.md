# Correção `BOOTSTRAP_KEYSTORE_UNAVAILABLE` — 2026-11-03

## Resultado

**PASS técnico.** Corrigido o caminho de configuração do emissor local. Nenhum token real foi emitido, nenhuma instalação foi iniciada, nenhum dado oficial foi escrito e nenhuma chave real foi criada, alterada, apagada ou rotacionada.

## Causa raiz

`npm run bootstrap:prepare-browser` executava `scripts/prepare-browser-bootstrap.js`, que carregava `loadRuntimeConfig()` do contexto HTTP. Em desenvolvimento esse contexto não expõe os paths privados do keystore. O emissor, então, consultava somente `ROTAMOTO_SECRET_STORE_DIRECTORY` e `ROTAMOTO_SECRET_MASTER_KEY_FILE` no ambiente interativo; ambos estavam ausentes, e o provider retornava `null` antes do teste criptográfico.

O serviço HTTP supervisionado recebe um ambiente sanitizado por allowlist e não herda paths/segredos do operador. A configuração privada de operador, disponível ao CLI local, resolve o keystore já provisionado sem exigir exports no shell. A master key original estava íntegra; os metadados e o teste criptográfico abaixo confirmaram isso.

## Correção e segurança

O CLI usa `loadOperatorRuntimeConfig()` e passa seus paths/configuração de provider a `loadConfiguredSecretProvider()`. O provider externo continua sendo suportado. Os gates de Termux local, TTY, recusa de SSH, confirmação explícita, alvo SQL exato, estado Bootstrap, autorização de uso único e expiração foram mantidos.

Teste de regressão isolado criou um keystore exclusivamente temporário com chave sintética, armazenou um segredo sintético, executou canário AES-GCM de gravação/leitura/remoção e confirmou que o segredo preexistente continuou legível. O diretório temporário foi descartado após o teste.

## Verificação sanitizada do keystore existente

- Variáveis de path não estavam exportadas no shell interativo: `false`.
- UID do processo e do keystore: coincidentes (`10436`).
- Diretório: owner correto, modo `0700`.
- Master key: owner correto, modo `0600`, tamanho `32` bytes.
- Provider local: `filesystem-keystore-v1`, estado `verified`.
- Canary de round-trip e remoção: passou.
- Referência SMTP já configurada: decifrada com sucesso em memória; conteúdo, referência e tamanho não foram registrados.
- Nenhuma chave foi inicializada ou modificada; somente o arquivo temporário do canário foi criado e removido.

## Banco oficial e serviços

O banco oficial foi consultado em modo somente leitura com `rotamoto_app`. O SQL canônico `rotamoto.platform_admin_bootstrap_status()` retornou `ready`; APIs `/health/ready` e `/api/identity/bootstrap/status` responderam HTTP 200 e `ready`. O status sanitizado informa MFA keystore configurado, transporte SMTP configurado e entrega externa indisponível até existir URL HTTPS pública. Uma tentativa de consultar diretamente `schema_migrations` com `rotamoto_app` foi negada por privilégio; o endpoint reporta migrations prontas. Nenhuma query de escrita foi emitida.

## Testes

- `node tests/test-browser-bootstrap-cli.js` — PASS.
- `node tests/test-operator-runtime-config.js` — PASS.
- `node tests/test-bootstrap-setup.js` — PASS.
- `node tests/test-bootstrap-status-http.js` — PASS.
- `npm run test:bootstrap-local-only-disposable` — PASS em PostgreSQL descartável; CLI em PTY, emissão sintética, handoff, senha, MFA e latch passaram; cluster descartado.
- `npm run operator` — keystore `verified`.
- `git diff --check` — PASS.

## Arquivos e commits

Restaurante alterado: `scripts/prepare-browser-bootstrap.js`, `tests/test-browser-bootstrap-cli.js` e `docs/operations/BOOTSTRAP-AUTORIZACAO-LOCAL.md`.

Commit local do Restaurante: `feb593e7eca16ded738e2748941a2701218d8803` (`fix(bootstrap): load keystore from operator config`), branch `codex/campaign-0304-browser-bootstrap`; sem push do Restaurante. Este relatório será publicado somente no repositório `rota-moto-historico`.

## Próxima ação do operador

No Termux local, execute no checkout Restaurante:

```sh
cd "$HOME/projetos/repos/rota-moto-restaurante" && npm run bootstrap:prepare-browser
```

Este comando executa o fluxo real e emitirá uma autorização somente depois da confirmação interativa e dos gates oficiais. O proprietário deve manter o token fora de logs/mensagens e inseri-lo apenas na página local de primeira instalação.

Campanha 0304 continua aberta; G14 permanece FAIL; backlog anterior preservado; Campanha 0305 não iniciada.
