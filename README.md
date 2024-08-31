# Sistema de Bilheteria para Cassino

Este projeto é um sistema de bilheteria desenvolvido para um cassino, permitindo a compra de ingressos para eventos diversos e a gestão destes eventos de forma eficiente e confiável.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado no seu sistema:
- Node.js (versão recomendada 14 ou superior)
- npm (gerenciador de pacotes para JavaScript)
- MongoDB (banco de dados NoSQL)

## Configuração do Ambiente

Clone o repositório para sua máquina local usando:

```bash
git clone https://github.com/nferdica/dfcom-technical.git
cd dfcom-technical
```

## Instale as dependências do projeto

```bash
$ npm install
```

## Configuração do Banco de Dados

Certifique-se de que o MongoDB está instalado e rodando em sua máquina. Configure as variáveis de ambiente necessárias para conectar-se ao MongoDB no arquivo `.env` na raiz do projeto:

```plaintext
MONGO_URL= 
```

## Executando o projeto

```bash
$ npm run start
```

## Executando testes

```bash
$ npm run test
```

```bash
$ npm run test:e2e
```

## Documentação da API

Para mais detalhes sobre os endpoints disponíveis e como usá-los, consulte a documentação da API no diretório `docs/api.md`, [api.md](docs/api.md).

## Links

- **Arquivo principal de instrução** [README.md](../README.md)
- **Parte 1: Análise e Planejamento**  [planning.md](docs/planning.md)
- **Parte 2: Implementação Técnica** [api.md](docs/api.md)
- **Parte 3: Refatoração e Melhoria** [refactoring.md](docs/refactoring.md)