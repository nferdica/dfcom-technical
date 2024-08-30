import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async findById(eventId: string): Promise<Event> {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async create(event: Event): Promise<Event> {
    const newEvent = new this.eventModel(event);
    return newEvent.save();
  }
}
