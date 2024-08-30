import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject(); // Remove a senha do objeto do usuário antes de retornar
      return result;
    }
    return null; // Retorna null se a validação falhar
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id }; // Cria o payload do JWT com o username e o ID do usuário
    return {
      access_token: this.jwtService.sign(payload), // Gera o token JWT usando o payload
    };
  }
}
