# Correção da etapa SMTP do Bootstrap — 2026-11-03

**Classificação: PARTIAL para a operação externa; correção do bloqueio local validada.**

## Causa e correção

O navegador abre o Bootstrap em `http://127.0.0.1:8083`, mas o nginx encaminhava a API oficial com `Host: 127.0.0.1`. A API exige coincidência exata entre `Origin`, origem derivada de `Host`/socket e a allowlist. A configuração oficial não incluía `http://127.0.0.1:8083` nem `http://localhost:8083`, por isso o guard rejeitava a requisição como `ORIGIN_INVALID` antes de chegar à autorização SMTP. Não era falha de CORS, handler do botão, autorização temporária ou transporte SMTP.

Foi adicionada à allowlist somente a origem explícita de loopback em 8083 (IPv4 e localhost) no runtime oficial e no exemplo versionado. Não houve alteração do listener loopback do nginx/API, da validação de peer/origem/proof, CSRF, CORS genérico ou de controles LAN. Depois do restart do serviço oficial, a origem `127.0.0.1:8083` passa pelo guard de origem e, sem proof, recebe `PROVISIONER_UNAUTHORIZED`; origem LAN continua rejeitada como `ORIGIN_INVALID`.

A interface agora mantém os campos SMTP ao renderizar loading/resultado, preservando a senha somente na memória do formulário. O valor não é serializado no HTML, sessionStorage/localStorage, URL, logs ou resposta HTTP. A mensagem de validação distingue validação de formato/host de conexão e envio; o teste distingue submissão aceita de entrega confirmada. Erros conhecidos são traduzidos para instruções recuperáveis, substituídos no início de nova tentativa e dispensáveis. Os botões entram em loading e ficam desabilitados durante a operação. A senha é limpa depois que a configuração de teste é aceita, ao abandonar a página e ao concluir o fluxo autorizado.

## Verificações

- Requisição sem proof através do proxy com `Origin: http://127.0.0.1:8083`: HTTP 403 `PROVISIONER_UNAUTHORIZED` (guard de origem passou; nenhuma configuração ou e-mail foi processado).
- A mesma requisição com origem `http://192.168.1.20:8083`: HTTP 403 `ORIGIN_INVALID`.
- `/bootstrap.html`, CSS, JS, `/api/identity/bootstrap/status` e `/health/ready`: HTTP 200; estado e readiness `ready`.
- Testes `npm run test:smtp-bootstrap`, `node --check bootstrap-wizard.js`, `npm run assets:check` e `git diff --check`: PASS.
- Browser QA Chromium/CDP: formulário percorrido com dados `.invalid`; chamadas SMTP interceptadas e substituídas por fixtures; sucesso de validação, origem rejeitada, falha de autenticação, timeout e submissão aceita exercitados. Todos os campos e senha permaneceram após validação/falhas; a senha não apareceu no HTML ou armazenamento do navegador e foi limpa no sucesso persistido. Cinco requisições simuladas aos endpoints (2 validate e 3 test); nenhuma conexão SMTP, mensagem externa ou provisionamento foi efetuado.
- Claro/escuro em 390×844, 768×1024 e 1440×900: 6/6 sem overflow horizontal nem erros JavaScript. Capturas abaixo.
- A captura fornecida pelo operador foi usada apenas para diagnóstico e não foi republicada, pois contém dados pessoais. Chromium emulado não substitui teste físico do Chrome Android/teclado virtual.
- Nenhuma migration, escrita/reset de banco oficial, autorização real, fundador, empresa ou usuário foi criado.

## Capturas

| Tema | 390×844 | 768×1024 | 1440×900 |
|---|---|---|---|
| Claro | [PNG](smtp-light-390x844.png) | [PNG](smtp-light-768x1024.png) | [PNG](smtp-light-1440x900.png) |
| Escuro | [PNG](smtp-dark-390x844.png) | [PNG](smtp-dark-768x1024.png) | [PNG](smtp-dark-1440x900.png) |

Relatório sanitizado completo: [report.json](report.json).

## Ambiente e limites

A alteração runtime da allowlist foi aplicada sem imprimir nem publicar o arquivo privado; modo do arquivo permaneceu restrito. O serviço reiniciado foi somente `rotamoto-api-official`. Nenhuma credencial SMTP foi alterada. O endpoint oficial atualmente reporta SMTP não configurado e entrega de convites não configurada; a validação/teste do Browser QA foi simulada, portanto a configuração e envio externos continuam dependentes da operação do proprietário. A tela deve ser recarregada para servir os assets atualizados.

Campanha 0304 continua aberta; G14 e backlog preservados; 0305 não iniciada.
