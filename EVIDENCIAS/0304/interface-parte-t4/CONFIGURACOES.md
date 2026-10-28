# Configurações — T4-04/T4-05

**Estado: PARTIAL; nenhuma correção de Configurações foi necessária com evidência atual.**

## Restaurante

- A função `settings()` em `app.js` organiza as seções; os handlers em `bind()` conectam as seções e ações.
- Preferências locais usam `updateSetting()` → `saveSettings()`, com persistência local, releitura/estado de gravação e feedback. A aparência possui botão de confirmação explícito e estado de sucesso/erro.
- Perfil empresarial usa `publishCompanyProfile()` (`PUT /admin/company/profile`) com CSRF, revisão esperada, validação e readback. Fuso horário segue `/admin/company` e `saveCompanyTimeZone()`. Campos gerais mantêm rascunho e sinalização de alteração.
- Os testes `test-appearance-settings.js`, `test-company-settings.js` e `test-company-settings-persistence.js` passaram na suíte completa; cobrem contrato/persistência/falha, não navegação autenticada visual.

## Motoboy

Nenhuma mudança em Configurações foi feita: T4 não reproduziu defeito funcional em perfil ou preferências; a parte compartilhada comprovada foi o posicionamento do toast. Não foram adicionadas preferências sem contrato.

## Limite

Não havia sessão autorizada de navegador autenticado disponível para confirmar permissões, salvamento/readback na API real, formulário com teclado Android ou gestão financeira em UI. Não se declara PASS ponta a ponta nem se alteraram grants/perfis.
