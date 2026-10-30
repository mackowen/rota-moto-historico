# Correções e causa raiz

| ID técnico | Causa comprovada | Alteração | Validação |
|---|---|---|---|
| L1B-DB-ACL-01 | Instalação limpa: schema/grants de runtime ausentes causavam SQLSTATE 42501 e HTTP 500 durante bootstrap/autorização | Migrations aditivas 0062/0063 e guard de alvo descartável no runner | Bootstrap HTTP, migration status/checksum, RBAC/RLS e lifecycle passam no banco isolado |
| L1B-TEST-01 | Harness de disponibilidade assumia forma de DTO antiga; resposta válida fornece `records[]` | Fixture lifecycle usa contrato real do DTO, sem alterar contrato de produção | Teste direcionado e suites Restaurante/Motoboy |
| L1B-TEST-02 | Testes de instalação limpa se confundiam com E2E persistente contendo founder | Cenários vazios e persistentes separados; alvo descartável é explicitamente validado; testes transacionais preservam estado | Bootstrap vazio e founder existente passam sem remover founder |
| L1B-TEST-03 | Testes PostgreSQL dependiam de URL genérica/hardcode e podiam mirar alvo persistente | Resolução de alvo valida nome/loopback/role e restringe o modo descartável | Teste de guard, contratos e domínio/sync no DB descartável; URL inválida é rejeitada |
| L1B-BROWSER-01 | Check de reload aceitava documento antigo; dava falso estado de pronto | Harness aguarda timeOrigin/document complete/shell e valida sessão; a jornada inclui Home↔Rotas | Navegação autenticada reproduzível; item `LEGACY-0304-E2E-AUTH` fechado em escopo específico |
| L1B-CONFIG-01 | Critério de persistência precisava provar além de toast | Jornada usa resposta HTTP, readback canônico, reload e tentativa de revisão obsoleta | 200/readback/reload; conflito obsoleto 409, sem sucesso falso |

Não foi encontrada evidência de defeito de produção nos fluxos Motoboy cobertos; o Motoboy não recebeu alteração nesta parte. A única correção de produto/infra compartilhada foi no caminho de runtime/migrations; não houve mudança de frontend.
