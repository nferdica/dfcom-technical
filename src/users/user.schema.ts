import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // A anotação @Schema() marca a classe como um esquema do Mongoose
export class User extends Document {
  @Prop({ required: true }) // O campo 'username' é definido como uma propriedade do esquema, e é obrigatório
  username: string;

  @Prop({ required: true }) // O campo 'password' é definido como uma propriedade do esquema, e é obrigatório
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User); // Gera um Schema do Mongoose a partir da classe User, que será utilizado para criar e manipular documentos no banco de dados
