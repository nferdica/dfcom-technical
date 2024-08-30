import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o JWT do cabeçalho de autorização como Bearer token
      ignoreExpiration: false, // Garante que o JWT expirado não será aceito
      secretOrKey: 'SECRET_KEY', // Chave secreta usada para verificar a assinatura do JWT
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username }; // Retorna um objeto contendo as informações do usuário extraídas do payload do JWT
  }
}
