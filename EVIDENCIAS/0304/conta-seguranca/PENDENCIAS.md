# Pendências remanescentes

- Homologação física do proprietário no Chrome Android, incluindo teclado virtual e rolagem real. As medidas 390×844/768×1024/1440×900 desta entrega vieram do Chromium isolado.
- Os serviços fixos 8083/8084 não foram atualizados nesta execução; Browser QA ocorreu por proxy isolado servindo os checkouts atuais contra a API E2E. Não afirmar publicação dos novos assets nesses hosts.
- Verificação operacional de entrega de email em ambiente com SMTP; foi testado somente o sink sintético de recuperação.
- Expiração natural de sessão e revogação concorrente em sessão independente permanecem fora desta execução. O comportamento de revogação atual é coberto pelos testes transacionais existentes e pelos fluxos executados, sem uso de outra identidade real.
- Auditoria preventiva visual e ciclo persistir/reload individual de Equipe e permissões, Integrações, Super ADM Global, Backup, Sistema Local e Laboratório Avançado continuam no backlog. `npm test` não os converte em PASS por seção.
- Os itens canônicos `RM-D1-SETTINGS-SAVE`, `RM-D1-MFA-STATE` e `RM-0256B-ACCOUNT` continuam PARTIAL; esta evidência cobre somente Conta e segurança nos fluxos disponíveis.
- O bootstrap de primeira instalação não foi executado; o fundador persistente foi preservado.
- G14 continua FAIL por exigir aprovação visual expressa do proprietário; Campanha 0304 continua aberta, 0305 não iniciada.
