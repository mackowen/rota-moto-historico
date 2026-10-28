# Campanha 0304 — Parte T.3

**Estado global: PARTIAL.** A publicação HTTP oficial e E2E serve os mesmos checkouts e hashes coincidem. Foi corrigida uma política HTTP sem revalidação do shell. O ensaio de atualização/rollback do Service Worker no Chromium isolado excedeu o timeout do harness CDP. Browser QA autenticado permanece BLOCKED sem sessão exposta ao runner.

## Gates

- T3-01/T3-02 instâncias e caminho: PASS.
- T3-03/T3-04 hashes/versão servida: PASS (37 URLs × 2 portas Restaurante; 34 URLs × 2 portas Motoboy; zero divergências).
- T3-05 contrato estático do Service Worker: PASS; atualização browser está em T3-06.
- T3-06 atualização/offline/rollback em browser: PARTIAL; suites automatizadas de instalação atômica passaram.
- T3-07/T3-08 Nginx: PASS (nginx -t, reload gracioso, Cache-Control confirmado nos quatro virtual hosts).
- T3-09 correspondência com relatos: PARTIAL; telas protegidas não foram inspecionadas.
- T3-10 identificação de versão: PASS via manifesto central existente.
- T3-11 smoke Chromium público: parcial; dimensões em BROWSER-QA.md.
- T3-12 sessão autenticada: BLOCKED.
- Paridade de publicação: PASS para bytes HTTP/checkouts e Nginx; T.3 integral: PARTIAL.

## Resultado

Nginx escuta em loopback. Oficial: Restaurante 8081 → API 8788; Motoboy 8082 → API 8788. E2E: Restaurante 8083 → API 8787; Motoboy 8084 → API 8787. Os roots servem os checkouts atuais. Raiz de 8787/8788 responde 404 esperado para API; readiness por /api/health/ready é 200. 8080 é Nginx default; 8789 não está em escuta.

Nginx agora envia no-cache para raiz/HTML, manifesto PWA, manifesto de assets e Service Worker nos quatro virtual hosts. Assets versionados e caches da aplicação não foram limpos. Nenhuma sessão, IndexedDB, banco, chave ou app foi alterado. 0061 é herdada da Parte S.2.

Detalhamento: AMBIENTES, NGINX, HASHES, SERVICE-WORKER, CACHE, VERSOES-INTERFACE, BROWSER-QA, TESTES e PENDENCIAS. Capturas em IMAGENS mostram somente login público. G14 FAIL, Campanha 0304 aberta, backlog desde 0257 preservado e 0305 não iniciada.
