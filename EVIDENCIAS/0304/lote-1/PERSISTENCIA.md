# Persistência — Lote 1

## Comprovado

- Testes existentes de empresa validam `company.manage`, revisão otimista, escrita, readback canônico, conflito 409, readback divergente/falha e preservação de rascunho. `npm test` Restaurante passou integralmente na execução inicial.
- `test-domain-sync-postgres.js` realizou operações reais de API/PostgreSQL no E2E com versão/readback e limpeza verificada (`databaseCommitted=false`, resíduos de company/domain_records/membership/outbox = 0).
- `test-identity-postgres.js`, `test-identity-http-postgres.js` e `test:e2e-lifecycle` cobriram writes sintéticos sob transação/savepoint e rollback.
- Os fluxos locais do Motoboy (IndexedDB, outbox, restauração e atualização) têm cobertura na suíte completa, que passou.

## Não comprovado integralmente

- Browser autenticado na aplicação publicada para cada campo de Configurações, com reload/logout/login e readback de todas as categorias.
- Nova sessão legítima do fundador; E2E não tinha sessões válidas e seu estado não foi alterado.
- Persistência completa das preferências de Motoboy através de dispositivo/sessão nova.
- Todos os formulários de Configurações, Integrações e Backup no ambiente live.

Sem alteração de produto ou de dados reais foi realizada nesta fase; não se declarou persistência globalmente concluída.
