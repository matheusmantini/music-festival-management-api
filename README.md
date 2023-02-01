<h1 align="center"> Projeto Music Festival Management - Back-end </h1>

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![REST](https://img.shields.io/badge/REST%20API-%231572B6.svg?style=for-the-badge)

<p align="center">> Status do Projeto: Concluído :heavy_check_mark:</p>
<p align="center">> Informações do Projeto: Utilização de POO e Clean Architecture</p>
    
## Funcionalidades

- **Autenticação (Auth)**

- [x] Fazer Login
- [x] Revalidar refresh token expirado

- **Usuário (User)**

- [x] Criar novo usuário
- [x] Listar todos os usuários cadastrados
- [x] Listar as informações de um usuário específico pelo email

- **Banda (Band)**

- [x] Criar nova banda
- [x] Listar todas as banda cadastradas
- [x] Listar as informações de uma banda específica pelo id

- **Show (Show)**

- [x] Criar novo show
- [x] Listar shows pelo dia da semana

- **Ingressos (Ticket)**

- [x] Criar novo ingresso
- [x] Comprar um ingresso

- **Foto (Photo)**

- [x] Adicionar o link de uma nova foto
- [x] Listar todas as fotos específicas pelo id do show


## Como rodar a aplicação:

1. No terminal, clone o projeto:
> git clone https://github.com/matheusmantini/music-festival-management-api.git

2. Entre na pasta do projeto:
> cd music-festival-management-api

3. Instale as dependências:
> npm install

4. Altere o arquivo '.env. com as informações do seu banco de dados

5. Gere o prisma client:
> npx prisma generate

6. Faça a migração das tabelas para o seu banco de dados
> npx prisma migrate dev

7. Execute a aplicação:
> npm run start

8. Pronto, agora é possível acessar a aplicação a partir da rota http://localhost:3000

## Desenvolvedor

| [<img src="https://avatars.githubusercontent.com/u/71985890?v=4" width=115 > <br> <sub> Matheus Mantini </sub>](https://github.com/matheusmantini) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
