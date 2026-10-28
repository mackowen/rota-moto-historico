# Console Super ADM Global — ADM-01–ADM-08

## Causa e alteração

`identity-ui.js` consumia diretamente os DTOs crus do endpoint e formatava alguns campos como camelCase. O PostgreSQL das migrations 0048/0059 retorna os nomes `member_count`, `email_verified`, `company_count`, `platform_admin`, `company_name`, `role_name` e `has_driver_link` em snake_case. Isso explica contadores `undefined` e booleanos ausentes. O renderer novo valida fronteiras e converte os campos aceitando ambas as convenções, sem forçar ausência a zero. Contagens nulas aparecem como “Quantidade não disponível”; resposta malformada produz mensagem específica e não renderiza parcialmente.

Estados conhecidos são traduzidos; empresa encerrada é identificada, e estados desconhecidos são apresentados como “Estado não reconhecido” (sem código cru). Nomes com padrão `Synthetic`/`__campaign_` recebem nota de origem não confirmada: nada foi removido, renomeado ou suspenso. Não foi inferido que todos esses registros sejam fixtures; a empresa Chico Restaurante não foi editada.

A relação `platform_admin` é exibida separadamente de `founder_claimed`. A tela de políticas explica que o latch registra o bootstrap histórico e não comprova qual usuário possui o privilégio hoje. Nenhuma conta/grant foi concedida ou removida.

As empresas usam cards compactos com nome, estado, quantidade quando conhecida e ação contextual. Suspender/reativar pede motivo válido do contrato, confirmação própria que aguarda o PATCH do servidor, e releitura para confirmar o novo estado. Usuários também só exibem sucesso após releitura. O usuário atual não recebe ação de auto-suspensão.

A tela de vínculos deixa claros usuário, empresa, papel, estado, escopo e associação de motoboy. O DTO não informa a origem do vínculo; a UI diz isso explicitamente em vez de inventar uma origem.

## Limite de validação

A UI administrativa real exige usuário global, sessão com MFA recente, CSRF nas operações de escrita e escopo/auditoria existentes. Não havia sessão autorizada no CDP nesta execução. Os testes de API sintéticos passaram, mas a navegação das seis seções e o resultado em dados reais continuam BLOCKED. Sem leitura autenticada, não se conclui a origem/estado dos registros técnicos nem a aparente divergência da conta real.
