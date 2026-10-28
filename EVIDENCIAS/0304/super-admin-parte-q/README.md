# Parte Q — Super ADM global e bootstrap

Data: 2026-10-28. Branch do Restaurante: `codex/campaign-0304-super-admin-q`. Baseline `v5.50-ui-mobile-fix5` preservada. Sem push de aplicativo.

## Gates

| Requisito | Estado | Evidência / limite |
|---|---|---|
| Bootstrap autorizado atribui Super ADM ao primeiro owner na mesma transação | PASS | `test-integrated-founder-bootstrap-service-postgres.js`: caminho real de serviço com autorização consumida, grant no provisionamento e rollback externo de teste. |
| Repetição idempotente e segundo owner sem privilégio global | PASS | Testes PostgreSQL sintético de função e serviço; transações revertidas. |
| Concorrência do primeiro bootstrap | PARTIAL | Latches de instalação e fundador são bloqueados com `FOR UPDATE`; não houve teste de corrida entre dois primeiros bootstraps, pois o E2E existente possui latch legacy e não se criou/reinicializou banco. |
| Administração global empresarial, perfis e grants financeiros | PASS | Teste PostgreSQL cobre escopo de empresa, proteção do owner, `finance.read`, dependência `finance.manage`, razão auditada e resumo financeiro agregado/limitado por período. |
| MFA, CSRF/origin e endpoints HTTP | PASS | `test-platform-admin-http.js`; mutations preservam as guardas existentes. |
| Configuração segura, sem exposição/edição de secrets | PASS | E2E consulta configuração sanitizada; nenhuma credencial implantada retornada. |
| Fundador existente/legacy reconhecido sem suposição | BLOCKED | Prova inequívoca de identidade histórica não está disponível no latch legado de digest zero. Regularização falha fechada; nenhum privilégio oficial foi modificado. |
| Browser autenticado, status para conta sem privilégio global | PASS restrito | Chromium/CDP, 390×844: sessão autenticada; mensagem de status não global; Configurações abriu; sem overflow horizontal e sem exceções JavaScript; logout acionado. Relatório sanitizado abaixo. |
| Browser do console Super ADM | PARTIAL | Conta autenticada de teste não é Super ADM, logo console global não foi acessado nem validado no Browser. |
| UI em múltiplos viewports/temas e aprovação do proprietário | PENDING | Esta execução cobriu um viewport móvel e uma sessão/estado; G14 permanece FAIL até revisão expressa. |
| PostgreSQL oficial `rotamoto` | PASS preservação | Nenhuma conexão ou escrita foi feita nesta Parte Q; migrations oficiais não reaplicadas; estado previamente registrado em 0055 preservado. |
| `rotamoto_e2e` | PASS escopo | Somente migrations 0056–0061 pelo runner E2E e testes sintéticos transacionais. Não foi criado outro banco. |

## Mudanças

- Migrations aditivas 0056–0058 integram bootstrap empresarial/fundador e restringem regularização a registro original verificável.
- Migration 0059 adiciona ações globais auditadas por empresa para papéis/permissões, resumo financeiro agregado e configurações seguras; migrations 0060–0061 endurecem a exigência de razão de auditoria.
- Serviço de identidade executa a concessão global no mesmo fluxo/transaction do primeiro owner.
- UI separa claramente Super ADM Global de owner empresarial. Gestão global permanece escopada à empresa selecionada; `owner` protegido contra edição pelo editor genérico.

## Comandos executados

- `NODE_ENV=test E2E_MIGRATOR_DATABASE_URL=postgresql://rotamoto_migrator@127.0.0.1:5432/rotamoto_e2e node backend/postgres/migrate.js up --e2e` — `schema atualizado`.
- `npm run test:e2e-platform-admin` — PASS: PostgreSQL platform-admin, função integrada de bootstrap e serviço integrado de bootstrap.
- `node --check` nos JS alterados — PASS.
- `node tests/test-platform-admin-http.js` — PASS.
- `node tests/test-identity-ui.js` — PASS.
- `node tests/test-postgres-migration-targets.js` — PASS.
- `node tests/test-backup-inventory.js` — PASS.
- `git diff --check` — sem whitespace inválido, exceto linha vazia final reportada em migrations 0060 e 0061. Elas já foram aplicadas ao E2E; foram preservadas byte a byte para manter os checksums do ledger.
- `npm test` — interrompido em `tests/test-dashboard-v2.js:126`: expectativa antiga de cache `v144`, enquanto `service-worker.js` declara `v147`. O service worker/teste de dashboard não foram alterados nesta Parte Q; falha registrada como regressão fora do escopo, sem ajustar a versão de cache aqui.

Avisos de depreciação `pgpass` e uso de query concorrente foram emitidos pelas dependências durante E2E, sem falha nos casos. Nenhum erro JS ou resposta API inesperada apareceu no Browser report.

## Browser QA sanitizado

```json
{
  "authenticated": true,
  "viewport": "390x844",
  "platformAdmin": false,
  "nonGlobalStatusShown": true,
  "settingsRouteOpened": true,
  "horizontalOverflow": false,
  "logoutAttempted": true,
  "apiFailureStatuses": [],
  "javascriptExceptionCount": 0
}
```

Nenhum email, token, senha, código MFA, UUID de conta/empresa ou dado financeiro foi incluído. Não há captura do console global porque esta identidade não tem privilégio global.

## Requisitos restantes

1. Obter prova administrativa original da identidade fundadora legacy ou decisão administrativa expressa apropriada; não escolher owner por antiguidade presumida e não aplicar grants até haver prova/autorização específica.
2. Repetir Browser QA autenticado como Super ADM e testar console global em viewports/temas requeridos, quando houver uma identidade E2E global válida e autorizada.
3. Testar corrida simultânea do primeiro bootstrap em instalação E2E limpa e descartável, sem criar banco novo fora de autorização.
4. Proprietário ainda deve aprovar visualmente; G14 permanece FAIL.

Campanha 0304 permanece aberta/PARTIAL; backlog desde 0257 preservado; 0305 não iniciada.
