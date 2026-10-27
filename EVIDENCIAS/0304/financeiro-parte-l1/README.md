# Campanha 0304 — Parte L.1: configuração e validação do backup

Data: 2026-10-27 UTC. Resultado global: **BLOCKED — custódia da chave divergente**. Backup gerado e verificado tecnicamente; não autoriza migrations. G14 **FAIL**, 0304 aberta/PARTIAL, 0305 não iniciada.

## Inspeção e preservação

Lidos os registros/evidências J, K e L, estado, pendências e política Git. Código de referência Restaurante `4fcb095bae2f7f2803668207a488ccae391d20a6`; Motoboy `64d2e13d8e455f48b20b32b396e9c49ba7553e0b`; Browser QA `57cb7745828e24d50502bec89061d2ceb59e0200`; Histórico inicial `59246f4b63974cdc552cc762585a1a60a0afc8bb`.

HEADs, status e tags dos três primeiros comparados antes/depois e idênticos. Browser QA preservou suas 1027 linhas de status preexistente, sem edição; Histórico preservou `login-redesign-2026-10-25/` não rastreado. Nenhuma alteração de aplicativo, credential, grant ou baseline. Tag `v5.50-ui-mobile-fix5` preservada em `9ebb7098725200bdec82e79be1e9ea622fe20120`. Inspeção também leu status de Condoos incidentalmente; `.replit` preexistente não foi tocado.

Mecanismos reutilizados: `recovery-set.js`, `backup-runner.js`, `backup-inventory.js`, `operator-audit.js`, políticas de `backup-platform.js`/`backup-executor.js` e runbooks `BACKUP-RESTORE`, `POSTGRES-BACKUP-ROLES`, `RECOVERY-TERMUX-LINUX-0236`. Nenhuma implementação de produção alterada.

## Chave e descoberta em Downloads

A chave operacional identificada pelo registro 0154 estava disponível localmente, raw 32 bytes, arquivo regular 0600, UID do operador, um link. SHA-256 foi guardado somente em evidência privada e comparado novamente após a verificação: idêntico; inode/tamanho/modo preservados. Nenhuma chave foi gerada, substituída, impressa ou copiada. GCM autenticado comprova que a chave abre o artefato atual; metadados isolados não comprovariam isso.

Inicialmente a cópia externa foi tratada como confirmação do proprietário, sem comparação disponível. Depois de o proprietário indicar Downloads, encontrou-se `rotamoto-recovery-key-0138-2026-10-11.aesgcm`, envelope cifrado regular de 87 bytes, modo 0770 do armazenamento compartilhado Android, cabeçalho `RMK0138GCM` válido. SHA-256 do ciphertext confere exatamente com o hash histórico registrado em 0138. A recuperação desse envelope em 0138 foi **reportada pelo operador** como autenticada e igual à chave 0138; não foi repetida aqui.

O exporter privado existente associa esse envelope à chave local da campanha 0138. Comparação SHA-256 em memória entre a chave local 0138 e a chave 0154 usada neste backup: **diferentes**. Não se comparou ciphertext com plaintext. O envelope não foi aberto nesta rodada, pois depende de frase-senha interativa; portanto não se alega comparação atual do plaintext do envelope. A cópia indicada não comprova custódia externa da chave 0154. **BLOCKED** conservador pela divergência de associação/chaves locais. Operações de backup/restore foram interrompidas assim que isso foi identificado; não houve retry, troca de chave ou novo backup. Nenhuma frase-senha foi solicitada no chat.

## Configuração e pré-voo operacional

Execução `0304-l1-20261027T135218Z`. Configuração pontual em `runtime.env` 0600 fora dos quatro repositórios; não instalada como serviço, scheduler ou configuração da API. Destino novo, mídia separada e diretório de auditoria 0700; arquivos 0600. Diretório de mídia local existente privado, vazio; API oficial não fornecia `ROTAMOTO_MEDIA_DIRECTORY` no arquivo de runtime inspecionado. Não se afirma cobertura de órfãos ou de outro host. A captura consultou zero referências canônicas filesystem-v1 e verificou zero objetos no set.

Origem exata `rotamoto`, conexão loopback como `rotamoto_backup`, sem senha na URL, pgpass preexistente privado. Fonte operacional opt-in `true`, executor UID atual e flags Termux shared UID/risk acknowledgment configurados conforme mecanismo existente; política de executor retornou enabled/termux-shared-uid e source guard retornou true. Isso é a execução pontual solicitada pelo proprietário; não equivale a isolamento por UID dedicado. `NODE_ENV=production`. Auditoria usa identificador operacional sem PII e arquivo privado; nenhum segredo em arquivo versionado.

Pré-voo via conexão dedicada e `BEGIN READ ONLY`: PostgreSQL 18.6, identidade/target corretos; role LOGIN/BYPASSRLS, sem superuser/CREATEDB/CREATEROLE/REPLICATION. 51 tabelas de usuário verificadas com SELECT, zero sem leitura e zero com INSERT/UPDATE/DELETE/TRUNCATE para essa role. Ledger com 47 migrations, 47/47 IDs/checksums iguais ao código. Nenhuma permissão alterada para contornar falha. `PGOPTIONS` impôs default_transaction_read_only=on e lock_timeout=15s nos subprocessos PostgreSQL. O recovery set usa advisory lock coordenado e snapshot consistente do `pg_dump`.

## Execução e verificação reais

Chamado o mecanismo existente `createRecoverySet` com `prune:false`, preservando todos os backups. O wrapper de operação apenas passou a configuração e registrou auditoria; não substituiu `pg_dump` nem verificadores. A chamada terminou sem exceção/exit 0, aproximadamente 974 ms, e o próprio criador autenticou o dump e executou `pg_restore --list`. Nenhuma retenção ou publicação externa foi executada.

- Recovery set: `f96bb29f-b067-4b1c-8709-86e678b1b622`, instante `2026-10-27T13:52:59.477Z`.
- Dump cifrado: **346462 bytes**, SHA-256 `76aa433da699c4532da13e93b29030d6ebdd2fc78e3e45e337bf2f85a4003f1e`.
- Verificação posterior exit 0: `verifyRecoverySet`, HMAC dos manifestos, SHA-256/tamanho e inventário de componentes; zero incompletos, um VERIFIED. Verificação GCM do dump foi executada explicitamente em fluxo, pois `verifyArtifact` sozinho verifica hash/HMAC/envelope e não autentica todo o ciphertext do banco.
- Duas leituras autenticadas em memória: `pg_restore --list` e `pg_restore --no-owner --no-acl --file=/dev/null`, ambas exit 0, sem conexão de restauração. A segunda percorre também os dados comprimidos do arquivo; SQL foi descartado em `/dev/null`, sem criar banco ou executar SQL.
- TOC: 686 entradas, 51 TABLE DATA, 39 POLICY. 126 entradas relacionadas a TABLE incluem outros tipos de objeto e não representam 126 tabelas.
- Arquivos do set 0600; diretório e mídia 0700. Sem plaintext persistido pelo verificador suplementar. O criador existente usa um temporário 0600 para TOC e o remove ao terminar; não há promessa de apagamento físico em flash.
- Inventário de schema **STALE esperado**: captura 0001–0047, código 0001–0055; faltam exatamente 0048–0055, sem checksum divergente ou migration inesperada. Isso não é corrupção.

Detalhes sanitizados: [verification.json](verification.json). Nenhum dump, chave, envelope, URL, pgpass ou conteúdo de negócio foi adicionado ao histórico.

## Gates e requisitos restantes

| Gate | Resultado | Limite |
|---|---|---|
| Pré-voo/configuração/role dedicada | PASS | Somente leitura; flags existentes validadas; risco de UID compartilhado persiste. |
| Chave local: formato, acesso e integridade | PASS | 32 bytes/0600/owner/link; hash estável; abre o backup atual. |
| Envelope Downloads: metadados e hash histórico | PASS | Envelope cifrado 0138 intacto; não é comparação atual do plaintext. |
| Cópia externa da chave usada no backup | **BLOCKED** | Chave local associada ao envelope 0138 difere da chave 0154 usada; envelope não descriptografado nesta rodada. |
| Criação consistente e criptografada | PASS | Pipeline existente, snapshot/lock, prune false, exit 0. |
| Criptografia/hash/tamanho/inventário/estrutura | PASS | HMAC/GCM e leitura integral pg_restore; mídias canônicas 0. |
| Recuperabilidade ponta a ponta | **PARTIAL** | Falta custódia externa correspondente e restauração do set atual. |
| Gate para atualizar o banco | **BLOCKED / NO-GO** | Backup técnico isolado não libera promoção. |
| Migrations / E2E preservados | PASS | Nenhuma migration; nenhuma conexão ao rotamoto_e2e nesta parte. |
| Campanha/G14 | PARTIAL aberta / **FAIL** | 0305 não iniciada. |

Para retomar: identificar e validar por canal seguro uma cópia externa que corresponda à chave 0154 **ou** obter decisão explícita do proprietário sobre o uso futuro da chave 0138 já existente e sua custódia. Não alterar ou substituir chaves automaticamente. Se houver confirmação de envelope, autenticar/decriptar por terminal sem eco e comparar SHA-256 em memória, sem enviar passphrase ao chat. A comparação deve usar a chave do set exato.

O ensaio de restauração do set atual exigido pelo plano de promoção J/K continua pendente. Conforme orientação, nenhum banco foi criado, nenhum restore foi feito e os ensaios históricos/sintéticos não foram promovidos a prova deste set. Futuro ensaio depende de orientação do proprietário para destino isolado. Não executar migrations nesta parte nem considerar o arquivo gerado como autorização.

Artefato, configuração, auditoria, hashes privados da chave e marcador BLOCKED permanecem sob a execução privada em `~/rotamoto-data/maintenance/0304-l1-20261027T135218Z/` (set no subdiretório `sets/`). A falha inicial de coleta Git por ausência de tags em Browser QA foi corrigida sem tocar nesse repositório; diretório privado vazio dessa tentativa foi preservado. Nenhum erro de autenticação ou criptografia ocorreu. A divergência de custódia interrompeu a operação. Backlog desde 0257 preservado.

## Revisão de entrega

`git diff --check`, parse do JSON sanitizado, referências locais de L.1 e checagem de ausência do hash privado da chave nas evidências passaram. `node --check` em recovery-set, backup-runner e CLI do operador passou. Não se executou suíte que escreve fixtures: não houve alteração de código, interface ou schema. Validação aplicável foi o fluxo real de backup/verificação descrito acima.
