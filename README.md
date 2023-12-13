<div align="center">
<h1 align="center">OndeIr</h1>
<a href="https://ondeir-projeto.vercel.app/">Clique aqui para conferir</a> | <a href="https://github.com/kiq17/ondeir-back">Backend da aplicação</a>
</div>

<br>
<br>
<br>
<br>

Depois da pandemia, as pessoas ficaram com vontade de viajar, começaram a ter curiosidade sobre lugares diferentes e tiveram mais interesse em viagens.

A intenção deste projeto é criar um lugar onde as pessoas possam mostrar suas experiências e mostrar para os outros os pontos positivos e negativos dos lugares que visitaram.


## Tecnologias

- React
- React Router
- CSS
- Axios
- Yup

## Estrutura de pastas

```md
📦src
 ┣ 📂assets
 ┃ ┣ 📂compressed
 ┃ ┃ ┣ 📜cadastroCompressesd.jpg
 ┃ ┃ ┗ 📜compressedHome.png
 ┃ ┣ 📜bannerCadastro.jpg
 ┃ ┣ 📜bannerPrincipal.png
 ┃ ┣ 📜CameraCover.png
 ┃ ┣ 📜imgAbout.png
 ┃ ┣ 📜imgAbout2.png
 ┃ ┣ 📜react.svg
 ┃ ┣ 📜teste.png
 ┃ ┣ 📜user.png
 ┃ ┗ 📜ZKZg.gif
 ┣ 📂components
 ┃ ┣ 📂AboutSection
 ┃ ┃ ┣ 📜About.tsx
 ┃ ┃ ┗ 📜styleAbout.css
 ┃ ┣ 📂BestSection
 ┃ ┃ ┣ 📜Best.tsx
 ┃ ┃ ┗ 📜styleBest.css
 ┃ ┣ 📂Card
 ┃ ┃ ┣ 📜Card.tsx
 ┃ ┃ ┗ 📜styleCard.css
 ┃ ┣ 📂ChangePass
 ┃ ┃ ┣ 📜ChangePass.tsx
 ┃ ┃ ┗ 📜styleChangePass.css
 ┃ ┣ 📂Comments
 ┃ ┃ ┣ 📜CommentPost.tsx
 ┃ ┃ ┣ 📜mathReview.ts
 ┃ ┃ ┗ 📜styleCommentPost.css
 ┃ ┣ 📂DeleteModal
 ┃ ┃ ┗ 📜DeleteModal.tsx
 ┃ ┣ 📂EditPost
 ┃ ┃ ┗ 📜EditPost.tsx
 ┃ ┣ 📂EditProfile
 ┃ ┃ ┣ 📜EditProfile.tsx
 ┃ ┃ ┗ 📜styleEditProfile.css
 ┃ ┣ 📂Footer
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┗ 📜styleFooter.css
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜styleHeader.css
 ┃ ┣ 📂HomeSection
 ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┗ 📜styleHome.css
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┗ 📜styleModal.css
 ┃ ┣ 📂NewPost
 ┃ ┃ ┣ 📜Post.tsx
 ┃ ┃ ┗ 📜stylePost.css
 ┃ ┣ 📂Posts
 ┃ ┃ ┣ 📜Posts.tsx
 ┃ ┃ ┗ 📜stylePosts.css
 ┃ ┣ 📂PrivateRoute
 ┃ ┃ ┗ 📜PrivateRoute.tsx
 ┃ ┣ 📂ProfileSection
 ┃ ┃ ┣ 📜Profile.tsx
 ┃ ┃ ┗ 📜styleProfile.css
 ┃ ┣ 📂RedfinePass
 ┃ ┃ ┗ 📜RedefinePass.tsx
 ┃ ┣ 📂RegisterSection
 ┃ ┃ ┣ 📜Register.tsx
 ┃ ┃ ┗ 📜styleRegister.css
 ┃ ┣ 📂Send
 ┃ ┃ ┣ 📜Send.tsx
 ┃ ┃ ┗ 📜styleSend.css
 ┃ ┣ 📂Shared
 ┃ ┃ ┣ 📂Hooks
 ┃ ┃ ┃ ┗ 📜useMediaQuery.tsx
 ┃ ┃ ┣ 📂Select
 ┃ ┃ ┃ ┣ 📜Select.tsx
 ┃ ┃ ┃ ┗ 📜styleSelect.css
 ┃ ┃ ┣ 📂Skeleton
 ┃ ┃ ┃ ┣ 📜CardSkeleton.tsx
 ┃ ┃ ┃ ┗ 📜styleCardSkeleton.css
 ┃ ┃ ┗ 📂Tags
 ┃ ┃ ┃ ┣ 📜styleTags.css
 ┃ ┃ ┃ ┗ 📜Tags.tsx
 ┃ ┣ 📂ShowPost
 ┃ ┃ ┣ 📜ShowPost.tsx
 ┃ ┃ ┗ 📜styleShowPost.css
 ┃ ┣ 📂Toast
 ┃ ┃ ┣ 📜styleToast.module.css
 ┃ ┃ ┗ 📜Toast.tsx
 ┃ ┣ 📂VerificationField
 ┃ ┃ ┣ 📜styleVerification.css
 ┃ ┃ ┗ 📜VerificationField.tsx
 ┃ ┗ 📂VerificationRoute
 ┃ ┃ ┗ 📜VerificationRoute.tsx
 ┣ 📂context
 ┃ ┗ 📜auth.tsx
 ┣ 📂interfaces
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜loginuser.ts
 ┃ ┣ 📜place.ts
 ┃ ┣ 📜register.ts
 ┃ ┗ 📜stars.ts
 ┣ 📂pages
 ┃ ┣ 📂ChangePass
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂CreatePost
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂EditPost
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂EditProfile
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Home
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Posts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂RedefinePass
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Register
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Send
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂ShowPost
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂Verification
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂services
 ┃ ┣ 📜api.ts
 ┃ ┗ 📜states.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## Funcionalidades

- Cadastro de conta
- Criação de postagens
- Vizualização de imagens
- Comentários
- Avaliar comentário
- Avaliar postagem
- Busca por postagens

## Passo a passo

Neste vídeo abaixo você pode acompanhar com detalhes o processo de todas as funcionalidades presentes na aplicação:


## Funções protegidas

Certas funcionalidades necessitam que o usuário esteja logado para poder realizar ações, dentre elas estão:

- Criar postagem
- Criar comemtário
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

Durante o projeto aprendi bastante sobre React, uma biblioteca que já utilizava, porém foi o primeiro projeto grande que fiz usando esta ferramenta. A parte de roteamento com o React Router foi algo que agregou bastande, pois surgiu uma nova versao deste framework e precisei aprender algumas novas funcinalidades. Um ponto que tive atenção foi seprar os componentes pois como era um projeto maior do que eu estava acustumada sabia que caso nao tivesse essa separação por componentes o projeto poderia ficar bagunçado.


## Melhorias

O projeto ainda pode melhorar bastante, por isso ainda vou realizar certas atualizações como:

- Refatorações
- Testes
- Acessibilidade
- Arquitetura

Durante o projeto fui aprendendo sobre algunas tópicos que são interessantes para manter uma boa perfomance e agora vou poder focar neles.


## Feedback

Se você tiver algum feedback, por favor entre em contato pelo meu [Linkedin](https://www.linkedin.com/in/caique-de-castro-silva/)

Obrigado pela sua atenção. <a href="#top">Voltar ao topo</a>

