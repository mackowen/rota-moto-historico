## Atualização vigente — campanha 0291 — salvamento e persistência de configurações

**PARTIAL.** Sessão Browser autenticada comprovou UI de Route e Frota: ACK/readback/reload, draft e retry após falha 503, negativos 400/401/403/409 e viewport 360/390/768 claro/escuro sem overflow. Company foi escrita pelo helper API e somente sua projeção lida na UI; botão de salvar não foi provado. Não foram testados os outros ajustes editáveis, UI do timezone, nova sessão independente nem Motoboy; RM-AUD19-02/03/10 permanecem PARTIAL e sem PASS_GLOBAL. Pendências 0289 continuam. Registro e matriz funcional: [0291](REGISTROS/0291.md), [evidências](EVIDENCIAS/0291/). Fixture rollback e resíduos zero. 0258 BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL. Não iniciar 0292.

---

## Atualização histórica — campanha 0290 — salvamento e persistência de configurações

**PARTIAL.** A escrita de timezone da Company agora é revisionada e requer ACK + GET/readback; conflito/falha preserva rascunho. Cobertura de unidade/client e `npm test` Restaurante passaram. Inventário estático inicial em [matriz 0290](EVIDENCIAS/0290/matriz-configuracoes.md). Browser autenticado, navegação/reload/nova sessão, erros de rede/HTTP, retry real, matriz visual e consistência Empresa–Logística–Frota–Motoboy não foram executados. Manter RM-AUD19-02/03/10 PARTIAL, aliases e pendências 0289. Nenhum Motoboy alterado. Não iniciar 0291. Ver [REGISTRO 0290](REGISTROS/0290.md).

---

## Atualização vigente — campanha 0289 — distribuição de corridas e modal Motoboys

**PARTIAL.** RM-AUD22-21: correção e validação visual autenticada do modal Restaurante em seis combinações viewport/tema, sem overflow. RM-AUD22-22: ambos os botões enviaram atribuições canônicas distintas e apresentaram toast após ACK/readback; entrega já atribuída não aparece como elegível e o estado sem Driver/Order elegíveis é explicado. Corrigidos estado `syncState` após pull canônico, filtro `CREATED`/`REDELIVERY` sem Driver e leitura autorizada do roster. `npm test` Restaurante passou; fixture concluída com rollback e resíduos zero. Permanecem falhas HTTP/sem permissão, clique duplo e concorrência simultânea, replay/idempotência adicional e confirmação da visão Motoboy. Não encerrar RM-AUD19 ou problemas globais. Classificação cumulativa em [inventário](INVENTARIO_UNICO_PROBLEMAS.md); ver [REGISTRO 0289](REGISTROS/0289.md). Não iniciar automaticamente a próxima campanha.

---

## Atualização histórica — campanha 0287 — Motoboy IndexedDB/sync

0287 terminou **PARTIAL**. Snapshot Company de revisão 1→2 foi sincronizado, persistido e renderizado; abort IndexedDB manteve o estado válido e retry/reload recuperou a revisão nova. Endereço sem coordenadas permaneceu válido; snapshots de tenant/revisão/payload inválidos não sobrescreveram os dados. Browser autenticado passou seis combinações viewport/tema; `npm test` Motoboy passou; cleanup fixture foi COMPLETED sem resíduos. Permanecem no backlog segunda sessão independente, outros tipos de falha IndexedDB/pull, snapshot duplicado e isolamento cross-tenant backend explícito. Cenários Restaurante de timeout persistente, ACK/readback divergente, concorrência simultânea e isolamento adicional continuam pendentes. Nenhum estado global encerrado. Ver [REGISTRO 0287](REGISTROS/0287.md).

---

## Atualização vigente — campanha 0286

**PARTIAL.** Correção comprovada no salvamento local de Empresa Restaurante: serialização impede escrita de sincronização concorrente de invalidar o readback local e abortar o PUT canônico. Browser autenticado comprovou reconciliação de ACK perdido após reload e clique duplo sem duplicação canônica. Permanecem pendentes a matriz completa de falhas persistentes, IndexedDB/sync Motoboy, concorrência simultânea, isolamento adicional e validação visual. Preservar pendências e aliases cumulativos; não fechar RM-AUD19 ou RM-D1 globalmente com este escopo parcial. Ver [REGISTRO 0286](REGISTROS/0286.md).

---

## Atualização vigente — campanha 0285 — autenticação e rascunho pendente

**PARTIAL.** Corrigida e coberta por regressão a perda do rascunho de endereço no reload durante PUT pendente (marcador local persistente e reconciliação por GET canônico); Browser autenticado comprovou rascunho DOM/IndexedDB preservado e ausência de falso sucesso. `npm test` Restaurante e lifecycle/interação CDP passaram. Sessão backend-issued foi válida (200, MFA verificada), porém login/MFA via formulário UI e causa exata do 401 registrado em 0284 continuam em aberto. Falhas persistentes, IndexedDB fault injection, concorrência, isolamento e Motoboy não foram revalidados; sem mudança de código Motoboy/runner. Não encerrar IDs cumulativos. Fixture revertida sem resíduos. Ver [REGISTRO 0285](REGISTROS/0285.md).

## Atualização histórica — campanha 0284 — estabilização Browser e persistência

**PARTIAL.** O helper Browser/CDP passou testes direcionados e smoke com Chromium real: limite de Runtime.evaluate, lifecycle do frame principal e cleanup. A sessão da tentativa funcional respondeu 401, antes do formulário; falhas persistentes, reload pendente, IndexedDB, concorrência simultânea e isolamento Browser continuam pendentes. Fixture E2E reconciliada com `databaseCommitted=false` e resíduos tenant-scoped zero. Sem alterações de aplicação e sem reclassificação global. Priorizar retomada de autenticação E2E pelo mecanismo de sessão autorizado existente e depois executar os negativos sem repetir os positivos 0280–0282. Ver [REGISTRO 0284](REGISTROS/0284.md).

## Atualização histórica — campanha 0283 — falhas, concorrência e segurança

**PARTIAL.** `npm test` de ambos os aplicativos passou. Browser/CDP autenticado injetou HTTP 400/401/403/409/500/503 no PUT de localização e confirmou retenção do rascunho e ausência de alteração canônica; conexão interrompida recuperou por nova tentativa com readback. API E2E confirmou 401/403, rejeição de revisão obsoleta 409 e proteção contra o payload cross-tenant testado. Fixture revertida (`databaseCommitted=false`, resíduos tenant-scoped zero). Oito runs Browser com estado FAILED no harness também terminaram com rollback e zero resíduo. Não houve correção de produção nem fechamento de problema global. Reload durante gravação, concorrência simultânea, timeout/readback/ACK divergente, IndexedDB e visual autenticado continuam abertos. Preservar RM-AUD19-01..19, RM-UI-ACCOUNT-TOPBAR, RM-D1-AUTH-RESUME e os aliases; RM-AUD19-02/03/10 e RM-D1-SETTINGS-SAVE/RM-D1-LOCATION-CONSISTENCY seguem PARTIAL. Ver [REGISTRO 0283](REGISTROS/0283.md) e [evidência](EVIDENCIAS/0283/api-security-concurrency.json).

## Atualização histórica — campanha 0282 — localização Restaurante/Motoboy

**PARTIAL.** Snapshot Company com endereço e coordenadas nulas agora é propagado; Ajustes Motoboy aceita e apresenta esse estado read-only. Browser/CDP autenticado confirmou formulário Restaurante real, PUT/ACK/GET/pull, renderização pré/pós-reload e segunda sessão MFA. `npm test` e regressões direcionadas passaram nos dois apps; matriz visual autenticada 360/390/768 claro/escuro passou sem overflow observado. Negativos de falha/concorrência/tenant continuam pendentes; não reclassificar problemas cumulativos. A fixture reverteu sem resíduos. 0258 segue BLOCKED_AUTHORIZATION; ORS segue PENDING_EXTERNAL_CREDENTIAL. Ver [REGISTRO 0282](REGISTROS/0282.md). A próxima campanha não foi iniciada.

## Atualização da campanha 0279 — salvamento e localização Company

**PARTIAL.** Corrigido no Restaurante o falso sucesso por ausência/falha de readback em perfil e endereço Company, com revisão, ACK e GET canônico. Coordenadas na UI são atribuídas apenas do readback; endereço sem coordenadas não reaproveita ponto antigo. PostgreSQL E2E sintético confirmou persistência e snapshot `/sync/pull` ao Motoboy; rollback e resíduos zero. `npm test` Restaurante PASS. Browser/CDP foi anônimo e limitado ao carregamento/layout do código-fonte 360/390/768, claro/escuro; nenhum formulário autenticado foi executado. RM-AUD19-02/03/10, RM-D1-SETTINGS-SAVE e RM-D1-LOCATION-CONSISTENCY continuam PARTIAL; matriz global, Motoboy UI, reload Browser e Chrome Android físico seguem pendentes. ORS PENDING_EXTERNAL_CREDENTIAL; 0258 BLOCKED_AUTHORIZATION. Ver [REGISTROS/0279.md](REGISTROS/0279.md).

## Atualização da campanha 0278 — provider de roteamento OpenStreetMap

**PARTIAL.** Backend Restaurante agora seleciona provider genérico OSRM/ORS; ORS usa POST Directions v2 GeoJSON com segredo exclusivamente backend, limite de até 50 pontos, timeout, schema validation, dedupe/cache e rate limit local. Testes de contrato/falhas, configuração e `npm test` Restaurante passaram. Sem chave disponível, não houve chamada externa nem alegação de rota real. O endpoint/mapeamento dos apps permanece sem prova viária; ORS profile moto ausente; GraphHopper exige confirmação da disponibilidade contratual de motocicleta; `driving-car` não é sinônimo de moto. Duração segue distinta de ETA. Ver [REGISTROS/0278.md](REGISTROS/0278.md). RM-0277-OSRM-TERMUX e novo `RM-0278-OSM-ROUTING` permanecem abertos/parciais; todos os RM-AUD19 e RM-UI-ACCOUNT-TOPBAR preservados; 0258 continua BLOCKED_AUTHORIZATION.

## Atualização da campanha 0277 — viabilidade OSRM/Termux

**BLOCKED.** Termux 0.118.3/Android 13 ARM64 tem toolchain C++20/CMake/Ninja e ~114,4 GiB livres, mas não tem pacote/binário OSRM; Boost/TBB precisariam ser instalados e o upstream compila dependências via vcpkg sem declarar suporte Termux/Bionic. Nada foi instalado, baixado ou iniciado. A fixture pode injetar o adaptador OSRM sem alterar a URL oficial; porém não houve geometria real, teste do endpoint ou Browser dos mapas. Continuação exige autorização para ensaio nativo com limites de recurso e extrato OSM custom estimado/verificado, ou disponibilização de host Linux ARM64 isolado. A resposta atual não expõe duração e o contrato distingue duração de ETA; esclarecer sem inventar campo. Ver [REGISTROS/0277.md](REGISTROS/0277.md). Nenhuma ocorrência RM-AUD19 foi encerrada; 0258 BLOCKED_AUTHORIZATION; 0278 não iniciada.

## Atualização da campanha 0276 — Geometria viária e Logística/Frota

**PARTIAL.** Corrigida a corrida de restauração de sessão que impedia o mapa Restaurante de solicitar a geometria depois da autenticação; Motoboy agora omite uma linha canônica integral quando a sequência operacional ficou incompleta. O endpoint real retornou `ROUTE_GEOMETRY_PROVIDER_NOT_CONFIGURED`, e Company fixture sem localização respondeu `ROUTE_ORIGIN_UNKNOWN`; os mapas preservaram marcadores/retry e zero paths. Providers e limpeza econômica passaram ACK/readback/reload; conflito stale 409; `npm test` dos dois apps e Browser/CDP 360/390/768 claro/escuro passaram sem overflow, JS ou 5xx. Fixture rollback e resíduos zero; runtime E2E ready. Polyline real e atualização pós-evento continuam bloqueadas pelo OSRM não configurado e pelo ownership de Route. RM-AUD19-02/03/10 e aliases seguem PARTIAL. Chrome Android físico PENDING_OWNER; 0258 BLOCKED_AUTHORIZATION. Ver [REGISTROS/0276.md](REGISTROS/0276.md) e [EVIDENCIAS/0276](EVIDENCIAS/0276/). 0277 não iniciada.

## Atualização da campanha 0275 — Logística e Frota

**PARTIAL.** Corrigido o falso sucesso/perda de rascunho quando a escrita logística foi aceita mas o readback falhou. Browser autenticado com handlers reais comprovou Route e perfil econômico, retry/readback, reload, runtime do comparador, independência Company/origem custom e negativos 400/401/403/409. `npm test` Restaurante passou; fixture revertida, resíduos zero e readiness restaurado. Geometria Route não pôde ser calculada por falta de snapshots elegíveis na fixture; edição de providers, limpar perfil e matriz restante seguem pendentes. RM-AUD19-02/03/10 e aliases continuam PARTIAL. Chrome Android físico PENDING_OWNER; 0258 BLOCKED_AUTHORIZATION; 0276 não iniciada. Ver [REGISTROS/0275.md](REGISTROS/0275.md) e [EVIDENCIAS/0275](EVIDENCIAS/0275/).

---

## Registro da campanha 0274 — runner E2E e autoNext

**PASS_SCOPE.** Causa do 502 comprovada como teardown prematuro do servidor de fixture enquanto Chromium ainda podia sincronizar (nginx E2E registrou conexão recusada ao upstream 8787). O JSON antigo da 0272 aponta `/api/sync/pull`, embora seu texto cite `/api/sync/installations/motoboy`. Runner corrigido para encerrar Browser antes do rollback e aguardar bootstrap/readback; endpoint real retornou 200. Cenários autoNext ligado/desligado, fim de rota e falha de armazenamento passaram com fixture `rotamoto_e2e`, ACK/readback e resíduos zero. Motoboy `npm test` passou. Browser/CDP 360/390/768, claro/escuro; sem JS/5xx. Nenhuma alteração de app. Evidências e limites em [REGISTROS/0274.md](REGISTROS/0274.md) e [EVIDENCIAS/0274](EVIDENCIAS/0274/). RM-AUD19-01..19 mantidos; 02/10 permanecem PARTIAL; validação física PENDING_OWNER. 0258 BLOCKED_AUTHORIZATION; 0275 não iniciada.

---

## Atualização da campanha 0273 — Conta pela barra superior

**PASS_SCOPE.** Causa comprovada: o botão era movido para `.top-actions` sem `data-account-security`, que o listener delegado exige; o handler local era vazio. A sessão autenticada agora navega para a página própria Ajustes → Conta e segurança, com retorno aos cards e foco no título. Browser/CDP autenticado passou toque/clique, teclado, reload, cinco larguras e dois temas, sem exceções JS ou HTTP 5xx; `npm test` Restaurante passou. `RM-UI-ACCOUNT-TOPBAR` é PASS_SCOPE; Chrome Android físico continua PENDING_OWNER. Os 19 RM-AUD19 não mudaram. Evidências e commits no [REGISTRO 0273](REGISTROS/0273.md). 0258 segue BLOCKED_AUTHORIZATION.

---

## Atualização da campanha 0272 — navegação, mapa e alertas

**PARTIAL.** Corrigidos três defeitos reais no Motoboy: provedor preferido ignorado no foco da rota, `autoNext` sem efeito e ausência de rechecagem dos alertas no foreground. `npm test` integral e Browser/CDP autenticado passaram no subset descrito em [REGISTROS/0272.md](REGISTROS/0272.md); fluxo Browser de entrega ficou limitado por 502 em `/api/sync/installations/motoboy`, sem sucesso simulado. RM-AUD19-02/10 seguem PARTIAL e os demais IDs preservados. `RM-UI-ACCOUNT-TOPBAR` P1 OPEN pertence a 0273. 0258 BLOCKED_AUTHORIZATION; Android físico PENDING_OWNER.

---

## Atualização da campanha 0271 — configurações Motoboy

**PARTIAL.** Reproduzidos e corrigidos três fluxos sob falha de gravação: Aparência/tema, autosave de taxa e meta diária. Browser/CDP autenticado confirmou falha IndexedDB, draft preservado após `renderSettings()`, retry/readback local e proteção de saída; npm test Motoboy passou. Isso cobre somente os controles declarados em [REGISTROS/0271.md](REGISTROS/0271.md) e [evidência](EVIDENCIAS/0271/motoboy-settings-recovery.json). RM-AUD19-02, RM-AUD19-10 e RM-D1-SETTINGS-SAVE continuam PARTIAL; matriz de todos os controles, HTTP/RBAC/conflito e Chrome Android físico seguem pendentes. Nenhum dos demais 19 IDs foi removido ou encerrado. 0258 permanece BLOCKED_AUTHORIZATION; não iniciar 0272 automaticamente.

---

## Atualização da campanha 0270 — persistência por campo

**PARTIAL.** Corrigida em Restaurante a perda de seleção de agrupamento de rotas após conflito de revisão. Browser/CDP autenticado cobriu 33 caminhos únicos (31 locais e 2 Company), respostas 401/403/400/409/offline, leitura de três endpoints reais de Logística e reload de usuário/perfil local. O ciclo completo por todas as configurações não está concluído; Motoboy não teve Browser autenticado de preferências, Logística foi somente lida e 360/768/1024/1440 e tema escuro não foram repetidos nos lotes. `npm test` dos dois apps passou. RM-AUD19-02/10 e RM-D1-SETTINGS-SAVE ficam PARTIAL; todos os 19 IDs preservados. Veja [REGISTROS/0270.md](REGISTROS/0270.md). 0258 segue BLOCKED_AUTHORIZATION; nenhuma campanha seguinte iniciada.

## Atualização da campanha 0269 — regressão prioritária

**PARTIAL; nenhum dos 19 problemas foi encerrado.** A suíte integral `npm test` dos dois apps passou. Browser/CDP comprovou somente persistência Company/location no fluxo autenticado, separação da origem customizada, segunda sessão/reload e negação RBAC; nenhum novo defeito reproduzível foi encontrado. Continuam P0: matriz de configurações RM-AUD19-02/10, consistência completa RM-AUD19-03 e retomada física de sessão RM-AUD19-07/12. RM-AUD19-11 depende do modelo de permissões; RM-AUD19-18 depende de capacidade contratual para identidade canônica. Nenhuma validação física foi feita. Veja [REGISTROS/0269.md](REGISTROS/0269.md) e o inventário único. Próxima recomendação: completar a matriz por lotes e critérios por campo; 0270 não iniciada.

---

## Atualização vigente — Campanha 0266 (2026-10-21)

**PARTIAL / BLOCKED_EXTERNAL_DEPENDENCY.** Suites completas dos aplicativos, testes locais de runtime/worker/segurança e Browser autenticado sintético passaram no escopo. iFood, 99Food e Keeta permanecem sem sandbox ou conectividade confirmada. Nenhum dos 19 IDs Android foi encerrado. Matriz, checklist individual, conflito histórico 0152/99Food e a exceção de fixture retida/limpeza posterior constam em [REGISTROS/0266.md](REGISTROS/0266.md). 0258 permanece BLOCKED_AUTHORIZATION; 0267 não iniciada.

---

## Atualização vigente — Campanha 0265 (2026-10-20)

**PARTIAL.** `identity-ui.js` agora apresenta resultado de ações marketplace com rótulos de operação em português, texto amigável para falha e código interno apenas em disclosure recolhida. Browser/CDP autenticado provou status honesto sem conexão em iFood, 99Food e Keeta, páginas exclusivas, separação origem/executor e Laboratório 99Food sintético sem escrita IndexedDB, overflow, JS exception ou 5xx em cinco larguras e dois temas. `npm test` Restaurante/Motoboy passou. Sem conta comercial ou sandbox autorizada, nenhuma conectividade/homologação foi alegada; seguir como dependência da 0266. O erro ASN1 do teste de backup reportado em 0264 não foi reproduzido (teste isolado e suíte atual passaram), sem inferir causa histórica. IDs RM-AUD19-01..19, campanhas futuras e pendências preservados. Registro: [REGISTROS/0265.md](REGISTROS/0265.md).

---

## Atualização vigente — Campanha 0262 (2026-10-20)

**PARTIAL.** Os dois clientes agora revalidam sessão e retomam sync quando a página volta ao primeiro plano. E2E Browser/CDP autenticado comprovou Company em /sync/pull, IndexedDB/DOM do Motoboy e revisão 3→4; 20 combinações viewport/tema, três fluxos e três negações. npm test nos dois aplicativos e teste PostgreSQL sync passaram. Fixture revertida com zero resíduos e serviço runit/readiness restaurados. Offline durante envio, conflitos em concorrência real, recuperação autenticada de outbox pendente e ACK perdido no Browser seguem PARTIAL. Ver [REGISTRO 0262](REGISTROS/0262.md).

## Atualização vigente — Campanha 0260 (2026-10-20)

**PARTIAL.** Contratos e implementação confirmam edição de perfil personalizado e de membership (papel/situação), com RBAC, CSRF/MFA, proteção de perfil de sistema, autoalteração e revogação de sessões. O cadastro Driver é editável pelo Restaurante através de Local-First + `sync.push` autorizado, com revisão otimista; Motoboy permanece read-only. Nome/email canônicos de User e edição do proprietário global não têm endpoint permitido. `accept-authenticated` reutilizou identidade existente em segundo tenant em teste sequencial; concorrência independente e ações de reenvio/revogação pela UI seguem pendentes. Ver [REGISTRO 0260](REGISTROS/0260.md). RM-AUD19-18/19 continuam parcialmente abertos. Não iniciar 0261 automaticamente.

---

## Atualização vigente — Campanha 0257 (2026-10-20)

**PARTIAL.** Os testes HTTP/PG provaram guards e operações de usuários globais sintéticos; Browser/CDP provou que tenant admin autenticado não vê nem acessa a administração global. As cinco larguras e dois temas passaram sem overflow. Não há tela/endpoint para grants, serviços/configuração, filtros/detalhes nem leitura de auditoria. `rotamoto.audit_log` continua sem SELECT para `rotamoto_app`; nenhum privilégio foi concedido. A UI positiva global não foi comprovada porque a fixture reversível não pode conceder o grant reservado ao operador migrator no mesmo ciclo de sessão. O manifesto final confirma rollback e zero resíduos. Ver [REGISTRO 0257](REGISTROS/0257.md).

`RM-0257-GLOBAL-ADMIN-E2E` e `RM-0255-GLOBAL-UI` permanecem PARTIAL; `RM-D1-ADMIN-AUDIT`/`RM-AUD19-11` permanecem bloqueados pelo modelo de permissões. O `RM-0258-GLOBAL-GATE` e `RM-0255-FOUNDER` continuam `BLOCKED_AUTHORIZATION`. Não iniciar 0258 sem evidência histórica independente e autorização explícita. Todos os RM-AUD19-01…19 e outras pendências permanecem preservados.

---

## Atualização vigente — Campanha 0256-F (2026-10-20)

**PARTIAL.** `npm test` passou no Restaurante e no Motoboy. O Browser E2E transacional autenticou com TOTP sintético, percorreu abas e 18 cards em 360/390/768/1024/1440 nos dois temas, sem exceções JS ou overflow horizontal. O teste detectou e a correção eliminou um `TypeError` ao fechar Conta e segurança após reparenting dos controles MFA. Persistência campo a campo, reload/expiração, auditoria server-side, edição administrativa e endpoints ausentes da fixture (404) seguem abertos. Backup indisponível com 503 honesto; nenhuma restauração real. Matriz: [REGISTROS/0256-F.md](REGISTROS/0256-F.md); critérios: [INVENTARIO_UNICO_PROBLEMAS.md](INVENTARIO_UNICO_PROBLEMAS.md).

Os 19 IDs originais permanecem; `RM-F-MFA-PAGE-DETACH-CLEANUP` foi adicionado sem renumerá-los. 0257 não foi iniciada. A campanha seguinte deve carregar explicitamente os itens parciais e bloqueados, os gates 0258 e os bloqueios da 0256-E.

---

## Atualização vigente — Campanha 0256-E (2026-10-20)

**PARTIAL.** Recovery set PostgreSQL criptografado foi criado, verificado e restaurado em cluster/dados descartáveis; testes focados de concorrência, idempotência, interrupção, autorização administrativa, retenção e armazenamento S3/SFTP sintético passaram. A corrida `BACKUP_CONTROL_BUSY`/`BACKUP_CONTROL_LOCK_UNSAFE` não se reproduziu isoladamente, mas permanece PARTIAL porque a causa histórica não foi comprovada e a suíte integral do Restaurante parou antes dela por versão desatualizada esperada em `test-help-center.js`. O runtime atual retorna `BACKUP_ADMIN_NOT_CONFIGURED`; não foi ativado. Browser E2E autenticado não foi executado porque o runner disponível conserva dados em `rotamoto_e2e`, sem rollback integral. RPO/RTO, custódia e cópia externa seguem bloqueados. Ver [REGISTROS/0256-E.md](REGISTROS/0256-E.md). 0256-F e 0257–0268 permanecem na ordem; campanha seguinte não iniciada.

## Atualização vigente — Campanha 0256-D6 (2026-10-20)

**PARTIAL.** A falha do agrupamento de rotas era estrutural: Company só era carregada em Ajustes → Empresa, enquanto o seletor está em Operação, e o controle não era habilitado após leitura. `app.js` foi corrigido; Browser/CDP comprovou PUT 200, payload revisionado, leitura canônica e confirmação na tela. Os handlers reais de Logística persistiram origem/retorno e perfil econômico em `rotamoto_e2e`, com readback, conflito 409 e entradas inválidas 400. Localização sintética de Company correspondeu à origem `establishment` da Logística na API. Relatórios e limitações: [0256-D6](REGISTROS/0256-D6.md), [evidência Browser](../browser-tests/evidencias/campanhas/0256-D6/batch-core-report.json).

`RM-AUD19-02` e `RM-AUD19-10` permanecem PARTIAL: ainda faltam ciclos por formulário, reload/nova sessão, negatives visuais, drafts/retry, e a apresentação visual da localização em ambas as páginas. `RM-AUD19-03` também segue PARTIAL até comprovação no DOM; nenhum dos outros itens foi encerrado. Fixture E2E sintética foi revertida, Chromium removido e runtime restaurado com health 200. Sem alteração oficial ou validação física Android. Campanhas 0256-E/F e 0257–0268 preservadas; nenhuma campanha seguinte iniciada.

---

## Atualização vigente — Campanha 0256-D3 (2026-10-19)

**PARTIAL.** Correção do gravador local de preferências com fila, snapshots e readback no IndexedDB; autosave local passa a ser explícito, com retry e proteção a rascunhos. Campos canônicos de Company continuam gravados por endpoints autorizados e sem misturar drafts com cache. `npm test` dos dois apps passou. O Browser E2E autenticado não completou reload/navegação nem os cinco viewports, e os erros HTTP/RBAC de salvamento seguem pendentes. A matriz por origem está em [REGISTROS/0256-D3.md](REGISTROS/0256-D3.md). Commits locais Restaurante `9a935130`, Browser Tests `9b543c0`.

Somente `RM-AUD19-02`, `RM-AUD19-10` e `RM-D1-SETTINGS-SAVE` foram trabalhados. Os outros 17 IDs e todas as pendências históricas permanecem. 0256-E/F e 0257–0268 preservadas; endpoints não montados no harness e validação física Android ficam explicitamente pendentes. `npm test` não fecha item individual.

---

## Atualização vigente — Campanha 0256-D2 (2026-10-19)

A lista de 19 ocorrências do proprietário foi conciliada individualmente como `RM-AUD19-01`…`RM-AUD19-19` em [INVENTARIO_UNICO_PROBLEMAS.md](INVENTARIO_UNICO_PROBLEMAS.md). **PARTIAL:** corrigida a sobreposição dos toasts com a barra inferior e a corrida de decode do QR antes da impressão; demais problemas permanecem em aberto, bloqueados ou dependem do proprietário, cada um com critério próprio. Registro e evidências: [REGISTROS/0256-D2.md](REGISTROS/0256-D2.md).

Preservados 0256-E/F e 0257–0268. Em particular: auditoria administrativa requer modelo tenant-scoped e gate; edição de identidade/Driver precisa API/contrato apropriado; Chrome Android físico depende do proprietário; corrida de backup segue para 0256-E. `npm test` é somente regressão e não fecha itens individuais.

---

## Reconciliação documental vigente — 0256-D2 planejamento (2026-10-19)

O índice operacional e crosswalk de IDs é [INVENTARIO_UNICO_PROBLEMAS.md](INVENTARIO_UNICO_PROBLEMAS.md); a sequência e gates são [ORDEM_EXECUCAO_CAMPANHAS.md](ORDEM_EXECUCAO_CAMPANHAS.md), com registro em [REGISTROS/0256-D2-PLANEJAMENTO.md](REGISTROS/0256-D2-PLANEJAMENTO.md). As tabelas e IDs históricos abaixo permanecem preservados. Nenhuma pendência é fechada por esta atualização documental.

**Divergência Android:** D1 contém 17 ocorrências enumeradas; esta solicitação informa 19. A fonte numerada das 19 não foi encontrada; os itens desconhecidos estão marcados `BLOCKED_SOURCE_DOCUMENT` no inventário. Pedir a lista/capturas sanitizadas para reconciliar, sem inferir que as 17 são as mesmas.

**Regra de fechamento:** nenhuma linha passa a PASS por conclusão de campanha ou por `npm test` isolado. Exigir aceite e evidência específicos, registrar remanescentes/bloqueios/regressões/não testados e validação do proprietário para hardware Chrome Android quando aplicável.

---

## Atualização vigente — Campanha 0256-D1 (2026-10-19)

| ID estável | Descrição | Prioridade | Estado | Campanha responsável | Dependências | Evidência atual | Critério de aceite |
|---|---|---:|---|---|---|---|---|
| RM-0256D1-SETTINGS-PERSISTENCE | Tema e demais configurações, confirmação de gravação e saída com alterações pendentes. | P0 | PARTIAL | 0256-D1 / 0256-F | Browser autenticado por todas as categorias; política unificada de autosave/save | Aparência tem ação de salvar e escrita local confirmável; demais configurações têm donos diferentes (IndexedDB/servidor) e não foram todas revalidadas após reload. Registro 0256-D1. | Testar persistência por página após navegação, reload e nova interface; incluir guarda contra saída em todos os formulários draft. |
| RM-0256D1-AUTH-RESUME | Estado neutro, restauração em foreground e expiração de sessão no Chrome Android. | P0 | PARTIAL | 0256-D1 / 0263 | Reproduzir seis minutos em dispositivo real e validar sessão pela política do backend | Política server 30 min idle/12 h absolute; cliente preserva sessão em falha transitória e revalida ao voltar ao foreground; 401 revoga. Sem teste físico prolongado. | Browser/Android confirma ausência de flash e expiração só conforme política; nunca prolongar idle/absolute. |
| RM-0256D1-MFA-QR | QR de enrollment MFA e estados de fator configurado/pendente. | P1 | PARTIAL | 0256-D1 / 0256-F | Fixture sintética de enrollment e captura do canvas; Chrome Android físico | Instrução de setup agora é condicionada a `mfaEnrollmentRequired`; enrollment visual não foi executado. | Validar QR em fixture sintética sem tocar fatores reais e revisar recuperação/substituição autorizada. |
| RM-0256D1-PRINT-QR | QR sintético no teste de impressão e validação em hardware. | P1 | PARTIAL | 0256-D1 / 0256-F | Impressora/navegador real do proprietário | Renderer e teste unitário usam QR local com rótulo que não autoriza acesso. Não foi impresso em hardware real. | Confirmar leitura e legibilidade com configuração de impressão autorizada. |
| RM-0256D1-ADMIN-AUDIT-READ | Consulta administrativa filtrada/exportável de `audit_log` por empresa. | P0 | BLOCKED_PERMISSION_MODEL | 0256-D1 / 0257 | Definir papel/função segura de leitura e migrar somente após autorização | Read-only em `rotamoto_e2e`: runtime `rotamoto_app` tem INSERT e não SELECT. Nenhum grant/função/migration foi criado; tentativa UI/API foi removida e indisponibilidade informada. | Implementar leitura tenant-scoped sem conceder leitura geral ao runtime; paginação, filtro, redaction, RBAC e exportação autorizada. |
| RM-0256D1-VISUAL | Saiba mais, bordas de permissões, hierarquia de modais/integrações, espaçamentos e brace do laboratório. | P2 | PARTIAL | 0256-D1 / 0256-F | Revisão visual autenticada completa nos cinco viewports e dois temas | Botão Central de Ajuda padronizado; borda de fieldset reduzida; Integrações já recolhe detalhes técnicos desde 0256-D. | Inspecionar Ajustes, Rotas, Equipe, Integrações, Laboratório e Conta e Segurança após E2E final. |

Ver [REGISTRO 0256-D1](REGISTROS/0256-D1.md). 0256-C, 0256-D, 0256-E, 0256-F, 0260 e 0263 continuam preservadas.

---

## Atualização vigente — Campanha 0256-D (2026-10-19)

| ID estável | Descrição | Prioridade | Estado | Campanha responsável | Dependências | Evidência atual | Critério de aceite |
|---|---|---:|---|---|---|---|---|
| RM-0256D-MARKETPLACE-ADMIN | Integrações iFood/99Food/Keeta, estados reais e ações autenticadas por empresa. | P1 | PARTIAL_EXTERNAL | 0256-D / 0256-F | Onboarding, credenciais e conectividade comercial autorizada; revisão visual completa do detalhe | Browser/MFA sintético leu os três provedores e mostrou “sem conexão confirmada”; API existente mantém sessão, tenant, permissões e CSRF; nenhum segredo ou ação externa foi usado. Registro 0256-D. | Verificar em sandbox autorizado por provedor, comprovar conexão/recebimento e executar autorização negativa multi-tenant sem vazar segredo. |
| RM-0256D-ORDER-SOURCES | Separação entre origens operacionais, Integrações e despacho. | P1 | PASS_LOCAL_SCOPE | 0256-D | Regressão de navegação em 0256-F | Origem local preserva controles existentes; não altera propriedade, despacho nem sincronização. Browser confirmou que a página não contém laboratório duplicado. | Preservar contratos e comprovar roteamento E2E de pedidos por cada provider que tenha fixture suportada. |
| RM-0256D-LAB-ISOLATION | Manter simulação técnica isolada da operação e das stores do IndexedDB. | P0 | PASS_LOCAL_SCOPE | 0256-D / 0256-F | Regressões futuras | Browser autenticado comparou `orders/events/outbox` antes/depois de simulação e transição; sem diferenças; sem exceções JS. | Manter teste de isolamento e cobertura de simulações nos três provedores em regressões. |
| RM-0256D-EXTERNAL-HOMOLOGATION | Conectividade, sandbox e homologação comercial de marketplaces. | P1 | PENDING_OWNER_EXTERNAL | 0256-D / 0256-F | Credenciais e autorização externa de cada plataforma | Nenhuma chamada comercial, credencial ou conta real usada; não há prova de conexão/homologação. | Realizar somente após onboarding e autorização explícita do proprietário, em fixture/sandbox disponível. |
| RM-0256D-ANDROID | Validar cards/layout/teclado no Chrome Android físico. | P2 | PENDING_OWNER | 0256-D / 0256-F | Proprietário e dispositivo | CDP validou viewports 360–1440 e temas; não certifica aparelho/teclado reais. | Proprietário confirmar no Chrome Android real. |

Ver [REGISTRO 0256-D](REGISTROS/0256-D.md). Campanhas 0256-E (Sistema/backup/recuperação), 0256-F (auditoria visual/E2E final) e 0257 (administração global) permanecem planejadas. Pendências anteriores de equipe/perfis, Sistema local, backup e formulários continuam preservadas.

---

# Backlog mestre RotaMoto

## Atualização vigente — Campanha 0268 (2026-10-21)

**PARTIAL.** Entregues checklists Android físico e DR com resultados iniciais PENDING_OWNER/BLOCKED explícitos. Nenhum dispositivo Android conectado; nenhum teste físico realizado. `npm test` integral passou nos dois aplicativos (exit 0). Prontidão operacional de DR segue parcial: offsite, custódia, RPO/RTO e restore independente sem prova/autorização. RM-AUD19-01..19 e demais pendências preservados; 0258 segue BLOCKED_AUTHORIZATION.


Fonte consolidada para pendências documentadas nos registros 0234–0256-C; evidências de campanhas corretivas complementam as linhas sem remover itens anteriores. Um estado só muda com nova evidência. Pendências anteriores a 0247 continuam rastreáveis em `PENDENCIAS.md` e não são descartadas por esta consolidação.

## Itens em aberto

| ID estável | Descrição | Prioridade | Estado | Campanha responsável | Dependências | Evidência atual | Critério de aceite |
|---|---|---:|---|---|---|---|---|
| RM-0256C-TEAM-RBAC | Equipe, convites, perfis e separação entre usuários locais e RBAC empresarial. | P0 | PARTIAL | 0259 / 0260 | Multiempresa sintética, concorrência e edição autorizada | Browser 0259 comprovou página de equipe, perfil criado/editado, convite por sink, identidade ativada, bloqueio operacional sem Driver, vínculo same-tenant e unlink imediato; HTTP/PG cobre MFA/CSRF/token. | Completar conta existente em outro tenant, concorrência, link duplicado/errado e UI de reenvio/revogação; regressão de suíte integral permanece relevante. Ver 0259. |
| RM-0256C-DRIVER-LINK-UI | Convite aceito e vínculo explícito da membership ao cadastro operacional de motoboy pela página administrativa. | P1 | PARTIAL | 0259 / 0260 | Driver sintético ativo, identidade convidada ativa e fixture transacional | Browser 0259 provou caminho positivo same-tenant e 403 antes/depois do unlink; API/PG provou expiração, revogação, rotação do token e conflito de convite ativo. | Browser de reenvio/revogação, outra empresa/Driver inativo, existente account, disputa concorrente e unicidade/idempotência do link. Nenhum vínculo automático. |
| RM-0259-IDENTITY-INVITE-LIFECYCLE | Ciclo de identidade, convite, membership, papel e vínculo Driver. | P0 | PARTIAL | 0259 / 0260 | Reuso multiempresa e testes concorrentes; sink local, sem SMTP real | 11 fluxos Browser, 36 checks viewport, 4 negações esperadas, 0 erros JS/5xx; `test:identity-http` verificou resend/expiry/revoke/active duplicate. Fixture rollback completo. Registro 0259. | Comprovar concorrência, convite autenticado para conta existente, cross-tenant, Driver inválido e ações UI após reload; sem dado persistente. |
| RM-0256C-BACKUP-CONTENTION-TEST | Repetir `npm test` integral após falha concorrente `BACKUP_CONTROL_BUSY`/`BACKUP_CONTROL_LOCK_UNSAFE`. | P1 | PARTIAL_NOT_REPRODUCED | 0256-E | Diagnóstico isolado concorrente sem dados persistentes; reexecutar após consertar gate Help Center | `test-backup-center` e cinco repetições de 32 enqueues concorrentes passaram. `npm test` Restaurante parou antes do teste de backup por versão do app no offline shell. Ver 0256-E. | Causa histórica identificada ou não reproduzida sob suíte integral; preservar open até regressão integral passar. |
| RM-0256B1-PAGE-ISOLATION | Desmontar Conta e segurança ao sair da rota e impedir conteúdo inativo em páginas operacionais. | P0 | PASS_TECNICO; ANDROID PENDING_OWNER | 0256-B1 | Chrome Android físico; runtime E2E permanente em 0263 | Página de conta só monta em `#main` na rota autorizada; teste CDP autenticado rola o DOM completo em sete abas operacionais, cinco viewports e dois temas; espaço da barra fixa validado até 1100 px. Registro 0256-B1. | Preservar a montagem por rota, isolamento por aba, Ajustes em cards, MFA e retorno/histórico. |
| RM-0256B-AUTH | Gate de autenticação/MFA, montagem exclusiva após autorização, logout e sessão expirada. | P0 | PASS_TECNICO; ANDROID PENDING_OWNER | 0256-B | Chrome Android físico; runtime E2E permanente em 0263 | CDP anônimo/autenticado: login MFA → Início; logout/expiração desmontam; 401 anônimo. Registro 0256-B. | Preservar gate, MFA e regressão no Chrome Android do proprietário; sem expor dados operacionais antes da sessão autorizada. |
| RM-0256B-SETTINGS-CARDS | Ajustes em cards responsivos e páginas próprias, retorno/histórico e categorias preservadas. | P0 | PASS_TECNICO | 0256-B | Confirmação física Android | 18 cards, 5 larguras × 2 temas, sem overflow; navegação, retorno, histórico e reload autenticado passam em CDP. | Manter categorias, páginas e retorno em futuras alterações. |
| RM-0256B-ACCOUNT-SECURITY | Conta e segurança como página de Ajustes; preservar MFA, recuperação e identidade. | P0 | PASS_TECNICO; isolamento reforçado em 0256-B1 | 0256-B / 0256-B1 | Chrome Android físico | Página autenticada, MFA, troca autorizada 200 e não autorizada 403, recuperação/convite inválidos; ciclo de montar/desmontar validado em B1. | Revisitar se houver suporte real para sessões/dispositivos; não inventar controles sem backend. |
| RM-0256B-ANDROID-PHYSICAL | Validar visualização e teclado no Chrome Android real. | P2 | PENDING_OWNER | 0256-B | Proprietário e aparelho | CDP emula viewport, não comprova navegador/aparelho físico. | Proprietário confirma login, Ajustes, Conta e segurança e teclado sem compartilhar senha/MFA. |
| RM-0256B-RUNIT-BROWSER | Browser autenticado usando a API do runtime E2E permanente. | P1 | PARTIAL | 0263 | Harness runit compatível com fixture sem interrupção | 0256-B usou listener transacional; runit restaurado/readiness 200. | Executar identidade e browser via serviço permanente com dados descartáveis e segurança preservada. |
| RM-0255-GLOBAL-UI | Completar painel administrativo global: empresas, usuários/vínculos, serviços e configurações nas capacidades existentes. | P0 | PARTIAL | 0257 | UI positiva global segura; grants/filtros/auditoria | Testes PG transacionais provaram bootstrap sintético, leitura e disable/enable; Browser prova negação tenant; sem grant real ou UI global positiva. | Completar Browser positivo com fixture realmente reversível; registrar capacidades ausentes sem simular sucesso. |
| RM-0257-GLOBAL-ADMIN-E2E | Validar administração global existente por API e Browser autenticado. | P0 | PARTIAL | 0257 | Grant global sintético em Browser com rollback integral; leitura audit_log continua sem SELECT runtime | Testes HTTP, PG, tenant isolation e Browser negativo passaram; matriz e limites em REGISTROS/0257.md. | Exercitar todas ações globais positivas/negativas no Browser com MFA/CSRF e zero resíduos; cobrir conflito quando endpoint suportar revisão. |
| RM-0255-FOUNDER | Comprovar fundador e preparar promoção/migração global reversível para aprovação. | P0 | BLOCKED_AUTHORIZATION | 0258 | Evidência histórica verificável; autorização explícita para qualquer privilégio persistente | Registro 0234 descreve bootstrap como proprietário, não fundador global. Conta real não promovida. | Proposta com evidência, migration e rollback revisados; não aplicar até aprovação explícita. |
| RM-0256-SETTINGS | Finalizar navegação em Ajustes e páginas Empresa, Equipe, Motoboys e Integrações sem modal administrativo legado. | P0 | PASS_SCOPE | 0256-A | Confirmação física Android é acompanhada separadamente; Browser via runit em 0263 | Registro 0256-A: login em Início, categorias únicas, sem overlay/atalho/tabs duplicadas; páginas e retorno validados em CDP autenticado. | Manter regressões e confirmar experiência física no Android; CRUD canônico da Empresa comprovado com fixture PostgreSQL E2E transacional. |
| RM-0256A-COMPANY-HYDRATION | Corrigir campos Empresariais vazios em Ajustes móvel; fonte canônica única. | P0 | PASS | 0256-A | Nenhuma; proprietário valida dispositivo | Nome/telefone/fuso/endereço sintéticos persistidos via endpoint e iguais em mobile/desktop e após reload; registro 0256-A. | Regressão autenticada preserva paridade de dados e não sobrescreve com vazio. |
| RM-0256A-ASYNC-FORMS | Proteger formulários enquanto carregam e exibir erros de leitura. | P0 | PASS_SCOPE | 0256-A | API E2E; confirmação física pendente | Resposta lenta manteve saves desabilitados; 401/403/rede deram mensagens claras; retry 200 recuperou valores. | Não permitir salvar com leitura pendente/falha; rascunhos e tenant atual protegidos de resposta antiga. |
| RM-0256A-ANDROID-PHYSICAL | Validar Ajustes no Chrome Android real, incluindo modo computador. | P2 | PENDING_OWNER | 0256-A | Proprietário realizar inspeção no aparelho | Emulação CDP não comprova Chrome físico, teclado virtual ou aparelho. | Proprietário confirma páginas e paridade sem compartilhar credenciais ou fatores. |
| RM-0256-PROVIDERS | Comprovar estado e ações por página de iFood, 99Food e Keeta, sem simular conectividade comercial. | P1 | PARTIAL | 0265 | Resposta real do endpoint; runtime e credenciais comerciais | CDP autenticado selecionou as três páginas e atualizou estado via endpoint real (200 autorizado/403 restrito); sem contas comerciais. | Estado real por fornecedor; ações locais funcionais; conexão externa confirmada somente após autorização; negativas backend preservadas. |
| RM-0254-COMMERCIAL | Conectar e homologar fornecedores comerciais e validar sincronização real de pedidos. | P1 | BLOCKED_EXTERNAL_DEPENDENCY | 0266 | Onboarding, credenciais, whitelist/certificação e autorização do proprietário | Sem credenciais externas ou homologação. | Sandbox/produção do fornecedor aprovada, lojas vinculadas, recebimento/ACK e reconexão auditados. |
| RM-0252-TEAM-IDENTITY | Completar ciclo cadastro operacional, convite, ativação, conta existente e vínculo de motoboy. | P1 | PARTIAL | 0259 / 0260 | Entrega externa de email; conta existente em outro tenant e concorrência | 0259 provou convite→ativação→login→vínculo same-tenant e asserções API/PG de expiração, revogação, resend/token rotation e duplicado ativo. Sink apenas local; sem SMTP. | Exercitar accept-authenticated/reuso de identidade em empresa adicional e disputas concorrentes; sem enumeração nem identidade duplicada. Ver REGISTROS/0259.md. |
| RM-0247-DRIVER-AUTHZ | Provar negação server-side para vínculo ausente, revogado, desativado ou de outro tenant. | P0 | PARTIAL | 0259 / 0260 | Identidades sintéticas multiempresa, sessão/MFA válida | 0259 Browser mostrou 403 sem Driver e após unlink, acesso após vínculo autorizado; cobertura ainda não isolou Driver desativado/cross-tenant. | API nega cada vínculo inválido e disputa; motorista ativo opera somente no escopo autorizado. Validação física é separada. |
| RM-0252-COMPANY-PERSIST | Provar endereço, contato e fuso por UI autenticada, PostgreSQL, recarga e nova sessão. | P1 | PARTIAL | 0261 | Fixture reversível e endpoint autorizado | 0261 comprovou Company Profile UI com ACK/GET, localização sintética via mapa, DOM nas duas telas, reload e segunda sessão; fuso e matriz integral permanecem sem evidência nova. | Após ACK, os dados reaparecem iguais; campos vazios não sobrescrevem valores; tenant isolado. |
| RM-0253-CROSS-TAB-SYNC | Completar atualização server-confirmed entre telas/abas, offline, reconexão e conflitos sem perder rascunhos. | P1 | PARTIAL | 0262 | Eventos seguros, outbox/inbox e fixture reversível | 0262 adicionou revalidação/sync no foreground em ambos os apps e comprovou Company pull/revisão/DOM; ACK/outage visual, replay Browser, concorrência e offline permanecem incompletos. | Múltiplas abas refletem ACK; estados local/pendente/erro separados; replay idempotente; revogação backend imediata. |
| RM-0256-RUNIT-BROWSER | Validar browser autenticado pela API runit e role runtime dedicada sem persistir fixture. | P1 | PARTIAL | 0263 | Harness transacional compatível com role runtime | Campanha 0256-A restaurou runit e health 200 após fixture; browser autenticado usou listener PostgreSQL transacional separado e rollback confirmado. | Browser em 8083/8084 contra runit com identidade sintética descartável e rollback comprovado. |
| RM-0247-OPS-FLOW | Completar operação Restaurante ↔ Motoboy autenticada: despacho, entrega, cancelamento/retorno e comprovante. | P0 | PARTIAL | 0264 | Corrida real simultânea e Browser journey integral aceite/coleta/entrega/proof/receipt | Browser autenticado cobriu cadastro/elegibilidade/dispatch e cancelamento marketplace pós-coleta por frota própria com retry e handover; PostgreSQL transacional cobriu custody/receipt/idempotência/isolamento/revisão e rota. `npm test` Restaurante interrompido por certificado TLS inválido em teste de backup fora do escopo. Não há uma única jornada Browser cobrindo o ciclo completo nem prova de concorrência real. | Completar Browser UI com ACK/readback de cada evento e receipt, concorrência real em conexões independentes, sem fixture persistente; separar evidência física Android. Ver REGISTROS/0264.md. |
| RM-0254-REPORTS | Preservar relatórios, cálculo contratual, filtros e CSV em regressões de navegação. | P1 | PARTIAL | 0267 | Readback canônico de Orders/Earnings e regressão física pendentes | 0267 identificou/corrigiu agregação de várias Deliveries por Order e deduplicação por IDs locais/canônicos. Unitários, CSV sintético e Browser autenticado em 5 larguras/2 temas passaram; oito seções, dados/vazio e filtros cobertos. O dashboard exibe snapshot local e avisa que sync não foi confirmado; não houve readback de dados financeiros canônicos. | Uma Order única, operações e valores segundo contrato, filtros e exportação sem duplicidade/fórmula/PII; evidência específica e validação física onde aplicável. Ver REGISTROS/0267.md. |
| RM-0255-OWNER | Validação pessoal das telas, conta e MFA do proprietário. | P0 | PENDING_OWNER | 0268 | Ação do proprietário no navegador e confirmação | Nenhuma credencial, sessão, MFA ou keystore persistente foi usada nesta campanha. | Proprietário confirma no Chrome Android; senha, QR, cookies e recovery codes não são compartilhados. |
| RM-0234-DR-EXTERNAL | Cópia externa independente, RPO/RTO e recuperação em outro Termux/servidor. | P0 | BLOCKED_EXTERNAL_DEPENDENCY | 0268 | Destino/custódia autorizados e host de recuperação | Recuperação externa foi deixada manual; sem upload autorizado ou DR independente atual. | Recovery set autenticado copiado sob autorização e restore isolado comprovado; RPO/RTO aprovados. |
| RM-0242-ANDROID-PHYSICAL | Validar Chrome Android físico, GPS/câmera/impressora/QR e interrupção do Termux. | P2 | BLOCKED_DEVICE_VALIDATION | 0268 | Aparelho físico autorizado | CDP não comprova sensores nem browser móvel físico. | Checklist físico documentado com captura sanitizada e recuperação após reinício. |

## Roadmap aprovado

| Campanha | Objetivo inicial | Estado inicial | Dependências principais | Critério de conclusão |
|---|---|---|---|---|
| 0256 | Configurações e navegação | PARTIAL | CRUD autenticado pelo runit; credenciais comerciais; validação física Android | Ajustes centralizados; páginas próprias; sem modal/atalho legado; CRUD e ações externas comprovados conforme suas dependências. |
| 0256-C | Equipe, permissões e Sistema local | PARTIAL | Vínculo operacional Driver por UI; suíte integral sem corrida do teste de backup | Usuários/perfis/convites autorizados e Sistema local separados de RBAC; fluxo de motorista demonstrado sem vínculo automático. |
| 0256-D | Integrações, origens de pedidos e laboratório duplicado | PLANNED | Estado real das integrações; revisão de navegação duplicada | Preservar iFood/99Food/Keeta, normalizar origens e consolidar laboratórios sem perder recursos. |
| 0256-E | Sistema, backup e recuperação | PLANNED | E2E reversível e controles de recuperação | Comprovar estado local/servidor, backup e recuperação; diagnosticar concorrência sem tocar em dados oficiais. |
| 0256-F | Auditoria visual e E2E final | PLANNED | 0256-C/D/E e Chrome Android owner review | Regressão completa visual/funcional nos viewports, temas, navegação e fluxos autenticados. |
| 0257 | Administração global | PARTIAL | Identidade global sintética; schema E2E | Painel positivo/negativo funcional e auditado, sem promoção persistente. |
| 0258 | Fundador e privilégios | BLOCKED_AUTHORIZATION | Evidência histórica e aprovação explícita | Proposta reversível revisada; alteração persistente somente após gate. |
| 0259 | Identidades, convites e vínculos empresariais | PARTIAL | E2E sintético; corridas transacionais e ações administrativas na UI | Fluxo principal e reuso sequencial de User em tenant adicional comprovados até 0260; fechar concorrência e reenvio/revogação Browser. Ver REGISTROS/0259.md e 0260.md. |
| 0260 | Equipe, permissões, Motoboys e convites | PARTIAL | 0259; contrato Driver e política MFA | Perfil/membership editáveis e revogação de sessão; Driver por sync com RBAC/revisão/readback. User canônico sem API; concorrência e identidade existente em outro tenant seguem abertas. Não iniciar 0261. |
| 0261 | Persistência empresarial e consistência de localização | PARTIAL | Contrato Company, endpoints autorizados, fixture rollback e DOM de ambas as telas | Company Profile passou ACK/readback/reload/segunda sessão; coordenadas Company sintéticas foram iguais no DOM Empresa/Logística; origem custom ficou separada. Clique/confirmar do mapa passou com ACK/readback; todos os campos restantes, sync/pull Motoboy e negativos de retry/draft seguem pendentes. Ver REGISTROS/0261.md. |
| 0262 | Sincronização | PARTIAL — executada | Outbox/inbox e protocolo canônico | Correção de foreground e Company pull entre apps passaram em CDP; completar offline no envio, conflitos/concorrência independente, ACK perdido e outbox pendente autenticada. Ver REGISTROS/0262.md. |
| 0263 | Runtime permanente, estabilidade e E2E | PARTIAL — executada | Runtime E2E 8787 e fixture autenticada reversível | npm test dos dois, sync, identidade HTTP e domínio sync passaram; Browser anônimo em 8083/8084 20 viewport/tema, offline/recovery sem JS/5xx; reinício exclusivo 8787 restaurado. Browser autenticado diretamente no runtime permanente segue bloqueado sem fixture descartável; suíte migrations exige NODE_ENV=test e banco descartável para DOWN/cleanup. Ver REGISTROS/0263.md. |
| 0264 | Operação Restaurante/Motoboy | PARTIAL — executada | Contratos Order/Delivery/Route/Driver/Event; fixtures reversíveis 0260/0263 | Fluxos direcionados de dispatch, RETURN, ACK, idempotência, RBAC e tenant passaram; corrida real, jornada Browser ponta a ponta e npm test Restaurante permanecem pendentes. Ver REGISTROS/0264.md. |
| 0265 | Integrações locais | PARTIAL | Runtime/adaptadores existentes | Páginas e estados funcionais localmente para cada adaptador disponível. |
| 0266 | Validação de provedores e preparação para homologação | PARTIAL / BLOCKED_EXTERNAL_DEPENDENCY | Onboarding, especificação/versionamento, sandbox, app/loja de teste, credenciais e autorização por provedor | Evidência local não equivale a homologação. Manter cada provider separado; critérios e próximos passos em REGISTROS/0266.md. Nenhum dos três está READY_FOR_SANDBOX ou PRODUCTION_READY. |
| 0267 | Relatórios e regressão funcional | PARTIAL | `RM-0267-REPORTS-REGRESSION`; snapshot local, readback canônico e projeção de executor | Corrigida contagem de operações Delivery, devoluções/reentregas, aliases de ID e filtros sem duplicar Order/finanças. `npm test` dos dois apps, analytics, territorial/logistics PostgreSQL transacionais e Browser autenticado sintético passaram; 36 capturas 360–1440 claro/escuro. CSV filtrado permanece uma linha por Order, neutraliza fórmula e omite telefone/endereço. Snapshots do relatório não tiveram ACK/readback canônico nesta campanha; executor próprio/plataforma não foi inferido da origem; 403/409/tenant e Android físico permanecem pendentes. Ver REGISTROS/0267.md. |
| 0268 | Auditoria de lançamento | BLOCKED | Gates, dependências externas, aparelho e aprovação | Revisão de segurança/operação com evidências e bloqueios explícitos. |
| 0275 | Configurações de Logística e Frota | PARTIAL — executada | `RM-AUD19-02/03/10`, `RM-D1-SETTINGS-SAVE`, `RM-D1-LOCATION-CONSISTENCY`; fixture `rotamoto_e2e` com handlers reais | Correção de falso sucesso/draft, Route e perfil econômico com ACK/readback/retry/reload e comparador runtime comprovados. Geometria Route, edição provider, matriz de campos restante e validação física ainda pendentes. Ver REGISTROS/0275.md. 0276 não iniciada. |
| 0276 | Geometria viária, mapas e configurações logísticas | PARTIAL — executada | OSRM configurado/autorizado para E2E; `Route`/`Delivery` canônicos e atualização de sequência sob ownership Restaurante | Fail-closed/retry dos dois mapas e origem Company/custom foram provados; polyline real não foi produzida porque `routeDistanceProvider`/`osrm-routed` estão ausentes. Providers e limpar perfil econômico passaram ACK/readback/reload. Atualização após conclusão/reordenação depende de revisão/planejamento canônico e motor real. Ver REGISTROS/0276.md. 0277 não iniciada. |
| 0277 | Viabilidade e implantação controlada do OSRM no Termux | BLOCKED | Nenhum pacote/binário Termux OSRM; build nativo não validado para Bionic; autorização para pacotes, compilação e PBF OSM custom, ou host Linux ARM64 isolado | Nenhuma instalação/download/serviço executado. Provider existente pode ser injetado no fixture; falta geometria real, endpoint e Browser nos dois apps. Duração não é exposta e não pode virar ETA sem semântica contratual. Ver REGISTROS/0277.md. 0278 não iniciada. |

## Regra de manutenção

Não remover uma linha porque houve campanha relacionada. Atualizar estado somente após validar a evidência; conservar o ID e a origem. Cada campanha atualiza este backlog e liga itens ao registro numerado. A implantação não é globalmente concluída enquanto itens P0 estiverem `PARTIAL`, `BLOCKED` ou `PENDING_OWNER`.

## Atualização 0264 — integração operacional Restaurante ↔ Motoboy

**PARTIAL.** Browser/CDP autenticado transacional confirmou Driver sintético, auto-dispatch opt-in, presença não elegível antes de confirmação, atribuição, ACK/replay duplicado, leitura cruzada negada e 20 combinações de layout (dois apps × cinco larguras × dois temas) sem overflow/erro JS. Browser de cancelamento pós-coleta confirmou marketplace iFood como origem com executor próprio, uma RETURN no fim da rota, recuperação após 503 e handover no Motoboy. PostgreSQL transacional passou cancelamento antes/depois da coleta, sequência/revisão, idempotência, receipt RBAC/CSRF/tenant, manutenção da rota e ausência de duplicação financeira.

`npm test` Motoboy passou; `npm run test:logistics`, `npm run test:sync`, `test:logistics-postgres` e `test-domain-sync-postgres.js` do Restaurante passaram. O `npm test` completo do Restaurante falhou no teste de certificado de backup (`asn1 ... illegal padding`), alheio a esta campanha, e o processo foi interrompido após permanecer aberto. Corrigido somente o runner de Browser legado: status administrativo usa `ACTIVE`/`DISABLED`, distinto de OperationalAvailability `online`/`offline`; sync espera estado `ready`. Nenhum aplicativo foi alterado.

Continuam pendentes para `RM-0264-OPS-FLOW`: uma única jornada Browser com aceite/coleta/entrega/proof e receipt, concorrência real em conexões independentes, confirmação física de impressão/Chrome Android e fluxos externos (sem ativar integração real). Os demais itens RM-AUD19-01..19 e dependências históricas preservam o estado; `RM-AUD19-09` não foi reclassificado. 0258 continua `BLOCKED_AUTHORIZATION`; 0265 não foi iniciada. Detalhes em [REGISTROS/0264.md](REGISTROS/0264.md).


## Atualização 0261 — persistência empresarial

**PARTIAL.** Causa visual comprovada em `app.js`: hidratação canônica atualizava o estado/input do endereço, mas não os dois readouts de coordenadas nem o mapa já montado. A tela podia combinar endereço atual com coordenadas locais antigas. A hidratação agora sincroniza os readouts e marcador; a confirmação de localização exige ACK e GET canônico com endereço, par de coordenadas, proveniência e revisão coincidentes.

Browser/CDP autenticado comprovou edição de nome/telefone pela UI, API Company readback, localização sintética em Empresa e Logística/Frota no DOM, custom origin independente, reload, segunda sessão, 400/409 e 403 para perfil limitado. Dez verificações viewport/tema, sem overflow, erro JS ou HTTP 5xx. `npm test` dos dois aplicativos passou. Erro de rede/retry/draft, todas as configurações e snapshot/pull do Motoboy não foram cobertos; RM-AUD19-02/03/10 e os aliases Company permanecem PARTIAL. Manifesto `f8621e7b-cfc6-40d2-8945-581f03f4d54a` COMPLETED, `databaseCommitted=false`, contagens finais tenant zero; API readiness 200 após restauração. Sem banco oficial/credenciais/MFA/roles/grants; sem Chrome Android físico. Registro: [0261](REGISTROS/0261.md), [Browser report](../browser-tests/evidencias/campanhas/0261/report.json). 0262 continua apenas planejada; não iniciada.


## Atualização da campanha 0280 — autenticação E2E e localização

**PARTIAL.** Fixture existente autenticou sessões sintéticas com MFA real e rollback; perfil Company teve ACK/readback. Correção no Restaurante remove geocodificação automática e limpa coordenadas antigas quando endereço muda sem confirmação. O clique Browser não produziu PUT de localização, impedindo conclusão da persistência e sincronização Motoboy. Próximo trabalho funcional: reproduzir esse caminho e validar ACK/readback/reload/segunda sessão, Motoboy e matriz dirigida de falhas. `npm test` Restaurante e Motoboy passou. Não reclassificar problemas globais. 0258 BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL. Registro: REGISTROS/0280.md.


## Atualização da campanha 0281 — histórico e localização

**PARTIAL.** O commit 0280 estava somente na branch de campanha; fast-forward não destrutivo levou `main` a `ff35fa3f96c42b8c06f8206c013185fb3469108a`, cuja leitura remota confirmou registro e evidências. PUT ausente era falha no helper CDP sem `clickCount`; com o clique efetivo, endereço teve ACK/readback, coordenadas mantidas desconhecidas até confirmação manual, e sync + IndexedDB Motoboy confirmados após reload. Sem mudança em código de produção. Restam tela renderizada Motoboy, matriz Browser visual e falhas/concorrência/tenant. `npm test` dos dois apps passou. Não resolver itens globais com subset. 0258 BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL. Ver REGISTROS/0281.md.


## Campanha 0292 — continuidade de configurações

RM-AUD19-02/03/10 permanecem PARTIAL globalmente. Browser comprovou Empresa (nome, telefone, fuso, endereço), ACK/readback e persistência após navegação/reload/aba; corrigidos feedback pós-render e coordenadas null em Logística. Outras categorias editáveis e UI Motoboy aguardam prova funcional por campo. Pendências de distribuição 0289 preservadas. Não iniciar 0293 automaticamente. [Registro 0292](REGISTROS/0292.md).
