# Persistência

## Evidência efetiva

No Restaurante, a UI autenticada alterou um campo de perfil empresarial sintético através do endpoint real. O harness aguardou o ACK de sucesso, releu o recurso pela API canônica e confirmou o mesmo valor após reload. Uma gravação baseada em revisão obsoleta retornou 409 e não foi apresentada como sucesso. O cenário transacional foi revertido/limpo ao final.

No Motoboy, o perfil de entregador vinculado foi lido pelo endpoint canônico antes e após reload; a sessão permaneceu autenticada e o logout revogou a sessão (204; leitura seguinte 401). Isso comprova leitura de identidade/vínculo e ciclo de sessão, **não** gravação de preferências de todas as categorias.

## Limite de conclusão

Não foi inventariado e salvo cada campo editável de ambos os aplicativos. Não foram comprovados logout/login novo após gravação de cada configuração, rascunhos de todas as seções ou offline/retry para cada categoria. `RM-D1-SETTINGS-SAVE` permanece PARTIAL. A evidência fecha somente o fluxo empresarial exercitado; preferências Motoboy e demais configurações continuam no backlog.
