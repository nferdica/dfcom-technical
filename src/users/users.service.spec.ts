import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

describe('UsersService', () => {
  let service: UsersService;

  // O bloco `beforeEach` é executado antes de cada teste individual, configurando o módulo de teste e injetando o `UsersService`.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule, // Importa o módulo `UsersModule`, que contém a lógica principal para o serviço de usuários.
        MongooseModule.forRoot(process.env.MONGO_URL), // Configura a conexão com o MongoDB usando o Mongoose, com a URL do banco de dados especificada no `.env`.
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Registra o modelo `User` com o Mongoose, necessário para a manipulação de dados de usuários no banco.
      ],
      providers: [UsersService], // Declara o `UsersService` como provedor, tornando-o disponível para o teste.
    }).compile();

    service = module.get<UsersService>(UsersService); // Obtém uma instância do `UsersService` a partir do módulo de teste.
  });

  // Testa se o `UsersService` foi definido corretamente, garantindo que a injeção de dependência está funcionando.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
