# Browser QA — Bootstrap

**Classificação: PASS somente para interface isolada sintética; instalação real: BLOCKED.** Foi usado Chromium headless via CDP, perfil temporário isolado criado e removido ao final, página/HTML/CSS/JS reais do checkout e respostas `fetch` stubadas. O teste não autentica identidade nem escreve PostgreSQL.

| Viewport | Tema | scrollWidth / largura | Resultado |
|---|---|---:|---|
| 390×844 | claro | 390 / 390 | PASS sintético |
| 390×844 | escuro | 390 / 390 | PASS sintético |
| 768×1024 | claro | 753 / 768 | PASS sintético |
| 768×1024 | escuro | 753 / 768 | PASS sintético |
| 1440×900 | claro | 1425 / 1440 | PASS sintético |
| 1440×900 | escuro | 1425 / 1440 | PASS sintético |

O roteiro percorreu as sete etapas, bloqueio de campos obrigatórios, retorno sem perder rascunho, ausência da autorização no armazenamento, conflito 409 com retry/idempotência, resposta sintética 202/readback UI, ausência de exceções JS e respostas HTTP de erro. Após simular estado `complete`, reload ocultou formulário, capacidade e ação de avançar. “Sucesso” verificado é somente a UI renderizando ACK simulado.

Capturas: [`diagnostic-*`](capturas/), [`review-390x844-light.png`](capturas/review-390x844-light.png), [`conflict-390x844-light.png`](capturas/conflict-390x844-light.png), [`success-390x844-light.png`](capturas/success-390x844-light.png), [`complete-locked-390x844-light.png`](capturas/complete-locked-390x844-light.png). Matriz bruta e script reproduzível ficam em `~/projetos/browser-tests/bootstrap-wizard-qa.cjs` e `~/projetos/browser-tests/evidencias/bootstrap-wizard-2026-11-02/matrix.json`.

Não houve sessão autenticada, envio de e-mail, teste TOTP real ou captura do serviço 8083 atualizado. 8083 serviu a versão anterior (`/bootstrap.html` 404); 8787 estava pronto, mas a rota de status ainda retornava 404. Não limpar cache, dados, cookies ou perfil pessoal é deliberado.
