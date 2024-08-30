import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule, // Importa o módulo de usuários para permitir a injeção de dependência do serviço de usuários
    PassportModule, // Necessário para a utilização de estratégias de autenticação, como Local e JWT
    JwtModule.register({
      secret: 'SECRET_KEY', // Define a chave secreta usada para assinar o JWT; deve ser forte e segura
      signOptions: { expiresIn: '12h' }, // Configura o tempo de expiração do token JWT para 12 horas
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy], // Serviços e estratégias de autenticação disponíveis no módulo
  controllers: [AuthController], // Controlador que gerencia as rotas de autenticação
})
export class AuthModule {}
