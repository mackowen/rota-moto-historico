# QR de presença — configuração E2E e bloqueio operacional

Data: 2026-10-25. Execução somente local, sem alterar os repositórios de aplicação.

## Diagnóstico e configuração

O serviço `rotamoto-api-e2e` (porta 8787, `NODE_ENV=test`, database `rotamoto_e2e`, role runtime `rotamoto_e2e_app`) carregava o keystore privado E2E, mas seu `runsv` não definia `ROTAMOTO_DELIVERY_QR_SIGNING_KEY_REF` nem `ROTAMOTO_DELIVERY_QR_KEY_ID`. O código exige ambos e busca uma chave privada Ed25519 pelo contexto de instalação `delivery/qr-signing-key/<kid>`. Portanto a falha era configuração ausente no processo E2E, não chave inválida, falha de leitura, autenticação ou falha de emissão observada.

A entrada criptografada preexistente não possuía metadados que permitissem provar seu contexto; ela foi preservada e não reutilizada. Uma chave Ed25519 nova e exclusiva do E2E foi gerada em memória, armazenada cifrada no keystore externo ao Git (diretório 0700, master key 0600, entrada 0600) e configurada somente no unit `/data/data/com.termux/files/usr/var/service/rotamoto-api-e2e/run`. Foi preservado backup local do unit anterior. Nenhum valor privado, QR ou token foi incluído nesta evidência.

O unit E2E precisou ser reiniciado. Uma primeira edição local do script de serviço produziu erro de sintaxe e a instância ficou brevemente down; o arquivo foi restaurado do backup recém-criado, corrigido e iniciado. A API E2E voltou a `HTTP 200` em `/health/ready`. A API oficial em 8788 também respondeu `HTTP 200` e não foi parada, reconfigurada nem conectada para escrita. Não há alteração de código de aplicação.

## Evidências executadas

| Verificação | Resultado | Limite |
|---|---|---|
| Leitura da referência no keystore pelo contexto de instalação configurado | PASS | O valor permaneceu em memória e não foi registrado. |
| Tipo da chave e assinatura/verificação de desafio local | PASS — Ed25519 | Prova configuração criptográfica; não é emissão HTTP autenticada. |
| Sintaxe do unit E2E (`sh -n`) | PASS após reparo | O backup local anterior foi preservado. |
| API E2E `/health/ready` | PASS — HTTP 200 | Não comprova endpoint autenticado de QR. |
| API oficial `/health/ready` | PASS — HTTP 200 | Somente probe de saúde; nenhuma escrita. |
| `node tests/test-logistics-domain.js` | PASS | Testes de domínio e segurança de migrations existentes. |
| `node tests/test-logistics-http.js` | PASS | HTTP autenticado/CSRF/RBAC e erro sanitizado; não cobre a jornada real do QR. |
| Emissão QR autenticada e renderização em Restaurante | BLOCKED | Não há credencial MFA sintética recuperável autorizada para login. |
| Leitura/validação em Motoboy, confirmação de presença, persistência e elegibilidade | BLOCKED | Exigem a sessão/fixture operacional acima. Nenhuma escrita durável foi iniciada. |
| Negativos de replay/concorrência nesta execução | BLOCKED | Os testes E2E existentes criam schema/fixtures duráveis em `rotamoto_e2e`; sem limpeza autorizada, não foram repetidos. |
| Leitura física pela câmera | BLOCKED | Nenhuma sessão autenticada; câmera física não foi exercitada. |

`node --test tests/test-driver-availability-concurrency-e2e.js` foi invocado sem `NODE_ENV=test` e encerrou antes de acessar o banco, informando essa variável ausente. Não foi repetido com ambiente corrigido porque o teste declara manter schema e linhas sintéticas duráveis sem teardown; não é seguro fazê-lo nesta execução.

## Estado operacional e segurança

- A chave foi configurada apenas no ambiente local E2E; configuração oficial não foi modificada.
- O teste de assinatura não produziu QR de presença nem nonce no banco.
- Nenhum POST de check-in foi executado; nenhuma escrita PostgreSQL ocorreu nesta intervenção.
- O único recurso local criado foi a entrada cifrada E2E e o backup do script de serviço, ambos preservados. Não há cluster ou fixture descartável para remover.
- O fluxo HTTP autenticado, confirmação de presença, atualização no Restaurante, distinção entre presença/lease/elegibilidade e convergência após reload permanecem pendentes.
- G14 continua FAIL; Campanha 0304 PARTIAL/aberta; 0305 não iniciada.

