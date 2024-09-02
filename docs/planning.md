# Planejamento - Sistema de Bilheteria para Cassino

## Cenário

O projeto tem como objetivo desenvolver um sistema de bilheteria para um cassino, que opera 24/7. O sistema existente sofre com inconsistências nos dados de vendas, quedas frequentes em períodos de alta demanda e reclamações sobre a lentidão no processo de compra de ingressos.

## Objetivos do Sistema

- **Compra de ingressos**: Permitir a compra de ingressos para eventos com preços dinâmicos baseados na demanda.
- **Gerenciamento de capacidade**: Garantir que a lotação máxima dos eventos seja respeitada, evitando overbooking.
- **Alta Escalabilidade**: Manter o desempenho do sistema durante picos de acesso com alta carga de transações simultâneas.
- **Painel Administrativo**: Fornecer um painel de controle para monitoramento em tempo real e ajustes nos preços dos ingressos.

## Desafios

- **Alta Confiabilidade**: O sistema deve estar disponível de forma contínua, principalmente durante picos de demanda.
- **Escalabilidade Horizontal**: O sistema deve suportar o crescimento de demanda sem comprometer o desempenho.
- **Consistência de Dados**: Evitar qualquer perda ou duplicação de dados nas transações.

## Arquitetura Proposta

### NestJS e Mongoose

A aplicação foi desenvolvida utilizando o **NestJS**, um framework robusto para a criação de APIs em Node.js. Para o banco de dados, foi utilizado o **Mongoose**, que facilita a integração com o banco de dados NoSQL **MongoDB**. Essa combinação garante flexibilidade e alta capacidade de escalabilidade para o sistema.

### Tecnologias Utilizadas

- **NestJS**: Framework principal utilizado para a construção do backend, devido à sua modularidade e suporte ao desenvolvimento orientado a microsserviços.
- **Mongoose**: Biblioteca usada para interagir com o MongoDB, oferecendo uma abstração eficiente para o gerenciamento de dados.
- **Passport**: Utilizado para a autenticação de usuários, com suporte para JWT (JSON Web Tokens) através das bibliotecas `@nestjs/jwt` e `passport-jwt`, garantindo segurança no processo de login e autorização.
- **bcryptjs**: Para a criptografia de senhas, garantindo que as credenciais dos usuários estejam protegidas.
- **TypeScript**: Linguagem escolhida para o desenvolvimento, garantindo tipagem estática, o que melhora a manutenção e previne erros comuns em tempo de execução.
- **Jest**: Ferramenta de testes utilizada para garantir a qualidade do código e a cobertura de testes, incluindo testes unitários e de integração.

### Estrutura do Sistema

1. **Serviço de Eventos**: Responsável pela criação e gerenciamento dos eventos, com controle de lotação máxima e preços dinâmicos.
2. **Serviço de Bilhetes**: Gerencia o processo de compra de ingressos, garantindo que as transações respeitem a capacidade máxima dos eventos.
3. **Autenticação e Autorização**: Utiliza `passport` e `JWT` para autenticar os usuários, com roles específicas para administradores e usuários comuns.
4. **Painel de Administração**: Disponível para que administradores monitorem as vendas de ingressos em tempo real e ajustem os preços de acordo com a demanda.

### Scripts de Automação

- **Build**: O comando `build` usa o script `"nest build"` para compilar o projeto.
- **Start**: O sistema pode ser iniciado em modo de desenvolvimento, debug ou produção.
- **Testes**: Os testes foram configurados usando **Jest** e são executados através dos scripts `test`, `test:watch` e `test:cov` para a cobertura de testes.
- **Linting e Formatação**: Utiliza **ESLint** e **Prettier** para garantir consistência no estilo de código e evitar erros comuns.

### Estratégias de Resiliência

- **Autenticação Segura**: O uso de **JWT** garante que as requisições sejam autenticadas e autorizadas de forma segura e eficiente.
- **MongoDB + Mongoose**: A escalabilidade do MongoDB permite a manipulação eficiente de grandes volumes de dados, especialmente em operações de leitura e escrita intensivas.
- **Tests com Jest**: A cobertura de testes unitários e de integração garante a estabilidade do sistema durante alterações de código e refatorações.

### Plano de Contingência

- **Rollback e Isolamento de Transações**: Apesar de o MongoDB não ter transações complexas nativamente como bancos relacionais, o controle de lotação de eventos e validação de dados garante que não haja inconsistências no processo de compra.
- **Monitoramento Contínuo**: Embora o sistema atual não tenha ferramentas explícitas de monitoramento como Prometheus ou Grafana, o uso de logs adequados com o NestJS permite identificar falhas em tempo real.

## Links

- **Arquivo principal de instrução** [Leia-me](../README.md)
- **Parte 1: Análise e Planejamento**  [Planejamento](./planning.md)
- **Parte 2: Implementação Técnica** [Documentação](./api.md)
- **Parte 3: Refatoração e Melhoria** [Refatoração](./refactoring.md)
- **Parte 4: Apresentação** [Apresentação](https://youtu.be/_FCRMsN70D4)