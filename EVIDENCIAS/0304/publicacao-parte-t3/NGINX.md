# T3-07/T3-08 — Nginx

Configuração examinada: nginx.conf e os quatro virtual hosts Restaurante, Motoboy e E2E. Roots apontam aos checkouts; try_files serve somente arquivos existentes; não foi encontrada cópia antiga nem proxy de assets.

Antes: nenhuma diretiva Cache-Control/expires nos virtual hosts. HEAD mostrava ETag/Last-Modified, sem política explícita para HTML, manifests ou Service Worker; o browser podia manter shell com validade heurística.

Correção mínima fora dos apps:

- Novo include rotamoto-shell-cache-headers.conf com add_header Cache-Control "no-cache" always.
- Incluído para /, /index.html, /manifest.json, /asset-manifest.js e worker correspondente nos quatro virtual hosts.
- Headers de segurança existentes preservados; política restrita aos recursos de shell. URLs versionadas permanecem funcionais.

nginx -t passou antes e depois. Foi feito reload gracioso no PID 24654; nenhum API foi reiniciado. Pós-reload, todos esses recursos deram HTTP 200 e Cache-Control no-cache nas portas 8081–8084; readiness 200 em cada uma. T3-07/T3-08 PASS.
