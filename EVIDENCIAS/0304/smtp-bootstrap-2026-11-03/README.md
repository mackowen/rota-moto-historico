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

## Modo local-only do Bootstrap — aditivo (2026-11-03)

**PARTIAL.** A primeira instalação agora pode começar localmente sem domínio público. O backend habilita esse modo somente no serviço oficial, com banco `rotamoto`, socket peer loopback real e validação de Host/Origin local; cabeçalhos encaminhados não concedem confiança. O serviço `rotamoto_e2e` não recebe essa autorização. O nginx ativo foi inspecionado: `127.0.0.1:8083`, document root no checkout Restaurante e proxy oficial para `127.0.0.1:8788`.

SMTP e links de convite têm estados independentes. É possível validar, testar e persistir o transporte sem URL pública HTTPS. Sem URL HTTPS pública válida, envio de convites externos permanece bloqueado com mensagem explícita; filas/auditoria permanecem preservadas. O proprietário pode usar o handoff local de uso único para iniciar a ativação do titular na mesma máquina; senha e MFA obrigatória continuam no fluxo normal. O modo público poderá ser habilitado depois configurando a URL HTTPS sem reinstalar/resetar o banco.

A execução integral sintética passou em PostgreSQL descartável, isolado e destruído após o teste: prova temporária local, negação de prova ausente, handoff de convite de uso único, senha, TOTP/MFA confirmado, grant fundador somente após MFA e latch atômico. Também cobriu instalação já reclamada, concorrência, RLS e isolamento; não houve escrita nos bancos operacionais e nenhum dado sintético foi enviado a SMTP externo. Testes `npm run test:bootstrap-local-only-disposable`, `npm run test:smtp-bootstrap`, suíte integral `npm test`, `assets:check` e `git diff --check` passaram. Browser QA na URL publicada: claro/escuro × 390/768/1440, 6/6 sem overflow/erros; modo local selecionado manteve o avanço acessível sem URL ou chamada de provisionamento. As capturas e relatório JSON desta pasta registram o resultado.

Migration adicional `0070_founder_mfa_audit_actor_kind` foi validada com up/down no banco descartável e aplicada pelos mecanismos oficiais a `rotamoto` e `rotamoto_e2e`. Corrige o constraint histórico incompatível com o ator `user` que a função de conclusão já grava somente após MFA; não altera grants, RLS, latch ou identidade. Checksums de 0067–0069 permanecem inalterados. Em ambos os bancos: migrations 0067–0070 presentes, 0 empresas, 0 usuários, 0 grants fundadores, latch fundador livre, catálogo RBAC com 10 registros, RLS/FORCE RLS preservados. Nenhuma instalação foi concluída em banco operacional.

Estado HTTP observado: Bootstrap 8083 = 200 com assets CSS/JS 200; status oficial 8788 = `ready` e `localOnlyBootstrapAvailable=true`; status E2E 8787 = `ready` e `localOnlyBootstrapAvailable=false`; readiness de ambos = 200. SMTP ainda não está configurado/persistido e entrega de convites está indisponível até o proprietário fornecer a URL HTTPS pública. Isso não impede o handoff local nem a leitura de estado inicial.

Commit local Restaurante: `4585a60a21ac57ee8613ac5c8339a15c41036d69` (`feat(restaurante): support loopback-only first install`), sem push do aplicativo. **Pendência operacional:** o proprietário deve preencher os dados reais e concluir pelo navegador local; nenhum fundador, empresa ou usuário foi criado. Campanha 0304 aberta, G14/backlog preservados e 0305 não iniciada.
