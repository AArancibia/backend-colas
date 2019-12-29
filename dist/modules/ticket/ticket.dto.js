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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class TicketDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNotEmpty({
        message: 'Valor no debe ser nulo',
    }),
    class_validator_1.IsNumber({
        allowNaN: false,
    }, {
        message: 'El valor tiene que ser numero',
    }),
    __metadata("design:type", Number)
], TicketDto.prototype, "idreferencia", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsBoolean({
        message: 'El valor tiene que ser verdadero o falso',
    }),
    __metadata("design:type", Boolean)
], TicketDto.prototype, "preferencial", void 0);
exports.TicketDto = TicketDto;
class TicketRO {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TicketRO.prototype, "idticket", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TicketRO.prototype, "codigo", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TicketRO.prototype, "fecha", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TicketRO.prototype, "idadministrado", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TicketRO.prototype, "idtipoticket", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TicketRO.prototype, "idtematica", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TicketRO.prototype, "idtramite", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TicketRO.prototype, "preferencial", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TicketRO.prototype, "urgente", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TicketRO.prototype, "idventanilla", void 0);
exports.TicketRO = TicketRO;
//# sourceMappingURL=ticket.dto.js.map