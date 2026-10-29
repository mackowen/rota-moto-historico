# Carregamento — T7-01

**Causa:** a camada `request()` não possuía limite de duração. Uma requisição que não terminasse poderia conservar o estado `aria-busy`. Além disso, o contrato inválido de Usuários/Vínculos podia falhar na etapa de apresentação.

**Correção:** criado `platform-admin-request.js`, com timeout operacional de 20 s, abort do transporte e distinção entre timeout e cancelamento por troca de seção. O estado da lista termina em sucesso/vazio, erro recuperável ou cancelamento obsoleto. `finally` atualiza loading apenas para a geração atual.

**Teste:** `tests/test-platform-admin-request.js` cobre resposta imediata, timeout com AbortSignal, cancelamento da seção sem erro falso e sucesso. `test-platform-admin-ui.js` cobre a guarda de geração. Resultado PASS.

**Limite:** não foi possível provocar uma sessão autenticada pendurada no endpoint real; a API protegida sem sessão respondeu 401.
