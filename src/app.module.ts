import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';

// Este é o modulo raiz da aplicação que importa todos os módulos necessários.
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), // Configura a conexão com o MongoDB utilizando a URL definida no arquivo .env
    AuthModule, // Importa o módulo de autenticação, responsável por gerenciar as funcionalidades de login e proteção das rotas
    UsersModule, // Importa o módulo de usuários, que gerencia as operações relacionadas aos usuários do sistema
    EventsModule, // Importa o módulo de eventos, que gerencia os eventos disponíveis no cassino
    TicketsModule, // Importa o módulo de ingressos, que gerencia a compra e venda de ingressos para os eventos
  ],
  controllers: [AppController], // Define o controlador principal que será responsável por responder às requisições HTTP no ponto de entrada da aplicação
  providers: [AppService], // Define os serviços que podem ser injetados em outras partes da aplicação, neste caso o AppService
})
export class AppModule {}
