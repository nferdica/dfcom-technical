import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  buyerName: string;

  @Prop({ required: true })
  purchaseDate: Date;

  //@Prop({ required: true })
  //quantity: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
