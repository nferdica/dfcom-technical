import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './ticket.schema';
import { Event, EventSchema } from '../events/event.schema';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL), // Ajuste o URL conforme necessário
        MongooseModule.forFeature([
          { name: Ticket.name, schema: TicketSchema },
          { name: Event.name, schema: EventSchema },
        ]),
      ],
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
