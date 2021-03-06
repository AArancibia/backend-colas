import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Detestadoventanilla } from '../modules/ventanilla/detestadoventanilla/detestadoventanilla.entity';
import { getConnection, Repository } from 'typeorm';
import { Ventanilla } from '../modules/ventanilla/ventanilla.entity';
import { Logger } from '@nestjs/common';
import { Usuario } from '../modules/usuario/usuario.entity';

@WebSocketGateway(8081, {
  namespace: 'ventanilla',
})
export class VentanillaGateway {
  private logger = new Logger('VentanillaGateway');
  @WebSocketServer()
  wsVentanilla: any;

  constructor(
    @InjectRepository(Detestadoventanilla)
    private detEstadoVentanillaRepository: Repository<Detestadoventanilla>,
    @InjectRepository(Ventanilla)
    private ventanillaRepository: Repository<Ventanilla>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  toResponseObject(usuario: Usuario) {
    return usuario.toResponseObject();
  }

  @SubscribeMessage('[VENTANILLA] LISTA')
  async obtenerVentanillas() {
    const ventanillas = await this.ventanillaRepository.find({
      relations: ['usuario'],
    });
    return ventanillas.map(ventanilla => {
      ventanilla.usuario = this.toResponseObject(ventanilla.usuario);
      return ventanilla;
    });
  }

  @SubscribeMessage('[VENTANILLA] ASIGNARUSUARIO')
  async usuarioAVentanilla(idventanilla: number, idusuario: number) {
    const buscarVentanilla = await this.ventanillaRepository.findOne({
      where: { idusuario },
    });
    if (buscarVentanilla) {
      await this.ventanillaRepository.update(
        { id: buscarVentanilla.id },
        { idusuario: null },
      );
    }
    //let ventanilla = await this.ventanillaRepository.findOne({ where: { id: idventanilla } });
    await this.ventanillaRepository.update(
      { id: idventanilla },
      {
        idusuario,
      },
    );
    const ventanilla = await this.ventanillaRepository.findOne({
      where: { id: idventanilla },
      relations: ['usuario'],
    });
    return ventanilla;
  }

  @SubscribeMessage('[VENTANILLA] ULTIMOESTADO')
  async ultimoEstadoVentanilla() {
    const ventanillas = await getConnection().manager.query(
      `select * from ULTIMOESTADOVENTANILLA`,
    );
    const ultimoEstado = [];
    ventanillas.map((item, index, array) => {
      const {
        idticket,
        idtematica,
        idtramite,
        codigo,
        correlativo,
        urgente,
        fechaticket,
        idventanilla,
        idtipoticket,
        idadministrado,
        preferencial,
        tbVentanillaId,
        tbEstadoventanillaId,
        identificador,
        fecha,
        id,
        codigoventanilla,
        ubicacion,
        idusuario,
        tipoatencion,
      } = item;
      const elemento = {
        ticket: {
          id: idticket,
          idtematica,
          idtramite,
          codigo,
          correlativo,
          urgente,
          fecha: fechaticket,
          idventanilla,
          idtipoticket,
          idadministrado,
          preferencial,
        },
        ventanilla: {
          id,
          codigoventanilla,
          ubicacion,
          idusuario,
          tipoatencion,
        },
        detestado: {
          tbVentanillaId,
          tbEstadoventanillaId,
          identificador,
          fecha,
        },
      };
      ultimoEstado.push(elemento);
    });
    return ultimoEstado;

    /*const qb = await this.detEstadoVentanillaRepository.createQueryBuilder('t1');
    const detVentanillas = await qb
      .innerJoinAndSelect( 't1.ventanilla', 'tb_ventanilla' )  // Ticket , 'ticket', 'ticket.id = t1.ticketId'
      .innerJoinAndSelect( 'ticket', 'ticket', 'ticket.idventanilla = tb_ventanilla.id')
      .where(
        sq => {
          const subQuery = qb.subQuery()
            .select( 'max( fecha )')
            .from( Detestadoventanilla, 't2' )
            .where( 't1.tbVentanillaId = t2.tbVentanillaId' )
            .getQuery();
          return 't1.fecha = ' + subQuery;
        },
      )
      .andWhere(
        sq => {
          const subQuery = qb.subQuery()
            .select( 'max( fecha )')
            .from( Ticket, 't2' )
            .where( 't1.tbVentanillaId = t2.idventanilla' )
            .getQuery();
          return 'ticket.fecha = ' + subQuery;
        },
      )
      .andWhere(
        ' t1.fecha between :fec1 and :fec2 ',
        {
          fec1: `${ formatFechaCorta() } ` + '00:00:00',
          fec2: `${ fecha2 } ` + '00:00:00',
        },
      )
      .getMany();*/
  }
}
