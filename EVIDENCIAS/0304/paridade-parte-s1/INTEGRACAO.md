# Integração Restaurante ↔ Motoboy

| Cenário | Evidência desta rodada | Estado |
|---|---|---|
| Contrato compartilhado | `test-cross-app-contract-parity.js` passou nos dois apps | PASS |
| Sync e isolamento tenant | `test-domain-sync-postgres.js`: lifecycle, cancelamento/replay/idempotência e cleanup com `databaseCommitted:false`, residuals 0 | PASS nos casos emitidos |
| Cancelamento antes e depois da coleta / devolução automática | `test-logistics-e2e-postgres.js` reportou before assignment, before pickup, post-pickup RETURN, route append e replay/idempotency | PASS nos casos emitidos |
| Custódia/retorno | `test-logistics-e2e-postgres.js` confirmou handover pendente e receipt autorizado idempotente | PASS nos casos emitidos |
| Despacho/aceitação/coleta/entrega em dois browsers autenticados | sem sessão de usuário e sem duas sessões autorizadas | BLOCKED |
| Múltiplas corridas e reordenação cross-app | cobertura completa não comprovada nesta rodada | PARTIAL |
| Offline, reconexão e duplicatas concorrentes cross-app | suites locais cobrem reconciliação/idempotência; sincronização real entre os dois apps não executada | PARTIAL |
| Permissão insuficiente em fluxo completo | guards HTTP/CSRF/RLS foram testados; matriz completa por cenário permanece pendente | PARTIAL |

INT-01 permanece PARTIAL: a suíte não cobre integralmente todos os passos e reflexos em telas reais. Nenhuma regra comercial foi alterada.
