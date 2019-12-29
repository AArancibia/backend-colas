import { Ventanilla } from '../ventanilla.entity';
import { Estado } from '../../ticket/estadoticket/estadoticket.entity';
export declare class Detestadoventanilla {
    ventanilla: Ventanilla;
    tbVentanillaId: number;
    estado: Estado;
    tbEstadoventanillaId: number;
    identificador: string;
    fecha: Date | string;
    asignarFecha(): void;
}
