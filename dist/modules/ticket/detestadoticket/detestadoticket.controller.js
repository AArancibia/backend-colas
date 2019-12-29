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
const common_1 = require("@nestjs/common");
const detestadoticket_service_1 = require("./detestadoticket.service");
const swagger_1 = require("@nestjs/swagger");
let DetestadoticketController = class DetestadoticketController {
    constructor(detEstadoService) {
        this.detEstadoService = detEstadoService;
    }
    getDetalleEstadosTickets() {
        return this.detEstadoService.getDetEstadoTicket();
    }
};
__decorate([
    swagger_1.ApiOperation({
        title: 'Obtener Detalle de Estados de Ticket',
        description: 'Los estados que tiene cada Ticket',
    }),
    swagger_1.ApiResponse({ status: 200, description: 'Lista de ticket con sus estado', isArray: true }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DetestadoticketController.prototype, "getDetalleEstadosTickets", null);
DetestadoticketController = __decorate([
    swagger_1.ApiUseTags('DetEstadoTicket'),
    common_1.Controller('detestadoticket'),
    __metadata("design:paramtypes", [detestadoticket_service_1.DetestadoticketService])
], DetestadoticketController);
exports.DetestadoticketController = DetestadoticketController;
//# sourceMappingURL=detestadoticket.controller.js.map