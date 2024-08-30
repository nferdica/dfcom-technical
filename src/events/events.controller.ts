import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events') // Define a rota base como 'events'
export class EventsController {
  constructor(private readonly eventsService: EventsService) {} // Injeta o serviço de eventos para manipular a lógica de negócios

  @UseGuards(JwtAuthGuard) // Protege a rota de consulta de todos os eventos, garantindo que apenas usuários autenticados possam acessá-la
  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventsService.findAll(); // Retorna todos os eventos usando o serviço de eventos
  }

  @UseGuards(JwtAuthGuard) // Protege a rota de consulta de todos os eventos, garantindo que apenas usuários autenticados possam acessá-la
  @Get(':eventId')
  async getEventById(@Param('eventId') eventId: string): Promise<Event> {
    return this.eventsService.findById(eventId); // Retorna um evento específico com base no ID fornecido
  }

  @UseGuards(JwtAuthGuard) // Protege a rota de consulta de todos os eventos, garantindo que apenas usuários autenticados possam acessá-la
  @Post()
  async createEvent(@Body() event: Event): Promise<Event> {
    return this.eventsService.create(event); // Cria um novo evento com base nos dados fornecidos
  }
}
