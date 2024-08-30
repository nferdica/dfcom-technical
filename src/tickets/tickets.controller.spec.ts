import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './ticket.schema';
import { Event, EventSchema } from '../events/event.schema';

describe('TicketsController', () => {
  let controller: TicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://nferdica:%40Ncf200224@nferdica.cojrt.mongodb.net/?retryWrites=true&w=majority&appName=nferdica',
        ), // Ajuste o URL conforme necessário
        MongooseModule.forFeature([
          { name: Ticket.name, schema: TicketSchema },
          { name: Event.name, schema: EventSchema },
        ]),
      ],
      controllers: [TicketsController],
      providers: [TicketsService],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
