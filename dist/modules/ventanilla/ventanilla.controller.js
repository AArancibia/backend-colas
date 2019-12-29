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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ventanilla_service_1 = require("./ventanilla.service");
const ventanilla_dto_1 = require("./ventanilla.dto");
const swagger_1 = require("@nestjs/swagger");
let VentanillaController = class VentanillaController {
    constructor(ventanillaService) {
        this.ventanillaService = ventanillaService;
    }
    vistaestadoventanilla() {
        return this.ventanillaService.vistaestadoVentanilla();
    }
    obtenerVentanillas() {
        return this.ventanillaService.obtenerVentanillas();
    }
    obtenerVentanillaporIdPersonal(idusuario) {
        return this.ventanillaService.obtenerVentanillaporIdUsuario(idusuario);
    }
    ventanillaUltimoEstadoPorId(id) {
        return this.ventanillaService.ultimoEstadoVentanilla(id);
    }
    ventanillaUltimoEstado() {
        return this.ventanillaService.ultimoEstadoVentanillas();
    }
    ventanillaUltimoEstadoView() {
        return this.ventanillaService.viewVentanillaEstado();
    }
    asignarUsuarioAVentanilla(idventanilla, idusuario) {
        return this.ventanillaService.usuarioAVentanilla(idventanilla, idusuario);
    }
    editarTipoAtencion(id, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ventanillaService.editarTipoAtencion(id, tipo);
        });
    }
    guardarEstadoVentanilla(id, idestado) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ventanillaService.guardarNuevoEstado(id, idestado);
        });
    }
    guardarVentanilla(ventanilla) {
        return this.ventanillaService.guardarVentanilla(ventanilla);
    }
};
__decorate([
    common_1.Get('estado'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "vistaestadoventanilla", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Listar Ventanilla',
        description: 'Servicion para listar todas las ventanillas',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Nueva Ventanilla creada',
        isArray: false,
    }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "obtenerVentanillas", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Obtener Ventanilla por IdUsuario',
        description: 'Servicio para obtener ventanilla por IdUsuario',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Ventanilla por IdUsuario',
        isArray: false,
    }),
    common_1.Get('usuario/:idusuario'),
    __param(0, common_1.Param('idusuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "obtenerVentanillaporIdPersonal", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Ultimo Estado de Ventanilla',
        description: 'Servicion para obtener los estados de una Ventanilla',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Filtro de Ventanilla',
        isArray: false,
    }),
    common_1.Get(':id/ultimoestado'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "ventanillaUltimoEstadoPorId", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Ultimo Estado de Ventanillas',
        description: 'Servicion para listar los estados de las Ventanillas',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Listado de Estados de Ventanillas',
        isArray: true,
    }),
    common_1.Get('ultimoestado'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "ventanillaUltimoEstado", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Ultimo Estado de Ventanillas',
        description: 'Servicion para listar los estados de las Ventanillas',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Listado de Estados de Ventanillas',
        isArray: true,
    }),
    common_1.Get('vista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "ventanillaUltimoEstadoView", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Asignar Usuario a Ventanilla',
        description: 'Servicion para asignar un usuario a Ventanilla',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Usuario asignado a Ventanilla',
        isArray: false,
    }),
    common_1.Put(':id/usuario/:idusuario'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('idusuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "asignarUsuarioAVentanilla", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Tipo Atencion a Ventanilla',
        description: 'Servicion para actualizar tipo de atencion a Ventanilla',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Tipo de Atencion Editado',
        isArray: false,
    }),
    common_1.Put(':id/:tipo'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], VentanillaController.prototype, "editarTipoAtencion", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Guardar Estado de Ventanilla',
        description: 'Servicion para guardar nuevo estado de Ventanilla',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Nuevo Estado en Ventanilla',
        isArray: false,
    }),
    common_1.Post(':id/estado/:idestado'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('idestado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VentanillaController.prototype, "guardarEstadoVentanilla", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Guardar Ventanilla',
        description: 'Servicion para guardar una nueva ventanilla',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Nueva Ventanilla creada',
        isArray: false,
    }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ventanilla_dto_1.VentanillaDTO]),
    __metadata("design:returntype", void 0)
], VentanillaController.prototype, "guardarVentanilla", null);
VentanillaController = __decorate([
    swagger_1.ApiUseTags('Ventanilla'),
    common_1.Controller('ventanilla'),
    __metadata("design:paramtypes", [ventanilla_service_1.VentanillaService])
], VentanillaController);
exports.VentanillaController = VentanillaController;
//# sourceMappingURL=ventanilla.controller.js.map