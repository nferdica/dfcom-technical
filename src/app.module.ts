import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';

// Este é o modulo raiz da aplicação que importa todos os módulos necessários.
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nferdica:%40Ncf200224@nferdica.cojrt.mongodb.net/?retryWrites=true&w=majority&appName=nferdica',
    ), // Conexão com banco de dados utilizando MongoDB
    AuthModule,
    UsersModule,
    EventsModule,
    TicketsModule,
  ],
})
export class AppModule {}
