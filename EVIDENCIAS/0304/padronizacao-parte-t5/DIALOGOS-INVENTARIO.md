# Inventário de diálogos nativos

| Aplicativo/arquivo | Operação anterior | Consequência | Substituição |
|---|---|---|---|
| Restaurante `identity-ui.js` | desconectar conta de integração | interrupção do recebimento local | confirmação própria explica que a autorização no portal não é revogada |
| Restaurante `identity-ui.js` | confirmar pedido/cancelamento/reembolso Keeta/99Food, informar código/motivo/link | operações de marketplace dependem de valores corretos | decisões explícitas em select; prompt próprio com validação de motivo/código/HTTPS |
| Restaurante `identity-ui.js` | restaurar permissões financeiras essenciais | alteração empresarial sensível | confirmação própria; endpoint existente preservado |
| Restaurante `identity-ui.js` | suspender membro, revogar convite, desvincular motoboy | alteração de acesso/entrega | confirmações próprias, com consequência explicada |
| Restaurante `identity-ui.js` | suspender/reativar empresa ou usuário global | alteração administrativa auditada | diálogos próprios mantêm operação pendente até resposta HTTP |
| Restaurante `app.js` | descartar rascunho de Ajustes | perda de alteração ainda não salva | diálogo próprio assíncrono; navegação só continua após decisão |
| Restaurante `app.js` | decisão de custódia/recebimento de devolução | decisão física/auditável | diálogo de confirmação + campo de justificativa próprio |
| Restaurante `app.js` | envio de recebimento/operação financeira | declaração financeira explícita | confirmação própria; sucesso continua condicionado à resposta/sincronização existente |
| Restaurante `logistics-ui.js` | apagar estimativas futuras/executar alternativa | alteração econômica ou despacho externo | confirmação própria, sem alegar despacho externo concluído |
| Motoboy `identity-ui.js` | suspender membership | perda de acesso empresarial | confirmação própria com consequência informada |

O serviço do diálogo é um asset reutilizável (`dialog-service.js/css`) nos dois frontends. **Não** foram substituídos diálogos do próprio navegador para impressão, seletor de arquivos, permissão de câmera/localização ou outros requisitos de plataforma. Inventário textual pós-correção: nenhuma chamada `window.alert/confirm/prompt` permanece nos módulos de aplicação verificados.
