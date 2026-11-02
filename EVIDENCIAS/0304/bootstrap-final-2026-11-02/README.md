# Execução final — reset de dados e publicação Bootstrap (2026-11-02)

## Resultado geral: PARTIAL — não declarar PASS

Os dados antigos foram removidos dos dois bancos autorizados, o schema e as estruturas foram preservados, e o instalador correto passou a ser servido em 8083. A API oficial reconhece o banco `rotamoto` como não inicializado. O serviço E2E permanece `ready` em `/health/ready`, mas retorna `state=unavailable` no Bootstrap mesmo com as tabelas vazias. A função SQL `rotamoto.platform_admin_bootstrap_status()` valida `session_user=rotamoto_app`; o serviço E2E usa o papel restrito `rotamoto_e2e_app`. Esse guard de segurança não foi alterado nem contornado, portanto o critério de reconhecimento do ambiente E2E continua BLOCKED.

## Bancos, schema e contagens

Conexões confirmadas pelo banco/role próprios. Migration status foi verificado antes e depois do reset: nenhuma migration reaplicada.

| Banco | Dados de aplicação antes | Dados de aplicação depois | Ledger | Catálogo `permissions` | Latches canônicos |
|---|---:|---:|---:|---:|---:|
| `rotamoto` | 0 | 0 | 67 (0067 preservada) | 10 | 2 linhas singleton no estado inicial |
| `rotamoto_e2e` | 179 | 0 | 67 (0067 preservada) | 10 | 2 linhas singleton no estado inicial |

Contagens exatas para as 56 tabelas de cada schema: [CSV antes/depois](sql-counts-before-after.csv). No E2E, antes do reset: 2 usuários, 2 credenciais, 1 token de identidade, 109 sessões, 1 autorização de instalação, 3 limites 99Food, 49 eventos de auditoria de plataforma, 1 administrador da plataforma, 1 pedido de provisionamento e 10 tokens de recuperação; as demais tabelas de aplicação estavam vazias. Depois do reset, todas as tabelas de aplicação estão em zero, inclusive empresas, memberships, roles/atribuições, MFA, sessões, founder/admin, auditorias, pedidos/domínio, integrações, logística, filas e eventos. No oficial, as tabelas de aplicação já estavam em zero antes da operação.

- Migration `0067_browser_bootstrap_mfa_completion`: checksum `1d9930ca4c30d8a3d52da57e7b9ceff3838466875ae2c81cd304f875e08fa9ba` nos dois bancos.
- 41 tabelas continuam com RLS habilitado e FORCE RLS.
- Assinatura estrutural antes/depois idêntica: relações, RLS, políticas, funções, triggers, índices, constraints, ACLs, ledger e catálogo RBAC.
- `permissions` preservada; `roles` e `role_permissions` são dados tenant e ficaram vazias.
- `installation_bootstrap` e `platform_admin_bootstrap_latch` mantêm uma linha singleton cada, sem digest/fundador e sem data de conclusão.
- O reset foi ensaiado em ambos os bancos com ROLLBACK; os ensaios passaram. Em seguida o mesmo script com COMMIT foi aplicado e validado nos dois.
- Nenhum backup foi criado. Nenhum schema/database foi removido; sem `CASCADE`, sem alterar roles/grants ou desabilitar RLS.
- Procedimento SQL guardado localmente no Restaurante, commit `47d74e1` na branch `codex/campaign-0304-browser-bootstrap`: `backend/postgres/admin/reset-application-data.sql`.

## Publicação e APIs

Causa do 404: o virtual host E2E do nginx tinha um fallback final `return 404` e não permitia HTML fora de `/` e `/index.html`. Foram adicionados somente os locations exatos `/bootstrap.html` e `/health/ready`; root permanece no checkout Restaurante existente. `nginx -t` aprovou e o reload concluiu.

- `http://127.0.0.1:8083/bootstrap.html`: HTTP 200, `text/html`, conteúdo identificado por “Prepare o RotaMoto”.
- CSS `bootstrap-wizard.css`: HTTP 200, `text/css`; query hash `43e8ad7ae20c50b7` corresponde ao prefixo do SHA-256 local.
- JS `bootstrap-wizard.js`: HTTP 200, `application/javascript`; query hash `2cc446987361df41` corresponde ao prefixo do SHA-256 local.
- SHA-256 calculado também sobre os corpos HTTP servidos: os três valores coincidem exatamente com os arquivos locais. HTML `2374c3c413ed5fa3400efec6b3c19f8f73bd3acca2ad6d9ea6eac7c86f94c5f6`, CSS `43e8ad7ae20c50b733d9056ee8fbe615d79390eadf78a5083903ebf6c23e8879`, JS `2cc446987361df4145bbb4c7bcb80ad10522005fa7828fef26b4fd1d36882aef`.
- API E2E `8787`: Bootstrap HTTP 200 com `state=unavailable`; `/health/ready` HTTP 200 `ready`.
- API oficial `8788`: Bootstrap HTTP 200 com `state=ready`; `/health/ready` HTTP 200 `ready`. Checks: schema/pricing true, keystore MFA false, convite false. No E2E: schema/pricing/MFA true, convite false; o estado canônico segue `unavailable`.
- Os serviços continuam ativos e seus arquivos runit apontam, respectivamente, para `rotamoto_e2e` e `rotamoto`.
- A resposta da API E2E não foi tratada como `ready` nem como estado inicial disponível: o guard de identidade da função impede a leitura canônica pelo papel E2E. Não se trocou a conexão e não se alterou código/função/migration de segurança.

## Browser QA

Chromium headless por CDP / `chrome-remote-interface`; página publicada em 8083; sem autenticação, sessão, dados de formulário ou submissões.

| Tema | Largura | Resultado visual |
|---|---:|---|
| Claro | 390, 768, 1440 | Sem overflow; título/instalador corretos; CSS/JS carregados |
| Escuro | 390, 768, 1440 | Sem overflow; título/instalador corretos; CSS/JS carregados |

Todos os recursos observados responderam 200, MIME HTML/CSS/JS/JSON corretos, toggle claro/escuro funcional, sem falhas de rede, erros no console ou exceções JavaScript. A página mostra “Primeira instalação indisponível”, não apresenta formulário e não cria dados porque o endpoint E2E segue `unavailable`. QA: 3/5, PARTIAL; layout e publicação passaram, disponibilidade funcional do primeiro acesso bloqueada pelo guard E2E. Capturas e relatório sanitizado estão nesta pasta.

## Itens mantidos abertos

Campanha 0304 permanece aberta, G14 permanece FAIL e nenhuma aprovação visual foi inferida. 0305 não foi iniciada. O proprietário pode preencher dados reais somente depois que o endpoint E2E reconhecer corretamente a instalação não iniciada por meio da configuração/contrato de segurança já aprovado; esta execução não alterou esse guard.
