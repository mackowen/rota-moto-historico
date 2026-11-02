# Bootstrap local — 0304 — 2026-11-02

Resultado **PARTIAL**. O endereço `http://127.0.0.1:8083/bootstrap.html` é local ao dispositivo e abre corretamente. Esta verificação não confunde a URL local com um endpoint HTTPS público de convite.

- API oficial em 8788 e proxy Restaurante em 8083: readiness `ready`; bootstrap `state=ready`, com migrações/configuração de preço/MFA disponíveis e `invitationDeliveryConfigured=false`.
- SMTP real: `smtp-verify` confirmou o transporte existente; nenhuma mensagem foi enviada. A configuração privada não contém `PUBLIC_BASE_URL`. O provider exige remetente e URL pública HTTPS. Para entregar convites por e-mail a pessoas externas, o proprietário precisa disponibilizar domínio HTTPS roteado para a instalação. Nenhuma credencial foi solicitada ou registrada.
- Keystore MFA oficial verificado sem regenerar ou sobrescrever chaves. O E2E continua em 8787/banco `rotamoto_e2e`, sem reutilizar o keystore/SMTP oficial. Nenhum dado foi escrito nos bancos.
- Browser QA Chromium/CDP: página e formulário do administrador fundador, claro/escuro, larguras 390/768/1440 px; 12 capturas, nenhuma barra horizontal; assets CSS/JS HTTP 200; zero erros de console ou HTTP. Wizard navegado até a etapa final com valores fictícios `.invalid` somente no browser; envio final desabilitado pelo gate, zero POST de provisionamento.

`report.json` contém apenas resultados e dimensões/status HTTP, sem credenciais, endereços de e-mail, códigos de autorização, identificadores de requisição ou dados da instalação. Capturas: diagnóstico e formulário, seis combinações cada (tema × largura).

A correção de runtime está no commit local do Restaurante `13a375c518b0353234b5c861ad87b216dea3dd1c`. A alteração do app não foi publicada; o push limita-se ao histórico autorizado.
