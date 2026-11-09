# Evidências — Rotas e estado das APIs — 2026-11-09

## Mapa de rotas

| Aplicação | Front door Nginx | Backend configurado | Backend após correção |
|---|---:|---:|---:|
| Restaurante oficial | `127.0.0.1:8081` | `127.0.0.1:8788` | `8788` |
| Motoboy oficial | `127.0.0.1:8082` | `127.0.0.1:8788` | `8788` |
| Restaurante E2E | `127.0.0.1:8083` | antes `127.0.0.1:8788` (incorreto) | `127.0.0.1:8787` |
| Motoboy E2E | `127.0.0.1:8084` | `127.0.0.1:8787` | `8787` |

O template versionado do Restaurante E2E já apontava para 8787; o arquivo instalado divergia em quatro upstreams. Foi feita cópia de segurança externa ao Git e substituição das quatro referências. `nginx -t` aprovou e o reload controlado foi executado.

## Bloqueios de inicialização identificados

- Serviço oficial: o `run` exige `~/rotamoto-data/official-api/runtime.env`, owner igual ao serviço e modo 400/600. `stat` confirmou que a raiz e o arquivo estão ausentes. O guard do shell sai com 111 antes da inicialização Node.
- Serviço E2E: runtime URL usa role `rotamoto_e2e_app` em `rotamoto_e2e`; os caminhos configurados do keystore e da master key ficam sob `~/rotamoto-data`. A raiz não existe. A chamada read-only a `createFileSecretProvider` falhou em `ENOENT` ao validar essa raiz.
- O `.pgpass` existe em modo 600. `pg_isready` aceitou conexões; `psql -X -w` autenticou as roles oficiais e E2E e selecionou somente o nome do banco/usuário.
- `sv status`: Nginx RUN; oficial API DOWN; E2E API DOWN.
- GET health: 8081, 8082, 8083 e 8084 retornaram HTTP 502 porque 8788 e 8787 não estavam escutando.

## Limites e preservação

Não houve tentativa de iniciar APIs, nenhum restore, rotação ou criação de secrets, leitura de conteúdo de credenciais, escrita em PostgreSQL, mudança de migrations ou deploy. A configuração instalada anterior ficou preservada no backup local indicado no Registro 0306. É necessário recuperar `runtime.env`, keystore e chave mestra originais de backup confiável; chaves novas não são substitutas seguras para as referências cifradas existentes.

O Registro 0305 descreveu os 404 do browser estático como limitação genérica. Este adendo esclarece que os servidores Python temporários foram iniciados nas portas de upstream durante o teste; os 404 observados não eram uma verificação válida das rotas Nginx oficiais/E2E.
