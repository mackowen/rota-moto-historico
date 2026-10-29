# Campanha 0304 — Parte T.12

**Resultado geral: PARTIAL.** Foram corrigidos os cabeçalhos e retorno das páginas internas de Ajustes no Restaurante e os formulários administrativos de convite e perfil passaram a usar um modal acessível responsivo. A persistência continua nos endpoints já existentes. O Motoboy foi inspecionado e não possui fluxo equivalente de administração empresarial; nenhum arquivo dele foi alterado.

## Mudanças

- `app.js`: uma topbar por subpágina de Ajustes, título contextual e retorno integrado; navegação registra estados de entrada e destino e volta de forma segura. O resumo de Sistema local conserva a distinção entre IndexedDB local e identidades/RBAC do servidor.
- `identity-ui.js`: removidos cabeçalhos internos duplicados; descrição da Equipe sem segundo título; convites e criação/edição de perfis abrem o modal compartilhado. O iniciador de convite só aparece com `members.invite`.
- `admin-form-dialog.js` e `identity-ui.css`: modal nativo acessível, folha móvel, janela central em telas largas, corpo rolável, safe area, foco, descarte confirmado, bloqueio durante salvamento e prevenção de fechamento enquanto a operação está ocupada.
- `index.html` e `asset-manifest.js`: módulo carregado antes da UI de identidade e registrado no manifesto.
- Testes de UI/navegação atualizados para o contrato de topbar, modal e autorização.

O caminho de criação de conta continua sendo convite (`POST /api/admin/invitations`, aceito pelo servidor); não foi introduzida criação direta de usuário. Perfis usam os endpoints de roles existentes. Nenhum endpoint, grant, migration, sessão, usuário ou banco foi alterado.

## Evidência de navegador

Harness Chromium/CDP descartável com o componente real: cinco viewports (320×700, 390×844, 768×1024, 1024×768, 1440×900), claro e escuro; abertura, foco inicial, nome acessível, `aria-modal`, associação do botão Salvar ao formulário, cancelamento sem descartar, confirmação de descarte, reset e restauração do foco passaram em 10/10 combinações, sem overflow horizontal.

O host E2E público em 8083 foi carregado anonimamente: tela de login e scripts corretos, sem erro JavaScript e sem HTTP 5xx. O componente visual foi exercitado em harness, não dentro de sessão autenticada. Capturas estão em `browser/`; são evidência sintética/anônima, não aprovação do Chrome Android.

Hashes: SHA-256 local e HTTP de `admin-form-dialog.js` iguais a `955bb9b9003ee7a5f6369200dfd421f3c9ff6044e3d8b8bc206597d0c0a8f686`. HTTP 8083/8084 e health 8787/8788 responderam 200.

## Gates

| ID | Estado | Evidência |
|---|---|---|
| T12-UI-01 — topbar, títulos e retorno | PASS (código/teste/CDP público; cobertura completa de todas as telas não alegada) | teste `test-mobile-more-navigation.js`, shell anônimo 8083 |
| T12-UI-02 — diálogos administrativos responsivos | PASS sintético | CDP, 10 combinações; capturas em `browser/` |
| T12-UI-03 — auditoria visual integral dos dois apps | PARTIAL | páginas protegidas não disponíveis sem sessão; Motoboy sem fluxo administrativo equivalente |
| T12-RBAC-01 — convite conforme contrato real | PASS em contrato/código | endpoint de convite existente e permissão `members.invite` mantidos |
| T12-RBAC-02 — criação/edição de perfil sem ampliar delegação | PASS em testes de UI/contrato | suíte completa e testes de catálogo/permissões |
| T12-RBAC-03 — isolamento/MFA/CSRF/persistência autenticada ponta a ponta | PARTIAL | sem sessão autenticada; middleware e contratos não foram enfraquecidos |
| T12-UX-01 — confirmação, foco e estado responsivo | PASS sintético; Chrome Android real pendente | harness CDP isolado |
| T12-MOTO-01 — impacto e regressão Motoboy | PASS | nenhum código equivalente afetado; `npm test`, assets e diff-check passaram |

G14 continua **FAIL** até aprovação visual explícita do proprietário. Campanha 0304 permanece aberta; 0305 não iniciada. Backlog desde 0257 permanece preservado.

Consulte [TESTES](TESTES.md), [impacto Motoboy](IMPACTO-MOTOBOY.md) e [pendências](PENDENCIAS.md).
