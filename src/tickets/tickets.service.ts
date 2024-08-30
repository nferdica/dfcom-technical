import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket } from './ticket.schema';
import { Event } from 'src/events/event.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async findById(ticketId: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(ticketId).exec();
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async create(createTicketDto: any): Promise<Ticket[]> {
    const eventId = createTicketDto.eventId;
    // Verificar se o evento existe
    const event = await this.eventModel.findById(new Types.ObjectId(eventId));
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Verificar se há ingressos disponíveis
    if (event.availableTickets <= 0) {
      throw new BadRequestException('No tickets available');
    }

    // Verificar se a quantidade desejada é maior que 0 e não maior que os ingressos disponíveis
    const quantity = createTicketDto.quantity || 1;
    if (quantity <= 0 || quantity > event.availableTickets) {
      throw new BadRequestException('Invalid quantity');
    }

    // Criar o ingresso
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const createdTicket = new this.ticketModel({
        eventId: new Types.ObjectId(eventId), // Use Types.ObjectId para converter para ObjectId
        buyerName: createTicketDto.buyerName,
        purchaseDate: new Date(createTicketDto.purchaseDate),
        //quantity: createTicketDto.quantity,
      });
      tickets.push(createdTicket.save());
    }

    // Atualizar o número de ingressos disponíveis
    event.availableTickets -= quantity;
    await event.save();

    return Promise.all(tickets);
  }
}
