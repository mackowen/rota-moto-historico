# Browser QA e infraestrutura

**T2-11 — PASS para smoke/componentes; PARTIAL para QA de produto autenticado.** Chromium `155.0.8059.79`, `aarch64` arm64. Foi iniciado com `--headless=new --no-sandbox --disable-dev-shm-usage --disable-gpu --use-gl=swiftshader --enable-unsafe-swiftshader --disable-features=Vulkan --no-first-run --no-default-browser-check --remote-debugging-port=0`, em diretório temporário isolado. CDP foi aberto na porta efêmera (smoke 43367; harness 38599). Smoke público em 320×700 e 390×844 teve innerWidth/documentWidth iguais e CDP estável. O lote 10 combinações tema/viewport e estados vazio/preenchido do harness passou; capturas ficaram em `IMAGENS/`.

`stderr` apresentou avisos não fatais de DBus/NetworkManager próprios do ambiente Android; não ocorreu `GPU process isn't usable`. Chromium foi encerrado ao final de cada execução; nenhum perfil/cookie foi removido. `/proc/meminfo` reportava cerca de 3,5 GB disponíveis no diagnóstico.

Perfil `qa-profile`: há `SingletonLock`, `SingletonSocket` e `SingletonCookie` preexistentes; `/json/version` na porta 9222 não respondeu e nenhum processo Chromium controlado pela tarefa ofereceu essa sessão. Para não abrir um perfil possivelmente ativo ou ler cookies, não foi reutilizado. Nenhum login/401 foi tentado nesta parte.

**T2-12 — BLOCKED.** Browser QA autenticado não está disponível por sessão/CDP persistente ausente. Não houve extração de credenciais/cookies, MFA falsificado, impersonação ou alteração de RBAC. O smoke e o harness são componentes anônimos, não prova de telas protegidas.
