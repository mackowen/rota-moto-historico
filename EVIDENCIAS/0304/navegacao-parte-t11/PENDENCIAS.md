# Pendências — Parte T.11

| ID | Estado | Evidência / próximo passo |
|---|---|---|
| T11-NAV-01 Sistema local fora de Mais | PASS técnico | `navigationModules()` exclui apenas destino `admin`; teste de navegação confirmou o contrato. |
| T11-NAV-02 Entrada por Configurações e retorno | PARTIAL | categoria e retorno via `data-settings-back` preservados; fluxo autenticado não disponível no CDP. Confirmar em 8083 após login do proprietário. |
| T11-HDR-01 Cabeçalho duplo Sistema local | PASS estático | helper `settingsPageChrome()` não acrescenta Ajustes quando o painel interno é dono do header. Browser autenticado pendente. |
| T11-HDR-02 Auditoria visual autenticada de todas as abas | BLOCKED | sessão autorizada indisponível no navegador temporário; login e MFA não foram contornados. |
| T11-LOCAL-01 Origem de usuários/perfis e indicadores | PASS por rastreamento de código | origem IndexedDB e contagem de sync revisada; dados reais não foram modificados. |
| T11-MOTO-01 impacto Motoboy | PASS estático + suíte | estrutura equivalente não possui Sistema local/Admin global; nenhuma alteração de código necessária. |
| T11-VIS-01 claro/escuro e responsividade de áreas protegidas | PARTIAL | smoke público nos seis tamanhos sem overflow; páginas autenticadas não observadas. |
| T11-CDP-01 estabilidade Chromium | PARTIAL | CDP concluiu medições, mas registrou avisos GPU e falha transitória na remoção automática do perfil temporário. Não tocou perfil Chrome pessoal. |

O relatório não altera nem fecha pendências históricas da Campanha 0304/0257. G14 continua FAIL até revisão e aprovação visual expressa do proprietário.
