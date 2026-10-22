# Campanha 0293 — matriz funcional

Browser Chromium/CDP em fixture E2E autenticada, MFA verificada. Principal com company.manage, integrations.manage, members.invite, members.read, orders.manage, orders.read, sync.pull e sync.push. Fixture 12e967fd-8984-4131-922b-eb864f169f83, rotamoto_e2e, databaseCommitted=false, cleanup COMPLETED, resíduos zero. Relatório sanitizado e capturas no diretório.

| Seção/campo | Mecanismo | UI executada | Reload/nova aba | Defeito/correção | Estado |
|---|---|---|---|---|---|
| Aparência — tema | Autosave IndexedDB; botão Salvar aparência confirma gravação local | Claro, escuro e automático; botão confirmou | Navegação, reload e aba independente MFA confirmaram auto | Autosave podia renderizar depois do Salvar e apagar confirmação. updateSetting agora aplica/renderiza antes de persistir, sem render tardio | PASS_SCOPE |
| Aparência — cor | Autosave IndexedDB | Cor sintética #c32f68 | Navegação e reload mantiveram | Sem defeito adicional | PASS_SCOPE |
| Aparência — idioma | Autosave IndexedDB | en via UI; documentElement.lang atualizado | Navegação e reload mantiveram | Sem defeito adicional | PASS_SCOPE |
| Aparência — toast de confirmação (RM-AUD19-13) | Feedback visual do autosave | Toast “Aparência salva neste aparelho” capturado em 360/390/768, claro/escuro | Visível acima da navegação inferior nos seis screenshots | Nenhuma correção necessária neste subset; demais páginas/estados permanecem sem teste | PASS_SCOPE |
| Relatórios — período e gráficos | Autosave IndexedDB | 90 dias, both | Navegação e reload confirmaram | Sem defeito reproduzido | PASS_SCOPE |
| Eventos — sucesso, automáticos, erro | Autosave IndexedDB | Três preferências desativadas via UI | Navegação e reload confirmaram | Sem defeito reproduzido | PASS_SCOPE |
| Navegação — atalho Dashboard | Autosave IndexedDB | Checkbox alterado via UI | Navegação e reload preservaram | Outros atalhos não exercitados | PARTIAL |
| Impressão — enabled, mode, includeDeliveryQr | Autosave IndexedDB; permissão local admin | Três controles editáveis alterados | Navegação e reload preservaram | Sem defeito; ação Testar impressão não foi acionada | PASS_SCOPE |
| Origens — nome iFood | Autosave IndexedDB | Nome alterado para iFood 0293; sem conexão externa | Navegação e reload preservaram | Sem defeito reproduzido | PASS_SCOPE |
| Integrações administrativas | API/configuração Company | Não percorrida; nenhum segredo/conta alterado | Sem readback | Sem teste funcional | PARTIAL |
| Backup e preferências administrativas | API/configuração administrativa | Não percorrida; backup não ativado | Sem readback | Sem capacidade simulada | PARTIAL |
| Segurança local/auditoria | Preferências locais no card security-audit | Card indisponível ao principal; sem alteração | Sem readback | Sem contorno de permissão | BLOCKED — card/permissão |
| Equipe e permissões | API Company/identidade e MFA | Não percorrida; sem membro/convite alterado | Sem readback | Sem teste funcional | PARTIAL |
| Outros campos da matriz 0290 (Operação e demais) | Autosave/submissão conforme campo | Não exercitados | Sem readback | Sem defeito atribuído | PARTIAL |

## Cobertura negativa e limites

Não executados: falha IndexedDB injetada, falta de permissão via UI nos formulários, timeout, falha/resposta incompleta/readback divergente, reload durante escrita e retry de autosave. Confirmação dos autosaves é local IndexedDB, não publicação canônica. Tema visual em 360/390/768 claro/escuro sem overflow. Nenhum erro JavaScript. Android físico não testado. Não repetir Company, Logística e Frota.
