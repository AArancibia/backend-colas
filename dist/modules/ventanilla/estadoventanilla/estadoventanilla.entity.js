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
let Estadoventanilla = class Estadoventanilla {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Estadoventanilla.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'descripcion',
    }),
    __metadata("design:type", String)
], Estadoventanilla.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.ManyToMany(type => ventanilla_entity_1.Ventanilla),
    __metadata("design:type", Array)
], Estadoventanilla.prototype, "ventanillas", void 0);
Estadoventanilla = __decorate([
    typeorm_1.Entity('tb_estadoventanilla')
], Estadoventanilla);
exports.Estadoventanilla = Estadoventanilla;
//# sourceMappingURL=estadoventanilla.entity.js.map