# Testes — Parte T.8

## Restaurante

- `node --check identity-ui.js` — PASS.
- `node tests/test-platform-permission-catalog.js` — PASS; 10 permissões atuais no catálogo, rótulos/descrições em português e fallback desconhecido seguro.
- `node tests/test-platform-admin-disclosure-contract.js` — PASS; botão real, estado inicial recolhido, ARIA, expansão, recolhimento bloqueado por rascunho, cliques concorrentes sem duplicar carregamento.
- `node tests/test-platform-admin-ui.js` — PASS; DTOs por seção, estados loading/success/empty/error, cancelamento de resposta antiga, labels, owner protegido e confirmação de rascunho.
- `node tests/test-platform-admin-request.js` — PASS; sucesso, deadline que aborta transporte e cancelamento por navegação.
- `npm test` — PASS (exit 0; inclui `assets:check`, suíte integral).
- `npm run assets:check` — PASS.
- `git diff --check` — PASS.

## Motoboy e contrato compartilhado

- `npm test` — PASS (exit 0; inclui `assets:check`).
- `npm run assets:check` — PASS.
- Contrato compartilhado executado nas suítes dos dois aplicativos — PASS.
- `git diff --check` — PASS.
- Nenhum arquivo do Motoboy alterado.

## Chromium/CDP isolado

Harness sintético carregou `identity-ui.css`, `styles.css`, `design-system.css` e os módulos reais `platform-admin-disclosure.js`/`platform-permission-catalog.js` publicados por HTTP em 8083. Criado perfil temporário próprio e encerrado ao final.

- Empresa e perfil iniciam fechados: `hidden=true`, `aria-expanded=false` — PASS.
- Abrir empresa e perfil pelo botão: `hidden=false`, `aria-expanded=true` — PASS.
- Fechar empresa: `hidden=true`, `display:none`, `aria-expanded=false` — PASS.
- Larguras 320, 390, 768, 1024 e 1440 px: `documentElement.scrollWidth == innerWidth` em todos — PASS para o harness.
- Claro: texto `rgb(23, 32, 51)` em fundo branco; escuro: texto `rgb(244, 247, 251)` em `rgb(32, 44, 58)`; sem overflow — PASS para o cartão montado. Contraste calculado: 16,27:1 no claro e 13,18:1 no escuro.
- Capturas: `super-adm-mobile-light-synthetic.png` e `super-adm-mobile-dark-synthetic.png`.
- Isso é teste de componente/harness, não QA autenticado do console.

## Serviço/publicação

- `http://127.0.0.1:8083/` — HTTP 200.
- `http://127.0.0.1:8787/health/ready` — HTTP 200.
- Hashes locais e HTTP 8083 idênticos para `identity-ui.js`, `identity-ui.css`, `platform-admin-disclosure.js`, `platform-permission-catalog.js`, `index.html`, `asset-manifest.js` (valores não sensíveis em `HASHES.md`, abaixo neste diretório).
- Sessão autenticada, ida-e-volta real de permissão e Chrome Android — BLOCKED, nenhuma credencial de conversa usada.
