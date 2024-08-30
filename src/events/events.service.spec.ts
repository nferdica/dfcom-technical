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
        EventsModule,
        MongooseModule.forRoot(
          'mongodb+srv://nferdica:%40Ncf200224@nferdica.cojrt.mongodb.net/?retryWrites=true&w=majority&appName=nferdica',
        ), // Ajuste o URL conforme necessário
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
      ],
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
