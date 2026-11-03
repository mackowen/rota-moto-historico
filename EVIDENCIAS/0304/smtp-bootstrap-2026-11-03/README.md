# Bootstrap SMTP — evidências (2026-11-03)

**Classificação: PARTIAL.** A etapa SMTP está disponível no Bootstrap e em Ajustes, a credencial Gmail protegida existente foi reutilizada sem revelar nem rotacionar a chave, os testes de autorização/cifra/replay/RLS passaram e o SMTP externo aceitou uma mensagem de teste. A entrega na caixa postal não foi confirmada. O transporte ainda não está habilitado para convites porque falta a URL HTTPS pública que será gravada nos links enviados.

## Alterações

- Bootstrap: etapa “E-mail e notificações” antes da revisão, seleção Gmail/Microsoft 365/SMTP personalizado, TLS obrigatório, validação, envio real de teste, feedback de envio aceito versus entrega desconhecida e reutilização explicitamente opt-in da credencial cifrada existente. A senha e o rascunho SMTP não são persistidos no navegador.
- Backend: validação de DNS/host, pinning IPv4 público para bloquear SSRF, timeout TLS 1.2+, limites por IP e persistentemente por autorização/administrador, request ID contra replay, erros sanitizados e logs sem credenciais. Estado pré-login é acessível apenas com proof local temporário. Ajustes exige sessão, permissão, grant fundador ativo, MFA verificado, same-origin e CSRF.
- Persistência: metadados em arquivo privado atômico `0600`; credencial permanece no keystore oficial AES-GCM, externo ao banco/repositório. Reutilizar segredo existente fica limitado ao host/porta/TLS/remetente previamente aprovados. Desativação grava tombstone, impedindo fallback silencioso para SMTP legado.
- Convites: o serviço configurado passa a fornecer o transporte dinâmico usado pelo provider real de convites, verificação e recuperação. OAuth permanece indisponível sem simulação.
- Migration 0069 adiciona somente os registros de replay SMTP, com RLS + FORCE RLS, acesso apenas por funções SECURITY DEFINER com identidade/database exatos. Migrations 0067/0068 não foram reaplicadas nem modificadas; 0069 tem `up/down` e checksums iguais nos dois ledgers.

## Verificações

- PostgreSQL: bancos exatos `rotamoto` e `rotamoto_e2e`, ambos com 0067–0069 e checksums correspondentes em [`database-verification.json`](database-verification.json). Antes/depois dos testes: 0 empresas, 0 usuários, 0 grants fundadores ativos e 0 tentativas persistidas; founder/installation latches permanecem livres; catálogo `permissions` = 10 linhas. Tabelas de replay têm RLS e FORCE RLS, sem leitura direta pelos papéis de aplicação. O ensaio de concorrência disparou oito chamadas oficiais simultâneas e aceitou exatamente cinco; E2E foi recusado para a autoridade SMTP oficial. Dados transitórios de autorização e replay foram removidos após o teste.
- SMTP externo autorizado: a configuração Gmail existente passou conexão/TLS/autenticação; o servidor SMTP aceitou o envio de teste ao endereço remetente previamente configurado. **Entrega à caixa de entrada não confirmada.** Nenhuma URL de convite foi inventada e nenhuma configuração SMTP final foi persistida antes dessa URL.
- Transporte de captura local: `tests/test-smtp-mail-provider.js` enviou mensagens sintéticas de convite/recuperação somente ao servidor SMTP de captura loopback. Não houve destinatário externo neste teste.
- Segurança/falhas: validação de TLS/host, redes privadas, cabeçalho, remetente, autenticação, timeout, destinatário recusado, replay, concorrência, expiração, origem não local, resposta sanitizada, cifragem, reutilização sem rotação e desativação foram exercitados.
- HTTP atual: API oficial 8788 e E2E 8787 reportam `state=ready`; readiness oficial está pronta; `bootstrap.html` em 8083 retorna 200 e contém o instalador, com CSS/JS 200. Rota SMTP anônima oficial responde 403; rota SMTP E2E responde 404.
- Browser QA/CDP Chromium percorreu os campos SMTP sem enviar formulário: 390×844, 768×1024 e 1440×900 em claro/escuro; seis capturas nesta pasta. Reutilização de credencial e destinatário remetente de teste foram representados com fixture sintética `.invalid`, sem autorização real. Zero overflow, erro JS ou HTTP inesperado; senha desabilitada no modo reutilização; botão de avançar ficou bloqueado; zero POST de instalação.

## Testes executados

- `npm run test:smtp-bootstrap` — unitário, HTTP, captura local e alvo de migrations.
- `NODE_ENV=production ... node tests/test-smtp-replay-postgres.js` — integração PostgreSQL oficial/E2E, concorrência, privilégios, isolamento, FORCE RLS e limpeza do token transitório.
- Regressão de convites e admin: `test-admin-membership-invitations.js`, `test-platform-admin-ui.js`, `test-platform-admin-http.js`, `test-identity-ui.js`.
- Configuração runtime, assets, Browser QA e `git diff --check`.
- Suíte integral Restaurante `npm test` — PASS; o comando chegou ao último teste, `test-motoboys-v2-view.js`, sem falha.

## Commits e publicação

- Restaurante, commit local sem push: `f3b79ca54cd8923d4949e0ad3e8294f1887f3068` (`feat(restaurante): add protected SMTP bootstrap setup`).
- Histórico: as evidências desta execução são publicadas exclusivamente no repositório `mackowen/rota-moto-historico`.

## Intervenção pendente do proprietário

A configuração privada existente já fornece host, remetente e credencial cifrada; a etapa os oferece para reutilização sem mostrar a senha. A única dependência de entrega que falta é a URL pública HTTPS sob a qual os destinatários abrirão os convites. A tela sugere como destinatário do teste o próprio remetente já verificado. O proprietário deverá informar a URL real, revisar os dados iniciais, pressionar **Testar e-mail** no Bootstrap e confirmar no Gmail a mensagem recebida; o SMTP pode confirmar apenas que aceitou o envio. A instalação não foi iniciada nem concluída, e nenhum fundador/empresa/usuário foi criado.

Campanha 0304 permanece aberta; G14 e demais pendências visuais/backlog continuam como estavam; 0305 não foi iniciada.
