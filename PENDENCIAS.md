# Pendências

## Alta prioridade — antes de expor operações ou dados reais fora do host local

- [ ] Manter o serviço Node em loopback até existir autenticação humana e autorização tenant server-side. Proteção atual: Registro 0009; não remover sem concluir as fases 1–3.
- [ ] Provisionar PostgreSQL e secret manager/KMS em ambiente apropriado; definir migrations, backup/restore e gestão/rotação de chaves.
- [ ] Implementar migrations para User, Credential, RecoveryToken, Company, Membership, Session, Role/Permission, Integration, ExternalAccount, audit log, canonical ID map e inbox/outbox persistentes.
- [ ] Implementar processo operacional auditável de criação de tenant/owner com prova de titularidade, convite de uso único e verificação/entrega de email.
- [ ] Implementar credencial Argon2id, verificação e recuperação de conta; MFA para operações globais/administrativas; gestão de sessões, limites e revogação.
- [ ] Implementar sessão opaca em cookie Secure/HttpOnly/SameSite, rotação, CSRF, expiração idle/absoluta e troca de empresa verificada em membership.
- [ ] Implementar catálogo server-side de permissões, roles por tenant, negação por padrão, prevenção de autoconcessão e autorização por ação/recurso/empresa em toda rota humana.
- [ ] Atualizar rotas iFood, Keeta e 99Food: sessão humana para ações de operador; caller de worker escopado; webhooks com autenticação/replay/deduplicação persistentes; vínculos merchant/shop/store confirmados; secrets no secret manager. CORS permanece apenas política de navegador.
- [ ] Implementar contexto tenant transacional, constraints e RLS default-deny em tabelas tenant-scoped; testar bypass, troca de tenant e conexões reutilizadas.
- [ ] Implementar mapeamento/reconciliação dos IDs locais por instalação e migração de `company_local` sem colisão nem fusão entre empresas; manter IDs de Order/Delivery relacionados.
- [ ] Migrar sync/offline com autorização no servidor, idempotência persistente, validação de revision/tombstone, conflitos explícitos e política de reautenticação; nunca aceitar identidade/permissão do payload local.
- [ ] Restringir import/export autenticado a dados operacionais permitidos; rejeitar entidades de acesso e segredos; validar tenant/schema/tamanho/referências e auditar conflito/resultado.
- [ ] Criar e executar suites automatizadas de credenciais, sessão/CSRF, catálogo RBAC, autorização horizontal/vertical, isolamento tenant/RLS, replay, webhooks, offline, import e migração com dados sintéticos antes do rollout.

## Ordem de execução

1. Infraestrutura PostgreSQL/KMS/email e política operacional de tenant.
2. Schema/migrações e IDs canônicos/mapeamento local.
3. Convites, credenciais, sessão e recuperação.
4. Autorização e tenant context/RLS; proteger APIs humanas.
5. External Accounts, webhooks e workers.
6. Sync/offline/import/export e migração de dados.
7. Verificação automatizada e rollout controlado.

As decisões arquiteturais foram adotadas em `DECISOES.md` (DEC-0002). As fases 1–7 ainda não estão implementadas; a contenção do listener está concluída. Não expor backend com dados reais antes dos itens bloqueadores acima.

## Histórico resolvido

- Registro 0006: corpo HTTP acima de 1 MiB recebe 413.
- Registro 0007: gravação principal do estado Motoboy é atômica.
- Registro 0008: estado, evento operacional e outbox Motoboy são persistidos na mesma transação; `npm test` padrão do Motoboy executa a suíte.
- Registro 0009: serviço de integrações Restaurante recusa inicialização em host não-loopback enquanto não houver autenticação humana/tenant. Isso reduz exposição acidental, mas não substitui autenticação das rotas locais.
- Registro 0010: renderização do Restaurante não reflete status desconhecido fornecido por backup ou integração como HTML; fallback seguro e teste contra markup malicioso adicionados.

## Revisão do Registro 0009 — 2026-10-01

As pendências foram convertidas em fases de implementação sob DEC-0002. A barreira de loopback foi implementada no Restaurante. Nenhuma fase dependente de PostgreSQL, KMS/secret manager ou email foi marcada como concluída; não expor operações ou dados reais externamente antes de implementar autenticação e autorização tenant server-side. Consulte o Registro 0009.


## Revisão do Registro 0011 — 2026-10-01

Corrigida a precedência incorreta entre uma entrega e um tombstone mais antigo no mesmo pacote recebido pelo Restaurante. Segue como próximo passo técnico recomendado acrescentar testes executáveis de falha/recuperação para recebimentos multi-store. As pendências de backend/identidade acima continuam abertas.

## Revisão do Registro 0012 — 2026-10-01

O Restaurante agora confirma se o `packetId` já foi recebido dentro da transação que grava domínio e recibo, prevenindo reaplicação concorrente do mesmo pacote. A cobertura atual verifica a estrutura do fluxo por teste automatizado de sincronização; um teste executável com IndexedDB simulado para abortos/recuperação de transações multi-store continua como possível próximo passo. As pendências de backend/identidade, tenant e infraestrutura permanecem abertas.

## Revisão do Registro 0013 — 2026-10-01

O Motoboy agora recupera a abertura do IndexedDB após erro, fecha conexões em `versionchange` e trata abertura bloqueada sem vazar uma conexão que conclua tardiamente. Foi acrescentado teste isolado do ciclo de vida da conexão. Permanecem abertas as pendências de backend/identidade, tenant e infraestrutura; testes de abortos reais de transações multi-store seguem como possível trabalho futuro.

## Revisão do Registro 0014 — 2026-10-01

Corrigida a exclusão parcial do histórico no Motoboy: tombstones, corridas, projeções, eventos, outbox e demais stores afetados agora participam de uma transação, e a UI só atualiza após `oncomplete`. Próxima lacuna técnica específica desta frente: exercitar abort/falha/retentativa das transações multi-store do Motoboy e do recebimento no Restaurante com IndexedDB simulado leve ou em runtime que o forneça. O ambiente atual não tem IndexedDB nem simulador; os testes desta etapa confirmam estruturalmente a ordem e o escopo transacional. Pendências de backend/identidade, tenant e infraestrutura seguem abertas.

## Revisão do Registro 0015 — 2026-10-01

Concluída a lacuna de teste da fronteira de recebimento: o Motoboy agora grava projeções atualizadas e recibo atomicamente e publica a memória só após commit; testes nos dois projetos verificam erro e abort após writes staged, rollback de stores, ausência de atualização em memória/UI, retry e idempotência. A arquitetura global ainda não tem uma fronteira geral entre comando de negócio e estado mutável: `persistOnly` persiste a projeção atual e não desfaz por si só mutações antecipadas feitas por seus chamadores. Próximo ponto técnico concreto: introduzir uma fronteira de comando para as operações gerais Motoboy que hoje mutam `state` antes de `persistOnly`, começando pelos fluxos de corrida e ajustes, com rollback de memória sem sobrescrever operações concorrentes. Para validação nativa de IndexedDB, executar esses mesmos invariantes em runtime que o forneça; os testes locais atuais modelam somente commit/erro/abort na fronteira de transação. Pendências de identidade, tenant e infraestrutura permanecem abertas.


## Revisão do Registro 0016

A fila de snapshots protege os comandos de corrida migrados. Continua pendente completar a fronteira para salvamento/autosave de ajustes, tema/idioma/fechamento diário, exclusão com tombstone atômico e outros mutadores de rota/GPS que persistem após alteração global. Testes de IndexedDB nativo permanecem limitados ao runtime apropriado.


## Revisão do Registro 0017

Resolvida a exclusão de corrida fora da fronteira: corrida/projeção e tombstone agora confirmam juntos via `commitRiderCommand`, e replay de exclusão de ID ausente é no-op. Os ajustes foram tratados no Registro 0018. Mutadores gerais de rota/GPS que persistem após alteração global permanecem fora desta sequência de escopo restrito. QA Chromium concluiu sem SIGKILL; o stderr de desligamento mencionou GPU após QA, sem falha durante o fluxo.

## Revisão do Registro 0018

Autosave/salvamento de settings, tema/idioma e fechamento diário agora serializam snapshots via `commitRiderCommand`; falha de persistência preserva o estado ativo. Cobertura estrutural passou, junto à suíte padrão. Ainda não foi validada transação IndexedDB nativa neste registro. Mutadores gerais de rota/GPS não foram migrados; permanecem como trabalho técnico separado. Nenhuma decisão arquitetural nova foi necessária.


## Revisão do Registro 0019

Corrigidos: transação parcial de normalização inicial; publicação prematura em cálculo de distâncias/ordem e GPS; importação de backup antes da persistência; exclusão/limpeza sem coordenação com a fila e backup; recebimento que não retinha tombstone e podia reaplicar entrega antiga; escape de IDs/assinatura em HTML.

Pendente P1: a fila `commitRiderCommand` é local à instância JavaScript. Duas abas simultâneas podem calcular snapshots independentes e uma gravação posterior pode substituir a mais recente; esta rodada não introduziu lock/CAS entre abas para evitar ampliar a arquitetura sem cobertura de runtime. Também não há teste com IndexedDB nativo neste runtime.

Limitação existente: atualização de `localStorage` após commit continua best-effort; falha de quota/escrita é registrada no console, mantendo IndexedDB como estado principal. Browser QA não executado.
