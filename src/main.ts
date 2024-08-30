import * as dotenv from 'dotenv'; // Importa a biblioteca 'dotenv' que carrega variáveis de ambiente definidas em um arquivo .env para a aplicação.
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env para o process.env.

import { NestFactory } from '@nestjs/core'; // Importa o NestFactory para criar uma instância da aplicação NestJS.
import { AppModule } from './app.module'; // Importa o módulo raiz da aplicação, que é o ponto de entrada principal onde todos os módulos são integrados.

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Cria a aplicação NestJS utilizando o AppModule como o módulo raiz.
  await app.listen(3000); // Configura a aplicação para escutar as requisições HTTP na porta 3000.
}
bootstrap(); // Inicia a aplicação executando a função bootstrap.
