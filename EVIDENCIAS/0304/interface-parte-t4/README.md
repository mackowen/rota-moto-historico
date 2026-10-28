# Campanha 0304 — Parte T.4

**Resultado geral: PARTIAL.** Correções executadas e testadas nos toasts do Restaurante e Motoboy. `npm test`, `assets:check`, contrato compartilhado e readiness HTTP passaram. Instalação/recarga/atualização do Service Worker foram exercitadas em Chromium 155 arm64, em perfil descartável. O fallback offline e a validação no Chrome Android pessoal não foram aprovados; fluxos autenticados continuam bloqueados sem sessão autorizada disponível no CDP.

## Escopo e segurança

- Checkpoint inicial: Restaurante e Motoboy na branch `codex/campaign-0304-parity-s`, worktrees limpas, HEADs registrados nos commits locais da campanha. Histórico estava no checkpoint `18a3f53e7ac59430678df92bafefe85f08c54aa3` (branch de campanha alinhada a `origin/main`); Restaurante/Motoboy iniciaram em `a6a1b5cf9b92113edbf8cf67b7bf7ca2068b109f` / `66b0eebf8d4eecabe0d4e5d580fedf3919cd1fef`; um diretório não rastreado `EVIDENCIAS/0304/login-redesign-2026-10-25/` foi preservado.
- `8083/` e `8084/`: HTTP 200; `/health/ready` em `8787` e `8788`: HTTP 200.
- A verificação oficial de status do E2E confirmou migration 0061. Nenhuma migration foi executada.
- Tentativa de conferir o grant do fundador com a role de aplicação e transação read-only foi recusada por `permission denied for schema rotamoto`. Não houve bypass; a evidência R.1 permanece a referência anterior, e a reconfirmação independente neste checkpoint é PARTIAL/BLOCKED.
- Nenhuma escrita em PostgreSQL, alteração de sessão, perfil, grant ou dado comercial. Nenhum cache/perfil pessoal foi acessado ou apagado.

## Itens desta parte

| ID | Estado | Evidência |
|---|---|---|
| T4-01 | PARTIAL | serviços e versão 0061 confirmados; founder não pôde ser relido pela role autorizada de aplicação |
| T4-02 | PARTIAL | instalação, recarga, atualização em espera/ativação, cache antigo removido e instalação falha preservando cache ativo; fallback offline não comprovado |
| T4-03 | BLOCKED | Chrome Android pessoal não foi acessado; ação manual não destrutiva em [ACAO-PROPRIETARIO.md](ACAO-PROPRIETARIO.md) |
| T4-04 | PARTIAL | autosave e salvamento cadastral cobertos por testes de persistência existentes; Browser QA autenticado indisponível |
| T4-05 | PARTIAL | sem inspeção autenticada de formulários Configurações em tela real |
| T4-06 | PASS técnico | offsets derivados da geometria da barra; testes unitários e DOM/CSS em dez combinações; Android físico pendente |
| T4-07 | PARTIAL | geometria da navegação medida em 320/390 e breakpoint tablet; teclado Android não testado |
| T4-08 | PARTIAL | harness sintético mediu topbar estável em 320/390; fixture não é shell autenticado real |
| T4-09 | BLOCKED | comparação autenticada de todas as abas indisponível |
| T4-10 | PARTIAL | implementação inicial e testes de identidade/navegação cobertos; sem sessão real de login nesta execução |
| T4-11 | PARTIAL | filtros de camadas e `Ajustar` correspondem ao renderer já registrado em T.2; relatos visuais pendem confirmação autenticada do proprietário |
| T4-12 | PARTIAL | contratos/cartografia/map lifecycle passam na suíte; sem corrida real ou sessão para validar mapa autenticado |
| T4-13 | PARTIAL | viewport/tema sintéticos completos para o harness; isso não aprova visualmente telas protegidas |
| T4-14 | PARTIAL | suítes automatizadas PASS; PWA offline real e QA autenticado pendentes |

Commits locais: Restaurante `2a14989`; Motoboy `382ee16` (sem push). Harnesses descartáveis estão em `~/projetos/browser-tests/campaign-0304-t4-layout.cjs` e `~/projetos/browser-tests/.temporarias-t4-sw-lifecycle.cjs`. Detalhes, medidas, comandos e resultados estão em [CACHE-ANDROID](CACHE-ANDROID.md), [BROWSER-QA](BROWSER-QA.md), [TESTES](TESTES.md) e [PENDENCIAS](PENDENCIAS.md). G14 continua **FAIL**, campanha 0304 aberta e campanha 0305 não iniciada.

Revalidação final pós-commit: os seis arquivos de shell da atualização T.4 tiveram hashes HTTP idênticos aos checkouts em 8083; browser isolado em 390×844 instalou e controlou o shell. A lista de hashes e cache ativo está em [CACHE-ANDROID.md](CACHE-ANDROID.md).
