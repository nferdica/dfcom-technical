import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Post()
  async createEvent(@Body() event: Event): Promise<Event> {
    return this.eventsService.create(event);
  }
}
