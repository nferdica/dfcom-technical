import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL), // Configura a conexão com o banco de dados MongoDB usando a URL do .env
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]), // Registra o schema do evento para o Mongoose
      ],
      controllers: [EventsController], // Declara o controlador que será testado
      providers: [EventsService], // Declara o serviço que o controlador depende
    }).compile();

    controller = module.get<EventsController>(EventsController); // Instancia o controlador para os testes
  });

  it('should be defined', () => {
    expect(controller).toBeDefined(); // Verifica se o controlador foi definido corretamente
  });
});
