# Campanha 0304 — Parte S: paridade e auditoria

Data: 2026-10-28. Repositórios de aplicativos trabalhados em branches locais `codex/campaign-0304-parity-s`. Baselines protegidas: Restaurante `v5.50-ui-mobile-fix5`; Motoboy `v39.6-ui-mobile-fix2`. Nenhuma tag foi alterada. Nenhum push de aplicativo foi realizado.

## Estado por gate

| Gate | Estado | Evidência / limite |
|---|---|---|
| Contrato compartilhado Restaurante ↔ Motoboy | PASS | Paridade semântica dos contratos e payloads de sync passou em `tests/test-cross-app-contract-parity.js` nos dois repositórios. O endpoint local de analytics foi movido do `CONTRACT.md` compartilhado para `docs/relatorios-analytics.md` no Restaurante. |
| Editor de permissões | PASS técnico | Catálogo completo exibido com estado concedida/não concedida/não delegável; controles não delegáveis ficam desabilitados e administração global permanece separada. `tests/test-identity-ui.js` passou nos dois apps. |
| Cache e atualização do Service Worker | PASS técnico | Manifesto local gerado por SHA-256 de conteúdo, aplicado a URLs locais e usado para derivar o nome do cache; instalação atômica existente foi preservada. `assets:check`, `test-pwa-cache-contract`, `test-service-worker-atomic-install` e contratos do shell passaram. |
| Suítes unitárias/integração dos aplicativos | PASS | `npm test` completo passou nos dois repositórios após atualizar testes que assumiam nomes de cache manuais antigos. |
| PostgreSQL E2E `rotamoto_e2e` | PARTIAL | Runner confirma ledger/checksums até 0061, sem migrations pendentes. Um teste PostgreSQL de identidade falha em fixture de “primeiro fundador” porque há fundador persistente já registrado; a função rejeitou corretamente um segundo bootstrap. A transação de teste foi revertida. Nenhum usuário foi apagado ou substituído. |
| PostgreSQL principal `rotamoto` | BLOCKED por gate | Ledger íntegro até 0055; 0056–0061 pendentes. O E2E não completou todos os testes PostgreSQL com o fundador persistente; portanto as migrations não foram aplicadas ao principal, respeitando a ordem/gate solicitado. Leitura de pré-validação encontrou zero administradores e zero linhas de auditoria incompatíveis com as novas constraints. |
| Browser QA público | PARTIAL | Chromium/CDP abriu ambos os aplicativos nos viewports 320, 390, 768, 1024 e 1440 px em tema claro; tema escuro foi capturado em 390 e 1440 px. Foram registrados screenshots e medições abaixo. |
| Browser QA autenticado/console Super ADM | BLOCKED | O navegador abriu sem sessão autorizada; as chamadas a `/api/identity/session` retornaram HTTP 401, que é esperado para sessão anônima. Não foram usados tokens/cookies extraídos. Não houve inspeção autenticada das telas privadas, formulários ou console global. |
| Teste físico Android e aprovação visual | PENDING | Chromium no Termux não substitui Chrome Android físico nem aprovação do proprietário. G14 continua FAIL. |
| Campanha/histórico | PASS de preservação | Nenhuma pendência anterior foi removida; backlog desde 0257 permanece. Campanha 0304 aberta; 0305 não iniciada. |

## Inventário funcional resumido

Ver [MATRIZ_FUNCIONAL.md](MATRIZ_FUNCIONAL.md). O inventário é uma auditoria estática dos módulos e contratos mais relevantes; não afirma inspeção autenticada de todos os estados de cada tela. As suítes passaram nos fluxos automatizados listados, mas não substituem QA autenticado nem teste em aparelho físico.

## Alterações nos aplicativos

### Restaurante

- `CONTRACT.md`: removidas apenas seis linhas de analytics específicas do Restaurante; documentação específica realocada para `docs/relatorios-analytics.md`.
- `tests/test-cross-app-contract-parity.js`: compara contrato semântico comum e documentos locais, sem exigir igualdade textual dos arquivos completos.
- `identity-ui.js`, `identity-ui.css`: mostra o catálogo inteiro de permissões, separa concedidas, não concedidas e não delegáveis, com status claro e escopo global fora do editor empresarial.
- `scripts/sync-asset-manifest.js`, configuração e `asset-manifest.js`: versionamento de assets por conteúdo e cache derivado.
- `sw.js`, `index.html`, `app.js`, runtime MapLibre e testes relacionados: usam e validam o manifesto central.
- Testes de cache antigos ajustados para verificar o manifesto em vez de strings `vNNN` codificadas manualmente.

### Motoboy

- Contrato semântico equivalente ao Restaurante.
- Mesmo gerador/configuração de manifesto de assets, integrados a `index.html` e `service-worker.js`.
- Testes do shell, OCR, mapas, ajuda e sincronização usam referências geradas em vez de versões manuais.

Nenhum arquivo de migration, dado financeiro, regra de negócio comercial ou credencial foi alterado. Nenhum commit local foi criado nesta rodada; alterações permanecem revisáveis nas branches próprias.

## Testes executados

- Restaurante: `npm test` — PASS (suite completa, incluindo API sintética, analytics/logística, RBAC/MFA/CSRF guards, backup contracts, sync e PWA); `npm run assets:check` — PASS; `test-cross-app-contract-parity.js` — PASS; `test-identity-ui.js` — PASS; `git diff --check` — PASS.
- Motoboy: `npm test` — PASS (suite completa, incluindo sync, QR, OCR, armazenamento local, workflow, PWA, UX responsivo); `npm run assets:check` — PASS; `test-cross-app-contract-parity.js` — PASS; `test-identity-ui.js` — PASS; `git diff --check` — PASS.
- PostgreSQL E2E: migration runner em modo status confirma 0001–0061 aplicadas e sem divergência de checksum. `tests/test-identity-http-postgres.js` — FAIL de fixture no cenário de bootstrap inicial: resposta 500 (código público sanitizado `INTERNAL_ERROR`) em vez de 202, devido à trava de fundador já reclamada. A leitura sem escrita confirmou um administrador global e latch reclamado. O teste encerrou revertendo a transação; os dados persistentes não foram modificados.
- PostgreSQL principal: migration runner em modo status confirma 0001–0055 aplicadas e 0056–0061 pendentes. Apenas leitura de estado; nenhuma migration executada.

## Browser QA e screenshots

Artefatos em [`browser-qa/`](browser-qa/). Capturas mostram somente a tela pública de entrada. Sem exceções JavaScript reportadas. Os 401 de consulta de sessão anônima são esperados, mas incluídos no sumário como resposta de rede para distinguir do QA autenticado.

Na primeira passagem, o emulador reportou `innerWidth` 321/391 em Motoboy para viewport configurado 320/390. Uma repetição isolada em 320 px mediu `innerWidth/clientWidth/scrollWidth = 320/320/320`; não houve alteração CSS porque a medição de 1 px não foi reproduzida de forma consistente. 390 px precisa ser repetido em ambiente estável/autenticado. Isso fica PARTIAL, sem declarar ausência global de overflow.

O processo Chromium/CDP encerrou com erro do runtime gráfico Termux após a captura. Não foi alterado código para contornar falha de infraestrutura.

## PostgreSQL e decisão de migrations

`rotamoto_e2e` já está em 0061; `rotamoto` está em 0055. O teste PostgreSQL de bootstrap tenta testar instalação vazia, mas o E2E atual mantém o fundador já registrado. A trava recusou a tentativa; resetar latch, remover fundador, criar outro banco ou testar como usuário privilegiado alternativo violaria o critério de preservação. O teste não é considerado PASS e as migrations não foram avançadas no principal.

Uma execução futura deve tornar os testes de bootstrap compatíveis com o founder latch persistente sem apagar/alterar a conta, ou usar uma infraestrutura descartável explicitamente autorizada, e então repetir o gate PostgreSQL antes de aplicar 0056–0061 ao principal.

## Pendências e retomada

1. Corrigir/adaptar a fixture PostgreSQL de bootstrap para preservar e respeitar fundador persistente no `rotamoto_e2e`; manter teste de instalação vazia separado sem resetar a conta real.
2. Reexecutar os testes PostgreSQL E2E de identidade, administração global, permissões financeiras, MFA/CSRF/RLS e integração.
3. Só após PASS nesses gates, aplicar pelo runner oficial ao `rotamoto` as migrations aditivas 0056–0061 e comparar checksums/status.
4. Repetir Browser QA autenticado (perfis autorizados, configurações e console Super ADM), claro/escuro nos cinco viewports e percorrer fluxos operacionais; obter validação física Android e aprovação do proprietário.
5. Continuar backlog histórico desde 0257; manter G14 FAIL, Campanha 0304 aberta e 0305 não iniciada.

## Commits

Commits locais: Restaurante `bc818cc` e Motoboy `16f0009`. Nenhum push de aplicativo. Repositório histórico será atualizado em commit separado e publicado somente por fast-forward seguro.
