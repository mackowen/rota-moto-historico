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
| G8 — Persistência | BLOCKED | Follow-up 2026-10-24 montou `#main`, mas a navegação autenticada pós-reload não alcançou Rotas; salvar/readback/reabrir rota não comprovado. |
| G9 — Integração | PARTIAL | Contratos e responsabilidades preservados; jornada cross-app não executada. |
| G10 — Sync/concorrência | BLOCKED | Follow-up confirmou sessão e shell após reload, mas nenhum fluxo operacional de sync/concorrência foi alcançado. |
| G11 — Segurança/RBAC | PARTIAL | Validadores atuais preservados; tenant adversarial/RBAC de rotas não testados. |
| G12 — Offline/resiliência | PARTIAL | Não foi demonstrada confirmação remota falsa; falhas/reconexão ainda não testadas nesta UI. |
| G13 — E2E | BLOCKED | Follow-up CDP completou MFA, recebeu 200 de sessão após reload, observou `auth-ready`/`app-ready`, `#app` visível e `#main` montado. A reprodução histórica do shell desaparecido não ocorreu. O bootstrap volta a dashboard; tentativa de navegar a Rotas falhou antes de montar mapa, sem plano/salvamento. Causa permanece não comprovada. Ver `auth-e2e-followup-2026-10-24.json` e preservar o diagnóstico anterior. |
| G14 — Fidelidade visual | FAIL | Reprovação expressa do proprietário. Ajustes técnicos e capturas fixture não alteram este estado; aprovação final pertence exclusivamente ao proprietário. |
| G15 — Sem regressões | PARTIAL | Testes direcionados de mapas/logística/contrato passaram; regression Browser Início/Pedidos/Motoboys autenticado bloqueado. |

## Checkpoint documental e E2E — 2026-10-24

Os estados acima são a classificação canônica vigente. Testes unitários e de contrato são evidência de domínio/integração; renderers isolados/CDP fixtures são evidência estrutural; nenhum deles é E2E autenticado operacional. No follow-up de 2026-10-24, MFA e sessão válida após reload foram confirmados; `auth-ready` e `app-ready` ocorreram, `#app`/`#main` permaneceram montados, sem `auth-revoked`. O bootstrap inicia em dashboard; o mapa não existe até a navegação de Rotas. A tentativa de navegação posterior ainda não montou o módulo e a causa não está comprovada. Nenhum patch de produção ou bypass foi feito. O diagnóstico anterior permanece preservado e o follow-up está vinculado em G13.

Os identificadores adicionais passam a ser **G16 Integridade dos repositórios**, **G17 Histórico e evidências**, **G18 Política de publicação**. A numeração suplementar antiga permanece documentada como nomenclatura histórica em `adendo-desktop/gates.md`: suplemento antigo G15→atual G16, antigo G16→atual G17, antigo G17→atual G18. G15 da matriz principal continua “Sem regressões”.

Não há PASS global. A tela de login e render isolado do renderer não são aceites como comparação final de aplicação.
