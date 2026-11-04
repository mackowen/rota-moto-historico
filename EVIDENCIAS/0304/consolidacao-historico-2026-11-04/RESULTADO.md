# Reconciliação, publicação e integridade — Campanha 0304

**Execução em:** 2026-11-04.
**Estado nesta preparação:** aplicativos publicados e verificados; reconciliação documental integrada localmente; push do histórico e exclusão da origem ainda pendentes.

## A. Reconciliação

Origem `/data/data/com.termux/files/home/projetos/codex-historico`; destino `/data/data/com.termux/files/home/projetos/repos/rota-moto-historico`. Ambos apontam para o remoto oficial `mackowen/rota-moto-historico`. A única pasta com nome `codex-historico` sob `~/projetos` é a origem identificada. O conteúdo é RotaMoto; não contém CondoOS Manager nem iDatabase Client.

Comparação dos snapshots rastreados antes do merge: 2.244 paths no `main`, 2.087 na origem; 1.988 hashes iguais, 8 paths divergentes, 91 paths exclusivos da origem e 248 exclusivos do destino. A integração usa merge não fast-forward entre os branches existentes, preservando ambos os ancestrais. Os dois conflitos de arquivo (`REGISTROS/0304.md`, `RESUMOS/0304.md`) foram resolvidos mantendo o conteúdo de ambos os lados em ordem cronológica; os demais foram mesclados automaticamente. Os 91 arquivos de origem são documentação/evidências RotaMoto.

Dos 38 artefatos não rastreados, 37 evidências antigas do redesign de login foram adicionadas ao histórico em `login-redesign-2026-10-25/` com nota de escopo e limitações. Uma captura de Operação foi guardada em diretório local privado, fora do GitHub, para não publicar configuração comercial. A cópia tem modo 0600, seu diretório modo 0700 e o SHA-256 bate com a origem. Os 39 branches locais da cópia têm pontas já alcançáveis em refs remotas; não há commits de branch local exclusivos.

## B. Publicação

| Repositório | Branch/destino | Commit publicado | Push confirmado | GitHub |
|---|---|---|---|---|
| `rota-moto` | `main` | `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6` | confirmado; fast-forward de `64d2e13`; `git ls-remote` igual | [commit no GitHub](https://github.com/mackowen/rota-moto/commit/9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6) |
| `rota-moto-restaurante` | `main` | `e23d06c754c5b5d654d2a233e88ed6ebee42785d` | confirmado; fast-forward de `65a0239`; `git ls-remote` igual | [commit no GitHub](https://github.com/mackowen/rota-moto-restaurante/commit/e23d06c754c5b5d654d2a233e88ed6ebee42785d) |
| `rota-moto-historico` | `main` | pendente | merge preparado; push pendente | pendente |

## C. Exclusão

`codex-historico` ainda não foi excluído. A exclusão só ocorrerá depois da validação remota dos três repositórios, verificação de arquivos exclusivos e conferência final da cópia privada da captura operacional.

## D. Integridade e testes

- `npm test` integral Motoboy: PASS, exit 0.
- `npm test` integral Restaurante: PASS, exit 0 após commit somente de whitespace nas migrations 0060, 0061 e 0068.
- `git diff --check` das alterações: PASS.
- Verificação de links locais dos Markdown alterados: 311 links conferidos, zero quebrados após corrigir um caminho.
- Nenhum banco oficial, migration, serviço, credencial, SMTP ou keystore alterado; nenhum segredo ou e-mail real usado.

## E. Estado

A reconciliação local foi feita, mas a classificação final depende do push fast-forward do histórico, confirmação do SHA/conteúdo no GitHub e checagem de todos os arquivos antes de remover a pasta duplicada. Não declarar PASS até o terceiro remoto e o histórico reconciliado estarem confirmados.
