# Correções de produção

## LC-MOTO-SETTINGS-QUEUE-01 — autosave perdido durante escrita concorrente

- **Aplicativo/módulo:** Motoboy, Ajustes.
- **Estado anterior:** o autosave geral (`scheduleSettingsSync`) retornava quando `settingsWriteBusy` estava ativo; o autosave de aparência (`saveAppearanceSetting`) também retornava ou sua tarefa timer terminava sem reprogramar. Uma alteração ainda no draft podia ficar apenas na tela enquanto outra gravação concluía com feedback de sucesso.
- **Causa raiz:** exclusão mútua implementada como “descartar se ocupado”, sem fila/deferimento para os dois tipos de gravação.
- **Arquivos:** `app.js`, `tests/test-settings-write-serialization.js`, `package.json`, `asset-manifest.js`, `index.html` (manifesto gerado).
- **Correção:** indicadores de gravação adiada, coalescência do draft de aparência, retomada depois do ACK da gravação ativa, limpeza de draft somente para valores confirmados, retenção do draft se falhar e mensagem de retry explícita. A aparência mais recente é reprogramada se o usuário mudar valor durante o request.
- **Teste:** teste determinístico executa o bloco de fila do `app.js`, mantém a primeira persistência pendente, deixa o timer da aparência vencer e comprova segunda gravação após o primeiro ACK. Resultado: PASS.
- **Limite:** teste de lógica de produção não substitui round-trip visual autenticado; a Parte C não altera a propriedade canônica dos dados locais.

## Integridade de escopo

Nenhum endpoint, contrato entre aplicativos, schema ou regra RBAC foi alterado. Nenhuma conta, vínculo, grant ou dado operacional foi modificado.
