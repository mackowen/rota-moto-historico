# Pendências e gates

| Gate | Estado | Evidência / próxima ação |
|---|---|---|
| Auditoria e arquitetura do fluxo atual | PASS parcial de código | Reutiliza convite, senha e MFA existentes; fundador só após MFA. Validar em instalação vazia autorizada. |
| Assistente sete etapas | PASS sintético | DOM/CSS/JS reais em Chromium; APIs stubadas. |
| Validação, rascunho, idempotência UI, 409/retry | PASS sintético | CDP; sem gravar banco. |
| Bloqueio de instalação concluída na UI/status | PASS sintético + teste HTTP handler | A rota pública ainda não está no servidor 8787. |
| Migração 0067 | PARTIAL | A causa do `fe_sendauth` foi conexão por socket Unix: `.pgpass` só tem correspondências TCP `127.0.0.1`. `rotamoto_migrator` agora autenticou por TCP e confirmou `rotamoto_e2e`, ledger 0066/checksums. Migration ainda não aplicada: backup criptografado novo e restore verificável não foram executados nesta rodada. |
| Primeira instalação real/PostgreSQL/convite/MFA/founder | BLOCKED | E2E atual está em 0066 com latch/founder já concluídos; 8083/8787 servem versão anterior. Não alterar/resetar founder. Requer fixture reversível aprovada ou ambiente de primeira instalação administrativamente autorizado. |
| Publicação 8083/API 8787 | BLOCKED | Processo supervisionado `rotamoto-api-e2e` executa checkout Restaurante em 8787; endpoint status e página Bootstrap retornam 404. Não reiniciado/publicado antes do gate de backup e schema compatível. |
| Motoboy | PARTIAL | Sem alteração de UI/código; paridade compartilhada passou na suíte do Restaurante. Jornada de primeiro acesso não ocorreu. |
| Reset integral do E2E | PENDING, fora desta fase | Plano corrigido em `PLANO-LIMPEZA-E2E.md`: remover também founder/latch, users, MFA e sessões mantendo schema/roles/RLS. Reset não executado; exige backup/restore verificado, DBA autorizado e confirmação explícita. |
| G14 / Campanha | FAIL / aberta | QA sintético não representa aprovação visual do proprietário nem instalação real. Campanha 0305 não iniciada. |

Risco operacional aberto: se o operador fechar a aba após o backend reservar o bootstrap e o provider de e-mail falhar, o retry imediato na mesma página é idempotente, mas a reemissão após perder a autorização mantida apenas em memória ainda requer procedimento operador dedicado. Não há remoção automática ou reset como recuperação. A autenticação PostgreSQL funciona com host explícito `127.0.0.1`; omitir host escolhe socket Unix e não corresponde ao `.pgpass`. Nenhuma credencial foi impressa nem alterada.
