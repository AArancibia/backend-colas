import { ViewEntity, Connection } from 'typeorm';

@ViewEntity({
  name: 'ULTIMOESTADOVENTANILLA',
  expression: (connection: Connection) =>
    connection.createQueryBuilder().select([]),
})
export class VentanillaUltimoEstado {}
