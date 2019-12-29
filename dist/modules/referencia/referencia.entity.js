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
const ventanillareferencia_entity_1 = require("../ventanillareferencia/ventanillareferencia.entity");
let Referencia = class Referencia {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Referencia.prototype, "idreferencia", void 0);
__decorate([
    typeorm_1.Column({
        name: 'descripcion',
        comment: 'Descripcion de la llave si es de area, idtupa o idtramite',
        nullable: true,
    }),
    __metadata("design:type", String)
], Referencia.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.OneToMany(type => ventanillareferencia_entity_1.Ventanillareferencia, ventanillareferencia => ventanillareferencia.referencia),
    __metadata("design:type", Array)
], Referencia.prototype, "ventanillareferencia", void 0);
Referencia = __decorate([
    typeorm_1.Entity('referencia')
], Referencia);
exports.Referencia = Referencia;
//# sourceMappingURL=referencia.entity.js.map