# Configurações → Motoboys — execução 0304

Data: 2026-11-02
Resultado funcional: **PASS no fluxo autenticado sintético**. Aprovação visual final no Chrome Android do proprietário permanece pendente.

## Correções

- Restaurante: reorganizada a página em grupos compactos de contas vinculadas, contas autorizadas sem cadastro e cadastros operacionais sem conta. Identidade, membership, cadastro Driver e disponibilidade são apresentados separadamente. A disponibilidade vem de uma consulta própria e não é inferida do estado cadastral.
- Restaurante: o vínculo só é confirmado após ACK e readback da membership. Respostas antigas de cadastro/disponibilidade não substituem uma consulta mais recente. Ações de convite dependem de `members.invite`.
- Backend: associação rejeita cadastro operacional inativo; encerramento bloqueia enquanto houver entrega em andamento. Quando permitido, encerra disponibilidade e presença online, preserva entregas e escreve auditoria sem remover a identidade.
- Motoboy: no estado autenticado sem vínculo Driver, o shell operacional sai do fluxo de layout. Isso corrigiu overflow causado pelos botões da navegação inferior que continuavam expandindo a largura mesmo com `visibility:hidden`. O painel de ativação e suas proteções de acesso continuam disponíveis.

## Evidência funcional

Chromium/CDP autenticado com MFA sintético autorizada, UI real servida em 8083/8084, handlers administrativos/logísticos de produção, PostgreSQL/RLS e rollback:

- Associação pela UI: `PUT 200`, readback da membership e confirmação só depois da releitura.
- Reload e segundo login MFA: vínculo permaneceu no estado canônico durante a sessão de teste.
- Associação duplicada: `409 DRIVER_ALREADY_LINKED`.
- Cadastro inativo: `409 DRIVER_INACTIVE`.
- Sem `company.manage`: `403 FORBIDDEN`.
- Motoboy, após vínculo: `GET 200`, retornando apenas o Driver autorizado na empresa ativa.
- Encerramento com entrega ativa: `DELETE 409 DRIVER_HAS_ACTIVE_DELIVERIES`; vínculo e acesso permaneceram.
- Após tornar a fixture de entrega terminal: `DELETE 200`; membership sem `driver_id`, disponibilidade offline, presença encerrada e entrega `DELIVERED` preservada. Motoboy passou a responder `403 DRIVER_LINK_REQUIRED`.
- Fixture revertida; banco permaneceu com Chico Restaurante como única empresa. Nenhum banco, empresa ou identidade permanente foi criado.

## Responsividade e capturas

Chromium autenticado e sintético, temas claro/escuro; em cada aplicativo foram medidas 390×844, 768×1024 e 1440×900. Em todas as 12 combinações, `documentElement.scrollWidth` igualou `clientWidth`. Erros JavaScript/console: zero.

- [Restaurante, Motoboys, 390×844 claro](capturas/restaurante-motoboys-390x844-claro.png)
- [Restaurante, Motoboys, 1440×900 escuro](capturas/restaurante-motoboys-1440x900-escuro.png)
- [Motoboy autenticado e vinculado, 390×844 claro](capturas/motoboy-vinculado-390x844-claro.png)

Os endereços de e-mail foram substituídos por “Conta identificada” somente na captura; o DOM foi restaurado imediatamente. A captura não registra segredo, token, cookie ou dado de autenticação.

## Publicação e commits

- API `rotamoto-api-e2e` reiniciada controladamente a partir do checkout Restaurante; `/health/ready` respondeu 200. Rotas administrativas/logísticas sem sessão responderam 401.
- SHA-256 local e HTTP coincidiram para `index.html`, `identity-ui.js`, `identity-ui.css` e `asset-manifest.js` em 8083 e 8084. Hashes detalhados em [TESTES.md](TESTES.md).
- Restaurante local: `d26b848` — `feat(admin): manage Motoboy identity links safely`.
- Motoboy local: `ab0e7f0` — `fix(identity): remove inactive app shell from layout`.
- Nenhum push de aplicação. Evidência histórica será publicada pelo commit do repositório histórico.

## Limites preservados

O fluxo de vínculo testado está aprovado tecnicamente nesta execução. Concorrência entre duas sessões independentes continua sem prova; `RM-0256C-DRIVER-LINK-UI` permanece PARTIAL no backlog amplo. A matriz visual é Chromium sintético e não substitui aprovação do proprietário no Chrome Android. As pendências anteriores de e-mail real, concorrência de convites e RBAC amplo permanecem intactas.
