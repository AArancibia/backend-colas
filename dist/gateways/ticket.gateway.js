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
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const utils_1 = require("../shared/utils");
const ticket_entity_1 = require("../modules/ticket/ticket.entity");
const detestadoticket_entity_1 = require("../modules/ticket/detestadoticket/detestadoticket.entity");
const moment = require("moment");
let TicketGateway = class TicketGateway {
    constructor(ticketRepository, detestadoRepository) {
        this.ticketRepository = ticketRepository;
        this.detestadoRepository = detestadoRepository;
        this.logger = new common_1.Logger('WebSocketsTicket');
    }
    toReponseObject(ticket) {
        for (let i = 0; i <= ticket.estadosIds.length; i++) {
            const estado = ticket.estadosIds[i];
            this.logger.log(estado);
            if (estado == 4) {
                this.logger.log('hay 4');
                return;
            }
        }
        return ticket;
    }
    listarTickets(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield this.ticketRepository.find({
                relations: ['estados', 'detEstados'],
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
    llamadaTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield typeorm_1.getConnection().manager.query(`select * from ULTIMOESTADOTICKET`);
            const ultimoEstado = [];
            tickets.map((item, index, array) => {
                const { idticket, idtematica, idtramite, codigo, correlativo, urgente, fecha, fechacorta, idventanilla, idtipoticket, idadministrado, preferencial, estadoticketId, ticketId, identificador, detallefecha, administradoid, nrodoc, nombre, apepat, apemat, idcontribuyente, } = item;
                const elemento = {
                    estadoticketId,
                    ticketId,
                    identificador,
                    fecha: detallefecha,
                    ticket: {
                        id: idticket,
                        idtematica,
                        idtramite,
                        codigo,
                        correlativo,
                        urgente,
                        fecha,
                        idventanilla,
                        idtipoticket,
                        idadministrado,
                        preferencial,
                        fechacorta,
                        administrado: {
                            id: administradoid,
                            nrodoc,
                            nombre,
                            apepat,
                            apemat,
                            idcontribuyente,
                        },
                    },
                };
                ultimoEstado.push(elemento);
            });
            return ultimoEstado;
        });
    }
    getDetEstadoTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha2 = moment(utils_1.formatFechaCorta())
                .add('days', 1)
                .format('YYYY-MM-DD');
            const qb = yield this.detestadoRepository.createQueryBuilder('t1');
            const detTickets = qb
                .innerJoinAndSelect('t1.ticket', 'ticket')
                .where(sq => {
                const subQuery = qb
                    .subQuery()
                    .select('max( fecha )')
                    .from(detestadoticket_entity_1.Detestadoticket, 't2')
                    .where('t1.ticketId = t2.ticketId')
                    .getQuery();
                return 't1.fecha = ' + subQuery;
            })
                .andWhere(' t1.fecha between :fec1 and :fec2 ', {
                fec1: `${utils_1.formatFechaCorta()} ` + '00:00:00',
                fec2: `${fecha2} ` + '00:00:00',
            })
                .getMany();
            return detTickets;
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], TicketGateway.prototype, "ws", void 0);
__decorate([
    websockets_1.SubscribeMessage('[TICKET] Lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TicketGateway.prototype, "listarTickets", null);
__decorate([
    websockets_1.SubscribeMessage('[TICKET] LLAMARTICKET'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketGateway.prototype, "llamadaTickets", null);
__decorate([
    websockets_1.SubscribeMessage('[TICKET] DETESTADO'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketGateway.prototype, "getDetEstadoTicket", null);
TicketGateway = __decorate([
    websockets_1.WebSocketGateway(8081, {
        namespace: 'ticket',
    }),
    __param(0, typeorm_2.InjectRepository(ticket_entity_1.Ticket)),
    __param(1, typeorm_2.InjectRepository(detestadoticket_entity_1.Detestadoticket)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], TicketGateway);
exports.TicketGateway = TicketGateway;
//# sourceMappingURL=ticket.gateway.js.map