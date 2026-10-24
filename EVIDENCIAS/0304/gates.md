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
| G7 — Planejamento | PARTIAL | UI reutiliza regras/persistência existentes; sequência e save Browser não testados. |
| G8 — Persistência | BLOCKED | Sessão E2E sintética respondeu 200 após reload, mas o shell perdeu `#main` e não foi possível salvar/reabrir rota; persistência operacional não comprovada. |
| G9 — Integração | PARTIAL | Contratos e responsabilidades preservados; jornada cross-app não executada. |
| G10 — Sync/concorrência | BLOCKED | Sessão sintética válida, mas o shell deixou de hidratar após reload; sync/concorrência não foram exercitados. |
| G11 — Segurança/RBAC | PARTIAL | Validadores atuais preservados; tenant adversarial/RBAC de rotas não testados. |
| G12 — Offline/resiliência | PARTIAL | Não foi demonstrada confirmação remota falsa; falhas/reconexão ainda não testadas nesta UI. |
| G13 — E2E | BLOCKED | Reprodução CDP autenticou tenant sintético e recebeu HTTP 200 em `/identity/session` após reload, mas o shell ficou sem `#main`/`#routeMap`; fluxo operacional não prosseguiu. Não contorna MFA. Ver `auth-e2e-diagnostic-2026-10-24.json`. |
| G14 — Fidelidade visual | FAIL | Reprovação expressa do proprietário. Ajustes técnicos e capturas fixture não alteram este estado; aprovação final pertence exclusivamente ao proprietário. |
| G15 — Sem regressões | PARTIAL | Testes direcionados de mapas/logística/contrato passaram; regression Browser Início/Pedidos/Motoboys autenticado bloqueado. |

## Checkpoint documental e E2E — 2026-10-24

Os estados acima são a classificação canônica vigente. Testes unitários e de contrato são evidência de domínio/integração; renderers isolados/CDP fixtures são evidência estrutural; nenhum deles é E2E autenticado operacional. O E2E deste checkpoint concluiu MFA real do usuário sintético, sessão e cookie válidos após reload (valores secretos não foram registrados), e rollback confirmado no banco E2E; mesmo sem seed local, o shell não permaneceu hidratado. A causa específica na inicialização ainda não foi comprovada; não houve alteração de autenticação. Ver o relatório sanitizado vinculado na linha G13.

Os identificadores adicionais passam a ser **G16 Integridade dos repositórios**, **G17 Histórico e evidências**, **G18 Política de publicação**. A numeração suplementar antiga permanece documentada como nomenclatura histórica em `adendo-desktop/gates.md`: suplemento antigo G15→atual G16, antigo G16→atual G17, antigo G17→atual G18. G15 da matriz principal continua “Sem regressões”.

Não há PASS global. A tela de login e render isolado do renderer não são aceites como comparação final de aplicação.
