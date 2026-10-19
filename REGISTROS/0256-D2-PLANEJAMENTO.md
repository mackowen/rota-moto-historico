# Planejamento — Campanha 0256-D2

**Data:** 2026-10-19  
**Tipo:** reconciliação documental e replanejamento; nenhuma implementação executada.  
**Resultado:** DOCUMENTAL CONCLUÍDO; inventário reconcilia os registros consultados, mas lista-fonte das 19 ocorrências Android não localizada.

## Escopo e preservação

Foram lidos o Backlog Mestre, Pendências, Estado atual, Plano de Finalização, contratos compartilhados Restaurante/Motoboy e os registros 0234–0256-D1, inclusive 0255 (administração global). Esta revisão foi limitada a `rota-moto-historico`: não houve alteração em apps, Browser Tests, bancos, credenciais, serviços, branches operacionais ou configurações. Não foram executados migrations, GRANTs, promoção de identidade, bootstrap, conexão com banco oficial ou testes operacionais.

## Entregas

- `INVENTARIO_UNICO_PROBLEMAS.md`: IDs permanentes, origem/aliases, prioridade, estado, dependências, campanha, aceite/evidência; inclui os itens D1, campanhas 0256 anteriores, 0257–0268, identidade/admin global, operação, integração, backup/DR e uma ponte explícita para as linhas antigas ainda abertas em `PENDENCIAS.md`.
- `ORDEM_EXECUCAO_CAMPANHAS.md`: sequência 0256-D2 → 0256-E → 0256-F → 0257 → gate 0258 → 0259–0268, com pré-requisitos, trabalho permitido e critérios por etapa. Dependências externas/owner permanecem paralelas e bloqueiam apenas sua capacidade.
- Inventário marca como obrigatória a atualização futura de itens resolvidos, remanescentes, bloqueados, regressões e não testados em toda campanha. `npm test` sozinho não encerra item; hardware físico requer evidência do proprietário.

## Reconciliação das 19 ocorrências Android

O registro 0256-D1 enumera **17** ocorrências. O pedido desta reconciliação informa **19** e cita temas adicionais sobre barra inferior/toasts, divergência de coordenadas, edição de owner/usuários/perfis/motoboys, Relatórios, auditoria e organização; não foi encontrado arquivo-fonte que contenha 19 descrições numeradas nem capturas vinculadas. Não é possível atribuir as 19 ocorrências aos números D1 sem inventar correspondência. O inventário:

- mapeia explicitamente os tópicos identificáveis a IDs existentes/novos e evidencia o que segue parcial;
- mantém 19 slots locais `RM-AUD19-01` a `RM-AUD19-19` sem vínculo à numeração original, sem inventar conteúdo ou correspondência;
- deixa explícito que a edição de cada tipo de entidade carece de passos e permissão esperada. A interface/endpoints existentes devem ser auditados antes de decidir correção, proteção legítima ou dependência ausente;
- pede a lista original/capturas sanitizadas como pré-requisito de reconciliação 19/19, mantendo progresso possível da D2 em itens documentados.

## Administração global e gate 0258

O registro 0255 confirma modelo/isolamento, migrations aplicadas no E2E, endpoints e CLI, mas não comprova sessão global positiva completa nem identifica o fundador. O bootstrap não foi executado e não houve promoção. A ordem separa:

1. 0257: terminar capacidades e UI em identidade global sintética, com MFA, CSRF, RBAC separado, ações positivas/negativas e transação E2E;
2. 0258: exigir evidência histórica, revisão de ameaça/least privilege, migration/rollback, backup/recovery, alvo certo e aprovação explícita antes de qualquer mudança persistente;
3. audit log: D1 mediu ausência de `SELECT` para `rotamoto_app`; nenhuma leitura geral deve ser adicionada. Definir endpoint/role/função tenant-scoped e passar pelo gate de autorização/migration aplicável.

## Conflitos e limites

- D1 geral está `PARTIAL` embora alguns testes/linhas individuais tenham estado PASS. O inventário conserva `PASS_SCOPE` e exige regressão por mudança; não converte em fechamento global.
- `PENDENCIAS.md` possui IDs mais antigos (alguns com estado/evidência mais antigo que as campanhas sucessoras), que não são apagados. O inventário os mantém como lineage e ponte até o crosswalk individual ocorrer; estados discrepantes devem ser resolvidos pelo registro mais recente com evidência específica.
- O pedido refere campanhas 0256-D2/E/F e 0257–0268; `PLANO_FINALIZACAO.md` e registros usam nomes e detalhes de campanha em diferentes contextos. A ordem usa o objetivo nominal pedido e mapeia IDs por capacidade, sem alterar o plano histórico.
- Não foi feita inspeção de código/runtime nesta etapa além da leitura de contratos e registros já versionados; nenhuma evidência nova de funcionamento é declarada.

## Critério para a próxima implementação

A 0256-D2 deve iniciar pelo crosswalk da auditoria-fonte de 19 itens e pelo mapa de configurações (dono: dispositivo/IndexedDB/servidor; tipo de save; confirmação e erro). Pode então implementar persistência/UI quando o contrato e backend dão suporte. Deve manter edições privilegiadas, sessão/MFA e dados operacionais atrás das autorizações já existentes. Não antecipar 0256-E ou F, não mudar banco oficial, não conceder permissões nem conectar marketplaces.

Ver [Inventário único](../INVENTARIO_UNICO_PROBLEMAS.md), [Ordem de campanhas](../ORDEM_EXECUCAO_CAMPANHAS.md), [Backlog](../BACKLOG_MESTRE.md) e [Estado atual](../ESTADO_ATUAL.md).

## Resultado da execução 0256-D2

A execução foi aberta sem substituir este plano. Ver [REGISTROS/0256-D2.md](0256-D2.md): resultado PARTIAL, IDs RM-AUD19-01..19 reconciliados com a lista fornecida pelo proprietário; correções e limitações rastreadas item a item.
