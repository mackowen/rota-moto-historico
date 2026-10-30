# Critérios de homologação — Campanha 0304

| Estado | Significado | Evidência mínima |
|---|---|---|
| PASS | Critério específico cumprido no escopo exato. | Execução reproduzível; readback/persistência para escrita; aprovação humana quando necessária. |
| PARTIAL | Subset concluído ou evidência incompleta. | Escopo que passou e lacuna explícitos. |
| FAIL | Defeito/gate reprovado observado. | Reprodução e critério que falhou. |
| BLOCKED | Dependência externa, autorização ou infraestrutura impede o teste. | Causa comprovada e condição de retomada. |
| PENDING | Não executado/sem prova suficiente, sem defeito comprovado. | Próxima verificação explícita. |

## Provas por domínio

- Persistência: carregar → editar → salvar/autosave conforme contrato → resposta válida → readback → reload/nova sessão; incluir falha/retry/conflito.
- RBAC: positivo e negativo no servidor, tenant correto, MFA/CSRF/RLS preservados.
- Cross-app: estado inicial, ação, payload, resposta, persistência, evento, projeção no outro app, idempotência/concorrência e cleanup.
- Logística: não inventar corridas/geometria; QR só elegível e assinado; indisponibilidade permanece fail-closed.
- UI: tela/estado, viewport/tema, medidas, console/rede, acessibilidade e captura. Sem sessão legítima, QA autenticado é BLOCKED.
- PostgreSQL: runner oficial, ledger/checksum/schema/constraints/RLS/readiness; T.15 não revalida nem altera o estado.
- Backup/DR: arquivo não prova restore; criptografia íntegra e restauração isolada em destino autorizado são critérios diferentes.
- Integração externa: credencial/onboarding/sandbox e autorização por provider; mock não comprova conectividade.
- Android físico: confirmação sanitizada no aparelho quando barra, teclado, GPS, câmera ou impressão fizer parte do aceite.

## Impedimentos a PASS global

Pendência P0, falha crítica, gate não testado, regressão de segurança, dependência necessária sem prova ou G14 sem aprovação impedem PASS global. G14 é independente dos PASS técnicos por lote.

## Escopos humanos protegidos

T.12 (Voltar, títulos duplicados e modais convite/perfil), T.13 (topbar horizontal Motoboy) e T.14 (topbar horizontal Restaurante) foram aprovados pelo proprietário somente nos escopos descritos. Manter regressão; não retornar à fila sem nova evidência. G14 geral permanece FAIL.
