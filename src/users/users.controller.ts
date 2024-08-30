import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // O controlador UsersController gerencia as rotas relacionadas aos usuários.

  // Adicione a rota para obter todos os usuários
  @UseGuards(JwtAuthGuard) // Usa JwtAuthGuard para proteger a rota, garantindo que apenas usuários autenticados possam acessá-la.
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll(); // Retorna uma lista de todos os usuários registrados no sistema.
  }

  @UseGuards(JwtAuthGuard) // Usa JwtAuthGuard para proteger a rota, garantindo que apenas usuários autenticados possam acessá-la.
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id); // Retorna um usuário específico com base no ID fornecido como parâmetro.
  }

  @UseGuards(JwtAuthGuard) // Usa JwtAuthGuard para proteger a rota, garantindo que apenas usuários autenticados possam acessá-la.
  @Post('register')
  async register(@Body() user: User): Promise<{ message: string }> {
    const existingUser = await this.usersService.findOne(user.username); // Verifica se o nome de usuário já existe.
    if (existingUser) {
      throw new BadRequestException('Username already exists'); // Se o nome de usuário já estiver registrado, lança uma exceção de "Bad Request"
    }

    await this.usersService.create(user); // Cria um novo usuário no banco de dados.
    return { message: 'User registered successfully' }; // Retorna uma mensagem de sucesso ao registrar o usuário.
  }
}
