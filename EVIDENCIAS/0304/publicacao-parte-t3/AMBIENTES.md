# T3-01/T3-02 — Ambientes e caminho HTTP

Verificações: status runit, cwd/executável de processos, configuração nginx -T filtrada, respostas HTTP e readiness. Nenhum serviço foi alterado durante o inventário.

| Instância | URL | Processo/root estático | Proxy de API | Estado |
|---|---|---|---|---|
| Nginx default | 127.0.0.1:8080 | PID master 24654; root default share/nginx/html | — | 200, não é app |
| Restaurante oficial | 127.0.0.1:8081 | root direto rota-moto-restaurante; branch codex/campaign-0304-parity-s; HEAD a6a1b5cf9b92113edbf8cf67b7bf7ca2068b109f | /api → 8788; runit rotamoto-api-official PID 24870 | 200/readiness 200 |
| Motoboy oficial | 127.0.0.1:8082 | root direto rota-moto; branch codex/campaign-0304-parity-s; HEAD 66b0eebf8d4eecabe0d4e5d580fedf3919cd1fef | /api → 8788 | 200/readiness 200 |
| Restaurante E2E | 127.0.0.1:8083 | Mesmo checkout Restaurante | /api → 8787; runit rotamoto-api-e2e PID 24885 | 200/readiness 200 |
| Motoboy E2E | 127.0.0.1:8084 | Mesmo checkout Motoboy | /api → 8787 | 200/readiness 200 |
| API oficial | 127.0.0.1:8788 | Node cwd Restaurante | Root 404; health através do proxy | processo ativo |
| API E2E | 127.0.0.1:8787 | Node cwd Restaurante | Root 404; health através do proxy | processo ativo |
| Porta 8789 | — | Nenhum listener | — | conexão recusada |

A configuração do serviço oficial associa o banco rotamoto; a configuração E2E associa rotamoto_e2e. As versões 0061 foram herdadas da evidência S.2; esta Parte não consultou nem escreveu nos bancos.

Os processos Node iniciaram antes dos commits de interface mais recentes. A revisão dos commits posteriores ao início dos serviços encontrou alterações apenas em testes, HTML, JavaScript/CSS do frontend e manifesto de assets; nenhum módulo backend mudou. Isso separa a atualização estática servida pelo Nginx do runtime API em memória. Processos e readiness foram confirmados, sem reinício.

Nginx usa bind 127.0.0.1, server_name localhost, sem alias/build separado. Caminho: browser → Nginx root → index.html → assets relativos versionados → arquivos do checkout; /api/* passa ao Node do ambiente. Raiz de uma porta de API responder 404 não é falha. T3-01/T3-02 PASS para instâncias locais. O host remoto digitado no Android não foi inferido.
