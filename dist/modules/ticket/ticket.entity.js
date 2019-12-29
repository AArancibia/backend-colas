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
const ventanilla_entity_1 = require("../ventanilla/ventanilla.entity");
const estadoticket_entity_1 = require("./estadoticket/estadoticket.entity");
const utils_1 = require("../../shared/utils");
const detestadoticket_entity_1 = require("./detestadoticket/detestadoticket.entity");
let Ticket = class Ticket {
    asignarFecha() {
        this.fecha = new Date();
    }
    asignarFechaCorta() {
        this.fechacorta = utils_1.formatFechaCorta();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('integer', {
        nullable: true,
    }),
    __metadata("design:type", Number)
], Ticket.prototype, "idreferencia", void 0);
__decorate([
    typeorm_1.Column('timestamp', { nullable: false }),
    __metadata("design:type", Object)
], Ticket.prototype, "fecha", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        nullable: false,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "codigo", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        nullable: true,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Ticket.prototype, "preferencial", void 0);
__decorate([
    typeorm_1.Column('bigint', {
        nullable: false,
    }),
    __metadata("design:type", Number)
], Ticket.prototype, "correlativo", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Object)
], Ticket.prototype, "fechacorta", void 0);
__decorate([
    typeorm_1.ManyToMany(type => estadoticket_entity_1.Estado, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Ticket.prototype, "estados", void 0);
__decorate([
    typeorm_1.OneToMany(type => detestadoticket_entity_1.Detestadoticket, det => det.ticket, { cascade: true }),
    __metadata("design:type", Array)
], Ticket.prototype, "detEstados", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ventanilla_entity_1.Ventanilla, ventanilla => ventanilla.id),
    typeorm_1.JoinColumn({ name: 'idventanilla' }),
    __metadata("design:type", ventanilla_entity_1.Ventanilla)
], Ticket.prototype, "ventanilla", void 0);
__decorate([
    typeorm_1.Column('integer', {
        nullable: true,
    }),
    __metadata("design:type", Number)
], Ticket.prototype, "idventanilla", void 0);
__decorate([
    typeorm_1.RelationId((tickets) => tickets.estados),
    __metadata("design:type", Array)
], Ticket.prototype, "estadosIds", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ticket.prototype, "asignarFecha", null);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ticket.prototype, "asignarFechaCorta", null);
Ticket = __decorate([
    typeorm_1.Entity('ticket')
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.entity.js.map