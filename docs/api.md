# Implementação Técnica - Sistema de Bilheteria para Cassino

## Visão Geral

Esta documentação detalha a implementação técnica do sistema de bilheteria para cassino, utilizando **NestJS** e **MongoDB**. Foram criados diversos endpoints para gerenciamento de eventos, compra de ingressos, e autenticação de usuários.

## Especificações do Sistema

### Banco de Dados

O sistema utiliza **MongoDB** como banco de dados para armazenar as informações dos eventos, ingressos e usuários. O **Mongoose** foi utilizado para interagir com o banco e gerenciar esquemas e validações de dados.

---

## Autenticação

Foi implementado um sistema de **autenticação JWT** para proteger rotas sensíveis, como a compra de ingressos, criação de eventos e o acesso aos dados dos usuários. O token JWT é gerado no login do usuário e deve ser enviado no cabeçalho de autorização (`Authorization: Bearer <token>`) para acessar as rotas protegidas. 

**IMPORTANTE:** O token (JWT) expira após 12 horas depois que é gerado, então em tese ele é valido para acessar as rotas seguras por apenas 12 horas, sendo assim após expirado é necessário realizar o login novamente para gerar um novo token (JWT)!

---

## Importação e Configuração de Testes para Postman e Insomnia

Este repositório contém dois arquivos `.json` que você pode utilizar para realizar testes na API com o Postman ou o Insomnia. Abaixo estão as instruções para importar essas coleções e configurar o ambiente de testes.

- **Arquivos .json**  [postman.json | insomnia.json](./)

### 1. Importação das Coleções

#### **Para Postman**
1. Abra o Postman.
2. Clique em **"Import"** no canto superior esquerdo.
3. Na aba **"File"**, clique em **"Upload Files"**.
4. Selecione o arquivo `.json` correspondente ao Postman disponível no repositório.
5. O Postman irá processar e importar a coleção, que aparecerá na sua lista de coleções.

#### **Para Insomnia**
1. Abra o Insomnia.
2. Clique no ícone de hambúrguer (três linhas) no canto superior esquerdo.
3. Selecione **"Import/Export"**.
4. Clique em **"Import Data"**.
5. Escolha **"From File"** e selecione o arquivo `.json` correspondente ao Insomnia disponível no repositório.
6. A coleção será importada e aparecerá no seu workspace.

### 2. Configuração do Ambiente

Após a importação, é necessário configurar algumas variáveis de ambiente para que as requisições funcionem corretamente.

#### **Login e Token JWT**
1. No Postman ou Insomnia, localize a requisição de **login** e execute-a com as credenciais apropriadas.
2. Após a execução bem-sucedida, um token JWT será gerado.
3. **Copie o token JWT** gerado.

#### **Configuração das Variáveis**
1. No **Postman**, clique no ícone do olho na barra superior para visualizar as variáveis de ambiente.
   - Encontre a variável `token_active` e substitua o valor atual pelo token JWT copiado.
   - Verifique se a variável `base_url` está configurada como `http://localhost:3000`.
   
2. No **Insomnia**, vá até as variáveis de ambiente clicando no ícone de hambúrguer (três linhas) no canto superior esquerdo.
   - No ambiente ativo, localize a variável `token_active` e cole o token JWT copiado.
   - Verifique se a variável `base_url` está configurada como `http://localhost:3000`.

### 3. Realização dos Testes

Agora que tudo está configurado:
- Execute as requisições disponíveis na coleção para testar a API.
- Certifique-se de que as requisições que exigem autenticação estão utilizando o token JWT configurado.

---

## Endpoints

### Users (Usuários)

1. **POST /users/register**

   Permite que um novo usuário se registre no sistema.

   - **Corpo da Requisição (JSON):**
     ```json
     {
       "username": "user@example.com",
       "password": "senha123",
     }
     ```

   - **Exemplo de Resposta (JSON):**
     ```json
     {
       "message": "Usuário registrado com sucesso",
       "userId": "id_do_usuario"
     }
     ```

2. **POST /auth/login**

   Autentica o usuário e retorna um token JWT.

   - **Corpo da Requisição (JSON):**
     ```json
     {
       "username": "user@example.com",
       "password": "senha123"
     }
     ```

   - **Exemplo de Resposta (JSON):**
     ```json
     {
       "access_token": "jwt_token_gerado"
     }
     ```

3. **GET /users**

   Retorna a lista de todos os usuários registrados no sistema. (Requer autenticação do usuário - JWT)

   - **Exemplo de Resposta (JSON):**
     ```json
     [
       {
         "id": "id_do_usuario",
         "username": "user@example.com",
         "password": "hash-bcrypt"
       }
     ]
     ```

4. **GET /users/:id**

   Retorna os detalhes de um usuário específico com base no `id`. (Requer autenticação do usuário - JWT)

   - **Exemplo de Resposta (JSON):**
     ```json
     {
       "id": "id_do_usuario",
       "username": "user@example.com",
       "password": "hash-bcrypt"
     }
     ```

---

### Events (Eventos)

1. **GET /events**

   Retorna uma lista de todos os eventos disponíveis para compra de ingressos. (Requer autenticação do usuário - JWT)

   - **Exemplo de Resposta (JSON):**
     ```json
     [
       {
         "id": "id_do_evento",
         "name": "Evento 1",
         "date": "2024-09-15T20:00:00Z",
         "totalTickets": 100,
         "availableTickets": 100,
         "price": 150.0
       },
       {
         "id": "id_do_evento_2",
         "name": "Evento 2",
         "date": "2024-10-01T20:00:00Z",
         "totalTickets": 50,
         "availableTickets": 50,
         "price": 200.0
       }
     ]
     ```

2. **GET /events/:id**

   Retorna as informações detalhadas de um evento específico com base no `id`. (Requer autenticação do usuário - JWT)

   - **Exemplo de Resposta (JSON):**
     ```json
     {
       "id": "id_do_evento",
       "name": "Evento 1",
       "date": "2024-09-15T20:00:00Z",
       "totalTickets": 100,
       "availableTickets": 100,
       "price": 150.0
     }
     ```

3. **POST /events**

   Cria um novo evento no sistema. (Requer autenticação do usuário - JWT)

   - **Corpo da Requisição (JSON):**
     ```json
     {
       "name": "Nome do Evento",
       "date": "2024-12-20T20:00:00Z",
       "totalTickets": 200,
       "availableTickets": 200,
       "price": 100.0
     }
     ```

   - **Exemplo de Resposta (JSON):**
     ```json
     {
       "message": "Evento criado com sucesso",
       "eventId": "id_do_evento_novo"
     }
     ```

---

### Tickets (Ingressos)

1. **GET /tickets**

   Retorna uma lista de todos os ingressos comprados. (Requer autenticação do usuário - JWT)

   - **Exemplo de Resposta (JSON):**
     ```json
     [
       {
         "id": "id_do_ingresso",
         "eventId": "id_do_evento",
         "buyerName": "John Doe",
         "purchaseDate": "2024-09-10T18:00:00Z"
       }
     ]
     ```

2. **GET /tickets/:id**

   Retorna os detalhes de um ingresso específico com base no `id`. (Requer autenticação do usuário - JWT)

   - **Exemplo de Resposta (JSON):**
     ```json
     {
       "id": "id_do_ingresso",
       "eventId": "id_do_evento",
       "buyerName": "John Doe",
       "purchaseDate": "2024-09-10T18:00:00Z"
     }
     ```

3. **POST /tickets**

   Permite que um usuário compre um ou mais ingressos para um evento específico. (Requer autenticação do usuário - JWT)

   - **Corpo da Requisição (JSON):**
     ```json
     {
       "eventId": "id_do_evento",
       "buyerName": "John Doe",
       "purchaseDate": "2024-08-29T10:00:00Z",
       "quantity": 2,
     }
     ```

   - **Exemplo de Resposta (JSON):**
     ```json
     {
       "message": "Ingresso comprado com sucesso",
       "ticketId": "id_do_ingresso"
     }
     ```

---

## Validação

Todas as rotas que envolvem criação de dados ou compra de ingressos utilizam **classes de validação** do NestJS para garantir a integridade dos dados enviados ao servidor. 

Exemplos de validação:
- O campo `quantity` na compra de ingressos deve ser um número positivo.
- Verificação se o `eventId` informado existe no banco de dados antes de processar a compra de ingresso.
- Validação de e-mail e senha no registro de usuários.

---

## Conclusão

A implementação técnica do sistema de bilheteria do cassino abrange:
- **Endpoints para gerenciamento de eventos e ingressos.**
- **Sistema de autenticação JWT para segurança.**
- **Validações rigorosas de dados.**
- **Interação eficiente com MongoDB através do Mongoose.**

Essa arquitetura garante escalabilidade, segurança e desempenho para lidar com a venda de ingressos em larga escala.

## Links

- **Arquivo principal de instrução** [README.md](../README.md)
- **Parte 1: Análise e Planejamento**  [planning.md](./planning.md)
- **Parte 2: Implementação Técnica** [api.md](./api.md)
- **Parte 3: Refatoração e Melhoria** [refactoring.md](./refactoring-code.md)
