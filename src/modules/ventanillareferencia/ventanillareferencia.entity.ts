import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ventanillareferencia')
export class Ventanillareferencia {
  @PrimaryGeneratedColumn('increment')
  idventanillareferencia: number;

  @Column({
    name: 'idreferencia',
    comment: 'Valor donde se referncia del ticket ( area, tematica, tramite)',
  })
  idreferencia: number;
}
