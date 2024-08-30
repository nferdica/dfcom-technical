import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs'; // Foi ultilizada o bcrypt para não deixar as senhas dos usuários expostas no banco de dados.

// Este é o módulo responsavel pela lógica de negócios relacionada aos usuários.
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {} // Injeta o modelo do Mongoose para a entidade User, permitindo operações no banco de dados.

  // Verifica se o username ja está cadastrado no sistema.
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec(); // Retorna um usuário que tenha o username correspondente, ou undefined se não encontrado.
  }

  // Busca um usuário específico por ID.
  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec(); // Retorna o usuário correspondente ao ID fornecido.
  }

  // Busca todos os usuários cadastrados no sistema.
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Retorna uma lista de todos os usuários no banco de dados.
  }

  // Cria um novo usuário no sistema.
  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Gera uma senha criptografada utilizando bcrypt.
    const newUser = new this.userModel({ ...user, password: hashedPassword }); // Cria uma nova instância de usuário com a senha criptografada.
    return newUser.save(); // Salva o novo usuário no banco de dados e retorna a instância criada.
  }
}
