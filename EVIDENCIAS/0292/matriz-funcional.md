# Campanha 0292 — matriz funcional (formulários executados)

Browser Chromium/CDP autenticado com sessão HttpOnly emitida pelo backend E2E, MFA verificada e `company.manage`. Banco `rotamoto_e2e`; fixture `3caec691-f414-40e2-92b9-dc7f8c4a2d17`; `databaseCommitted=false`, cleanup `COMPLETED`, resíduos tenant-scoped zero. Evidência sanitizada em `company-ui.json`; screenshots desta campanha. Nenhum registro persistiu fora da fixture.

| Seção/campo | Mecanismo | UI + request/ACK | Readback/reload/aba independente | Defeito/correção | Resultado |
|---|---|---|---|---|---|
| Empresa — nome | Publicar perfil, PUT revisionado + GET | UI PUT `/api/admin/company/profile` 200; duplo clique gerou uma escrita | GET canônico; navegação, reload e nova aba confirmaram | 503 preservou rascunho sem sucesso falso; retry confirmou; toast pós-confirmação | PASS no campo exercitado |
| Empresa — telefone | Publicar perfil, PUT revisionado + GET | Mesmo formulário; PUT 200 | GET, navegação, reload e nova aba confirmaram | Mesmo 503/retry do formulário; rascunho preservado | PASS no campo exercitado |
| Empresa — fuso horário | Save explícito, PUT expectedVersion + GET | `America/Fortaleza` 200; `Not/AZone` bloqueado sem request | Revisão 3; navegação, reload e nova aba confirmaram | `render()` apagava status; status/toast reimpostos após render, inclusive reconciliação | PASS no campo exercitado |
| Empresa — endereço | Save geral, PUT `/api/admin/company/location` | UI PUT 200, revisão 1 | GET canônico; coordenadas null mantidas; navegação, reload e nova aba | Logística aplicava `toFixed` a null; projeção agora mostra endereço e coordenadas desconhecidas | PASS no fluxo exercitado |
| Logística — projeção do endereço | Leitura da Company canônica | Aberta após salvar endereço pela UI | Endereço visível, sem `NaN`/`undefined`; coordenadas desconhecidas | Corrigido render de localização sem par de coordenadas válido | PASS na regressão |
| Frota | Nenhum teste novo; campanha 0291 já cobre subset | Não repetida | Sem readback nesta campanha | Nenhuma | PARTIAL |
| Ajustes do Motoboy | Projeção read-only, se aplicável | Não aberto | Não exercitado | Nenhuma | BLOCKED nesta execução |

## Checklist restante sem comprovação nesta campanha

Nenhum item abaixo recebe PASS. Permanecem sem Browser 0292 e preservam seu estado histórico PARTIAL/sem comprovação: Operação (modelo de taxa, taxa mínima, valor/km, taxa fixa, arredondamento/incremento, faixas de distância, modo/percentual de repasse, política de agrupamento Company, organização/alternância de rota); Aparência (tema, cor, idioma); Relatórios (período/gráficos); Eventos/notificações (sucesso, automáticos, erros); Navegação (cada atalho); Impressão (habilitada, modo, QR; impressão é ação imediata); Origens (nome, ativa, IDs/mapeamento); Integrações (preferências iFood/99 Food/Keeta); Backup (frequência, hora, retenção, destino, metas/quotas); Segurança local (retenção/histórico); Equipe (usuários, convites, perfis); Dados locais (exportar/importar/apagar são ações imediatas). A lista não afirma defeito ou capacidade inexistente.

## Browser e falhas cobertas

- Viewports 360, 390 e 768 px, claro/escuro: zero overflow horizontal.
- Sessão sintética MFA verificada; chamadas de configuração do subset retornaram 200; sem exceções JavaScript e sem HTTP 5xx inesperado.
- O Browser 0292 exercitou resposta HTTP 503 interceptada em publicação de perfil, preservação do rascunho, ausência de toast falso, retry e clique duplo (uma escrita). Também validou valor inválido no fuso sem request. Não executou 400, 401/403 via UI, 409, 500, timeout, ACK perdido, resposta incompleta, readback divergente, reload durante escrita, localização coordenada válida, Motoboy nem outros formulários pendentes.

## Formulários restantes

Aparência/tema/cor/idioma, Relatórios, Eventos/notificações, Navegação, Impressão, Origens de pedidos, Integrações, Backup, Segurança local, Equipe/permissões e demais campos listados no inventário 0290 não foram percorridos nesta campanha; preservar o estado BLOCKED/PARTIAL individual da matriz herdada. Logística/Frota não foram repetidas além da regressão de projeção do endereço.

## Arquivos

- [Relatório sanitizado do Browser](company-ui.json) e capturas `company-form-*` / `logistics-address-only-390.png`.
- `npm test` Restaurante completo: exit 0; regressões específicas, `node --check` e `git diff --check` passaram.

Este resultado não comprova PASS_GLOBAL RM-AUD19-02/10 nem visualização no Motoboy. HTTP 400, 401/403, 409, 500, timeout, ACK perdido, resposta incompleta, readback divergente e reload durante escrita não foram exercitados.
