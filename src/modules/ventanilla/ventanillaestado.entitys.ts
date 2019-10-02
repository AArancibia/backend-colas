import { ViewEntity, Connection } from 'typeorm';
import { Ventanilla } from './ventanilla.entity';
import { Detestadoventanilla } from './detestadoventanilla/detestadoventanilla.entity';

@ViewEntity({
  name: 'ULTIMOESTADOVENTANILLA',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select(['*'])
      .from(qb => {
        qb.select(['ventanilla.id', 'ventanilla.codigoventanilla'])
          .from(Ventanilla, 'ventanilla')
          .leftJoin(qb2 => {
            qb2
              .select(['tbestadov.tbVentanillaId'])
              .from(Detestadoventanilla, '')
              .where('fecha = CURRENT_DATE');
            return qb2.getQuery();
          }, 'tbestadov');
        return qb.getQuery();
      }, 'R2'),
})
export class VentanillaUltimoEstado {}
