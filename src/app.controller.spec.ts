import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Descreve um conjunto de testes para o AppController
describe('AppController', () => {
  let appController: AppController; // Declaração da variável que será usada para armazenar a instância do AppController

  // O bloco beforeEach é executado antes de cada teste individual neste conjunto de testes
  beforeEach(async () => {
    // Cria um módulo de teste para simular o ambiente de execução do AppController
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Define o AppController como o controlador a ser testado
      providers: [AppService], // Define o AppService como um provedor necessário para o AppController
    }).compile();

    appController = app.get<AppController>(AppController); // Obtém uma instância do AppController a partir do módulo de teste
  });

  // Descreve um conjunto de testes específico para a rota raiz ("/")
  describe('root', () => {
    // Teste individual que verifica se o método getHello do AppController retorna "Hello World!"
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); // Espera-se que a chamada a appController.getHello() retorne a string "Hello World!"
    });
  });
});
