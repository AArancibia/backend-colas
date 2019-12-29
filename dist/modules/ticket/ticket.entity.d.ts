import { Ventanilla } from '../ventanilla/ventanilla.entity';
import { Estado } from './estadoticket/estadoticket.entity';
import { Detestadoticket } from './detestadoticket/detestadoticket.entity';
export declare class Ticket {
    id: number;
    idreferencia: number;
    fecha: Date | string;
    codigo: string;
    preferencial: boolean;
    correlativo: number;
    fechacorta: Date | string;
    estados: Estado[];
    detEstados: Detestadoticket[];
    ventanilla: Ventanilla;
    idventanilla: number;
    estadosIds: number[];
    asignarFecha(): void;
    asignarFechaCorta(): void;
}
