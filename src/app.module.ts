import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './modules/ticket/ticket.module';
import { VentanillaModule } from './modules/ventanilla/ventanilla.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { SistradocModule } from './modules/sistradoc/sistradoc.module';
import { ContribuyenteModule } from './modules/rentas/contribuyente/contribuyente.module';
import { SocketGateway } from './gateways/socket.gateway';
import { VentanillareferenciaModule } from './modules/ventanillareferencia/ventanillareferencia.module';
import { ReferenciaModule } from './modules/referencia/referencia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TicketModule,
    VentanillaModule,
    UsuarioModule,
    SistradocModule,
    ContribuyenteModule,
    SocketGateway,
    VentanillareferenciaModule,
    ReferenciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
