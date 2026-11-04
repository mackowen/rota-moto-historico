# Arquitetura do Bootstrap

## Estado e gates

`GET /api/identity/bootstrap/status` combina o estado do latch/status SQL com readiness de keystore e envio. Os estados aceitos são `ready`, `pending_owner_activation`, `pending_owner_mfa`, `complete`, `unavailable` e `not_ready`. `complete` e `unavailable` não renderizam formulário de instalação. “Sem empresas” não é condição suficiente: status também verifica founder latch, administradores, usuários, solicitações e conclusão anterior.

## Fluxo

1. O proprietário/operador abre a página pública. O assistente verifica health, migrations, keystore e configuração de e-mail.
2. O operador local executa `npm run bootstrap:prepare-browser` em terminal interativo, confirma literalmente o alvo `rotamoto`, e recebe autorização aleatória única, curta e não armazenada em arquivo.
3. O navegador envia a autorização uma vez junto ao convite do proprietário e configurações iniciais. A API exige o Origin permitido; o serviço de autorização também exige peer/Origin loopback. A autorização é limitada por rate limiter.
4. Uma transação consome a autorização, bloqueia o latch, grava empresa, role de proprietário, permissões canônicas, convite, setup canônico e digest idempotente. Há readback dentro da transação e nova leitura após commit em conexão/transação nova antes de enviar convite.
5. A entrega é tentada pelo provider existente; `sent` significa aceito pelo provider, não prova entrega na caixa de entrada. O retry usa a mesma chave e não duplica empresa.
6. O titular aceita o convite pelo fluxo existente, define a senha, autentica e confirma o TOTP. Somente nessa transação o backend verifica associação/conta ativa, e-mail verificado e segredo MFA confirmado, cria o grant `founder_bootstrap`, atualiza latch como concluído e audita. O fundador atual do E2E nunca é usado por esse fluxo.

## Segredos e retomada

O token de instalação permanece somente na memória/entrada mascarada do navegador. O rascunho e chave idempotente em `sessionStorage` não incluem o token. Nenhum segredo é registrado. A autorização é digest-only no PostgreSQL; a checagem do keystore usa um canário temporário que é removido em `finally`. Falhas de SMTP mantêm o registro/reserva idempotentes e o mesmo navegador pode repetir usando a autorização em memória. Se o navegador for fechado antes da recuperação, a reemissão/retomada operacional da autorização ainda não possui fluxo dedicado; ver [pendências](PENDENCIAS.md).

O wrapper do keystore externo agora expõe `put`/`remove` apenas quando o módulo externo implementa explicitamente esses métodos; entrada, contexto, comprimento e referência são validados. Keystores somente leitura não passam o readiness para enrollment MFA. O endpoint também tenta ler a referência SMTP sem retornar nem registrar o valor, evitando um “Pronto” falso baseado apenas em strings de configuração.

## Concorrência, rollback e proteção

O runner migration 0067 altera os guards SQL para que instalação concluída exija digest, preserva o status de founder já existente como `unavailable`, requer MFA efetivo para conclusão e recusa rollback após reserva/founder/autorizações ativas. Provisionamento usa transação, advisory lock por chave, lock do latch, digest idempotente, expiração/consumo da autorização, tratamento de 409 e auditoria. A suíte não executou duas instalações reais concorrentes: não há banco de primeira instalação descartável autorizado/estado vazio neste turno.

Para compatibilidade, provisionamento de proprietário que não seja primeira instalação continua trabalhando em schema 0066 sem selecionar/inserir a coluna 0067. Um pedido com capability/`initialSetup` falha com `BOOTSTRAP_NOT_READY` antes de qualquer escrita se a coluna da migration não existir. Essa regressão foi descoberta pela integração PostgreSQL transacional e corrigida antes da suíte final.

O estado existente foi apenas lido; migration 0067 não foi aplicada a banco persistente, pois `rotamoto_e2e` contém founder/latch já concluídos e o `down` deliberadamente recusa rollback nesse estado. `rotamoto` permaneceu intocado. A próxima validação integral exige uma fixture reversível aprovada que respeite os guards; não se deve resetar o E2E atual para obtê-la.
