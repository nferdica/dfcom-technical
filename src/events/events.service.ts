import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';

@Injectable() // Marca a classe como um provedor injetável.
export class EventsService {
  // Injeta o modelo `Event` para realizar operações no banco de dados.
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  // Busca um evento pelo ID. Se não for encontrado, lança uma exceção `NotFoundException`.
  async findById(eventId: string): Promise<Event> {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException('Evento não encontrado!');
    }
    return event;
  }

  // Retorna todos os eventos cadastrados no banco de dados.
  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  // Cria um novo evento e salva no banco de dados.
  async create(event: Event): Promise<Event> {
    const newEvent = new this.eventModel(event);
    return newEvent.save();
  }
}
