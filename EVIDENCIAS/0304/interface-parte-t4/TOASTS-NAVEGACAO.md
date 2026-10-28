# Toasts e navegação — T4-06/T4-10

## Causa e correção

**Causa reproduzida no código:** Restaurante tinha offsets fixos concorrentes (`18px`, `78px`, `74px` e variáveis de espaço/safe-area), enquanto `.bottom-nav` é fixa e pode incluir altura de safe area; a navegação tinha `z-index:1600` e o toast `1100`. Motoboy fixava o toast em `bottom:86px`, ignorando o aumento efetivo da barra em Android.

**Correção:** nos dois aplicativos o toast consulta o `getBoundingClientRect()` da navegação real e define `--app-toast-offset` como altura ocupada + 12px. Recalcula ao exibir a mensagem e em resize/orientação; usa fallback de 12px quando a barra não existe/está oculta. No Restaurante, `.toast` fica acima da navegação (`z-index:1700`) e continua informativo, sem interceptar toque (`pointer-events:none`). As durações existentes (mínimo 5s para aviso/sucesso, 7s erro, máximo 12s) foram preservadas.

## Arquivos e testes

- Restaurante: `app.js`, `styles.css`, `design-system.css`; `tests/test-toast-position.js`; teste estrutural `tests/test-dashboard-semantics.js` atualizado para não depender da antiga ordem textual; assets gerados por `npm run assets:sync`.
- Motoboy: `app.js`, `styles.css`; `tests/test-toast-position.js`; assets gerados pelo sincronizador oficial.
- Testes direcionados de posição e duração passaram nos dois. Harness DOM/CSS de Chromium 155 mediu 12px entre toast e navegação em 320×700 e 390×844, em tema claro e escuro; sem overflow horizontal.

## Navegação

Sem sessão real, nenhuma comparação de destinos/nomes, teclado Android, redirecionamento pós-login ou persistência de aba foi declarada aprovada. `app.js` do Restaurante define Início/dashboard no `startAuthenticatedApp()`; testes existentes de identidade/navegação passaram, sem Browser QA autenticado nesta execução. Ação de validação manual segura: [ACAO-PROPRIETARIO.md](ACAO-PROPRIETARIO.md).
