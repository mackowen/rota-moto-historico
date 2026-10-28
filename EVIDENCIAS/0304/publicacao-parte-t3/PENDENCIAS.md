# Pendências e gates

- T3-06/PWA-01: completar update, ativação após clientes liberarem worker, offline e falha de instalação via Chromium; o harness expirou em avaliações assíncronas. Suites unitárias passaram.
- T3-09: confrontar Rotas, Configurações, QR/Imprimir, sidebar e navegação inferior com a sessão real do proprietário.
- T3-11: Browser QA público 768/1024/1440, tema, reload/cache e Android físico não realizados.
- T3-12: Browser QA autenticado BLOCKED até sessão legítima estar disponível pelo runner.
- Não foi inferido host remoto digitado no Android; só loopback deste Termux.
- 8789 indisponível, mas não é endpoint configurado; APIs ativas são 8788 oficial e 8787 E2E.

Publicação estática nos quatro hosts coincide com os checkouts e revalidação HTTP foi corrigida. Gate bytes/Nginx PASS; gate T.3 global PARTIAL. G14 FAIL, 0304 aberta, backlog 0257 preservado e 0305 não iniciada.
