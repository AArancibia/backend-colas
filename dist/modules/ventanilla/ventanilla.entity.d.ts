import { Usuario } from '../usuario/usuario.entity';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { Ticket } from '../ticket/ticket.entity';
import { Ventanillareferencia } from '../ventanillareferencia/ventanillareferencia.entity';
export declare class Ventanilla {
    id: number;
    codigoventanilla: string;
    ubicacion: string;
    tickets: Ticket;
    usuario: Usuario;
    idusuario: number;
    unica: boolean;
    estados: Estadoventanilla[];
    ventanillareferencia: Ventanillareferencia[];
}
