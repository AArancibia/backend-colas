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
const usuario_service_1 = require("./usuario.service");
const swagger_1 = require("@nestjs/swagger");
const usuario_dto_1 = require("./usuario.dto");
const ventanilla_service_1 = require("../ventanilla/ventanilla.service");
let UsuarioController = class UsuarioController {
    constructor(usuarioService, ventanillaService) {
        this.usuarioService = usuarioService;
        this.ventanillaService = ventanillaService;
    }
    crearUsuario(auth) {
        return this.usuarioService.registrar(auth);
    }
    login(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.usuarioService.login(auth);
            const ventanilla = yield this.ventanillaService.obtenerVentanillaporIdUsuario(usuario.idusuario);
            usuario.ventanilla = ventanilla;
            return usuario;
        });
    }
    filtroUsuarios(nombreUsuario) {
        return this.usuarioService.obtenerUsuariosPorNombre(nombreUsuario);
    }
    obtenerUsuarios() {
        return this.usuarioService.obtenerUsuarios();
    }
    obtenerUsuarioPorId(idusuario) {
        return this.usuarioService.obtenerUsuarioPorId(idusuario);
    }
};
__decorate([
    common_1.Post('registrar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.UsuarioDTO]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "crearUsuario", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.UsuarioDTO]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "login", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Filtro Usuarios',
        description: 'Consulta para buscar Usuario por username',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Usuarios filtrados por username',
        isArray: true,
        type: usuario_dto_1.UsuarioRO,
    }),
    common_1.Get(':nombreUsuario'),
    __param(0, common_1.Param('nombreUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "filtroUsuarios", null);
__decorate([
    swagger_1.ApiOperation({
        title: 'Listar Usuarios',
        description: 'Consulta para obtener los usuarios',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Lista de Usuarios',
        isArray: true,
        type: usuario_dto_1.UsuarioRO,
    }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obtenerUsuarios", null);
__decorate([
    common_1.Get('buscar/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obtenerUsuarioPorId", null);
UsuarioController = __decorate([
    swagger_1.ApiUseTags('Usuario'),
    common_1.Controller('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        ventanilla_service_1.VentanillaService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map