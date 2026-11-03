# Bootstrap: autorização local e orientação da etapa 2 — 2026-11-03

**Resultado da correção: PASS.** A instalação real continua intencionalmente pendente do proprietário. Nenhuma empresa, usuário, fundador, autorização ou configuração foi gravada nos bancos persistentes nesta execução.

## Diagnóstico e correções

- O emissor `scripts/prepare-browser-bootstrap.js` existia, mas o Bootstrap não mostrava seu comando nem explicava o escopo do token e como recuperá-lo após expiração.
- O digest que o CLI persistia era calculado sobre os 32 bytes aleatórios; a API valida o SHA-256 da representação Base64URL enviada no cabeçalho. Assim, tokens recém-emitidos não correspondiam ao ledger e eram recusados. Agora o CLI persiste o digest da representação exata que o endpoint valida, mantendo 256 bits de entropia e sem armazenar o valor bruto.
- O emissor exigia TTY e banco correto, mas não verificava o runtime Android/Termux nem recusava indicadores de sessão SSH. O CLI agora exige plataforma Android, versão/prefixo Termux reconhecidos, TTY local, sem os indicadores comuns de SSH, confirmação textual e alvo configurado `rotamoto`/`rotamoto_app`. Também verifica o keystore, o estado canônico inicial e ausência de autorização ativa, sob lock transacional.
- A emissão não é endpoint web: navegador anônimo/remoto não consegue criar autorizações. API continua exigindo peer e origem loopback, token temporário, digest/escopo corretos, expiração e consumo atômico. Uma autorização ativa impede a emissão de outra. A primeira instalação concluída/latch reservado bloqueia nova emissão.
- A etapa Diagnóstico agora separa requisitos obrigatórios de avisos/opções e explica SMTP pendente, URL HTTPS para convites, loopback, LAN e acesso público. A etapa Administrador tem orientação recolhível, comando oficial copiável, validade/uso único e mensagens de recuperação. E-mail e autorização continuam fora do rascunho persistente do browser.

## Garantias e limites

O ledger guarda apenas SHA-256, escopo da instalação, datas de expiração e consumo. O token tem validade de 10 minutos; a API consome a autorização dentro da transação protegida pelo latch. A operação está vinculada à sessão/keystore e identidade de banco local, não apenas ao endereço loopback. O processo registra apenas auditoria sanitizada, sem token, e imprime o valor uma vez no TTY para colagem direta.

Os indicadores de runtime/SSH são gates de ambiente e não atestação criptográfica contra outro processo sob o mesmo UID. O limite de confiança continua sendo o usuário local do Android/Termux com acesso ao perfil e keystore. Um dispositivo ou UID comprometido exige resposta administrativa. Tokens são distintos: autorização do operador (10 minutos) e link do titular (uso único, 24 horas no fluxo local).

## Bancos e serviços persistentes

Consultas SQL somente leitura após os testes:

| Banco | Migrations | IDs 0067–0070 com checksum SHA-256 presente | Empresas | Usuários | Grants founder ativos | Latches de instalação/fundador | RBAC `permissions` | Tabelas RLS / FORCE RLS | Autorizações ativas |
|---|---:|---:|---:|---:|---:|---|---:|---:|---:|
| `rotamoto` | 70 | 4 exatas verificadas contra o registry | 0 | 0 | 0 | inicial / livre | 10 | 43 / 43 | 0 |
| `rotamoto_e2e` | 70 | 4 exatas verificadas contra o registry | 0 | 0 | 0 | inicial / livre | 10 | 43 / 43 | 0 |

Nenhuma migration foi criada/reaplicada. Em ambos, API `/api/identity/bootstrap/status` respondeu `state=ready`, `/health/ready` respondeu `ready`. Para o oficial, `localOnlyBootstrapAvailable=true`; para E2E, `false`. Ambos indicam SMTP e entrega de convites pendentes. A página publicada `http://127.0.0.1:8083/bootstrap.html` respondeu HTTP 200. Nenhum serviço foi reiniciado.

## Testes e Browser QA

- `npm test` — PASS (suíte integral do Restaurante).
- `npm run test:smtp-bootstrap` — PASS (regressão de modo local, SMTP, autorização, rate limit e isolamento).
- `node tests/test-browser-bootstrap-cli.js` — PASS: comando npm aponta para o CLI de alvo exato; não interativo/Linux/SSH/prefixo inválido/DB E2E são recusados; helper recusa status indisponível; token tem formato e digest compatíveis; valor bruto não vai ao SQL.
- `npm run test:bootstrap-local-only-disposable` — PASS em cluster PostgreSQL descartável. O ensaio executou duas vezes concorrentemente o comando real `npm run bootstrap:prepare-browser` em pseudo-terminais Termux, aceitou a confirmação, testou keystore temporário e persistiu somente o digest; exatamente um emissor venceu e o outro recebeu `BOOTSTRAP_AUTHORIZATION_EXISTS`. O token emitido pela CLI passou pelo endpoint de provisionamento no mesmo banco descartável. Após expiração, outra emissão local foi aceita; token inválido/expirado foram recusados; consumo e bloqueio de replay foram confirmados; o CLI recusou nova emissão após latch concluído. Fluxo sintético de senha/TOTP/MFA e latch fundador concluiu apenas no cluster descartável, encerrado ao final. A rotina de emissão ficou privada ao CLI e não é exportada como helper de aplicação.
- Chromium/CDP contra o instalador publicado: 20 capturas (Diagnóstico e Administrador fundador × claro/escuro × 320×720, 390×844, 430×932, 768×1024 e 1440×900), mais captura da orientação expandida. Sem erros JavaScript/HTTP ou overflow. Botão copia o comando (clipboard interceptado pelo teste); campos mantêm estado ao navegar; autorização fica em memória e ausente do `sessionStorage`; nenhum POST de provisionamento foi feito pelo navegador.
- Execução física do Chrome Android não foi realizada. As capturas usam Chromium headless com emulação de viewport; elas não atestam recortes/safe areas nem teclado físico/virtual de um aparelho específico.

Ver [browser-qa.json](browser-qa.json), exemplo compacto [Diagnóstico claro](diagnostic-compact-light.png), [Administrador claro](administrator-compact-light.png), instruções abertas [no celular](administrator-phone-light-instructions-open.png), e comparação antes [da orientação](../bootstrap-ux-audit-2026-11-03/02-phone-compact-light.png). Os demais arquivos PNG cobrem a matriz toda.

Commits locais Restaurante: `9a33f97d66a860f421781a593ca9e335523539a4` (`fix(bootstrap): align local authorization and operator guidance`) e `11cd7feb5441aed817f8466c6f94a001db15ff1a` (`test(bootstrap): exercise operator CLI issuance in PTY`), sem push do aplicativo. A rotina privada de emissão não é exportada. O Motoboy não foi alterado.

O teste browser usou o servidor 8083 e endpoints reais somente em leitura; status/readiness continuaram ready. Tokens e credenciais não aparecem nas evidências. O ensaio integrado gerou um token em memória no processo de teste; o teste confirmou que auditoria e banco persistiram apenas o digest. O cluster e keystore sintéticos temporários foram removidos.

## Classificação

**PASS para a correção e validação técnica desta entrega.** O Bootstrap oficial continua não instalado, sem dados e pronto para o proprietário. O procedimento físico final é do titular e ainda não foi executado; não faz parte dos testes desta mudança.
