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
const referencia_entity_1 = require("../referencia/referencia.entity");
let Ventanillareferencia = class Ventanillareferencia {
};
__decorate([
    typeorm_1.Column({
        name: 'idreferencia',
        comment: 'Valor donde se referncia del ticket ( area, tematica, tramite)',
        primary: true,
    }),
    __metadata("design:type", Number)
], Ventanillareferencia.prototype, "idreferencia", void 0);
__decorate([
    typeorm_1.Column({
        name: 'idventanilla',
        comment: 'Llave foranea de la ventanilla ',
        primary: true,
    }),
    __metadata("design:type", Number)
], Ventanillareferencia.prototype, "idventanilla", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ventanilla_entity_1.Ventanilla, ventanilla => ventanilla.ventanillareferencia),
    typeorm_1.JoinColumn({ name: 'idventanilla' }),
    __metadata("design:type", ventanilla_entity_1.Ventanilla)
], Ventanillareferencia.prototype, "ventanilla", void 0);
__decorate([
    typeorm_1.ManyToOne(type => referencia_entity_1.Referencia, referencia => referencia.ventanillareferencia),
    typeorm_1.JoinColumn({ name: 'idreferencia' }),
    __metadata("design:type", referencia_entity_1.Referencia)
], Ventanillareferencia.prototype, "referencia", void 0);
Ventanillareferencia = __decorate([
    typeorm_1.Entity('ventanillareferencia')
], Ventanillareferencia);
exports.Ventanillareferencia = Ventanillareferencia;
//# sourceMappingURL=ventanillareferencia.entity.js.map