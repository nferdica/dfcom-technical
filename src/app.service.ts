import { Injectable } from '@nestjs/common'; // Importa o decorador 'Injectable' do NestJS, que marca a classe como um provedor que pode ser injetado em outros componentes.

@Injectable() // O decorador '@Injectable()' indica que esta classe pode ser injetada como uma dependência em outros lugares da aplicação.
export class AppService {
  getHello(): string {
    // O método 'getHello()' retorna uma string "Hello World!".
    return 'Hello World!';
  }
}
