# Plano futuro para saneamento do E2E — não executado

Esta execução não limpou `rotamoto_e2e`. Qualquer limpeza fica para segunda fase e requer autorização específica do proprietário após revisão deste plano.

1. Fazer snapshot/backup criptografado e verificável fora do caminho de limpeza; registrar checksum e comprovar restauração em alvo descartável explicitamente autorizado.
2. Obter leitura administrativa read-only da identidade canônica da empresa, memberships, usuários, founder latch/grant, sessão, auditoria, tokens ativos e referências MFA/keystore. Não identificar Chico pelo rótulo somente.
3. Comparar chaves secretas referenciadas pelo banco com inventário/manifesto do keystore; não remover nenhum arquivo/segredo nem MFA ativo nesta fase.
4. Preparar SQL de limpeza baseado nas FKs reais e revisão DBA. Preservar schema, migration ledger/checksums, extensões, funções, triggers, constraints, índices, roles, grants, RLS/FORCE RLS, founder, latch, MFA, keystore, auditoria necessária e a identidade/empresa canônica que o proprietário autorizar manter.
5. Revisar como operações transacionais e com limites de contagem antes/depois; sem `DROP`, `TRUNCATE`, `CASCADE` ou delete amplo. Ensaiar no backup restaurado e abortar se alvos/contagens divergirem.
6. Aguardar confirmação explícita antes de aplicar qualquer delete no persistente. Após execução aprovada, verificar FKs, RLS, ledger, única empresa definida, sessão/keystore preservados e backup pós-operação.
7. Somente depois da aprovação de saneamento criar um procedimento separado para Browser QA first-install. Não resetar founder/latch como parte de limpeza rotineira. O fluxo deve seguir a política formal de reset/bootstrap E2E e deixar audit trail.

Estado: PENDING autorização e revisão técnica/DBA. Nenhum SQL destrutivo foi preparado para execução automática.
