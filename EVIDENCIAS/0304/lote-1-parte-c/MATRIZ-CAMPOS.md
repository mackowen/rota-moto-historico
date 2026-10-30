# Matriz de campos — Parte C

O escopo da Parte C é amplo; esta matriz separa inventário/reaproveitamento de evidência desta execução. “Não testado nesta parte” não significa defeito nem PASS. Não houve gravação no banco oficial ou no `rotamoto_e2e` persistente.

| Aplicativo | Tela/categoria | Campo ou grupo | Fonte canônica | Salvamento | Evidência desta parte | Estado |
|---|---|---|---|---|---|---|
| Motoboy | Ajustes → Visual do aplicativo | Tema, cor, contraste, idioma | IndexedDB local do dispositivo, explicitado pela UI | Autosave local | Teste determinístico da fila real de gravação em `tests/test-settings-write-serialization.js`; cobre corrida entre alterações gerais e aparência, ACK e manutenção do draft | PASS para a corrida; cobertura de cada campo/reload Browser permanece PARTIAL |
| Motoboy | Ajustes → Operação | Taxas, custos, raio, retornos e opções operacionais locais | IndexedDB conforme propriedade declarada no `settingsScopeNote` | Salvar explícito/auto conforme controles | Contratos `test-configuration-ownership.js`; não houve round-trip de cada campo nesta parte | PARTIAL |
| Motoboy | Home → meta diária | Meta pessoal diária | IndexedDB local, perfil do Driver no dispositivo | Salvamento explícito | Regressão `test-driver-owned-goal-persistence.js`; não alterada nesta parte | PARTIAL |
| Motoboy | Conta/identidade | Identidade, vínculo Driver e sessão | API canônica/PostgreSQL; distinta dos perfis locais | API autenticada | Browser QA autenticado anterior da Parte B cobriu login MFA, Driver vinculado, reload e logout; reaproveitado apenas nesse escopo | PASS limitado ao fluxo Parte B |
| Restaurante | Ajustes → Perfil da empresa | Nome empresarial sintético | API de Company Profile/PostgreSQL | Salvamento explícito | Browser autenticado Parte C: UI recebeu HTTP 200, readback canônico, revisão obsoleta 409 e reload; fixture transacional revertida | PASS limitado ao campo |
| Restaurante | Ajustes | Endereço, logística, aparência, segurança, integrações, backup, equipe e demais campos | APIs e/ou estado local segundo o módulo | Varia por contrato | Não percorridos individualmente nesta parte | PENDING |
| Ambos | Equipe, convites, perfis e permissões | Identidade/RBAC/associações | API/PostgreSQL com tenant, MFA/CSRF e auditoria conforme operação | API autenticada | Contratos e testes completos passaram; CRUD integral de todos os ciclos não foi executado nesta parte | PARTIAL |

## Contagem estrita

- Campos individualmente modificados e relidos nesta parte: 1 (nome do Company Profile no fixture sintético descartável).
- Campos anteriormente comprovados e reaproveitados: identidade/sessão e os fluxos explicitados na Parte B.
- Preferência Motoboy com corrida de escrita testada nesta parte: propriedade `theme` no teste; round-trip autenticado Browser ainda não comprovado nesta parte.
- Campos individuais integralmente homologados pela matriz ampla Parte C: 0.
