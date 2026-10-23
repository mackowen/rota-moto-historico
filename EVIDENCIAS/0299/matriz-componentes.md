# Matriz de componentes — POC Início v2

| Componente / área | Origem e responsabilidade | Responsivo | Ações / segurança | Evidência | Estado |
|---|---|---|---|---|---|
| DashboardV2 | `dashboard-v2.js`; apresentação isolada, recebe modelo já adaptado | phone/tablet/desktop | leitura; saída da prévia; RBAC aplicado no render do app | browser-report.json | PASS_SCOPE |
| DashboardHeader | Dentro do DashboardV2; marca, notificações indisponíveis e Nova corrida | celular mostra marca e botão compacto; tablet/desktop usam marca da sidebar | criação abre formulário existente somente quando `can('create')`; notificações desabilitadas na prévia | capturas 320/768/1440 | PASS_SCOPE |
| Saudação e conexão | Modelo adaptado de Empresa e `state.syncStatus` | compacto em celular | desconhecido continua explicitamente indisponível | browser-report.json | PASS_SCOPE |
| OperationalKpiGrid / cards | Modelo do domínio via estados Order e analytics canônico | 2 colunas phone, 4 desktop; tablet adapta | sem números inventados; total do dia indisponível se eventos terminais não têm data confiável | capturas claro/escuro; teste de render | PASS_SCOPE |
| ReviewDeliveryList | Até oito itens elegíveis para atenção via fluxo existente | cards phone/tablet estreito; tabela em larguras maiores | mesma Order e status do estado; tenant filtrado por Company autenticada | capturas e browser-report | PASS_SCOPE |
| ReviewDeliveryCard | Transformação de Order; cliente, endereço, motoboy, taxa, status e data | coluna única e quebra de texto | Abrir usa `data-detail`; impressão/QR desabilitados na POC | capturas phone | PASS_SCOPE |
| ReviewDeliveryTable | Mesmo modelo dos cartões, sem regras próprias | tablets largos/desktop; rolagem contida em tabela se necessário | Abrir corrida segue fluxo atual | capturas 768–1920 | PASS_SCOPE |
| Painéis de análise | Analytics existente para tendência, origens, distância e repasse | coluna lateral desktop; adaptação tablet; ocultos em phone | valores indisponíveis explícitos; sem cálculo paralelo | capturas desktop | PASS_SCOPE |
| DashboardNavigation | Sidebar e navegação inferior existentes; classe de layout temporária na prévia tablet | bottom-nav <600; sidebar compacta 600–800; sidebar completa acima | RBAC e destinos seguem `MODULES`; classe removida ao sair | browser-report e capturas | PASS_SCOPE |
| DashboardEmptyState | Empty state próprio dentro do módulo | phone/tablet/desktop | sem operações que alterem dados | teste de render vazio | PASS_SCOPE |
| Início atual | `dashboard()`, sem alteração | comportamento corrente mantido fora da query | sem query render padrão; saída remove query e volta ao Início atual | Browser E2E | PASS_SCOPE |

**Limite:** responsabilidades estão separadas em funções do módulo próprio. Não criamos framework ou store paralelo. Dados de screenshot são aplicados somente no DOM durante o runner autenticado e não são gravados.
