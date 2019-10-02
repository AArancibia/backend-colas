import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Detestadoticket } from './detestadoticket/detestadoticket.entity';
import { Ticket } from './ticket.entity';

@ViewEntity({
  name: 'ultimoestadoticket',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select([
        'ticket.id as id',
        'ticket.idreferencia as idreferencia',
        'ticket.fecha as fecha',
        'ticket.codigo as codigo',
        'ticket.preferencial as preferencial',
        'ticket.correlativo as correlativo',
        'ticket.fechacorta as fechacorta',
        'ticket.idventanilla as idventanilla',
        't1.estadoticketId as estadoticketId',
        't1.ticketId as ticketId',
        't1.identificador as identificador',
        't1.fecha AS detallefecha',
      ])
      .from(Detestadoticket, 't1')
      .innerJoin(Ticket, 'ticket', 'ticket.id = t1.ticketId')
      .where(sq => {
        const subQuery = sq
          .subQuery()
          .select('max( t2.fecha )')
          .from(Detestadoticket, 't2')
          .where('t1.ticketId = t2.ticketId')
          .getQuery();
        return 't1.fecha = ' + subQuery;
      })
      .andWhere(
        `t1.fecha between CURRENT_DATE and CURRENT_DATE + INTERVAL '1 day'`,
      ),
})
export class TicketEstadoVista {
  @ViewColumn()
  codigo: string;

  @ViewColumn()
  preferencial: boolean;

  @ViewColumn()
  correlativo: string;

  @ViewColumn()
  fechacorta: Date | string;
}
