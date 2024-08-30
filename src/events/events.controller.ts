import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard) // Protege a rota de consulta de eventos
  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Protege a rota de consulta de eventos
  @Get(':eventId')
  async getEventById(@Param('eventId') eventId: string): Promise<Event> {
    return this.eventsService.findById(eventId);
  }

  @UseGuards(JwtAuthGuard) // Protege a rota de criação de eventos
  @Post()
  async createEvent(@Body() event: Event): Promise<Event> {
    return this.eventsService.create(event);
  }
}
