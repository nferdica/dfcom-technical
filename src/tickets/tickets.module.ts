import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './ticket.schema';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { EventsModule } from '../events/events.module';

@Module({
  // Define as importações necessárias para o funcionamento do módulo de Tickets.
  imports: [
    // Registra o esquema do Ticket no MongooseModule, permitindo que o modelo Ticket seja injetado e usado em outros serviços.
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    EventsModule, // Importa o módulo de eventos, indicando que o módulo de Tickets depende da funcionalidade do módulo de Eventos.
  ],
  controllers: [TicketsController], // Define o controlador que gerencia as requisições HTTP relacionadas aos Tickets.
  providers: [TicketsService], // Define o serviço que contém a lógica de negócios relacionada aos Tickets.
})
export class TicketsModule {}
