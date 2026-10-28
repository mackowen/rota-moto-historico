# Browser QA

## QA executado

- Chromium 155.0.8059.79, arquitetura AArch64/Termux, `--headless=new`, SwiftShader/software, perfil temporário isolado e CDP com porta dinâmica.
- Smoke público no `http://127.0.0.1:8083/`: título e tela inicial carregaram; `identity-request-state.js` ficou disponível antes do identity UI; nenhuma exceção JS. Sem login ou leitura de sessão.
- `identity-ui.css` real do checkout foi injetado em um harness visual sintético; os seis padrões de cartão, navegação global e cartão de permissão estão visíveis. A página traz rótulo “Demonstração sintética”.
- Dez combinações: 320×700, 390×844, 768×1024, 1024×768 e 1440×900 nos temas claro/escuro. Erros JS: zero. Overflow: zero. Contraste mínimo: 4,73:1 claro e 5,62:1 escuro.
- Capturas: `super-admin-light-{320,390,768,1024,1440}.png` e `super-admin-dark-{320,390,768,1024,1440}.png`; métricas em `browser-measurements.json`.
- Os assets atualizados em `127.0.0.1:8083` (identity-ui.css/js, helper de estado e app.js) responderam 200 e tiveram SHA-256 idêntico ao checkout.
- Hashes após commit `58a2739`: `identity-ui.css` `8b21f5c5acbfb76e32981e6aa5bab6cdc09cd5c675bf3b6be8399a25bbf822ee`; `identity-ui.js` `f66db25dff89f22016d6530cfa0f3deca60ea8375be8703d23246ad12e57ecb1`; `identity-request-state.js` `d0dcad8fce419513c007e07b336ac00c413c6bcf9cf35a627b0c8e03d21662f0`; `app.js` `199274e3eaf4f0c09935474e808e64b40a4074613b6f67b10c73915965a43d3a`.

## Não executado

Browser QA autenticado do console Global, consulta real de empresas/perfis/financeiro e estado de MFA: BLOCKED por falta de sessão legítima no CDP. Senhas e códigos enviados na conversa não foram usados; nenhum perfil pessoal do Chrome foi acessado.
