import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket } from '../modules/ticket/ticket.entity';
import { Detestadoticket } from '../modules/ticket/detestadoticket/detestadoticket.entity';
export declare class TicketGateway {
    private ticketRepository;
    private detestadoRepository;
    logger: Logger;
    ws: any;
    constructor(ticketRepository: Repository<Ticket>, detestadoRepository: Repository<Detestadoticket>);
    private toReponseObject;
    listarTickets(client: any, data: any): Promise<any>;
    llamadaTickets(): Promise<any[]>;
    getDetEstadoTicket(): Promise<Detestadoticket[]>;
}
