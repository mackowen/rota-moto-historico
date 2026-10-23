# Matriz de ações da Home V2

| Ação/área | Origem UI | Destino/handler existente | Browser autenticado | Estado |
|---|---|---|---|---|
| Nova corrida | botão `data-new` | formulário operacional existente | Order sintética criada, enviada e sincronizada; sem duplicar endpoint | PASS_SCOPE |
| Abrir corrida | `data-detail` | modal de detalhe existente | Detalhe do pedido sintético abriu com cliente esperado | PASS_SCOPE |
| Ver todas | `data-tab=orders` | Pedidos e entregas | Navegação renderizada | PASS_SCOPE |
| Imprimir | `data-print-order` | preview/comanda existente | Conteúdo da Order, cliente, endereço, taxa e estado corretos; sem teste físico | PASS_SCOPE Browser |
| QR seguro | `data-qr-open` somente elegível | fluxo assinado existente | QR de Delivery elegível abriu; conteúdo visual presente; token não registrado | PASS_SCOPE Browser |
| Relatórios | `data-tab=reports` | aba existente | aba renderizada; endpoint analítico territorial não suportado pelo fixture | PARTIAL |
| Eventos/notificações | `data-tab=events` | aba existente | aba renderizada; contagem visual do sino não demonstrada como feed integral | PARTIAL |
| Atualizar conexão | `data-sync-now` | `runManualSync` existente | estados e handler ligados à sync real; cobertura de todos os códigos HTTP não realizada aqui | PASS_SCOPE integração / PARTIAL negativos |
| Menu Mais | `data-nav-more` | bottom sheet/sidebar | grupos, SVG, fechamento por botão/Escape/clique externo, foco restaurado | PASS_SCOPE |
| Ajustes/admin/integrações/ajuda | destinos já existentes e RBAC | abas existentes | rotas renderizadas quando a capability permite | PASS_SCOPE navegação |
| QR/print para perfil sem permissão ou não elegível | estados desabilitados da projeção | guardas existentes | RBAC e elegibilidade são refletidos; varredura completa de perfis não realizada | PARTIAL |

Não foram criados endpoints ou stores paralelos. Não se acionaram provedores externos.
