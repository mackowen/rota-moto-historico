# Impacto no Motoboy

- O Motoboy continua consumindo a mesma identidade e o mesmo cadastro Driver canônico da empresa; não foi adicionado modelo ou cálculo duplicado.
- Com vínculo ativo, o endpoint protegido retornou apenas o cadastro autorizado após a associação e novo login MFA.
- Ao encerrar o vínculo, o acesso operacional retornou 403 `DRIVER_LINK_REQUIRED`. A identidade autenticada não foi convertida em conta/cadastro duplicado.
- Com entrega em andamento, o backend recusou encerrar o vínculo e o Motoboy continuou lendo o Driver. Após a entrega terminal, o encerramento finalizou disponibilidade/presença sem apagar o histórico.
- Alteração de layout Motoboy: a raiz `.app` passa a `display:none` somente enquanto `data-driver-link-required="true"`; o shell estava invisível visualmente, mas permanecia no layout e a navegação fixa ampliava o documento para 391 px em viewport 390 px. Depois da correção, a tela de ativação permanece acessível e o documento mediu 390 px.
- A navegação normal, inclusive o cabeçalho horizontal previamente aprovado, não foi modificada. `npm test`, assets, Browser QA autenticado e hashes HTTP passaram.

Capturas da página vinculada e das Configurações do Restaurante estão em `capturas/`. A aparência final ainda requer conferência do proprietário no Chrome Android.
