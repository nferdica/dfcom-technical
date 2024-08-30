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
        MongooseModule.forRoot(process.env.MONGO_URL), // Ajuste o URL conforme necessário
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
      ],
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
