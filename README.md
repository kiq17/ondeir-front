<div align="center">
<h1 align="center">OndeIr</h1>
<a href="https://ondeir-projeto.vercel.app/">Clique aqui para conferir</a> | <a href="https://github.com/kiq17/ondeir-back">Backend da aplicação</a>
</div>

<br>
<br>
<br>
<br>

## Sobre

Depois da pandemia as pessoas ficaram com vontade de viajar, começaram a ter curiosidade sobre lugares diferentes e tiveram mais interesse em viagens. Mediante a este cenário surgiu à intenção de criar um lugar onde as pessoas possam mostrar suas experiências e mostrar para os outros pontos positivos e negativos dos lugares que visitaram.

## Aviso

Esta aplicação está utilizando serviços gratuitos e por conta disto o carregamento de algumas funcionalidades podem ser impactadas. O primeiro acesso à página gera um carregamento mais lento dos dados vindos da API, mediante a isso é necessário esperar cerca de dois minutos até que sejam carregadas as informações que dependem realizar requisições.

## Progresso

Desde o início do projeto alterações estão sendo implementadas com o intuito de aprimorar e atualizar a aplicação.

- JavaScript -> TypeScript
- CSS -> Tailwind
- Arquitetura Limpa (Em andamento)
- Teste automatizados (Em andamento)
- Novo Desgin (Atualização futura)
- Autenticação dois fatores (Atualização futura)

## Funcionalidades

- Cadastro de conta com verificação por e-mail
- Editar dados da conta
- Criação e editar de postagens
- Visualização de imagens
- Comentários
- Avaliar comentário
- Avaliar postagem
- Busca por postagens

## Estrutura de pastas

```md
📦src
 ┣ 📂assets
 ┃ ┣ 📂compressed
 ┣ 📂components
 ┃ ┣ 📂AboutSection
 ┃ ┣ 📂BestSection
 ┃ ┣ 📂Card
 ┃ ┣ 📂ChangePass
 ┃ ┣ 📂Comments
 ┃ ┣ 📂DeleteModal
 ┃ ┣ 📂EditPost
 ┃ ┣ 📂EditProfile
 ┃ ┣ 📂Footer
 ┃ ┣ 📂Header
 ┃ ┣ 📂HomeSection
 ┃ ┣ 📂Modal
 ┃ ┣ 📂NewPost
 ┃ ┣ 📂PlacesUser
 ┃ ┣ 📂Posts
 ┃ ┣ 📂PrivateRoute
 ┃ ┣ 📂ProfileSection
 ┃ ┣ 📂RedfinePass
 ┃ ┣ 📂RegisterSection
 ┃ ┣ 📂Send
 ┃ ┣ 📂Shared
 ┃ ┃ ┣ 📂Hooks
 ┃ ┃ ┣ 📂Select
 ┃ ┃ ┣ 📂Skeleton
 ┃ ┃ ┗ 📂Tags
 ┃ ┣ 📂ShowPost
 ┃ ┣ 📂Toast
 ┃ ┣ 📂VerificationField
 ┃ ┗ 📂VerificationRoute
 ┣ 📂context
 ┣ 📂interfaces
 ┣ 📂pages
 ┃ ┣ 📂ChangePass
 ┃ ┣ 📂CreatePost
 ┃ ┣ 📂EditPost
 ┃ ┣ 📂EditProfile
 ┃ ┣ 📂Home
 ┃ ┣ 📂Posts
 ┃ ┣ 📂Profile
 ┃ ┣ 📂RedefinePass
 ┃ ┣ 📂Register
 ┃ ┣ 📂Send
 ┃ ┣ 📂ShowPost
 ┃ ┗ 📂Verification
 ┣ 📂services
 ┣ 📜App.tsx
```

## Passo a passo

Neste vídeo abaixo você pode acompanhar com detalhes o processo de todas as funcionalidades presentes na aplicação:

[![Vídeo do projeto](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fyoutu.be%2F83kpZzXbVx0)](https://youtu.be/83kpZzXbVx0)

## Funções protegidas

Certas funcionalidades necessitam que o usuário esteja logado para poder realizar ações, dentre elas estão:

- Criar postagem
- Criar comentário
- Avaliar postagem
- Avaliar comentário

## Rotas

```
    /cadastro

    /novo
      
    /editar/:id

    /postagens

    /perfil/:userId

    /post/:id

    /enviar

    /redefinir/:userId

    /perfil/editar/:userId

    /perfil/senha/:userId
```


## Aprendizados

Durante o projeto aprendi bastante sobre React, uma biblioteca que já utilizava, porém foi o primeiro projeto grande que fiz usando esta ferramenta. A parte de roteamento com o React Router foi algo que agregou bastante, pois surgiu uma nova versão deste framework e precisei aprender algumas novas funcionalidades. Um ponto que tive atenção foi separar os componentes, pois como era um projeto maior do que eu estava acostumado a fazer e razão disso sabia que caso não tivesse essa separação por componentes o projeto poderia ficar bagunçado.


## Feedback

Se você tiver algum feedback, por favor entre em contato pelo meu [Linkedin](https://www.linkedin.com/in/caique-de-castro-silva/)

Obrigado pela sua atenção. <a href="#top">Voltar ao topo</a>

