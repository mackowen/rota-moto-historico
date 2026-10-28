# Verificação manual não destrutiva no Chrome Android

Esta ação é necessária porque o perfil pessoal do Chrome não está disponível ao QA. **Não limpe dados do site nem remova o Service Worker.**

1. No mesmo Android e ambiente em que o Restaurante é acessado, abra normalmente `http://127.0.0.1:8083/` com conexão disponível.
2. Recarregue a página uma vez e aguarde o carregamento terminar.
3. Feche somente a aba do Restaurante; reabra o mesmo endereço em uma nova aba. Não use “limpar dados”, não encerre sessão e não apague armazenamento offline.
4. Entre pelo fluxo normal, se a sessão já estiver ativa. Verifique se a notificação de sucesso/erro fica totalmente acima da barra inferior e se Configurações/Rotas apresentam a interface atual.
5. Se ainda houver UI antiga ou toast atrás da barra, anote versão do Chrome/Android, horário e viewport aproximado. Envie uma captura somente sem senha, código MFA, token, nome/e-mail ou dados comerciais; pode recortar a imagem para mostrar apenas o componente.
6. Se a página não carregar offline, volte online e recarregue normalmente. Não altere permissões ou sessão.

Essa observação do proprietário não remove a necessidade de evidência técnica: registrar o resultado e manter G14 FAIL até a aprovação visual expressa.
