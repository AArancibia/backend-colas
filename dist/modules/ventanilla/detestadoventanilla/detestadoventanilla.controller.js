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
const detestadoventanilla_service_1 = require("./detestadoventanilla.service");
const swagger_1 = require("@nestjs/swagger");
let DetestadoventanillaController = class DetestadoventanillaController {
    constructor(detEstadoVentanillaService) {
        this.detEstadoVentanillaService = detEstadoVentanillaService;
    }
    ultimoDetEstadoVentanilla() {
        return this.detEstadoVentanillaService.ultimoDetEstadoVentanilla();
    }
};
__decorate([
    swagger_1.ApiOperation({
        title: 'Ultimo Estado de Ventanillas',
        description: 'Servicion para listar los estados de las Ventanillas',
    }),
    swagger_1.ApiResponse({ status: 200, description: 'Listado de Estados de Ventanillas', isArray: true }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DetestadoventanillaController.prototype, "ultimoDetEstadoVentanilla", null);
DetestadoventanillaController = __decorate([
    swagger_1.ApiUseTags('DetEstadoVentanilla'),
    common_1.Controller('detestadoventanilla'),
    __metadata("design:paramtypes", [detestadoventanilla_service_1.DetestadoventanillaService])
], DetestadoventanillaController);
exports.DetestadoventanillaController = DetestadoventanillaController;
//# sourceMappingURL=detestadoventanilla.controller.js.map