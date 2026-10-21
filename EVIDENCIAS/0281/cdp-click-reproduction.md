# Reprodução sanitizada — clique CDP e PUT de endereço

- Fixture autenticada: Company sintética `01a16055-9bca-7e9a-9eaf-9a356d461a6a` em `rotamoto_e2e`; sessão autenticada emitida pelo serviço E2E após MFA.
- No runner 0280, a função de interação enviava `mousePressed` e `mouseReleased` sem `clickCount`. Um listener de captura registrou nenhum evento `click`; a inspeção de rede não mostrou `PUT /api/admin/company/location`.
- Com `mouseMoved` e `clickCount: 1`, o clique foi recebido. A chamada ao handler real produziu `PUT /api/admin/company/location`, HTTP 200 e GET canônico HTTP 200. A interação DOM `.click()` também acionou o mesmo handler e o toast confirmou endereço sincronizado.
- O primeiro PUT salvou `Rua Sintética 120, São Paulo - SP` com `latitude=null` e `longitude=null`. O GET confirmou ambos nulos; não houve geocodificação.
- Depois, uma alteração para `Rua Sintética 240, São Paulo - SP` invalidou o par anterior; o GET intermediário mostrou latitude/longitude nulas. Um clique manual no mapa publicou coordenadas com `provenance=operator_confirmed`; GET/readback retornou endereço, coordenadas e revisão coerentes.
- O sync pull autenticado retornou Company com `authority=restaurant`; o Browser Motoboy recebeu o snapshot e o IndexedDB `RotaMotoDB.meta/settings` manteve endereço e coordenadas também após reload.

Não se incluiu cookie, senha, TOTP, CSRF, e-mail ou token na evidência. Capturas visuais e a tela renderizada de Ajustes Motoboy não foram comprovadas; ver os limites em `browser-authenticated-e2e.json`.
