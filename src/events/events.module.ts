import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.schema';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), // Registra o modelo `Event` com o Mongoose, associando o esquema correspondente.
  ],
  controllers: [EventsController], // Registra o controlador de eventos no módulo.
  providers: [EventsService], // Registra o serviço de eventos como provedor para injeção de dependência.
  exports: [
    EventsService, // Exporta o serviço de eventos para que possa ser utilizado em outros módulos.
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), // Exporta o registro do modelo `Event`, permitindo que outros módulos utilizem esse modelo.
  ],
})
export class EventsModule {}
