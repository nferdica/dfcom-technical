import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // O decorador @Controller define uma classe como um controlador que pode lidar com solicitações HTTP.
export class AppController {
  constructor(private readonly appService: AppService) {} // O construtor da classe injeta o AppService, que será utilizado para lidar com a lógica de negócios.

  @Get() // O decorador @Get mapeia o método getHello para a rota GET "/".
  getHello(): string {
    // Este método retorna a string fornecida pelo AppService.
    return this.appService.getHello();
  }
}
