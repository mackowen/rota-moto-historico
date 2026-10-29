# Campanha 0304 — Parte T.10

**Resultado técnico: PASS.** A divisória terminal que aparecia imediatamente antes das ações do editor de permissões foi removida com uma regra restrita à última linha do último grupo. Os demais separadores foram preservados. O acabamento foi medido em Chromium isolado; não houve sessão Super ADM autenticada.

## Causa e correção

Em `identity-ui.css`, `.rm-platform-permission-row` definia `border-bottom` em todas as linhas. A última permissão do último grupo, portanto, desenhava uma linha na transição para `.rm-platform-role-actions`. Foi adicionada a regra `#rmPlatformAdminPage .rm-platform-permission-group:last-child .rm-platform-permission-row:last-child { border-bottom: 0; }`. A área de ações recebeu `margin-top: var(--space-2, 8px)`, usando a escala já existente. Nenhum estilo global ou componente de outros módulos foi alterado.

O teste em `tests/test-platform-admin-ui.js` verifica a remoção da divisória terminal, a permanência das divisórias entre permissões e o espaçamento tokenizado das ações.

## Comparação

Harness sintético, com CSS publicado em `http://127.0.0.1:8083` e componente real de disclosure:

- Antes: [320 px, tema claro](before-light-320.png) — divisória de 1 px antes dos botões.
- Depois: [320 px, tema claro](after-light-320.png) — sem a divisória terminal; o separador entre permissões permanece.
- As demais capturas `before-*` e `after-*` cobrem 320, 390, 768 e 1440 px nos temas claro e escuro.
- [Medições e interações](browser-measurements.json).

As imagens são sintéticas, não capturas de uma sessão autenticada do proprietário.

## Gates

| Gate | Estado | Evidência |
|---|---|---|
| T10-01 — linha terminal removida | PASS | `lastBorder: 0px` nas oito combinações; imagem antes/depois |
| T10-02 — divisórias internas preservadas | PASS | `priorBorder: 1px` nas oito combinações |
| T10-03 — espaçamento e botões contidos | PASS sintético | espaço de 8 px tokenizado, medidas dos botões e zero overflow |
| T10-04 — disclosures preservados | PASS sintético | consulta de perfil e detalhe de permissão abriram/fecharam |
| T10-05 — estado dos botões | PASS estrutural | harness confirmou ações desabilitadas no estado sem alterações; sem requisição/grant real |
| T10-06 — Chrome Android autenticado | BLOCKED | nenhuma sessão autenticada foi usada; confirmação visual final continua com o proprietário |

T.9 foi preservada: painéis expansíveis, descrições sob demanda, proteção do perfil proprietário e lógica de edição/salvamento não foram alterados. Nenhuma API, permissão, banco, conta, MFA ou grant foi modificado.

Commit local do Restaurante: `b4b811c` (`fix: remove divider before permission actions`). Motoboy sem alterações. Commit do histórico: a ser registrado após revisão/publicação.

G14 permanece **FAIL** até aprovação visual expressa. A Campanha 0304 permanece aberta; a 0305 não foi iniciada.
