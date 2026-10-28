# Campanha 0304 — Parte T.6

**Resultado: PARTIAL.** Corrigido o fallback de superfície clara que deixava texto de cards internos ilegível no tema escuro; financeiro foi consolidado em um formulário único; cancelamento e descarte de respostas obsoletas foram conectados ao console global; navegação administrativa foi compactada. O teste sintético CDP com a folha CSS real passou em 10 combinações de viewport/tema, sem overflow e sem textos abaixo de WCAG AA nos elementos medidos.

Não havia sessão Super ADM autorizada disponível no CDP. Não foram usados a senha nem códigos enviados na conversa, cookies, tokens ou perfil Chrome pessoal. Portanto, a tela autenticada real e a persistência financeira real seguem **BLOCKED**. As capturas do proprietário são aceitas como evidência de defeito; as oito imagens não estavam no checkout disponível para nova medição.

## O que mudou

- `identity-ui.css`: cards/facts/notas usam `--surface`, `--surface-soft`, `--text-primary` e `--text-secondary` definidos pelo design system. Removidos aliases inexistentes `--surface-muted` e `--surface-2` que no escuro caíam em fundo claro.
- `identity-ui.js`: resumo financeiro passou a ter um seletor de empresa/período e uma consulta por seção; mudança de contexto aborta/invalida resultado. Leituras de seção cancelam a anterior; refresh tem estado ocupado; operações filhas de perfis não publicam resultado/erro após navegação.
- `identity-request-state.js`: controlador pequeno de geração + `AbortController`, usado pelo console e exercitado com respostas fora de ordem.
- `app.js`: mensagem `BACKUP_ADMIN_NOT_CONFIGURED` esclarece que o endpoint administrativo de servidor não está montado e não atesta a existência de scripts/cópias locais.
- `index.html` e `asset-manifest.js`: novo helper e assets publicados/versionados pelo gerador oficial.
- Commit local do Restaurante: `58a2739` (`fix: stabilize global admin sections and contrast`). Motoboy sem alterações. Nenhum push de aplicativo.

## Evidências

- `browser-measurements.json` contém dados medidos por Chromium 155.0.8059.79 em perfil temporário isolado. A página declara demonstração sintética, não faz login e não contém dados reais.
- Capturas `super-admin-{light,dark}-{320,390,768,1024,1440}.png` mostram os seis modelos de seção e controles de perfil. Não são prova de uma sessão autenticada real.
- Hashes locais e HTTP do CSS, JS, helper e `app.js` coincidiram em `127.0.0.1:8083` depois da publicação dos assets.
- Testes completos do Restaurante e Motoboy passaram. Nenhum banco foi conectado ou alterado.

## Gate

| Gate | Estado |
|---|---|
| Contraste e layout sintético | PASS técnico |
| Estados/race guard | PASS técnico do controlador + verificações de integração estática |
| Console global autenticado | BLOCKED |
| Resumo financeiro/persistência autenticada | BLOCKED |
| Serviço administrativo de cópias | PARTIAL; mensagem ligada ao código HTTP confirmado no código, configuração do processo E2E não inspecionada autenticadamente |
| Parte T.6 global | PARTIAL |
| G14 | FAIL — aprovação visual do proprietário pendente |
| Campanha 0304 | ABERTA; 0305 não iniciada |
