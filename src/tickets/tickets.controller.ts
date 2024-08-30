import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.schema';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(@Body() createTicketDto: any): Promise<Ticket[]> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get(':ticketId')
  async getTicketById(@Param('ticketId') ticketId: string): Promise<Ticket> {
    return this.ticketsService.findById(ticketId);
  }

  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }
}
