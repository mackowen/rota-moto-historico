# Resultados de teste — 0294

| Validação | Resultado | Escopo / limite |
|---|---|---|
| Chromium/CDP com autenticação backend-issued e MFA | PASS_SCOPE | Sessão sintética E2E; fixture encerrada com rollback. |
| Integrações iFood/99Food/Keeta | PASS_SCOPE_READ_ONLY | GET de estado; não acionou Conectar/Vincular, OAuth, APIs externas ou credenciais. |
| Equipe — perfil sintético | PASS_SCOPE | Criou perfil com somente `orders.read`; UI confirmou e relistou o perfil via API. Sem reload da criação. |
| Backup administrativo | BLOCKED_BY_CAPABILITY | GET `/api/admin/backup` retornou 404 e UI não mostrou formulário. Nenhum PUT executado. |
| Segurança local | PASS_SCOPE | Autosave IndexedDB de retenção/histórico e readback após reload. Navegação-away não comprovada. |
| Operação | PASS_SCOPE | Autosave local de três campos e readback após reload. Navegação-away não comprovada. |
| Navegação | PASS_SCOPE | Dez atalhos editáveis modificados e lidos após reload. Navegação-away não comprovada. |
| Origens | PASS_SCOPE | Nome local iFood alterado e lido após reload; nenhum marketplace conectado. Navegação-away não comprovada. |
| Responsividade Segurança local | PASS_SCOPE | 360/390/768, claro/escuro; largura do documento e body dentro do viewport. Screenshots anexados. |
| `npm test` Restaurante | PASS | Exit code 0; suíte completa, incluindo appearance, identity UI, marketplace admin e backup admin. |
| `npm test` Motoboy | NÃO EXECUTADO | Repositório Motoboy sem alteração nesta campanha. |
| Negativos HTTP, timeout, ACK perdido, resposta truncada, readback divergente, retry, clique duplo e reload durante escrita | NÃO EXECUTADOS | Permanecem cenários pendentes; não inferir PASS. |

As execuções E2E ocorreram somente em `rotamoto_e2e`. Os manifests usados registram `databaseCommitted=false`, `status=COMPLETED` e contagens tenant-scoped zero. Banco oficial não recebeu escrita.
