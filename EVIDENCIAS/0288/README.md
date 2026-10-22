# Evidências 0288

Browser real via Chromium/CDP com fixture sintética e MFA gerada para E2E. Nenhuma credencial, TOTP, cookie ou header de autorização está arquivado.

| Arquivo | Evidência |
|---|---|
| `before-login-sync-account.png` | Antes da correção: tela Conta cobre o Restaurante durante pull pendente. |
| `home-{360,390,768}-{light,dark}.png` | Home após correção, viewport e tema. |
| `account-{360,390,768}-{light,dark}.png` | Conta manual após correção, viewport e tema. |
| `fixture-cleanup.json` | Manifest sanitizado: fixture concluída, rollback e zero resíduos. |
| `browser-flow.json` | Resultado sanitizado do fluxo e checks HTTP/navegação. |

O Browser exercitou login pelo formulário com credenciais sintéticas e segundo fator TOTP válido. A sessão foi emitida pelo backend. A leitura inicial 401 sem cookie antecedeu o login; após login, sessão respondeu 200. Logout/revogação voltou a 401. A expiração natural por TTL não foi simulada.
