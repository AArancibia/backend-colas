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
const usuario_entity_1 = require("../usuario/usuario.entity");
const estadoventanilla_entity_1 = require("./estadoventanilla/estadoventanilla.entity");
const ticket_entity_1 = require("../ticket/ticket.entity");
const ventanillareferencia_entity_1 = require("../ventanillareferencia/ventanillareferencia.entity");
let Ventanilla = class Ventanilla {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ventanilla.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        nullable: false,
        comment: 'Codigo de la ventanilla',
        name: 'codigoventanilla',
    }),
    __metadata("design:type", String)
], Ventanilla.prototype, "codigoventanilla", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'ubicacion',
        comment: 'Ubicacion de la ventanilla',
        nullable: true,
    }),
    __metadata("design:type", String)
], Ventanilla.prototype, "ubicacion", void 0);
__decorate([
    typeorm_1.OneToMany(type => ticket_entity_1.Ticket, ticket => ticket.ventanilla),
    __metadata("design:type", ticket_entity_1.Ticket)
], Ventanilla.prototype, "tickets", void 0);
__decorate([
    typeorm_1.ManyToOne(type => usuario_entity_1.Usuario, usuario => usuario.ventanillas),
    typeorm_1.JoinColumn({ name: 'idusuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Ventanilla.prototype, "usuario", void 0);
__decorate([
    typeorm_1.Column('integer', {
        nullable: true,
    }),
    __metadata("design:type", Number)
], Ventanilla.prototype, "idusuario", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], Ventanilla.prototype, "unica", void 0);
__decorate([
    typeorm_1.ManyToMany(type => estadoventanilla_entity_1.Estadoventanilla),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Ventanilla.prototype, "estados", void 0);
__decorate([
    typeorm_1.OneToMany(type => ventanillareferencia_entity_1.Ventanillareferencia, ventanillareferencia => ventanillareferencia.ventanilla),
    __metadata("design:type", Array)
], Ventanilla.prototype, "ventanillareferencia", void 0);
Ventanilla = __decorate([
    typeorm_1.Entity('tb_ventanilla')
], Ventanilla);
exports.Ventanilla = Ventanilla;
//# sourceMappingURL=ventanilla.entity.js.map