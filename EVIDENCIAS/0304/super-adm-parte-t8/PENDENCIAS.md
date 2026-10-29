# Pendências — Parte T.8

| Gate | Estado | Pendência / próxima ação |
|---|---|---|
| T8-01 | PASS técnico | Proprietário confirmar que a mensagem de carregamento desaparece no Chrome Android após abrir cada seção. |
| T8-02 | PASS técnico | Troca real autenticada de abas não foi exercitada por CDP. |
| T8-03 | PARTIAL | Erros HTTP reais do Super ADM não foram solicitados sem sessão. |
| T8-04 | PARTIAL | Catálogo conhecido foi traduzido e testado; identificadores desconhecidos mantêm detalhe técnico apropriado. Confirmar textos no uso real. |
| T8-05 | PASS sintético | Proprietário confirmar abrir/recolher consulta de empresa no Android. |
| T8-06 | PASS sintético | Proprietário confirmar abrir/recolher os perfis e a confirmação de rascunho no Android. |
| T8-07 | PARTIAL | Não houve edição/salvamento autenticado de permissões; não foi alterado grant real. |
| T8-08 | PASS técnico | Guardas não foram relaxados; teste com sessão real não executado. |
| T8-09 | PASS sintético | Medições do harness cobrem as larguras pedidas, não todas as seis seções autenticadas. |
| T8-10 | PASS automatizado | Contrato compartilhado e suítes passaram; não houve E2E autenticado entre aplicativos. |
| T8-11 | PASS | Publicação local 8083 e hashes dos seis arquivos conferidos. |
| T8-12 | BLOCKED | QA autenticado no Chrome Android depende da sessão legítima já aberta pelo proprietário. Não tocar perfil, armazenamento, cookies ou credenciais. |

O proprietário já forneceu o código da empresa anteriormente; ele não foi solicitado novamente nem incluído em evidência. Para a conferência visual, navegar no aparelho já autenticado em Ajustes → Super ADM Global → Perfis e permissões, confirmar que o carregamento encerra, que “Consultar perfis e permissões” e “Ver permissões” alternam abrir/recolher e que a descrição “Consultar alterações sincronizadas” está legível. Essa conferência não exige alterar nem salvar grants.

G14 **FAIL** até aprovação visual expressa. Campanha 0304 aberta; Campanha 0305 não iniciada.
