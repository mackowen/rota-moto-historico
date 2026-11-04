# Reconciliação, publicação e integridade — Campanha 0304

**Execução em:** 2026-11-04.
**Resultado da operação:** PASS. Três repositórios publicados e verificados, conteúdo reconciliado confirmado no GitHub e pasta duplicada removida após checklist completo. A Campanha 0304 permanece PARTIAL por seus gates e pendências próprios.

## A. Reconciliação

Origem `/data/data/com.termux/files/home/projetos/codex-historico`; destino `/data/data/com.termux/files/home/projetos/repos/rota-moto-historico`. Ambos apontam para o remoto oficial `mackowen/rota-moto-historico`. A única pasta com nome `codex-historico` sob `~/projetos` é a origem identificada. O conteúdo é RotaMoto; não contém CondoOS Manager nem iDatabase Client.

Comparação dos snapshots rastreados antes do merge: 2.244 paths no `main`, 2.087 na origem; 1.988 hashes iguais, 8 paths divergentes, 91 paths exclusivos da origem e 248 exclusivos do destino. A integração usa merge não fast-forward entre os branches existentes, preservando ambos os ancestrais. Os dois conflitos de arquivo (`REGISTROS/0304.md`, `RESUMOS/0304.md`) foram resolvidos mantendo o conteúdo de ambos os lados em ordem cronológica; os demais foram mesclados automaticamente. Os 91 arquivos de origem são documentação/evidências RotaMoto.

Dos 38 artefatos não rastreados, 37 evidências antigas do redesign de login foram adicionadas ao histórico em `login-redesign-2026-10-25/` com nota de escopo e limitações. Uma captura de Operação foi guardada em diretório local privado, fora do GitHub, para não publicar configuração comercial. A cópia tem modo 0600, seu diretório modo 0700 e o SHA-256 bate com a origem. Os 39 branches locais da cópia têm pontas já alcançáveis em refs remotas; não há commits de branch local exclusivos.

## B. Publicação

| Repositório | Branch/destino | Commit publicado | Push confirmado | GitHub |
|---|---|---|---|---|
| `rota-moto` | `main` | `9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6` | confirmado; fast-forward de `64d2e13`; `git ls-remote` igual | [commit no GitHub](https://github.com/mackowen/rota-moto/commit/9da9e6cd4b1b8f0b895f1d825735f04cb96f78c6) |
| `rota-moto-restaurante` | `main` | `e23d06c754c5b5d654d2a233e88ed6ebee42785d` | confirmado; fast-forward de `65a0239`; `git ls-remote` igual | [commit no GitHub](https://github.com/mackowen/rota-moto-restaurante/commit/e23d06c754c5b5d654d2a233e88ed6ebee42785d) |
| `rota-moto-historico` | `main` | `92b4349` (merge), `6eabf52` (verificação); commit de encerramento pós-exclusão no registro | confirmado; `git ls-remote` e fetch iguais | [merge no GitHub](https://github.com/mackowen/rota-moto-historico/commit/92b4349eed3ee24fcd4b0e1a9d4d625f69a7644f), [verificação](https://github.com/mackowen/rota-moto-historico/commit/6eabf52f29ee3118602ccb911d1d617f36a0d4a6) |

## C. Exclusão

Exclusão executada somente em `/data/data/com.termux/files/home/projetos/codex-historico`, após os gates prévios. O caminho não existe mais; `/data/data/com.termux/files/home/projetos/repos/rota-moto-historico` permanece presente e íntegro. Antes da remoção, os três `main` locais/remotos tinham SHAs iguais; o merge `92b4349` continha os pais esperados; `origin/main` continha os 2.087 paths rastreados da origem, as 37 evidências aprovadas e os documentos 0304 requeridos. A captura comercial potencialmente sensível segue fora do GitHub em cópia privada idêntica (diretório 0700, arquivo 0600). Os 39 branch tips locais da origem estavam alcançáveis em branches remotos; não havia arquivos ignorados ou conteúdo de outro projeto.

## D. Integridade e testes

- `npm test` integral Motoboy: PASS, exit 0.
- `npm test` integral Restaurante: PASS, exit 0 após commit somente de whitespace nas migrations 0060, 0061 e 0068.
- `git diff --check` das alterações: PASS.
- Verificação de links locais dos Markdown alterados: 311 links conferidos, zero quebrados após corrigir um caminho.
- Nenhum banco oficial, migration, serviço, credencial, SMTP ou keystore alterado; nenhum segredo ou e-mail real usado.
- `git diff --check`: PASS. 866 links locais em 36 Markdown alterados: PASS, zero quebrados. Todos os 2.087 paths rastreados da árvore origem existem na árvore remota reconciliada. 37/37 evidências de login verificadas em hashes de blob; arquivo comercial não existe no remoto e tem cópia privada validada.

## E. Estado

Os três pushes e o conteúdo reconciliado foram confirmados antes da exclusão. A pasta exata foi removida; a captura privada continua válida. Após publicar este registro final e conferir o HEAD remoto do histórico, a operação fica PASS. O backlog/G14 de 0304 permanece aberto; 0305 não iniciada.
