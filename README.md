# Blogs Api (Sequelize + MSC)
Neste projeto você vai encontrar uma API e um banco de dados para a produção de conteúdo para um blog! 

  A aplicação foi desenvolvida em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. API seguindo os princípios do REST;
  
  2. Para fazer um post é necessário usuário e login (Autenticação), portanto foi trabalhada a **relação entre** `user` e `post` (1:N); 

  3. É necessária a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts` (N:N).
  
  4. Foi aplicado o processo de autorização com Token.
  
  
