## Pendências vigentes — Campanha 0299

- Aguardando avaliação visual humana da POC autenticada Início v2; pedir aprovação ou divergências concretas antes de qualquer integração à página padrão.
- Chrome Android físico, integração de ações operacionais, persistência/negócio e Motoboy não foram escopo nem validados. Não atribuir PASS a esses itens.
- Ocorrências originais e aliases preservados; RM-AUD19-13 continua PARTIAL global, com PASS_SCOPE restrito à POC. 0258 permanece BLOCKED_AUTHORIZATION; ORS PENDING_EXTERNAL_CREDENTIAL.

Ver [REGISTRO 0299](REGISTROS/0299.md).

---

## Atualização — Campanha 0298 (2026-10-23)

- `PARTIAL`: auditoria estrutural do painel gerou [matriz de cobertura 0298](EVIDENCIAS/0298/matriz-cobertura-interface.md); ainda não há Browser de cada área/componente.
- `PARTIAL`: Design System implementado em tokens e primitives, mas CSS especializado/legado requer harmonização e QA tela a tela.
- `PARTIAL`: navegação responsiva e Início passaram subset autenticado; telas de dados, formulários, modais, impressão/QR e operações não foram revalidadas globalmente.
- `PARTIAL`: gestão avançada está mapeada mas ainda não é módulo/rota independente.
- `PARTIAL`: assets servidos em 127.0.0.1:8083 são iguais ao workspace; comportamento service worker/cache e Chrome Android físico não confirmados.
- Permanecem todos os IDs cumulativos e aliases, incluindo RM-AUD19-01/02/03/10/13/18, RM-AUD22-20..22, RM-AUD26-01/02; nenhum PASS_GLOBAL novo. Distribuição/concorrência 0289, 0258 `BLOCKED_AUTHORIZATION` e ORS `PENDING_EXTERNAL_CREDENTIAL` preservados.
- Ações futuras sem iniciar campanha: (a) jornadas por área, (b) persistência funcional por campo, (c) migração de Gestão avançada com deep links/RBAC, (d) validação física Android após rollout autorizado.

Ver [REGISTRO 0298](REGISTROS/0298.md) e [evidências](EVIDENCIAS/0298/).

---

## Atualização vigente — Campanha 0256-D (2026-10-19)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação |
|---|---|---|---|
| RM-0256D-MARKETPLACE-EXTERNAL | iFood/99Food/Keeta e homologação; P1; **PARTIAL_EXTERNAL** | UI e catálogo backend mostram estados não verificados com sessão sintética; cards em cinco viewports e dois temas; sem credenciais/chamadas externas. | Obter onboarding/credenciais e autorização para sandbox por fornecedor antes de verificar conectividade. |
| RM-0256D-LAB-ISOLATION | Laboratório sintético; P0; **PASS_LOCAL_SCOPE** | Browser autenticado provou stores operacionais intactas após criar pedido e transição; sem erros JS. | Manter teste automatizado e adicionar às regressões 0256-F. |
| RM-0256D-ANDROID | Chrome Android físico; P2; **PENDING_OWNER** | CDP 360–1440, claro/escuro, apenas emulação. | Proprietário verificar tela e teclado no aparelho real. |

A corrida de concorrência do módulo de backup da 0256-C permanece aberta e fora do escopo D; investigar em 0256-E. O vínculo Driver da equipe (0256-C), administradores locais, integração real e envio comercial permanecem pendentes. Campanhas 0256-E/F/0257 foram mantidas. Ver [REGISTRO 0256-D](REGISTROS/0256-D.md).

---

## Atualização vigente — Campanha 0256-C (2026-10-19)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação |
|---|---|---|---|
| RM-0256C-TEAM-RBAC | Equipe, convites, perfis e Sistema local; P0; **PARTIAL** | Browser autenticado sintético com 43 verificações; perfil sem chave manual/colisão, edição, perfil protegido, convite capturado, texto de Sistema local e regressões B1. HTTP PostgreSQL autenticado passou tenant/RLS, MFA, permissões e convite. | Provar pelo Browser o convite aceito ligado explicitamente a Driver da mesma empresa, com autorização negativa. |
| RM-0256C-FULL-SUITE | `npm test` integral; P1; **PARTIAL** | Após corrigir contrato compartilhado, duas execuções pararam em `test-backup-control.js` com `BACKUP_CONTROL_LOCK_UNSAFE`/`BACKUP_CONTROL_BUSY`; o teste passou isoladamente. | Repetir e diagnosticar corrida no escopo 0256-E; sem mexer em backup nesta campanha. |
| RM-0256C-ANDROID | Chrome Android físico e teclado; P2; **PENDING_OWNER** | Chromium/CDP 360, 390, 768, 1024 e 1440 px, claro/escuro. | Proprietário conferir no aparelho real, sem compartilhar credenciais ou fatores. |
| RM-0256C-HISTORY | Registro histórico; P1; **PASS** | `b71dda41492aad6a0ca0d83ca1efd9f2a373644d` em `origin/main`; fetch confirmou HEAD/remoto iguais e `git show` encontrou o registro. | Concluído. |

Ver [REGISTRO 0256-C](REGISTROS/0256-C.md) e [Backlog Mestre](BACKLOG_MESTRE.md). Integrações/origens/laboratório (0256-D), sistema/backup (0256-E), auditoria visual/E2E (0256-F) e administração global (0257) permanecem planejadas. Pendências anteriores de equipe/perfis, administradores locais, iFood/99Food/Keeta, laboratório duplicado, backup/recuperação e padronização continuam preservadas.

---

## Atualização vigente — Campanha 0256-B1 (2026-10-19)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação |
|---|---|---|---|
| RM-0256B1-PAGE-ISOLATION | Isolamento de Conta e segurança nas rotas operacionais; P0; **PASS técnico** | Raiz corrigida: página criada no host global não era desmontada ao trocar de aba. CDP autenticado verifica DOM completo pós-rolagem em Início, Entregas, Motoboys, Rotas, Relatórios, Eventos e Ajuda; 5 larguras × claro/escuro. | Proprietário confirmar no Chrome Android físico; runtime permanente fica para 0263. |
| RM-0256B1-ACCOUNT-FORMS | Troca de empresa e aceitação de convite; P1; **PASS técnico** | Campos responsivos empilhados e largura integral em 360/390 px; sem overflow nas cinco larguras. | Confirmar teclado virtual Android no aparelho. |
| RM-0256B1-HISTORY | Publicação do registro; P1; **PASS** | Push somente do histórico; commit de verificação `49a54f8dc671ed37b57de32e5948a7005cba5a2d` confirmado por fetch e `git show origin/main:REGISTROS/0256-B1.md` retornou o registro. | Concluído. |

A validação física no Chrome Android segue com o proprietário. Os endpoints de logística/analytics não fazem parte da fixture temporária transacional e responderam 404; não houve 5xx ou exceções JS. O Chromium headless com GPU desativada gerou três falhas vetoriais tratadas pelo fallback raster; não houve outros erros de console. Nenhuma alteração no banco oficial, MFA, vínculos reais ou privilégios persistentes. Pendências e campanhas seguintes foram mantidas.

---

## Atualização anterior — Campanha 0256-B (2026-10-19)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| RM-0256B-AUTH | Login, MFA, logout e expiração; P0; **PASS técnico** | CDP sintético: raiz operacional vazia antes de autenticar; MFA → Início; expiração/logout desmontam app; API anônima 401. | Proprietário confirmar no Chrome Android físico. |
| RM-0256B-CARDS | Ajustes e navegação; P0; **PASS técnico** | 18 cards, páginas, retorno/histórico/reload; 5 larguras × 2 temas sem overflow. | Manter categorias e verificar em campanhas seguintes. |
| RM-0256B-ACCOUNT | Conta e segurança; P0; **PASS técnico** | Página própria; MFA; troca autorizada 200 e não autorizada 403; recuperação/convite inválidos testados. | Sessões/dispositivos só entram se suporte real for implementado. |
| RM-0256B-ANDROID | Chrome Android físico; P2; **PENDING_OWNER** | CDP Chromium emulado; não comprova aparelho/teclado físico. | Proprietário confirmar visualização e teclado sem compartilhar credenciais. |
| RM-0256B-RUNIT | Browser pelo runtime permanente; P1; **PARTIAL** | Fixture temporária e transacional; rollback, `sv up` e readiness 200. | Continuar a validação do runtime permanente na campanha 0263. |
| RM-0256B-HISTORY | Publicação do registro; P1; **PASS** | Push somente do histórico; fetch confirmou `origin/main` em `f3899d9` e `git show origin/main:REGISTROS/0256-B.md` retornou o registro. | Concluído. |

Issues 01, 02, 03 e 11 estão documentados e corrigidos no [registro 0256-B](REGISTROS/0256-B.md). As pendências de Equipe/perfis, sistema local/admins locais, integrações iFood/99Food/Keeta, laboratório duplicado, backup/recuperação, padronização de formulários e campanhas 0256-C/D/E/F e 0257 permanecem preservadas no backlog.

---

## Atualização anterior — Campanha 0256-A (2026-10-19)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| RM-0256A-NAV | Navegação Ajustes; P0; **PASS** | CDP autenticado: página inicial Início; categorias Empresa/Equipe/Motoboys/Integrações únicas, sem overlay, atalho ou tabs internas duplicadas. | Nenhuma correção adicional no escopo. |
| RM-0256A-COMPANY-HYDRATION | Dados canônicos Empresa; P0; **PASS** | PostgreSQL E2E sintético gravou/relê nome, telefone, fuso e endereço; mesmos valores em seis estados viewport e após reload. | Proprietário confirmar no Chrome Android físico. |
| RM-0256A-FORM-ERRORS | Carregamento, rascunhos, erro e salvamento; P0; **PASS técnico** | Resposta lenta manteve gravações desabilitadas; 401/403/rede deram feedback e não habilitaram gravações; nova leitura recuperou estado canônico. | Validar experiência física e quaisquer particularidades do dispositivo. |
| RM-0256A-SETTINGS-REGRESSION | Responsividade e páginas administrativas; P1; **PASS em Chromium** | 360/390/768/1024/1440, claro/escuro, 34 capturas, zero JS/overflow; `npm test` completo passou. | Confirmação física segue PENDING_OWNER. |
| RM-0256A-RUNIT-BROWSER | Browser autenticado pelo runit/runtime; P1; **PARTIAL** | Fixture de browser usou listener temporário transacional; runit restaurado e `/health` 200. | Continuar em 0263 com harness seguro para processo permanente. |
| RM-0256A-ANDROID-PHYSICAL | Chrome Android físico; P2; **PENDING_OWNER** | CDP emulado não comprova o aparelho físico nem interação real com teclado/Chrome. | Proprietário confirmar Ajustes móvel e modo computador, sem compartilhar credenciais. |
| RM-0256A-COMMERCIAL | Conexão real iFood/99Food/Keeta; P1; **BLOCKED_EXTERNAL_DEPENDENCY** | Páginas e estados locais abrem pela API; nenhuma conta comercial autorizada ou conectada. | Fornecer onboarding/credenciais e autorização comercial quando disponíveis. |
| RM-0256A-HISTORY | Publicação desta campanha; P1; **PENDING_PUBLICATION** | Registro e resumo preparados; sem afirmar publicação antes de verificar SHA remoto. | Commit/push somente `rota-moto-historico`, fetch e confirmação do registro em `origin/main`. |

Ver [REGISTRO 0256-A](REGISTROS/0256-A.md), [resumo](RESUMOS/0256-A.md) e [Backlog Mestre](BACKLOG_MESTRE.md).

## Atualização anterior — Campanha 0256 (2026-10-19)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| RM-0256-SETTINGS | Ajustes, navegação e páginas administrativas; P0; **PARTIAL** | Browser autenticado sintético/CDP: Início, sem overlay/atalho legado, páginas Empresa/Equipe/Motoboys/Integrações, cinco viewports e dois temas. | Provar CRUD/releitura autenticados em E2E pelo runit sem alterar dados do proprietário. |
| RM-0256-PROVIDERS | iFood, 99Food e Keeta; P1; **PARTIAL / BLOCKED_EXTERNAL_DEPENDENCY** | Três páginas e leitura real do estado; clique de atualização testado; sem conexão comercial confirmada. | Configurar credenciais/onboarding e homologar com autorização do proprietário; não exibir conectado antes de confirmação real. |
| RM-0256-RUNIT-BROWSER | Browser pelo runit/role runtime; P1; **PARTIAL** | Serviço readiness 200 após o teste; Browser usou listener isolado com fixture e rollback. | Preparar prova autenticada via processo permanente/role runtime com identidade sintética descartável. |
| RM-0256-HISTORY | Publicação do registro/backlog; P1; **PASS** | Commit `bf93e967722a93cfe0572b7138c8dae9301708f3`, fetch e `ls-remote` iguais; registro presente em `origin/main`. | Publicado. |
| RM-0256-OWNER-ANDROID | Validação física do Chrome Android; P2; **PENDING_OWNER** | CDP validou dimensões/temas, mas não o aparelho físico nem modo “Site para computador”. | Proprietário confirmar visualmente no aparelho sem compartilhar senha, MFA ou cookies. |

Ver [REGISTRO 0256](REGISTROS/0256.md) e [Backlog Mestre](BACKLOG_MESTRE.md).

## Atualização vigente — Campanha 0254 (2026-10-18)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0254-REPORTS | Oito seções, responsividade, filtros e CSV; P0; **PASS** | `npm test` completo; CDP autenticado sintético no app 8083, 5 larguras × 2 temas, amostra/vazio, API E2E real via fixture transacional, CSV e 72 capturas antes/depois. | Nenhuma ação de código pendente para o escopo. Para inspeção física do Chrome Android, proprietário pode recarregar a aplicação e confirmar visualmente. |
| 0254-RUNIT-BROWSER | Browser autenticado via processo runit/role operacional; P2; **PARTIAL** | Runit readiness 200 antes/depois; durante a fixture os handlers reais foram servidos por listener transacional na 8787 para rollback e não pela instância runit. | Se a prova via role `rotamoto_e2e_app` for necessária, preparar fixture segura não transacional ou harness runtime isolado sem mutação persistente do proprietário. |
| 0254-LOGISTICS-SAMPLE | Gráficos de logística com eventos persistidos; P2; **EMPTY_STATE_VERIFIED** | Os endpoints do PostgreSQL E2E não tinham amostra logística; UI mostrou vazio. Amostra visual local foi sintética e efêmera. | Nenhum seed persistente foi feito. Se necessário, usar fixtures reversíveis em transação para exercitar dados não vazios da API. |
| 0254-HISTORY-PUBLISH | `origin/main`; P1; **PASS** | `ae0f5078cc540ded4467ca015d39f9a340162f5f` foi publicado; fetch confirmou igualdade do SHA e presença do registro, resumo e matriz. | Concluído. |

## Atualização vigente — Campanha 0252 (2026-10-18)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0252-PLATFORM-FOUNDER | Administrador global/fundador; P0; **BLOCKED_AUTHORIZATION_GATE** | Registro 0234 especifica primeiro proprietário e diz que CLI real não foi executado; sem evidência verificável de fundadora global ou conjunto de endpoints de administração global. Nenhuma conta promovida/migration aplicada. | Proprietário aprovar desenho de papéis e comprovar identidade histórica antes de proposta de migration reversível; depois autorizar explicitamente qualquer concessão. |
| 0252-RUNIT-BROWSER | Browser autenticado via runit/`rotamoto_e2e_app`; P0; **PARTIAL** | Fixture 0252 usa handlers reais e `rotamoto_e2e`, 12 fluxos/17 viewports, mas substitui temporariamente o listener runit e usa role do harness. Serviço restaurado/readiness 200. | Criar autenticação sintética via runit/runtime role, sem tocar no owner nem reter dados de teste; validar UI e limpar com rollback seguro. |
| 0252-DRIVER-EMAIL | Cadastro email → convite → ativação; P1; **PARTIAL** | Campo de email opcional validado foi adicionado; UI avisa que não envia convite nem cria conta. Jornada de criação desse campo via browser não executada. | Testar registro operacional sintético, convite local, identidade já existente, aceitação, vínculo, cancelamento/expiração e revogação. |
| 0252-PROVIDER-ACTIONS | Repetição/erros de iFood, 99Food, Keeta; P1; **PARTIAL / EXTERNAL** | Formulários/avisos usam região substituível; sem autorização comercial. Tentativa Browser do botão repetido não localizou o seletor e foi removida do harness; não foi afirmada como PASS. | Validar clique repetido e erros HTTP via Browser; obter credenciais/onboarding externo somente com autorização antes de conectar. |
| 0252-REPORTS-VISUAL | Relatórios/CSV; P1; **PARTIAL** | Agregação canônica e renderer existentes; suíte analytics passou. Nenhuma inspeção autenticada de relatórios/CSV em todos os viewports/temas nesta campanha. | Fazer revisão Browser autenticada em 360/390/768/1024/1440 e validar filtros, regiões, vazios e CSV sem dados sintéticos em gráficos. |
| 0252-CROSS-TAB-SYNC | Atualização entre abas, dispositivos e outage; P1; **PARTIAL** | Após operações de Empresa, a UI atualiza por snapshot servidor; fluxo 0251/0252 provou ACK canônico em fixture. Não se provaram broadcast multipágina, offline/reconexão, conflito, ou indicador visual do ACK. | Implementar/validar mecanismo coerente sem polling excessivo; mostrar local/pending/ACK apenas com confirmação. |
| 0252-OWNER-CHECK | Sessão/MFA persistente do proprietário; P0; **PENDING_OWNER** | Conta, senha, MFA, keystore e dados persistentes não foram usados nem alterados. | Proprietário validar pessoalmente em Chrome Android; não compartilhar senha, cookie, QR TOTP nem códigos. |
| 0252-OFFICIAL-DB | Banco oficial `rotamoto`; P0; **PASS_PRESERVED** | Nenhuma conexão de escrita/migration/promoção foi realizada. | Continuar sem alterações oficiais até autorização explícita e plano de rollback aprovado. |
| 0252-HISTORY | `origin/main`; P1; **PASS** | Commits `3c97a06` e `10603dd` fetch-verificados; registro, resumo e matriz confirmados. | Nenhuma ação; campanha publicada. |

Ver [REGISTRO 0252](REGISTROS/0252.md) e [matriz funcional](MATRIZ_BACKEND_FRONTEND_0252.md).

## Atualização vigente — Campanha 0251 (2026-10-18)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0251-RUNIT-AUTH-BROWSER | API E2E autenticada no processo runit; P0; **PARTIAL** | 11 jornadas Browser sintéticas passaram com handlers reais e PostgreSQL E2E em listener transacional temporário; o runit foi restaurado, readiness 200. Harness usa `rotamoto_app`/`rotamoto_migrator`, não `rotamoto_e2e_app`. | Preparar mecanismo isolado para emitir identidade/sessão temporária via runit sem persistir dados; preservar role e keystore existentes; repetir browser e limpar de modo comprovável. |
| 0251-OWNER-CHECK | Conta persistente e MFA do proprietário; P0; **PENDING_OWNER** | Conta pessoal, senha, MFA e keystore não foram usados nem alterados. | Proprietário validar a sessão pessoal no Chrome Android; não enviar senha, QR, cookie ou código. |
| 0251-SYNC-STATUS | Indicador e recuperação de rede; P1; **PARTIAL** | Browser-origin sync obteve ACK `accepted` e o registro canônico foi confirmado no PostgreSQL E2E. Não foi exercitado o indicador global nem falha de rede/reconvergência. | Testar status local/pendente/ACK/outage com UI e fixture, sem exibir “Sincronizado” sem confirmação canônica. |
| 0251-MARKETPLACE | iFood/99Food/Keeta; P1; **BLOCKED_EXTERNAL_DEPENDENCY** | As três páginas carregam status real de backend e não indicam conexão; nenhuma autorização comercial foi iniciada. | Obter onboarding, credenciais e autorização externa; testar loja/sincronismo após disponibilidade. |
| 0251-PLATFORM-ADMIN | Administração geral; P1; **AUTHORIZATION_GATE** | Nenhum privilégio global concedido; não foi comprovada UI global. | Aprovar desenho de papéis e eventual migração reversível antes de conceder qualquer role global. |
| 0251-INVITE-EDGE | Revogação/cancelamento/expiração e motorista desativado ou de outro tenant; P1; **PARTIAL** | Convite, ativação, vínculo ativo, unlink em sessão ativa e negação API foram exercitados; casos restantes não foram repetidos no Browser desta campanha. | Completar cenários adicionais com fixtures rollback; sem tocar nos dados do proprietário. |
| 0251-HISTORY-PUBLISH | `origin/main`; P1; **PASS** | Publicações documentais `3ace996` e `9096f81` foram verificadas por fetch; o registro e resumo existem na branch padrão. Esta versão final também é publicada e conferida antes da entrega. | Nenhuma pendência após confirmação do SHA final. |

Ver [REGISTRO 0251](REGISTROS/0251.md), [resumo](RESUMOS/0251.md) e [matriz](MATRIZ_BACKEND_FRONTEND_0250.md).

## Atualização vigente — Campanha 0250 (2026-10-18)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0250-AUTH-BROWSER | Administração/convites/Motoboy autenticados; P0; **PARTIAL** | Suítes HTTP PostgreSQL com fixture/rollback passam; CDP desta campanha foi anônimo. | Criar fixture browser autenticada isolada e validar as páginas Empresa/Equipe/Motoboys/Integrações e estado Motoboy sem vínculo. |
| 0250-COMPANY-PERSISTENCE | Perfil da empresa/reload; P1; **PARTIAL** | Endpoints e testes existentes; não se observou formulário autenticado salvando, recarregando e consultando PostgreSQL via UI. | Demonstrar salvamento e reload com tenant sintético e rollback; nunca no oficial. |
| 0250-SYNC-ACK | Outbox → API → PostgreSQL → ACK; P1; **PARTIAL** | Teste domain/sync PostgreSQL com rollback passou; não houve sessão Browser real emitindo ACK. | Completar prova observável via UI com fixture autenticada, retry e confirmação canônica. |
| 0250-PROVIDERS | iFood/99Food/Keeta; P1; **BLOCKED_EXTERNAL_DEPENDENCY** | Runtime indica conexão comercial não verificada/bloqueada; sem credenciais, homologação ou autorização externa. | Obter acesso de onboarding e autorização do provedor; depois validar conexão segura, lojas e sincronismo sem falsa confirmação. |
| 0250-PLATFORM-ADMIN | Administração geral RotaMoto; P1; **PARTIAL / AUTHORIZATION_GATE** | Não foi comprovada UI global separada; nenhum privilégio foi promovido. | Projetar fluxo explícito com migration auditável/rollback e obter autorização antes de qualquer concessão. |
| 0250-OWNER-CHECK | Sessão persistente do proprietário/MFA; P0; **PENDING_OWNER** | Nenhuma credencial/sessão pessoal foi usada; dados e MFA não foram alterados. | Proprietário validar pessoalmente as telas no navegador; não compartilhar senha, QR ou códigos. |
| 0250-HISTORY-PUBLISH | Histórico em `origin/main`; P1; **PASS** | Registro, resumo e matriz publicados e confirmados após `fetch`. | Nenhuma ação pendente para publicação desta campanha. |

Ver [REGISTRO 0250](REGISTROS/0250.md), [resumo](RESUMOS/0250.md) e [matriz](MATRIZ_BACKEND_FRONTEND_0250.md).

## Atualização anterior — Campanha 0247 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0247-OWNER-DRIVER-LINK | Membership persistente do proprietário; P0; **BLOCKED_READ_ONLY_AUTH** | Bootstrap não cria Driver; as fixtures provam negação sem vínculo. A role auditor não autenticou e o estado persistente não foi alterado. | Operador com leitura E2E autorizada confirmar se a membership possui Driver ativo; sem alteração de cadastro. |
| 0247-OWNER-BROWSER | Acesso pessoal Motoboy; P0; **PENDING_OWNER** | CDP anônimo confirma shell/estado sem sessão, não o resultado da conta persistente. | Proprietário recarregar `http://127.0.0.1:8084` e confirmar o bloqueio/estado que vê; não enviar credenciais. |
| 0247-AUTH-BROWSER | Administração e fluxo de motoboy; P1; **PARTIAL** | 12 cenários CDP anônimos passaram visualmente; testes de serviço/API sintéticos anteriores passaram. Interações de UI autenticada não foram exercitadas. | Preparar fixture sintética autenticada e testar CRUD empresa/equipe/driver, convite e vínculo no browser sem email real. |
| 0247-DELIVERY-PAGES | Validação das páginas iFood/99Food/Keeta; P1; **PARTIAL** | Páginas separadas existem com estados, autorização suportada, lojas e pedidos. Browser autenticado não foi executado; nenhum endpoint de teste ativo externo existe e as contas comerciais não foram conectadas. | Validar navegação com fixture autenticada; manter teste externo e conexão comercial pendentes até existir endpoint seguro e credenciais/autorização do parceiro. |
| 0247-PLATFORM-ADMIN | Administração global RotaMoto; P1; **PARTIAL** | Separação de papel identificada; UI global não demonstrada e nenhum privilégio concedido. | Definir fluxo/migração auditável e obter autorização antes de elevar qualquer identidade. |
| 0247-COMPANY-PERSISTENCE | Carregamento e salvamento autenticados; P1; **PARTIAL** | Fonte canônica PostgreSQL e cache IndexedDB documentados; não foi acessado pelo proprietário nem provado reload autenticado nesta retomada. | Validar perfil com identidade sintética/fixtures, verificar PostgreSQL após salvar e reload, sem mexer no banco oficial. |
| 0247-SYNC-ACK | Confirmação real no PostgreSQL; P1; **PARTIAL** | UI não reutiliza sucesso entre usuário/empresa/Driver e considera fila pendente; não foi obtido ACK autenticado nesta retomada. | Criar fixture transacional e demonstrar outbox→API→PostgreSQL→ACK, replay e desconexão/reconvergência. |
| 0247-HISTORY-PUBLISH | Histórico `origin/main`; P1; **PASS_VERIFIED** | `fetch` confirmou SHA local/remoto `30d59a5905fbc52089fe5c55e596160422679d29`; registro, resumo e matriz presentes em `origin/main`. | Concluído. |

Ver [REGISTRO 0247](REGISTROS/0247.md) e [RESUMO 0247](RESUMOS/0247.md).

## Atualização vigente — Campanha 0246 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0246-LIVE-BROWSER-MFA | Browser autenticado via 8083→8787; P0; **BLOCKED_SYNTHETIC_FIXTURE** | Loader/provedor e teste HTTP PostgreSQL transacional passaram; processo runit reiniciado/readiness OK. Sem fixture autenticável segura no serviço live; não usado o owner persistente. | Preparar harness de fixture temporária transacional que use a rota real e keystore controlado, ou aguardar confirmação pessoal do proprietário; testar mobile/desktop, enrollment e TOTP sem gravar dados duráveis. |
| 0246-OWNER-MFA | Conta persistente Chico; P0; **PENDING_OWNER** | Nenhuma sessão, senha ou fator real utilizado/modificado. | Proprietário recarregar `http://127.0.0.1:8083`, tentar enrollment e confirmar TOTP; compartilhar somente resultado, nunca segredos. |
| 0246-HISTORY-PUBLISH | Histórico; P1; **PASS_VERIFIED** | `REGISTROS/0246.md` e resumo publicados; `fetch` confirmou `origin/main` SHA `90c8148badee0740ec446b5c09809a1a60de64cd`. | Sem ação pendente para esta publicação. |

Ver [REGISTROS/0246.md](REGISTROS/0246.md) e [RESUMOS/0246.md](RESUMOS/0246.md).

## Atualização vigente — Campanha 0245 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0245-OWNER-MFA | Conta persistente Chico Restaurante; P0; **PENDING_OWNER** | Código e fluxo sintético passaram em browser/CDP e integração E2E rollback; sessão real não foi usada nem resetada. | Proprietário abrir/recarregar `http://127.0.0.1:8083`, iniciar enrollment, configurar autenticador, confirmar TOTP e guardar códigos de recuperação em local privado. Registrar apenas confirmação/resultados, sem segredo/QR/códigos. |
| 0245-CHROME-CACHE | Perfil Chrome do proprietário; P1; **OWNER_RELOAD_REQUIRED** | Asset/cache versionados e upgrade com cache antigo sintético verificado; perfil pessoal não inspecionado. | Recarregar página; se a versão antiga persistir, fechar e reabrir aba/PWA para ativar o worker atualizado. |
| 0245-HISTORY-PUBLISH | Histórico GitHub; P1; **PASS_VERIFIED** | Registro/resumo em `origin/main`; `git fetch` confirmou SHA local/remoto `66d5b5cd2b2b254ba553fd43e76635aee8993562`. | Nenhuma ação de publicação pendente nesta campanha. |

Ver [REGISTROS/0245.md](REGISTROS/0245.md) e [RESUMOS/0245.md](RESUMOS/0245.md).

## Atualização vigente — Campanha 0243 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0243-BOOTSTRAP-E2E | Empresa/owner E2E; P0; **BLOCKED_PRIVATE_TTY** | CLI restrito pronto e testado; banco vazio/latch disponível. Keystore E2E ainda não existe; TTY criado pelo Codex não aceita entrada do proprietário pelo canal de ferramentas. | Operador executar initializer local e Bootstrap E2E conforme guia; digitar senha sem eco diretamente no Termux. |
| 0243-OWNER-NAME | Nome pessoal; P2; **SCHEMA_LIMITATION** | `users` não contém campo de nome; `provisionInitialOwner` recebe empresa/email/chave idempotente. | Revisar contrato/schema em campanha separada antes de persistir nome pessoal; não alterar migration por atalho. |
| 0243-MFA-LOGIN | MFA e login autenticado; P0; **BLOCKED_BOOTSTRAP** | Sem segredo TOTP persistente nem sessão autenticada. | Após Bootstrap local, habilitar keystore apenas em `rotamoto-api-e2e`, enroll MFA, logout e novo login via CDP. |
| 0243-RESTAURANT-DRIVER | Onboarding e operação Restaurante↔Motoboy; P0; **BLOCKED_AUTH_SESSION** | Nenhum dado operacional foi gravado; smoke anônimo passou nos dois apps. | Com sessão autenticada, criar dados fictícios e executar o ciclo pedido/despacho/aceite/retirada/finalização sem marketplace externo. |

Ver [REGISTROS/0243.md](REGISTROS/0243.md) e [GUIA_BOOTSTRAP_MANUAL.md](GUIA_BOOTSTRAP_MANUAL.md).

## Atualização vigente — Campanha 0242-A (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0242-A-REVIEW | Evidências Browser/logs/perfis/backups; P2; **PRESERVED** | Removidos somente caches Chromium não rastreados; 0234–0242, dados de perfil, scripts, logs históricos e backups mantidos. | Avaliar por referência e hash em lotes individuais; não remover evidência única sem confirmação. |
| 0242-A-DF-BASELINE | Medição de disco; P3; **PARTIAL_PRECISION** | `df -h` reportou 53G antes (registro 0242) e depois; diferença de 46,3 MiB não aparece na unidade arredondada. | Em próxima limpeza, capturar `df -k` imediatamente antes e depois para delta exato do volume. |

Ver [REGISTROS/0242-A.md](REGISTROS/0242-A.md) e [RESUMOS/0242-A.md](RESUMOS/0242-A.md).

## Atualização vigente — Campanha 0242 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0242-INVENTORY | Uso de `~/projetos`; P1; **PARTIAL** | `df` informa 53G livres no filesystem compartilhado; varredura recursiva não concluiu. Totais exclusivos e top 30 não comprovados. | Reexecutar em lotes por subdiretório com leitura não concorrente; documentar total e maiores itens. |
| 0242-CLEANUP | Espaço temporário; P2; **NO_SAFE_CANDIDATE** | Nenhuma remoção; caches/evidências/scripts/perfis não foram comprovados sem dependências. | Rever categoria B por referências e atividade; criar manifesto antes de remoção autorizada. |
| 0242-E2E-COUNTS | Estado vazio; P1; **NOT_RECHECKED_PRIVILEGED** | Identidade do banco E2E e readiness confirmadas; role app não expõe contagens de domínio. Registro 0241 confirma vazio. | Em campanha de Bootstrap/prova ou com consulta read-only de privilégio mínimo, validar latch e contagens antes de escrita. |
| 0242-DANGLING-GIT | Objetos dangling; P2; **PRESERVED_FOR_REVIEW** | `git fsck --connectivity-only` não indicou erro fatal, mas encontrou objetos não alcançáveis em seis repositórios. | Mapear referências sem GC; decidir retenção só após relacionar a branches, reflogs ou trabalho histórico. |

Ver [REGISTROS/0242.md](REGISTROS/0242.md) e [RESUMOS/0242.md](RESUMOS/0242.md).

## Atualização vigente — Campanha 0241 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0241-BOOTSTRAP-PROVA | Prova E2E autenticada; P0; **READY_FOR_0242** | Banco vazio, latch disponível, 47 migrations, API E2E e frontends isolados prontos. Nenhuma identidade foi criada. | Na Campanha 0242, executar Bootstrap somente com fixtures fictícias, capturador local de email e Browser/CDP autenticado; manter a instalação oficial intocada. |
| 0241-OWNER-REAL | Proprietário real/MFA; P0; **PENDING_AUTHORIZATION** | Zero usuários e empresas no E2E após reset; nenhum proprietário oficial foi criado nem convite enviado. | Proprietário confirmar empresa, email e operação real; usar HTTPS definitivo antes do convite e MFA. |
| 0241-HTTPS-EXTERNO | Domínio/acesso remoto; P1; **BLOCKED_EXTERNAL_DEPENDENCY** | Nenhum domínio, DNS, certificado, VPN/túnel ou endpoint público foi inventado/configurado; serviços seguem em loopback. | Proprietário fornecer domínio/conta DNS e escolher VPN/túnel/proxy autorizado; então provisionar TLS e validar cookies/origins. |

Ver [REGISTROS/0241.md](REGISTROS/0241.md) e [RESUMOS/0241.md](RESUMOS/0241.md).

## Atualização vigente — Campanha 0236 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0236-IDENTITY-ENVELOPES | master key/keystore; P0; **BLOCKED_PRIVATE_INPUT** | Formato Salted CBC, tamanhos e mode 0600 verificados; descriptografia depende de passphrase. | Operador executar helper no Termux TTY sem eco; validar match e criar versão nova somente se stale. |
| 0236-BACKUP-KEY-COPY | Cópia independente; P0; **PARTIAL** | Pacote local contém somente recovery set PostgreSQL cifrado; chave de backup separada. | Localizar/validar envelope independente da chave e transferir pacote manualmente para destino aprovado. |
| 0236-HTTPS | Domínio/acesso externo; P1; **BLOCKED_EXTERNAL_DEPENDENCY** | Exemplo HTTPS placeholder não instalado; sem DNS/certificado/VPN/túnel. | Proprietário definir domínio e topologia segura; emitir TLS e testar origens/proxy/cookies. |
| 0236-FIRST-OWNER | Bootstrap/MFA real; P0; **BLOCKED_AUTHORIZATION** | Zero usuários oficial; checklist criado; nenhum email enviado. | Confirmar empresa, email e autorização explícita para bootstrap/convite após HTTPS válido. |
| 0236-DR-HOST | Recovery fora do dispositivo; P1; **PARTIAL** | Restore local descartável aprovado em 0235; não há host externo autorizado nesta campanha. | Preparar host PostgreSQL 18/Termux compatível, chave por canal separado, restore/health e medições RPO/RTO. |

Ver [REGISTROS/0236.md](REGISTROS/0236.md).

## Atualização vigente — Campanha 0235 (2026-10-17)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0235-RECOVERY-ENVELOPES | Recuperação keystore; P0; **PARTIAL** | Keystore SMTP funcional; arquivos de recovery persistem, mas integridade/atualização exigem passphrase do operador. | Operador valida/renova localmente e atualiza cópia externa, sem transmitir passphrase. |
| 0235-RESTORE-CURRENT | Recovery set pós-0047; P0; **RESOLVED** | Restore real via `pg_restore` em PostgreSQL 18 descartável; 47 migrations e zero mídia; cluster de rehearsal parado e privado. | Manter a cópia externa/offsite e repetir em outro host quando infraestrutura externa estiver disponível. |
| 0235-HTTPS-REMOTE | Acesso externo; P1; **BLOCKED_EXTERNAL_DEPENDENCY** | Sem domínio/DNS/certificado ou VPN/túnel. Serviços seguem loopback. | Disponibilizar domínio e escolher túnel/VPN autorizado; configurar HTTPS válido e testar cookies/convites. |
| 0235-FIRST-OWNER | Primeiro proprietário; P0; **BLOCKED_AUTHORIZATION** | Nenhum owner no oficial; SMTP de saída validado, sem envio. | Confirmar empresa, email do proprietário e autorização explícita de bootstrap/convite após HTTPS definitivo. |
| 0235-DR-ANDROID | Recuperação em outro host/reboot; P1; **PARTIAL** | Serviços runit ativos após reparo de estado stale; DR em instalação externa e reboot não exercitados. | Ensaiar restauração em outro Termux/servidor e inicialização após reboot autorizado. |

Ver [REGISTROS/0235.md](REGISTROS/0235.md).

## Atualização vigente — Campanha 0234 (2026-10-16)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0234-BOOTSTRAP-IDENTITY | Bootstrap, identidade e MFA; P0; **RESOLVED** | Bootstrap, ativação, MFA, recuperação MFA independente, concorrência/falhas, `npm test` em ambos e Browser/CDP desktop/mobile passaram em E2E descartável. | Nenhuma pendência de implementação identificada; primeiro provisionamento real depende de autorização operacional própria. |
| 0234-OFFICIAL-POSTGRES | Migrations oficiais 0045–0047; P0; **RESOLVED** | Recovery set oficial criptografado/autenticado verificado e restaurado em clone isolado; migrations rehearsed e aplicadas com `rotamoto_migrator`; ledger oficial íntegro em 0047, RLS/grants/índices/constraints validados. | Nenhuma pendência de schema identificada. Não provisionar usuários/empresa sem autorização específica. |
| 0234-EXTERNAL-READINESS | SMTP externo/HTTPS público/DR independente; P1; **PENDING_EXTERNAL** | Atualização estrutural oficial concluída; SMTP local e Browser com links sintéticos passaram. Não houve homologação SMTP/HTTPS externa, réplica/offsite independente nem ensaio DR de produção. | Homologar quando infraestrutura externa estiver disponível; não declarar prontidão de produção/DR sem evidências específicas. |

Ver [REGISTROS/0234.md](REGISTROS/0234.md).


## Atualização vigente — Campanha 0228 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0228-BACKUP-EXECUTOR / 0154, 0227, 0228 | Executor PostgreSQL; P0; **BLOCKED** | API e executor recusam execução no mesmo UID; Termux atual não tem UID/grupo dedicado configurado (UID/GID observado 10436). Job UI persiste em `QUEUED`; não foi executado como worker operacional. | Provisionar identidade/grupo dedicados por procedimento aprovado do host; executar backup agendado e manual com dados sintéticos, reinício e alertas sem reduzir guardas. |
| 0228-BACKUP-OFFSITE / 0154, 0184, 0227, 0228 | Storage externo/custódia; P0; **PARTIAL** | Adapter HTTP loopback PUT/HEAD/hash/manifeste testado; nenhum destino externo ou credencial real foi configurado/acessado. | Administrador autoriza destino; executor recebe segredo fora do painel; validar upload, checksum, confirmação e restore do conjunto sintético externo. |
| 0228-RESTORE-UI / 0154, 0227, 0228 | Painel de restore; P1; **PARTIAL** | API testa solicitante/aprovador distinto, MFA e target guards; restore PostgreSQL sintético passou em cluster isolado. Browser não percorreu inventário, pedido, aprovação e execução por UI. | Disponibilizar recovery set sintético isolado ao runner e completar Browser dual-admin do inventário/verificação até restore descartável, sem expor paths. |
| 0228-SCHEDULE-RETENTION / 0158, 0227, 0228 | Scheduler/retention/alertas; P1; **PARTIAL** | Persistência e próxima execução calculada testadas; executor e ciclo de agendamento operacional não foram iniciados. Retenção só ocorre após verificação/publicação segundo teste unitário. | Com executor segregado, demonstrar execução automática real, atraso/falha/restart, retenção e alerta no painel/runbook. |
| 0228-PRODUCTION-READINESS / 0158, 0227, 0228 | Backup/DR; P0; **BLOCKED** | Restore sintético em cluster descartável passou, mas faltam identidade operacional, offsite independente, custódia, agendamento monitorado, recuperação aprovada pela UI e RPO/RTO operacionais. | Fechar dependências acima, aprovar política/custódia e validar recovery set externo atualizado antes de elevar prontidão. |

Ver [REGISTROS/0228.md](REGISTROS/0228.md).

## Atualização vigente — Campanha 0227 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0227-BACKUP-ADMIN / 0154, 0168, 0184, 0226 | Painel Restaurante/API backup PostgreSQL; P1; **OPEN** | Ação `backup` atual exporta apenas IndexedDB Local-First; `backend/admin/http.js` não tem rota PostgreSQL de backup/restore. Pipeline existe somente em CLI. | Definir RBAC/MFA, workflow de aprovação e superfície de metadados; adicionar API e UI sem expor segredo/path/URL. Passa quando administrador autorizado opera jobs auditados sem Termux e usuário sem permissão é negado. |
| 0227-BACKUP-SCHEDULER / 0154, 0158, 0227 | Executor/agendamento; P1; **OPEN** | Código informa scheduler externo; cron consta somente como exemplo no runbook. Observação sem scheduler em Termux é histórica da 0158, não revalidada agora. | Implementar executor independente com agenda persistente, exclusão mútua, retomada segura e alerta de atraso; provar execução mesmo com painel fechado. |
| 0227-BACKUP-OFFSITE / 0154, 0168, 0184, 0226 | Storage/custódia/DR; P0; **BLOCKED por decisões operacionais** | Adapter remoto ausente; cópia independente e custódia separada não comprovadas. Chave e destino não foram acessados. | Operador aprova destino, custódia e política; implementar adapter cifrado, verificar upload e restore sintético externo autorizado antes de declarar DR. |
| 0227-BACKUP-POLICY / 0154, 0184, 0227 | Retenção/RPO/RTO/alertas; P1; **OPEN** | Retenção configurável apenas por ambiente CLI (default 30 dias); runbook pede decisões do operador; sem metas/alertas web. | Aprovar frequência, retenção, RPO/RTO e limites; exibir idade/cobertura do backup e alertar violações com critérios objetivos. |
| 0227-RESTORE-APPROVAL / 0154, 0184, 0227 | Restore/administração; P0; **PARTIAL** | CLI restaura somente em destino `rotamoto_disposable_*`; sem interface, preview de conjunto ou aprovação separada. Restore real sintético até 0044 é histórico (0184). | Criar pedido/preview, reautenticação e aprovação independente; manter targets oficial/E2E bloqueados no servidor e validar restore isolado end-to-end. |
| 0227-LOCAL-BACKUP-LABEL / 0227 | UX/segurança Local-First; P2; **OPEN** | UI chama export/import de “backup completo”, embora seja JSON plaintext local-first potencialmente sensível. | Diferenciar claramente cópia local de dados sincronizados e recovery PostgreSQL; comunicar conteúdo, proteção e limite de recuperação. |

Ver [REGISTROS/0227.md](REGISTROS/0227.md).

## Atualização vigente — Campanha 0221 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0221-RETURN-UI / 0212, 0207, 0218 | Cancelamento/custódia/rota; P1; **RESOLVED** | Run `f3478e88-6f98-4d67-9baa-675651d7ba79`: três pedidos/entregas e Route via UI; cancelamento após coleta criou uma única devolução ao fim; duas entregas concluídas antes do retorno; recebimento Restaurante via UI; retry 503 com um evento; pré-coleta sem RETURN. PostgreSQL E2E e capturas confirmam estados. | Critério desta pendência satisfeito. Continuar para a campanha 0222, que permanece gate separada para conciliação financeira positiva. |

## Atualização vigente — Campanha 0220 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0220-RACE-UI / 0217 | Despacho/Browser; P1; **PARTIAL** | Run 0217: dois perfis autenticados, HTTP concorrente `accepted` + `REVISION_CONFLICT`, replay duplicate, perdedor `DRIVER_NOT_ASSIGNED`; vencedor completou Delivery. | Acionar a disputa pelos controles autorizados da UI Restaurante na mesma jornada e verificar projeção logística nomeada no Restaurante. |
| 0220-RETURN-UI / 0218 | RETURN/custódia; P1; **OPEN** | Nenhum Browser novo de três pedidos UI até recebimento bilateral; unit e PG não substituem fluxo visual. | Criar três Orders/Deliveries/Route pela UI, cancelar após coleta, completar pendentes, devolver e confirmar recebimento; validar cancelamento pré-coleta. |
| 0220-FINANCE-TWO / 0219 | Financeiro/Earning; P1; **OPEN** | Money e Earning unitários passam; nenhum run novo com dois Earnings atribuídos às duas Deliveries. | Comprovar deliveryId/earningId, snapshot, 725 + 725 = 1.450 centavos e valores nas duas UIs/PG. |
| 0220-OUTAGE-WORKER / 0219 | Workers/resiliência; P1; **OPEN** | Testes de métricas e endpoint passam; worker real e `/api/ops/queues` durante indisponibilidade não observados. | Executar proxy isolado com operação pendente e worker real; medir fila, idade, retry, lease, UNKNOWN_OUTCOME, permissões e reconvergência. |
| 0220-PWA-MAP / 0215, 0216 | PWA/cartografia; P2; **PARTIAL** | Contratos/unitários passam; sem upgrade com outbox pendente ou screenshots cartográficos atuais nesta campanha. | Executar upgrade de SW real com storage persistente e screenshots desktop/mobile com coordenadas, markers, polyline e segunda parada. |

Ver [REGISTROS/0220.md](REGISTROS/0220.md).

## Atualização vigente — Campanha 0219 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0219-FINANCE-TWO / 0213, 0217 | Order/Earning/financeiro; P1; **OPEN** | Testes unitários de money/Earning passaram; não houve Browser com duas novas Deliveries concluídas e dois Earnings de 725 centavos cada. | Concluir duas entregas novas, associar cada `earningId` a seu `deliveryId`, provar snapshot e soma 1.450 centavos nas duas UIs e PG. |
| 0219-WORKER-OUTAGE / 0214, 0199 | Workers/filas/resiliência; P1; **OPEN** | Métricas, endpoint e lifecycle sintético passam; não houve worker PostgreSQL real durante outage/proxy com fila durável, `UNKNOWN_OUTCOME`, autorização 401/200/403 e recuperação no mesmo run. | Integrar fault injection com worker real em `rotamoto_e2e`; medir backlog/idade/retry/lease, readiness e convergência sem duplicação. |

Ver [REGISTROS/0219.md](REGISTROS/0219.md).

## Atualização vigente — Campanha 0218 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0218-RETURN-UI / 0212, 0215, 0207 | Cancelamento/custódia/rotas; P1; **OPEN** | Unit RETURN e logistics PG passaram; nenhum Browser novo criou três pedidos pela UI e concluiu recebimento bilateral. O run 0207 é histórico e iniciou de fixture. | Completar Browser por checkpoints: três Orders/Deliveries e Route via UI, cancelamento próprio pós-coleta, retorno após entregas restantes, confirmação Restaurante; validar pré-coleta sem retorno físico. |

Ver [REGISTROS/0218.md](REGISTROS/0218.md).

## Atualização vigente — Campanha 0217 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0217-BROWSER-RACE / 0202, 0211, 0215 | Dispatch cross-app; P1; **PARTIAL** | Run Browser 0217 criou Order/Delivery pela UI, usou dois perfis Moto independentes, obteve `accepted` + `REVISION_CONFLICT`, replay `duplicate`, perdedor `DRIVER_NOT_ASSIGNED`, execução `DELIVERED` pelo vencedor e cinco eventos únicos. A disputa de atribuição usou HTTP autenticado/CSRF, sem clicar controles de atribuição da UI. | Executar a disputa a partir dos controles de atribuição do Restaurante e conferir estado logístico nomeado na projeção Restaurante; manter a mesma Delivery no run. |
| 0217-EARNING / 0213, 0217 | Financeiro; P1; **OPEN** | Delivery concorrente terminou sem Earning (`earningCount=0`), pois a campanha não configurou regra financeira positiva; nenhum Earning duplicado foi encontrado. | Na 0219, criar duas entregas com regra BRL 725 e comprovar IDs próprios, snapshots e total 1450 centavos nas duas UIs e no PostgreSQL. |
| 0217-HARNESS / 0216, 0217 | Browser QA; P2; **PARTIAL** | Orquestrador CDP passou crash/resume. O runner integrado usa checkpoints por etapa concluída, mas negócios mutáveis não são retomados automaticamente após resultado incerto. Foram retidos os runs interrompidos e os manifests de fixtures. | Continuar checkpoints por operação idempotente e preservar `UNKNOWN_OUTCOME` onde não houver chave/reconciliação segura. |

Ver [REGISTROS/0217.md](REGISTROS/0217.md).

## Atualização vigente — Campanha 0215 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0215-BROWSER-RACE / 0202, 0211 | Dispatch; P1; **OPEN** | Uma execução PostgreSQL passou disputa; um Browser run criou Route e concluiu entregas, mas não unificou a corrida de dois perfis com a mesma Delivery. | Integrar dois perfis Moto à jornada Browser do Restaurante, executar atribuição concorrente, aceitar/executar pelo vencedor, e conferir eventos/projeções no mesmo run. |
| 0215-RETURN-UI / 0212 | RETURN/custódia; P1; **OPEN** | Runner atual parou antes da confirmação do Restaurante; fixture prévia impediu comprovar criação de três pedidos pela UI. | Retomada por checkpoint desde três pedidos UI até RETURN ao fim da rota, entrega física e confirmação autorizada; também cancelar antes da coleta. |
| 0215-FINANCE-TWO-EARNINGS / 0213 | Financeiro; P1; **PARTIAL** | Uma nova Delivery produziu Earning BRL 725 com snapshot; outra ficou incompleta. | Concluir duas novas entregas e provar Earning distinto por `deliveryId`, ambos 725 centavos e total 1450 em UI e PostgreSQL. |
| 0215-WORKERS-OUTAGE / 0214 | Workers/filas; P1; **OPEN** | Client sync convergiu após outage; workers reais e `/api/ops/queues` com gestor/sem permissão não integrados ao cenário de falha. | Testar worker PostgreSQL real, queue depth/idade/retry/lease/unknown outcome, autorização, liveness e readiness durante outage e recuperação. |
| 0215-PRODUCTION-READINESS / 0158–0215 | Continuidade/produção; P0; **BLOCKED** | Sem prova de DR oficial/offsite, RPO/RTO, homologações comerciais e testes físicos. | Não elevar gate até cobertura, custódia independente, RPO/RTO aprovados, sandbox/homologação e validações físicas exigidas. |

Ver [REGISTROS/0215.md](REGISTROS/0215.md).

## Atualização vigente — Campanha 0214 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0214-WORKER-OUTAGE-METRICS / 0193, 0204, 0214 | Workers/filas/observabilidade; P1; **OPEN** | Runtime Browser recuperou operação E2E pelo proxy PostgreSQL; suites unitárias de métricas passam. Não houve worker real no mesmo outage, métricas duráveis de fila, `/api/ops/queues` autorizado/negado, liveness durante falha ou readiness 503 observado nessa execução. | Rodar worker PostgreSQL E2E junto ao proxy de fault injection; coletar fila/idade/retry/lease/resultado incerto, testar gestor e usuário sem permissão, medir liveness e readiness durante e após a falha. |

Ver [REGISTROS/0214.md](REGISTROS/0214.md).

## Atualização vigente — Campanha 0213 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0213-FINANCE-TWO-EARNINGS / 0209, 0213 | Order/Earning/Route; P1; **PARTIAL** | Uma de duas Deliveries novas concluiu com valores BRL em centavos corretos e um Earning de 725 com snapshot; a segunda permaneceu `ARRIVED` após falha offline. | Retomar a segunda operação e provar duas conclusões, dois Earnings pertencentes às duas novas Deliveries e soma 1.450 centavos, com conferência em UI e PostgreSQL. |

Ver [REGISTROS/0213.md](REGISTROS/0213.md).

## Atualização vigente — Campanha 0212 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0212-RETURN-UI / 0147, 0207 | Cancelamento/custódia/rota; P1; **OPEN** | Runner autenticado repetiu etapas visuais de cancelamento, RETURN atribuído e handover; fixture de contexto foi prévia e processo não chegou ao recebimento. Manifesto `8bf2bcb2-6ffd-47f8-91b0-c5f77b56854b` permaneceu `RUNNING`, sem limpeza. | Reestruturar runner em checkpoints, criar três pedidos e Route pela UI, cancelar após coleta, verificar RETURN no fim da fila, concluir duas paradas e confirmar recebimento autorizado no Restaurante; incluir cancelamento antes da coleta. |

Ver [REGISTROS/0212.md](REGISTROS/0212.md).

## Atualização vigente — Campanha 0211 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0211-BROWSER-RACE / 0202, 0206 | Dispatch cross-app; P1; **OPEN** | PostgreSQL E2E atual passou corrida de atribuição e aceite, com um vencedor, `REVISION_CONFLICT`, `DRIVER_NOT_ASSIGNED` e replay idempotente. Browser atual autenticou apps e criou Route, mas terminou em timeout após `ARRIVED`; dois perfis independentes não disputaram a mesma Delivery. | Instrumentar/ajustar o runner sem ocultar falhas; executar criação pela UI, atribuição concorrente autorizada e execução pelo vencedor no mesmo run, com leitura canônica nas duas UIs e PostgreSQL. |
| 0211-HISTORY-0210 / 0211 | Histórico; P3; **RESOLVED** | Commit principal `ab677d7` contém cinco documentos; suplemento `a621dba` contém quatro porque o resumo já estava correto. | Manter a correção complementar como commit separado; não reescrever histórico. |

Ver [REGISTROS/0211.md](REGISTROS/0211.md).

## Atualização vigente — Campanha 0200 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0200-MAP-VISIBLE / 0192–0200 | Motoboy mapa; P1; **OPEN** | Route/coordinates/geometry HTTP 200 e markers no DOM; screenshot mostra tiles/markers não aparentes; foco mobile stop 2 não avançou. | Corrigir/confirmar framing e camada do mapa por hit-testing/screenshot, depois avançar stops em CDP mobile e desktop. |
| 0200-INTEGRATED-RACE / 0191–0200 | atribuição/execução; P1; **PARTIAL** | PostgreSQL provou winner/conflict/aceite autorizado, mas a disputa e execução não ocorreram em uma mesma sessão Browser. | Vincular corrida concorrente às sessões autenticadas da jornada criada pela UI e verificar conclusão nos dois apps. |
| 0200-OUTBOX-OUTAGE / 0194–0200 | sincronização; P1; **OPEN** | Health/readiness falha/recupera via proxy; sem operação pendente durante o outage. | Testar antes/depois do commit, ACK perdido, replay idempotente e convergência com outbox mantida. |
| 0200-QUEUE-EXPORT / 0199–0200 | workers/observabilidade; P1; **PARTIAL** | Leitura PG agregada por tenant implementada e testada; exportador/alertas e séries de retry/lease faltam. | Conectar coletor autorizado e calibrar limites em carga mensurada, sem IDs em labels. |
| 0200-DR / 0184–0200 | continuidade; P0; **BLOCKED operacional** | Restore sintético até 0044 permanece evidência histórica; sem restore atual/offsite/RPO-RTO. | Validar recovery set atualizado, cópia independente e procedimentos com autorização e ambiente descartável. |
| 0200-EXTERNAL / 0152–0200 | integrações; P0; **BLOCKED_EXTERNAL** | Sem chamadas comerciais ou credenciais sandbox. | Obter onboarding e executar homologação externa autorizada. |
| 0200-HARDWARE / 0163–0200 | Android; P1; **BLOCKED** | Sem testes físicos de GPS/câmera/QR/impressora. | Executar checklist em dispositivo autorizado. |

Ver [REGISTROS/0200.md](REGISTROS/0200.md).

## Atualização vigente — Campanha 0199 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0199-QUEUE-EXPORT / 0193–0199 | Workers/outboxes; P1; **PARTIAL** | `queueMetrics()` lê marketplace/provider outboxes no PG com role dedicada, RLS, tenant scope e estados/idade agregados sem IDs. Não há exporter/scraper/alertas. | Expor coleta somente a operador autorizado, contabilizar retry/lease/idade/latência com cardinalidade fixa e validar thresholds/runbook em carga controlada. |

Ver [REGISTROS/0199.md](REGISTROS/0199.md).

## Atualização vigente — Campanha 0198 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0198-OUTBOX-DB-OUTAGE / 0194–0198 | Sync/PostgreSQL; P1; **OPEN** | Liveness/readiness passou 200→503→200 via proxy; o cenário não manteve operação pendente durante outage. | Injetar falha antes do commit e após commit/ACK via proxy; comprovar outbox persistida, retry limitado, replay único e convergência bilateral. |

Ver [REGISTROS/0198.md](REGISTROS/0198.md).

## Atualização vigente — Campanha 0197 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0197-UI-CONCURRENCY / 0188–0197 | Restaurante/Motoboy; P1; **PARTIAL** | PostgreSQL provou uma atribuição vencedora, `REVISION_CONFLICT` no perdedor, aceite restrito e um único evento; sem disputa integrada na mesma jornada Browser. | Conectar a disputa PG às sessões Browser criadas pela UI e concluir entrega pela sessão vencedora, validando ambas as projeções. |

Ver [REGISTROS/0197.md](REGISTROS/0197.md).

## Atualização vigente — Campanha 0196 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0196-MAP-VISUAL / 0192–0196 | Motoboy mapa; P1; **PARTIAL** | Route com duas coordenadas confirmadas e markers/linha atestados no DOM; API geometry HTTP 200. Screenshot ainda não enquadra cartografia e avanço para stop 2 falhou no Browser runner. | Capturar o mapa visível em desktop/mobile e validar avanço de parada com interação CDP confiável; corrigir produto somente se reproduzir. |
| 0196-GEOMETRY / 0196 | Backend geometry; P2; **RESOLVED no cenário** | Resposta agora inclui stops ordenados/origem sem exigir provider; unidade e PG logística PASS. | Manter proteção tenant e proveniência em regressões. |

Ver [REGISTROS/0196.md](REGISTROS/0196.md).

## Atualização vigente — Campanha 0195 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0195-OFFLINE-REOPEN / 0181–0195 | PWA/outbox; P1; **PARTIAL** | Outbox preservou operações e convergiu após reload/reconexão; `navigator.onLine=true`, backend inacessível e sessão ausente no reload. | Manter perfil Chromium autenticado sob offline controlado através de encerramento/reabertura e upgrade SW; provar convergência com mesmo ID e uma vez. |
| 0195-RETURN-UI / 0179–0195 | Delivery/RETURN; P1; **PARTIAL** | PG testou recebimentos concorrentes; ciclo autenticado completo de cancelamento, RETURN final e receipt não foi repetido. | Executar pelo Browser nas duas interfaces, conciliando custódia e confirmação sem nova corrida comercial. |
| 0195-MAP-GEO / 0192–0195 | Mapa/route; P1; **OPEN** | Leaflet responde em desktop/mobile, mas zero markers sem snapshots de destino; geometria não comprovada. | Confirmar origem/destinos por fluxo territorial autorizado, testar markers e geometria determinística. |
| 0195-METRICS / 0193–0195 | Workers/outbox; P1; **PARTIAL** | Métricas de ciclos/duração sem profundidade, estados, retries/leases ou coleta compartilhada. | Medir e expor contagens agregadas bounded; definir runbooks/alertas com carga observada. |
| 0195-OUTBOX-OUTAGE / 0194–0195 | Sync/PostgreSQL; P1; **OPEN** | Readiness falhou/recuperou com proxy; operação pendente não foi atravessada pela falha. | Fault inject antes/depois do commit com operação autorizada pendente e replay único após reconexão. |
| 0195-DR / 0184–0195 | Backup/continuidade; P0; **BLOCKED operacional** | Metadados do restore sintético 18.6/44 migrations confirmados; sem restore novo ou verificação externa. | Atualizar recovery set aprovado, cópia independente, custódia, retenção e RPO/RTO em execução autorizada. |
| 0195-EXTERNAL-HOMOLOGATION / 0152–0195 | Providers; P0; **BLOCKED_EXTERNAL** | Apenas mocks/fixtures locais; nenhuma credencial, sandbox ou chamada real. | Obter onboarding/documentação restrita e homologar separadamente por provider. |
| 0195-PHYSICAL-VALIDATION / 0163–0195 | Android/GPS/câmera/QR/impressão; P1; **BLOCKED** | Nenhum dispositivo físico controlado neste ambiente. | Executar checklist com hardware Android e impressora autorizados, guardar evidências. |

Ver [REGISTROS/0195.md](REGISTROS/0195.md).

## Atualização vigente — Campanha 0194 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0194-DB-OUTAGE-OUTBOX / 0190–0194 | Runtime sync/outbox; P1; **OPEN** | Readiness real 200→503→200 via proxy de teste; nenhum comando foi enviado durante outage. | Com sessão autenticada, manter comando sintético pendente, injetar falha no proxy, reconectar e conferir retry com mesma chave, uma mutação/evento e convergência. |
| 0194-DB-UNKNOWN-COMMIT / 0191–0194 | Sync/replay; P1; **PARTIAL** | ACK perdido após commit/replay passou em Browser separado; não coincidiu com outage PostgreSQL. | Integrar fault injection no mesmo runner e demonstrar antes/depois do commit com resultados canônicos. |
| 0194-RETRY-STORM / 0194 | Pool/recovery; P2; **PARTIAL** | Readiness recobrou; não houve medição de tentativas concorrentes ou backoff após recuperação. | Medir retries, conexões e fila sob outage curto, com limite e sem tempestade após retorno. |

Ver [REGISTROS/0194.md](REGISTROS/0194.md).

## Atualização vigente — Campanha 0191 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0191-INTEGRATED-RACE / 0188–0191 | Browser UI + atribuição; P1; **PARTIAL** | API E2E provou uma atribuição vencedora e aceite restrito ao Driver alocado; Browser criou e concluiu duas entregas pela UI, mas em runs distintos. | Integrar corrida autenticada no runner Browser após criação UI da Delivery; persistir mesmo ID canônico, um winner, conflito claro e projeção nos dois apps. |
| 0191-PASSWORD-LOGIN / 0191 | Sessões Motoboy; P2; **PARTIAL** | Duas sessões Driver distintas foram preparadas como fixtures e chamadas autenticadas; login por senha isolado de cada um não foi exercitado. | Acrescentar dois perfis Chromium e logins reais no runner integrado. |

Ver [REGISTROS/0191.md](REGISTROS/0191.md).

## Atualização vigente — Campanha 0190 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0190-WORKER-METRICS / 0169–0190 | API/filas/workers; P1; **OPEN** | Métricas API/sync limitadas; ausência de métricas agregadas worker/queue confirmada. | Expor contagens/durações agregadas sem labels com tenant/order IDs; testar cardinalidade, sanitização e alertas. |
| 0190-PG-OUTAGE / 0180–0190 | Readiness/runtime; P1; **PARTIAL** | Transição readiness 503→200 testada com dependência injetada; falha real de conexão não injetada. | Usar proxy ou banco descartável E2E para erro e recuperação sem interromper PostgreSQL global; provar requests e readiness. |
| 0190-RETRY / 0185–0190 | Retry/backoff; P2; **PARTIAL** | 429/503/timeout e leases testados, sem ensaio sustentado de tempestade/backoff. | Medir retries sob falha controlada e comprovar limites/cooldown sem provider real. |
| 0190-DR / 0184–0190 | Backup/continuidade; P0; **PARTIAL/BLOCKED operacional** | Restore sintético PostgreSQL 18.6 até 0044 consta em 0184; não repetido aqui. Recovery oficial/offsite não validado. | Atualizar recovery set, validar cópia independente, custódia, retenção e RPO/RTO em procedimento autorizado. |
| 0190-PRODUCTION / 0186–0190 | Readiness; P0; **BLOCKED** | Dependências externas e físicas continuam abertas. | Homologação comercial, Android físico, DR e operação/monitoramento comprovados antes de qualquer decisão de produção. |

Ver [REGISTROS/0190.md](REGISTROS/0190.md).

## Atualização vigente — Campanha 0189 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0189-MAP-TILES / 0183–0189 | Mapa cartográfico; P2; **PARTIAL** | Lifecycle passou em 390×844 e desktop; rota de teste não tinha coordenadas e não produziu tiles/markers. | Repetir com rota geográfica sintética criada pela UI e tiles locais controlados; confirmar markers e navegação sem rede comercial. |
| 0189-ANDROID / 0163–0189 | GPS/câmera/hardware; P2; **BLOCKED** | Nenhum dispositivo físico foi validado. | Executar procedimento manual em Android autorizado, com permissões reais e evidência física. |

Logout 500 e reautenticação/CSRF indevida foram corrigidos e cobertos; ver [REGISTROS/0189.md](REGISTROS/0189.md).

## Atualização vigente — Campanha 0188 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0188-LOCKS / 0174–0188 | Atribuição, disponibilidade, leases, RETURN; P1; **RESOLVED nos interleavings testados** | Lock waits determinísticos, idempotência, FIFO, lease fencing, RETURN receipt e RLS passaram; sem lock residual. | Manter teste de concorrência e isolamento. |
| 0188-RIDER-RACE / 0179–0188 | Dois motoboys disputam a mesma Delivery; P1; **PARTIAL** | Modelo só permite dispatch/atribuição pelo Restaurante; o runner testou duas sessões com mesmo Driver e dois re-deliveries distintos. | Preparar dois memberships/Drivers sintéticos e testar operação legítima de atribuição concorrente; se nenhuma disputa same-Delivery for permitida pelo domínio, documentar resposta/conflict no endpoint autorizado. |

Ver [REGISTROS/0188.md](REGISTROS/0188.md).

## Atualização vigente — Campanha 0187 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0187-FIN / 0182–0187 | Order Money / Delivery / Earning; P1; **RESOLVED no cenário positivo** | Total, fee, snapshot e Earning positivos conciliados por UI e PostgreSQL; replay idempotente. | Manter testes; campos fora do contrato continuam fora de escopo. |
| 0187-PROJ / 0176–0187 | Projeção da lista Restaurante; P1; **RESOLVED** | A Order agora projeta Delivery canônica `DELIVERED` em vez de alias local antigo; Browser confirma ambos os pedidos finalizados. | Manter regressão cross-app. |
| 0187-NEG / 0187 | Validação negativa de formulário; P2; **PARTIAL** | Unitário cobre subtotal negativo/unsafe; não houve tentativa de duplicidade/payload inválido pela UI neste runner. | Adicionar casos de interface se a jornada de criação financeira for alterada. |

Ver [REGISTROS/0187.md](REGISTROS/0187.md).

## Atualização vigente — Campanha 0186 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0186-SW / 0167–0186 | Upgrade, outbox e recuperação PWA; P1; **RESOLVED no cenário validado** | Versões Git v43.44→v43.45; lifecycle `waiting`/ativação, Chromium reaberto, outbox persistente e duas Deliveries convergiram sem duplicação. | Manter runner como regressão; não inferir cobertura de rádio físico/Android. |
| 0186-NET / 0178–0186 | Estado de rede versus backend; P2; **RESOLVED na distinção** | Após reload `navigator.onLine=true`, probe HTTP autenticada ainda falhou; recovery ocorreu após disponibilidade do backend. | Preservar health/probe de serviço separado do indicador da interface. |

Ver [REGISTROS/0186.md](REGISTROS/0186.md).

## Atualização vigente — Campanha 0185 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0185-PWA / 0167–0185 | Outbox, offline e upgrade SW; P1; **PARTIAL** | Processo Browser fechado/reaberto offline, IndexedDB persistiu, reconvergiu; ACK perdido não duplicou. | Upgrade real de versão SW com outbox pendente e reteste. |
| 0185-FIN-RACE / 0179–0185 | Financeiro e disputa same Delivery; P1; **PARTIAL** | Earning 1.250 centavos/snapshot passou no PG; worker concurrency passou. | UI concilia Order/fee/repasse/Earning e dois motoboys disputam a mesma entrega; apenas um vence. |
| 0185-MAP-CSRF / 0178–0185 | Mapa e registro de instalação; P1; **PARTIAL** | Lifecycle fixado; Browser sem exceções/403 na execução; suites CSRF passam. | CDP desktop/390×844 repetindo mapa e logout/reautenticação sem exceção nem falso 403. |
| 0185-DR / 0158–0185 | Backup oficial/DR; P0; **BLOCKED** | Restore sintético PostgreSQL 18.6 até 0044 passou; banco/artefatos oficiais não acessados. | Autorização para recovery set atual, cópia independente, custódia, política/RPO/RTO e restore oficial isolado. |
| 0185-OBS / 0169–0185 | Outage, fila e alerta; P1; **PARTIAL** | Métricas/lifecycle/runbook unitários e readiness 200; sem outage PG ou alerta operacional. | Simular outage só em ambiente E2E e validar métricas agregadas/runbook e alertas aprovados. |
| 0185-EXT-HW / 0165–0185 | Providers/hardware; P1; **BLOCKED_EXTERNAL** | Sem chamadas/credenciais comerciais nem testes físicos nesta execução. | Onboarding/sandbox comercial autorizado e sessão física Android com recursos disponíveis. |

Ver [REGISTROS/0185.md](REGISTROS/0185.md).

## Atualização vigente — Campanha 0184 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0184-SYNTH-RESTORE / 0158, 0168–0184 | PostgreSQL recovery set sintético; P0 DR; **RESOLVED no teste isolado** | PostgreSQL 18.6 descartável; AES-256-GCM, pg_dump/pg_restore reais, ledger/checksums 0044; RLS/FORCE, constraints e índices verificados. | Manter script reproduzível; adicionar caso de mídia/proof sintética em recovery set. |
| 0184-OFFICIAL-DR / 0154, 0158–0184 | Backup oficial/continuidade; P0; **BLOCKED** | Banco, artefato e chave oficiais não acessados; sem offsite/custódia/RPO/RTO aprovados. | Autorização e processo operacional para snapshot atual, custódia, cópia externa e ensaio oficial. |

Ver [REGISTROS/0184.md](REGISTROS/0184.md).

## Atualização vigente — Campanha 0183 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0183-MAP / 0177–0183 | Lifecycle do mapa Restaurante; P1; **PARTIAL** | AppendChild reproduzido no baseline; disposal/idempotência corrigidos e unit test passa; Browser posterior sem JS exceptions. | CDP 390×844 e desktop alterna repetidamente mapa/abas, login/logout e reload sem renderer errors. |
| 0183-CSRF / 0178–0183 | Sessão/registro da instalação; P1; **PARTIAL** | CSRF/session race unit tests e sync autenticado passaram; antigo 403 não foi reproduzido. | Executar teste Browser específico de logout/reautenticação concorrente e confirmar POST installation sem falso 403. |

Ver [REGISTROS/0183.md](REGISTROS/0183.md).

## Atualização vigente — Campanha 0182 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0182-FIN / 0179–0182 | Order, taxa e Earning; P1; **PARTIAL** | PostgreSQL confirmou Earning de 1.250 centavos BRL e snapshot fees-v1 ligado à Delivery; suite de dinheiro passou. | Jornada Browser autenticada concilia Order total, fee, repasse e Earning positivos em cents. |
| 0182-RACE / 0174, 0179–0182 | Aceite/atribuição concorrente; P1; **PARTIAL** | Duas sessões passaram concorrência de claim/atribuição/RETURN/receipt sem duplicação. | Duas sessões de motoboys disputam a mesma Delivery por HTTP autenticado; provar um vencedor, sem segundo Earning/evento. |
| 0182-RETURN / 0147–0182 | Cancelamento/RETURN/recebimento; P1; **RESOLVED nos testes PostgreSQL** | Pré-coleta, pós-coleta, RETURN no final da rota, receipt autorizado e replay idempotente aprovados. | Manter regressão. |

Ver [REGISTROS/0182.md](REGISTROS/0182.md).

## Atualização vigente — Campanha 0181 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0181-OFFLINE / 0167–0181 | PWA, IndexedDB e reconexão; P1; **PARTIAL** | Chromium autenticado encerrado/reaberto offline; SW controlador, outbox persistida, backend fetch falhou apesar de navigator.onLine=true; reconexão convergiu sem duplicação. | Exercitar atualização real de Service Worker com outbox pendente e repetir convergência. |
| 0181-ACK / 0167–0181 | ACK perdido/replay; P1; **RESOLVED no cenário E2E** | Upstream 200/cliente 503; cinco eventos canônicos distintos e estado final entregue. | Manter regressão do proxy de falha. |

Detalhes e limites em [REGISTROS/0181.md](REGISTROS/0181.md).

## Atualização vigente — Campanha 0170 (2026-10-14)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próximo critério de aceite |
|---|---|---|---|
| 0170-DR / 0154, 0158, 0165-P, 0168–0170 | Backup/restore/continuidade; P0; **BLOCKED** | Recovery conhecido até 0041 vs schema versionado 0044; metadados de cobertura agora existem, mas sem artifact/restore real. | Rehearsal autorizado até 0044, cópia independente, retenção/agendamento/alertas e RPO/RTO definidos. |
| 0170-LIFECYCLE / 0159, 0165–0170 | Pedido próprio completo cross-app; P1; **PARTIAL** | CDP cria pedido local na UI; PostgreSQL não recebeu o pedido nesse runner. | Jornada autenticada sem pré-semeadura comercial com estados e contagens iguais nos dois apps e no E2E. |
| 0170-PWA / 0163–0170 | Atualização PWA/offline; P1; **FAIL no runner / PARTIAL no produto** | Worker antigo não chegou a waiting; não alegar perda de outbox nem preservação pós-update sem teste. | Reproduzir causa; passar update/reopen com outbox pendente e ACK posterior. |
| 0170-OBS / 0169–0170 | Observabilidade de workers e alertas; P1; **PARTIAL** | Métricas API/sync em memória; sem fila, alerta ou outage PG real. | Adicionar agregados worker/queue e validar falha/recovery sem payload/tenant labels. |
| 0170-EXT / 0152–0170 | Homologação iFood/Keeta/99Food; P1 externo; **BLOCKED_EXTERNAL** | Nenhuma credencial/chamada comercial. | Sandbox/onboarding e aceite autorizados. |

Matriz e gates finais: [REGISTROS/0170.md](REGISTROS/0170.md). Snapshots históricos preservados abaixo.

## Atualização histórica — Campanha 0169 (2026-10-14)

| ID/origem | Componente; prioridade; estado | Evidência atual | Critério de aceite / dependência |
|---|---|---|---|
| 0169-WORKER / 0150, 0153–0169 | Observabilidade de workers/filas; P1 operação; **OPEN** | Logs agregados e endpoint de API não exibem profundidade/lease de fila; nenhum evento de tenant exposto. | Projetar contadores agregados mínimos e teste de worker ocupado/parado, sem IDs ou payloads tenant-scoped. |
| 0169-ALERTS / 0158–0169 | Alertas duráveis e PostgreSQL outage; P1 operação; **PARTIAL** | Runbook local documentado; readiness reporta 503, mas sem injeção de outage e sem destino de alerta autorizado. | Definir destino/limiares com operador e testar indisponibilidade em E2E isolado. |

Estado anterior preservado abaixo; evidências em [REGISTROS/0169.md](REGISTROS/0169.md).

## Atualização histórica — Campanha 0168 (2026-10-14)

| ID/origem | Componente; prioridade; estado | Evidência atual | Critério de aceite / dependência |
|---|---|---|---|
| 0168-LEDGER / 0158, 0165-P, 0168 | Recovery manifest/inventory; P1 DR; **RESOLVED no código** | Novos sets incluem IDs/checksums do ledger; drift de ledger durante captura falha fechado. Testes sintéticos detectam 0041→0044 e divergência de checksum. | Exercitar num conjunto autorizado não oficial e verificar cobertura sem expor chaves. |
| 0168-REAL-RESTORE / 0154, 0158–0168 | Recovery set real, restore isolado; P0 produção; **BLOCKED** | Nenhum artefato/chave autorizado foi aberto; suíte usa fake dump. | Operador disponibilizar artifact/key de forma autorizada e ambiente descartável isolado; provar restore íntegro até schema 0044. |
| 0168-DR-OPS / 0158–0168 | Offsite, retenção, agendamento, RPO/RTO; P0 produção; **BLOCKED** | Nenhum destino/política operacional aprovada ou comprovada. | Definir custodiante/destino, retenção, frequência, alertas e objetivos RPO/RTO; executar rehearsal. |

Snapshots anteriores permanecem abaixo. Detalhes: [REGISTROS/0168.md](REGISTROS/0168.md).

## Atualização histórica — Campanha 0167 (2026-10-14)

| ID/origem | Componente; prioridade; estado | Evidência atual | Critério de aceite / dependência |
|---|---|---|---|
| 0167-OFFLINE / 0158, 0164–0167 | PWA, IndexedDB outbox e reconexão; P1; **PARTIAL** | Suites unitárias passam; Browser upgrade expirou esperando Service Worker em `waiting`; nenhum replay autenticado ocorreu sobre o Order 0166. | Diagnosticar ativação do worker; depois validar perfil persistente, 503/ACK perdido, restart, replay único e convergência bilateral no fluxo 0166. |

Estado e fotografia anterior preservados abaixo; detalhe em [REGISTROS/0167.md](REGISTROS/0167.md).

## Atualização histórica — Preparatória 0165-P (2026-10-14)

Esta atualização registra o diagnóstico estrutural do banco oficial e a publicação Git. Ela não apaga snapshots de pendências da Campanha 0165 nem muda seu estado de continuidade/produção.

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / critério de aceite |
|---|---|---|---|
| 0165-P-DB / 0153–0154, 0165-P | PostgreSQL oficial `rotamoto`; P1 operacional; **RESOLVED no estado estrutural** | Read-only em PostgreSQL 18.6: 44/44 migrations 0001–0044, checksums sem divergência, 47 tabelas, 118 índices válidos, constraints validadas e 38/38 tabelas RLS com FORCE. | Repetir diagnóstico após migrations futuras autorizadas; manter a regra de backup/restore antes de alterações estruturais oficiais. |
| 0165-P-PUBLISH / histórico Git | Restaurante/Motoboy/Histórico; P2; **RESOLVED** | Push normal confirmou os remotos em `f3165f1c`, `baf00f78` e commit documental `2f23e14d`; working trees dos apps limpos; sem arquivos locais não rastreados publicados. | Nenhuma ação; manter publicação restrita às branches autorizadas e aos documentos de campanha aprovados. |
| 0165-P-DR / 0154, 0158–0165 | Backup/DR; P0 produção; **BLOCKED** | O schema 0044 está confirmado, mas recovery set conhecido cobre até 0041; nenhum backup/restore novo foi validado nesta campanha. | Produzir e verificar set atualizado em ambiente autorizado, restaurar isoladamente até 0044, comprovar cópia independente, retenção/agendamento e RPO/RTO. |
| 0165-P-AUDITOR / 0150, 0165-P | Inventário read-only por role auditora; P2; **PARTIAL** | `rotamoto_auditor` conectou sem visibilidade do schema; a consulta foi completada com `rotamoto_migrator` já existente, sem mudar privilégio. | Se necessário inventário independente, definir credencial auditora aprovada e mínima; validar leitura de catálogos/ledger sem acesso desnecessário a dados de tenant. |

**Estado:** migrations oficiais sem pendências até 0044; nenhuma atualização do banco executada. Isso não implica prontidão de produção. Gates, comandos, fingerprints e limites estão em [REGISTROS/0165-P.md](REGISTROS/0165-P.md). A fotografia da Campanha 0165 permanece abaixo; `PRODUCTION_READINESS=BLOCKED`. Não iniciar 0166.

## Atualização vigente — Campanha 0166 (2026-10-14)

| ID/origem | Componente; prioridade; estado | Evidência atual | Critério de aceite / dependência |
|---|---|---|---|
| 0166-LIFECYCLE / 0159, 0165–0166 | Order→Delivery→Route Restaurante/Motoboy; P1; **PARTIAL** | UI criou pedido próprio somente em IndexedDB offline; suites unitárias e logística PostgreSQL transacional passaram. | Browser CDP autenticado sem semeadura comercial; provar persistência, despacho, ciclo Motoboy, ACKs e convergência nos dois apps e PostgreSQL. |
| 0166-REFUSAL-RETURN / 0147, 0165–0166 | Recusa/cancelamento/devolução; P1; **PARTIAL** | Regressões unitárias e de contrato passaram; jornada integral pela UI não repetida. | Cobrir via UI após runner autenticado e preservar estados/auditoria idempotentes. |

Evidências detalhadas em [REGISTROS/0166.md](REGISTROS/0166.md). A fotografia anterior permanece abaixo sem remoção.

## Pendências históricas — consolidação da Campanha 0165 (2026-10-14)

Esta fotografia atualiza estados conforme evidências novas; snapshots anteriores permanecem preservados. Testes sintéticos não equivalem a homologação comercial, validação física ou operação sustentada.

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / critério de aceite |
|---|---|---|---|
| 0165-LIFECYCLE / 0159, 0163–0165 | Order próprio Restaurante→Motoboy; P1; **PARTIAL** | Suites passaram; Browser cobriu RETURN, mas o runner pré-configura Order/Delivery. Ciclo completo sem pré-semeadura pela UI não executado. | E2E autenticado criado na UI; trace de ações/ACK; uma Order/Delivery convergente nos dois apps e E2E PostgreSQL; teste cross-tenant negativo. |
| 0165-OFFLINE / 0158–0165 | Outbox/reconexão/ACK; P1; **PARTIAL** | Falha/retry 503 do receipt passou; IndexedDB crash/reopen sintético consta em 0158/0164. Jornada autenticada completa reaberta e reconciliada não executada. | Outbox de Order próprio persiste em offline/503/restart/replay até ACK inequívoco; convergência e contagens sem duplicação. |
| 0165-RETURN / 0147–0165 | Cancelamento/custódia; P1; **RESOLVED no cenário pós-coleta** | RETURN após duas paradas, handover, receipt autorizado; `RETURNED/RECEIVED`, um evento e nenhum DeliveryProof fictício; retry 503 idempotente. | Manter regressões e ampliar cenários somente se o código mudar. |
| 0165-RLS / 0149–0165 | Tenant, RLS/FORCE, RBAC; P1; **RESOLVED nos cenários E2E** | 47 relações; 38 tabelas com RLS+FORCE; positivas/negativas, guards e roles worker aprovados. | Preservar testes; revisão integral de produção ainda depende de release auditado. |
| 0165-PROVIDER / 0152–0165 | iFood, Keeta, 99Food; P1; **PARTIAL** | Adapter/runtime sintético, assinatura, inbox/outbox, worker/limiter e fulfillment passaram. Dois manifests novos têm labels hard-coded `0160`/`0153`; IDs e evidências registrados. | Parametrizar campaign label e testar proveniência; onboarding/sandbox/credenciais/whitelist/aceite por provider são externos. |
| 0165-CONCURRENCY / 0155–0165 | Carga sustentada; P1; **PARTIAL** | Dois workers passaram; 0164 cobriu até dez clientes apenas em ondas curtas. Telemetria térmica não respondeu e `/proc/loadavg` foi negado, então carga longa foi evitada por segurança. | Acordar duração/SLO/limites, obter telemetria confiável; medir 1–10 sessões, locks/CPU/memória/temperatura e integridade sem exceder limites. |
| 0165-PWA / 0163–0165 | Service Worker e recuperação; P2; **PARTIAL** | Upgrade/outbox sintética passou em 0164; sync autenticado após reopen não foi exercitado em 0165. | Repetir com operação E2E pendente, sessão válida, upgrade/reopen e ACK backend. |
| 0165-HARDWARE / 0163–0165 | Android/GPS/câmera/QR/impressão; P1; **BLOCKED** | `adb devices -l` sem aparelho; nenhum periférico ou permissão física testado. | Roteiro físico em aparelho autorizado, incluindo sensores, impressão, rede e retomada. |
| 0165-BACKUP-DR / 0154, 0158–0165 | Backup/restore; P0 para produção; **BLOCKED** | Recovery set 0154 conhecido e evidência de restore histórica somente até 0041; E2E atual em 0044. Dump 0153 permanece incompleto. Nenhuma validação de backup atual/offsite nesta campanha. | Definir destino/custódia/retention; set autenticado atualizado e restore descartável até schema vigente; verificar RLS/checksum/audit/mídia e aprovar RPO/RTO. |
| 0165-MONITOR / 0158–0165 | Alertas/logs/suporte; P2; **PARTIAL** | PostgreSQL/nginx/PHP-FPM visíveis; alertas, health monitorado, retenção de logs e plantão não verificados. | Definir operador/runbook; testar health, alerta, logs sanitizados e escalação. |
| 0165-FINANCIAL / 0159–0165 | Order money/Earning; P1; **PARTIAL** | Suites de valores e Earning passaram; reconciliação financeira bilateral em ciclo integral ausente. | Testar valores sintéticos no ciclo completo, total/ganho canônicos e idempotência sem duplicação. |
| 0165-PRODUCTION / 0158–0165 | Prontidão para produção; P0; **BLOCKED** | DR/backup atual, homologação externa, hardware e operação monitorada ainda sem prova. | Fechar bloqueios P0/P1 e obter evidências de operação antes de qualquer release. |

**Contagem vigente:** 12 itens — RESOLVED 2 (somente nos cenários descritos), PARTIAL 7, OPEN 0, BLOCKED 3, DEFERRED 0. Evidências: [REGISTROS/0165.md](REGISTROS/0165.md) e [RESUMOS/0165.md](RESUMOS/0165.md). `PRODUCTION_READINESS=BLOCKED`. Não iniciar 0166.

## Pendências vigentes — consolidação da Campanha 0164 (2026-10-14)

Esta seção substitui apenas a fotografia vigente de performance; os snapshots e registros anteriores permanecem abaixo. Resultados de carga são sintéticos e curtos, restritos ao Termux e `rotamoto_e2e`.

| ID/origem | Componente; prioridade; estado | Evidência | Próxima ação/dependência |
|---|---|---|---|
| 0164-API / campanhas 0155–0156 | API autenticada, pool e SQL; P1; **PARTIAL** | 1/3/5/10 clientes, 10 sessões em dois tenants, 114/114 respostas; tier 10 p95 179,09/160,81 ms (segunda fase aquecida). Só três ondas por tier e mesmo processo local. | Executar duração/rodadas maiores em condições controladas; medir SLOs aprovados e separar custo do servidor do cliente. Não declarar capacidade sustentada. |
| 0164-PG-PLAN / campanhas 0155–0156 | Planejamento `domain_records`; P2; **PARTIAL** | Índice existente usado; 1 linha estimada/125 reais para tenants recém-criados; execução ~1 ms. Estatística `last_analyze` antecede a fixture; causalidade provável, sem comprovação isolada. | Comparar tenant estabilizado e fixture recém-criada, com método seguro e aprovado em E2E; registrar estatísticas/planos e locks sem `ANALYZE` indiscriminado ou DDL. |
| 0164-PG-LOCKS / 0164 | Locks/deadlocks durante carga; P2; **OPEN** | Workers concorrentes, leases/fencing e recuperação passaram; o benchmark API não mediu waits/deadlocks durante as ondas. | Instrumentar amostra read-only correlacionada por PID/application_name em benchmark de duração maior; preservar RLS e não tocar banco oficial. |
| 0164-WORKER / 0146, 0154, 0164 | Claims, interrupção e resultado incerto; P1; **RESOLVED no cenário E2E** | Dois workers/sessões, corrida de claim, fencing, processo interrompido, `UNKNOWN_OUTCOME` sem replay perigoso e limiter 99Food compartilhado passaram. Manifestos ficam retidos. | Repetir quando runtime/limiter mudar; não extrapolar teste sintético à homologação comercial. |
| 0164-SYNC / apps | Outbox, replay e reconexão real; P1; **PARTIAL** | Suites de sync/idempotência e testes worker passaram; não houve rádio/rede desconectada e reconciliação end-to-end dos dois apps nesta campanha. | Exercitar offline/503/reabertura e ACK perdido com sessão autenticada cross-app, sem pré-semeadura da operação e com fixture manifestada. |
| 0164-IDB / apps e Browser | Leitura/escrita IndexedDB; P2; **PARTIAL** | Microbenchmark Chromium isolado: 1.000×5 objetos genéricos de 256 bytes; escrita p50 1,38–1,49 s e leitura `getAll` p50 92–108 ms. Não executou caminho da outbox da aplicação. | Medir wrappers reais, lotes, outbox e custo de renderização com dataset sintético autenticado; comparar navegador/dispositivo antes de otimizar. |
| 0164-UI / apps | Lista, filtro, mapa e memória; P2; **PARTIAL** | CDP confirmou navegação e quatro viewports sem overflow; carga inicial única Restaurante ~2,06 s, Motoboy ~1,91 s. Backend respondeu 401/503 de fixture; sem lista longa autenticada/mapa com rota. RSS/heap cresceram no curto harness; sem inferir leak. | Medir sessão local autorizada, listas extensas, mapas com dados e memória em duração maior; separar custo Chromium/Termux de regressão de aplicação. |
| 0164-PWA / 0163–0164 | Ativação/upgrade e outbox; P2; **RESOLVED no teste isolado** | Com harness estático `no-cache`, workers v42→v43 e v43.44→v43.45 ativaram; outbox sintética sobreviveu a reabertura. Causa antiga foi `no-store` em resposta estática do runner. | Manter teste de cache isolado; validar reconexão/ACK do backend e operação pendente real antes de afirmar recuperação offline completa. |
| 0164-FIXTURE / 0150–0164 | Auditoria e retenção de fixtures; P2; **RESOLVED no escopo** | Novos fixtures E2E 0164 possuem manifests `RETAINED`; rótulo herdado de um manifesto desta execução foi corrigido sem alterar linhas. Todos os resíduos anteriores foram preservados. | Inventariar por manifestos e escopo autorizado; nenhuma elegibilidade de limpeza foi inferida. |

**Contagem desta seção:** 9 itens — RESOLVED 3 (limitados a cenários executados) · PARTIAL 5 · OPEN 1 · BLOCKED 0 · DEFERRED 0. Resultado global PARTIAL; sem prontidão de produção. Evidências: [REGISTROS/0164.md](REGISTROS/0164.md), [RESUMOS/0164.md](RESUMOS/0164.md). Não iniciar Campanha 0165.

## Snapshot anterior — pendências vigentes da Campanha 0163 (2026-10-14)

Este snapshot representa a fotografia mobile/PWA/acessibilidade da Campanha 0163. O estado vigente é a seção 0164 acima; as consolidações anteriores permanecem preservadas abaixo.

| ID/origem | Componente; prioridade; estado | Evidência | Próxima ação/dependência |
|---|---|---|---|
| 0163-PWA-UPGRADE / ambos | Service Worker/cache/IndexedDB; P1; **BLOCKED** | Perfil Chromium persistente isolado deixou worker v42/v43.44 em `installing`, sem controlador; nenhum outbox foi escrito neste teste. | Diagnosticar install/activate com CDP/servidor compatível; repetir com versão anterior controlada, outbox pendente, fechamento/reabertura e reconexão. |
| 0163-DELIVERY-E2E / ambos | UI, auth, despacho e sync; P1; **PARTIAL** | Formulário Restaurante criou Order local por UI (`AGUARDANDO/CREATED`); sessão 401/backend indisponível, sem atribuição ou operação no Motoboy. | Disponibilizar runtime/identidades sintéticas e completar cada etapa visual sem pré-semear Order/Delivery/status. |
| 0163-ANDROID / Motoboy | GPS, câmera/QR, impressão e retomada; P1; **BLOCKED** | `adb devices -l` vazio; nenhum periférico físico; não foram solicitadas permissões. | Executar roteiro manual reproduzível em aparelho autorizado, com GPS, câmera, QR e impressora disponíveis. |
| 0163-WCAG / ambos | Acessibilidade WCAG 2.2 AA; P2; **PARTIAL** | Heurística Chromium: botões com nomes e campos visíveis com labels; foco por Tab incompleto no Motoboy. Sem axe/scanner, leitor de tela, análise de contraste ou teclado integral. | Instalar/usar auditoria local aprovada e validar teclado/foco/contraste/leitor de tela manualmente em telas e roles completas. |
| 0163-MOBILE / ambos | Responsividade e UX; P2; **PARTIAL** | 4 viewports portrait/desktop sem overflow; navegação principal passou. Paisagem, teclado virtual e safe areas físicas não testadas. | Repetir com orientação landscape, teclado virtual/safe areas e device real, incluindo formulários e modais. |
| 0163-POSTGRES / E2E | Tenant isolation e RLS/FORCE; P1; **RESOLVED no teste** | `test:e2e-tenant-isolation` PASS em `rotamoto_e2e`; 47 relações, 38 protegidas com RLS/FORCE; manifesto retido `a724e2f6-baad-40d1-a517-0354b530ff98` tem rótulo legado `campaign=0160`. | Manter fixtures retidas; corrigir em campanha apropriada o rótulo do runner legado. Não acessar `rotamoto`. |

O registro 0163 está em [REGISTROS/0163.md](REGISTROS/0163.md) e [RESUMOS/0163.md](RESUMOS/0163.md). A tabela da Campanha 0162 e o backlog histórico abaixo não foram removidos.

## Snapshot anterior — pendências vigentes da Campanha 0162 (2026-10-14)

Esta seção é o snapshot histórico da segurança na Campanha 0162. O estado vigente está na seção 0163 acima; registros e matrizes anteriores permanecem preservados abaixo.

| ID/origem | Componente; prioridade; estado | Evidência | Próxima ação/dependência |
|---|---|---|---|
| 0162-SAST / apps | SAST local; P1; **PARTIAL** | Revisão manual e buscas locais não confirmaram vulnerabilidade. Sem `semgrep`, `njsscan`, `trivy`, `eslint`, `retire` ou scanner equivalente instalado no Termux ARM64. | Selecionar ferramenta local compatível, fixar versão e executar sem upload de código; revisar alertas manualmente. |
| 0162-SCA / dependências | Dependências diretas/transitivas; P1; **RESOLVED no snapshot** | `npm audit --json` nos lockfiles Restaurante/Motoboy: zero advisories em todas as severidades em 2026-10-14. | Repetir em cada release; advisory feed é temporal. |
| 0162-AUTH / identidade | Sessão, MFA, CSRF, RBAC e tenant; P1; **RESOLVED no escopo testado** | Suites completas, PostgreSQL transacional e Browser A/B validaram sessão/CSRF negativos e negação cross-tenant sem mutação. | Ampliar a matriz DAST a todos endpoints e combinações de roles. |
| 0162-RLS / PostgreSQL | RLS/FORCE e privilégios; P1; **RESOLVED em `rotamoto_e2e`** | Catálogo read-only: 47 tabelas; 38 RLS, 38 FORCE e uma policy por relação protegida; quatro roles sem bypass/flags administrativos. | Revalidar após mudanças de schema; oficial não foi acessado nesta campanha. |
| 0162-WEBHOOK / providers | iFood, Keeta, 99Food; P1; **PARTIAL** | Testes sintéticos locais de assinatura/raw body e replay passaram; Browser focou cancelamento/RETURN iFood. Runtime completo e sandbox dos três providers não executados. | Executar cobertura runtime por provider em E2E manifestado; homologação externa requer onboarding/credenciais autorizadas. |
| 0162-SECRETS / repositórios | Secrets e logs; P1; **RESOLVED no conjunto examinado** | Nenhum arquivo privado de credencial versionado foi encontrado; saídas de teste não expuseram segredos. | Repetir scan de conteúdo versionado e CI em cada release; a chave de backup não foi acessada. |
| 0162-DAST / APIs | Cobertura autenticada completa; P2; **PARTIAL** | Browser 390×844 e PG E2E cobriram sessão, CSRF, autorização A/B, replay e recebimento; não houve fuzzing nem exercício de cada endpoint/role. O runner não capturou console errors. | Ampliar casos negativos de forma controlada; adicionar captura de console e falhas de rede no runner futuro, sem alterar evidências anteriores. |
| 0158-DR / continuidade | Backup externo, snapshot, retenção e RPO/RTO; P1; **OPEN** | Pendência anterior preservada; não acessada ou alterada nesta campanha. | Seguir planejamento de continuidade; sem acesso à chave nesta auditoria. |
| 0152-EXT / homologação | Providers externos; P1 externo; **BLOCKED_EXTERNAL** | Sem chamadas comerciais ou credenciais externas nesta campanha. | Onboarding/sandbox, autorização formal e homologação pelo provider. |

**Contagem desta seção:** 9 itens — RESOLVED 4 (inclui estados limitados por escopo) · PARTIAL 3 · OPEN 1 · BLOCKED_EXTERNAL 1. Os qualificadores de escopo fazem parte do estado e não significam cobertura universal. Não iniciar Campanha 0163 automaticamente.

## Pendências vigentes — consolidação da Campanha 0161 (2026-10-14)

Este bloco registra o estado mais recente. A matriz original 0151–0160 e as fotografias anteriores permanecem abaixo, sem reescrita.

| ID/origem | Componente; prioridade; estado | Evidência | Próxima ação/dependência |
|---|---|---|---|
| 0161-SYNC-VAL / Restaurante | Fronteira de validação sync; P2; **RESOLVED** | Envelope e validações puras extraídas para `backend/domain/sync-validation.js`; testes pré/pós, suites, PG e Browser passaram; exports v1 preservados. | Manter caracterização em toda mudança do protocolo. |
| 0157-A1 / Restaurante e Motoboy | Modularização de `app.js`; P2; **OPEN** | Medidas atuais: 1.262 e 1.003 linhas. Ambos contêm acoplamento entre UI/estado/coordenação; módulos adjacentes existentes foram testados. | Planejar caracterização de efeitos e fronteiras pequenas em campanha futura; evitar reescrita ampla. |
| 0157-A2 / backend Restaurante | Separação de `sync-service.js`; P2; **PARTIAL** | Validação de envelope foi separada e importação não cria ciclo; autorização, validação de entidade, transação, aplicação de evento e projeção continuam no serviço. | Mapear responsabilidades restantes e testar uma fronteira por vez antes de extraí-las. |
| 0161-MOTO / Motoboy | Estado global de `app.js`; P2; **DEFERRED** | Módulos de workflow, navegação, IndexedDB, confirmação e reconciliação já são separados e passaram; ações remanescentes dependem de estado global/DOM/locks. | Só extrair com seam caracterizada e testes do ciclo local/offline; Motoboy permaneceu sem alterações nesta campanha. |
| 0161-PERF / backend sync | Custo da validação de pacote; P3; **PARTIAL** | Microbenchmark sintético de 3.000 chamadas: 95,60 ms antes, 96,26 ms depois; não demonstra ganho nem regressão de API. | Não otimizar sem benchmark de endpoint controlado e perfil de carga representativo. |

Não iniciar automaticamente Campanha 0162. A seção anterior da Campanha 0160 permanece como registro histórico.

## Pendências vigentes — consolidação da Campanha 0160 (2026-10-14)

A matriz diferencia o plano original 0151–0160 das campanhas realmente executadas. Registros anteriores seguem intactos; esta seção atualiza apenas o estado vigente.

| ID/origem | Componente; prioridade; estado | Evidência | Próxima ação/dependência |
|---|---|---|---|
| 0159-COV / 0160 | Cobertura Browser por tela, formulário e role; P2; **PARTIAL** | Smoke de listas/mapa passou em desktop/mobile; configuração, relatórios, todos formulários, roles e teclado não foram percorridos. | 0163 fechar matriz de acessibilidade e telas com ambiente/browser autorizado. |
| 0159-FLOW / 0160 | Fluxo próprio completo até entrega; P1; **PARTIAL** | RETURN bilateral foi exercitado, mas criação→despacho→aceitação→coleta→rota→entrega por UI em um único Browser E2E não foi concluído. | Reexecutar em campanha futura com percurso autenticado contínuo, sem pré-semeadura que mascare UI; preservar eventos reais do fluxo. |
| 0159-CONC / 0160 | Segurança de runners e fixtures; P1; **PARTIAL** | `test:availability-concurrency-e2e` foi corrigido para schema UUID, manifesto pré-gravação e retenção; 65 checks passaram. `test:postgres-migrations` foi protegido por guard, não executado. | Disponibilizar banco descartável separado e rever runners destrutivos antes de habilitar rollback tests. |
| 0159-RESID / 0160 | Schema `campaign0112_6017…`; P1; **BLOCKED / RETAINED** | Catálogo apenas: 41 tabelas, 108 índices, 741 constraints; 33 RLS/FORCE. Owner `rotamoto_migrator`; manifesto/proveniência não encontrados. Conteúdo intacto e não consultado. | Manter retido; qualquer investigação além de metadados ou remoção exige propriedade/autorização comprovada. |
| 0159-PHYSICAL / 0163 | GPS, câmera, QR físico, impressora e tecnologias assistivas; P2; **BLOCKED por ambiente** | Browser usa Chromium e tiles locais sintéticos, não representa hardware real. | Validar em Android e periféricos autorizados, com evidência por dispositivo. |
| 0159-PWA / 0160 | Atualização PWA com cache antigo/perfil persistente; P2; **PARTIAL** | Contratos SW passam; o upgrade real de instalação anterior não foi executado. | Criar prova CDP de perfil persistente e cache legado; validar recuperação sem perda de IndexedDB. |
| 0158-DR-1 / 0154–0159 | Atualidade do backup; P1 operação; **OPEN** | Recovery set íntegro da 0154 restaura isoladamente, porém contém ledger até 0041; o registro 0154 menciona schema 0044. | Criar/validar snapshot atual em campanha que autorize a operação e confirme previamente o estado do banco; nesta campanha `rotamoto` não foi acessado. |
| 0158-DR-2 / operador | Cópia externa/custódia; P1; **OPEN / UNVERIFIED** | Operador declarou manter uma cópia da chave no Google Drive. Não foi verificada. Não há evidência de que o recovery set esteja no Drive. | Confirmar existência/integridade/custódia do artefato sem acessar ou expor a chave; destino independente e procedimento de restore aprovados. |
| 0158-DR-3 / operação | Agendamento, retenção, alertas e RPO/RTO; P1; **OPEN** | Não há job instalado nem objetivos aprovados. Tempo do restore isolado não é RTO. | Decisão do operador e ensaio mensurável em alvo descartável. |
| 0150-FIXTURE / 0150–0160 | Fixtures e resíduos de auditoria global; P2; **PARTIAL** | Execução 0160 manifestada e retida; runner de concorrência não remove mais sandbox. Inventário global continua limitado por RLS; resíduo 0112 sem manifesto permanece. | Manter retenção e manifestos; provar propriedade antes de qualquer limpeza, sem enfraquecer RLS ou apagar audit. |
| 0157-A1 / apps | Modularização incremental; P2; **OPEN** | `app.js` permanece extenso; testes passam, sem falha funcional provada. | 0161 mapear dependências e extrair por caso de uso com testes de caracterização. |
| 0157-A2 / backend | Separar responsabilidades de `sync-service.js`; P2; **OPEN** | Módulo grande concentra validação/autoridade/transação. | 0161 decomposição controlada sem quebra de contrato. |
| 0151-SAST / apps | SAST/SCA dedicada; P1; **PARTIAL** | Regressões atuais passaram; scanner dedicado não foi executado nesta campanha. | 0162 selecionar ferramentas suportadas, executar e tratar alertas confirmados. |
| 0156-PERF / API | Desempenho sustentado; P2; **PARTIAL** | Medições anteriores no Termux oscilaram; não foi realizado benchmark prolongado nesta regressão. | 0164 repetir com condições e perfis controlados. |
| 0152-EXT / providers | Homologação iFood/Keeta/99Food; P1 externo; **BLOCKED_EXTERNAL** | Testes locais sintéticos passaram; nenhuma chamada comercial/sandbox real. | Onboarding, credenciais e autorização formal; sem homologação fictícia. |
| 0158-DR / operação | Backup e continuidade; P1; **OPEN** | Recovery set restaurável conhecido até migration 0041; não foi atualizado nem copiado externamente. A declaração de cópia da chave no Drive é não verificada e não prova cópia do artefato. | 0165 definir destino, custódia, retenção, agendamento/alertas, snapshot vigente e RPO/RTO; validar restore isolado. |
| 0160-PWA / apps | Upgrade PWA persistente; P2; **PARTIAL** | Browser validou shell/listas atuais, não cache antigo em perfil persistente. | Reproduzir upgrade em 0163 sem afetar perfil/instalação real. |

### Matriz do planejamento original 0151–0160

| Planejada | Objetivo original | Execução/evidência atual consolidada | Estado |
|---|---|---|---|
| 0151 | Segurança geral | Testes auth/CSRF/RLS atuais passaram no escopo; SAST/SCA e inventário global incompletos. | **PARTIAL** |
| 0152 | Performance e PostgreSQL | Diagnósticos de 0155–0156; ganho sustentado ainda não provado. | **PARTIAL** |
| 0153 | Resiliência e sincronização | Replay, workers, outbox e falhas sintéticas cobertos em campanhas anteriores e regressão atual; Android físico/ACK em dispositivo real pendentes. | **PARTIAL** |
| 0154 | Integridade, contratos e idempotência | Migrations/runtime/rate limit locais concluídos conforme registro 0154; ledger E2E 0001–0044 íntegro. | **RESOLVED** |
| 0155 | Compatibilidade mobile, navegadores, PWA e Android | Chromium desktop/mobile passou; PWA persistente e dispositivos Android não testados integralmente. | **PARTIAL** |
| 0156 | Acessibilidade, usabilidade e auditoria visual | Mapa e views avaliados, detalhe corrigido; revisão WCAG/assistiva completa não feita. | **PARTIAL** |
| 0157 | Arquitetura e manutenção | Auditoria e plano de modularização concluídos; dívida estrutural segue aberta. | **PARTIAL** |
| 0158 | Backup, restauração e continuidade | Restore isolado de snapshot até 0041; cópia/custódia/RPO/RTO ainda sem prova. | **PARTIAL** |
| 0159 | Regressão consolidada | Regressões amplas e dois defeitos corrigidos; cobertura total e preservação do runner de concorrência não plenamente aprovadas. | **PARTIAL** |
| 0160 | Revisão final e próximo ciclo | Regressões prioritárias e matriz executadas; runner de concorrência protegido e backlog 0161–0165 definido. Fluxo próprio Browser integral e upgrade PWA com cache antigo ausentes. | **PARTIAL** |

**Contagem da matriz original:** RESOLVED 1; PARTIAL 9; OPEN 0. Campanhas complementares permanecem: 0161 modularização; 0162 SAST/SCA; 0163 hardware/acessibilidade; 0164 performance sustentada; 0165 operação/homologação. Elas não substituem evidências pendentes da 0160. `PRODUCTION_READINESS` permanece BLOCKED por continuidade/backup, cobertura de fluxo e validações físicas/externas. Não iniciar automaticamente 0161.

Não acessar a chave ou presumir que o backup esteja no Google Drive. Não iniciar Campanha 0161 automaticamente.

## Registro histórico — Campanha 0154 (2026-10-14)

Esta matriz supersede somente os estados das trilhas de backup PostgreSQL e integração interna 99Food que constavam em 0152–0153. Os registros anteriores foram preservados como fotografias históricas. Campanha 0151 e demais pendências sem evidência nova continuam vigentes.

**Contagem desta atualização: 8 itens — RESOLVED 4 · PARTIAL 1 · BLOCKED_EXTERNAL 2 · DEFERRED 1.** Nenhuma pendência interna bloqueia iniciar homologação externa do 99Food Protocol (Recommended).

| ID / origem | Componente; prioridade; estado | Evidência atual | Dependência / próximo passo |
|---|---|---|---|
| 0154-R1 / Registros 0153–0154, `BACKUP-RESTORE.md` | Backup PostgreSQL integral e recuperação; P1; **RESOLVED** | Role preexistente `rotamoto_backup` com leitura completa sob FORCE RLS; recovery set autenticado e verificado, hash PostgreSQL `a95b5321405104bef36046c7bfbdef58e032a0d43068c74b7dcddd76f353068a`; restore isolado validado. O artefato parcial 0153 foi preservado. | Manter a chave separada do conjunto e testar restore periódico; cópia offsite ainda não foi configurada. |
| 0154-R2 / `migrate.js`, migrations 0042–0044 | Banco oficial de desenvolvimento `rotamoto`; P1; **RESOLVED** | Pré/pós-verificação do runner: ledger 0001–0044 íntegro, 0041 checksum preservado; 0042–0044 aplicadas transacionalmente; constraints, índices, RLS/FORCE e grants validados. | Não reaplicar; migrations futuras exigem campanha e backup/restore verificados. |
| 0154-R3 / Migration 0044, `99food-rate-limiter.js` | Limite compartilhado 99Food app/loja/worker; P1; **RESOLVED** | Duas sessões PostgreSQL concorrentes, tenants distintos, uma concessão/um 429 no bucket compartilhado, Retry-After e RLS/FORCE/least privilege aprovados em `rotamoto_e2e`; fixtures manifestadas e RETAINED. | Preservar teste concorrente e estados de cooldown em mudanças futuras. |
| 0154-R4 / Registros 0152–0154, runtime e Browser QA | Runtime local 99Food Protocol (Recommended), pedidos/outbox/lista e comandos documentados; P1; **RESOLVED internamente** | Adapter/runtime, token store/lease, webhook/inbox, projeção, outbox e worker foram validados sinteticamente em PostgreSQL E2E; Browser/CDP desktop/mobile; nenhuma Delivery/QR inventada. `READY_FOR_EXTERNAL_HOMOLOGATION=YES`. | Iniciar homologação só após onboarding/credenciais autorizados; nunca afirmar aceite comercial por testes sintéticos. |
| 0154-P1 / Ambiente Termux e utilitário `pg_amcheck` | Integridade física adicional do cluster oficial; P2; **PARTIAL** | `pg_amcheck` não consumiu a autenticação existente do pgpass; não foi possível concluir esse exame suplementar. Verificador SHA/HMAC do recovery set e restore isolado passaram. | Se necessário, configurar execução suportada do amcheck sem expor credenciais ou alterar privilégios. Não bloqueia os gates de backup/restore aprovados. |
| 0154-B1 / Portal 99Food e onboarding | Credenciais, sandbox, whitelist, certificação e aceite 99Food; P1 externo; **BLOCKED_EXTERNAL** | Nenhuma chamada externa/comercial feita; a integração local está pronta para homologação. | Obter acesso e autorização do parceiro; usar apenas o protocolo efetivamente provisionado. |
| 0154-B2 / Homologação iFood/Keeta | Credenciais/sandbox e aceite comercial; P1 externo; **BLOCKED_EXTERNAL** | Regressões locais passaram, mas não houve teste comercial autorizado nesta campanha. | Onboarding de cada provider. |
| 0154-D1 / Política operacional de backup | Agenda recorrente, retenção final, custódia independente da chave, cópia offsite e RPO/RTO; P1 de operação; **DEFERRED** | Recuperação integral foi comprovada no host; artefato e chave desta campanha permanecem no armazenamento privado Termux. Não foi definida frequência nem destino offsite. | Decisão do operador sobre frequência/destino/custódia; não confundir essa pendência de operação com falta de recuperabilidade do conjunto testado. |

O erro relatado em 0153 ocorreu porque `rotamoto_migrator` sob FORCE RLS não podia ler integralmente `audit_log`. Nesta campanha, o processo dedicado de backup utilizou a role de leitura `rotamoto_backup`, sem desabilitar RLS/FORCE, triggers ou alterar grants operacionais. A tabela `marketplace_account_routes` continua intencionalmente sem RLS conforme migration 0035, mas seus grants permanecem restritos ao resolver privilegiado; app e worker não têm SELECT.

## Registro histórico — Campanha 0152: integração 99Food (2026-10-14)

Esta seção atualiza somente a trilha de integração externa 99Food. As matrizes cronológicas anteriores, inclusive a consolidação 0151, continuam preservadas como evidência do que era conhecido naquela data.

| ID / origem | Componente; prioridade; estado | Evidência atual | Dependência / próximo passo |
|---|---|---|---|
| 0152-99-1 / Registros 0144, 0151, portal oficial consultado em 0152 | Normalização e adapter do 99Food Protocol; P1 desenvolvimento; **PARTIAL** | Adapter local valida assinatura webhook, envelope/eventos, IDs Long, subconjunto de Order/status/fulfillment, detail e comandos via fake transport. Teste unitário passou. Parser baseado em docs tabulares, sem JSON Schema/OpenAPI baixável confirmado. | Completar dinheiro/promo/options e transições; ligar somente depois de runtime persistente e cenários PG específicos. |
| 0152-99-2 / Migration 0035, `marketplace-runtime.js`, `server.js` | Conta, binding, webhook, inbox, Order/outbox, worker e comandos 99Food; P1; **PARTIAL** | O banco permite provider em `external_accounts`, mas inbox/outbox/order_versions e account routes restringem iFood/Keeta. Runtime/set/worker e handler também só aceitam esses dois; `/api/99food/*` responde 503. Nenhuma DDL foi aplicada. | Desenhar migration aditiva, grants/RLS/resolver e compatibilidade; testar primeiro em `rotamoto_e2e` numa campanha autorizada. Manter 99Food fail-closed até então. |
| 0152-99-3 / Portal 99Food, onboarding | Credenciais, vínculo de loja, homologação e sandbox; P1 externo; **BLOCKED_EXTERNAL** | Documentação exige credenciais de app, token por loja, qualificação/NDA, vínculo, certificação e, para alguns dados, whitelist. Nenhuma chamada externa ocorreu. | Obter acesso/credenciais/sandbox, confirmar protocolo efetivamente provisionado e critérios de aceite com a 99Food. |
| 0152-99-4 / 99Food Protocol vs Open Delivery | Seleção e cobertura do protocolo; P1; **PARTIAL** | Portal apresenta protocolos separados. O adapter implementa o recomendado; Open Delivery tem OAuth/polling/ACK separados e perfil da 99Food assinala Orders/Merchant prontos, Logistics em desenvolvimento. Não foi inferido que a conta autorizada use ambos. | Confirmar opção contratada por app/merchant; cobrir apenas essa família sem misturar envelopes, estados, assinatura ou auth. |
| 0152-99-5 / Registros 0144–0152 | Quote/dispatch/tracking/cancelamento logístico externo 99Food; P2; **NOT_APPLICABLE** para capacidade pública atualmente descrita | Perfil de aderente marca Logistics “in development”; nenhuma API pública dessa área foi comprovada nesta pesquisa. Order `delivery_type` descreve fulfillment, não uma API de courier RotaMoto. | Reavaliar somente se nova documentação oficial e acesso autorizados forem publicados. Não criar Delivery/QR para delivery pela plataforma. |
| 0152-99-6 / Manifestos E2E 0152 | Fixtures PostgreSQL de teste retidas; P2; **PARTIAL** | `rotamoto_e2e`: runtime run `12e9cbc0-4c5b-414d-aedb-0087fda9a25b` reteve 10 inbox/4 order versions em dois tenants; worker run `77bb502c-1df0-4499-a9e5-e73e0f837c32` reteve 2 inbox/1 order/9 commands no tenant A. `audit_log=0`; tenants/IDs constam nos manifestos. Tentativa guard-blocked `57cc3737-8de4-4c88-8854-0cd293d5dd51` não conectou/escreveu. | Preservar as fixtures e identificar por consultas read-only tenant-scoped. Nenhuma limpeza foi tentada novamente; inventário global não foi feito. |
| 0152-99-7 / Registros 0146–0152 | Homologação iFood/Keeta; P1 externo; **BLOCKED_EXTERNAL** | Regressões locais passaram; sem sandbox/efeito remoto em 0152. | Credenciais/sandbox e autorização comercial do respectivo provider. |

**Paridade 99Food nesta campanha:** validações/adapter base foram testados localmente, mas continuam **PARTIAL** como capacidade operacional; runtime/lista/outbox incompletos (**PARTIAL**); onboarding/sandbox/certificação **BLOCKED_EXTERNAL**; polling **NOT_APPLICABLE** ao protocolo próprio escolhido; APIs logísticas externas **NOT_APPLICABLE** conforme evidência atual. **READY_FOR_EXTERNAL_HOMOLOGATION = NO.** A próxima campanha especializada deve fechar schema/runtime persistente e E2E por tenant antes de solicitar homologação. Nenhum item da matriz 0151 foi removido; essa nova evidência substitui apenas o motivo antigo “contrato desconhecido” da integração 99Food, não seus bloqueios de runtime/onboarding.

## Registro histórico — Campanha 0151 (2026-10-14)

Esta é a matriz autoritativa das pendências ainda relevantes após a auditoria Full Stack. As entradas cronológicas abaixo permanecem preservadas como evidência da campanha que as produziu; estados explicitamente supersedidos nesta matriz não devem ser tratados como pendência atual.

**Contagem: 20 itens — RESOLVED 8 · PARTIAL 5 · BLOCKED 3 · DEFERRED 4 · OPEN 0.** Severidade/prioridade indica consequência e ordem de trabalho; `DEFERRED` identifica dependência de produto ou prontidão de produção, sem bloquear desenvolvimento local.

| ID / origem | Componente; prioridade; estado | Evidência atual | Dependência / campanha sugerida |
|---|---|---|---|
| 0151-R1 / Registro 0078, migration 0019 | PostgreSQL `logistics_providers.secret_ref`; P1; **RESOLVED** | Teste `test:logistics-secret-privileges` em `rotamoto_e2e`: runtime sem SELECT/UPDATE na coluna; worker com ACL restrita. | Preservar teste em futuras migrations; revalidar em campanha de grants. |
| 0151-R2 / Registros 0134, 0149, 0151 | Auth, sessão, CSRF, RBAC e tenant RLS; P1; **RESOLVED no escopo** | `npm test`, `test:e2e-tenant-isolation` e Browser negativos: 401/403/404; 46 tabelas e 37 policies FORCE. | Manter regressões ao adicionar handlers/permissions. |
| 0151-R3 / Registros 0147–0149, 0151 | IDOR e operação RETURN cross-tenant; P1; **RESOLVED no escopo** | ID conhecido de A usado por B não revelou dados nem mudou rota/eventos; confirmação válida A teve evento único. | Adicionar testes para endpoints novos e novos tipos de operação. |
| 0151-R4 / Registros 0126–0148 | Sync, replay, outbox, cancelamento e custódia; P1; **RESOLVED nos cenários cobertos** | Suites adversariais e Browser com concorrência/503/retry, RETURN `RETURNED/RECEIVED`, um evento. Rádio e suspensão Android não cobertos. | Regressões por mudança; considerar teste físico separado. |
| 0151-R5 / Registros 0145–0146 | Workers, leases e idempotência; P1; **RESOLVED nos cenários E2E registrados** | Duas sessões/workers, lease/recovery/replay aparecem aprovados em 0146; a indisponibilidade anterior da 0145 foi superada. | Manter worker PostgreSQL E2E com role dedicada. |
| 0151-R6 / Registro 0150 | Fixtures E2E conhecidas; P1; **RESOLVED quanto ao lifecycle** | Manifestos atômicos, IDs antes do commit, rollback single-session e retenção de sessões independentes; auditoria append-only preservada. | Continuar integração obrigatória dos runners; nunca inferir remoção de status terminal. |
| 0151-R7 / Registro 0140 e histórico 0141–0150 | Migration 0041; P1; **RESOLVED documental** | 0140 documenta APPLIED com checksum e ledger 0001–0041; 0151 não acessou o oficial. | Não reaplicar; reconfirmar somente sob escopo read-only autorizado futuro. |
| 0151-R8 / Campanha 0151 | Dependências npm; P1; **RESOLVED no snapshot** | `npm audit` reportou zero advisories nos dois lockfiles. | Repetir em atualização de dependências. |
| 0151-P1 / Registros 0144–0147 | Integrações iFood/Keeta; P1; **PARTIAL** | Contratos/adapters sintéticos e testes locais existem; nenhuma homologação comercial/sandbox foi executada. | Credenciais, documentação e sandbox oficiais; campanha específica de provider. |
| 0151-B1 / Registro 0144 | Integração 99Food; P1; **BLOCKED** | Contrato técnico/onboarding/credenciais autorizadas não aparecem nas evidências. | Acesso oficial do parceiro; não inventar APIs. |
| 0151-B2 / Registros 0149–0150 | Inventário global de fixtures; P1; **BLOCKED** | `rotamoto_auditor` sem CONNECT/SELECT em `rotamoto_e2e`; migrator não tem BYPASSRLS. Inventário tenant-scoped não prova global. | Aprovação de mecanismo read-only tenant-aware; não conceder privilégios nesta matriz. |
| 0151-P2 / Registros 0148–0150 | Resíduos legados sem IDs; P1; **PARTIAL** | Artefatos de 0148 e algumas tentativas interrompidas não preservaram identificadores completos; não foram apagados. | Procurar IDs nos artefatos existentes; manter não verificável se não houver prova de ownership. |
| 0151-P3 / Registros 0132–0138 | Provas/mídia órfã e retenção; P1; **PARTIAL** | Leitura/upload tenant-aware e integridade foram testados; GC seguro exige referências canônicas, grace period e prova de propriedade. | Fazer dry-run/allowlist e análise de dependências antes de propor limpeza. |
| 0151-P4 / CONTRACT.md, Registros 0075 e 0130 | IndexedDB e backup local; P2; **PARTIAL** | Persistência local funciona; backup v1 é explicitamente `plaintext-sensitive`, sem cifra aprovada; nenhum exfil foi reproduzido. | Decisão de produto/UX e modelo de proteção de dispositivo/export. |
| 0151-D1 / Registros 0068–0078, 0138 | Deployment local/on-prem; P1 produção; **DEFERRED** | TLS/domínio/proxy/CA, SMTP, supervisão, secrets duráveis, alertas e smoke do host não fazem parte deste ambiente; readiness histórica é NO. | Planejamento de implantação autorizado; não bloqueia desenvolvimento local. |
| 0151-D2 / Registros 0058–0069, 0138 | Backup/restore operacional; P1 produção; **DEFERRED** | Restore isolado histórico foi ensaiado, mas rotina corrente, cópia independente de chave, retenção e RPO/RTO medidos não foram validados nesta campanha. | Política e responsáveis aprovados; rehearsal em destino descartável. |
| 0151-D3 / Registro 0057 e config runtime | Rate limit em múltiplas instâncias/proxy; P1 antes de escala; **DEFERRED** | Implementação por processo é suficiente para o harness local testado; coordenação multi-instância depende de arquitetura/topologia futura. | Definir IP confiável/storage distribuído ao planejar escala. |
| 0151-B3 / Registros 0130–0142 | GPS, câmera/QR, OCR e impressão físicas; P2; **BLOCKED** | Chromium/CDP e corpus sintético não comprovam sensores/permissões/impressora física. | Aparelho Android e hardware disponíveis; campanha de validação física. |
| 0151-P5 / Registros 0130–0141 | Acessibilidade WCAG integral; P2; **PARTIAL** | Responsive e fluxos selecionados passaram; não há auditoria completa de teclado, leitor de tela e contraste nos dois apps. | Campanha dedicada de acessibilidade assistiva. |
| 0151-D4 / Registros 0074–0075 e 0141 | Settlement, analytics territorial completos e logística híbrida; P3; **DEFERRED** | Dependem de política financeira, dados de receita/custo/proveniência, SLA e contratos de providers. São capacidades futuras, não vulnerabilidades atuais. | Decisão de produto e contrato antes de implementação. |

**Contagem conferida:** IDs R1–R8 (8), P1–P5 (5), B1–B3 (3), D1–D4 (4), total 20. Status: 8 RESOLVED, 5 PARTIAL, 3 BLOCKED, 4 DEFERRED.

Ver evidências completas e limitações em [REGISTROS/0151.md](REGISTROS/0151.md). Não iniciar Campanha 0152.

## Registro histórico — Campanha 0150 (2026-10-14)

Esta consolidação atualiza exclusivamente lifecycle, identificação e auditoria de fixtures PostgreSQL E2E. As matrizes históricas permanecem preservadas.

**Contagem 0150 (5 itens): RESOLVED 3 · PARTIAL 1 · BLOCKED 1 · OPEN 0.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0150-R1 | **RESOLVED / P1** | Manifesto UUID criado antes de conexão; gravação atômica, modo privado, ambiente fechado em `rotamoto_e2e`, status/history e IDs de fixture sem segredos. Teste unitário cobre campos sensíveis e execuções concorrentes. | Manter obrigatório nos runners PostgreSQL; definir `ROTAMOTO_E2E_CAMPAIGN` em cada execução. |
| 0150-R2 | **RESOLVED / P1** | Single-session fixture rollback validou zero linhas com consulta scoped; independent-session exige retenção explícita e não há DELETE automático. `audit_log` e referências preservadas. | Preservar o fail-closed; qualquer limpeza exige autorização, dry-run, allowlist e análise de FK. |
| 0150-R3 | **RESOLVED / P1** | Crash real pós-commit: `RUNNING → INTERRUPTED → RUNNING(inventory-only) → RETAINED`; replay não repetiu operações. Browser A/B foi registrado antes do commit e recebeu snapshots RLS por tenant. | Continuar registrando tenants externos antes da primeira gravação confirmada. |
| 0150-P1 | **PARTIAL / P1** | Resíduos 0149 conhecidos foram enumerados por tenant e sem escrita. Evidências 0148 e algumas tentativas antigas não conservam IDs suficientes para identificação inequívoca; não foram removidas. | Recuperar IDs em artefatos locais se disponíveis; até então classificar como não verificáveis e reter. |
| 0150-B1 | **BLOCKED / P1** | Inventário global depende de auditor autorizado; `rotamoto_auditor` tem entrada pgpass, mas `CONNECT=false` e nenhum `SELECT` em `rotamoto_e2e`. Migrator segue com RLS/sem BYPASS. | Processo responsável deve aprovar uma visão tenant-aware/read-only ou capacidade de inventário equivalente; não criar grants nesta campanha. |

Evidências detalhadas: [REGISTROS/0150.md](REGISTROS/0150.md). A documentação da migration 0041 continua **APPLIED conforme 0140**; nenhum banco oficial foi acessado nesta campanha. Não iniciar Campanha 0151.

## Registro histórico — Campanha 0149 (2026-10-14)

Esta consolidação atualiza apenas os itens de segurança multiempresa e lifecycle das fixtures reexaminados nesta campanha. Matrizes anteriores permanecem preservadas.

**Contagem 0149 (5 itens): RESOLVED 3 · PARTIAL 1 · OPEN 1 · BLOCKED 0.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0149-R1 | **RESOLVED / P1 no escopo testado** | Sessão B não acessa Delivery/RETURN de A com ID conhecido: GET/POST/replay retornam 404 sem detalhes; snapshot de RETURN/original/rota/eventos não muda. Concorrência Browser com sessões PostgreSQL separadas confirmou B 404 enquanto A confirma. | Manter regressão em `test-domain-sync-postgres.js` e Browser; adicionar consultas por rota se novos endpoints forem introduzidos. |
| 0149-R2 | **RESOLVED / P1** | `orders.manage`, CSRF e sessão: membro sem permissão 403, CSRF ausente/inválido 403, sessão inválida/anônima 401. Cabeçalho de empresa adulterado não muda o tenant derivado da sessão. | Preservar guards HTTP e revisão de contexto tenant em cada endpoint de mutação. |
| 0149-R3 | **RESOLVED / P1** | RLS/FORCE e ACL runtime passaram; 46 relações, 37 políticas forced; fixture unitária/lifecycle em rollback terminou sem resíduo. Trigger `audit_log_no_update_or_delete` e FKs RESTRICT conferidos sem alteração. | Continuar usando `rotamoto_e2e`; não relaxar RLS, grants ou append-only. |
| 0149-P1 | **PARTIAL / P1** | Global residual inventory não comprovado. Fixture Browser concluída tem A: 17 domain records, 29 outbox, 37 audit; B: 1 membership/sessão e 0 domain/outbox/audit. Uma tentativa interrompida pode ter fixture extra sem IDs recuperáveis. Contagens sem contexto RLS não são prova de vazio. | Disponibilizar credencial auditor read-only autorizada ou consulta tenant-aware que descubra IDs sem expor dados; então inventariar sem apagar. Preservar a tentativa/evidências existentes. |
| 0149-O1 | **RESOLVED em 0150 / P2** | O manifesto pré-commit e recuperação foram integrados ao lifecycle; testes multi-sessão retêm fixtures e o helper não executa cleanup destrutivo. Isso não torna resíduos antigos elegíveis para remoção. | Qualquer proposta de cleanup permanece separada, exige dry-run e comprovação de ownership/dependências; ver `0150-P1` e `0150-B1`. |

Detalhes: [REGISTROS/0149.md](REGISTROS/0149.md). Migration 0041 permanece **APPLIED conforme a evidência documental da 0140**; esta campanha não conectou a `rotamoto`. Não iniciar Campanha 0150.

## Atualização — Campanha 0148 (2026-10-14)

Esta consolidação atualiza RETURN/custódia com a confirmação bilateral e suas regressões. As seções históricas permanecem preservadas.

**Contagem 0148 (5 itens): RESOLVED 3 · PARTIAL 1 · OPEN 0 · BLOCKED 1.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0148-R1 | **RESOLVED / P1** | Motoboy registra entrega física e deixa RETURN `ARRIVED/AWAITING_RESTAURANT_RECEIPT`; só Restaurante autorizado fecha RETURN e custódia original em transação, preservando eventos e vínculo com a Delivery original. Browser bilateral em `rotamoto_e2e` confirmou sync de volta ao Motoboy. | Manter regressões do ciclo e da relação Order/Delivery. |
| 0148-R2 | **RESOLVED / P1** | Duas sessões concorrentes confirmaram com a mesma chave; uma mutação + um ACK duplicado, exatamente um evento de recebimento. Falha HTTP 503 após commit e retry resultaram em ACK sem segundo evento. Chave diferente em estado terminal também é reconhecida sem mutação adicional. | Preservar cenário concorrente e recuperação de resultado remoto incerto. |
| 0148-R3 | **RESOLVED / P2** | Detalhe de pedido externo mostrava RETURN pendente mas não oferecia recebimento. UI agora exibe estado/custódia e botão autorizado. Captura Browser 390×844 mostrou pendência e conclusão nos dois apps sem overflow; não inventa comprovante. | Manter a ação separada do cancelamento comercial e da criação de novo pedido. |
| 0148-P1 | **PARTIAL / P1** | Usuário sem `orders.manage` recebeu 403; suite RLS geral passou (46 tabelas, 37 políticas FORCE, dois tenants). Não houve tentativa HTTP direta de confirmar RETURN de outro tenant. | Acrescentar teste endpoint de ID cross-tenant, que deve responder fail-closed sem revelar dado nem criar evento. |
| 0148-B1 | **BLOCKED / P2 físico** | Entrega física real/Android, radio offline e suspensão do processo não foram executados; Browser usa eventos e HTTP sintéticos. A fixture independente em `rotamoto_e2e` pode reter audit entries append-only; não foi feita limpeza destrutiva nem alteração de guard. | Validar em aparelho/processo assistido quando disponível; revisar retenção de fixtures E2E sem apagar audit log. |

Nenhuma migration ou deploy. `rotamoto` não foi acessado; 0041 permanece **APPLIED conforme a documentação da 0140**. Detalhes/evidências: [REGISTROS/0148.md](REGISTROS/0148.md). Não iniciar Campanha 0149.

## Atualização — Campanha 0147 (2026-10-13)

Esta seção atualiza cancelamentos e devoluções com os testes locais da 0147; os registros e itens anteriores permanecem preservados.

**Contagem 0147 (6 itens): RESOLVED 4 · PARTIAL 1 · OPEN 0 · BLOCKED 1.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0147-R1 | **RESOLVED / P1** | Delivery própria com coleta e motorista confirmados é cancelada e ligada a uma única Delivery `RETURN` na mesma transação; replay e nova solicitação reutilizam a tarefa. PostgreSQL e Browser passaram. | Preservar idempotência; confirmar recebimento no Restaurante por comando autorizado ao concluir o fluxo. |
| 0147-R2 | **RESOLVED / P1** | Cancelamento antes da atribuição/coleta não cria retorno; após atribuição remove somente sua parada. Duas entregas pares mantêm sequência, e RETURN fica por último. | Manter matriz como regressão nos testes de logística. |
| 0147-R3 | **RESOLVED / P1** | Cancelamento comercial de Order externo sem Delivery não inventa Delivery/QR/motorista; ação operacional só aparece para `fulfillment=merchant` e Delivery própria existente, com permissão. | Preservar separação Order/Delivery e `assertInternal()` para fulfillment da plataforma. |
| 0147-R4 | **RESOLVED / P2** | Browser mostrou/executou RETURN no Motoboy e sincronizou eventos; projeção agora conserva `Order.number` externo no cartão. | Manter teste de projeção e Browser bilateral. |
| 0147-P1 | **PARTIAL / P2** | Cancelamento pós-coleta foi exercitado com Order iFood sintético já `CANCELLED`; não cobre webhook/comando de cancelamento em sandbox, corrida de usuários reais nem comprovação física no aparelho. | Homologar somente com documentação e sandbox oficial autorizados; validar em aparelho quando disponível. Não inferir regra oficial de provider. |
| 0147-B1 | **BLOCKED / P1 externo** | Credenciais/sandbox comercial de iFood/Keeta e chamadas externas autorizadas não estavam disponíveis no escopo; nenhum provider real foi contatado. | Obter ambiente e credenciais oficiais; não presumir endpoint, regra ou homologação. |

Detalhes e evidências: [REGISTROS/0147.md](REGISTROS/0147.md). Migration 0041 permanece APPLIED conforme documentação da 0140; esta campanha não acessou `rotamoto` nem executou migrations. Não iniciar Campanha 0148.

## Registro histórico — Campanha 0146 (2026-10-13)

Esta seção atualiza os itens de worker, concorrência, restart e outbox reexaminados em 0146. As matrizes anteriores permanecem preservadas; status antigo só é supersedido nos itens identificados abaixo.

**Contagem 0146 (7 itens): RESOLVED 3 · PARTIAL 2 · OPEN 1 · BLOCKED 1.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0146-R1 | **RESOLVED / P1** | Bootstrap do Restaurante não deve converter dados canônicos em mutações locais. Browser reproduziu republicação após reload; escrita de normalização IndexedDB foi corrigida e `serverOrderReplayCount=0` na evidência final. | Preservar teste de restart em futuras mudanças de normalização e migração IndexedDB. |
| 0146-R2 | **RESOLVED / P1** | Concorrência worker: dois backends PostgreSQL distintos disputaram a mesma operação; um claim/efeito sintético, sem duplicação. | Manter corrida determinística como regressão com roles E2E dedicadas. |
| 0146-R3 | **RESOLVED / P1** | Interrupção após início do efeito sintético: `SIGKILL`, lease expirado, `unknown_outcome`, `attempts=1`; recuperação não retransmitiu efeito incerto. Replay/eventos concorrentes preservaram inbox e projeção mais nova. | Continuar exigindo chave idempotente/consulta de resultado antes de qualquer repetição externa incerta. |
| 0146-P1 | **PARTIAL / P1** | Outbox local sobreviveu a offline simulado, 503 e reload; ACK deixou uma Order. Evidência cobre IndexedDB/Chromium e endpoints controlados, não rádio ou processo Android. | Testar em dispositivo Android a queda/restauração de rede, suspensão/força-parada e retomada com perfil persistente. |
| 0146-P2 | **PARTIAL / P2** | RETURN/custódia e separação Order/Delivery passaram nas suítes existentes; Browser final confirmou que Order externo desconhecido não ganha Delivery/QR. Não foi repetido fluxo bilateral completo nem matriz provider de cancelamento pré/pós-coleta nesta campanha. | Acrescentar cenários sintéticos somente para transições documentadas, preservando entregador custodiante, RETURN explícito e fulfillment plataforma. |
| 0146-O1 | **OPEN / P1** | Recuperação foi testada com worker Node morto e adapter sintético, mas não com interrupção do host/app Android durante atividade real; rede foi simulada por `navigator.onLine`/503. | Completar validação física em aparelho e registrar limites; não deduzir sucesso físico da simulação. |
| 0146-B1 | **BLOCKED / P1 externo** | Homologação de iFood/Keeta/99Food e efeitos remotos reais não executados. O worker exercitou estado incerto sem contatar provider; 99Food permanece sem contrato/onboarding registrado. | Usar sandbox e contratos/credenciais oficiais autorizados quando disponíveis. Nenhum endpoint ou regra foi presumido. |

**Segurança de dados:** somente `rotamoto_e2e` foi usado nos testes PostgreSQL; `rotamoto` não foi acessado, nenhuma migration foi executada e não houve deploy. A migration 0041 permanece documentada como **APPLIED** em [REGISTROS/0140.md](REGISTROS/0140.md), sem nova verificação nesta campanha. Detalhes em [REGISTROS/0146.md](REGISTROS/0146.md). Não iniciar Campanha 0147.

## Registro histórico — Campanha 0145 (2026-10-13)

Esta atualização supersede somente as evidências/itens de Orders externos, sua projeção de Delivery/QR e sync que foram reexaminados em 0145. As demais matrizes e registros permanecem preservados.

**Contagem 0145 (8 itens): RESOLVED 3 · PARTIAL 1 · OPEN 2 · BLOCKED 2.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0145-R1 | **RESOLVED / P1** | `marketplace-runtime` só aceita atualizar Order/cursor quando `occurredAt` é estritamente posterior; teste PostgreSQL comprovou que evento iFood CANCELLED empatado/antigo não reverte `PLACED`, enquanto evento posterior atualiza e publica uma vez. | Manter testes de precedência; validar sequências/timestamps específicos se contratos oficiais documentarem outro sinal confiável. Empate sem sequência permanece sem avanço até evento/reconciliação posterior. |
| 0145-R2 | **RESOLVED / P1** | Inicialização do Restaurante não sintetiza Delivery para Order externo desconhecido; sync não cria Delivery nessa condição e QR exige Delivery local + `fulfillment: merchant`. Browser verificou IndexedDB com zero Delivery associada e nenhum QR na linha iFood. Corrige a alegação não demonstrada do runner 0144. | Preservar Deliveries preexistentes; se houver resíduos locais históricos, não apagá-los sem decisão/migração segura. |
| 0145-R3 | **RESOLVED / P2 (sintético)** | Browser manteve duas Orders locais na lista durante offline simulado, reconectou sem multiplicar e recuperou um 503 deliberado no pull/retry. | Validar interrupção de rádio/suspensão Android e reenvio de uma nova operação local pendente com perfil persistente. |
| 0145-P1 | **PARTIAL / P1** | Sync/cache da lista remota passa Browser; a retransmissão de uma alteração local ainda pendente após offline/503 e reinício do navegador não foi executada neste E2E. | Adicionar alteração sintética permitida no fixture, verificar IndexedDB/outbox, ACK, retry e reinício sem resíduo no banco. |
| 0145-O1 | **OPEN / P1** | Ordenação igual/antiga foi testada sequencialmente; nenhum E2E fez duas sessões/worker processarem eventos do mesmo Order em paralelo ou caiu/reiniciou worker no ponto de concorrência. A query bloqueia a linha de `marketplace_order_versions` com `FOR UPDATE`. | E2E com dois workers dedicados, timestamps invertidos, atraso de adapter, timeout e crash/restart; validar uma projeção/cursor/outbox final. |
| 0145-O2 | **OPEN / P1** | A projeção de CANCELLED mais recente foi testada sinteticamente. Matriz de cancelamento de Order por iFood/Keeta antes/depois da coleta e interação com custódia/RETURN não foi comprovada por sandbox nesta campanha. | Testar apenas transições e comandos documentados em adapters fake determinísticos; homologar separadamente quando houver sandbox autorizado; nunca converter plataforma-delivery em Delivery própria automaticamente. |
| 0145-B1 | **BLOCKED / P2 (infra de teste)** | `npm run test:marketplace-worker-postgres` falhou no guard antes da conexão: `E2E_PROVIDER_WORKER_DATABASE_URL` não fornecida como role dedicada. | Disponibilizar URL/role E2E dedicada já autorizada; não substituir por `rotamoto_app` nem relaxar o guard. |
| 0145-B2 | **BLOCKED / P1 (externo)** | Nenhum provider comercial foi contatado. iFood/Keeta requerem sandbox/credenciais autorizados; 99Food continua sem contrato/API completa e onboarding registrado em 0144. | Obter contrato e credenciais oficiais e homologar por provider. Não inventar endpoint/evento nem bloquear o desenvolvimento local. |

**Resultado:** PARTIAL, sem defeito crítico restante reproduzido após correções. A campanha não acessou `rotamoto` e não executou migration; 0041 continua APPLIED conforme [REGISTROS/0140.md](REGISTROS/0140.md), sem revalidação do ledger oficial. Ver [REGISTROS/0145.md](REGISTROS/0145.md). Não iniciar Campanha 0146.

## Registro histórico — Campanha 0143 (2026-10-13)

Esta consolidação atualiza somente pedidos/integrations com evidência da Campanha 0143. A matriz 0141 abaixo permanece como fotografia íntegra dos demais grupos e só é supersedida onde esta seção cita o mesmo assunto.

**Contagem 0143 (5 itens): RESOLVED 2 · PARTIAL 0 · OPEN 1 · BLOCKED 2.**

| ID | Status / prioridade | Item e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0143-R1 | **RESOLVED / P2** | Significado de “marketplace” confirmado no código: subsistema técnico para plataformas externas; não existe checkout, catálogo comercial ou marketplace próprio. `CONTRACT.md`, `backend/integrations/*`, `server.js` e UI confirmam fronteiras. | Manter nome e fronteira documentados; não criar produto próprio por inferência. |
| 0143-R2 | **RESOLVED / P2** | Integração iFood/Keeta atual: webhook/poll → inbox idempotente → `Order` em `domain_records`/`marketplace_order_versions` → comandos autenticados por tenant/permissão/CSRF. Testes unitários, PG E2E e Browser autenticado exercitaram listagem, adapter simulado e comando. 0041 continua documentada como APPLIED pelos registros anteriores; esta campanha não acessou o banco oficial. | Manter regressões, RLS e idempotência em mudanças futuras. |
| 0143-O1 | **OPEN / P1 de desenvolvimento** | A gestão externa é apresentada em “Pedidos de marketplace” dentro de Integrações, enquanto a lista principal usa IndexedDB/sync. O runtime cria o Order canônico mas não emite evento correspondente em `sync_outbox`, que abastece o sync. A chegada também não cria `Delivery`; por si só isso é correto para fulfillment da plataforma, mas deixa o fluxo de entrega própria sem decisão/projeção integrada. Não é um checkout ausente: é lacuna da unificação solicitada. | Adicionar publicação canônica idempotente e UI sem duplicações; definir payload mínimo/privacy e autoridade do estado; especificar como fulfillment `self-delivery` habilita Delivery do fluxo existente sem interferir em `platform delivery`. Cobrir replay, ordem, RLS, navegador e PG E2E antes de concluir. |
| 0143-B1 | **BLOCKED / P1 externo** | Homologação real não ocorreu: adapters usam fixtures. iFood/Keeta dependem de sandbox/credenciais autorizados; 99Food não tem contrato/API/onboarding oficial disponível nos registros/código. | Homologar cada provider separadamente quando houver acesso/documentação oficiais. Não bloquear implementação local de outbox/visualização por TLS, SMTP ou infraestrutura de produção. |
| 0143-B2 | **BLOCKED / P2 de teste** | `test:marketplace-worker-postgres` recusou antes de conectar, faltando URLs autenticadas de roles dedicados do worker/resolver. | Disponibilizar as credenciais/roles já aprovadas de E2E ou registrar que o teste não é viável; não relaxar guard/role. |

**Riscos prioritários:** a lista operacional do Restaurante ainda não agrega o Order externo e não há prova de transição externa→fluxo canônico de entrega própria. Não atribuir automaticamente driver; manter fulfillment pela plataforma separado. A homologação comercial segue sem evidência. Resultado desta campanha: **PARTIAL**; ver [REGISTROS/0143.md](REGISTROS/0143.md). A campanha posterior não foi iniciada.

## Registro histórico — Campanha 0141 (2026-10-13)

Esta matriz consolida o estado atual comprovável. Checkboxes antigos abaixo são fotografias das campanhas que os produziram; não devem ser lidos como estado atual quando registros posteriores os supersedem. Código e suítes foram inspecionados estaticamente nesta campanha; não foram executados testes que pudessem escrever em banco/dados.

**Contagem desta matriz (14 itens): RESOLVED 4 · PARTIAL 4 · OPEN 1 · BLOCKED 5.** Prioridade P1 = segurança/operação necessária antes de uso operacional ampliado; P2 = validação de fluxo/hardware; P3 = decisão ou acabamento de produto.

| ID | Status / prioridade | Item atual e evidência | Dependência / próximo passo |
|---|---|---|---|
| 0141-R1 | **RESOLVED** | Migration `0041_delivery_custody_return` **APPLIED** em `rotamoto`; ledger 0001–0041, checksum `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`. Registro posterior da 0140 descreve runner transacional, preflight sem linhas operacionais e validações pós-migration. | Nenhuma reaplicação. Validar apenas por documentação nesta campanha. |
| 0141-R2 | **RESOLVED** | RETURN bilateral, replay/idempotência, ACK/outbox, reconciliação cross-app, FIFO e cenários concorrentes têm resultados E2E posteriores em 0126–0138; attempt 17 de 0137 concluiu fluxo Browser, restart e teardown normal. | Manter regressões existentes; as tentativas antigas PARTIAL continuam preservadas como histórico. |
| 0141-R3 | **RESOLVED** | Isolamento tenant/RLS de `domain_records`, DeliveryProof e mídia corrigido/validado em 0134/0138; antigo alarme era oracle que ignorava chave composta. A exposição histórica de `secret_ref` em 0078 foi corrigida pela migration 0019 e verificada em 0079. Não foi encontrada evidência atual de defeito crítico aberto nesses pontos. | Não inferir auditoria de segurança completa: manter revisão de segurança e grants em qualquer nova migration. |
| 0141-R4 | **RESOLVED** | Correções visuais específicas documentadas em 0140 passaram: painéis de Relatórios em quatro combinações; controles do mapa sem colisão; confirmação física de GPS/mapa registrada pelo operador. | O PASS é somente para os componentes/cenários indicados; ver itens parciais abaixo. |
| 0141-P1 | **PARTIAL / P2** | UI global: estados vazios e Relatórios cobertos em capturas mobile/desktop claro/escuro, mas não todas as telas, modais, estados condicionais nem matriz completa multiviewport. 0140 mantém parecer visual global PARCIAL. | Completar inventário visual e revisão humana de aceite. Browser QA permanece somente consulta nesta campanha. |
| 0141-P2 | **PARTIAL / P2** | GPS/mapa: centralização e controles foram confirmados; cenários de permissão/sinal foram simulados. Não há prova completa de sessão autenticada, localização real, rota operacional e pins canônicos no aparelho. | Validar em Android com permissão e operação autenticada, sem tratar coordenada sintética como evidência física. |
| 0141-P3 | **PARTIAL / P2** | Acessibilidade: medições amostrais de contraste em Relatórios (mínimos reportados 4,75:1 claro e 6,03:1 escuro) e navegação coberta em alguns fluxos; não existe auditoria integral WCAG/teclado documentada para ambos os aplicativos. | Executar auditoria completa em campanha autorizada, incluindo foco, teclado, contraste e leitores de tela aplicáveis. |
| 0141-P4 | **PARTIAL / P2** | Mídia `filesystem-v1`: fluxo e persistência foram exercitados em E2E/dev isolado, com tenant e restart; isso não comprova instalação permanente no host operacional nem cobertura de arquivos fora da raiz identificada no ambiente de desenvolvimento. | Configurar/identificar host e raiz reais e demonstrar persistência, permissões, autorização e recuperação coordenada. |
| 0141-O1 | **OPEN / P3** | Liquidação financeira/settlement não está implementada; contrato define Earning como cálculo canônico, sem afirmar pagamento. É lacuna de capacidade deliberada, não bug atual nem autorização para movimentar dinheiro. | Decisão de produto/financeira, regras, reconciliação e contrato antes de planejar implementação. |
| 0141-B1 | **BLOCKED / P1** | Integrações iFood, 99Food e Keeta: código/adapters e testes sintéticos existem; registros 0130/0140 não comprovam sandbox, credenciais autorizadas, chamadas reais ou homologação. Painéis de integração em 0140 mostraram API indisponível (404 no servidor temporário). | Acesso autorizado a sandbox/documentação/credenciais e ambiente; homologar cada provedor isoladamente. |
| 0141-B2 | **BLOCKED / P1** | Deployment/produção: não há smoke test no host operacional e o estado documentado segue `ON_PREM_PRODUCTION_READY=NO`/produção não aprovada. TLS/CA, domínio/proxy, SMTP, serviço, scheduler/alertas, segredos duráveis e observabilidade dependem de ambiente real. | Provisionamento e janela aprovados; executar checklist e smoke no alvo, sem presumir sucesso de testes locais. |
| 0141-B3 | **BLOCKED / P1** | Backup de produção: recovery set 0140 pré-migration foi verificado e o restore isolado está documentado, mas isso não comprova pipeline recorrente no host atual, raiz de mídia operacional, cópia externa independente da chave, RPO/RTO medidos e rehearsal periódico do alvo. | Definir responsáveis/política, configurar mídia e custódia de chave, executar backup+restore no alvo descartável e registrar RPO/RTO. |
| 0141-B4 | **BLOCKED / P2** | QR/câmera física: scanner e fluxo sintético/testes de contrato existem; Chromium sem câmera física não comprovou leitura real nem permissões no Android. | Aparelho Android e permissão de câmera disponíveis; testar leitura, cancelamento, falha e alternativa manual. |
| 0141-B5 | **BLOCKED / P1** | Operação de identidade: os registros mostram dependências externas para bootstrap do primeiro operador, email/recuperação e custódia operacional de MFA. Os fluxos falham fechados; não há evidência de provisionamento operacional completo no deployment. | Definir operador/provisionamento e disponibilizar SMTP/segredo MFA com custódia aprovada; validar recuperação sem enfraquecer fail-closed. |

**Riscos prioritários:** antes de operação com usuários/dados reais, fechar B2/B3/B5 e homologar B1. B4 e P2 são bloqueios de validação física, não falhas comprovadas do scanner/GPS. Nenhum defeito crítico ativo foi reproduzido nesta auditoria documental; isso não substitui pentest nem readiness operacional.

Fonte detalhada: [REGISTROS/0141.md](REGISTROS/0141.md). Migration: [REGISTROS/0140.md](REGISTROS/0140.md) e [RESUMOS/0140.md](RESUMOS/0140.md).

## Atualização — Campanha 0135

- [x] **Dispatch Browser:** cadastro/vínculo, presença confirmada, manual padrão, opt-in, atribuição única, replay idempotente e convergência dos dois apps comprovados; FIFO e concorrência comprovadas em PostgreSQL E2E. Ver [REGISTROS/0135.md](REGISTROS/0135.md).
- [ ] **BLOCKED — paridade com oficial:** não existe URL read-only autorizada disponível; banco oficial não foi acessado.
- [ ] **Ambiente operacional:** storage de mídia, câmera/QR físico, homologação de integrações e deployment smoke continuam fora da prova E2E; sem declaração de prontidão para produção.

Ver [Registro 0135](REGISTROS/0135.md). Não iniciar Campanha 0136.

## Atualização — Registro 0134 — RLS multi-tenant

- [x] **RLS `domain_records`/DeliveryProof:** oracle diagnóstico corrigido em 0134 para avaliar chave composta e identidade de entidade; três execuções por roles operacionais, Browser HTTP e testes cross-tenant passaram.
- [ ] **BLOCKED — paridade oficial:** `MIGRATOR_DATABASE_URL` read-only autorizada não estava disponível; fornecer somente a URL aprovada para comparação. Banco oficial não foi acessado.
- [ ] **BLOCKED — storage operacional:** permissões, persistência e backup de `filesystem-v1` em host real ainda não foram validados; evidência é E2E isolada.

Ver [Registro 0134](REGISTROS/0134.md). Campanha 0135 está registrada; não iniciar Campanha 0136.

## Atualização — Registro 0133 — pendências de mídia e RLS

- [x] **RLS específico de `DeliveryProof`:** causa do alerta esclarecida no Registro 0134; asserção antiga ignorava chave composta/tenant. O conteúdo exato da linha da tentativa b8 não foi gravado e permanece impossível de identificar retrospectivamente.
- [ ] **BLOCKED — paridade oficial:** fornecer URL autorizada estritamente read-only; esta campanha não conectou ao banco oficial.
- [ ] **BLOCKED — storage operacional:** confirmar permissões, persistência e backup de `filesystem-v1` no host de homologação/produção. Evidência atual cobre somente diretório isolado E2E.
- [x] RETURN bilateral e teardown normal do Chromium (exit 0) comprovados em Browser novo. Regressões críticas 0120/0121/0122 passaram.

Ver [Registro 0133](REGISTROS/0133.md). Sem readiness de produção e sem iniciar outra campanha.

## Atualização — Registro 0132 — comprovantes de entrega

- [x] **MÉDIO — persistência local de comprovante:** Motoboy corrigido para passar `DeliveryProof` pela transação local e testar regressão.
- [x] **MÉDIO — ACK de mídia separado do ACK dos metadados:** upload precede inclusão canônica; falha mantém a prova na outbox local; retry idempotente validado por Browser/PG.
- [ ] **BLOCKED — tenant cross-login no Browser:** RLS de dois tenants passou no E2E; falta repetir GET da mídia com uma sessão autenticada de empresa distinta.
- [ ] **BLOCKED — paridade de segurança oficial:** `test:e2e-security` requer URL oficial read-only, indisponível; não acessar/configurar sem requisito fornecido.
- [ ] **BLOCKED — storage operacional:** confirmar configuração/autorização do provider `filesystem-v1` em homologação/produção; campanha provou somente `rotamoto_e2e`.
- [ ] **PARTIAL — teardown Browser RETURN:** cenário completo registrou handover e recebimento bilateral no E2E, mas o runner não encerrou após gravar o relatório; repetir verificação de teardown/rollback limpo.

Ver [Registro 0132](REGISTROS/0132.md). Nenhuma prontidão de produção foi declarada.

## Atualização — Registro 0131 — correção visual concluída

- [x] **MÉDIO — painel de presença Motoboy:** causa corrigida no CSS; status legível em 360/390/768/1366 px, sem overflow, controles contidos e não sobrepostos. Browser autenticado cobriu Online, Offline, presença pendente/confirmada, teclado, check-in, confirmação Restaurante, QR scanner e saída.
- [ ] **BLOCKED — leitura QR por câmera física:** o botão abre o scanner; Chromium headless não tem câmera física. Validar leitura real em dispositivo com permissão de câmera quando disponível.
- [ ] Permanecem os riscos de 0130 sem relação com a correção visual: media storage real, homologação de iFood/99Food/Keeta, GPS/câmera física, WCAG integral e deployment smoke. Não representam regressão desta campanha.

Ver [Registro 0131](REGISTROS/0131.md). Correção responsiva encerrada; não iniciar campanha seguinte sem solicitação.

## Atualização — Registro 0130 — riscos e cobertura restantes

- [x] **MÉDIO — visual Motoboy:** painel de presença corrigido e revalidado em Browser nos quatro viewports pela Campanha 0131; ver [REGISTROS/0131.md](REGISTROS/0131.md).
- [x] **MÉDIO — prova de entrega E2E:** upload/consulta autenticados, persistência IndexedDB, restart e recuperação por falhas passaram nas campanhas 0132/0135; storage operacional/backup ainda precisa de validação no host alvo.
- [x] **MÉDIO — dispatch Browser:** Campanha 0135 comprovou cadastro/vínculo, presença confirmada, manual padrão, opt-in automático, atribuição única, replay idempotente e convergência cross-app. Browser com um Driver elegível; FIFO/múltiplos candidatos e interleavings cobertos em sessões PostgreSQL independentes. Ver [REGISTROS/0135.md](REGISTROS/0135.md).
- [ ] Homologar iFood/99Food/Keeta com sandbox/credenciais autorizados; testes desta campanha foram sintéticos. Verificar QR/câmera/GPS físicos em Android.
- [ ] Rodar contraste WCAG/teclado integral e deployment smoke em ambiente operacional autorizado. Nenhuma prontidão para produção foi declarada.
- Earning é cálculo canônico, não liquidação; settlement permanece fora da funcionalidade implementada. Oficial 0040 read-only; E2E 0041.

Ver [Registro 0130](REGISTROS/0130.md).

## Atualização — Registro 0129 — gate de ACK/restart fechado

- [x] A lacuna de ACK parcial HTTP + IndexedDB real e reinício que deixara o Registro 0128 PARTIAL foi fechada nos dois apps com Chromium real, perfil persistente e PostgreSQL `rotamoto_e2e`.
- [x] ACK inválidos preservam pacote/operações; ACK completo permite replay idempotente. Route concorrente converge; evento concorrente Motoboy foi provado persistido localmente após reload.
- [x] Corrigida ordenação de ACCEPTED/PICKED_UP offline via `expectedVersion`; Browser/PG confirmou sequência canônica.
- Nenhuma alteração no banco oficial (0040 read-only); E2E em 0041. Limites de ambiente e cobertura estão descritos no [Registro 0129](REGISTROS/0129.md).

## Atualização — Registro 0126 (2026-10-10)

- [x] **Campanha 0126 — Browser RETURN completo:** attempt-38 completou fluxo offline, reconexão, handover e recebimento bilateral com PostgreSQL e Motoboy convergidos.
- [x] **Campanha 0126 — regressões 0120/0121/0122:** passaram em tentativas isoladas attempt-02.
- [x] **Campanha 0126 — concorrência do recibo RETURN:** duas sessões autenticadas e transações PostgreSQL independentes; chave igual produziu replay idempotente e um fato; chaves distintas produziram uma confirmação e conflito de revisão ou duplicata convergente, também com um fato.
- Escopo mais amplo ainda não coberto por esses gates: payload divergente/replay de criação RETURN, reorganização concorrente e todas as combinações RELEASE/INCIDENT offline. Banco oficial permaneceu read-only em 0040; E2E 0041.

Ver [Registro 0126](REGISTROS/0126.md). A auditoria solicitada 0127 está registrada abaixo.

## Atualização — Registro 0127 — achados a acompanhar

- [x] **MÉDIO — ACK completo:** validação bijetiva de packetId/tenant/device/operação/entidade/ID antes de persistir ACK; remoção do pacote após commit.
- [x] **MÉDIO — concorrência:** semântica de no-op/revisão assertada; três repetições com sessões independentes passaram.
- [x] **BAIXO — proveniência:** runners gravam campaign/runId/orderNo atuais; nenhuma evidência antiga editada.
- [x] **BAIXO — tela RETURN:** RETURN recebido não exibe espera de sync nem valor financeiro inventado.
- [x] **BAIXO — migrations test:** inventário 0039–0041, 46 tabelas, RLS/grants/constraints conferidos no E2E.

Ver [Registro 0127](REGISTROS/0127.md) e [Registro 0128](REGISTROS/0128.md). A lacuna de ACK parcial HTTP com IndexedDB e reinício real foi fechada pela 0129; ver [REGISTRO 0129](REGISTROS/0129.md).

## Atualização — Registro 0124 (2026-10-10)

- [ ] **OPEN — Browser RETURN completo:** runner autenticado confirmou criação/apêndice no PostgreSQL, mas trava ao abrir/validar reorganização da rota; diagnosticar CDP, console, rede e navegação com perfil novo, então completar execução, arrival, handover e recebimento bilateral Browser.
- [ ] **OPEN — concorrência RETURN independente:** criar testes com sessões PostgreSQL independentes para criação idempotente/concorrente, reorganização, confirmação simultânea, replay e payload divergente. O harness atual do teste de domínio serializa em um único cliente.
- [ ] **OPEN — offline RETURN e decisões:** testar RETURN/RELEASE/INCIDENT e divergências de custódia ponta a ponta online/offline, preservando fatos não confirmados.
- [ ] **OPEN — migration oficial:** `rotamoto` permanece 0040; 0041/0042 somente com autorização. E2E permanece 0041; nenhuma 0042 preparada.

Ver [Registro 0124](REGISTROS/0124.md). Não iniciar Campanha 0125 sem solicitação.

## Atualização — Registro 0123 (2026-10-10)

- [ ] **OPEN — Browser RETURN completo:** executar com novo fixture autenticado o fluxo criar/atribuir, aceitar/coletar, cancelar após coleta, decidir RETURN, criar na rota, reordenar na UI, registrar start/arrival/handover no Motoboy e confirmar recebimento no Restaurante; validar refresh/reabertura, IndexedDB/outbox/inbox e PostgreSQL. O teste transacional HTTP/PG não substitui Browser.
- [ ] **OPEN — regressão 0121:** investigar travamento CDP após a confirmação da presença e antes da criação/sync de Order/Delivery. A tentativa parcial e capturas estão em `browser-tests/evidencias/campanhas/0123/regressao-0121/`; repetir em perfil/porta novos.
- [ ] **OPEN — concorrência RETURN:** usar sessões PostgreSQL independentes para dois operadores criarem RETURN/confirmarem receipt e para reorganização concorrente; cobrir payload divergente, replay e revisão antiga.
- [ ] **OPEN — offline RETURN e divergência:** Browser C–J, release/incident, chegada e handover offline, receipt por outra sessão e convergência após revisões da rota; não aplicar eventos rejeitados retroativamente.
- [ ] **OPEN — migration oficial:** `rotamoto` permanece em 0040. Não aplicar 0041/0042 sem autorização expressa. `rotamoto_e2e` permanece em 0041; não há 0042 preparada.

Ver [Registro 0123](REGISTROS/0123.md). Não iniciar Campanha 0124 sem solicitação.

## Atualização — Registro 0078 (2026-10-06) — BLOQUEIO DE SEGURANÇA

- [ ] **CRITICAL/BLOCKED:** `rotamoto_app` tem SELECT efetivo na coluna `logistics_providers.secret_ref` pela permissão de tabela concedida na 0017. Não fazer grant/revoke manual nem rollback improvisado. Projetar migration aditiva corretiva e testar grants/RLS antes de liberar providers.
- [x] Backup coordenado pré-migration foi cifrado/verificado e preservado; ledger oficial está em 0018. A 0018 foi aplicada antes de o defeito do checkpoint 0017 ser percebido; não há correção automática aplicada.
- [ ] Depois da correção aprovada: validar catálogo completo 0018, readiness, `npm test` dos dois apps, testes PostgreSQL E2E, guards, audit, sintaxe/diff. Nenhuma dessas suítes finais foi executada nesta campanha após o gate falhar.

Ver [Registro 0078](REGISTROS/0078.md). Em qualquer continuação, começar por estado read-only; não reaplicar migrations nem tocar no backup/chave.

## Atualização — Registro 0077 (2026-10-06)

- [x] Heatmap histórico territorial implementado com snapshot de destino manual, RLS/FORCE, agregação por célula, limiar k=5, cobertura e filtros tenant-scoped. Não promove GPS/endereços/coords locais e não usa geocoding durante renderização.
- [ ] **OPEN — rollout:** aplicar migrations autorizadas 0016–0018 no deployment pretendido e confirmar readiness; o banco oficial não foi alterado nesta campanha.
- [ ] Coletar snapshots canônicos de destino por fluxo controlado para criar cobertura real; não inventar coordenadas. Geocoding gerenciado e mapa administrativo de bairros não foram implementados.
- [ ] Browser E2E autenticado do relatório: NOT_TESTABLE sem sessão/CDP disponível.
- [ ] Rentabilidade territorial requer receita e custos completos; SLA territorial requer deadline/promisedAt confiável; comparação provider preço/ETA requer dados/adapters comprovados.

Ver [Registro 0077](REGISTROS/0077.md). Os gates gerais de deployment on-prem dos Registros 0068/0069 permanecem pendentes e não foram reabertos.

## Atualização — Registro 0076 (2026-10-06)

- [x] Fundação tenant-scoped de provider/fulfillment/dispatch manual, RLS/FORCE, isolamento e fallback testados em PostgreSQL E2E transacional; commit local Restaurante `4b943b1`, sem push.
- [ ] **OPEN — rollout do schema:** aplicar migrations 0016 e 0017 no deployment oficial pelo fluxo autorizado e confirmar health/readiness. Nenhuma migration oficial foi executada nesta campanha.
- [ ] **OPEN — alocações legadas:** revisar entregas já atribuídas antes da 0017; não existe backfill automático de fulfillment histórico. Operação/reatribuição suportada cria projeção interna.
- [ ] **OPEN — automação logística:** integrar protocolos reais e fluxos de quote/dispatch/cancel/tracking/reconciliação somente após documentação, credenciais e homologação dos providers; acrescentar guardas/autorizações de eventos externos.
- [ ] Continuam separados os gates on-prem dos Registros 0068/0069: paths/chaves duráveis e cópia offline, scheduler/monitoramento, smoke real TLS/CA/proxy/SMTP/URL/keystore/filesystem/readiness e medição/decisão RPO/RTO/retenção.
- [ ] Browser E2E autenticado da tela de providers/fulfillment ficou NOT_TESTABLE nesta sessão; executar no próximo harness com sessão autorizada.

## Atualização — Registro 0073 (2026-10-05)

- OCR multi-layout local/offline implementado e verificado com corpus sintético e Chromium offline. Não há bloqueio interno de código identificado nesta campanha.
- [ ] Validar OCR/câmera em Android físico com comandas reais anonimizadas, registrar métricas por campo e ajustar thresholds/aliases somente a partir dessa evidência. Não inferir qualidade de produção do corpus sintético.
- O gate recovery PostgreSQL+mídia não vazio listado em registros anteriores foi encerrado pelo Registro 0068; as entradas históricas abaixo não representam estado atual desse gate.

Ver [Registro 0073](REGISTROS/0073.md).

## Atualização — Registro 0067 (2026-10-05)

- [ ] **OPEN — recovery não vazio + teardown:** o lifecycle autenticado criou a prova, mas o trigger append-only impediu apagar 15 audit rows; Company/User permanecem pelas FKs. Não remover/alterar auditoria nem enfraquecer o trigger. Definir procedimento E2E que mantenha fixture transacional visível ao snapshot/pg_dump e reverta integralmente, ou reset isolado aprovado para `rotamoto_e2e`.
- [ ] Recovery-set `rotamoto_e2e`→restore descartável não ficou comprovado nesta tentativa; não há ID/checksum aprovado para registrar.
- [ ] Paths/chave duráveis e cópia offline; scheduler/monitoramento; smoke TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore/readiness; medir RPO/RTO e decidir retenção/offsite conforme Registro 0064.

Ver [Registro 0067](REGISTROS/0067.md).

## Atualização — Registro 0066 (2026-10-05)

- [ ] **OPEN — rehearsal não vazio:** `rotamoto_backup` não autenticou em `rotamoto_e2e` via pgpass. O grant temporário mínimo foi comprovado e revogado; nenhum fixture/backup/restore foi executado. Prosseguir somente com mecanismo de autenticação já autorizado para essa entrada, sem criar/copiar credenciais ou trocar de role.
- [ ] Demais gates de deployment do Registro 0064: paths/chave duráveis e cópia offline; scheduler/monitoramento; smoke TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore/readiness; medição RPO/RTO e decisão operacional de retenção/offsite.

Ver [Registro 0066](REGISTROS/0066.md).

## Atualização — Registro 0065 (2026-10-05)

- [ ] **OPEN — recovery não vazio PostgreSQL + mídia:** `rotamoto_backup` não tem CONNECT/USAGE em `rotamoto_e2e`; o lifecycle aprovado reverte a fixture antes que `pg_dump` independente possa capturá-la. Não conceder permissões nem deixar fixture persistente sem procedimento test-only autorizado.
- [ ] Configurar paths/chave duráveis e cópia offline protegida; instalar/monitorar scheduler; executar smoke de deployment (TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore/readiness); medir RPO/RTO e decidir retenção/offsite operacionalmente.

Detalhes em [Registro 0065](REGISTROS/0065.md).

## Atualização — Registro 0060 (2026-10-05)

- [x] Garbage collection filesystem com dry-run, grace mínimo 45d, confirmação canônica incluindo tombstones, intents persistentes e isolamento RLS tenant; upload/sync/GC compartilham lock. Intent sem sync não expira para preservar Motoboy offline; blobs abandonados podem reter espaço.
- [x] Superfície local do operador com status sanitizado e secret write-only via stdin; filesystem config/env separado de tenant; auditoria local 0600 com actorRef. Não há settings tenant autorizando paths, keys, banco ou config global.
- [x] CLI de rotação do keystore cobre exatamente inventário local manifesto, recriptografa/valida em stage, backup privado e rollback; falhas intermediárias testadas.
- [x] Pipeline operacional de backup PostgreSQL implementado: pg_dump custom, AES-256-GCM, chave externa ao banco, manifest HMAC/checksum, retenção, verificação TOC e restore explicitamente limitado a database descartável. Nenhuma opção aceita `rotamoto`.
- [ ] Cópia e restore seguros do volume de mídia/provas dentro do conjunto de backup ainda ausentes.
- [ ] Provisionar `rotamoto_backup` e `rotamoto_restore` pelo DBA e criar target `rotamoto_disposable_*`; executar dump/restore rehearsal real e validar owners, grants, RLS/FORCE, policies, checksum/manifesto e operação canônica. Não conceder BYPASSRLS ao runtime.
- [ ] Definir e medir RPO/RTO, prazo legal/operacional de retenção e janela de expiração para upload intents abandonadas; configurar deploy TLS/CA/SMTP/keys/audit/scheduler.
- [ ] Browser E2E MFA/DeliveryProof offline retry não verificável: nenhum browser/CDP host-managed exposto nesta sessão; Chromium Termux encerrou com 134/inotify na tentativa anterior.
- Não executar `npm run test:postgres` legado enquanto suas fixtures escreverem em `rotamoto`. Usar `rotamoto_e2e` com lifecycle rollback e security parity.
- Observação: `rotamoto` local estava sem migration ledger apesar da afirmação em 0059; 0001–0015 aplicadas, e queries read-only mostram zero `companies` e `domain_records`. Nenhuma fixture/dado tenant foi criado. Ver [Registro 0060](REGISTROS/0060.md).

## F9 — Atualização do Registro 0057: campanha autenticada executada

- [x] Browser E2E local autenticado integrado ao lifecycle rollback-scoped em `rotamoto_e2e`; ciclo Order→Delivery→Motoboy→reconciliação, FAILED, RETURNED e retry após offline passaram.
- [x] Segurança: MFA/sessão/CSRF, tenant e Driver server-side, ausência de API cache, ausência de secrets em localStorage/IndexedDB e ledger negado ao runtime passaram. Oito combinações dos quatro viewports não tiveram overflow. Nenhum bug interno P0/P1/P2/P3 aberto.
- [x] Regressão de identidade de sync corrigida: UUID canônico de Order/Delivery importado em nova instalação resolve ao mesmo registro, com alias tenant/type e `baseVersion`; sem duplicação. Commits: Restaurante `f6f99a4`, Motoboy `268c716`.
- [ ] Reatribuição e fato atrasado com duas identidades permanecem NOT_TESTABLE_WITH_CURRENT_CAPABILITY pela fixture de um Driver; suítes de serviço cobrem autorização/reconciliação. Sem bug interno aberto.
- **F9 local:** campanha das capacidades disponíveis aprovada. **F9 global:** depende de decidir se aceite inclui grupos externos ainda não verificáveis: email/recovery real; armazenamento operacional do segredo MFA; câmera/GPS físicos; blob remoto; iFood, 99Food e Keeta. Nenhum foi simulado como aprovado.
- Guardas, paridade e lifecycle E2E; `npm test` nos dois apps; node checks e diff-check passaram. `rotamoto` somente READ ONLY; fingerprint catálogo/ledger antes/depois `0ce3aa0ae64db6398f54840d0894917c249cd76a0581b2f7f8e64aecd46303c9`; rollback sem resíduo. Evidências em `~/projetos/browser-tests/f9-authenticated-2026-10-05-round-{61,62,63,64}/`. Ver [Registro 0057](REGISTROS/0057.md).

## F9 — Atualização Registro 0052 (2026-10-04)

- [x] **P3 Motoboy — resolvido:** 401 na primeira visita sem sessão autenticada não afirma que sessão expirou; uma sessão anteriormente autenticada conserva mensagem de expiração. Helper segue a mesma regra do Restaurante. Regressão automatizada, cache SW v40.8 e CDP nos três viewports passaram.
- P1/P2 e dois P3 anteriores seguem FIXED. Inventário aberto: P0 0 / P1 0 / P2 0 / P3 0. F9 segue aberta.
- Reclassificação de 0051: o grupo identidade/tenant/Driver é **B — fixture/provisionamento controlável**, não `BLOCKED_EXTERNAL`. Permanecem sete grupos C: email, MFA/armazenamento seguro, câmera/GPS físicos, blob remoto, iFood, 99Food, Keeta.
- **Pré-condição local antes de E2E autenticado:** lifecycle de fixture QA isolada. O endpoint de primeiro tenant exige `authorizeProvisioner` não configurado; email/MFA falham fechado; não há limpeza integral de Company/User/audit. Não provisionar fixture na configuração oficial atual.
- Próxima etapa: especificar ambiente de teste isolado e limpeza/auditáveis antes de qualquer criação; enquanto isso prosseguir com suites rollback e browser anônimo/local. Detalhes A/B/C no [Registro 0052](REGISTROS/0052.md).

# Pendências

## Atualização — Registro 0080 (2026-10-06)

- [x] Impressão por browser no Restaurante implementada: configuração local, modo manual e fila automática com preview/confirmação, deduplicação, layout isolado e QR seguro opcional. Nenhuma migration.
- [ ] Validar impressão em impressora/browser físico e confirmar variações do diálogo e cópias no deployment alvo. O provider browser não promete silent print; bridge/ESC-POS segue futuro e fora desta campanha.
- [ ] Browser offline real ficou NOT_TESTABLE porque CDP reportou `navigator.onLine=true`; manter evidência automatizada de cache do shell e exclusão das APIs.
- Gates de deployment on-prem continuam conforme Registro 0069; esta campanha não altera `ON_PREM_PRODUCTION_READY`.

## PostgreSQL oficial — Registro 0079

- [x] Migration 0019 aplicada pelo runner oficial após recovery set prévio cifrado/verificado.
- [x] `rotamoto_app` não possui SELECT amplo em `logistics_providers`, nem SELECT/UPDATE de `secret_ref`; tentativa SQL real no oficial negada com SQLSTATE 42501. Projection das colunas operacionais permitida.
- [x] Paridade catalogal de segurança, 19 checksums, contagens e readiness passaram; nenhuma contagem de tabela preexistente mudou. Suites, audits, guards, node checks e diff-check passaram.
- [ ] **OPEN — deployment 0069:** configurar volumes e permissões permanentes, keystore e chave de backup duráveis/offline, SMTP/base URL, serviço Node/runit, domínio/TLS/proxy/CA, scheduler/alertas e smoke no host alvo; decidir retenção, cópia offsite, RPO/RTO. `ON_PREM_PRODUCTION_READY = NO`.

## Self-hosted readiness — Registro 0059 (2026-10-05)

- [ ] **P1 — Storage:** implementar coleta tenant-safe de arquivos sem prova canônica referenciando-os, com período de graça; cobrir resposta HTTP perdida e falha de sync. Upload/read e persistência canônica já operam; storage segue PARTIAL até cleanup seguro.
- [ ] **P1 — Backup/restore PostgreSQL:** falta papel/procedimento autorizado que leia o conjunto completo sem desabilitar RLS forced ou elevar runtime; depois integrar pg_dump criptografado, manifesto/checksum, retenção, verificação e restore em alvo descartável. Estado BLOCKED, não executar DDL/role admin sem a autorização operacional necessária.
- [ ] **P1 — Configuração de instalação:** criar superfície separada de operador com status sanitizado para storage, SMTP, backup, keystore/provider e URL base; operações de secrets write-only/audited. Tenant não pode alterar opções globais.
- [ ] **P1 — Keystore:** ferramenta CLI segura de rotação transacional com backup temporário, rollback, arquivos 0600 e procedimento de recuperação. Atualmente só provisioning e uso criptografado.
- [ ] **P2 — Browser:** repetir CDP E2E de MFA, links SMTP e DeliveryProof offline/retry quando Chromium do Termux/CDP ficar disponível; rodada 0059 parou em 404 do harness estático e encerramento Chromium 134.
- [ ] **P2 — Cloud:** validar deploy com TLS/proxy/PostgreSQL gerenciado, providers remotos S3/MinIO, KMS/Vault e backup offsite criptografado. Providers remotos são opcionais para on-prem filesystem; necessários conforme topologia cloud escolhida.
- [ ] **External inherent:** protocolos/contas/homologação iFood, 99Food e Keeta; GPS/câmera físicos e permissões de dispositivos.
- [x] MFA TOTP/recovery nativo e fluxo SMTP de convite/recovery integrado; delivery proof filesystem e authorization tenant/Driver/CSRF integrados. Migration 0014 aplicada; lifecycle E2E rollback e security parity em 14 migrations passaram.

## F9 QA inicial — Registro 0049 (2026-10-04)

- [x] **P1 Restaurante — resolvido no Registro 0050:** leitura de sessão obsoleta não reverte escolha local; 401 atrasado preserva app não-inert, e Conta reabre para nova autenticação.
- [x] **P1 Motoboy — resolvido no Registro 0050:** seletores de período corrigidos para coleção; bootstrap e handlers concluem, capture/manual funcionam sem câmera.
- [x] **P2 Motoboy — resolvido no Registro 0050:** controles admin opcionais são guardados; 401 inicial encerra em estado não autenticado sem unhandled rejection.
- [x] **P2 Motoboy — resolvido no Registro 0050:** main rolável ocupa área separada da navegação desktop; bottom nav mobile segue fixa.
- [x] **P3 Motoboy — corrigido no Registro 0051:** valor sem Earning canônico agora usa `—`, com explicação de sync fora da grade numérica; shell offline avançado para v40.7.
- [x] **P3 Restaurante — corrigido no Registro 0051:** 401 no primeiro restore anônimo não exibe “Sua sessão expirou”; uma sessão anterior efetivamente autenticada continua recebendo aviso de expiração.
- [x] **P3 Motoboy — corrigido no Registro 0052:** o `GET /api/identity/session` real 401 exibia copy de expiração sem sessão anterior; corrigido no Registro 0052 e revalidado em três viewports.
- Fluxos externos/sem dados ainda não testados: login/logout administrativo com conta autorizada; email de convite/recovery; MFA seguro; Driver/Delivery canônicos; câmera/GPS em hardware; blob storage; iFood, 99Food e Keeta. Não criar credenciais/dados para destravar.
- `F9_INITIAL_QA = PASS_WITH_FINDINGS` preserva a contagem de entrada do 0049 (P0 0/P1 2/P2 2/P3 2/BLOCKED_EXTERNAL 8). Estado corrente após 0052: `P0_OPEN=0`, `P1_OPEN=0`, `P2_OPEN=0`, `P3_OPEN=0`, `BLOCKED_EXTERNAL=7`; fixture autenticada permanece como pré-condição B, e F9 permanece aberta. A matriz em seis viewports não encontrou overflow horizontal; a bottom nav desktop havia sido reproduzida e foi corrigida no 0050. Ver [F9_QA_INICIAL.md](F9_QA_INICIAL.md), [Registro 0049](REGISTROS/0049.md) e [Registro 0051](REGISTROS/0051.md).

## Reconciliação pré-F9 — Registro 0048 (2026-10-04)

- F1–F8 reconciliadas contra contratos, código atual, testes e PostgreSQL: F1 B, F2 A, F3 B, F4 B, F5 B, F6 B, F7 B, F8 B. **Não há pendência interna estrutural bloqueando a F9. READY_FOR_F9 = YES.**
- Itens marcados como abertos em seções históricas abaixo representam o estado na data daqueles registros. Em especial, o vínculo User/Membership↔Driver do 0043 foi resolvido pelo 0044; login/RBAC listado antes de 0041, rotas/provas/backup anteriores a F1 e adapters externos não verificados anteriores a 0046 não são backlog interno atual.
- Antes/durante F9: Browser QA real nos fluxos integrados e IndexedDB; documentar limitações de Chromium/Termux e evidências. Isso é validação planejada, não defeito de implementação.
- Bloqueios externos isolados: protocolos, contas e homologação iFood/99Food/Keeta; primeiro owner/operator auditável; provider email; MFA com armazenamento seguro; blob storage; domínio/TLS/host/PostgreSQL de produção; decisão de retenção/RPO/RTO e restore em alvo isolado. Nenhum foi simulado ou declarado disponível.
- Validação desta reconciliação: `npm test` nos dois apps; `npm run test:postgres` Restaurante; `migrate.js status` (0001–0013 aplicadas); `node --check` JS nos dois apps; `git diff --check`; igualdade byte a byte de `CONTRACT.md`, `contract.js` e `backup-format.js`. Nenhuma migration foi executada nem dado/role/configuração foi alterado. Ver [Registro 0048](REGISTROS/0048.md).

## Atualização — Registro 0047 / F8 operação (2026-10-04)

- [x] Configuração development/test/production com defaults locais somente fora de produção; startup production fail-closed para DB runtime/TLS/CA/secret provider, HTTPS origins, Host e proxy confiável.
- [x] Backend loopback, headers seguros, limites/timeouts/pool, readiness de schema compatível sem migration automática, request ID/log JSON sanitizado e shutdown SIGTERM/SIGINT com drain.
- [x] Runbooks versionados de deploy/rollback, PostgreSQL e IndexedDB backup/restore, retenção; nginx apenas exemplo não instalado.
- [x] Service worker Motoboy cacheia somente assets same-origin exatos, nunca API, usa ativação aguardando abas antigas e não apaga IndexedDB; contrato estático testado.
- [ ] Produção ainda depende de domínio/TLS, host e PostgreSQL de produção, secret provider/KMS/CA, email/MFA, operadores/distribuição; executar deploy e restore em alvo isolado com RPO/RTO aprovado.
- [ ] Definir retenção legal/operacional para GPS, proofs, PII, audit/logs, inbox/outbox, aliases e backups; não foi inventado TTL.
- F8 classificada **B — preparação local concluída com dependências externas isoladas**. Nenhuma configuração real do Termux/nginx/PostgreSQL mudou. Ver [Registro 0047](REGISTROS/0047.md).

## Atualização — Registro 0046 / F4 integrações (2026-10-04)

- [x] Registry provider-neutral bloqueado por padrão; estados administrativos nunca inferem conexão por cadastro/credencial declarada.
- [x] Rotas legadas de iFood/99Food/Keeta e serviços de 99Food/Keeta desativados fail-closed; nenhum polling automático ou verificação presumida de webhook.
- [x] Catálogo administrativo protegido por sessão, tenant/RLS e `integrations.manage`; não expõe `secret_ref`, credenciais ou payload.
- [x] UI distingue origem local, simulador de laboratório e provider não conectado; pedidos sintéticos iFood ficam em memória e não alteram Orders/IndexedDB.
- [ ] Implementar os protocolos reais somente após documentação oficial aplicável, credenciais/conta e homologação por provider. KMS/secret manager, autenticidade webhook e armazenamento/retention de payload também precisam de suporte operacional.
- F4 classificada **B — infraestrutura/implementação local concluída com dependências externas claramente isoladas**. Sem migration; sem Browser QA ou push. Ver [Registro 0046](REGISTROS/0046.md).


## Atualização — Registro 0045 / F7 UI/UX (2026-10-04)

- [x] Consolidação estática de navegação, conta/sessão e diálogos acessíveis nos dois apps; foco por teclado, Escape/Tab, retorno de foco e fundo inerte.
- [x] Restaurante: administração visual de vínculo Membership↔Driver por API existente, labels de busca/filtros e estilos de identidade responsivos.
- [x] Motoboy: estados de navegação/filtros semanticamente corretos, toast acessível, modal de execução e layout com safe-area/teclado virtual.
- [x] Ajuste de contraste do acento verde e remoção de regras CSS obsoletas/ineficazes; suítes `npm test` dos dois apps passaram.
- [x] As configurações agora informam o escopo local deste aparelho; o Motoboy esclarece que custos/metas são estimativas e Earning canônico vem do Restaurante.
- [ ] Validação visual renderizada e em dispositivos assistivos permanece para F9; não houve Browser QA, screenshots ou CDP conforme escopo.
- F7 classificada **B — implementação concluída / Browser QA pendente para F9**. Commits dos apps: Restaurante `69e3492e6ace36c781425baaeba199a208eb451e` e `3e84fad04eb877b466a6757a4fedf2db8e0f66c8`; Motoboy `7e41182e55f365c368e3ca730ddb7e9231b337a5` e `2c82d094ef8a2f04aa436507a36682b4f36e95fc`. Ver [Registro 0045](REGISTROS/0045.md).

## Atualização — Registro 0044 / F6 Motoboy (2026-10-04)

- [x] Vínculo canônico User/Membership↔Driver: migration `0013_membership_driver_binding`, FK composta tenant/type, unicidade por Driver, RLS/FORCE mantida e rollback protegido contra perda de vínculo/notificação.
- [x] API administrativa PUT/DELETE para associar/desassociar; RBAC `company.manage`, CSRF, MFA, validação de tenant/Driver/membership, idempotência e auditoria.
- [x] Sessão resolve `driverId` server-side. Instalação, push/pull Motoboy e leituras não administrativas sem Driver ficam bloqueados/escopados. `source.app`, `actor` e hints de `driverId` não autorizam.
- [x] Reatribuição envia notificação mínima ao Driver anterior; fatos aceitos não são removidos; push atrasado de evento/localização/prova é rejeitado e conflito local preservado. Operações locais offline continuam possíveis.
- [x] Testes relacionados de migration, integridade/grants/RLS, membership, MFA/CSRF, sessão, pull/push, ownership, reatribuição e Motoboy foram executados; fixtures transacionais revertidas. Sem Browser QA.
- [ ] Provider de blob para envio real de DeliveryProof; acesso a GPS/câmera físicos permanece dependente de hardware/permissões; Browser QA integrado permanece em F9. Esses itens não mantêm F6 parcial.
- F6 classificada **B — implementação concluída / Browser QA pendente para F9**. Baselines e `main` preservadas; sem push. Ver [Registro 0044](REGISTROS/0044.md).

## Atualização — Registro 0043 / F6 Motoboy (2026-10-04)

- [x] Ciclo local de execução `ACCEPTED/PICKED_UP/OUT_FOR_DELIVERY/ARRIVED/DELIVERED/FAILED/RETURNED`, motivos, eventos/outbox idempotentes e preservação offline.
- [x] Pull de Delivery/Order/Route/Earning atualiza stores e telas depois de commit; revisões stale não regridem cache; reentrega arquiva tentativa anterior.
- [x] GPS real validado/throttled e persistido localmente; assinatura PNG limitada/hash fica explicitamente local até provider seguro; Motoboy não publica Earning.
- [x] API sync projetando eventos de aceite/coleta; Service Worker não armazena resposta `/api/`. `npm test` Motoboy e PostgreSQL dirigido passaram.
- [ ] **F6 bloqueada para conclusão segura:** modelar vínculo canônico autenticado User/Membership↔Driver e limitar server-side o pull/push às Deliveries do próprio motorista. `driverId`, `actor` e `source.app` vindos do cliente não são autoridade.
- [ ] Provider de blob para envio de prova/foto; permissões/hardware GPS/câmera real; Browser QA somente em F9. Ver [Registro 0043](REGISTROS/0043.md).

## Atualização — Registro 0042 / F5 Restaurante (2026-10-04)

- [x] Pedidos locais: criar/editar/validar e persistir Order+Delivery+Earning numa transação; IDs canônicos e projeções não substituem fatos de execução.
- [x] Entregas: atribuição/change de motorista com transição permitida e `driverId`; cancelamento mantém Order/Delivery e histórico; estados Motoboy, eventos e provas aparecem no detalhe; rejected/conflict ficam observáveis via syncState.
- [x] Reentrega: UI solicita somente a partir de `DELIVERED`, `FAILED` ou `RETURNED`; servidor mapeia `DELIVERY_RETURNED`, aplica a transição de contrato, audita com actor da sessão e permite reatribuição posterior.
- [x] Rotas: gestão por `Route.deliveryIds`, ordenação de paradas, prevenção de associação duplicada/entre empresas e preservação de membros históricos terminalizados.
- [x] Motoristas: administração de nome/telefone/status sem editar GPS/presença de execução; atribuição usa Driver ID.
- [x] Earnings/relatórios: registros usam `amountMinor`, moeda, componentes e regra; repasse em relatório soma inteiros; indicadores de conclusão usam horário de conclusão.
- [x] Backup/restore existente foi conectado à área de dados com aviso de JSON plaintext sensível e merge seguro sem sobrescrever registros/outbox/conflitos atuais.
- [x] Sync constrói Order/Driver/Delivery/Route em shape do contrato, preserva status canônico de execução ao enviar edição comercial e não depende de geocoding para montar pacote.
- [x] Testes: `npm test`, `npm run test:sync`, teste PostgreSQL dirigido `tests/test-domain-sync-postgres.js`, syntax checks e `git diff --check` passaram. Sem alteração de schema/migration; sem Browser QA.
- [ ] Browser QA integrado F5 fica em F9 e não mantém F5 aberta.
- F5 classificada **B — implementação concluída / Browser QA pendente**. Próximo bloco planejado: F6. Ver [Registro 0042](REGISTROS/0042.md).

## Histórico de pendências anteriores

## Atualização — Registro 0041 / F3 Identidade (2026-10-04)

- [x] Política de lifecycle User/Membership/Role/Permission; grants de permission subset; sem autoelevação; último owner protegido com serialização transacional; tenant e actor derivados no servidor; auditoria.
- [x] APIs de role e membership e convite administrativo protegidas por sessão, CSRF, permission keys e MFA exigida; signup público inexistente.
- [x] Migração aditiva `0012_identity_rbac_lifecycle` aplicada; runtime/migrator, RLS/FORCE e grants mínimos preservados.
- [x] Restaurante e Motoboy: login, logout, restore/expiração, recuperação, convite, MFA fail-closed, troca de tenant e estados de UI; pós-login dispara sync best-effort sem bloquear operação local offline.
- [x] Administração no Restaurante para empresa ativa, memberships/status, roles/permissões, convites e metadados suportados de integrações; controles limitados por permission key. Profiles locais identificados como locais.
- [x] Testes finais `npm test` nos dois apps, `npm run test:postgres` no Restaurante, `node --check` dos JS modificados e `git diff --check` passaram.
- [ ] Provisionamento do primeiro owner requer operador autorizado e ato administrativo auditável. Não foi criado operador ou conta real.
- [ ] MFA operacional requer adapter/verificador e armazenamento seguro de segredo/chave; challenge permanece fail-closed, sem modo de desenvolvimento que reduza a proteção.
- [ ] Envio real de convite/recuperação requer provider de email e domínio/configuração operacional; sem envio real ou exposição de token bruto.
- [ ] Browser QA dos formulários, cookies, redirects e layout fica para F9; não executado conforme escopo.
- F3 classificada **PARCIAL** apenas pelas dependências externas acima. Próximo bloco: F5; não iniciar F4 neste registro. Ver [Registro 0041](REGISTROS/0041.md).

## Atualização — Registro 0040 / F2 (2026-10-04)

- [x] Inventário e documentação versionada da API v1 do Restaurante em `docs/API-v1.md`, com métodos, autenticação, permission keys, entradas, saídas, erros e idempotência.
- [x] Health liveness/readiness, request ID, logs estruturados sem payload, respostas de erro estáveis, rate limit e consultas autenticadas/paginadas por entidade com tenant/RLS/RBAC.
- [x] Administração de leitura para company, memberships, roles/permissions e status de integrações sem secrets. Operações de domínio mutáveis permanecem nos casos de uso do sync Local-First.
- [x] Migration `0011_runtime_integration_read`: runtime recebeu somente SELECT em integrations/external_accounts; RLS/FORCE mantida, sem DDL/escrita runtime.
- [x] Testes HTTP/PostgreSQL de permissões, tenant, cursor/IDs, métodos, estado readiness, grants e migration rollback/reapply; `npm test`, `npm run test:postgres`, checks JS e `git diff --check` passaram.
- [ ] Mutação de memberships/roles e convite genérico entram em F3 após fechar lifecycle, proteção contra escalada e UX; provisionamento do primeiro owner continua fail-closed sem adapter operacional. Isso não bloqueia as operações de domínio v1 cobertas em F2.
- [ ] Browser QA das novas superfícies e dos clientes permanece para F9; não foi executado nesta etapa.
- F2 classificada **concluída para operações internas v1 definidas**. Próximo bloco recomendado: F3, sem iniciar nesta execução. Ver [Registro 0040](REGISTROS/0040.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Atualização — Registro 0039 / F1 (2026-10-04)

- [x] F1 concluída como implementação. Classificação B: Browser QA/IndexedDB real segue no checkpoint F9 e não mantém a F1 aberta.
- [x] Schemas canônicos compartilhados, Route→Delivery, Earning seguro em minor units, modelo de mídia/storageRef, migrations PostgreSQL 0009–0010 e backup Local-First v1 com merge transacional não sobrescrevente.
- [x] Migrações IndexedDB explícitas do Registro 0038 permanecem sem bump; nenhuma estrutura local nova foi necessária.
- [ ] Blob storage real/cifrado e backup cifrado aguardam provider e decisão de chave/UX. Retenção de GPS/PII/provas/audit aguarda política produto/legal. Estes itens são capacidades bloqueadas independentes, não impedem F1.
- Ver [Registro 0039](REGISTROS/0039.md), [MODELO_DADOS.md](MODELO_DADOS.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Registro 0038 — estado histórico da F1 antes da conclusão

- [x] F1.1: matriz versionada das entidades/campos conhecidos, authority, local/PG/API/sync, IDs/revisões/relações, constraints/índices, offline, legado, sensibilidade e retenção criada em [MODELO_DADOS.md](MODELO_DADOS.md).
- [x] Revisão read-only das migrations PostgreSQL 0001–0008 e schema instalado; `migrate.js status` confirmou todas aplicadas. Decidido manter entidades de domínio em JSONB até campos/consultas estarem definidos; sem migration PG nova.
- [x] Registry de migrations IndexedDB aditivas implementado: Restaurante 4→6 e Motoboy 5→7; adiciona índices secundários não únicos e marcador versionado sem regravar registros; paths de eventos/logs corrigidos em novas migrations aditivas; aborta upgrade em erro.
- [x] Testes dirigidos dos registries, bootstrap/upgrade de versões anteriores simulado, sentinel local preservado, lifecycle Motoboy; syntax checks e `git diff --check` passaram.
- [x] Os schemas, relação, moeda, mídia e backup/merge foram implementados no Registro 0039; ver a matriz vigente em MODELO_DADOS.md.
- [x] Export/import v1 cobre todas as stores; colisões são preservadas e operações pendentes/conflitos/tombstones não são sobrescritos.
- [x] F1.2 foi implementada no Registro 0039: schemas, Route→Delivery, Earning minor units, mídia referenciada, migrations 0009–0010 e backup/restore v1 seguro.
- [ ] Validar upgrade/import no Chromium real no checkpoint F9; não é pendência de implementação F1.
- Contrato e migrations/banco mudaram no Registro 0039; main, tags e baselines permaneceram intactas. Ver [Registro 0038](REGISTROS/0038.md), [Registro 0039](REGISTROS/0039.md) e [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md).

## Plano mestre — Registro 0037 (2026-10-04)

Use [PLANO_FINALIZACAO.md](PLANO_FINALIZACAO.md) como fonte de verdade e não duplique trabalho concluído em 0033–0036.

- [x] F1.1: matriz versionada de entidades/campos/autoridade e decisão JSONB/relacional criada; registry IndexedDB e upgrades aditivos base implementados no Registro 0038.
- [x] F1.2: schemas, Route→Delivery, Earning, mídia, backup/merge e migrations aditivas concluídos no Registro 0039.
- [ ] Validar o upgrade/import em IndexedDB real no checkpoint F9; F1 não fica aberta por essa validação.
- [x] F2: API v1 interna definida e implementada para identidade, domínio read, sync write, administração de leitura, health/readiness, RBAC/RLS e erros/logs; migration/grants e documentação concluídos no Registro 0040.
- [x] F3: implementação local de clientes/telas e APIs de identidade concluída no 0041; permanecem apenas o primeiro operador/owner, MFA operacional segura, email real e Browser QA em F9 conforme bloqueios externos registrados.
- [x] F5 Restaurante: fluxos administrativos/operacionais registrados no 0042.
- [x] F6 Motoboy: vínculo User/Membership↔Driver e enforcement server-side concluídos no Registro 0044; Browser QA continua em F9. Provider de blob e hardware/permissões físicos são dependências de capacidade, não bloqueios da implementação F6.
- [x] F4: registry/catalog e bloqueio local seguro concluídos no Registro 0046. [ ] Adapters reais, fila/inbox, ingestão e configuração operativa continuam condicionados a documentação oficial, credenciais/contas, homologação e secret manager por provider.
- [x] F7: implementação estática concluída no Registro 0045; Browser QA/renderização permanece para F9.
- [x] F8: preparação local de runtime/proxy/shutdown, logs/readiness, backup/restore e runbooks concluída no Registro 0047; [ ] deploy real, provider TLS/secrets, RPO/RTO e restore isolado aguardam infraestrutura/operador.
- [ ] F9: QA integrado CDP desktop/tablet/mobile e hardening depois das fases anteriores.
- Route→Delivery foi decidido e implementado em F1/Registro 0039. Retenção legal/operacional de localização/provas permanece pendente, sem prazo inventado.
- [ ] Provider de email, primeiro operador/owner, MFA seguro, contas/documentação de fornecedores e ambiente de produção são bloqueios externos apenas para as capacidades correspondentes; continuar trabalho independente local.

O inventário estático de IndexedDB não leu dados reais; não rodar Browser QA nem reimplementar sync/reconciliação 0034–0036 nesta etapa de planejamento. Ver [Registro 0037](REGISTROS/0037.md).

## Atualização — Registro 0036 (2026-10-04)

- [x] Pull canônico reconciliado às projeções IndexedDB dos dois apps, com validação de tenant/ID/revisão, preservação de alterações pendentes e tombstones explícitos.
- [x] ACK por operação integrado aos clientes; accepted/duplicate confirmam canonical ID/revisão; rejected/conflict preservam dados/estado e evitam retry infinito da mesma versão.
- [x] Outbox/inbox/syncState têm ciclo de vida, status observável, retry transitório, single-flight/Web Locks e compactação conservadora documentada.
- [x] Bootstrap de sessão existente, retomada CSRF, sync após gravação local/retorno de conectividade/manual; operação local permanece independente de rede.
- [ ] Implementar login visual/sessão nos dois clientes com estado fail-closed; ativação do primeiro owner permanece dependente de operador e MFA seguro.
- [x] Route→Delivery foi formalizada em F1/Registro 0039 por `Route.deliveryIds`, sem relação inversa redundante.
- [ ] QA end-to-end via Chromium/CDP permanece para checkpoint posterior, conforme solicitação de não executar Browser QA nesta etapa.
- [ ] Email real, domínio/TLS e serviços/credenciais de fornecedores externos continuam pendências externas independentes.
- Ver [Registro 0036](REGISTROS/0036.md), DEC-0006 e commits Motoboy `1eb7e6a`/`6a1574f`, Restaurante `de53138`/`df562f7`.

## Atualização — Registro 0035 (2026-10-04)

- [x] Formalizar ownership de Order, Earning, Delivery, DeliveryEvent, LocationPoint, DeliveryProof, Route, Driver e Company em DEC-0006 e manter `CONTRACT.md`/`contract.js` sincronizados.
- [x] Vincular instalação sync à sessão/usuário/tenant e app key escolhida por endpoint server-side; não confiar em `source.app`.
- [x] ACK inequívoco por operação (`accepted`, `duplicate`, `rejected`, `conflict`), canonical ID/revision/código; revisão e transições explícitas sem LWW; retry de packet/event idempotente.
- [x] Corrigir divergência de Earning: Restaurante calcula/escreve canonical Earning; Motoboy não publica Earning.
- [x] Integrar os dois clientes aos endpoints de instalação/push/pull preservando IndexedDB e operação offline, outbox retry, ACK no `syncState`, aliases/revisões e cursor/cache em transações.
- [x] Migration aditiva 0008 aplicada e testada; migrations 0001–0007 permaneceram intactas.
- [x] Pull guardava snapshots/eventos antes de haver reconciliação automática; estratégia de merge que preserva edições pendentes foi implementada no Registro 0036. Não reimplementar; cobrir regressões em QA final.
- [x] Route→Delivery e seus campos/regras de membership foram formalizados e implementados em F1/Registro 0039.
- [ ] Email real, HTTPS/domínio de implantação e eventuais segredos/provedores externos continuam dependências externas; não bloqueiam os fluxos locais/offline nem o backend de sync loopback.
- Ver [Registro 0035](REGISTROS/0035.md), DEC-0006 e commits Restaurante `78e10f2`, Motoboy `d88aeea`.

## Atualização — Registro 0033 (2026-10-03)

- [x] PostgreSQL role split concluído e validado: database sob ownership DBA, schema/objetos sob `rotamoto_migrator`, runtime `rotamoto_app` sem CREATE/TEMP/DDL nem acesso ao ledger; RLS/FORCE e append-only confirmados.
- [x] Runner e configuração separados: `DATABASE_URL` só para runtime `rotamoto_app`; `MIGRATOR_DATABASE_URL` apenas para migrations, com validação de role/destino e senha fora da URL.
- [x] `npm run test:postgres`, teste da configuração de segurança, `migrate.js status` como migrator e smoke HTTP como runtime passaram. Nenhum dado sintético ficou persistido.
- [ ] Fase 2 operacional depende de adapter de operador/prova de titularidade, provider de email, HTTPS/domínio e MFA com KMS/secret manager. Não provisionar tenant/owner real antes disso.
- [ ] Fases posteriores de integração humana, secrets, sync e import/export dependem da identidade operacional e do contrato/rollout Local-First. Não foi identificado bloco independente seguro nesta execução sem antecipar essas dependências ou inventar semântica/permissões.
- Ver [Registro 0033](REGISTROS/0033.md) e commit Restaurante `c96907bc46165ec8ff2f7dda721bdc6b8160b0a2`.

## Atualização — Registro 0032 (2026-10-03)

- [x] Diagnóstico read-only de owners, grants, schemas/tabelas/sequences, funções/triggers, policies/RLS, default privileges, memberships e database ACL concluído.
- [x] Script/runbook, checkpoint completo validado e execução manual do split concluídos; queries pós-flight confirmadas no Registro 0033.
- [x] Runner e suíte PostgreSQL separados entre conexão de migrations/DDL e conexão runtime/RLS.
- Ver [Registro 0032](REGISTROS/0032.md) e `rota-moto-restaurante/backend/postgres/admin/role-split-runbook.md`.

## Atualização — Registro 0031 (2026-10-03)

- [x] Bloqueio administrativo resolvido após checkpoint íntegro e operação manual; conclusão verificável no Registro 0033.
- Ver [Registro 0031](REGISTROS/0031.md). Nenhuma alteração foi feita no banco ou nos aplicativos nesta execução.

## Atualização — Registro 0030 (2026-10-03)

- [x] Auditoria da estrutura base, constraints, FKs, índices, RLS e migration runner concluída. Migration `0004_foundation_integrity_constraints` aplicada; fecha integridade do actor de auditoria, ordem de expiração da sessão e timestamp de publicação da outbox.
- [x] Migration runner testado para checksums, detecção de migration ausente, reexecução concorrente/idempotente, rollback transacional, down fail-closed e clean install em schema temporário rollback.
- [x] Bloqueio estrutural de ownership/runtime foi resolvido e validado após a operação DBA manual no Registro 0033.
- [x] Owner/migrator e runtime estão separados; migration runner/status e testes específicos usam credenciais/roles distintas.
- Conclusão do Registro 0030 foi superada: a separação de privilégios está pronta, mas API permanece loopback e fases operacionais ainda aguardam dependências descritas no Registro 0033.
- Ver [Registro 0030](REGISTROS/0030.md) para diagnóstico, migration, testes, commits e limites.

## Atualização — Registro 0029 (2026-10-03)

- [x] API HTTP local de identidade no Restaurante: login/logout/sessão, seleção tenant, recuperação/consumo, aceitação de convite/verificação e endpoint administrativo protegido por adapter. Não há signup público.
- [x] Middleware HTTP: cookie opaco `__Host-`, CSRF/origem, contexto tenant por sessão, permission key/RLS, payload limitado e validado, rate limit por IP/endpoint, erros e logs seguros. Servidor permanece loopback.
- [x] Compatibilidade de Argon2id resolvida para o requisito do servidor Node >=18 com `argon2` 0.45.1; compilação local Termux validada. Auditoria npm reportou zero vulnerabilidades.
- [x] Testes HTTP/RLS com fixtures sintéticas em transação revertida; nenhum tenant/usuário sintético permaneceu no PostgreSQL oficial.
- [ ] Configurar adapter operacional de operador privilegiado/prova de titularidade. A rota de provisionamento falha fechada sem ele; teste fake não é credencial real.
- [ ] Configurar provider real de email, domínio/HTTPS e MFA/TOTP com KMS/secret manager. Owners permanecem obrigados a MFA e não concluem login até existir esse fluxo.
- [ ] Integrar UI/frontend aos endpoints em origem segura; nenhum browser flow de identidade existe ainda. Browser QA visual não aplicável até essa integração.
- [ ] Rate limit atual é memória por processo/socket; antes de operação atrás de proxy ou múltiplas instâncias, definir proxy confiável para IP e storage compartilhado sem confiar em headers arbitrários.
- [ ] Continuam pendentes: convites de membros, rotas humanas de iFood/Keeta/99Food, caller/worker e webhooks autenticados, sync Local-First autenticado, import/export por tenant e fases restantes DEC-0002.
- Ver [Registro 0029](REGISTROS/0029.md) para endpoints, decisões de segurança, testes, Argon2, commit e limitações.

## Atualização — Registro 0028 (2026-10-03)

- [x] Base técnica local da Fase 2 no Restaurante: provisionamento transacional/idempotente de owner, role/permissões versionadas, UUIDv7, auditoria, convite/verificação de email por token digest e recuperação por token digest.
- [x] Primitivas internas de Argon2id, bloqueio de tentativas, sessão opaca, CSRF, idle/absolute expiry, revogação, troca de tenant validada por membership, RBAC e transação RLS; testes com provider fake e dados PostgreSQL revertidos.
- [x] Migrations `0002_identity_provisioning_tokens` e `0003_provisioning_membership_constraint` aplicadas ao PostgreSQL oficial; FKs impedem request cujo user e empresa não formam a mesma membership.
- [ ] Instalar adapter operacional confiável para prova de titularidade/autorizar provisionador e entregar `actorRef` auditável; não há tenant ou owner real criado.
- [ ] Configurar email provider, domínio/origem HTTPS e fluxo operacional. A interface existe e falha fechada sem provider; nenhum envio real foi feito.
- [ ] Implementar MFA/TOTP com KMS/secret manager. Owners são gravados com MFA obrigatório e autenticação bloqueada até essa etapa.
- [ ] Integrar serviços a uma API HTTP: rotas login/logout/recuperação/provisionamento, validação e erros padronizados, rate limit por IP, middleware CSRF, cookies HTTPS e autorização. Nenhuma rota foi montada.
- [ ] Identidade requer `crypto.argon2` (Node >=24.7, API release-candidate); decidir/validar runtime de produção ou adotar implementação Argon2id suportada antes de deploy. O serviço de integração legado ainda declara Node >=18.
- [ ] Convites de membros existentes e integração da identidade aos apps não foram conectados. Sync/autorização, providers e rollout continuam após as dependências acima.
- `npm audit --omit=dev --offline` Restaurante retornou zero; consulta online ao registry falhou por DNS. Audit online do Motoboy retornou zero. QA por browser não se aplica enquanto não há endpoint/fluxo visual de identidade.
- Ver [Registro 0028](REGISTROS/0028.md) para commits, testes, schema, auditoria e limites.

## Atualização — Registro 0027 (2026-10-03)

- O P1 do Registro 0019 segue resolvido pelo Registro 0026: comandos/escritas Motoboy compartilham Web Lock e relêem IndexedDB antes do snapshot.
- Fase 1 DEC-0002 agora concluída no PostgreSQL de desenvolvimento oficial via `.pgpass`; migrations, tabelas, checksum e RLS default-deny testados. Nenhuma conta/tenant foi provisionada.
- [ ] Confirmar Web Locks na matriz real de navegadores de produção. O projeto não declara essa matriz; Chromium 149 foi testado, e gravações falham explicitamente sem lock.
- A Fase 2 depende de processo de prova de titularidade/provisionamento do primeiro owner e serviço de email verificado, inexistentes. Fases 3–6 aguardam essa identidade operacional.
- Ver [Registro 0027](REGISTROS/0027.md) para estado cruzado, QA, Fase 1, commits e limites; o histórico anterior do P1 está em [Registro 0026](REGISTROS/0026.md).

## QA de navegador — Registro 0022 (2026-10-03)

- [x] Teste de captura Motoboy concluído com câmera sintética: Chromium headless sem câmera física falha com `NotFoundError`, mas dispositivo virtual 640×480 gerou imagem no fluxo de captura. Teste em hardware real segue para validação de campo.
- [x] Chegada, assinatura e finalização Motoboy validadas com geolocalização CDP; estado `done` e assinatura PNG sobreviveram ao reload. Teste em GPS físico não disponível nesta sessão.
- Fluxos dos dois apps passaram em desktop/tablet/mobile, backup/import e conteúdo não confiável; sem HTTP local 4xx/5xx nem overflow horizontal da página. Detalhes anteriores em [Registro 0022](REGISTROS/0022.md), repetição em [Registro 0027](REGISTROS/0027.md).

## Alta prioridade — antes de expor operações ou dados reais fora do host local

- [ ] Manter o serviço Node em loopback até existir autenticação humana e autorização tenant server-side. Proteção atual: Registro 0009; não remover sem concluir as fases 1–3.
- [x] PostgreSQL 18.6 oficial acessível em `127.0.0.1:5432`, banco `rotamoto`, usuário `rotamoto_app` por `.pgpass`; Fase 1 versionada aplicada. [ ] Secret manager/KMS, backup/restore e rotação de chaves continuam sem infraestrutura.
- [x] Fase 1: schema/migrations para User, Credential, RecoveryToken, Company, Membership, Session, Role/Permission, Integration, ExternalAccount, audit log, canonical ID map e inbox/outbox persistentes.
- [ ] Implementar processo operacional auditável de criação de tenant/owner com prova de titularidade, convite de uso único e verificação/entrega de email.
- [x] Implementar primitives internas de Argon2id PHC, verificação de convite/email, recuperação single-use, lockout de credencial, sessão digest, CSRF digest, idle/absolute expiry, revogação e camada HTTP local (Registros 0028–0029). MFA e integração de frontend seguem abertas.
- [x] Implementar role owner com catálogo inicial server-side versionado, permission check no serviço e troca de empresa validada por membership/RLS (Registro 0028). Catálogo completo por rota/recurso e convite de membros seguem abertos.
- [x] Montar sessão/API local com cookie opaco, CSRF em mutações, rate limit e API de sessão no listener loopback (Registro 0029). [ ] Configurar HTTPS/domínio/proxy seguro antes de qualquer exposição externa.
- [ ] Atualizar rotas iFood, Keeta e 99Food: sessão humana para ações de operador; caller de worker escopado; webhooks com autenticação/replay/deduplicação persistentes; vínculos merchant/shop/store confirmados; secrets no secret manager. CORS permanece apenas política de navegador.
- [x] Implementar contexto tenant de identidade por sessão, constraints e RLS default-deny com teste de bypass/negação cross-tenant (Registros 0027–0029). [ ] Aplicar autorização equivalente às futuras rotas de negócio e sync.
- [ ] Implementar mapeamento/reconciliação dos IDs locais por instalação e migração de `company_local` sem colisão nem fusão entre empresas; manter IDs de Order/Delivery relacionados.
- [ ] Migrar sync/offline com autorização no servidor, idempotência persistente, validação de revision/tombstone, conflitos explícitos e política de reautenticação; nunca aceitar identidade/permissão do payload local.
- [ ] Restringir import/export autenticado a dados operacionais permitidos; rejeitar entidades de acesso e segredos; validar tenant/schema/tamanho/referências e auditar conflito/resultado.
- [x] Suites sintéticas de credenciais, sessão/CSRF, RBAC, tenant/RLS, recovery, convite, rate limit e API HTTP passam (Registro 0029). [ ] Continuam pendentes replay/webhooks, offline, import/migração e validação de rollout.

## Ordem de execução

1. Fase 0 loopback e Fase 1 schema/migrations concluídas.
2. Próxima: completar a operação da Fase 2 com adapter auditável de operador, email, MFA/KMS e onboarding real; não criar dados/usuários reais até isso existir.
3. Depois: conectar frontend em HTTPS e migrar rotas humanas para sessão/permission checks; avançar integrações/webhooks/workers, Local-First sync/import/export e rollout na ordem DEC-0002.

As decisões arquiteturais permanecem em `DECISOES.md` (DEC-0002). O listener continua em loopback. Não expor backend com dados reais antes das fases 2–6 e dos itens operacionais bloqueadores acima. IndexedDB continua como persistência local/offline; PostgreSQL é a camada canônica do servidor.

## Reconciliação do plano — Registro 0020 (2026-10-03)

DEC-0002 continua definindo oficialmente a Fase 1: schema e migrations PostgreSQL de identidade, tenant/membership, sessão, roles/permissões, integrações/contas externas e mapeamento de IDs. O roadmap técnico posterior de persistência do Restaurante complementa o planejamento de persistência local-first e evolução para sincronização; não substitui essa Fase 1. Nenhum item da Fase 1 foi implementado na execução do Registro 0020.

## Histórico resolvido

- Registro 0006: corpo HTTP acima de 1 MiB recebe 413.
- Registro 0007: gravação principal do estado Motoboy é atômica.
- Registro 0008: estado, evento operacional e outbox Motoboy são persistidos na mesma transação; `npm test` padrão do Motoboy executa a suíte.
- Registro 0009: serviço de integrações Restaurante recusa inicialização em host não-loopback enquanto não houver autenticação humana/tenant. Isso reduz exposição acidental, mas não substitui autenticação das rotas locais.
- Registro 0010: renderização do Restaurante não reflete status desconhecido fornecido por backup ou integração como HTML; fallback seguro e teste contra markup malicioso adicionados.
- Registro 0026: snapshots gerados por abas Motoboy diferentes já não se sobrescrevem silenciosamente; a atualização é rebaseada nos dados persistidos sob Web Lock.

## Revisão do Registro 0009 — 2026-10-01

As pendências foram convertidas em fases de implementação sob DEC-0002. A barreira de loopback foi implementada no Restaurante. Nenhuma fase dependente de PostgreSQL, KMS/secret manager ou email foi marcada como concluída; não expor operações ou dados reais externamente antes de implementar autenticação e autorização tenant server-side. Consulte o Registro 0009.


## Revisão do Registro 0011 — 2026-10-01

Corrigida a precedência incorreta entre uma entrega e um tombstone mais antigo no mesmo pacote recebido pelo Restaurante. Segue como próximo passo técnico recomendado acrescentar testes executáveis de falha/recuperação para recebimentos multi-store. As pendências de backend/identidade acima continuam abertas.

## Revisão do Registro 0012 — 2026-10-01

O Restaurante agora confirma se o `packetId` já foi recebido dentro da transação que grava domínio e recibo, prevenindo reaplicação concorrente do mesmo pacote. A cobertura atual verifica a estrutura do fluxo por teste automatizado de sincronização; um teste executável com IndexedDB simulado para abortos/recuperação de transações multi-store continua como possível próximo passo. As pendências de backend/identidade, tenant e infraestrutura permanecem abertas.

## Revisão do Registro 0013 — 2026-10-01

O Motoboy agora recupera a abertura do IndexedDB após erro, fecha conexões em `versionchange` e trata abertura bloqueada sem vazar uma conexão que conclua tardiamente. Foi acrescentado teste isolado do ciclo de vida da conexão. Permanecem abertas as pendências de backend/identidade, tenant e infraestrutura; testes de abortos reais de transações multi-store seguem como possível trabalho futuro.

## Revisão do Registro 0014 — 2026-10-01

Corrigida a exclusão parcial do histórico no Motoboy: tombstones, corridas, projeções, eventos, outbox e demais stores afetados agora participam de uma transação, e a UI só atualiza após `oncomplete`. Próxima lacuna técnica específica desta frente: exercitar abort/falha/retentativa das transações multi-store do Motoboy e do recebimento no Restaurante com IndexedDB simulado leve ou em runtime que o forneça. O ambiente atual não tem IndexedDB nem simulador; os testes desta etapa confirmam estruturalmente a ordem e o escopo transacional. Pendências de backend/identidade, tenant e infraestrutura seguem abertas.

## Revisão do Registro 0015 — 2026-10-01

Concluída a lacuna de teste da fronteira de recebimento: o Motoboy agora grava projeções atualizadas e recibo atomicamente e publica a memória só após commit; testes nos dois projetos verificam erro e abort após writes staged, rollback de stores, ausência de atualização em memória/UI, retry e idempotência. A arquitetura global ainda não tem uma fronteira geral entre comando de negócio e estado mutável: `persistOnly` persiste a projeção atual e não desfaz por si só mutações antecipadas feitas por seus chamadores. Próximo ponto técnico concreto: introduzir uma fronteira de comando para as operações gerais Motoboy que hoje mutam `state` antes de `persistOnly`, começando pelos fluxos de corrida e ajustes, com rollback de memória sem sobrescrever operações concorrentes. Para validação nativa de IndexedDB, executar esses mesmos invariantes em runtime que o forneça; os testes locais atuais modelam somente commit/erro/abort na fronteira de transação. Pendências de identidade, tenant e infraestrutura permanecem abertas.


## Revisão do Registro 0016

A fila de snapshots protege os comandos de corrida migrados. Continua pendente completar a fronteira para salvamento/autosave de ajustes, tema/idioma/fechamento diário, exclusão com tombstone atômico e outros mutadores de rota/GPS que persistem após alteração global. Testes de IndexedDB nativo permanecem limitados ao runtime apropriado.


## Revisão do Registro 0017

Resolvida a exclusão de corrida fora da fronteira: corrida/projeção e tombstone agora confirmam juntos via `commitRiderCommand`, e replay de exclusão de ID ausente é no-op. Os ajustes foram tratados no Registro 0018. Mutadores gerais de rota/GPS que persistem após alteração global permanecem fora desta sequência de escopo restrito. QA Chromium concluiu sem SIGKILL; o stderr de desligamento mencionou GPU após QA, sem falha durante o fluxo.

## Revisão do Registro 0018

Autosave/salvamento de settings, tema/idioma e fechamento diário agora serializam snapshots via `commitRiderCommand`; falha de persistência preserva o estado ativo. Cobertura estrutural passou, junto à suíte padrão. Ainda não foi validada transação IndexedDB nativa neste registro. Mutadores gerais de rota/GPS não foram migrados; permanecem como trabalho técnico separado. Nenhuma decisão arquitetural nova foi necessária.


## Revisão do Registro 0019

Corrigidos: transação parcial de normalização inicial; publicação prematura em cálculo de distâncias/ordem e GPS; importação de backup antes da persistência; exclusão/limpeza sem coordenação com a fila e backup; recebimento que não retinha tombstone e podia reaplicar entrega antiga; escape de IDs/assinatura em HTML.

Pendente P1: a fila `commitRiderCommand` é local à instância JavaScript. Duas abas simultâneas podem calcular snapshots independentes e uma gravação posterior pode substituir a mais recente; esta rodada não introduziu lock/CAS entre abas para evitar ampliar a arquitetura sem cobertura de runtime. Também não há teste com IndexedDB nativo neste runtime.

Limitação existente: atualização de `localStorage` após commit continua best-effort; falha de quota/escrita é registrada no console, mantendo IndexedDB como estado principal. Browser QA não executado.
## Atualização Registro 0058 — fundações self-hosted

- [x] Fundamentos no Restaurante: filesystem object store (UUID, limites, tipo/hash/integridade, atomicidade), keystore AES-GCM escopado, SMTP TLS adapter, TOTP/recovery primitives, writer de backup filesystem e documentação de deployment.
- [ ] **OPEN P1 — DeliveryProof:** ligar upload/leitura autenticados a CSRF, tenant e Driver server-side; persistir metadata PostgreSQL/RLS e testar lifecycle/remoção de órfãos.
- [ ] **OPEN P1 — MFA:** implementar enrollment, confirmação, seed server-side criptografado, contador replay persistente, rate-limit/auditoria e recovery codes one-time sem criar bypass; manter MFA administrativo fail-closed até lá.
- [ ] **OPEN P1 — Email/config:** completar templates/URLs web de convite/recovery, administração status-only e separação visível instalação vs tenant; testar SMTP em ambiente autorizado sem retornar segredos.
- [ ] **OPEN P1 — Secrets:** runbook/ferramenta de rotação segura da master key e validação operacional de permissões/backup offline.
- [ ] **OPEN P1 — Backup:** integração `pg_dump`, criptografia, agenda/retention, checksum/manifest e restore ensaiado em DB descartável; remota opcional.
- [ ] **OPEN P1 — Paridade/PG:** repetir PostgreSQL suite e auditoria read-only com URLs provisionadas; `npm run test:e2e-security` e `npm run test:postgres` não conectaram por falta das URLs.
- iFood/99Food/Keeta seguem BLOCKED_EXTERNAL; câmera/GPS dependem de dispositivo. F9 aprovada no 0057 não foi reaberta. Ver [Registro 0058](REGISTROS/0058.md).

## Atualização — Registro 0063

Fechado: rehearsal real pg_dump → artefato cifrado/manifesto → verificação → restore PostgreSQL descartável, incluindo comparação do ledger, estrutura, RLS/FORCE, policies, ownership e contagens.

Continuam OPEN para fechar ON_PREM_PRODUCTION_READY: (1) backup/restore coordenado filesystem DeliveryProof + PostgreSQL, com checksums/manifesto e validação canônica de referências; (2) provisioning/preflight/smoke completo em instalação limpa, incluindo permissões, keystore, SMTP, TLS/CA/proxy e scheduler; (3) retenção e decisão operacional de offsite/RPO/RTO com medição. Não são requisitos legais presumidos. Browser E2E não foi executado nesta rodada por escopo. Detalhes/evidências em [Registro 0063](REGISTROS/0063.md).

## Atualização — Registro 0064

Fechado no código e no ensaio: backup set indivisível lógico DB+mídia, cifra/HMAC/checksum, snapshot lock compartilhado por upload/sync/GC, restore staging para alvos descartáveis, validação por referência, retenção como diretório completo, status de operador e runbooks cron/timer.

OPEN para ON_PREM_PRODUCTION_READY: (1) rehearsal com ao menos uma DeliveryProof canônica não vazia em database test-only autorizado; o `rotamoto` real tinha zero referências, e `rotamoto_e2e` não recebeu grant de backup; (2) paths de mídia/backup persistentes e backup key durável com cópia offline protegida; (3) instalar cron/systemd/runit e alertas de falha/idade/espaço; (4) smoke de deployment real para TLS/CA/proxy, SMTP/PUBLIC_BASE_URL, keystore, scheduler e readiness; (5) medir RPO/RTO no deployment e decidir retenção/offsite operacionalmente. Retenção default 30d não é obrigação legal. Hardlink físico ficou NOT_TESTABLE por restrição Android/Termux. Detalhes no [Registro 0064](REGISTROS/0064.md).
## Atualização — Registro 0068 (2026-10-05)

- [x] **FECHADO — recovery PostgreSQL + mídia não vazio:** rehearsal real nos databases descartáveis 0068 com uma DeliveryProof filesystem canônica; conjunto cifrado/autenticado, verify, restore DB+filesystem, validação origem↔restore, teardown integral, grants revogados e resíduos ausentes. Ver [Registro 0068](REGISTROS/0068.md).
- [ ] **OPEN — deployment on-prem:** provisionar volumes/paths duráveis e permissões; manter chave de backup fora do DB com cópia offline protegida; instalar/monitorar cron/timer; executar smoke no host com PostgreSQL TLS/CA/proxy, SMTP, PUBLIC_BASE_URL, keystore, filesystem e health/readiness; medir RPO/RTO e decidir retenção operacional.
- [ ] **OPEN — cloud-ready separado:** escolher e validar no deployment cloud storage/secret/backup provider, cópia offsite e restore. Não é requisito para filesystem local on-prem.
- iFood/99Food/Keeta e hardware GPS/câmera permanecem externos/inerentes; não bloqueiam o core self-hosted.

## Atualização Registro 0069 — deployment Termux inspecionado

- [ ] **NEEDS_CONFIGURATION — volumes:** escolher paths persistentes separados para `ROTAMOTO_MEDIA_DIRECTORY`, `ROTAMOTO_BACKUP_DIRECTORY`, `ROTAMOTO_SECRET_STORE_DIRECTORY` e arquivos de key; provisionar ownership/permissões privadas fora do checkout/webroot e espaço/alertas. Não usar shared Android storage para segredos/backups sensíveis.
- [ ] **NEEDS_CONFIGURATION — serviço e rede:** instalar serviço Node supervisionado e ambiente privado; configurar `DATABASE_URL` de runtime, keystore/ref DB, `PUBLIC_BASE_URL`, origins/hosts e proxy TLS; provisionar domínio/certificado/cadeia e CA TLS PostgreSQL conforme topologia; executar readiness e smoke autenticado.
- [ ] **BLOCKED_EXTERNAL / NEEDS_CONFIGURATION — SMTP:** operador precisa prover relay/host/conta/credencial, guardar a credencial no keystore, configurar SMTP e validar TLS/entrega para convite/recovery.
- [ ] **NEEDS_CONFIGURATION — backup:** criar chave de backup permanente fora do DB, guardar cópia offline protegida separadamente, configurar role/url pgpass no serviço operacional, agendar `backup:create`/verify, retenção e alertas. O recovery set não vazio permanece comprovado pelo 0068.
- [ ] **NEEDS_OPERATOR_DECISION — operação:** definir frequência/RPO, medir restore/RTO no host destino, aprovar retenção com responsável legal/operacional e decidir necessidade/destino de offsite. Defaults de 30 dias e grace 45d são parâmetros técnicos, não obrigação legal.
- **Sem código impeditivo identificado no inventário.** PHP-FPM não se aplica à API Node; cloud providers não são requisitos on-prem; iFood/99Food/Keeta e hardware físico não bloqueiam o core.

## Atualização Registro 0067 (2026-10-05)
# Pendências funcionais — Registro 0074 (2026-10-06)

- [x] Definir e testar a semântica dos relatórios existentes, cobertura e export CSV; remover o uso de “Ticket geral” baseado na taxa de entrega.
- [ ] Configurar timezone IANA canônico por Company antes de publicar distribuição por hora/dia.
- [ ] Definir composição semântica de `Order.amountMinor` (produtos, taxa, descontos/impostos) e garantir cobertura por origem antes de publicar faturamento/ticket de produtos.
- [ ] Heatmap aguarda coordenadas históricas/proveniência, dimensão região/célula, política de retenção e agregação com privacidade.
- [ ] SLA aguarda `promisedAt`/deadline e política versionada de serviço; não inferir atraso sem promessa.
- [ ] Rentabilidade/custo/km aguarda receita comercial desagregada e custos atribuíveis de frota própria e fornecedores; Earning isolado é somente repasse.
- [ ] Frota híbrida aguarda LogisticsProvider, allocation/attempts, quote/ETA/custo e política de reconciliação; providers reais seguem campanhas futuras.
- [ ] E2E visual autenticado dos relatórios aguarda uma sessão de teste autorizada disponível ao Browser harness; nenhuma credencial foi usada nesta campanha.

## Self-hosted readiness — Registro 0059 (estado histórico; recovery atualizado em 0068/0069)


## Atualização — Pendências após Registro 0075

- [x] Implementar modelo opcional/anulável `Company.timeZone` IANA e usar timezone civil em agregações horárias/diárias. **Ação do operador:** aplicar migration aditiva 0016 pelo processo de deployment e configurar um timezone válido por Company; sem valor, as séries ficam indisponíveis.
- [x] Definir `Order.money` com componentes comprovados, minor units, moeda, proveniência e completude; não converter registros antigos.
- [ ] Mapear e validar componentes monetários canônicos por origem real à medida que adapters forem habilitados. Até então, total/ticket cobre somente Orders com total e moeda explícitos; não publicar faturamento para conjunto parcial/legado.
- [ ] Heatmap: adicionar coordenadas/proveniência e agregação espacial com regras de privacidade.
- [ ] SLA: adicionar prazo prometido/regra versionada e política de estados.
- [ ] Rentabilidade: obter receita completa e custos integrais atribuíveis; repasse Earning é insuficiente.
- [ ] Frota híbrida: modelar providers, attempts/alocações, quote/ETA/custo e reconciliação antes das integrações.
- Browser E2E autenticado de timezone/relatórios permanece NOT_TESTABLE até existir sessão de QA autorizada e CDP ativo.

Ver [Registro 0075](REGISTROS/0075.md).

## Campanha 0121 — gates parciais

- [ ] Política de negócio para cancelamento após coleta: definir retorno/custódia e eventual reentrega; nenhuma regra financeira foi presumida.
- [ ] Fechar cancelamento offline: definir/revisar conflitos explícitos dos fatos rejeitados; testar cenário sem ações locais e interleavings independentes (aceite, coleta, saída, conclusão, reentrega).
- [ ] Browser E2E FIFO com dois motoboys e Browser proof offline/recovery, inclusive comportamento para Delivery cancelada.
- [ ] Testar consumo simultâneo HTTP de identity token/provisioning por sessões independentes, e conflitos de packetId/revisões base em sessões PostgreSQL independentes.
- [ ] Concluir publicação do histórico após revisão do diff e verificação de ancestralidade/segredos.

## Campanha 0122 — gates parciais

- [ ] Implementar contrato e ações Motoboy para chegada e entrega física da mercadoria RETURN; transicionar custódia no servidor somente por evento autenticado do Driver atribuído.
- [ ] Testar no PG/Browser decisões RETURN/RELEASE/INCIDENT, idempotência concorrente, autorização, estado e receipt por dois operadores; completar sincronização offline dos cenários C–G.
- [ ] Testar criação única de RETURN, vínculo à Order original sem duplicação financeira, fim de rota, reordenação manual concorrente e convergência enquanto Motoboy está offline.
- [ ] Validar cancelamento independente antes da coleta e política operacional de divergência quando coleta offline chega após cancelamento; definir critérios de resolução de conflitos.
- [ ] Rodar Browser E2E das regressões 0120/0121 e dois Motoboys FIFO na campanha de encerramento; integração externa permanece limitada ao contrato existente.
- [ ] Revisar e autorizar separadamente a aplicação da migration 0041 em `rotamoto`; não aplicar sem autorização. Repetir security parity após alinhamento de ledger.
- [ ] Fast-forward e publicar apenas o histórico 0122 na branch `codex/f9-browser-e2e-0057` após fetch, ancestry, fast-forward e scan de segredos.

Ver [Registro 0122](REGISTROS/0122.md).
## Atualização — Registro 0125 (2026-10-10)

- [x] Divergência Route dirty/pacote/payload corrigida e confirmada por ACKs canônicos; evidência em `browser-tests/evidencias/campanhas/0126/return-flow/attempt-38/`.
- [x] Regressões Browser 0120, 0121 e 0122 reexecutadas com evidências 0126 isoladas.
- [x] Ciclo RETURN Browser chegou ao recebimento bilateral e à convergência no PostgreSQL e no Motoboy.
- [x] Offline RETURN, rate limit HTTP 429, retry/backoff e concorrência independente de sync/disponibilidade exercitados com resultados registrados.
- [x] Corrida específica de duas confirmações RETURN executada em sessões PostgreSQL/HTTP independentes em 0126; chave igual/distinta preservou uma confirmação/fato por delivery e isolamento tenant. Ver [Registro 0126](REGISTROS/0126.md).

## Atualização — Registro 0126 (2026-10-10)

- [x] **PASS — concorrência específica RETURN:** duas sessões independentes testaram chaves iguais e distintas; replay idempotente, uma confirmação/fato e conflito por revisão ou duplicata convergente. Evidência em [Registro 0126](REGISTROS/0126.md).
- [x] Histórico 0126 publicado somente em `codex/f9-browser-e2e-0057`, por fast-forward após fetch, ancestralidade, revisão final e scan de segredos. [Relatório publicado](https://github.com/mackowen/rota-moto-historico/blob/codex/f9-browser-e2e-0057/REGISTROS/0126.md).

0127 e 0128 encerradas e registradas. Não iniciar a Campanha 0129 sem nova solicitação.

## Atualização — Campanha 0136

- [x] **PASS — multimotoboy Browser:** três sessões autenticadas/perfis independentes; pedidos sincronizados juntos em packet único, três Drivers distintos FIFO, ciclo até DELIVERED e retorno à fila após lease/check-in. Evidência em `multidriver-attempt-18/`.
- [x] **PASS — recuperação de dispatch:** 429/503/timeout/desconexão mantiveram o mesmo packetId na outbox IndexedDB; ACK após recuperação convergiu sem duplicação. Nenhum reinício real do Browser foi necessário para este critério de reconexão.
- [x] **PASS — teardown RETURN:** runner repetido em `return-attempt-01/`; recebimento bilateral e exit code 0/signal null via CDP graceful close, sem kill manual.
- [x] **PASS — DeliveryProof e RLS E2E:** regressão nova em `deliveryproof-attempt-01/` e `npm run test:e2e-tenant-isolation` concluíram com PASS.
- [ ] **PARTIAL — escopo não exercitado:** corrida de criação por três sessões Restaurante simultâneas e reinício do Chromium enquanto o packet de despacho ainda está pendente não foram testados nesta continuação; não são alegados como prova.
- [ ] **BLOCKED — paridade de segurança do oficial:** falta URL/autorização de conexão estritamente read-only; nenhuma tentativa de acesso foi feita.
- [x] Concorrência PostgreSQL/FIFO/revisão/lease/idempotência repetida três vezes em schema isolado `rotamoto_e2e`; sem lock residual ou duplicidade observada.

Ver [REGISTROS/0136.md](REGISTROS/0136.md). Não iniciar 0137.


## Campanha 0137 — pendências abertas

- [x] **PASS:** Browser attempt 17 fechou o fluxo transacional com sessões Restaurante independentes, PIDs/XIDs distintos, waits reais, ACK/FIFO/replay, convergência após reinício e teardown normal. O hang attempt 14 ficou isolado ao pós-fluxo do harness; a await exata não foi registrada. Ver `REGISTROS/0137.md`.
- [x] **PASS:** comparar PostgreSQL oficial × E2E sob READ ONLY; ledger 0040 confirmado pela role auditora e estrutura/RLS aditiva E2E 0041 conferida.

Ver [Registro 0137](REGISTROS/0137.md). A 0138 foi iniciada por solicitação; não iniciar 0139 automaticamente.

## Campanha 0138 — pendência operacional

- [x] Browser transacional 0138: duas sessões Restaurante, transações PostgreSQL independentes, FIFO, ACK/replay, recuperação offline/reinício real e teardown normal comprovados em attempt 02.
- [x] Auditoria read-only oficial repetida com `rotamoto_auditor`; ledger 0040 e paridade de metadados comuns/checksums comparados ao E2E 0041.
- [x] **PASS — restore local e ensaio 0041 no clone:** recovery set existente verificado, restore completado no `rotamoto_disposable_0138_20261011_41770017`, contagens/catálogos comparados e migration exata ensaiada; RETURN/idempotência e tenant RLS passaram no DB/role. Clone limpo após fixtures.
- [ ] **PARTIAL — cobertura de mídia histórica:** `~/rotamoto-data/media` está vazio e não identifica a raiz operacional. A nova raiz de desenvolvimento foi validada separadamente; cobertura fora dela permanece sem prova. Recuperação técnica da cópia Drive passou depois, mas custódia independente da frase segue pendente.
- [ ] **PARTIAL — paridade integral:** restore aplica `--no-owner --no-acl`; grants runtime precisam ser provisionados no alvo antes de tráfego. Na comparação final, um CHECK diferiu apenas por parênteses redundantes no deparse; não se declara identidade byte a byte.
- [ ] **BLOCKED / não executado — jornada RETURN HTTP/Browser e promoção:** 0041 não foi aplicada ao oficial por instrução desta execução; oficial segue 0040, E2E 0041. Nenhuma escrita oficial.
- [ ] Cobrir isoladamente o helper de limpeza da fixture independente antes de depender dele em teardown com tenants persistidos.

Ver [REGISTROS/0138.md](REGISTROS/0138.md). Não iniciar Campanha 0139 automaticamente.

## Atualização — Continuação RETURN 0138

- [x] **PASS — E2E retorno:** cancelamento após pickup, RETURN único e vinculado, route reordenada/restaurada ao fim, offline/reconexão, ACK/replay, receipt bilateral e isolamento tenant demonstrados em Browser/HTTP/PostgreSQL em attempt-05.
- [x] Corrigida reconciliação do Motoboy para fatos de Delivery versionados que seguem a revisão canônica; scheduler volta a verificar eventos pendentes depois de cada sync concluído. `npm test` ambos apps passou.
- [ ] **PARTIAL — recovery global:** raiz histórica completa de mídia e cópia independente da chave continuam sem prova; divergências de ownership/ACL e textual schema do restore seguem registradas.
- [ ] **OPEN — promoção 0041:** oficial `rotamoto` permanece read-only na 0040; não promover sem gates de recuperação/paridade, janela e execução autorizada. E2E continua na 0041.

Ver [Registro 0138](REGISTROS/0138.md). Não iniciar Campanha 0139.

## Auditoria final de prontidão 0138 — 2026-10-11

- [x] **PASS — núcleo técnico 0041:** checksum, ensaio no clone restaurado, constraints, índice único, RLS/FORCE, grants runtime e RETURN/idempotência verificados; Browser attempt-05 permanece válido.
- [ ] **BLOCKED — prontidão de promoção:** raiz histórica de mídia operacional não identificada/cobertura incompleta; cópia protegida independente da chave não comprovada. A chave local não é recovery independente.
- [ ] **PARTIAL — janela/risco operacional:** `ALTER TABLE`/índice exigem lock; snapshot sem waits não reserva janela; duração da migration no clone não foi registrada. Confirmar timeout, duração representativa, janela e abort criteria.
- [ ] **PARTIAL — rollback após uso:** `0041.down.sql` elimina recibos e não é seguro se houver RETURN persistido; definir forward-fix ou restore coordenado antes de operação.
- [ ] Decisão final da auditoria: **NOT READY**; oficial permanece read-only em 0040, E2E em 0041. Não executar promoção sem fechar todos os gates e autorização/janela específicas.

Ver [REGISTROS/0138.md](REGISTROS/0138.md). Não iniciar Campanha 0139.

## Continuação — chave de recuperação e cópia Drive 0138

- [x] Localizada a chave existente (32 bytes, 0600) sem exibir conteúdo; Node/OpenSSL bundled fornece AES-256-GCM e Downloads está acessível.
- [x] **PASS reportado pelo operador — recovery Drive:** cópia baixada conferida por SHA-256 e execução reportou autenticação AES-GCM, igualdade com a chave original e remoção do plaintext.
- [ ] **PARTIAL — custódia da frase-senha:** guarda independente da frase ainda depende de comprovação do operador; não presumida.

Ver [REGISTROS/0138.md](REGISTROS/0138.md). Não iniciar Campanha 0139.


## Fechamento de desenvolvimento — Campanha 0138 — 2026-10-11

- [x] **COMPLETE — desenvolvimento local:** runtime filesystem-v1 isolado, HTTP/tenant, persistência após reinício, recovery set DB+mídia restaurado em cluster descartável e ensaio rollback-only 0041 comprovados.
- [x] **PASS reportado — recuperação criptográfica:** operador confirmou recovery da cópia baixada; SHA/GCM/igualdade/remoção de plaintext.
- [ ] **PARTIAL — custódia independente da frase-senha:** depende do operador; não presumida.
- [ ] **BLOCKED — raiz/cobertura de mídia fora do desenvolvimento:** sem API operacional/configuração ou leitura autorizada das referências atuais; não classificar o diretório local vazio como storage completo.
- [ ] **NOT READY — promoção oficial:** proibida nesta execução; oficial segue 0040 read-only. Clone restaurado usa `--no-acl` e requer grants explicitamente provisionados antes de tráfego.
- [x] Nenhuma migration oficial, deploy, alteração de baselines ou push de aplicativos; não iniciar 0139.

Ver [REGISTROS/0138.md](REGISTROS/0138.md) e [RESUMOS/0138.md](RESUMOS/0138.md).

## Campanha 0139 — pendências remanescentes

- [ ] **PARTIAL — mapa vetorial escuro:** validar em Chromium de teste com WebGL2 funcional; manter atribuições do provedor. O ambiente atual ficou no fallback OSM raster claro.
- [ ] **BLOCKED — sessão autenticada e vínculo:** fornecer API de teste com identidade real autorizada e fixture tenant-safe; nenhum vínculo foi simulado.
- [ ] **BLOCKED — GPS físico e rota/pins canônicos:** validar em dispositivo/emulador autorizado com rota E2E; o harness não injeta coordenadas nem dados operacionais.
- [ ] Aceite estético final depende do operador; capturas antes/depois e matrizes estão em `browser-tests/evidencias/campanhas/0139/controlled-harness/`.

Ver [REGISTROS/0139.md](REGISTROS/0139.md). Não iniciar Campanha 0140.

## Campanha 0140

- [x] **PASS — migration oficial 0041:** aplicada em `rotamoto` após gates de identidade, checksum, ausência de dados com auditor `BYPASSRLS`, recovery e mídia; runner transacional. Ledger final 0001–0041, checksum `c75063f833da16a8efdd2e8d448bf1c7c3aee7e360be8d9e1f12397d15251a9c`. Ver atualização posterior em [REGISTROS/0140.md](REGISTROS/0140.md).

- [ ] **PARTIAL — mapa vetorial escuro:** testar com WebGL2 habilitado; Chromium Termux usou tiles raster claros.
- [ ] **PARTIAL — pins reais no mapa:** repetir com sessão/rota autorizada e coordenadas E2E; na matriz visual o contador de marcadores foi zero.
- [ ] **BLOCKED — GPS físico e câmera/QR ao vivo:** precisa de dispositivo/emulador com sensores e permissões reais.
- [ ] **PARTIAL — toque no link da Ajuda:** menu/tela Ajuda abriram por toque; link foi comprovado por clique nativo DOM porque eventos CDP não alcançaram o link de modo confiável.
- [ ] Revisão estética final pelo operador; capturas representativas em `browser-tests/evidencias/campanhas/0140/revisao/`.

Ver [REGISTROS/0140.md](REGISTROS/0140.md). Não iniciar Campanha 0141.

## Registro histórico — Campanha 0142 (2026-10-13)

**Auditoria funcional integrada: PARTIAL; defeitos de produto confirmados: 0.** Os fluxos testados passaram em suítes automatizadas e Browser E2E no banco isolado. Os limites de hardware e de homologação externa permanecem, sem serem classificados como falhas de aplicação. Esta atualização complementa a matriz 0141 abaixo, que permanece intacta como fotografia anterior.

### Desenvolvimento e cobertura

- **RESOLVED no escopo testado:** identidade/MFA/tenant; isolamento RLS de duas empresas; criação/sync de Order/Delivery pela UI; despacho, rota/reordenação, transições do Motoboy, cancelamento após coleta, RETURN offline com 503 injetado, recuperação/outbox, handover e recibo bilateral. Ver [REGISTROS/0142.md](REGISTROS/0142.md).
- **RESOLVED no escopo testado:** `DeliveryProof`/filesystem-v1 autenticado; tenant proprietário lê os bytes e tenant distinto recebe 404 sem alteração do objeto. QR assinado/contrato passou na suíte unitária, mas leitura de câmera não foi testada.
- **OPEN / P2 — cobertura Browser de integrações:** o fixture `campaign-0140-return-e2e.cjs` não registra `createMarketplaceAdminHandler`; por isso a inicialização da UI recebe 404 em `/api/admin/marketplace/orders`. O servidor real registra o handler (`server.js`); não é defeito do produto demonstrado. Completar o fixture com adapter fake para testar estados do painel sem credenciais/serviços comerciais.
- **PARTIAL / P2 — experiência física:** nenhum aparelho Android foi usado. GPS real, permissões/sinal e leitura QR por câmera continuam sem validação física. A interface no Browser exibiu endereço/localização indisponível porque o fixture não tinha coordenadas reais; isso não é classificado como defeito.
- **PARTIAL / P2 — modo offline:** teste Browser injeta HTTP 503 no POST de sync; a outbox foi preservada e convergiu após retry. Isso valida falha/retry de transporte, não perda real de rede por rádio nem suspensão do Android.
- **OPEN / P3 — settlement:** liquidação financeira continua funcionalidade não implementada e requer decisão de produto; não é regressão nem requisito para validar os fluxos testados.

### Ambiente e produção

- Integrações iFood/99Food/Keeta foram exercitadas por testes de contrato/adapters locais; chamadas reais/sandbox continuam pendentes. Isso não impede evolução de código com adapters fake em ambiente de desenvolvimento.
- TLS público, SMTP comercial, RPO/RTO, deployment definitivo e rotina de backup de produção não foram avaliados nesta campanha e **não bloqueiam correções/desenvolvimento local**. São gates para implantação/uso operacional futuro.
- Pós-testes foi visto no `rotamoto_e2e` o schema `campaign0112_6017eee712694ccc98084ce3da5da803`. A suíte de disponibilidade informou que seu schema temporário foi removido; como não foi feito inventário de schemas antes da campanha, a origem do schema 0112 não pode ser atribuída. Não foi lido, alterado nem removido. Investigar somente por leitura antes de qualquer limpeza futura.

## Campanha 0144 — pedidos unificados e integrações (2026-10-13)

- [x] **RESOLVED — publicação de Orders externos:** iFood/Keeta publicam `CANONICAL_RECORD_UPSERTED` na outbox na mesma transação da projeção; Restaurante puxa e exibe Order na lista principal. Browser comprovou um pedido próprio e um externo juntos; replay manteve duas linhas sem duplicar. Origem e estado do provider estão visíveis.
- [x] **RESOLVED — fulfillment sem atribuição automática:** pedido externo com modo desconhecido não cria `Delivery`, QR ou atribuição de motoboy; detalhe exige confirmação do modo. Entrega própria segue o fluxo de Logistics e comandos externos seguem em Integrações.
- [x] **RESOLVED — fronteiras da interface:** origem local em Ajustes; configuração/conexão/diagnóstico em Integrações; parceiros na seção Logística; dados sintéticos no Laboratório. Browser mobile 390 px sem overflow.
- [ ] **BLOCKED / P1 — adapter 99Food:** o portal público descreve API de pedidos, webhooks e sandbox, mas contrato técnico, credenciais e certificação requerem onboarding. Não inventar endpoints/payloads. Dependência: acesso autorizado do parceiro e homologação externa. [Portal 99Food](https://developer-food.99app.com/).
- [ ] **OPEN / P2 — homologação externa iFood/Keeta:** confirmar efeitos reais de cancelamento, estados fora de ordem e fulfillment em sandboxes autorizados; esta campanha usa adapters/fakes determinísticos, sem chamadas comerciais.
- [x] **RESOLVED — regressão de teste documental:** `test-ifood.js` passou a verificar as mensagens atuais de capability pública e isolamento do Laboratório.

Ver [REGISTROS/0144.md](REGISTROS/0144.md) e [RESUMOS/0144.md](RESUMOS/0144.md). Nenhuma migration, alteração no banco oficial ou deployment.

## Atualização — Campanha 0135
## Registro histórico — Campanha 0153: integração operacional 99Food (2026-10-14)

Esta atualização supersede somente estados de implementação documentados como anteriores à 0153. A trilha histórica abaixo permanece íntegra.

| ID / origem | Componente; prioridade; estado | Evidência atual | Dependência / próximo passo |
|---|---|---|---|
| 0153-99-1 / 0144–0153; contrato oficial | Runtime 99Food Protocol: conta, token, webhook, Order/outbox, worker/comandos; P1 desenvolvimento; **PARTIAL** | Adapter e runtime ligados; migrations 0042/0043, inbox/outbox, tenant resolver, worker, ações e Browser testados em `rotamoto_e2e`. | Completar limitador distribuído conforme quotas oficiais e testar concorrência de múltiplas instâncias antes de qualquer tráfego externo. |
| 0153-99-2 / auth e onboarding 99Food | Credenciais/sandbox/whitelist/certificação; P1 externo; **BLOCKED_EXTERNAL** | Nenhuma chamada comercial ou sandbox; credenciais não estão configuradas no ambiente. | Acesso aprovado, credenciais em secret store, whitelist e aceite/homologação do provider. |
| 0153-DB-1 / adendo 0153 | Aplicar migrations no `rotamoto` oficial de desenvolvimento; P1 integridade; **BLOCKED** | Gate exigiu backup antes de ler ledger. `pg_dump` falhou em `audit_log` por FORCE RLS para `rotamoto_migrator`; dump parcial não verificável em `/data/data/com.termux/files/home/projetos/backups/campanha-0153/rotamoto-20261014.dump`. Nenhuma consulta ledger ou DDL oficial aconteceu. | Configurar mecanismo de backup consistente que preserve RLS/FORCE e consiga incluir auditoria; validar cópia; então repetir identificação, ledger/checksums, análise de lock/impacto e aplicar somente migrations novas se ainda pendentes. Não restaurar o dump parcial. |
| 0153-99-3 / recursos 1923 e 1929–1931 | Quotas 99Food; P1 desenvolvimento; **OPEN** | Tratamento de 429/Retry-After e cooldown de token 10103/120s presentes; não há pacing distribuído para detalhe 10/10s e comandos 5/s entre workers. | Implementar coordenação por app/loja e provar limites sob workers concorrentes em `rotamoto_e2e`, sem chamadas externas. |
| 0153-99-4 / Registros 0150–0153 | Fixtures 99Food PostgreSQL; P2; **RETAINED** | E2E usou manifestos da Campanha 0150, dois tenants sintéticos e estado retido; Browser usa runner sintético separado. Sem limpeza de audit ou fixtures. | Manter inventário read-only e preservar linhas auditáveis; eventual limpeza exige propriedade e dependências comprovadas. |
| 0153-99-5 / pedidos e logística | Order vs Delivery/fulfillment; P1; **RESOLVED no escopo sintético** | Testes confirmaram Order canônico/outbox uma vez, sync unificada e ausência de Delivery/QR para fulfillment da plataforma; entrega da loja exige Delivery própria concluída. | Validar com credenciais/sandbox externos somente após o rate limiter e migration oficial, sem criar Delivery fora do contrato. |

Referências oficiais, hashes, testes e evidência do bloqueio estão em [REGISTROS/0153.md](REGISTROS/0153.md). Não iniciar Campanha 0154.

## Campanha 0155 — fotografia histórica de pendências de desempenho

- [ ] **OPEN / P2 — API p95 com 10 clientes:** benchmark curto em `rotamoto_e2e` teve 22,13 req/s, p95 510,43 ms e p99 541,69 ms; 48/48 requests sem erro. Repetir com múltiplas sessões/tenants, mais ondas e perfilamento de autenticação/pool/consulta/serialização antes de otimizar. A consulta observada usou índice atual e executou em 1,446 ms, então a causa da latência HTTP ainda não foi isolada.
- [ ] **OPEN / P2 — mapa ausente no Browser:** painel do Motoboy ficou visível, mas sem container Leaflet/canvas na execução offline. Investigar dependências/runtime local e repetir CDP; não inferir falha com GPS ou mapa físico.
- [ ] **OPEN / P2 — estimativa do plano:** `EXPLAIN ANALYZE` estimou 1 registro e encontrou 250 na fixture nova; confirmar se estatísticas/camada de dados explicam o erro de cardinalidade. Nenhum `ANALYZE` ou DDL realizado.
- [ ] **PARTIAL — validação operacional sustentada:** Termux mediu apenas carga curta; testar bateria/memória, rede móvel, suspensão/reinício e dispositivo físico em campanha própria antes de declarar capacidade sustentada.
- [x] **RESOLVED no escopo medido — cálculo de sync Motoboy:** status das operações agora é indexado em Map e leituras IndexedDB são concorrentes; 10×500 fatos/statuses caiu de p50 36,058 para 15,448 ms (2,33×). Não extrapolar para latência de API/produção.

Evidências, método e commits em [REGISTROS/0155.md](REGISTROS/0155.md). Nenhuma mudança de schema e nenhum acesso ao banco oficial nesta campanha.


## Atualização de estado — Campanha 0171

- [x] **RESOLVED / infraestrutura Browser autenticada:** runtime real, dois logins UI, sessão/autorização, Driver canônico comum e instalações sync persistidas em `rotamoto_e2e`; fixture retida sem Order/Delivery/Route.
- [ ] **OPEN / ciclo completo:** criação de Order pela UI com ACK PostgreSQL, despacho, execução pelo Motoboy e convergência final seguem sem comprovação após a 0171.
- [ ] **OPEN / offline e PWA:** interrupção, ACK perdido, outbox persistente e atualização de Service Worker no perfil autenticado ainda exigem ensaio.

Evidências em [REGISTROS/0171.md](REGISTROS/0171.md).


## Atualização — Campanha 0172

- [x] **RESOLVED no escopo executado:** Order/Delivery criados pela UI e ciclo Motoboy até `DELIVERED`; um evento por transição executada no tenant sintético E2E.
- [ ] **OPEN / P1:** provar que a lista/detalhe do Restaurante mostra o estado final atualizado após recarga/sync, com evidência DOM/screenshot. Investigar a falha de observação sem presumir defeito de produto.
- [ ] **OPEN / P1:** criar/executar e comprovar uma Route canônica ou delimitar a semântica de “rota” existente.
- [ ] **OPEN / P1:** reconciliar Earning/valores e testar recusa, cancelamento pré/pós-coleta e RETURN no browser autenticado.

Evidência e limitações em [REGISTROS/0172.md](REGISTROS/0172.md).


## Atualização — Campanha 0173

- [ ] **OPEN / P1:** retomar HTTP 503, timeout, ACK perdido, replay concorrente e reconnect somente após a verificação final cross-app da 0172.
- [ ] **OPEN / P1:** perfil Chromium persistente isolado com outbox pendente antes/depois da atualização do Service Worker; confirmar integridade IndexedDB.
- [x] **PARTIAL:** contratos e testes unitários de storage/sync/PWA aprovados na regressão, sem evidência de fault injection autenticada.

Ver [REGISTROS/0173.md](REGISTROS/0173.md).


## Atualização — Campanha 0174

- [x] **RESOLVED no escopo do suite:** concorrência PostgreSQL de disponibilidade, fila/dispatch, RETURN, idempotência, leases e isolamento tenant com sessões distintas.
- [ ] **OPEN / P1:** adicionar cenários concorrentes de criação/atribuição de Order/Delivery/Route e confirmar projeções no ciclo 0172.
- [ ] **OPEN / P1:** validar reconciliação de Earning/valores sob concorrência e recuperação de worker com resultado desconhecido.

Manifesto E2E correto e limites em [REGISTROS/0174.md](REGISTROS/0174.md).


## Backlog vigente após 0175

- [ ] **P1 — sync visual cross-app:** comprovar a linha/detalhe do Restaurante após Delivery `DELIVERED`, com captura DOM e leitura autorizada do mesmo estado canônico.
- [ ] **P1 — Route:** provar entidade/planejamento operacional da rota ou esclarecer critério de aceite; não inferir uma Route da transição de Delivery.
- [ ] **P1 — offline/PWA:** após convergência, executar perfil Chromium autenticado persistente com 503, timeout, ACK perdido, replay e atualização/reabertura mantendo outbox IndexedDB.
- [ ] **P1 — financeiro/concorrência:** validar Earning e valores; concorrer atribuições e operações Order/Delivery/Route sob RLS/tenant.
- [ ] **P1 — transições adicionais:** recusa, cancelamentos antes/depois da coleta e RETURN na jornada Browser.

`npm test` dos dois apps, suites PG logística/territorial e runner de concorrência foram aprovados no escopo registrado; evidências, commits e limitações em [REGISTROS/0175.md](REGISTROS/0175.md).


## Fotografia da Campanha 0176 (histórica)

- [x] **RESOLVED / P1 — convergência visual Order/Delivery (0172):** runner autenticado corrigido; reload, sync no Dashboard e navegação após handler pronto. DOM Restaurante mostra pedido `Finalizada`; IndexedDB conserva `Order.canonicalStatus=DELIVERED`/`deliveryStatus=DELIVERED` e `Delivery.status=DELIVERED` v6. Sem alteração funcional no produto.
- [ ] **OPEN / P1 — Route (0177):** validar Route persistida via formulário legítimo e sequência de duas paradas; `CONTRACT.md` define `Route.deliveryIds` ordenado e autoridade de escrita do Restaurante.
- [ ] **OPEN / P1 — offline/PWA (0178):** fault injection autenticada com 503, timeout/ACK perdido, replay, SW e outbox persistente; depende da jornada/Route aprovada.
- [ ] **OPEN / P1 — financeiro e RETURN (0179):** valor Order, taxa, Earning/repasse, concorrência e ciclo de cancelamento/devolução com recebimento.
- [ ] **OPEN / P1 — DR (0180):** recovery set oficial atualizado e restore real permanecem proibidos sem autorização; somente fixture sintética/descarte autorizada.

Evidência 0176: [REGISTROS/0176.md](REGISTROS/0176.md). Fixture sintética ficou retida em `rotamoto_e2e`; nenhum cleanup foi realizado.

## Fotografia da Campanha 0177 (histórica)

- [x] **RESOLVED / P1 — Route e execução de duas paradas:** Route criada pela UI com duas `deliveryIds` na ordem planejada; ambas executadas no Motoboy e sincronizadas ao Restaurante. PostgreSQL E2E confirmou 2 Deliveries `DELIVERED` v6, 10 eventos e 2 comprovantes.
- [ ] **OPEN / P1 — financeiro com valores:** Earnings foram projetados, mas pedidos desta execução valiam zero; provar cálculo, taxa e repasse com Order não nula sem confundir valor comercial e logística.
- [ ] **OPEN / P2 — exceção de mapa Restaurante:** Browser registrou `appendChild` no runtime Leaflet/MapLibre durante inicialização; reproduzir e corrigir a origem sem mascarar erros.
- [ ] **OPEN / P1 — offline/PWA:** executar 503, timeout, ACK perdido, persistência IndexedDB e reconexão autenticada; dependente da jornada 0177 aprovada.
- [ ] **OPEN / P1 — cancelamento/RETURN e concorrência:** exercitar depois da coleta, devolução ao fim da rota, recebimento do Restaurante e disputa de aceite.

Evidências 0177: [REGISTROS/0177.md](REGISTROS/0177.md). Fixture mantida no `rotamoto_e2e`; nenhuma limpeza realizada.

## Fotografia da Campanha 0178 (histórica)

- [x] **RESOLVED / P1 — replay após ACK perdido:** upstream confirmou push com HTTP 200, resposta ao Browser foi 503 e o retry deixou cinco DeliveryEvents canônicos distintos.
- [x] **RESOLVED no escopo do browser — outbox após operação offline e reload:** `DELIVERY_ARRIVED` sobreviveu no IndexedDB/outbox com Service Worker controlador e convergiu após reconexão.
- [ ] **OPEN / P1 — operação contínua offline após reabrir:** Chromium reportou `navigator.onLine=true` após reload; sessão visual precisou autenticar novamente após reconexão. Testar timeout e encerramento/reabertura do processo em perfil persistente isolado.
- [ ] **OPEN / P2 — erro transitório de instalação sync:** uma tentativa após reautenticação recebeu 403 `CSRF_INVALID`; sync operacional posterior passou. Investigar a corrida de atualização do token/instalação sem relaxar CSRF.
- [ ] **OPEN / P2 — mapa Restaurante:** exceção MapLibre/Leaflet `appendChild` registrada em 0177–0178.
- [ ] **OPEN / P1 — 0179 financeiro e logística:** valor de Earning não nulo, concorrência de aceite/atribuição e jornada RETURN integrada.
- [ ] **OPEN / P1 — 0180 DR:** restore isolado de artefato autorizado atualizado; esta campanha não acessou backup real/chave nem banco oficial.

Ver [REGISTROS/0178.md](REGISTROS/0178.md). Fixtures, audit log e evidências retidos.

## Fotografia da Campanha 0179 (histórica)

- [x] **RESOLVED no cenário E2E / P1 — RETURN bilateral:** cancelamento pós-coleta com frota própria gerou RETURN no fim da rota; Motoboy registrou entrega física; Restaurante confirmou; custody `RECEIVED`; retry após 503 manteve exatamente um evento e nenhum comprovante foi inventado.
- [ ] **OPEN / P1 — financeiro canônico:** concluir Browser/PostgreSQL com Order de valor não nulo e conferir valor, regra, taxa e Earning reconciliados nos dois apps. Regra unitária 8,40 BRL → 840 centavos passou; Orders 0177/0178 tinham amount zero.
- [ ] **OPEN / P1 — concorrência de aceite:** duas sessões tentando aceitar/atribuir simultaneamente, com resultado único e isolamento multiempresa.
- [ ] **OPEN / P1 — jornada independente de fixture preparada:** o subfluxo de cancelamento/RETURN da 0179 usa fixture de domínio; manter separada da jornada comercial por UI já aprovada na 0177.
- [ ] **OPEN / P2 — erro de mapa e 403 CSRF transitório** observados durante Browser 0177/0178.
- [ ] **OPEN / P1 — 0180 backup/DR:** recuperação oficial real continua fora do escopo sem acesso autorizado a artefato/chave; trabalhar apenas com fixture sintética descartável.

Ver [REGISTROS/0179.md](REGISTROS/0179.md). Nenhuma fixture ou trilha de auditoria foi limpa.

## Atualização vigente — Campanha 0180

- [ ] **BLOCKED / P0 — recuperação atual:** recovery set validado historicamente até 0041, schema registrado em 0044; gerar/validar um conjunto vigente e restaurá-lo em PostgreSQL descartável exige acesso autorizado ao artefato/chave e ambiente descartável.
- [ ] **OPEN / P1 — proteção externa:** confirmar cópia independente do backup e custódia separada da chave; informação de chave no Drive segue declaração não verificada e não prova cópia do conjunto.
- [ ] **OPEN / P1 — operação de backup:** frequência/agendamento, monitoramento, retenção aprovada, RPO/RTO e runbook de acionamento não estão comprovados.
- [ ] **OPEN / P1 — observabilidade operacional:** runtime local comprovou health/readiness e logs correlacionados; alertas persistentes, métricas de fila/worker em operação e teste de indisponibilidade DB permanecem pendentes.
- [ ] **OPEN / P1 — integridade financeira/concorrência:** valores não nulos em fluxo Browser/PostgreSQL e disputa simultânea de aceite/atribuição.
- [ ] **OPEN / P2 — Browser:** investigar exceção `appendChild` MapLibre/Leaflet e 403 `CSRF_INVALID` transitório no registro de instalação.
- [ ] **OPEN / P1 — PWA:** timeout, crash/restart e upgrade do Service Worker mantendo operação offline ainda sem comprovação completa.

Ver [REGISTROS/0180.md](REGISTROS/0180.md). As campanhas 0176–0180 estão registradas sem afirmar cenários não executados; próximo ciclo exige autorização separada.
## Atualização vigente — Campanha 0192 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0192-GEO-DESTINATIONS / 0192 | Mapa/territorial; P1; **OPEN** | Route de duas paradas existe, porém screenshots/DOM reportam zero marcadores; destinos não têm snapshot geográfico confirmado. | Exercitar confirmação autenticada de coordenadas sintéticas para cada Delivery (proveniência e precisão válidas) e confirmar marcadores sem alterar dados por fora do serviço. |
| 0192-ROUTE-GEOMETRY / 0192 | Rota; P2; **PARTIAL** | Serviço retorna estado indisponível sem origem/destinos/provider. Nenhuma geometria ou tile foi inventada. | Com coordenadas válidas e provider local determinístico, testar sequência visual/geometry, resize, zoom e atualização; declarar limites de tiles externos. |

Ver [REGISTROS/0192.md](REGISTROS/0192.md).
## Atualização vigente — Campanha 0193 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0193-QUEUE-DEPTH / 0169–0193 | Workers/outbox; P1; **OPEN** | Snapshots contam ciclos do processo, sem backlog ou estado de comandos. | Instrumentar consultas agregadas de fila com baixa frequência e labels fixos; validar carga/RLS e contagens por estado. |
| 0193-WORKER-OUTCOMES / 0193 | Worker; P2; **PARTIAL** | `work/idle/error` mede ciclo; falhas internas tratadas podem contar como work. | Agregar sucesso, rejeição, retry, unknown outcome e lease expirado por classe fixa e reproduzir casos E2E. |
| 0193-METRICS-SCRAPE / 0169–0193 | Processos/observabilidade; P2; **OPEN** | Snapshot é em memória e cada processo independente; não há collector compartilhado ou endpoint worker. | Definir coleta interna segura para workers sem elevar privilégios nem introduzir cardinalidade por tenant. |

Ver [REGISTROS/0193.md](REGISTROS/0193.md).
## Atualização vigente — Campanha 0201 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0201-SECOND-STOP / 0196–0201 | Motoboy route focus; P2; **PARTIAL** | O run autenticado criou Route de duas paradas e mostrou foco inicial; o summary final não reteve a asserção após clique na segunda parada. O runner corrigiu rolagem/hit-testing, mas falta persistir a prova do estado final. | Reexecutar somente a interação no runner autenticado e registrar `ENTREGA 2 DE 2` após clique CDP visível, sem acionar navegação inferior. |
| 0201-EXTERNAL-TILES / 0192–0201 | Cartografia; P2; **DEFERRED** | Cartografia e linha renderizadas com fixtures loopback; não houve chamada a tiles/roteador externo. | Validar provedor somente em homologação autorizada; manter a cobertura determinística local. |

Ver [REGISTROS/0201.md](REGISTROS/0201.md).
## Atualização vigente — Campanha 0202 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0202-BROWSER-RACE / 0191–0202 | Harness Browser de atribuição; P1; **OPEN** | Duas sessões API reais passaram disputa, autorização e replay no E2E; o fluxo Browser UI e a corrida não ocorreram no mesmo run. | Estender o harness para duas sessões Chromium autenticadas, criar a Delivery pela UI do Restaurante, disputar a atribuição e concluir pelo vencedor; conferir as duas projeções e o PostgreSQL no mesmo manifesto. |

Ver [REGISTROS/0202.md](REGISTROS/0202.md).
## Atualização vigente — Campanha 0203 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0203-ACK-UNKNOWN / 0194–0203 | Sync/runtime; P1; **PARTIAL** | Outage antes do commit preservou operação IndexedDB; readiness recuperou e evento convergiu uma vez. O proxy não interrompeu especificamente depois do commit e antes do ACK. | Injetar ACK perdido após confirmação canônica no mesmo run e provar replay pela mesma chave sem novo evento/earning. |
| 0203-WORKER-CLIENT-ERROR / 0203 | Pool PostgreSQL; P1; **RESOLVED no cenário** | Erro controlado de socket em cliente emprestado não derrubou processo após correção; query falha ao chamador e readiness se recupera. | Manter teste em `test-pg-connection.js` e repetir em atualizações do driver `pg`. |
| 0203-MAP-STALE-CALLBACK / 0183–0203 | Motoboy MapLibre; P2; **RESOLVED no cenário** | Callback pós-removal protegido no bundle e teste lifecycle; Browser final sem erros JS. | Reexecutar navegação/reload em regressão visual de mapas. |

Ver [REGISTROS/0203.md](REGISTROS/0203.md).
## Atualização vigente — Campanha 0204 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0204-WORKER-HEARTBEAT / 0193–0204 | Workers/observabilidade; P1; **PARTIAL** | Endpoint mostra leases e filas reais, mas disponibilidade do processo permanece `unknown`; não há heartbeat persistente compartilhado. | Projetar heartbeat com identidade e lease/fencing seguros, migration aditiva revisada, teste de dois processos e exportação cardinalidade fixa. |
| 0204-RECOVERY-METRICS / 0193–0204 | Filas/recovery; P2; **PARTIAL** | Retry, expired lease e unknown outcome são contados no snapshot; não há histórico de recuperação, categoria de erro e latência por período. | Acrescentar histórico/contadores duráveis somente após desenho de retenção e compatibilidade; provar com worker real e falhas. |
| 0204-ALERT-CALIBRATION / 0193–0204 | Runbook/alertas; P2; **PARTIAL** | Polling 1 s e lease 45 s fundamentam critérios preliminares; não houve período de carga sustentada nem monitor externo. | Calibrar a idade de fila em execução longa controlada e aprovar limites antes de produção. |

Ver [REGISTROS/0204.md](REGISTROS/0204.md).
## Atualização vigente — Campanha 0205 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0205-BROWSER-RACE / 0202 | Dispatch Browser; P1; **OPEN** | PostgreSQL duas sessões passou; mesma corrida não foi integrada a UI e execução do vencedor. | Fechar cenário com dois perfis Chromium autenticados no mesmo run. |
| 0205-RETURN-UI / 0147–0205 | Custódia/RETURN; P1; **PARTIAL** | Unitários/PG anteriores passam; recebimento bilateral UI não foi repetido no fechamento. | Executar cancelamento após coleta, tarefa RETURN no fim da rota e confirmação autorizada pelo Restaurante no mesmo Browser run. |
| 0205-PWA-UPGRADE / 0186–0205 | PWA/outbox; P1; **PARTIAL** | Reload/outage preservou e convergiu outbox; versão diferente do SW em `waiting`/activate não foi exercitada nesta consolidação. | Instalar SW novo com operação pendente e provar reconexão sem perda/duplicação. |
| 0205-FINANCE-UI / 0187–0205 | Financeiro; P1; **PARTIAL** | Suites de domínio passaram; valor positivo bilateral não foi conferido no Browser/PG neste run. | Conciliar Order, taxa, responsabilidade e Earning em centavos nas duas UIs e no banco. |
| 0205-READINESS / 0158–0205 | DR/produção; P0; **BLOCKED** | Sem backup/restore oficial atualizado, cópia independente, RPO/RTO ou validações comerciais/físicas. | Tratar somente em ciclo autorizado de continuidade e homologação. |

Ver [REGISTROS/0205.md](REGISTROS/0205.md).

## Atualização vigente — Campanha 0206

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0206-BROWSER-RACE / 0202, 0205 | Despacho cross-app; P1; **OPEN** | PostgreSQL com duas sessões comprovou vencedor único, `REVISION_CONFLICT`, `DRIVER_NOT_ASSIGNED` e retry idempotente. Browser autenticado concluiu duas entregas/Route, mas a corrida não ocorreu com dois perfis Chromium no mesmo run. | Criar Delivery pela UI, disputar entre duas sessões Browser autenticadas e concluir pelo vencedor no mesmo manifesto, conferindo projeções e evento no PostgreSQL. |
| 0206-SECOND-STOP / 0201 | Motoboy Browser runner; P2; **RESOLVED no cenário** | `secondStopConfirmed=true` após ajuste de espera de layout/hit-test; Browser sem erros JS. | Manter a asserção explícita nas regressões de Route. |

Ver [REGISTROS/0206.md](REGISTROS/0206.md).

## Atualização vigente — Campanha 0207

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0207-RETURN-UI-SETUP / 0147–0207 | Pedidos/Route/RETURN; P1; **PARTIAL** | Retorno pós-coleta, fim da rota, execução Motoboy, confirmação Restaurante concorrente e recuperação 503 passaram em Browser/PostgreSQL. Contexto comercial e rota foram preparados pelo fixture. | Repetir criando Orders, Deliveries e Route pela UI no mesmo run e validar antes da coleta, permissões/tenant e efeitos financeiros. |

Ver [REGISTROS/0207.md](REGISTROS/0207.md).

## Atualização vigente — Campanha 0208

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0208-ANDROID-PWA / 0163, 0186, 0181 | PWA/hardware; P2; **BLOCKED** | Upgrade de duas versões com outbox sobreviveu a fechar/reabrir Chromium e reconvergiu; não houve validação de instalação/suspensão em aparelho físico Android. | Executar matriz física autorizada em dispositivo Android real, incluindo instalação, suspensão/retomada e rede. |

Ver [REGISTROS/0208.md](REGISTROS/0208.md).

## Atualização vigente — Campanha 0209

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0209-FINANCE-TWO-DELIVERIES / 0187–0209 | Order/Earning/Route; P1; **PARTIAL** | Uma entrega Browser concluída com Order 12.345 + taxa 725 = total 13.070 centavos BRL; um Earning de 725 centavos com snapshot. A segunda entrega ficou offline/pendente. | Completar duas Deliveries legítimas na mesma Route e conciliar cada Order/Earning no DB e nas duas UIs; incluir ACK replay sem duplicação. |
| 0209-FINANCE-NEGATIVE / 0209 | Validação financeira; P2; **PARTIAL** | Suites de money/earning passam; casos de limite/arredondamento inválido não foram explorados pela UI nesta campanha. | Exercitar limites e entradas inválidas em UI/API com valores BRL e confirmar rejeição sem persistência de Earning. |

Ver [REGISTROS/0209.md](REGISTROS/0209.md).

## Atualização vigente — Campanha 0210

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0210-BROWSER-ASSIGNMENT | Despacho; P1; **OPEN** | Corrida PG passa com duas sessões; Browser prova UI e execução separadas, não mesma Delivery/run/perfis. | Integrar dois perfis autenticados à corrida e conclusão do vencedor no mesmo manifesto. |
| 0210-FINANCE-ROUTE | Financeiro; P1; **PARTIAL** | Uma Order positiva, Earning e snapshot reconciliados; segunda entrega ficou pendente. | Concluir duas novas Deliveries e conciliar Order/fee/Earning por ID nas duas UIs e PostgreSQL. |
| 0210-POSTGRES-OUTAGE | Runtime/workers; P1; **OPEN** | Nenhum outage PostgreSQL executado agora; testes antigos são históricos. | Fault injection por proxy/cluster E2E e validar liveness/readiness, outbox, backoff, recovery e replay. |
| 0210-WORKER-QUEUE | Operação; P2; **PARTIAL** | Unitários de métricas passaram, sem worker real concorrente medido nesta campanha. | Expor/validar métricas agregadas durante worker PostgreSQL E2E e indisponibilidade. |
| 0210-CARTOGRAPHY | Mapa/geo; P2; **PARTIAL** | Screenshot mobile exibe mapa vazio por ausência de entregas geolocalizadas; sem prova visual de marcadores/geometria desktop/mobile. | Criar Order/Delivery e confirmar coordenadas pelo fluxo territorial autenticado; verificar visualmente marcadores e rota em 390×844 e 1280×900. |
| 0210-PRODUCTION-READINESS | DR/externos/hardware; P0; **BLOCKED** | Sem evidência atual de DR oficial/offsite/RPO-RTO, homologação comercial ou validação física. | Resolver sob autorização específica e obter evidências independentes antes de qualquer readiness de produção. |

Ver [REGISTROS/0210.md](REGISTROS/0210.md).

## Atualização vigente — Campanha 0216

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0216-AUTHENTICATED-HARNESS / 0211–0216 | Browser QA; P1; **OPEN** | Orquestrador reutilizável passou Chromium real com dois perfis isolados, checkpoints, captura diagnóstica e retomada idempotente após `SIGKILL`. Não autenticou os aplicativos nem completou operações PostgreSQL. | Integrar o harness a login real Restaurante + dois Motoboys e fazer checkpoint após cada operação comercial; validar a mesma Delivery durante a disputa. |
| 0216-LEGACY-RUNNER-MIGRATION / 0211–0216 | Runners Browser; P1; **OPEN** | `campaign-0206` e runners anteriores continuam com gerência própria de Chrome/timeout e não usam o novo ciclo resumível. | Migrar/substituir somente depois de identificar setup de sessão/fixture; manter tratamento de `UNKNOWN_OUTCOME` e não apagar manifestos antigos. |

Ver [REGISTROS/0216.md](REGISTROS/0216.md).

## Atualização vigente — Campanha 0222 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0209-FINANCE-ROUTE / 0213, 0219, 0222 | Order/Delivery/Route/Earning; P1; **RESOLVED** | Run `a13826a4-25e6-43d0-b519-5094daf488b7`: duas Orders e Deliveries novas criadas por UI, Route de duas paradas, ambas `DELIVERED`; cada Order 12.345 + 725 = 13.070 centavos BRL; Earnings exclusivos por `deliveryId`, 725 cada e soma 1.450. Snapshots `payout-snapshot-v1`; replay após ACK 503 não duplicou. | Critério de conciliação financeira de duas entregas satisfeito. |
| 0209-FINANCE-NEGATIVE / 0213, 0222 | Validação de valores monetários; P2; **RESOLVED** | Subtotal negativo foi rejeitado pelo `min=0`/validity nativa na UI e não persistiu Order; `node tests/test-order-money.js` passou. | Critério de entrada negativa satisfeito. |
| 0222-ACK-REPLAY / 0213, 0222 | Sync/outbox/Earning; P1; **RESOLVED** | Primeira conclusão recebeu 503 após commit. Estado convergiu; por Delivery houve cinco eventos canônicos com cinco IDs de origem distintos e permaneceu um Earning por Delivery. | Critério de idempotência do gate financeiro satisfeito. |

Ver [REGISTROS/0222.md](REGISTROS/0222.md). Permanecem independentes os gates de worker/outage, RETURN e regressão consolidados das campanhas seguintes; a aprovação financeira não os presume.

## Atualização vigente — Campanha 0223 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0219-WORKER-OUTAGE / 0220-OUTAGE-WORKER / 0223 | Pool PostgreSQL, worker e filas; P1; **RESOLVED no cenário** | Run `5d8a2e6c-a506-470d-9ec7-157d358a49ab`: worker real reclamou comando; proxy isolado produziu liveness 200/readiness 503; `UNKNOWN_OUTCOME` sobreviveu crash, tentativa permaneceu 1 e não houve replay do adapter. `/api/ops/queues` retornou 401/200/403, 503 durante outage e 200 após retorno. | Gate de recuperação deste cenário atendido. Revalidar em mudanças do driver `pg` ou do worker. |
| 0204-WORKER-HEARTBEAT / 0223 | Observabilidade; P2; **PARTIAL** | Worker foi observado em execução pelo processo e pela fila `leased`; após recuperação métrica durável mostra `unknown=1`. `workerAvailability` continua `unknown`, pois não existe heartbeat compartilhado. | Planejar heartbeat somente se o monitoramento operacional exigir disponibilidade de processo entre instâncias; manter cardinalidade fixa e testar fencing antes de migration. |
| 0223-PROVIDER-HOMOLOGATION | Integração externa; P2; **BLOCKED_EXTERNAL** | Adapter determinístico local; nenhuma credencial nem chamada comercial usada. | Homologar em sandbox/provider autorizado; fora do gate sintético de resiliência. |

Ver [REGISTROS/0223.md](REGISTROS/0223.md). A regressão consolidada e os gates independentes de RETURN, corrida visual, PWA e produção continuam separados.
# Atualização vigente — Campanha 0224

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0224-UI-DISPATCH-RACE / 0217, 0220 | Atribuição cross-app; P1; **RESOLVED no cenário** | Run Browser `25ffac6c-9e43-4c65-ba5f-13ff8bf25050`: UI iniciou corrida sobre a mesma Delivery; um vencedor, `REVISION_CONFLICT`, perdedor `DRIVER_NOT_ASSIGNED`, vencedor concluiu e Restaurante convergiu. | Manter runner na regressão; não inferir prontidão de produção. |
| 0224-RUNNER-SYNC / 0224 | Browser QA; P2; **RESOLVED** | Seletor de distribuição e espera por sync corrigidos; evidências em `evidencias/campanhas/0224/1018bb23-76e6-4eb7-8851-2e6541f1f26e/`. | Reexecutar na regressão 0225. |
| 0224-FINANCE-POSITIVE / 0222 | Earning da corrida concorrente; P2; **DEFERRED** | Run 0224 usou taxa zero (`earningCount=0`); a conciliação positiva de duas entregas está documentada separadamente como PASS na 0222. | Não usar o run 0224 como prova financeira; preservar a evidência dedicada 0222. |


## Atualização vigente — Campanha 0225 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0225-RETURN / 0221 | Custódia/RETURN; P1; **RESOLVED no cenário** | Run `63d52dfb-9b3e-4a4d-a865-b279779284bf`: criação pela UI, RETURN único ao final, recebimento bilateral, pré-coleta sem retorno e replay sem duplicação. | Preservar runner como regressão. |
| 0225-FINANCE / 0222 | Order/Earning; P1; **RESOLVED no cenário** | Run `1aa83cc3-5661-4971-be28-80a4173caadb`: dois Earnings novos de 725 centavos; total 1.450; replay idempotente. | Manter conciliação por IDs nas regressões. |
| 0225-WORKER / 0223 | Worker/PostgreSQL; P1; **RESOLVED no cenário** | Run `b347c35d-0774-45ea-92d5-db4cc272e54a`: outage isolado, worker e recovery verificados. | Heartbeat durável entre instâncias ainda não comprovado (0223). |
| 0225-RACE / 0224 | Despacho; P1; **RESOLVED no cenário** | Run `9d7d7fa2-540d-425f-a591-a590417d6628`: corrida UI, dois perfis, um vencedor, perdedor bloqueado e conclusão. | Preservar runner na regressão. |
| 0225-PWA / 0208 | PWA/IndexedDB; P1; **RESOLVED no cenário** | Run `022b7fab-57fc-4b8f-bf60-df32c184bf2e`: SW duas versões, reabertura offline, outbox preservada e reconvergência. | Validação Android físico permanece pendente. |
| 0225-MAP / 0196, 0201 | Cartografia; P2; **RESOLVED no cenário, limite externo** | Run `a62eb939-dc75-42cd-ace6-4b94d5ea2dd3`: coordenadas confirmadas, markers 1/2, polyline e segunda parada em desktop/mobile; geometria local. | Validar tiles/roteamento de provedor autorizado se necessário. |
| 0225-PRODUCTION / 0158–0225 | DR/hardware/integrações; P0; **BLOCKED_EXTERNAL** | DR oficial/offsite atualizado, RPO/RTO aprovado, homologação comercial e hardware físico sem evidência. | Obter autorização/ambiente e validar antes de prontidão de produção. |

Ver [REGISTROS/0225.md](REGISTROS/0225.md) e [RESUMOS/0225.md](RESUMOS/0225.md). Esta fotografia vigente atualiza estados somente quando há evidência direta nova; registros anteriores permanecem intactos.


## Atualização vigente — Campanha 0226 (2026-10-15)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0226-SCHEMA-COMPAT / 0001–0044 | PostgreSQL/schema; P1; **RESOLVED para snapshot auditado** | Dois bancos em 18.6, ledger 0044 e 44/44 checksums; inventário estrutural igual. | Repetir preflight após migration futura. |
| 0226-ACL-ENV / 0226 | Grants backup/auditoria; P2; **EXPECTED** | Grants extras oficiais documentados; ausentes no E2E. | Preservar separação; custodiar role BYPASSRLS de acordo com procedimento. |
| 0226-RECOVERY / 0158–0226 | Backup/DR; P0; **BLOCKED_BY_SCOPE** | Campanha read-only proibiu backup/restore; recovery atual não foi testado. | Antes de futura alteração oficial, comprovar restore isolado de recovery set compatível com 0044. |
| 0226-PRODUCTION | Produção; P0; **BLOCKED_EXTERNAL** | Homologação, hardware e DR/RPO-RTO continuam sem evidência nesta auditoria. | Resolver sob autorização própria; schema atualizado não implica prontidão. |

Ver [REGISTROS/0226.md](REGISTROS/0226.md) e [RESUMOS/0226.md](RESUMOS/0226.md). Nenhuma atualização foi executada.

## Atualização vigente — Campanha 0229

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0229-TERMUX-SHARED-UID / 0228–0229 | Executor Termux; P1; **PARTIAL_BY_PLATFORM** | Run `239a5fd9-98ce-4ae8-b0a2-12b35e936f8a` executou worker separado, heartbeat e jobs reais sintéticos; HTTP e executor permanecem sob UID do mesmo app. A política é explícita e exige acknowledgement. | Manter dados operacionais desabilitados até decisão de risco/implantação; para boundary mais forte usar Linux dedicado ou aplicativo Android separado autorizado. |
| 0229-LINUX-DEPLOYMENT / 0228–0229 | Serviço Linux; P1; **OPEN** | Política de UID/grupo e unit tests passam; não houve host Linux real nem systemd. | Provisionar UID/grupo dedicados e executar backup/restore sintético real antes de declarar suporte Linux operacional. |
| 0229-CONTAINER / 0229 | Serviço em contêiner; P2; **OPEN** | Detecção/política comum existe; nenhum Docker/Podman foi iniciado nesta execução. | Validar usuário, grupo, IPC e ciclo de restart em contêiner descartável real. |
| 0229-REMOTE-COPY / 0227–0229 | Storage externo e continuidade; P0; **BLOCKED_EXTERNAL** | Somente recovery sets locais sintéticos foram produzidos e verificados; nenhum endpoint/segredo externo foi configurado. | Autorizar destino/custódia e validar upload, confirmação, cópia independente e restore sintético fora do dispositivo. |
| 0229-PRODUCTION-DR / 0158–0229 | Backup/DR; P0; **BLOCKED** | Restore real sintético PASS; recovery set oficial, cópia offsite independente, retenção monitorada e RPO/RTO aprovados não foram verificados. | Executar plano de continuidade sob autorização específica; não inferir prontidão a partir do cluster sintético. |

Ver [REGISTROS/0229.md](REGISTROS/0229.md) e [RESUMOS/0229.md](RESUMOS/0229.md). Nenhum banco oficial foi acessado.

## Atualização vigente — Campanha 0230 (2026-10-16)

| ID / origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0230-TERMUX-UID / 0229–0230 | Executor no Termux; P1; **PARTIAL_BY_PLATFORM** | Run Browser `3570bf8a-98af-450a-93bf-5a6c23141204` comprovou `runsv` privado, jobs manual/automático, crash/restart e restore sintético. UID do executor e servidor é compartilhado; Android não fornece boundary de identidade entre eles. | Manter operação com dados reais desabilitada até decisão explícita de risco; se necessário isolamento de UID, provisionar host Linux ou app executor separado e testá-lo. |
| 0230-TERMUX-BOOT / 0230 | Inicialização após reboot; P2; **BLOCKED_OPERATIONAL** | Exemplo Termux:Boot preparado, mas não instalado; serviço global não foi alterado. Testes cobriram supervisão/restart de processo, não reboot do dispositivo. | Aprovar implantação local Termux:Boot e validar reboot/health sem acessar dados reais. |
| 0230-LINUX-SYSTEMD / 0229–0230 | Executor Linux; P1; **BLOCKED_ENVIRONMENT** | Unit e instruções com UID/grupo dedicados preparados; `systemctl` indisponível no host Termux. Nenhuma execução Linux real. | Em host Linux autorizado, provisionar identidade/grupo, instalar em ambiente sintético e comprovar job, restart, health e restore. |
| 0230-CONTAINER / 0229–0230 | Executor em contêiner; P2; **BLOCKED_ENVIRONMENT** | Dockerfile/Compose não-root preparados; Docker/Podman indisponíveis, sem build/run. | Em runtime descartável, validar build, volumes, chave somente leitura, health, restart e restore sintético. |
| 0230-REMOTE-COPY / 0227–0230 | Destino externo; P0; **BLOCKED_EXTERNAL** | Não houve destino externo autorizado ou credencial disponível; nenhum upload executado. | Operador definir destino/custódia; provar publicação criptografada, confirmação independente e restore fora do dispositivo. |
| 0230-PRODUCTION-DR / 0158–0230 | Backup/DR; P0; **BLOCKED** | Restore sintético local passou, sem evidência de recovery set oficial, cópia offsite, RPO/RTO aprovado ou continuidade operacional. | Validar artefato/cópia autorizados, retenção, monitoramento e exercício de DR sob autorização específica. |

O run e os templates estão detalhados em [REGISTROS/0230.md](REGISTROS/0230.md) e [RESUMOS/0230.md](RESUMOS/0230.md). O log `current` do svlogd é criado com modo `0744`, mas o E2E verificou diretórios pai `0700`; não mover logs para caminho compartilhado sem revisão. Nenhum serviço global ou banco oficial foi acessado.
## Atualização vigente — Campanha 0233-A (2026-10-16)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0233A-REMOTE-PIPELINE / 0231–0233-A | Adapters e executor S3/SFTP; P0; **PASS implementação** | Browser/CDP `a36ea2b5-9190-49a1-ad50-62fc91973b1e` provou pela UI configuração/teste SFTP, política, backup manual/agendado, inventário remoto, MFA dual, download e restore PostgreSQL descartável; S3 HTTP SigV4→PostgreSQL descartável também passou. | Sem pendência de software identificada. Homologar com provedores/endpoints externos quando disponíveis e autorizados. |
| 0233A-SECURITY / 0233-A | Segredos, host key, RLS, MFA, alvo; P0; **PASS nos testes executados** | Cofre cifrado separado; resposta pública redigida; TLS e host key obrigatórios; database oficial recusado no test mode; opt-in de backup operacional por role dedicada sem uso nesta campanha. | Manter guards em mudanças futuras; sem banco oficial, credenciais ou artefatos reais nos testes. |
| 0233A-TERMUX / 0230–0233-A | Supervisor no Android; P1; **PASS no E2E sintético; PLATFORM_LIMIT** | Browser E2E confirmou runit privado, job manual/agendado, crash/restart/health/shutdown; UID HTTP/executor segue compartilhado. | Não contornar UID Android; em Linux futuro validar UID/grupo dedicado operacionalmente. |
| 0233A-EXTERNAL / 0232–0233-A | S3/SFTP externo, Linux/systemd, Docker/Podman; P1; **PENDING_EXTERNAL** | Não há servidor/provider real, Linux, systemd, Docker ou Podman neste ambiente. Compose YAML e scripts shell passaram validação estática; nenhum teste operacional foi alegado. | Homologar somente quando esses ambientes estiverem disponíveis e autorizados, com dados sintéticos. |
| 0233A-PRODUCTION-DR / 0231–0233-A | Continuidade/produção; P0; **BLOCKED** | Sem cópia offsite comprovada, exercício externo, RPO/RTO aprovado ou prontidão de desastre. | Não declarar produção/DR até evidência real autorizada; manter a chave fora do destino remoto. |

Ver [REGISTROS/0233-A.md](REGISTROS/0233-A.md). A Campanha 0234 pode usar somente bancos E2E/descartáveis; nenhum acesso ao oficial está autorizado.

## Atualização vigente — Campanha 0233 (2026-10-16)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0233-REMOTE-RESTORE / 0231–0233 | Recovery S3/SFTP; P0; **OPEN** | Publicação existe, mas sem listagem/download/restore remoto nem Browser E2E. | Implementar provider contract de leitura/inventário/retention, testar corrupção/falha/replay e completar aprovação MFA + restore descartável pela UI. |
| 0233-REMOTE-RECONCILIATION / 0231–0233 | Jobs remotos; P0; **OPEN** | Upload local é verificado antes de publicar manifest; retomada após corte/reconciliação durável não foi provada. | Persistir estado por objeto, identificar outcomes incertos e provar retry idempotente/concorrência sem publicar set incompleto. |
| 0233-BROWSER-ADMIN / 0231–0233 | Central de backup; P1; **OPEN** | Runner 0231 intercepta APIs; nenhum E2E autenticado novo executado. | Executar CDP autenticado com APIs reais, permissões/MFA, progresso, falhas, inventário, aprovação independente, restore e viewports desktop/mobile. |
| 0233-PLATFORM-HOMOLOGATION / 0232–0233 | Linux/Docker; P1; **BLOCKED_ENVIRONMENT** | `systemctl`, Docker e Podman ausentes no Termux. | Em ambientes futuros, verificar unit, build/run rootless, crash/restart e restore sintético. |
| 0233-PRODUCTION-DR / 0228–0233 | Continuidade/produção; P0; **BLOCKED** | Sem cópia externa comprovada, restore remoto, RPO/RTO aprovado ou homologação de serviço externo. | Não declarar DR/produção até recuperação externa integral e monitoramento mensurados em procedimento autorizado. |

Ver [REGISTROS/0233.md](REGISTROS/0233.md).

## Atualização vigente — Campanha 0232 (2026-10-16)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0232-LINUX-SYSTEMD / 0229–0232 | Serviço Linux; P1; **BLOCKED_ENVIRONMENT** | Unit com usuário/grupo dedicados e checks estáticos disponíveis; `systemctl` ausente neste Termux. | Executar `systemd-analyze verify` e teste real de start/restart/health/restore em Linux descartável. |
| 0232-DOCKER / 0229–0232 | Compose rootless; P1; **BLOCKED_ENVIRONMENT** | Dockerfile/Compose não-root e checks estáticos disponíveis; Docker/Podman ausentes. | Build/run rootless, validar volumes, secrets, crash/restart e restore sintético em runtime contêiner. |
| 0232-TERMUX-BOOT / 0230–0232 | Boot Android; P2; **NOT_TESTED** | Script exemplo passou `sh -n`; não foi instalado nem houve reboot. | Em dispositivo autorizado, instalar por ação explícita e validar reinício/health sem alterar serviços globais. |
| 0232-UID-ISOLATION / 0229–0232 | Boundary executor Termux; P0; **PLATFORM_LIMIT** | UID do app compartilhado; runit supervisiona processo, sem isolamento UID. | Manter limite documentado; para boundary dedicado, usar identidade/grupo Linux sem contornar isolamento Android. |

Ver [REGISTROS/0232.md](REGISTROS/0232.md).

## Atualização vigente — Campanha 0231 (2026-10-16)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0231-REMOTE-RECOVERY / 0228–0231 | S3/SFTP inventário e restore; P0; **OPEN** | Publicação de conjuntos testada; providers não oferecem listagem/download/restore. | Implementar operações remotas completas, validar manifest autenticado/hash, recuperar somente em PostgreSQL descartável e provar Browser autenticado. |
| 0231-REMOTE-RETENTION / 0228–0231 | Retenção e última cópia; P0; **OPEN** | Retenção local existente; cópias remotas não são podadas nem reconciliadas. | Inventariar, calcular política por destino e provar que última cópia válida não é removida sob falha/concorrência. |
| 0231-PROTOCOL-FAULTS / 0231 | S3/SFTP falhas/replay; P1; **PARTIAL** | `sshd` SFTP loopback passou; S3 usou fixture HTTP; sem corrupção, interrupção e retomada completa. | Exercitar protocolos locais com erro/falha de rede, credenciais inválidas, host key incorreta, corrupção, replay e concorrência. |
| 0231-BROWSER-E2E / 0231 | Central administrativa; P1; **OPEN** | Runner 0231 substitui `fetch` por APIs sintéticas. | Testar APIs reais autenticadas em CDP, desktop/mobile, sem exibir segredos e cobrindo solicitação/aprovação/restore. |

Ver [REGISTROS/0231.md](REGISTROS/0231.md).

## Atualização vigente — Campanha 0234

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0234-MFA-QR / 0234 | Enrollment TOTP UI; P1; **RESOLVED** | QR offline + chave manual; teste visual CDP 1280×900/390×844 com URI sintética, sem erros JS/overflow. Evidências em `browser-tests/evidencias/campanhas/0234/qr-enrollment/`. | Concluído para visual do componente. A jornada autenticada completa continua pendente em 0234-BROWSER-FIRST-OWNER. |
| 0234-MFA-ADMIN-RECOVERY / 0234 | Recuperação administrativa MFA; P0; **OPEN** | Códigos próprios e recuperação de senha existem; reset privilegiado multiator não existe. | Criar pedido auditado, verificações independentes e aprovação MFA por segundo administrador, sem bypass ou reset automático. |
| 0234-BOOTSTRAP-CONCURRENCY / 0234 | Bootstrap/retomada; P1; **PARTIAL** | Latch `FOR UPDATE`, autorização digest-only e replay passaram no PG E2E serial; concorrência real e fault injection não executadas. | Usar cluster descartável dedicado para duas inicializações concorrentes, falha intermediária, rollback, restart e retry. |
| 0234-BROWSER-FIRST-OWNER / 0234 | Browser/CDP; P1; **OPEN** | Apenas fixture visual QR sintética; sem jornada Browser autenticada de identidade. | Rodar APIs reais: convite, senha, ativação, TOTP, recovery codes, login, painel e permissões em 1280×900/390×844. |
| 0234-OFFICIAL-SCHEMA / complemento | Compatibilidade oficial; P0; **BLOCKED** | Gate 0234 não integral; banco oficial não acessado. Backup+restore pré-migração oficial ausentes. | Após PASS 0234, auditoria read-only, matriz oficial/E2E e backup criptografado + restore isolado antes de considerar migration. Até lá manter `rotamoto` intocado. |
| 0234-EXTERNAL-DELIVERY / 0234 | SMTP/HTTPS externo; P2; **PENDING_EXTERNAL** | Testes usam fixture/dados sintéticos; sem provider/domínio externos. | Homologar SMTP/HTTPS reais após configuração, sem confundir entrega local com externa. |

Ver [REGISTROS/0234.md](REGISTROS/0234.md).
## Atualização vigente — Campanha 0237 (2026-10-17)

- **Concluído:** histórico 0235/0236 preservado e integrado à branch padrão `main`; SHA local/remoto conferido no Registro 0237.
- **Concluído:** política permanente de inventário, preservação e publicação criada em `POLITICA_GIT_CAMPANHAS.md` e `~/projetos/AGENTS.md`.
- **Preservado:** branches locais de aplicação mantêm commits próprios fora de seus upstreams; não foram apagadas nem publicadas. Revisar individualmente em campanhas autorizadas.
- **Sem alteração:** nenhum banco, serviço ou configuração operacional foi tocado.
## Atualização vigente — Campanha 0238 (2026-10-17)

- **Resolvido no código:** recovery helper não depende mais de hardlink; valida o novo envelope legacy e publica por rename GNU sem substituição. Ver [REGISTRO 0238](REGISTROS/0238.md).
- **Ação privada pendente do proprietário:** executar `cd "$HOME/projetos/repos/rota-moto-restaurante" && node scripts/verify-local-recovery-envelopes.js --refresh-stale` em TTY local sem eco. Não enviar frases-senha ao ChatGPT, nem remover/substituir envelopes existentes.
- **Depois da validação:** confirmar auditoria `refresh_started`/`refreshed`, preservar envelope anterior, guardar a nova passphrase separadamente e realizar cópia externa autorizada.
## Atualização vigente — Campanha 0239 (2026-10-17)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0239-DB-ISOLATION / 0239 | Papéis e proxy oficial/E2E; P0; **FAIL** | `rotamoto_app` tem CONNECT em `rotamoto` e `rotamoto_e2e`; Nginx 8081/8082 encaminha `/api/` à API oficial 8788. | Em campanha autorizada, estabelecer papel/ACL E2E dedicado, encaminhamento Nginx para backend E2E e validação que impeça conexão cruzada; não usar os painéis atuais para prova E2E. |
| 0239-E2E-BACKUP / 0239 | Backup/restore de `rotamoto_e2e`; P0; **BLOCKED** | `pg_dump` como migrator não lê todas as linhas com FORCE RLS; `rotamoto_backup` não tem CONNECT no E2E. Nenhum grant foi mudado. | Disponibilizar caminho aprovado para backup completo e restauração isolada sem enfraquecer as permissões do banco operacional. |
| 0239-E2E-RESET-LATCH / 0239 | Limpeza de fixtures e latch Bootstrap; P0; **BLOCKED** | 17 schemas de fixture antigos; latch inicializado. Migrations 0045/0046 não permitem rollback/reset persistente contratual. | Após backup PASS, implementar/aprovar procedimento explícito, auditável e somente E2E para limpar fixtures e reinicializar latch; não improvisar SQL. |
| 0239-BOOTSTRAP-BROWSER / 0239 | Bootstrap, MFA e prova CDP; P1; **BLOCKED** | Nenhum fluxo executado; dependente de backup e reset seguros. | Rodar a jornada autenticada em DB descartável ou E2E limpo autorizado, com captura de email sintético e desktops/mobile. |

Ver [REGISTROS/0239.md](REGISTROS/0239.md).

## Atualização vigente — Campanha 0244 (2026-10-17)

| ID/origem | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0244-OWNER-MFA / 0243–0244 | Sessão persistente do proprietário E2E; P0; **PENDING_OPERATOR** | Backend e fixture HTTP confirmam gate e enrollment/TOTP; Chromium validou a UI com sessão sintética. Nenhuma credencial, keystore ou sessão persistente do proprietário foi usada. | Proprietário abrir `http://127.0.0.1:8083`, clicar “Configurar verificação em duas etapas”, cadastrar no autenticador, confirmar o código e guardar recuperação. Depois confirmar login autenticado. |
| 0244-RECOVERY-MFA / 0234 | Recuperação administrativa de MFA; P0; **OPEN** | Fluxo de recuperação não foi alterado nesta auditoria; gates documentados em 0234 seguem pendentes. | Implementar/validar recuperação auditada conforme contrato 0234, sem bypass ou reset automático. |

Ver [REGISTROS/0244.md](REGISTROS/0244.md).
## Atualização vigente — Campanha 0253 (2026-10-18)

| ID | Componente; prioridade; estado | Evidência atual | Próxima ação / aceite |
|---|---|---|---|
| 0253-PLATFORM-ADMIN | Administrador geral/fundador; P0; **AUTHORIZATION_GATE** | Não há evidência histórica suficiente para identificar o fundador; nenhum endpoint/painel global completo ou privilégio foi criado. | Aprovar modelo global e comprovar identidade fundadora; testar com fixture sintética antes de qualquer promoção persistente. |
| 0253-AUTHENTICATED-E2E | Navegador autenticado + PostgreSQL E2E/runit; P0; **PARTIAL** | CDP anônimo bloqueou endpoints protegidos com 401; não foram usados owner, senhas, MFA nem fixtures persistentes nesta campanha. | Preparar identidade sintética isolada autenticada no processo runit e comprovar ACK e leitura de retorno no PostgreSQL. |
| 0253-REPORTS | Relatórios/CSV; P1; **PARTIAL** | Testes canônicos de analytics passaram; sem revisão Browser autenticada nem capturas antes/depois comparáveis. | Revisar relatório e exportação com identidade sintética, temas/viewports e fontes canônicas; não fabricar métricas. |
| 0253-DRIVER-INVITE | Convite→ativação→vínculo de motoboy; P1; **PARTIAL** | Rotas/UI existentes preservadas; jornada completa não executada no runit/PostgreSQL desta campanha. | Testar convite sintético e estados até vínculo ativo, sem email externo e com limpeza segura. |
| 0253-COMMERCIAL | iFood/99Food/Keeta; P1; **BLOCKED_EXTERNAL_DEPENDENCY** | Nenhuma credencial/homologação comercial disponível; não foi simulada conexão. | Obter credenciais/onboarding autorizados e então provar autorização, lojas e sincronismo real. |
| 0253-TEAM-ADDRESS | `admin@local`, fonte de identidade e endereço; P1; **PARTIAL** | Backend autoritativo mantido e atualizações entre abas conectadas; registros não foram auditados nem houve nova escrita/readback do endereço. | Auditar registros sem mesclar/excluir e testar update/readback em E2E sintético autenticado. |
| 0253-MULTI-DEVICE | Atualização entre dispositivos/offline/conflito; P1; **PARTIAL** | BroadcastChannel entre abas e unidade passou; sem mecanismo comprovado entre dispositivos ou cenários de conflito/desconexão. | Definir evento/sync incremental compatível e validar offline, reconexão e conflito com ACK canônico. |
| 0253-HISTORY | `origin/main`; P1; **PASS** | `dee61b4c402ad73f135033a8bc1a33aecb4149a8` fetch-verificado; registro, resumo e matriz presentes no remoto. | Nenhuma ação; apps e Browser Tests permanecem apenas em commits locais. |

Ver [REGISTRO 0253](REGISTROS/0253.md), [resumo](RESUMOS/0253.md) e [matriz](MATRIZ_BACKEND_FRONTEND_0253.md).


## Campanha 0255

- **PARTIAL:** criar sessão global sintética descartável e comprovar painel/ações globais positivas via Browser/CDP.
- Implementar/verificar UI/API globais de serviços e configurações e fluxo visual de grants, sem promover contas persistentes.
- Não promover a conta existente: registro 0234 a identifica como proprietária; falta evidência de papel fundador e autorização explícita. O CLI de bootstrap não foi executado.
- Marketplace permanece `MARKETPLACE_RUNTIME_UNAVAILABLE` (503) até configuração real do runtime/provedor.
