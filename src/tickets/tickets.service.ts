import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket } from './ticket.schema';
import { Event } from '../events/event.schema';

@Injectable()
export class TicketsService {
  // O serviço injeta os modelos Ticket e Event para realizar operações no banco de dados.
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>, // Modelo Mongoose para a coleção Ticket
    @InjectModel(Event.name) private readonly eventModel: Model<Event>, // Modelo Mongoose para a coleção Event
  ) {}

  // Método para encontrar um ingresso pelo seu ID.
  async findById(ticketId: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(ticketId).exec(); // Busca o ingresso pelo ID no banco de dados
    if (!ticket) {
      throw new NotFoundException('Ticket not found'); // Lança uma exceção se o ingresso não for encontrado.
    }
    return ticket; // Retorna o ingresso encontrado
  }

  // Método para encontrar todos os ingressos.
  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec(); // Retorna todos os ingressos da coleção
  }

  // Método para criar novos ingressos.
  async create(createTicketDto: any): Promise<Ticket[]> {
    const eventId = createTicketDto.eventId;
    // Verificar se o evento associado ao ingresso existe
    const event = await this.eventModel.findById(new Types.ObjectId(eventId));
    if (!event) {
      throw new NotFoundException('Event not found'); // Lança uma exceção se o evento não for encontrado
    }

    // Verificar se há ingressos disponíveis para o evento
    if (event.availableTickets <= 0) {
      throw new BadRequestException('No tickets available'); // Lança uma exceção se não houver ingressos disponíveis
    }

    // Verifica se a quantidade solicitada de ingressos é válida (maior que 0 e não excede a quantidade disponível)
    const quantity = createTicketDto.quantity || 1;
    if (quantity <= 0 || quantity > event.availableTickets) {
      throw new BadRequestException('Invalid quantity'); // Lança uma exceção se a quantidade for inválida
    }

    // Cria os ingressos solicitados
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const createdTicket = new this.ticketModel({
        eventId: new Types.ObjectId(eventId), // Associa o ingresso ao evento usando ObjectId
        buyerName: createTicketDto.buyerName,
        purchaseDate: new Date(createTicketDto.purchaseDate),
      });
      tickets.push(createdTicket.save()); // Salva cada ingresso criado no banco de dados
    }

    // Atualiza o número de ingressos disponíveis para o evento
    event.availableTickets -= quantity;
    await event.save(); // Salva a atualização do evento no banco de dados

    return Promise.all(tickets); // Retorna todos os ingressos criados após salvar
  }
}
