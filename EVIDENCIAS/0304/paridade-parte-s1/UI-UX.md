# UI/UX e cobertura visual

## Evidência executada

- `npm test` do Restaurante: PASS integral, incluindo layouts Dashboard/Pedidos, navegação responsiva, analytics, mensagens financeiras, Map/Logística, aparência e SW.
- `npm test` do Motoboy: PASS integral, incluindo navegação desktop/mobile, dashboard/mapa, tela de ganhos, confirmação de entrega, preferências de navegação e Service Worker.
- Testes são automatizados de lógica/estrutura. Não equivalem a Browser QA autenticado nem a inspeção de todos os estados.
- No checkpoint, a sessão anônima de `/api/identity/session` respondeu 401. Não houve screenshots autenticados nesta rodada.

## Matriz mínima de auditoria por rota

| IDs | Viewports 320/390/768/1024/1440 | Claro/escuro | Scroll/interação autenticada | Estado |
|---|---|---|---|---|
| REST-01 a REST-10 | testes estruturais existentes cobrem subconjuntos; auditoria manual completa não executada | testes de token/contrato; browser não percorrido | sessão ausente | PARTIAL/BLOCKED |
| MOTO-01 a MOTO-06 | testes responsivos/layout cobrem subconjuntos | contrato de tema existente | sessão ausente; aparelho não testado | PARTIAL/BLOCKED |

Ficam pendentes screenshots comparativos e verificação tela por tela de overflow, hit targets, modal, foco, toast, vazio/erro/offline e volta sem perda de estado. Não afirmar que toda interface foi visualmente aprovada.
