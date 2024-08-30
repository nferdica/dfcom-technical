import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './ticket.schema';
import { Event, EventSchema } from '../events/event.schema';

describe('TicketsService', () => {
  let service: TicketsService;

  // Executa antes de cada teste
  beforeEach(async () => {
    // Cria um módulo de teste utilizando o NestJS TestingModule
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL), // Configura o MongooseModule para conectar ao MongoDB utilizando a URL do .env
        // Registra os esquemas Ticket e Event no MongooseModule para que possam ser utilizados nos testes
        MongooseModule.forFeature([
          { name: Ticket.name, schema: TicketSchema },
          { name: Event.name, schema: EventSchema },
        ]),
      ],
      providers: [TicketsService], // Define o serviço que será testado como um provedor do módulo
    }).compile();

    service = module.get<TicketsService>(TicketsService); // Recupera uma instância do TicketsService a partir do módulo de teste compilado
  });

  // Teste para verificar se o serviço foi definido corretamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
