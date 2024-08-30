import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard) // Protege a rota de criação de tickets
  @Post()
  async createTicket(@Body() createTicketDto: any): Promise<Ticket[]> {
    return this.ticketsService.create(createTicketDto);
  }

  @UseGuards(JwtAuthGuard) // Protege a rota de visualização de tickets
  @Get(':ticketId')
  async getTicketById(@Param('ticketId') ticketId: string): Promise<Ticket> {
    return this.ticketsService.findById(ticketId);
  }

  @UseGuards(JwtAuthGuard) // Protege a rota de visualização de tickets
  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }
}
