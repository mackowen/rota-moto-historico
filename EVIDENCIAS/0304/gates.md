# Gates — campanha 0304 (checkpoint atual)

| Gate | Estado | Evidência/limite |
|---|---|---|
| G0 — Referências | PASS | Três referências abertas, medidas, identificadas e SHA-256 registrados. |
| G1 — Auditoria | PARTIAL | Contratos e serviços centrais inventariados; testes operacionais e conflitos não executados. |
| G2 — Design System | PARTIAL | Tokens/regras V2 reaproveitados; fidelidade visual comparativa Rotas pendente. |
| G3 — Celular | PARTIAL | Layout mapa-primeiro implementado; Browser autêntico pós-change bloqueado. |
| G4 — Tablet | PARTIAL | Grid dedicado 600–1023px; referência verificada, render final não comparado. |
| G5 — PC | PARTIAL | Lista/mapa/detalhe em painéis; render final não comparado. |
| G6 — Mapa/cartografia | PARTIAL | Leaflet e serviços existentes preservados; geocode tácito removido; falha/resize/tiles E2E pendentes. |
| G7 — Planejamento | PARTIAL | Plano sintético com sequência de 2 paradas criado/salvo/readback em Browser; edição, ACK servidor, regras de duplicidade sob concorrência e sincronização cross-app não testados. |
| G8 — Persistência | PASS (escopo local-first) | E2E autenticado criou planejamento com 2 paradas, salvou e confirmou seleção/readback no IndexedDB após reload. Confirmação remota/ack permanece fora deste gate e depende de G10. Evidência `auth-e2e-navigation-2026-10-24.json`. |
| G9 — Integração | PARTIAL | Contratos e responsabilidades preservados; jornada cross-app não executada. |
| G10 — Sync/concorrência | BLOCKED | Jornada autenticada local-first passou, mas não houve fluxo de sync/concorrência, ACK remoto, duas sessões ou sincronização Restaurante↔Motoboy. |
| G11 — Segurança/RBAC | PARTIAL | Validadores atuais preservados; tenant adversarial/RBAC de rotas não testados. |
| G12 — Offline/resiliência | PARTIAL | Não foi demonstrada confirmação remota falsa; falhas/reconexão ainda não testadas nesta UI. |
| G13 — E2E | PARTIAL | MFA real do usuário/tenant sintéticos, navegação repetida Início↔Rotas, Leaflet, filtro, criação/salvamento de plano e readback após reload passaram. Não cobre sync, conflito, RBAC/tenant adversarial, offline ou ack servidor. Causa do falso bloqueio: harness podia aceitar o documento antigo durante reload; teste corrigido exige `performance.timeOrigin` novo, `readyState=complete`, shell montado e sessão válida. Ver `auth-e2e-navigation-2026-10-24.json`; diagnóstico anterior preservado. |
| G14 — Fidelidade visual | FAIL | Reprovação expressa do proprietário. Ajustes técnicos e capturas fixture não alteram este estado; aprovação final pertence exclusivamente ao proprietário. |
| G15 — Sem regressões | PARTIAL | Testes direcionados de mapas/logística/contrato passaram; regression Browser Início/Pedidos/Motoboys autenticado bloqueado. |

## Checkpoint documental e E2E — 2026-10-24

Os estados acima são a classificação canônica vigente. Testes unitários e de contrato são evidência de domínio/integração; renderers isolados/CDP fixtures são evidência estrutural; nenhum deles é E2E autenticado operacional. No follow-up de 2026-10-24, MFA e sessão válida após reload foram confirmados; `auth-ready` e `app-ready` ocorreram, `#app`/`#main` permaneceram montados, sem `auth-revoked`. O bootstrap inicia em dashboard; o mapa não existe até a navegação de Rotas. A tentativa de navegação posterior ainda não montou o módulo e a causa não está comprovada. Nenhum patch de produção ou bypass foi feito. O diagnóstico anterior permanece preservado e o follow-up está vinculado em G13.

Os identificadores adicionais passam a ser **G16 Integridade dos repositórios**, **G17 Histórico e evidências**, **G18 Política de publicação**. A numeração suplementar antiga permanece documentada como nomenclatura histórica em `adendo-desktop/gates.md`: suplemento antigo G15→atual G16, antigo G16→atual G17, antigo G17→atual G18. G15 da matriz principal continua “Sem regressões”.

Não há PASS global. A tela de login e render isolado do renderer não são aceites como comparação final de aplicação.


## Continuação autenticada de navegação — 2026-10-24

A classificação G8/G13 acima foi atualizada com a evidência desta execução, sem apagar os relatórios históricos. O E2E completou MFA real em tenant sintético; cliques CDP navegaram Início→Rotas→Início→Rotas; Leaflet inicializou; filtro foi exercitado; um planejamento sintético de duas paradas foi salvo e confirmado localmente após reload. Fixture em `rotamoto_e2e`, rollback-only. A tela/medidas não constituem referência visual nem aprovam G14. G10 continua BLOCKED para sincronização/conflitos; G13 fica PARTIAL até os cenários operacionais restantes serem executados. O parágrafo legado abaixo descreve o estado anterior ao resultado e deve ser lido apenas como checkpoint histórico, não como classificação vigente.

Causa demonstrada para o bloqueio observado neste runner: o predicado de reload consultava prontidão do shell sem exigir identidade de documento nova; por isso podia avançar com o documento anterior durante o unload. Com a espera pelo `performance.timeOrigin` alterado, documento completo, shell montado e sessão validada, a navegação passou. Não foi observado defeito de autenticação/guard/roteamento nesta jornada; nenhuma proteção foi contornada. O Browser QA ganhou helper e testes de regressão locais, sem push. Ver [evidência sanitizada](auth-e2e-navigation-2026-10-24.json).
