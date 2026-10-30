# Browser QA

## Evidência reutilizada

A Parte B executou login/MFA por fluxo legítimo com identidades sintéticas, Chromium/CDP isolado e fixture transacional no banco descartável. Restaurante: Company Profile, conflito 409, navegação, Team e painéis administrativos limitados. Motoboy: vínculo Driver canônico, sessão, reload e logout. Nesta Parte C, o Browser autenticado 390×844 repetiu o round-trip do nome empresarial: publicação pela UI, HTTP 200, readback pela API, revisão obsoleta 409 e confirmação após reload. O write ocorreu no fixture sintético e foi revertido. Não é conta real nem homologação física.

## Execução desta parte

Foi reutilizado harness temporário em `/data/data/com.termux/files/usr/tmp/rotamoto_lote1c_settings_browser.cjs`, servindo os checkouts por proxy temporário para handlers reais no descarte 0304B. Não houve uso de perfil pessoal. A primeira execução sem `NODE_ENV=test` foi rejeitada pelo guard antes da conexão.

O harness aguardava inicialmente `RotaMotoAppReady`, marcador que o Motoboy não publica; foi corrigido para usar sinais existentes. Também foi alinhada a espera de ACK ao toast/status e aguardada a estabilização do bootstrap. Na última execução, login/MFA e endpoint de sessão após reload passaram; a interação seguinte não ativou `#settings` (timeout em `#settings.active`). A execução terminou antes de alterar a preferência, portanto não produziu ACK/readback/reload dela. Não houve JSON final. A falha da interação não prova defeito funcional nem sucesso do autosave. Não foi feita outra tentativa sem nova hipótese.

**Resultado da Parte C: PARTIAL/BLOCKED para persistência autenticada de aparência.** O teste determinístico da fila continua PASS; essas evidências não são intercambiáveis.

Capturas sintéticas: [`restaurante-configuracoes-persistencia-390x844.png`](browser/restaurante-configuracoes-persistencia-390x844.png), [`motoboy-autenticado-390x844-claro.png`](browser/motoboy-autenticado-390x844-claro.png). A captura `motoboy-aparencia-tentativa-nao-validada-390x844.png` é mantida como diagnóstico e não prova persistência.

## Matriz

| Fluxo | Origem | Estado |
|---|---|---|
| Restaurant Company Profile: ACK/readback/409/reload | Browser autenticado sintético Parte C, fixture transacional | PASS para o campo nome |
| Motoboy MFA, vínculo, reload e logout | Browser autenticado sintético Parte B | PASS limitado ao escopo B |
| Motoboy autosave de aparência na Parte C, ACK/readback/reload pela UI | Login/MFA e reload passaram; interação para abrir Ajustes não ativou a tela | BLOCKED |
| Chrome Android físico e todas as configurações | Confirmação do proprietário/dispositivo | PENDING_OWNER |
