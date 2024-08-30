import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { User, UserSchema } from './user.schema';

// Descreve o grupo de testes para o controlador de usuários (UsersController)
describe('UsersController', () => {
  let controller: UsersController;

  // Executa antes de cada teste individual. Configura o módulo de teste para o controlador.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Importa os módulos necessários para o teste, incluindo MongooseModule para configurar a conexão com o MongoDB
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL), // Configura a conexão com o MongoDB usando a URL do banco de dados definida no .env
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Define o modelo do Mongoose a ser usado neste módulo de teste
        UsersModule, // Importa o módulo de usuários novamente para garantir que o controlador tenha tudo o que precisa
      ],
      controllers: [UsersController], // Especifica que o controlador de usuários será testado
    }).compile();

    controller = module.get<UsersController>(UsersController); // Obtém uma instância do controlador de usuários para ser usada nos testes
  });

  // Teste simples que verifica se o controlador foi definido corretamente
  it('should be defined', () => {
    expect(controller).toBeDefined(); // Verifica se a instância do controlador não é indefinida, garantindo que o controlador foi criado com sucesso
  });
});
