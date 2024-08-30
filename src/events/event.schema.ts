import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  totalTickets: number;

  @Prop({ required: true })
  availableTickets: number;

  @Prop({ required: true })
  price: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
