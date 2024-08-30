import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true }) // Propriedade que armazena o ID do evento ao qual o ticket está associado.
  eventId: Types.ObjectId;

  @Prop({ required: true }) // Propriedade que armazena o nome do comprador do ticket.
  buyerName: string;

  @Prop({ required: true }) // Propriedade que armazena a data da compra do ticket.
  purchaseDate: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket); // `SchemaFactory.createForClass(Ticket)` gera o esquema Mongoose com base na classe `Ticket`.
