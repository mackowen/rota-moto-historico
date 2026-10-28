# Configurações — T01, T03–T06

**PARTIAL.** Restaurante: as suítes existentes confirmam contratos de configurações empresariais, persistência/readback canônico, aparência e erros; não houve alteração nesses fluxos. Motoboy: removeu-se uma segunda cópia idêntica das funções `captureSettingsDraft` e `clearSettingsDraft` em `app.js`; o comportamento da fila de comandos e propriedade local/empresa permaneceu coberto pelos testes direcionados.

A validação de cada campo com endpoint/permissão, edição por sessão, salvar/cancelar, reload em UI, MFA/RBAC e contexto empresarial segue pendente, pois não houve sessão autenticada utilizável e Browser QA caiu na captura inicial. Nenhuma permissão ou perfil foi alterado.
