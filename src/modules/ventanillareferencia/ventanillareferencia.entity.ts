import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Ventanilla } from '../ventanilla/ventanilla.entity';

@Entity('ventanillareferencia')
export class Ventanillareferencia {
  @PrimaryGeneratedColumn('increment')
  idventanillareferencia: number;

  @Column({
    name: 'idreferencia',
    comment: 'Valor donde se referncia del ticket ( area, tematica, tramite)',
  })
  idreferencial: number;

  @Column({
    name: 'idventanilla',
    comment: 'Llave foranea de la ventanilla ',
  })
  idventanilla: number;

  @ManyToOne( type => Ventanilla, ventanilla => ventanilla.ventanillareferencias )
  @JoinColumn({ name: 'idventanilla'})
  ventanilllas: Ventanilla;

}
