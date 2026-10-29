# Estados assíncronos — T7-03/T7-04

A seção substitui o conteúdo anterior antes de carregar, marca `aria-busy`, e somente a geração corrente pode renderizar, limpar erro/loading ou reabilitar Atualizar. Timeout limpa conteúdo pendente e mostra mensagem de recuperação. Cancelamento por navegação é descartado sem erro visível. Resposta vazia recebe mensagem específica; falha HTTP, schema inválido e rede continuam distintos.

Na seção Perfis e permissões, cartões empresariais são o seletor necessário para abrir perfis por empresa (`renderPlatformCompanies(..., 'roles')`); não são um editor antigo reaparecendo. A troca de seção limpa a raiz de resultados, e requests antigos não podem substituir a seleção atual.

Teste de requests fora de ordem/cancelamento e testes de timeout/sucesso passaram. Navegação autenticada real permaneceu indisponível.
