# Lote 1 — Parte C

**Estado geral: PARTIAL.** Foi corrigida uma perda silenciosa de autosave de aparência no Motoboy quando outra gravação de Configurações ocupa a fila. Isso fecha um defeito reproduzível, mas não encerra o critério amplo de persistência nem qualquer ID canônico P0, cujo aceite exige cobertura de todos os campos e demais fluxos.

## Escopo executado

- Motoboy: serialização/retomada de gravações gerais e de aparência, teste de regressão e manifesto de assets.
- Restaurante: nenhuma alteração de produção nesta parte. A persistência de Company Profile e a jornada autenticada de escopo limitado foram comprovadas na Parte B; essa evidência foi reaproveitada, não repetida como se cobrisse todos os campos.
- Bancos: um write sintético de Company Profile ocorreu dentro do fixture transacional descartável e foi revertido no cleanup; nenhuma escrita persistente ou migration. O descartável `rotamoto_e2e_lote1b_20261030_3e9a4c12` continua em 0063; `rotamoto` e `rotamoto_e2e` não foram alterados.

## Resultado

- Correção funcional de produto: 1 subdefeito de fila de gravação.
- Testes completos: `npm test` passou nos dois aplicativos; `assets:check` passou nos dois; `git diff --check` passou nos repositórios alterados.
- E2E Motoboy: HTTP 200 em `127.0.0.1:8084/`; `index.html` e `app.js` servidos têm SHA-256 igual ao checkout (`index.html` `c7f1065c…`; `app.js` `ee80204c…`). Não houve reinício de serviço.
- Browser QA autenticado nesta parte: PARTIAL. Restaurante Company Profile passou por ACK, readback, 409 obsoleto e reload. Motoboy login/MFA e sessão/reload passaram, mas a navegação subsequente para Ajustes não ativou a tela e impediu o round-trip da preferência.
- Nenhum item P0 canônico foi fechado: permanece 51 aberto dos 52 iniciais. O defeito específico de concorrência foi corrigido dentro do item de configurações, que permanece PARTIAL até cobrir o critério integral.

Consulte `MATRIZ-CAMPOS.md`, `CORRECOES.md`, `TESTES.md`, `POSTGRESQL.md` e `PENDENCIAS.md`.

## Gates da execução

| Gate | Estado | Evidência/limite |
|---|---|---|
| G1 — repositórios | PASS | Checkpoints limpos após commits; nenhuma alteração no Restaurante |
| G2 — persistência | PARTIAL | Company Profile Restaurante teve ACK/readback/reload de um campo; autosave Motoboy teve teste de fila, mas seu round-trip visual autenticado ficou bloqueado |
| G3 — identidade/sessão | PARTIAL | Login/MFA e sessão/reload no fixture passaram; ciclo integral não repetido |
| G4 — MFA/segurança | PARTIAL | Suite e guardas passaram; não foi homologado cada fluxo sensível da Parte C |
| G5 — RBAC/tenant | PARTIAL | Suítes/contratos passaram; CRUD completo não executado nesta parte |
| G6 — concorrência | PARTIAL | Corrida de fila local e falha/retry passaram; concorrência PostgreSQL ampla não executada |
| G7 — integração bilateral | PARTIAL | Contratos passaram; nenhum round-trip novo Restaurante↔Motoboy nesta parte |
| G8 — PostgreSQL/migrations | PARTIAL | Nenhuma escrita; 0062/0063 seguem só no descartável, persistentes preservados |
| G9 — Browser QA autenticado | PARTIAL | Login/MFA e sessão restaurada passaram; navegação para Ajustes bloqueada no harness |
| G10 — regressão | PASS | `npm test` e assets passaram em ambos |
| G11 — rastreabilidade | PASS | Evidências, matriz e registros atualizados |
| G12 — integridade dos dados | PASS | Sem escrita em bancos; fixture transacional com cleanup |

Capturas sintéticas autenticadas disponíveis em [`browser/`](browser/); não representam dados reais nem Chrome Android físico.
