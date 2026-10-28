# Motoboys e configurações — T05–T06, T13

**PARTIAL.** Removido bloco auxiliar duplicado byte a byte em `app.js` do Motoboy; os hashes de `app.js` foram sincronizados em `asset-manifest.js` e `index.html`. Commit local `90277dc`; a correção T02 está em `66b0eeb`. Passaram testes de persistência serializada, cross-tab, ownership de configurações, meta diária, preferências de navegação/mapa/alertas e PWA/cache dentro do `npm test`. As alterações são locais e não alteram preferências do usuário nem grants.

`npm test` passou integralmente e seu pretest `assets:check` passou após sincronização. Não houve validação de sessão autenticada nem teste visual no navegador.

Avisos no Motoboy também passaram a usar mínimo de 5 s (7 s em erro), crescendo até 12 s em mensagens longas. Teste unitário específico e a suíte total passaram.
