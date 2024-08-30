import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Registrar o modelo do Mongoose
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Se você precisar injetar o UsersService em outro módulo
})
export class UsersModule {}
