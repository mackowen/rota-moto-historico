# Matriz de padronização — Restaurante e Motoboy

**Convenção:** PADRONIZADA significa estado reconhecido em campanhas anteriores, preservado aqui; não equivale a nova inspeção autenticada. PARCIAL significa que há componentes/padrões atuais, sem cobertura integral nesta parte. BLOCKED indica que a tela exige sessão não disponível ou QA físico. Nenhuma tela foi removida da matriz.

| Aplicativo | Tela | Subaba/estado | Estado anterior | Referência | Divergência desta parte | Correção | Teste/evidência | Estado final |
|---|---|---|---|---|---|---|---|---|
| Restaurante | Início | painel e indicadores | PADRONIZADA | design system e T.4 | sem regressão reproduzida; preservada | nenhuma | suíte completa + contratos shell | PADRONIZADA (preservada) |
| Restaurante | Pedidos | lista/detalhe/ações | PADRONIZADA | cartões operacionais | sem regressão reproduzida; preservada | diálogos de marketplace migrados para componente próprio | npm test, `test-identity-ui` | PADRONIZADA; diálogos PASS técnico |
| Restaurante | Motoboys | lista/fila/distribuição | PADRONIZADA | controles de distribuição T.1 | não reinspecionada autenticada | nenhuma | suíte dispatch existente | PADRONIZADA (preservada) |
| Restaurante | Entregas | lista/detalhe/custódia | PADRONIZADA | estados operacionais atuais | confirmações/prompt de custódia eram nativos | diálogos próprios, validação de justificativa | npm test + contrato de diálogos | PARCIAL; fluxo autenticado não executado |
| Restaurante | Rotas | lista/mapa/detalhes | PARCIAL | T.2/T.4 | não reinspecionada visual autenticada | nenhuma; preservar layout e mapa | regressões de mapa na suíte | PARCIAL; G14 FAIL |
| Restaurante | Relatórios | filtros/visões financeiras | PADRONIZADA | Parte M/N | sem regressão reproduzida | confirmação financeira migrou para diálogo próprio | `test-analytics`, suíte completa | PADRONIZADA; visual autenticado BLOCKED |
| Restaurante | Eventos | filtros/histórico | PARCIAL | estilo operacional | sem sessão para percorrer | nenhuma | testes gerais de eventos | PARCIAL |
| Restaurante | Configurações | geral | PARCIAL | tokens e formulários existentes | sem ida-e-volta autenticada nesta parte | nenhuma | persistência coberta por testes prévios | PARCIAL |
| Restaurante | Configurações | operação | PARCIAL | controles operacionais | sem cobertura autenticada integral | nenhuma | testes relacionados na suíte | PARCIAL |
| Restaurante | Configurações | logística | PARCIAL | página/módulo independente | confirmação nativa de ação logística | diálogo próprio, mantém API somente após confirmação | `test-logistics-*`, contrato de diálogos | PARCIAL; CDP autenticado BLOCKED |
| Restaurante | Configurações | impressão | PARCIAL | impressão do navegador | não alterada | nenhuma | testes de impressão existentes | PARCIAL |
| Restaurante | Configurações | pedidos e integrações | PARCIAL | módulos iFood/99Food/Keeta | prompts de decisão/códigos nativos | prompt/decisão acessível com seleção validável | suíte de integrações + contrato de diálogos | PARCIAL; QA autenticado BLOCKED |
| Restaurante | Configurações | aparência | PARCIAL | tokens atuais | não alterada | nenhuma | testes de persistência/appearance | PARCIAL |
| Restaurante | Configurações | relatórios | PARCIAL | Relatórios | sem sessão | nenhuma | `test-analytics` | PARCIAL |
| Restaurante | Configurações | navegação | PARCIAL | navegação compartilhada | descarte de rascunho usava `window.confirm` síncrono | fluxo interno assíncrono com confirmação própria | suíte completa, teste de navegação | PARCIAL; Browser QA protegido BLOCKED |
| Restaurante | Configurações | eventos | PARCIAL | componente de eventos | não alterada | nenhuma | testes existentes | PARCIAL |
| Restaurante | Configurações | segurança | PARCIAL | identidade/MFA | não alterada; nenhuma mudança de MFA | nenhuma | testes de identidade/CSRF | PARCIAL; sessão real BLOCKED |
| Restaurante | Configurações | dados | PARCIAL | local-first/backup | não alterada | nenhuma | testes de backup existentes | PARCIAL |
| Restaurante | Configurações | backup | PARCIAL | centro de backup | nenhum backup criado nesta parte | nenhuma | suíte de backup | PARCIAL |
| Restaurante | Administração empresarial | equipe | PARCIAL | editor local existente | suspensão/revogação/desvínculo tinham confirm nativo | confirmação própria | `test-identity-ui` + suíte | PARCIAL; persistência real não testada |
| Restaurante | Administração empresarial | motoboys | PARCIAL | fluxo de associação atual | sem sessão | nenhuma | testes driver/membership | PARCIAL |
| Restaurante | Administração empresarial | integrações | PARCIAL | integrações desacopladas | desconexão nativa | confirmação própria, explica limite no portal | suíte de integração | PARCIAL |
| Restaurante | Super ADM Global | empresas | PENDENTE | design system existente | dados snake_case, altura e ações sem feedback consistente | DTOs validados, estados traduzidos, card compacto, suspensão/reativação confirmada e relida | teste UI estático + HTTP sintético | PARTIAL; autenticado BLOCKED |
| Restaurante | Super ADM Global | usuários | PENDENTE | design system existente | atributos nativos indefinidos e fundador ambíguo | mapper explícito; privilégio atual separado do latch; ação relida | teste UI estático + HTTP sintético | PARTIAL; autenticado BLOCKED |
| Restaurante | Super ADM Global | vínculos | PENDENTE | cartões administrativos | campos e status brutos/ambíguos | empresa, email, papel, escopo, estado e vínculo operacional rotulados | teste UI estático | PARTIAL; origem da associação não vem no DTO |
| Restaurante | Super ADM Global | perfis e permissões | PENDENTE | catálogo e RBAC do backend | editor longo, sem agrupamento nem estado dirty | grupos por domínio, descrição, granted/not granted, proteção, cancelar/salvar, preflight e reread | teste UI estático + HTTP sintético | PARTIAL; conflito atômico exige backend revision |
| Restaurante | Super ADM Global | resumo financeiro | PENDENTE | consulta agregada por empresa | formulários duplicados por empresa e sem estado claro | empresa única selecionável, período único, validação, totais rotulados e sem alegação de liquidação | teste UI estático + API HTTP sintética | PARTIAL; leitura autenticada não executada |
| Restaurante | Super ADM Global | configuração da plataforma | PENDENTE | endpoint safe-settings | latch poderia sugerir identidade privilegiada; saída técnica | políticas de implantação traduzidas, latch explicado separadamente, sem editar segredo | teste UI estático + `test-platform-admin-http` | PARTIAL; autenticado BLOCKED |
| Restaurante | Sistema local | painel local | PARCIAL | local-first | sem inspeção autenticada | nenhuma | testes existentes | PARCIAL |
| Restaurante | Laboratório de integrações | ambiente de teste | PARCIAL | módulos de fornecedor | sem fluxo autenticado | nenhuma | testes provider existentes | PARCIAL |
| Restaurante | Ajuda | busca/conteúdo | PADRONIZADA | conteúdo offline | preservada | nenhuma | Help Center test PASS | PADRONIZADA (preservada) |
| Motoboy | Início | disponibilidade/visão do dia/mapa | PADRONIZADA | experiência móvel vigente | sem regressão reproduzida | nenhuma | suíte completa Motoboy | PADRONIZADA (preservada) |
| Motoboy | Corridas | listas/abertas/filtros/histórico | PADRONIZADA | cartões operacionais | sem sessão autenticada | nenhuma | suíte de comandos/listas | PADRONIZADA (preservada) |
| Motoboy | Rotas | rota, mapa e ordem | PARCIAL | T.2 mapa e safe area | não reinspecionada autenticada | nenhuma | testes cartografia/mapa | PARCIAL |
| Motoboy | Mapa/trabalho | navegação e parada ativa | PADRONIZADA | workflow atual | sem regressão reproduzida | nenhuma | execution workflow PASS | PADRONIZADA (preservada) |
| Motoboy | Conclusão | entrega/retorno | PARCIAL | confirmação canônica | nenhum dado real usado | nenhuma | delivery confirmation tests PASS | PARCIAL; browser autenticado BLOCKED |
| Motoboy | Ganhos | hoje/semana/mês/período | PARCIAL | indicador local canônico | sem sessão para validação visual | nenhuma | earnings tests PASS | PARCIAL |
| Motoboy | Configurações | motorista | PARCIAL | dados pertencentes ao driver | membership suspend confirm nativo no portal de identidade | confirmação própria; sem alteração de ownership | identidade + contrato diálogo | PARCIAL |
| Motoboy | Configurações | ganhos | PARCIAL | metas e preferências locais | não alterada | nenhuma | driver goal persistence PASS | PARCIAL |
| Motoboy | Configurações | entregas | PARCIAL | notificações operacionais | não alterada | nenhuma | testes de preferências existentes | PARCIAL |
| Motoboy | Configurações | aparência | PARCIAL | tema/acento/contraste | não alterada | nenhuma | appearance/nav tests | PARCIAL |
| Motoboy | Configurações | rotas | PARCIAL | navegação externa/ordem | não alterada | nenhuma | navigation workflow tests | PARCIAL |
| Motoboy | Configurações | restaurante | PARCIAL | perfil/contexto de empresa | não alterada | nenhuma | ownership contract PASS | PARCIAL |
| Motoboy | Configurações | dados | PARCIAL | exportação/importação local | não alterada | nenhuma | backup tests | PARCIAL |
| Motoboy | Configurações | idioma | PARCIAL | localização da interface | não alterada | nenhuma | preference tests | PARCIAL |
| Motoboy | Ajuda | temas e busca | PADRONIZADA | conteúdo do Help Center | preservada | nenhuma | `test-help-center` PASS | PADRONIZADA (preservada) |
| Motoboy | Conta/identidade | login, MFA, sessão | PARCIAL | fluxo existente de identidade | suspensão usa confirmação própria; sem login alterado | confirmação segura | identidade tests | PARTIAL; sessão real não reproduzida |

Nenhuma tela protegida foi promovida a PASS visualmente nesta parte. A ausência de sessão não anula os problemas relatados nem os contratos e testes sintéticos executados.
