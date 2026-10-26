# Recuperação de acesso e convite — UI 0304 — 2026-10-26

## Causa e alteração

No painel de login, recuperação era um `<details>` com dois formulários visíveis no fluxo e um segundo `<details>` com duas etapas de recuperação MFA. Convite tinha outro disclosure separado. O CSS de formulário aplicava padding, fundo e borda em cada filho, produzindo caixas aninhadas e conteúdo vertical longo.

A apresentação foi reorganizada em telas mutuamente exclusivas: menu de recuperação, solicitar código, redefinir senha e recuperar MFA; convite passou a ser uma tela separada. Um único cartão contém o estado ativo, com retorno contextual. Somente um formulário de recuperação ou convite é mostrado por vez. Links de email preservam a navegação direta para a etapa compatível e continuam usando os mesmos campos e endpoints. O email de recuperação mantém resposta neutra. MFA ainda requer senha, confirmação por email e aprovação administrativa ou procedimento local; nenhuma alternativa de segurança foi criada.

Não foram alterados endpoints, validações de servidor, expiração/reuso de token, MFA, vínculo de empresa/tenant, convites, código da empresa nem recuperação de senha. Não houve POST de formulário nesta validação.

## Browser CDP

O runner `run-auth-flows.cjs` abriu a aplicação servida em `127.0.0.1:8083` em Chromium 155/CDP, com CSS e JS atuais. Foram verificados 184 estados: 9 viewports × 2 temas, menu, três opções, retorno ao menu/login, convite, links de email com token sintético local e validação nativa de email inválido. O viewport curto 390×560 simulou a redução de altura disponível: menu, MFA e convite permaneceram alcançáveis por rolagem do painel.

| Viewport/estado | Resultado medido |
|---|---|
| 980×720, tema escuro, menu | Recuperação x=545,30; y=22; 410,70×408,63 px; login e convite ocultos; documento 980/980 px, sem overflow horizontal |
| 390×560, tema escuro, recuperar MFA | Recuperação x=16; y=75; 358×546,08 px; painel externo `overflow-y:auto`, scrollHeight/clientHeight 641/560 px, scrollTop 81 px e botão final em y=511 px; scrollWidth/clientWidth 390/390 px |
| 1280×800, tema claro, convite | Convite x=744,41; y=22; 480×400,53 px; login e recuperação ocultos; documento 1280/1280 px |
| Links email com token sintético | Recuperação de senha abriu somente `reset-password`; MFA abriu somente confirmação; convite abriu somente formulário de convite; campo correspondente preenchido; hash removido pelo fluxo existente |
| Email inválido | Validação HTML bloqueou o submit; status não mudou e não houve requisição POST |

Capturas cobrem celular (390 px), tablet paisagem (1024 px), PC (1280 px) e Chrome Android emulado no viewport CSS 980 px, em claro/escuro, para menu, as três etapas e convite. São screenshots em Chromium emulado, não captura física do Chrome Android. `measurements.json` guarda dimensões, visibilidade, foco, scroll, respostas HTTP e métodos de rede sem valores de token.

Resultado: 184 estados concluídos, 40 capturas, zero exceções JS, zero requisições POST. As 24 respostas HTTP 401 são apenas `GET /api/identity/session` sem sessão autorizada. A interface e os caminhos de navegação foram testados; envio de email, troca de senha persistida, validade/reuso de convites, confirmação/aprovação de MFA, tenant e demais operações autenticadas não foram exercitados nesta rodada. Esses fluxos permanecem PARTIAL/BLOCKED até E2E com identidade sintética autorizada.

Não havia captura recente do proprietário acessível para comparação direta. Capturas desta execução são evidência da implementação, não referência nem aprovação visual. G14 permanece FAIL.
