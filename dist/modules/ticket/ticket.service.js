"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ticket_entity_1 = require("./ticket.entity");
const estadoticket_entity_1 = require("./estadoticket/estadoticket.entity");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../shared/utils");
const ventanilla_entity_1 = require("../ventanilla/ventanilla.entity");
const ticket_gateway_1 = require("../../gateways/ticket.gateway");
const detestadoticket_entity_1 = require("./detestadoticket/detestadoticket.entity");
const ventanilla_service_1 = require("../ventanilla/ventanilla.service");
const detestadoticket_service_1 = require("./detestadoticket/detestadoticket.service");
const ventanillareferencia_entity_1 = require("../ventanillareferencia/ventanillareferencia.entity");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const threads = require('threads');
const config = threads.config;
config.set({
    basepath: {
        node: __dirname,
    },
});
const spawn = threads.spawn;
let TicketService = class TicketService {
    constructor(ticketRepository, estadoRepository, ventanillaReferenciaRepository, detEstadoTicketRepository, ventanillaRepository, ventanillaService, detEstadoTicketService, wsTicket) {
        this.ticketRepository = ticketRepository;
        this.estadoRepository = estadoRepository;
        this.ventanillaReferenciaRepository = ventanillaReferenciaRepository;
        this.detEstadoTicketRepository = detEstadoTicketRepository;
        this.ventanillaRepository = ventanillaRepository;
        this.ventanillaService = ventanillaService;
        this.detEstadoTicketService = detEstadoTicketService;
        this.wsTicket = wsTicket;
        this.logger = new common_1.Logger('TicketService');
    }
    reporteTicket(response) {
        const file = __dirname + `/reporte.pdf`;
        const doc = new PDFDocument({
            layout: 'portrait',
            margin: 10,
            info: {
                Author: 'Alexis Arancibia Sanchez',
                Title: 'Reporte de tickets del Dia',
            },
        });
        doc.pipe(fs.createWriteStream(file));
        doc.text('HelloWorld!');
        doc.pipe(response);
        doc.end();
        return doc;
    }
    actualizarTematicaOrTramite(idticket, ticket) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    encontrarReferencia(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ventanillaReferencia = yield this.ventanillaReferenciaRepository.find({
                where: data,
            });
            return ventanillaReferencia;
        });
    }
    getTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield this.ticketRepository.find({
                relations: ['detEstados', 'estados'],
                where: {
                    fechacorta: utils_1.formatFechaCorta(),
                },
                order: { fecha: 'ASC' },
            });
            const ticketsRO = [];
            tickets.map(ticket => {
                ticket.detEstados.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
                const ultimoEstado = ticket.detEstados[0].estadoticketId;
                if (ultimoEstado === 4 || ultimoEstado === 6) {
                    return;
                }
                ticketsRO.push(ticket);
            });
            return ticketsRO;
        });
    }
    crearTicket(ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            const { preferencial, idreferencia } = ticket;
            const estado = yield this.estadoRepository.findOne({
                where: { idestado: 1 },
            });
            if (!estado)
                throw new common_1.HttpException(`No existe estados en la tabla`, common_1.HttpStatus.NOT_FOUND);
            this.logger.log(ticket);
            const nuevoTicket = yield this.ticketRepository.create(Object.assign({}, ticket, { preferencial,
                idreferencia }));
            nuevoTicket.estados = [estado];
            const correlativo = yield this.obtenerCorrelativo();
            nuevoTicket.correlativo = correlativo;
            nuevoTicket.codigo = `A-${preferencial ? 'P' : ''}${correlativo}`;
            yield this.ticketRepository.save(nuevoTicket);
            yield this.detEstadoTicketRepository.update({
                ticketId: nuevoTicket.id,
                estadoticketId: 1,
            }, { fecha: utils_1.formatFechaLarga() });
            const ticketBD = yield this.ticketRepository.findOne({
                where: { id: nuevoTicket.id },
                relations: ['detEstados', 'estados'],
            });
            this.wsTicket.ws.emit('[TICKET] Nuevo', ticketBD);
            const ticketAEmitir = yield this.wsTicket.getDetEstadoTicket();
            this.wsTicket.ws.emit('[TICKET] DETESTADO', ticketAEmitir);
            const thread = spawn('./detestadoticket/detestadoworker.ts');
            const gateway = this.wsTicket;
            const detTicketService = this.detEstadoTicketService;
            thread.send(ticketBD.detEstados).on('message', function (message) {
                return __awaiter(this, void 0, void 0, function* () {
                    const ticketSinAtender = yield detTicketService.obtenerUltimoEstadoTicket(message[0].ticketId);
                    if (ticketSinAtender === 1)
                        gateway.ws.emit('[TICKET] SINATENDER', ticketBD);
                    thread.kill();
                });
            });
            return ticketBD;
        });
    }
    guardarNuevoEstado(idticket, idestado) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.ticketRepository.findOne({
                where: { id: idticket },
            });
            if (!ticket)
                throw new common_1.HttpException(`No existe el ticket con el id: ${idticket}`, common_1.HttpStatus.NOT_FOUND);
            let idestadoVentanilla;
            if (idestado == 4 || idestado == 6) {
                idestadoVentanilla = 3;
            }
            else if (idestado == 3) {
                idestadoVentanilla = 2;
            }
            else if (idestado == 2) {
                idestadoVentanilla = 1;
            }
            yield this.ventanillaService.guardarNuevoEstado(ticket.idventanilla, idestadoVentanilla);
            const guardarDetEstadoTicket = yield this.detEstadoTicketRepository
                .createQueryBuilder()
                .insert()
                .into(detestadoticket_entity_1.Detestadoticket)
                .values({
                estadoticketId: idestado,
                ticketId: idticket,
                fecha: utils_1.formatFechaLarga(),
            })
                .returning(['*'])
                .execute();
            const ticketActualizado = yield this.ticketRepository.findOne({
                where: { id: idticket },
                relations: ['estados', 'detEstados'],
            });
            this.wsTicket.ws.emit('[TICKET] NUEVO ESTADO', ticketActualizado);
            const ticketAEmitir = yield this.wsTicket.getDetEstadoTicket();
            this.wsTicket.ws.emit('[TICKET] DETESTADO', ticketAEmitir);
            return ticketActualizado;
        });
    }
    asignarVentanilla(idticket, idventanilla) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.ticketRepository.findOne({
                where: { id: idticket },
                relations: ['estados'],
            });
            if (!ticket)
                throw new common_1.HttpException(`No existe el ticket con el id: ${idticket}`, common_1.HttpStatus.NOT_FOUND);
            const ventanilla = yield this.ventanillaRepository.findOne({
                where: { idventanilla },
            });
            if (!ventanilla)
                throw new common_1.HttpException(`No existe la ventanilla con el id: ${idventanilla}`, common_1.HttpStatus.NOT_FOUND);
            const llamandoEstado = yield this.estadoRepository.findOne({
                where: { id: 2 },
            });
            ticket.estados = [...ticket.estados, llamandoEstado];
            const actualizarTicket = yield this.ticketRepository.create(Object.assign({}, ticket, { idventanilla }));
            yield this.ticketRepository.save(actualizarTicket);
            yield this.detEstadoTicketRepository.update({
                ticketId: idticket,
                estadoticketId: 2,
            }, { fecha: utils_1.formatFechaLarga() });
            const ticketparaEmitir = yield yield this.ticketRepository.findOne({
                where: { id: idticket },
                relations: ['detEstados'],
            });
            const ticketAEmitir = yield this.wsTicket.getDetEstadoTicket();
            this.wsTicket.ws.emit('[TICKET] DETESTADO', ticketAEmitir);
            this.wsTicket.ws.emit('ventanillaAsignadaAlTicket', ticketparaEmitir);
            yield this.ventanillaService.guardarNuevoEstado(idventanilla, 1);
            const ticketllamando = yield this.wsTicket.llamadaTickets();
            this.wsTicket.ws.emit('[TICKET] LLAMARTICKET', ticketllamando);
            return actualizarTicket;
        });
    }
    derivarOtraVentanilla(idticket, idventanilla) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.ticketRepository.findOne({
                where: { id: idticket },
            });
            if (!ticket)
                throw new common_1.HttpException(`No existe el ticket con el id: ${idticket}`, common_1.HttpStatus.NOT_FOUND);
            const ventanillaAntigua = ticket.idventanilla;
            const ventanilla = yield this.ventanillaRepository.findOne({
                where: { idventanilla },
            });
            if (!ventanilla)
                throw new common_1.HttpException(`No existe la ventanilla con el id: ${idventanilla}`, common_1.HttpStatus.NOT_FOUND);
            const estadosTickets = yield this.detEstadoTicketRepository.find({
                where: { ticketId: idticket },
            });
            const borrarTickets = yield this.detEstadoTicketRepository.remove(estadosTickets);
            const buscarEstados = yield this.estadoRepository.find({
                where: { id: typeorm_2.In([5, 1]) },
            });
            yield this.ventanillaService.guardarNuevoEstado(ventanillaAntigua, 3, true);
            yield this.ventanillaService.guardarNuevoEstado(idventanilla, 3);
            yield this.detEstadoTicketRepository.save({
                ticketId: idticket,
                estadoticketId: buscarEstados[1].id,
                fecha: utils_1.formatFechaLarga(),
            });
            yield this.detEstadoTicketRepository.save({
                ticketId: idticket,
                estadoticketId: buscarEstados[0].id,
                fecha: utils_1.formatFechaLarga(),
            });
            yield this.ticketRepository.update(idticket, {
                idventanilla,
            });
            const ticketaEmitir = yield this.ticketRepository.findOne({
                where: { id: idticket },
                relations: ['detEstados'],
            });
            this.wsTicket.ws.emit('[TICKET] DERIVADO', {
                ticketaEmitir,
                ventanillaAntigua,
            });
            const ticketAEmitir = yield this.wsTicket.getDetEstadoTicket();
            this.wsTicket.ws.emit('[TICKET] DETESTADO', ticketAEmitir);
            return ticketaEmitir;
        });
    }
    ticketUrgente(idticket) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    obtenerCorrelativo() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield this.ticketRepository.findOne({
                where: {
                    fechacorta: utils_1.formatFechaCorta(),
                },
                select: ['correlativo'],
                order: { correlativo: 'DESC' },
            });
            let correlativo = !ticket ? 0 : ticket.correlativo++;
            correlativo++;
            return correlativo;
        });
    }
};
TicketService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(ticket_entity_1.Ticket)),
    __param(1, typeorm_1.InjectRepository(estadoticket_entity_1.Estado)),
    __param(2, typeorm_1.InjectRepository(ventanillareferencia_entity_1.Ventanillareferencia)),
    __param(3, typeorm_1.InjectRepository(detestadoticket_entity_1.Detestadoticket)),
    __param(4, typeorm_1.InjectRepository(ventanilla_entity_1.Ventanilla)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        ventanilla_service_1.VentanillaService,
        detestadoticket_service_1.DetestadoticketService,
        ticket_gateway_1.TicketGateway])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map