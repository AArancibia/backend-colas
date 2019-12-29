"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ventanilla_entity_1 = require("./ventanilla.entity");
const detestadoventanilla_entity_1 = require("./detestadoventanilla/detestadoventanilla.entity");
let VentanillaUltimoEstado = class VentanillaUltimoEstado {
};
VentanillaUltimoEstado = __decorate([
    typeorm_1.ViewEntity({
        name: 'ULTIMOESTADOVENTANILLA',
        expression: (connection) => connection
            .createQueryBuilder()
            .select(['*'])
            .from(qb => {
            qb.select(['ventanilla.id', 'ventanilla.codigoventanilla'])
                .from(ventanilla_entity_1.Ventanilla, 'ventanilla')
                .leftJoin(qb2 => {
                qb2
                    .select(['tbestadov.tbVentanillaId'])
                    .from(detestadoventanilla_entity_1.Detestadoventanilla, '')
                    .where('fecha = CURRENT_DATE');
                return qb2.getQuery();
            }, 'tbestadov');
            return qb.getQuery();
        }, 'R2'),
    })
], VentanillaUltimoEstado);
exports.VentanillaUltimoEstado = VentanillaUltimoEstado;
//# sourceMappingURL=ventanillaestado.entitys.js.map