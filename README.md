# Blogs Api (Sequelize + MSC)
Neste projeto você vai encontrar uma API e um banco de dados para a produção de conteúdo para um blog! 

  A aplicação foi desenvolvida em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. API seguindo os princípios do REST;
  
  2. Para fazer um post é necessário usuário e login (Autenticação), portanto foi trabalhada a **relação entre** `user` e `post` (1:N); 

  3. É necessária a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts` (N:N).
  
  4. Foi aplicado o processo de autorização com Token.
  
<details>
  <summary><strong>‼️ Acessando Localmente</strong></summary><br/>
   Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior.


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
</details>
