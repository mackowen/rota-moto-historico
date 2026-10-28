# T3-05 — Service Workers

Fontes: Restaurante sw.js; Motoboy service-worker.js; ambos importam o manifesto central. O cacheName combina prefixo e digest do conjunto/worker. URLs centrais são versionadas por conteúdo; assets:check passou nos dois apps.

- Install baixa o shell com cache reload em paralelo. Falha obrigatória apaga somente cache candidato; opcionais podem faltar.
- Activate apaga caches antigos somente do próprio prefixo e chama clients.claim.
- Não há skipWaiting; worker novo aguarda clientes antigos liberarem a versão ativa.
- Restaurante: navegação network-first e shell offline; API não entra no cache; assets exatos usam cache versionado.
- Motoboy: GETs exatos listados no manifesto entram no cache; API excluída; raiz incluída no shell.
- Nenhum worker/cache de perfil pessoal foi removido.

Browser público instalou worker ativo no Restaurante (320 e 390) e Motoboy (320). Suites npm passaram, incluindo test-sw-atomic-install.js e test-service-worker-atomic-install.js. T3-05 PASS por contrato, suites e instalação pública. Update efetivo e offline em Chromium permanecem PARTIAL conforme CACHE.md.
