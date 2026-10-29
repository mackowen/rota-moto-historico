# Campanha 0304 — Parte T.8

**Resultado geral: PARTIAL.** Correções do carregamento e dos painéis foram implementadas no Restaurante e cobertas por testes de contrato/componente e harness Chromium isolado. A tela autenticada no Chrome Android continua aguardando conferência do proprietário; nenhuma sessão, cookie, token, MFA ou senha foi obtida para automação.

## Causas e correções

- **T8-01 — carregamento persistente: corrigido.** `identity-ui.js`, `loadPlatformAdmin()` (linhas 283–293): a mensagem era adicionada ao contêiner, mas os renderizadores acrescentavam conteúdo sem remover o nó de carregamento. A resposta válida agora remove o indicador antes de renderizar; as seções registram `loading`, `success`, `empty` ou `error`, e o `finally` da geração ativa remove `aria-busy` e libera Atualizar.
- **T8-02 — troca concorrente de seções: PASS técnico.** Continua usando `createLatestRequestState` com abort e geração; respostas antigas não substituem o conteúdo. Teste assíncrono de ordenação/cancelamento no `test-platform-admin-ui.js` passou.
- **T8-03 — erro/vazio: PASS técnico.** Vazio permanece distinto de resposta inválida; erro remove o carregador e recebe mensagem de usuário. Cobertura estática/contrato e timeout/cancelamento passaram; erro autenticado em produção não foi simulado.
- **T8-04 — linguagem: corrigido tecnicamente.** Novo catálogo `platform-permission-catalog.js` apresenta permissões conhecidas em português, mantendo as chaves originais para API; chave desconhecida recebe texto seguro e chave técnica fica em “Detalhe administrativo”. Nomes sintéticos seguem sem renomear dados; a interface os apresenta como “Registro empresarial” e preserva o identificador em segundo plano.
- **T8-05 — consulta de empresa recolhível: corrigido.** `platform-admin-disclosure.js` controla expansão acessível e serializa transições. A origem visual adicional era CSS `display:grid` do painel que prevalecia sobre `hidden`; seletor específico agora garante `display:none` quando recolhido.
- **T8-06 — perfis recolhíveis: corrigido.** Cada perfil recebe botão próprio, `aria-expanded`/`aria-controls`, conteúdo inicialmente oculto e estado visual expandido. Mudanças não salvas acionam confirmação do serviço de diálogo existente.
- **T8-07 — editar/salvar/cancelar: preservado por inspeção do fluxo e testes de contrato existentes.** Não foi feita escrita em banco nem alteração real de permissões; persistência autenticada fica pendente.
- **T8-08 — perfil protegido/RBAC: preservado.** O perfil protegido continua com `fieldset.disabled`, sem controles de gravação; os endpoints e guardas existentes não foram alterados. Testes administrativos sintéticos incluídos na suíte passaram.
- **T8-09 — compactação/responsividade: PASS sintético limitado.** Em Chromium descartável, painel abriu/recolheu, `hidden` calculou `display:none`, e o documento não teve overflow em 320, 390, 768, 1024 e 1440 px. Teste real autenticado do usuário permanece pendente.
- **T8-10 — contratos: PASS automatizado.** `npm test` completo Restaurante e Motoboy passou, incluindo contrato compartilhado; não houve mudança de schema nem de API.
- **T8-11 — publicação HTTP E2E: PASS.** O frontend respondeu HTTP 200 em 8083, a API E2E readiness respondeu HTTP 200 em 8787 e SHA-256 dos arquivos alterados servidos em 8083 correspondeu ao checkout.
- **T8-12 — Chrome Android autenticado: BLOCKED.** A validação exigiria sessão legítima já autenticada no dispositivo. O perfil pessoal não foi acessado ou limpo.

## Evidências visuais

`super-adm-mobile-light-synthetic.png` e `super-adm-mobile-dark-synthetic.png` mostram o harness isolado com CSS servido e o controlador real de disclosures, sem dados ou sessão reais. Não representam aprovação visual autenticada.

## Preservação

Sem acesso ou escrita em PostgreSQL nesta parte; sem migrations, mudanças em fundador, grants, MFA, RLS, auditoria, backup ou chave. Motoboy não recebeu alteração de código. Baselines e backlog 0257 preservados. G14 continua **FAIL**, Campanha 0304 aberta, 0305 não iniciada.
