import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Este é o modulo raiz da aplicação que importa todos os módulos necessários.
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), // Conexão com banco de dados utilizando MongoDB
    AuthModule,
    UsersModule,
    EventsModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
