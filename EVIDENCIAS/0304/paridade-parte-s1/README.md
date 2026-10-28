# Parte S.1 — retomada e gates

Data de execução: 2026-10-28. Os aplicativos foram mantidos em suas branches próprias; não houve push dos aplicativos. O checkpoint anterior a qualquer edição está em `CHECKPOINT-INICIAL.md`.

## Resultado desta rodada

- **DB-01: PARTIAL.** O teste HTTP de bootstrap foi corrigido para não limpar o latch: no E2E persistente, a tentativa de segundo bootstrap é negada e o estado do fundador/grant/latch é comparado antes/depois. Testes de identidade, MFA/CSRF, RLS, logística e sync passaram. Os caminhos de primeiro bootstrap em instalação vazia e de operação positiva Super ADM com MFA não são simulados no E2E persistente.
- **DB-02: BLOCKED por dependência do gate.** Não aplicar 0056–0061 ao principal enquanto DB-01 não for PASS. `rotamoto_e2e` está em 0061 e `rotamoto` em 0055; nenhuma migration foi aplicada nesta rodada.
- **CFG-01: PARTIAL.** Inventário estático das categorias e dos contratos de persistência registrado. Suítes de configuração e permissões passaram; não houve validação autenticada de edição/readback em browser nem comparação exaustiva de cada grant delegável em contexto de operador.
- **UI-01: PARTIAL.** Inventário de rotas/telas e testes responsivos existentes registrados. Browser autenticado não disponível (endpoint de sessão respondeu 401); nenhuma inspeção estática foi declarada como aprovação visual. Matriz física completa ainda pendente.
- **INT-01: PARTIAL.** Domínio, sync, cancelamento/devolução, idempotência, RLS e isolamento executados no E2E; não foram executados todos os cenários cross-app enumerados nem reflexo em duas sessões autenticadas reais.
- **PWA-01: PARTIAL.** Mudança temporária de `app.js` em cópias isoladas dos dois repositórios mudou o `cacheName`; `assets:check` detectou o manifesto desatualizado e passou após regeneração. Testes do SW cobrem cache online/offline, URL exata e preservação da versão antiga na falha de instalação. Não houve browser real offline/upgrade autenticado.
- **G14: FAIL**, aguardando aprovação visual expressa.
- Campanha 0304 aberta; 0305 não iniciada.

## Correções desta rodada

1. **BOOT-TEST-01 — Restaurante**: remover do teste o `UPDATE installation_bootstrap SET completed_at=NULL`; separar instalação vazia de instalação com fundador persistente e conferir estado antes/depois. Teste: `test-identity-http-postgres.js`, PASS.
2. **BOOT-TEST-02 — Restaurante**: os testes integrados de founder e console detectam o fundador persistente e não limpam latch nem simulam concessão global. Negativas sem sessão são verificadas; operações positivas ficam explicitamente PARTIAL. `npm run test:e2e-platform-admin` executou as três rotinas; saídas PARTIAL esperadas, exit code 0.
3. **RLS-TEST-01 — Restaurante**: atualizar contagem estrutural obsoleta de 54 para 55 tabelas / 40 relações FORCE RLS / 43 policies, incluindo assert específico para `financial_events`; acrescentado modo schema-only read-only para evitar inserir fixtures persistentes. Teste schema-only: PASS.

Detalhes e comandos: `POSTGRESQL.md`, `TESTES.md`. Inventários: `INVENTARIO.md`, `CONFIGURACOES.md`, `RBAC.md`, `UI-UX.md`, `INTEGRACAO.md`, `PWA.md`. Pendências herdadas intactas: `PENDENCIAS.md` e backlog autoritativo do histórico.
