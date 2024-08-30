import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tickets') // Define que este controlador gerencia as rotas relacionadas a 'tickets'.
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Define um endpoint POST para criar tickets, protegido por autenticação JWT.
  @UseGuards(JwtAuthGuard) // Protege a rota de criação de tickets, garantindo que apenas usuários autenticados possam acessá-la.
  @Post()
  async createTicket(@Body() createTicketDto: any): Promise<Ticket[]> {
    // Chama o serviço para criar um ou mais tickets com base nos dados fornecidos no corpo da requisição.
    return this.ticketsService.create(createTicketDto);
  }

  // Define um endpoint GET para obter um ticket específico por ID, protegido por autenticação JWT.
  @UseGuards(JwtAuthGuard) // Protege a rota de visualização de tickets, garantindo que apenas usuários autenticados possam acessá-la.
  @Get(':ticketId')
  async getTicketById(@Param('ticketId') ticketId: string): Promise<Ticket> {
    // Chama o serviço para buscar o ticket pelo ID fornecido como parâmetro na URL.
    return this.ticketsService.findById(ticketId);
  }

  // Define um endpoint GET para obter todos os tickets, protegido por autenticação JWT.
  @UseGuards(JwtAuthGuard) // Protege a rota de visualização de todos os tickets, garantindo que apenas usuários autenticados possam acessá-la.
  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    // Chama o serviço para buscar todos os tickets registrados no sistema.
    return this.ticketsService.findAll();
  }
}
