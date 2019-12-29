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
let Estado = class Estado {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Estado.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        name: 'nombre',
        comment: 'Nombre del estado del ticket'
    }),
    __metadata("design:type", String)
], Estado.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({
        name: 'abr',
        comment: 'Abreviatura del estado del ticket'
    }),
    __metadata("design:type", String)
], Estado.prototype, "abr", void 0);
__decorate([
    typeorm_1.ManyToMany(type => ticket_entity_1.Ticket),
    __metadata("design:type", Array)
], Estado.prototype, "tickets", void 0);
Estado = __decorate([
    typeorm_1.Entity('estadoticket')
], Estado);
exports.Estado = Estado;
//# sourceMappingURL=estadoticket.entity.js.map