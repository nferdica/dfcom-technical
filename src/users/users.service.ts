import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs'; // Foi ultilizada o bcrypt para não deixar as senhas dos usuários expostas no banco de dados.

// Este é o módulo responsavel pela lógica de negócios relacionada aos usuários.
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Verifica se o username ja está cadastrado no sistema.
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  // Busca todos os usuários por ID cadastrados no sistema. (Busca mais específica)
  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  // Busca todos os usuários cadastrados no sistema.
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Criação de novo usuário.
  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({ ...user, password: hashedPassword });
    return newUser.save();
  }
}
