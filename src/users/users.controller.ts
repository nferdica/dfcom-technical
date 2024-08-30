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
  constructor(private readonly usersService: UsersService) {}

  // Adicione a rota para obter todos os usuários
  @UseGuards(JwtAuthGuard) // Protege a rota, garantindo que apenas usuários autenticados possam acessar
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Protege a rota, garantindo que apenas usuários autenticados possam acessar
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() user: User): Promise<{ message: string }> {
    const existingUser = await this.usersService.findOne(user.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    await this.usersService.create(user);
    return { message: 'User registered successfully' };
  }
}
