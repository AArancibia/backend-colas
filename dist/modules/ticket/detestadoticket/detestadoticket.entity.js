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
const ticket_entity_1 = require("../ticket.entity");
const estadoticket_entity_1 = require("../estadoticket/estadoticket.entity");
const utils_1 = require("../../../shared/utils");
let Detestadoticket = class Detestadoticket {
    asignarFecha() {
        this.fecha = utils_1.formatFechaLarga();
    }
};
__decorate([
    typeorm_1.ManyToOne(type => ticket_entity_1.Ticket, ticket => ticket.estados),
    typeorm_1.JoinColumn({ name: 'ticketId' }),
    __metadata("design:type", ticket_entity_1.Ticket)
], Detestadoticket.prototype, "ticket", void 0);
__decorate([
    typeorm_1.Column('integer', { primary: true }),
    __metadata("design:type", Number)
], Detestadoticket.prototype, "ticketId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => estadoticket_entity_1.Estado, estado => estado.tickets),
    typeorm_1.JoinColumn({ name: 'estadoticketId' }),
    __metadata("design:type", estadoticket_entity_1.Estado)
], Detestadoticket.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column('integer', { primary: true }),
    __metadata("design:type", Number)
], Detestadoticket.prototype, "estadoticketId", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', {
        name: 'identificador',
        comment: 'Campo que es 3ra llave primaria',
    }),
    __metadata("design:type", String)
], Detestadoticket.prototype, "identificador", void 0);
__decorate([
    typeorm_1.Column('timestamp', { nullable: true }),
    __metadata("design:type", Object)
], Detestadoticket.prototype, "fecha", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Detestadoticket.prototype, "asignarFecha", null);
Detestadoticket = __decorate([
    typeorm_1.Entity('ticket_estados_estadoticket')
], Detestadoticket);
exports.Detestadoticket = Detestadoticket;
//# sourceMappingURL=detestadoticket.entity.js.map