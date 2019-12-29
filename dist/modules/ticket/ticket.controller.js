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
const ticket_service_1 = require("./ticket.service");
const ticket_dto_1 = require("./ticket.dto");
const swagger_1 = require("@nestjs/swagger");
const PDFDocument = require("pdfkit");
const fs = require("fs");
var download = require('download-file');
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    reporte(response) {
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
        return { filemame: file };
    }
    obtenerTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketService.getTickets();
        });
    }
    buscarReferencia(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketService.encontrarReferencia(data);
        });
    }
    crearTicket(ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketService.crearTicket(ticket);
        });
    }
    asignarVentanilla(idticket, idventanilla) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketService.asignarVentanilla(idticket, idventanilla);
        });
    }
    ticketUrgente(idticket) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ticketService.ticketUrgente(idticket);
        });
    }
    guardarNuevoEstado(idticket, idestado) {
        return this.ticketService.guardarNuevoEstado(idticket, idestado);
    }
    derivarOtraVentanilla(idticket, idventanilla) {
        return this.ticketService.derivarOtraVentanilla(idticket, idventanilla);
    }
    guardarTramiteEnTicket(idticket, actualizarTematicaTramite) {
        return this.ticketService.actualizarTematicaOrTramite(idticket, actualizarTematicaTramite);
    }
};
__decorate([
    common_1.Get('reporte'),
    common_1.Header('Content-Type', 'application/pdf'),
    common_1.Header('Content-Disposition', 'attachment; filename=reporte.pdf'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "reporte", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Listar Tickets',
        description: 'Consulta para listar tickets de día actual',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Lista de Tickets',
        isArray: true,
        type: ticket_dto_1.TicketRO,
    }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "obtenerTickets", null);
__decorate([
    common_1.Post('/referencia'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "buscarReferencia", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Crear Ticket',
        description: 'Consulta para crear nuevo Ticket',
    }),
    swagger_1.ApiResponse({ status: 201, description: 'Crear Ticket', isArray: false }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_dto_1.TicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "crearTicket", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Asignar Ventanilla',
        description: 'Asignación de Ticket a Ventanilla',
    }),
    swagger_1.ApiResponse({ status: 200, description: '', isArray: false }),
    common_1.Put(':idticket/asignar/:idventanilla'),
    __param(0, common_1.Param('idticket')),
    __param(1, common_1.Param('idventanilla')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "asignarVentanilla", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Asignar Urgente Ticket',
        description: 'Consulta para asignar urgencia a Ticket',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Asignar Urgente a Ticket',
        isArray: false,
    }),
    common_1.Put(':id/urgente'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "ticketUrgente", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Guardar Nuevo Estado para Ticket',
        description: 'Guardar nuevo estado en DetEstadoTicket',
    }),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Guardar Nuevo Estado a Ticket',
        isArray: false,
    }),
    common_1.Post(':idticket/estado/:idestado'),
    __param(0, common_1.Param('idticket')),
    __param(1, common_1.Param('idestado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "guardarNuevoEstado", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Derivar Ticket',
        description: 'Derivar ticket a Otra Ventanilla',
    }),
    swagger_1.ApiResponse({ status: 200, description: 'Derivar Ticket', isArray: true }),
    common_1.Post(':idticket/derivar/:idventanilla'),
    __param(0, common_1.Param('idticket')),
    __param(1, common_1.Param('idventanilla')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "derivarOtraVentanilla", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Tramite a Ticket',
        description: 'Guardar tramite en Ticket',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Actualizar temática o trámite a Ticket',
        isArray: false,
    }),
    common_1.Put(':idticket/tematica/tramite'),
    __param(0, common_1.Param('idticket')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "guardarTramiteEnTicket", null);
TicketController = __decorate([
    swagger_1.ApiUseTags('Ticket'),
    common_1.Controller('ticket'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map