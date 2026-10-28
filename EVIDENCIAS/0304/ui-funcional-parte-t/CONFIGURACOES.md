# Configurações — T01, T03–T06

**PARTIAL.** Restaurante: as suítes existentes confirmam contratos de configurações empresariais, persistência/readback canônico, aparência e erros; não houve alteração nesses fluxos. Motoboy: removeu-se uma segunda cópia idêntica das funções `captureSettingsDraft` e `clearSettingsDraft` em `app.js`; o comportamento da fila de comandos e propriedade local/empresa permaneceu coberto pelos testes direcionados.

A validação de cada campo com endpoint/permissão, edição por sessão, salvar/cancelar, reload em UI, MFA/RBAC e contexto empresarial segue pendente, pois não houve sessão autenticada utilizável e Browser QA caiu na captura inicial. Nenhuma permissão ou perfil foi alterado.

## Avisos (T02)

A causa identificada foi o timeout fixo curto nos dois aplicativos. Agora avisos curtos permanecem no mínimo 5 s, erros 7 s; textos longos aumentam proporcionalmente até 12 s. `tests/test-toast-duration.js` verifica mínimo por severidade, proporcionalidade/limite e uso pelo toast. Teste direcionado e `npm test` completo passaram nos dois apps. Posicionamento e sobreposição ainda exigem QA autenticado com runtime de browser estável.
