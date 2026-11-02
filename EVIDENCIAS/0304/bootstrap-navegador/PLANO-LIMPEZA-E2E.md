# Plano de reset integral do E2E — não executar nesta fase

## Objetivo autorizado para a fase futura

Deixar `rotamoto_e2e` com schema e infraestrutura de banco preservados, porém sem dados de aplicação: nenhuma empresa, usuário/identidade, membership, founder latch/grant, MFA vinculado, sessão/token, pedido, entrega, rota, configuração de tenant, convite ou estado de Bootstrap. Este plano não autoriza executar o reset.

## Gates antes de qualquer escrita

1. Identificar inequivocamente `rotamoto_e2e` (host, database, papel e cluster) e confirmar que o alvo não é `rotamoto`.
2. Obter um papel DBA já autorizado; não elevar o papel runtime nem desativar RLS/FORCE RLS.
3. Produzir dump completo criptografado em armazenamento privado fora dos caminhos de limpeza, registrar tamanho e SHA-256, validar `pg_restore --list` e restaurar em alvo descartável já autorizado para comprovar recuperação. Nenhum backup/chave existente pode ser sobrescrito.
4. Exportar e revisar fora do banco a evidência de auditoria necessária (com segredo e PII minimizados), preservar checksums e restringir permissões.
5. Gerar inventário de linhas por tabela de aplicação, FKs, triggers, políticas RLS, objetos estruturais e referências do keystore. Comparar contagens e limites com o alvo confirmado.
6. Ensaiar o plano exato no restore validado, com checagem de FKs, RLS e schema antes/depois. Revisão DBA e confirmação explícita do proprietário são gates obrigatórios.

## Reset futuro

- Preferir procedimento transacional por tabelas de aplicação, em ordem topológica de FKs e com proteção explícita contra schemas/tabelas estruturais. Não usar `DROP DATABASE`, `DROP SCHEMA`, `TRUNCATE ... CASCADE` nem desabilitar RLS.
- Limpar registros de aplicação incluindo `users`, convites, memberships, grants, sessões, fatores MFA, founder latch, auditoria operacional conforme política aprovada, configurações empresariais e dados de domínio. Preservar o ledger/checksums das migrations.
- Limpar arquivos/chaves MFA somente após mapear cada referência removida e provar que pertence exclusivamente ao E2E; nenhum caminho compartilhado ou referência desconhecida é elegível. Fazer limpeza coordenada e reversível com backup do keystore.
- Recriar o estado de instalação genuinamente não inicializada apenas pelo mecanismo oficial, com autorização de uso único. Não deixar identidade, latch, grant ou segredo de uma instalação anterior.
- Validar zero linhas de aplicação, nenhum órfão, schema/migrations idênticos, extensões, roles, grants, índices, constraints, funções, triggers, RLS e FORCE RLS preservados; endpoint de status deve retornar estado de primeira instalação somente após estes checks.
- Manter o dump e o procedimento de recuperação até aprovação dos testes e decisão de retenção.

## Recuperação/aborto

Abortar sem escrita se host, banco, contagens, checksums, permissões ou referências MFA divergirem. Em falha transacional, rollback e verificar contagens; em falha após commit ou keystore, interromper serviços de escrita, restaurar o dump/keystore verificado pelo procedimento testado e reconciliar sem tocar no banco oficial.

## Estado nesta execução

PENDING. Reset não executado. O banco E2E permanece intacto. A execução atual não conseguiu comprovar acesso de backup/DBA via `psql -X -w` (falhou por ausência de senha fornecida ao cliente); não tentou contornar nem alterou papéis. Obter a credencial/papel administrativo já provisionado e executar os gates de backup/restore antes de qualquer reset ou migration persistente.
