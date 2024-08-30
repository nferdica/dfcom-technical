import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    // Importa o MongooseModule e registra o esquema `UserSchema` para a entidade `User`.
    // Isso permite que o NestJS saiba como mapear a entidade `User` para o MongoDB.
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService], // Declara o `UsersService` como um provedor, tornando-o disponível para injeção de dependência.
  controllers: [UsersController], // Registra o `UsersController`, que gerencia as rotas relacionadas aos usuários.
  exports: [UsersService], // Exporta o `UsersService` para que possa ser injetado em outros módulos, se necessário.
})
export class UsersModule {}
