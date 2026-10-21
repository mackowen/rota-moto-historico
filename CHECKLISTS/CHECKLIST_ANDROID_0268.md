# Checklist do proprietário — Android físico (0268)

**Status inicial de todos os testes: `PENDING_OWNER`.** Nenhum teste abaixo foi executado em Chrome Android físico pelo Codex. Não marcar `PASS_PHYSICAL` sem execução no aparelho e confirmação do proprietário. O resultado Chromium/CDP está separado no [registro 0268](../REGISTROS/0268.md).

## Como preencher

Use Chrome no aparelho Android e percorra os fluxos abaixo nos aplicativos Restaurante e Motoboy. Registre `PASS`, `FAIL`, `PARTIAL`, `BLOCKED` ou `PENDING_OWNER`, o que observou e, opcionalmente, uma captura sanitizada. Não inclua senhas, códigos MFA/recuperação, QR de MFA, tokens, dados pessoais ou coordenadas precisas. Evite pedidos, convites e alterações administrativas reais; prefira identidade/dados de teste já autorizados. Restaure configurações alteradas ao valor original.

| Teste | Tela/fluxo e instrução curta | Resultado esperado | IDs relacionados | Gravidade | Resultado observado | Evidência sanitizada | Condição para encerrar |
|---|---|---|---|---|---|---|---|
| AND-01 | Restaurante e Motoboy: entrar e recarregar com sessão válida | Sem painel indevido nem flash de login; sessão válida retomada | RM-AUD19-07, RM-AUD19-12, RM-D1-AUTH-RESUME | Alta | PENDING_OWNER |  | Repetido nos dois apps, reload e retomada documentados |
| AND-02 | Colocar cada app em segundo plano e voltar; repetir após ~6 min | Política de sessão respeitada, mensagem clara e sem estado incoerente | RM-AUD19-07, RM-AUD19-12 | Alta | PENDING_OWNER |  | Resultado observado após retomada e expiração registrados |
| AND-03 | Ajustes → Aparência: alternar tema, salvar quando solicitado, fechar/reabrir app | Tema aplicado e persistido conforme confirmação exibida | RM-AUD19-01, RM-AUD19-02, RM-AUD19-10 | Média | PENDING_OWNER |  | Readback após reload/reabertura comprovado |
| AND-04 | Ajustes: editar configuração reversível e usar Salvar; navegar, voltar e recarregar | Confirmação só após gravação; rascunho/erro evidente; valor persistido | RM-AUD19-02, RM-AUD19-10, RM-D1-SETTINGS-SAVE | Alta | PENDING_OWNER |  | Valor observado após reload e sem perda silenciosa |
| AND-05 | Navegar cabeçalho, abas e barra inferior em ambas as orientações disponíveis | Página ativa isolada; conteúdo não fica sob a barra; sem rolagem horizontal acidental | RM-AUD19-13, RM-0256B1-PAGE-ISOLATION | Alta | PENDING_OWNER |  | Todas as abas percorridas e fundo da página inspecionado |
| AND-06 | Salvar e provocar mensagem/toast; verificar navegação inferior e notificações | Mensagem legível acima da barra inferior e não cortada pela área segura | RM-0256-D2-MOBILE-FEEDBACK, RM-AUD19-02 | Média | PENDING_OWNER |  | Mensagens de sucesso e erro visíveis integralmente |
| AND-07 | Abrir formulário, focar campos, digitar com teclado virtual, rolar e fechar teclado | Campo focado e ações acessíveis; conteúdo rola sem ficar encoberto | RM-AUD19-13, RM-0242-ANDROID-PHYSICAL | Média | PENDING_OWNER |  | Campos e botões usados com teclado aberto/fechado |
| AND-08 | Abrir modais no Laboratório e demais páginas; inspecionar espaçamento/bordas | Modal legível, foco/fechamento claros, sem bordas excessivas ou conteúdo cortado | RM-AUD19-13, RM-AUD19-15, RM-AUD19-16 | Média | PENDING_OWNER |  | Modal e retorno verificados em tela estreita |
| AND-09 | Ajuda: localizar e acionar Central de Ajuda | Botão coerente com o design e ação compreensível | RM-AUD19-05 | Baixa | PENDING_OWNER |  | Ação e aparência verificadas no aparelho |
| AND-10 | Laboratório 99Food: abrir se autorizado e examinar conteúdo | Sem caractere `}` isolado; simulação identificada e não enviada externamente | RM-AUD19-06, RM-AUD19-15 | Média | PENDING_OWNER |  | Captura sanitizada confirma conteúdo e estado |
| AND-11 | Ajustes → Integrações: revisar estados e textos sem configurar provedor | Estado não sugere conexão/homologação inexistente; linguagem clara | RM-AUD19-17, RM-0265-PROVIDER-UI | Alta | PENDING_OWNER |  | Três provedores revisados sem credenciais reais |
| AND-12 | Origem de pedidos: distinguir origem, plataforma e responsável pela entrega | Origem do pedido não determina por si quem entrega | RM-AUD19-09, RM-0264-ORDER-EXECUTOR | Alta | PENDING_OWNER |  | Cenários de origem marketplace/frota própria entendidos e anotados |
| AND-13 | Conta e Segurança: conferir estado MFA ativo/cadastro sem iniciar alteração | Fator ativo não mostra instruções de cadastro nem segredo existente | RM-AUD19-04, RM-AUD19-14 | Alta | PENDING_OWNER |  | Sem expor QR, segredo ou códigos; estado observado anotado |
| AND-14 | Comanda de teste: abrir prévia, QR, imprimir/compartilhar somente destino de teste | QR sintético legível quando suportado; não contém pedido/identidade real | RM-AUD19-08, RM-0267-PRINT-QR | Média | PENDING_OWNER |  | Resultado da prévia e impressão/compartilhamento de teste registrado |
| AND-15 | Empresa e Logística/Frota: conferir localização confirmada e origem personalizada | Valores conhecidos identificados corretamente; desconhecidos não inventados | RM-AUD19-03, RM-D1-LOCATION-CONSISTENCY, RM-0252-COMPANY-PERSIST | Alta | PENDING_OWNER |  | Valores das duas telas comparados; não publicar localização real |
| AND-16 | Mapa/GPS: conceder localização apenas se apropriado e revogar depois | Permissão explícita, indicador de posição coerente e sem usar GPS como endereço empresarial | RM-AUD19-03, RM-0261 | Alta | PENDING_OWNER |  | Resultado com permissão concedida/negada; sem publicar coordenadas |
| AND-17 | Equipe/perfis/auditoria: inspecionar ações permitidas sem promover contas | Ações respeitam permissões; operação ausente é explicada sem botão falso | RM-AUD19-11, RM-AUD19-18 | Alta | PENDING_OWNER |  | Negação e limite de autorização observados sem alteração de privilégios |
| AND-18 | Motoboys: consultar cadastro e editar apenas dado sintético autorizado | Edição preserva ID, histórico e vínculo; sem confundir Driver e identidade | RM-AUD19-19, RM-0260-DRIVER-EDIT | Alta | PENDING_OWNER |  | Persistência reversível confirmada ou limitação registrada |
| AND-19 | Fluxo de pedido teste autorizado: criar/confirmar, despachar e acompanhar até Motoboy | Estados coerentes entre apps e confirmações canônicas; sem ação comercial externa | RM-0264-OPERATIONAL-FLOW, RM-0262-SYNC | Alta | PENDING_OWNER |  | Ciclo reversível e autorizado documentado; sem pedido real |
| AND-20 | Com dados sintéticos autorizados, testar cancelamento/devolução e rota com múltiplas paradas | Histórico preservado; retorno e sequência visíveis conforme contrato | RM-0264-RETURN, RM-0221-RETURN | Alta | PENDING_OWNER |  | Repetição/idempotência e estado final conferidos nos dois apps |
| AND-21 | Ativar modo offline, fazer apenas alteração reversível permitida, reconectar | Estado local pendente não aparece como sincronizado; retry/readback claros | RM-0262-SYNC, RM-0263-RUNTIME | Alta | PENDING_OWNER |  | Pendência converge ou erro/confito fica explícito, sem duplicação |
| AND-22 | Motoboy: câmera e comprovante em entrega de teste autorizada | Permissão solicitada no momento correto; prova anexada ao fluxo sem dado real | RM-0264-DELIVERY-PROOF, RM-0262-SYNC | Alta | PENDING_OWNER |  | Teste de câmera/prova concluído com conteúdo sintético |
| AND-23 | Ajustes → Equipe e Integrações: inspecionar bordas, espaçamento e texto | Conteúdo legível, sem informação técnica desnecessária ou texto cortado | RM-AUD19-13, RM-AUD19-16, RM-AUD19-17 | Média | PENDING_OWNER |  | Capturas de telas relevantes revisadas |
| AND-24 | Ajustes → Auditoria: filtrar/consultar somente eventos permitidos | Acesso negado permanece negado; nenhum dado sensível ou outro tenant aparece | RM-AUD19-11, RM-0257-AUDIT-READ | Alta | PENDING_OWNER |  | Permissões e privacidade verificadas sem conceder SELECT/grant |

## Resumo do proprietário

- Aparelho/modelo e versão Android: ____________________
- Versão do Chrome: ____________________
- Data: ____________________
- Resultado geral: `PENDING_OWNER`
- Testes FAIL/PARTIAL/BLOCKED e descrição sem dados sensíveis: ____________________
- Confirmação explícita do proprietário para registrar os resultados: ____________________
