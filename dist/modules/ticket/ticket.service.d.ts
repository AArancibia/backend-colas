/// <reference types="pdfkit" />
import { Ticket } from './ticket.entity';
import { Estado } from './estadoticket/estadoticket.entity';
import { Repository } from 'typeorm';
import { TicketDto } from './ticket.dto';
import { Ventanilla } from '../ventanilla/ventanilla.entity';
import { TicketGateway } from '../../gateways/ticket.gateway';
import { Detestadoticket } from './detestadoticket/detestadoticket.entity';
import { VentanillaService } from '../ventanilla/ventanilla.service';
import { DetestadoticketService } from './detestadoticket/detestadoticket.service';
import { Ventanillareferencia } from '../ventanillareferencia/ventanillareferencia.entity';
export declare class TicketService {
    private ticketRepository;
    private estadoRepository;
    private ventanillaReferenciaRepository;
    private detEstadoTicketRepository;
    private ventanillaRepository;
    private ventanillaService;
    private detEstadoTicketService;
    private wsTicket;
    private logger;
    constructor(ticketRepository: Repository<Ticket>, estadoRepository: Repository<Estado>, ventanillaReferenciaRepository: Repository<Ventanillareferencia>, detEstadoTicketRepository: Repository<Detestadoticket>, ventanillaRepository: Repository<Ventanilla>, ventanillaService: VentanillaService, detEstadoTicketService: DetestadoticketService, wsTicket: TicketGateway);
    reporteTicket(response: any): PDFKit.PDFDocument;
    actualizarTematicaOrTramite(idticket: number, ticket: any): Promise<void>;
    encontrarReferencia(data: any): Promise<Ventanillareferencia[]>;
    getTickets(): Promise<Ticket[]>;
    crearTicket(ticket: TicketDto): Promise<Ticket>;
    guardarNuevoEstado(idticket: number, idestado: number): Promise<Ticket>;
    asignarVentanilla(idticket: number, idventanilla: number): Promise<Ticket>;
    derivarOtraVentanilla(idticket: number, idventanilla: number): Promise<Ticket>;
    ticketUrgente(idticket: number): Promise<void>;
    obtenerCorrelativo(): Promise<number>;
}
