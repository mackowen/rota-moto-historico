# Refinamento visual do modal QR — 2026-10-25

## Implementação

O modal reutiliza o endpoint de emissão e o renderer QR já existentes. O tempo de validade e o horário são lidos de `expiresInSeconds` e `expiresAt` retornados pelo servidor. O relógio do cliente apenas compara `Date.now()` com o timestamp recebido; não renova nem prolonga a validade. Ao expirar, o canvas é limpo e a mensagem é anunciada uma vez. O QR permanece com módulos escuros em canvas branco e com a quiet zone provida pelo renderer existente e pela margem branca do contêiner.

O contrato, a assinatura, o nonce, a expiração, o tenant, a autorização e o check-in não foram alterados. O texto “Uso único · Sem dados pessoais” corresponde às claims atuais e à proteção contra replay existentes. A acessibilidade de Escape, foco inicial/retorno e Tab usa o ciclo de modal compartilhado; não foi adicionado um segundo focus trap.

## Capturas e medidas

`run-qr-modal-visual-fixture.cjs` injeta somente a estrutura visual e um canvas branco vazio no CSS servido por `127.0.0.1:8083`. **Não contém nem representa um token QR real.** O conteúdo é intencionalmente vazio nas capturas públicas para não publicar tokens temporários.

Foram capturadas 13 dimensões em tema claro e escuro (26 medidas): celular retrato, celular paisagem, tablet e PC. O canvas permaneceu quadrado e não houve overflow horizontal do documento ou modal. Tamanhos instrumentados: 220 px em 320 px; 244 px em 360–430 px; 280 px em 720–1024 px; 300 px em 1280–1920 px. O modal ficou com 608 px de altura em 320×720, 632 px em 360–430 px, aproximadamente 650–660 px em tablet e 670 px no PC. Em paisagem curta, o modal limita sua altura ao viewport e permite rolagem interna para alcançar as ações.

Capturas principais:

- [`dark-phone-390.png`](dark-phone-390.png)
- [`light-phone-390.png`](light-phone-390.png)
- [`dark-tablet-768.png`](dark-tablet-768.png)
- [`light-tablet-768.png`](light-tablet-768.png)
- [`dark-pc-1440.png`](dark-pc-1440.png)
- [`light-pc-1440.png`](light-pc-1440.png)
- [`dark-landscape-720.png`](dark-landscape-720.png)
- [`geometry.json`](geometry.json)

`geometry.json` preserva medidas DOM, estados de tema e resultados. O runner foi corrigido para isolar cada execução CDP em uma função, evitando redeclaração de bindings entre viewports.

## Limites e gates

O navegador abriu sem sessão autorizada; `GET /api/identity/session` respondeu 401, esperado nesse estado, sem POST de login e sem exceções JavaScript. Portanto, as capturas são evidência **visual de estrutura**, não prova de emissão autenticada, assinatura/validade lidas pelo validador, renovação, expiração em execução ou leitura física por câmera. Esses cenários permanecem BLOCKED até ambiente/conta sintética MFA autorizados e fixture durável com limpeza segura.

O canvas branco é um fixture deliberado e não deve ser interpretado como QR emitido. Banco oficial sem escrita. G14 continua FAIL até inspeção e aprovação expressa do proprietário.
