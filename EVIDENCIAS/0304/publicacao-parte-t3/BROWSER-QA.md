# T3-11/T3-12 — Browser QA

Chromium 155.0.8059.79, Termux aarch64, headless/SwiftShader, CDP em porta aleatória e perfil temporário por execução. CDP persistente 9222 não respondeu. O qa-profile tinha locks Singleton prévios; não foi aberto, copiado nem limpo.

| App | Porta | Viewport | Resultado público | SW/cache |
|---|---:|---:|---|---|
| Restaurante | 8081 | 320×700 | scrollWidth 320, login visível | ativo, um cache |
| Restaurante | 8081 | 390×844 | scrollWidth 390, login visível | ativo, um cache |
| Motoboy | 8082 | 320×700 | scrollWidth 320, login visível | ativo, cache presente |

Nenhum erro JS ou falha estática foi observado no smoke Restaurante. Motoboy passou asserção de tela/login/largura/SW. Capturas em IMAGENS são apenas da tela pública. Não representam telas autenticadas nem aprovação do proprietário.

T3-12 BLOCKED: sessão autorizada não estava disponível ao runner. Não houve leitura ou extração de cookie/token, tentativa de contornar MFA ou alteração de RBAC. Tema e fluxos protegidos não foram testados.
