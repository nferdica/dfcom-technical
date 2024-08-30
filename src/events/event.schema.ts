import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define a classe Event como um schema do Mongoose. A classe herda de Document, o que permite que ela tenha todas as funcionalidades de um documento do Mongoose.
@Schema()
export class Event extends Document {
  // Define o campo 'name' como uma string que é obrigatória.
  @Prop({ required: true })
  name: string;

  // Define o campo 'date' como uma data que é obrigatória.
  @Prop({ required: true })
  date: Date;

  // Define o campo 'totalTickets' como um número que é obrigatório.
  @Prop({ required: true })
  totalTickets: number;

  // Define o campo 'availableTickets' como um número que é obrigatório.
  // Este campo é utilizado para rastrear quantos ingressos ainda estão disponíveis para o evento.
  @Prop({ required: true })
  availableTickets: number;

  // Define o campo 'price' como um número que é obrigatório.
  // Representa o preço de cada ingresso para o evento.
  @Prop({ required: true })
  price: number;
}

// Gera o schema Mongoose com base na classe Event.
export const EventSchema = SchemaFactory.createForClass(Event);
