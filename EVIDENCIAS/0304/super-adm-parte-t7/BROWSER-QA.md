# Browser QA — T7-01..08

Chromium 155 isolado, perfil temporário novo, renderização software/CDP. Shell público Restaurante 8083: HTTP 200; título e raiz de identidade presentes; app operacional permaneceu oculto por falta de sessão; zero exceções JavaScript. API 8787 readiness: 200. GET dos endpoints Usuários/Vínculos sem sessão: 401, conforme controle de acesso.

Harness sintético usa o CSS real de `identity-ui.css` e exemplos identificados como sintéticos. Capturas: `t7-super-admin-{light,dark}-{320,390,768,1024,1440}.png`; medições e contraste em `browser-measurements.json`. 10/10 combinações sem overflow e sem texto abaixo do threshold usado. Não foi usado perfil pessoal, cookie, senha ou código MFA. Browser QA autenticado fica BLOCKED; capturas não aprovam as telas reais.
