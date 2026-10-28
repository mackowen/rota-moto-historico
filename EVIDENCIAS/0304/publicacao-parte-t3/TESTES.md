# Testes T3

| Verificação | Resultado |
|---|---|
| npm test Restaurante | PASS, exit 0; inclui teste Service Worker atômico e contratos |
| npm test Motoboy | PASS, exit 0; inclui contrato PWA, Service Worker atômico e contrato compartilhado |
| npm run assets:check Restaurante | PASS, exit 0 |
| npm run assets:check Motoboy | PASS, exit 0 |
| SHA-256 refs HTTP | PASS: Restaurant 74/74; Motoboy 68/68 |
| Nginx status/cache headers | PASS: 200/no-cache nos recursos shell nas portas 8081–8084 |
| nginx -t antes/depois | PASS |
| API readiness via Nginx | PASS: HTTP 200 nos quatro hosts |
| Browser público | PASS limitado aos tamanhos em BROWSER-QA.md |
| Atualização/rollback browser | PARTIAL: Runtime.evaluate excedeu 12 s, sem asserções completas |
| Contratos compartilhados | PASS dentro de npm test nos dois |
| git diff --check apps | PASS em ambos; sem diffs de app nesta Parte |
| PostgreSQL/migrations | Não consultado/escrito nesta Parte; migration 0061 herdada da S.2 |

Avisos de assets MapLibre opcionais vieram dos testes de instalação atômica; o manifesto os classifica opcionais e os comandos terminaram exit 0.
