import { Controller, Post, Get, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.schema';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(@Body() createTicketDto: any): Promise<Ticket[]> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }
}
