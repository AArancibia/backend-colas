import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';

@Entity( 'tb_ventanilla')
export class Ventanilla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    comment: 'Codigo de la ventanilla',
    name: 'codigo_ventanilla',
  })
  codigoVentanilla: string;

  @Column( 'varchar', {
    name: 'ubicacion',
    comment: 'Ubicacion de la ventanilla',
    nullable: true,
  })
  ubicacion: string;

  @ManyToOne( type => Usuario, usuario => usuario.ventanillas )
  @JoinColumn({ name: 'idusuario'})
  usuario: Usuario;

  @Column('integer', {
    nullable: true,
  })
  idusuario: number;

  @ManyToMany( type => Estadoventanilla )
  @JoinTable()
  estados: Estadoventanilla[];

}
