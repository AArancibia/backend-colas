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
const ventanilla_entity_1 = require("../ventanilla.entity");
const estadoticket_entity_1 = require("../../ticket/estadoticket/estadoticket.entity");
const estadoventanilla_entity_1 = require("../estadoventanilla/estadoventanilla.entity");
const utils_1 = require("../../../shared/utils");
let Detestadoventanilla = class Detestadoventanilla {
    asignarFecha() {
        this.fecha = utils_1.formatFechaLarga();
    }
};
__decorate([
    typeorm_1.ManyToOne(type => ventanilla_entity_1.Ventanilla, ventanilla => ventanilla.estados),
    typeorm_1.JoinColumn({ name: 'tbVentanillaId' }),
    __metadata("design:type", ventanilla_entity_1.Ventanilla)
], Detestadoventanilla.prototype, "ventanilla", void 0);
__decorate([
    typeorm_1.Column('integer', { primary: true }),
    __metadata("design:type", Number)
], Detestadoventanilla.prototype, "tbVentanillaId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => estadoventanilla_entity_1.Estadoventanilla, estadoventanilla => estadoventanilla.ventanillas),
    typeorm_1.JoinColumn({ name: 'tbEstadoventanillaId' }),
    __metadata("design:type", estadoticket_entity_1.Estado)
], Detestadoventanilla.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column('integer', { primary: true }),
    __metadata("design:type", Number)
], Detestadoventanilla.prototype, "tbEstadoventanillaId", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', {
        name: 'identificador',
        comment: 'Campo que es 3ra llave primaria',
    }),
    __metadata("design:type", String)
], Detestadoventanilla.prototype, "identificador", void 0);
__decorate([
    typeorm_1.Column('timestamp', {
        nullable: true,
    }),
    __metadata("design:type", Object)
], Detestadoventanilla.prototype, "fecha", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Detestadoventanilla.prototype, "asignarFecha", null);
Detestadoventanilla = __decorate([
    typeorm_1.Entity({ name: 'tb_ventanilla_estados_tb_estadoventanilla' })
], Detestadoventanilla);
exports.Detestadoventanilla = Detestadoventanilla;
//# sourceMappingURL=detestadoventanilla.entity.js.map