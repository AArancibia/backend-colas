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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const detestadoticket_entity_1 = require("./detestadoticket/detestadoticket.entity");
const ticket_entity_1 = require("./ticket.entity");
let TicketEstadoVista = class TicketEstadoVista {
};
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], TicketEstadoVista.prototype, "codigo", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Boolean)
], TicketEstadoVista.prototype, "preferencial", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", String)
], TicketEstadoVista.prototype, "correlativo", void 0);
__decorate([
    typeorm_1.ViewColumn(),
    __metadata("design:type", Object)
], TicketEstadoVista.prototype, "fechacorta", void 0);
TicketEstadoVista = __decorate([
    typeorm_1.ViewEntity({
        name: 'ultimoestadoticket',
        expression: (connection) => connection
            .createQueryBuilder()
            .select([
            'ticket.id as id',
            'ticket.idreferencia as idreferencia',
            'ticket.fecha as fecha',
            'ticket.codigo as codigo',
            'ticket.preferencial as preferencial',
            'ticket.correlativo as correlativo',
            'ticket.fechacorta as fechacorta',
            'ticket.idventanilla as idventanilla',
            't1.estadoticketId as estadoticketId',
            't1.ticketId as ticketId',
            't1.identificador as identificador',
            't1.fecha AS detallefecha',
        ])
            .from(detestadoticket_entity_1.Detestadoticket, 't1')
            .innerJoin(ticket_entity_1.Ticket, 'ticket', 'ticket.id = t1.ticketId')
            .where(sq => {
            const subQuery = sq
                .subQuery()
                .select('max( t2.fecha )')
                .from(detestadoticket_entity_1.Detestadoticket, 't2')
                .where('t1.ticketId = t2.ticketId')
                .getQuery();
            return 't1.fecha = ' + subQuery;
        })
            .andWhere(`t1.fecha between CURRENT_DATE and CURRENT_DATE + INTERVAL '1 day'`),
    })
], TicketEstadoVista);
exports.TicketEstadoVista = TicketEstadoVista;
//# sourceMappingURL=ticketestado.entity.js.map