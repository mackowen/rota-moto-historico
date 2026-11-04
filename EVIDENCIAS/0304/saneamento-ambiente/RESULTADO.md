# Campanha 0304 — saneamento e desbloqueio E2E/API

**Resultado: PARTIAL.** Os dois bancos estão alinhados em 0064; o E2E contém apenas Chico Restaurante, a API atual está ativa e o defeito que recusava toda atualização de cobrança foi corrigido. O fluxo Empresa foi comprovado no navegador autenticado. Operação salvou pela UI e foi lida de volta pelo servidor; a continuação do Browser QA travou após a captura da tela, portanto a confirmação de reload pela própria UI permanece parcial.

## Estado final

| Alvo | Estado comprovado |
|---|---|
| `rotamoto` | Migration 0064; zero empresas e zero `domain_records`. Nenhuma alteração de dados nesta execução. |
| `rotamoto_e2e` | Migration 0064, 64/64 checksums iguais ao oficial, exatamente Chico Restaurante (`01a14b34-2f79-7b57-a29d-9535574e3806`), zero `domain_records`, `sync_inbox` e `sync_outbox`. Preservados founder, latch, grants, vínculo essencial e auditoria. |
| Schemas de fixtures | Removidos em uma transação os três schemas históricos `campaign0160_*`/`campaign0304_*`, após confirmar padrão e ownership `rotamoto_migrator`; snapshot estrutural do schema `rotamoto` (objetos, políticas, triggers, funções, constraints, índices e ACLs) permaneceu idêntico. Nenhum schema de banco foi reinicializado. |
| Recuperação | Dump E2E final em `~/rotamoto-data/maintenance/saneamento-0304-20261031/rotamoto-e2e-final-20261031.dump`, validado por `pg_restore --list`, modo 0600, 468.976 bytes, SHA-256 `63c8b36f0fc6c1a70ac5af2a7b7301d53f7676bc5906446a0f06b0c2cdf9ab6e`. Backups anteriores permanecem intactos. Restore integral não foi executado, pois exigiria criar outro banco. |
| PostgreSQL/RLS | Administrador local autorizado identificado; papel de backup recebeu leitura/CONNECT necessários. Papéis de aplicação continuam sem SUPERUSER/BYPASSRLS; FORCE RLS ativo nas tabelas tenant verificadas. |
| API e publicação | API E2E reiniciada controladamente após a correção, PID 11277; health 200 e conexão do processo aponta a `rotamoto_e2e`. Empresa/Operação retornam 401 sem sessão. Restaurante 8083 e Motoboy 8084 retornam 200. SHA-256 servido em 8083 corresponde ao checkout: `app.js` `d08ab60adad9c5245818ae1feb23c84c755c7291949abf8bceebd7d75a919eb6`; `company-settings-persistence.js` `c5df26162ac52352c57e443dd33fd6d92997cf4972c39560416e148bd9e32764`. |
| Limpeza de arquivos | Removidos os três harnesses temporários desta execução (28.624 B), dois logs temporários antigos duplicados de testes (1.204 B) e o perfil Chromium descartável; builds/cache conhecidos não existiam. Evidências e perfis QA históricos foram preservados. Espaço físico recuperado não foi medido; os dumps comprimidos caíram de 1.968.527 para 468.976 bytes após a remoção dos schemas, diferença de 1.499.551 bytes no artefato comprimido, não uma medida de espaço físico. |

## Causa e correção funcional

O `INSERT ... SELECT` de `updateCompanyDeliveryPricing` só emitia uma linha quando `expectedVersion=0`. Com uma linha canônica já criada, revisões válidas (`>0`) eram rejeitadas como conflito, mesmo quando correspondiam à versão atual. A seleção agora admite versão zero para criação ou uma linha visível com a revisão esperada para atualização; a condição de conflito continua protegendo a revisão no `ON CONFLICT`. Nenhum valor local foi promovido automaticamente.

Teste PostgreSQL transacional sob `rotamoto_app` e tenant RLS comprovou atualização da revisão atual, readback, rejeição da revisão obsoleta sem sobrescrita e rollback. Na UI autenticada em Chromium, login/MFA passou; Empresa salvou, leu de volta, persistiu no reload, rejeitou revisão obsoleta (409) e restaurou os valores originais. Operação inicialmente reproduziu 409; após a correção, o salvamento da tela recebeu ACK e a aplicação completou seu readback interno. A sessão E2E autenticada confirmou a restauração do valor de teste (PUT/GET 200, logout 204), revisão final 3 e valor canônico original 2,37. O harness Chromium travou durante o pós-salvamento/reload, então esse reload visual não é declarado PASS.

Capturas autenticadas, perfil descartável, dados sintéticos e contato/localização redigidos:

- [Empresa — 390×844](empresa-e2e-autenticada-390x844.png)
- [Operação — 390×844](operacao-e2e-autenticada-390x844.png)
- [Resumo Browser QA sanitizado](BROWSER-QA.json)

## Verificações

PASS: migrations 0062–0064 pelo runner oficial no E2E; checksums idênticos; limpeza e verificação de integridade; login/MFA real da identidade sintética; persistência/readback de Empresa; atualização/readback/conflict/rollback de Operação via PostgreSQL sob RLS; restauração de configuração via API autenticada; contrato compartilhado; `npm test` Restaurante e Motoboy (pretest `assets:check` incluído); readiness e hash HTTP; `git diff --check`.

PARTIAL: reload pós-salvamento de Operação na UI não terminou devido a travamento do CDP após a captura; QA visual foi limitado a 390×844 claro e não é validação Android física. Uma tentativa autenticada anterior reproduziu o conflito, depois corrigido.

## Commits e campanha

- Restaurante: `ac47f26` (política operacional); `8479c7a` (`fix: allow versioned company pricing updates`, correção e teste PostgreSQL transacional).
- Motoboy: `f26ae3e` (política operacional); nenhum código funcional foi necessário.
- Histórico: `6ea1414` (`docs: record 0304 e2e unblock and pricing fix`), aguardando push fast-forward e confirmação remota.

G14 permanece **FAIL** até aprovação visual expressa do proprietário. Campanha 0304 permanece aberta; 0305 não iniciada.
