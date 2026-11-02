# Campanha 0304 — Bootstrap pelo navegador

**Resultado: PARTIAL.** O assistente de primeira instalação foi implementado no checkout Restaurante, com fluxo de sete etapas, validação, retomada idempotente e proteção para só concluir o latch/fundador depois que o titular aceitar o convite e confirmar MFA. A interface passou Browser QA visual sintético em seis combinações de viewport/tema. A instalação real e a integração autenticada continuam sem comprovação: o E2E persistente já está bloqueado como instalação concluída e a API em execução ainda não serve a rota nova.

## O que foi implementado

- `bootstrap.html`, `bootstrap-wizard.js` e `bootstrap-wizard.css`: boas-vindas/diagnóstico, titular, empresa, operação, entregas/logística, revisão e finalização.
- Endpoint público somente de leitura `GET /api/identity/bootstrap/status`; retorna estado e quatro indicadores booleanos, sem IDs, e-mails, referências ou segredos.
- Provisionamento reutiliza o convite de proprietário, ativação, senha e MFA obrigatórios que já existem. Não cria autenticação paralela. O papel fundador e o latch concluído são gravados na mesma transação que confirma o TOTP do titular, não quando a empresa ou convite são criados.
- Autorização de operador de uso único: digest persistido, segredo curto exibido apenas pelo terminal, validade de dez minutos, Origin/peer local, rate limit, idempotência e bloqueio por estado de instalação. A ausência de empresas, sozinha, não libera a rota.
- Dados iniciais opcionais/gravação canônica são descritos em [CAMPOS-INICIAIS.md](CAMPOS-INICIAIS.md). Campos sem contrato ficam pendentes; taxa, endereço ou coordenadas não são inferidos.
- Checklist de keystore e credencial referenciada de e-mail, sem imprimir o valor. A checagem confirma a referência no keystore, não a entrega a uma caixa de entrada real.

## Estado de dados e publicação

Não houve `DELETE`, `TRUNCATE`, `DROP`, reset, criação de banco/empresa, alteração de founder, sessão, MFA ou keystore, nem escrita no banco oficial. A migration `0067_browser_bootstrap_mfa_completion` foi executada somente em transação revertida para conferir sintaxe/DDL; não foi registrada no ledger persistente.

Na leitura existente antes da execução, `rotamoto_e2e` estava no migration 0066, sem empresa, com instalação concluída e latch/grant global preexistente; nenhuma autorização ativa. Essa combinação é **indisponível para uma primeira instalação**. Não foi reutilizado nem alterado o fundador. `rotamoto` não foi consultado/escrito nesta execução. A suíte HTTP/PostgreSQL de identidade foi executada em savepoints dentro de transação externa e rollback; confirmou que endpoints anteriores seguem compatíveis com 0066 e que o estado atual é fail-closed (`not_ready`). O caminho de primeira instalação permaneceu não executado.

No fim, HTTP local continuava: Restaurante 8083 = 200; página antiga `/bootstrap.html` = 404; API 8787 `/health/ready` = 200, `/api/identity/bootstrap/status` = 404; Motoboy 8084 = 200. Os serviços antigos foram preservados; os arquivos novos não foram publicados neles. O manifest do checkout tem build ID `a8d45146b9f52e5c` e `assets:check` passa.

## Evidências

- [Arquitetura e segurança](ARQUITETURA.md)
- [Campos e sugestões](CAMPOS-INICIAIS.md)
- [Browser QA](BROWSER-QA.md)
- [Testes](TESTES.md)
- [Plano separado de saneamento futuro do E2E](PLANO-LIMPEZA-E2E.md)
- [Pendências/gates](PENDENCIAS.md)

Capturas sintéticas estão em [`capturas/`](capturas/). Não contêm sessão ou segredo e não representam instalação autenticada.

## Git

Commit local Restaurante: `6821b42efc264340009454000057eeda0aea1ea3` (`feat(bootstrap): add guarded browser first-install wizard`). Motoboy: sem alteração. Push de aplicativo: nenhum. Commit/push do histórico: preencher após publicação.
