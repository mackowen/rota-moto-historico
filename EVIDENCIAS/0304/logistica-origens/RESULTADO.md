# Logística e origens de pedidos — Campanha 0304

Execução em 2026-10-31. `RM-D1-LOCATION-CONSISTENCY` e `RM-D1-SETTINGS-SAVE` permanecem PARTIAL no backlog amplo; esta entrega comprova apenas o escopo descrito aqui. O proprietário confirmou previamente no Chrome Android os salvamentos de Empresa e Operação; esses fluxos e contratos foram preservados.

## Defeitos e correções

- **Logística/localização:** a tela tinha controles de modo e coordenadas próprios, duplicando a localização da Empresa. Removidos da origem do componente. Logística agora lê `origin`, procedência e versão da resposta autorizada de `/api/logistics/route-settings`, informa que Empresa é a fonte canônica e encaminha a edição para Empresa. Apenas `returnToOrigin` permanece editável nesta seção. A API rejeita coordenadas/mode custom nesta configuração e grava somente a política de retorno. Geometrias OSM/ORS existentes foram preservadas; falhas de roteamento continuam sem substituição inventada.
- **Origens locais:** localizavam-se em ajustes locais e integravam a lista de provedores, misturando classificação manual com conexão externa. Agora o catálogo local fica em `companies.order_origins` no PostgreSQL, segregado por empresa, com versão otimista e auditoria. Manual permanece disponível; iFood/Keeta/99 só aparecem como integrações se o servidor as retornar. Desativar preserva identificador e referências; remoção é rejeitada.
- **409 após reload:** o catálogo/revisão de origens retornado pelo servidor era guardado junto às preferências IndexedDB e reutilizado após recarga. Um teste autenticado reproduziu 409 na gravação posterior. `bootstrap()` agora descarta do estado restaurado o catálogo e dados transitórios de origem; a tela relê o dado canônico antes de editar. A revisão concorrente continua sendo validada pela API.

## Provas

- Chromium/CDP real, perfil temporário, login e MFA por fixture, 390×844, claro/escuro. Criar `browser_qa_origin`: PUT 200, revisão 1→2 e GET/readback 200; renomear: PUT 200, 2→3; reload completo: a tela carregou versão 3 do PostgreSQL; desativar: PUT 200, 3→4, GET 200, registro mantido com `active=false`. Sem erros JavaScript; largura do documento 390 px nos dois temas. Screenshot: [claro](origins-light-390x844.png), [escuro](origins-dark-390x844.png). O ensaio autenticado usa harness transacional e faz rollback; ele não é uma sessão autenticada do Chrome pessoal nem aprovação física Android.
- Na mesma sessão, Logística carregou `/api/logistics/route-settings` e `/api/logistics/intelligence/analytics` com HTTP 200. O DOM não contém controles `originMode`, latitude ou longitude e contém a indicação de localização canônica e ação para editar Empresa. Nesta fixture a localização estava desconhecida; nenhuma coordenada foi inventada.
- PostgreSQL E2E transacional com `rotamoto_app`: empresa/escopo autorizado, escrita e releitura, atualização consecutiva, conflito de revisão obsoleta, rejeição de remoção do identificador e rollback passaram. Nenhuma escrita de teste persistiu. Os fluxos públicos de integração dos apps permaneceram compatíveis; `node tests/test-cross-app-contract-parity.js` passou. Não houve mudança de código no Motoboy.
- Migration aditiva `0065_company_order_origins` foi aplicada pelo runner oficial em `rotamoto` e `rotamoto_e2e`; ambos ficaram em 0065. Nenhum dado comercial ou founder foi alterado. `rotamoto` recebeu apenas schema; E2E recebeu apenas schema, fora das transações revertidas.
- `8083/` e `8084/` responderam 200; `/health/ready` em 8787 respondeu 200; `/api/admin/order-origins` sem sessão respondeu 401 (rota carregada e protegida). SHA-256 de `app.js` local e servido por 8083: `771123603e85ce59d3410a3d28c2ced5930e4920f52b9cd7bbb4ed2c8259aec1`; `index.html` servido aponta para `app.js?v=771123603e85ce59`.

## Testes

PASS: `node tests/test-company-order-origins.js`; `npm run test:company-order-origins` (inclui PostgreSQL E2E transacional); `node tests/test-route-origin-settings.js`; `npm run test:logistics`; `npm run test:logistics-intelligence`; `node tests/test-company-settings.js`; `node tests/test-company-delivery-pricing.js`; `node tests/test-company-settings-persistence.js`; `node tests/test-cross-app-contract-parity.js`; `node tests/test-postgres-migration-targets.js`; `npm run assets:check` em ambos; verificações `node --check` nos módulos alterados e `git diff --check`.

## Estado

PASS no CRUD/readback/reload/deativação sintéticos autenticados, na origem canônica de Logística e no contrato de publicação/hash. PARTIAL para aprovação física do proprietário da aba Logística e geocodificação/pino quando dados de endereço reais estiverem disponíveis. `RM-D1-LOCATION-CONSISTENCY` permanece PARTIAL (validação física Logística/Motoboy pendente); `RM-D1-SETTINGS-SAVE` permanece PARTIAL porque outras configurações e integrações não fazem parte deste ciclo. G14 permanece FAIL e Campanha 0304 aberta.

Estado final pós-verificação read-only: `rotamoto` contém 0 empresas; `rotamoto_e2e` contém exatamente 1 (`Chico Restaurante`). A contagem foi consultada pelo papel administrativo de backup, não pelo papel app. Nenhuma empresa, usuário ou dado operacional persistiu da fixture transacional.

Commit local Restaurante: `977f292` (`fix: persist company order origins and canonical logistics`). Motoboy não teve alteração de código; nenhum push de aplicativo foi executado.
