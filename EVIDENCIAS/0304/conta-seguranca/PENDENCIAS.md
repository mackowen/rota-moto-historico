# Pendências remanescentes

- Homologação física do proprietário no Chrome Android, incluindo teclado virtual e rolagem real. As medidas 390×844/768×1024/1440×900 desta entrega vieram do Chromium isolado.
- O registro de 2026-10-31 acima refletia o estado daquele momento. Nesta revisão de 2026-11-01, hashes HTTP confirmaram os assets atuais dos checkouts em 8083/8084; não há pendência de publicação estática para esta revisão.
- Verificação operacional de entrega de email em ambiente com SMTP; foi testado somente o sink sintético de recuperação.
- Expiração natural de sessão e revogação concorrente em sessão independente permanecem fora desta execução. O comportamento de revogação atual é coberto pelos testes transacionais existentes e pelos fluxos executados, sem uso de outra identidade real.
- Auditoria preventiva visual e ciclo persistir/reload individual de Equipe e permissões, Integrações, Super ADM Global, Backup, Sistema Local e Laboratório Avançado continuam no backlog. `npm test` não os converte em PASS por seção.
- Os itens canônicos `RM-D1-SETTINGS-SAVE`, `RM-D1-MFA-STATE` e `RM-0256B-ACCOUNT` continuam PARTIAL; esta evidência cobre somente Conta e segurança nos fluxos disponíveis.
- O bootstrap de primeira instalação não foi executado; o fundador persistente foi preservado.
- G14 continua FAIL por exigir aprovação visual expressa do proprietário; Campanha 0304 continua aberta, 0305 não iniciada.

## Atualização de 2026-11-01

- **Aguardando proprietário:** conferir no Chrome Android a disposição dos diálogos, especialmente com teclado real e safe areas. O viewport 390×500 é uma simulação CDP e não substitui o teclado físico nem a aprovação expressa.
- **Aguardando proprietário:** aprovação visual geral; G14 permanece FAIL e não foi inferida das capturas sintéticas.
- O fluxo de recuperação foi exercido pelo sink de email de teste; entrega SMTP real continua fora da validação.
- A confirmação de senha/MFA e os diálogos de vínculo/regeneração passaram no QA sintético autenticado; os itens canônicos `RM-D1-SETTINGS-SAVE`, `RM-D1-MFA-STATE` e `RM-0256B-ACCOUNT` continuam PARTIAL por seu escopo global mais amplo.
- Não houve escrita persistente em `rotamoto`/`rotamoto_e2e` fora da fixture rollback-only, nem migration aplicada nesta revisão.

## Refinamento compacto — 2026-11-01

- **Pendente do proprietário:** confirmar a compactação recém-publicada no Chrome Android físico. As capturas e medidas em `compactacao-2026-11-01/` vieram de Chromium isolado, mesmo com autenticação sintética.
- A alteração visual não reduz nem reclassifica os IDs abrangentes `RM-0256B-ACCOUNT`, `RM-D1-MFA-STATE` ou `RM-D1-SETTINGS-SAVE`; seus critérios globais permanecem PARTIAL.
- Sem pendências conhecidas de entrega estática: os arquivos alterados estão presentes em 8083/8084 com SHA-256 igual ao checkout.
- G14 permanece FAIL; Campanha 0304 permanece aberta; Campanha 0305 não iniciada.
