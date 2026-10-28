# Estados assíncronos

- `identity-request-state.js` controla a geração mais recente e cancela o controlador anterior. O console usa instâncias separadas para navegação geral e consulta financeira.
- Alternar seção cancela a consulta de lista anterior; somente a geração atual pode renderizar, limpar `aria-busy` ou reabilitar Atualizar lista.
- Trocar empresa ou datas financeiras cancela o request e limpa o resultado antigo. Uma resposta é aceita apenas se geração, seção conectada, empresa e intervalo ainda coincidirem.
- Respostas e erros da consulta de perfis são ignorados se o card foi desmontado ou se a aba ativa deixou de ser Perfis e permissões.
- A UI conserva feedback de carregamento para a tarefa atual e o `finally` reabilita controles apenas para essa geração.

**Executado:** teste unitário do controlador, incluindo duas promises resolvidas fora de ordem; request antigo abortado e incapaz de gravar, request atual preservado; cancelamento financeiro; testes `test-platform-admin-ui`, identidade e HTTP; suíte integral dos dois apps.

**Limite:** não houve interação autenticada com os seis módulos, endpoints financeiros reais ou expiração de sessão no Chromium nesta execução. Tais cenários permanecem BLOCKED, não PASS.
