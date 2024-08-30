import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura a estratégia local sem personalizações adicionais.
    super();
  }

  // Método de validação chamado automaticamente pelo Passport.
  // Ele tenta validar as credenciais do usuário (username e password).
  async validate(username: string, password: string): Promise<any> {
    // Usa o AuthService para validar o usuário com as credenciais fornecidas.
    const user = await this.authService.validateUser(username, password);
    // Se o usuário não for encontrado ou as credenciais estiverem incorretas, lança uma exceção de "Unauthorized".
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // Se a validação for bem-sucedida, o usuário autenticado é retornado.
  }
}
