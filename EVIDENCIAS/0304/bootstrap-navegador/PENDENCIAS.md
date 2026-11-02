# Pendências e gates

| Gate | Estado | Evidência / próxima ação |
|---|---|---|
| Auditoria e arquitetura do fluxo atual | PASS parcial de código | Reutiliza convite, senha e MFA existentes; fundador só após MFA. Validar em instalação vazia autorizada. |
| Assistente sete etapas | PASS sintético | DOM/CSS/JS reais em Chromium; APIs stubadas. |
| Validação, rascunho, idempotência UI, 409/retry | PASS sintético | CDP; sem gravar banco. |
| Bloqueio de instalação concluída na UI/status | PASS sintético + teste HTTP handler | A rota pública ainda não está no servidor 8787. |
| Migração 0067 | PARTIAL | SQL ensaiado e rollback em transação; não promovido a banco persistente. |
| Primeira instalação real/PostgreSQL/convite/MFA/founder | BLOCKED | E2E atual está em 0066 com latch/founder já concluídos; 8083/8787 servem versão anterior. Não alterar/resetar founder. Requer fixture reversível aprovada ou ambiente de primeira instalação administrativamente autorizado. |
| Publicação 8083/API 8787 | BLOCKED | `8083/bootstrap.html=404`, `8787/api/identity/bootstrap/status=404`, readiness 8787=200. Serviços preservados para não publicar fluxo incompatível com schema. |
| Motoboy | PARTIAL | Sem alteração de UI/código; paridade compartilhada passou na suíte do Restaurante. Jornada de primeiro acesso não ocorreu. |
| Limpeza do E2E | PENDING, fora desta fase | Plano registrado; nada apagado. Aguarda fase separada e autorização. |
| G14 / Campanha | FAIL / aberta | QA sintético não representa aprovação visual do proprietário nem instalação real. Campanha 0305 não iniciada. |

Risco operacional aberto: se o operador fechar a aba após o backend reservar o bootstrap e o provider de e-mail falhar, o retry imediato na mesma página é idempotente, mas a reemissão após perder a autorização mantida apenas em memória ainda requer procedimento operador dedicado. Não há remoção automática ou reset como recuperação.
