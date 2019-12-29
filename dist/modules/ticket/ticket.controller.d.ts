import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { TicketDto } from './ticket.dto';
import { Response } from 'express';
export declare class TicketController {
    private ticketService;
    constructor(ticketService: TicketService);
    reporte(response: Response): {
        filemame: string;
    };
    obtenerTickets(): Promise<Ticket[]>;
    buscarReferencia(data: any): Promise<import("../ventanillareferencia/ventanillareferencia.entity").Ventanillareferencia[]>;
    crearTicket(ticket: TicketDto): Promise<Ticket>;
    asignarVentanilla(idticket: number, idventanilla: number): Promise<Ticket>;
    ticketUrgente(idticket: number): Promise<void>;
    guardarNuevoEstado(idticket: number, idestado: number): Promise<Ticket>;
    derivarOtraVentanilla(idticket: number, idventanilla: number): Promise<Ticket>;
    guardarTramiteEnTicket(idticket: number, actualizarTematicaTramite: any): Promise<void>;
}
