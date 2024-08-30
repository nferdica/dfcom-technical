import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventsModule } from './events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventsModule, // Importa o módulo de eventos, que inclui a configuração do serviço e esquema.
        MongooseModule.forRoot(process.env.MONGO_URL), // Configura a conexão com o MongoDB usando a URL do .env.
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]), // Registra o modelo `Event` para os testes.
      ],
      providers: [EventsService], // Fornece o `EventsService` para ser testado.
    }).compile();

    service = module.get<EventsService>(EventsService); // Obtém uma instância do `EventsService` para os testes.
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Verifica se o serviço foi definido corretamente.
  });
});
