import { Ticket } from '../ticket.entity';
import { Estado } from '../estadoticket/estadoticket.entity';
export declare class Detestadoticket {
    ticket: Ticket;
    ticketId: number;
    estado: Estado;
    estadoticketId: number;
    identificador: string;
    fecha: Date | string;
    asignarFecha(): void;
}
