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
const websockets_1 = require("@nestjs/websockets");
const typeorm_1 = require("@nestjs/typeorm");
const detestadoventanilla_entity_1 = require("../modules/ventanilla/detestadoventanilla/detestadoventanilla.entity");
const typeorm_2 = require("typeorm");
const ventanilla_entity_1 = require("../modules/ventanilla/ventanilla.entity");
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("../modules/usuario/usuario.entity");
let VentanillaGateway = class VentanillaGateway {
    constructor(detEstadoVentanillaRepository, ventanillaRepository, usuarioRepository) {
        this.detEstadoVentanillaRepository = detEstadoVentanillaRepository;
        this.ventanillaRepository = ventanillaRepository;
        this.usuarioRepository = usuarioRepository;
        this.logger = new common_1.Logger('VentanillaGateway');
    }
    toResponseObject(usuario) {
        return usuario.toResponseObject();
    }
    obtenerVentanillas() {
        return __awaiter(this, void 0, void 0, function* () {
            const ventanillas = yield this.ventanillaRepository.find({
                relations: ['usuario'],
            });
            return ventanillas.map(ventanilla => {
                ventanilla.usuario = this.toResponseObject(ventanilla.usuario);
                return ventanilla;
            });
        });
    }
    usuarioAVentanilla(idventanilla, idusuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const buscarVentanilla = yield this.ventanillaRepository.findOne({
                where: { idusuario },
            });
            if (buscarVentanilla) {
                yield this.ventanillaRepository.update({ id: buscarVentanilla.id }, { idusuario: null });
            }
            yield this.ventanillaRepository.update({ id: idventanilla }, {
                idusuario,
            });
            const ventanilla = yield this.ventanillaRepository.findOne({
                where: { id: idventanilla },
                relations: ['usuario'],
            });
            return ventanilla;
        });
    }
    ultimoEstadoVentanilla() {
        return __awaiter(this, void 0, void 0, function* () {
            const ventanillas = yield typeorm_2.getConnection().manager.query(`select * from ULTIMOESTADOVENTANILLA`);
            const ultimoEstado = [];
            ventanillas.map((item, index, array) => {
                const { idticket, idtematica, idtramite, codigo, correlativo, urgente, fechaticket, idventanilla, idtipoticket, idadministrado, preferencial, tbVentanillaId, tbEstadoventanillaId, identificador, fecha, id, codigoventanilla, ubicacion, idusuario, tipoatencion, } = item;
                const elemento = {
                    ticket: {
                        id: idticket,
                        idtematica,
                        idtramite,
                        codigo,
                        correlativo,
                        urgente,
                        fecha: fechaticket,
                        idventanilla,
                        idtipoticket,
                        idadministrado,
                        preferencial,
                    },
                    ventanilla: {
                        id,
                        codigoventanilla,
                        ubicacion,
                        idusuario,
                        tipoatencion,
                    },
                    detestado: {
                        tbVentanillaId,
                        tbEstadoventanillaId,
                        identificador,
                        fecha,
                    },
                };
                ultimoEstado.push(elemento);
            });
            return ultimoEstado;
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], VentanillaGateway.prototype, "wsVentanilla", void 0);
__decorate([
    websockets_1.SubscribeMessage('[VENTANILLA] LISTA'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VentanillaGateway.prototype, "obtenerVentanillas", null);
__decorate([
    websockets_1.SubscribeMessage('[VENTANILLA] ASIGNARUSUARIO'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VentanillaGateway.prototype, "usuarioAVentanilla", null);
__decorate([
    websockets_1.SubscribeMessage('[VENTANILLA] ULTIMOESTADO'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VentanillaGateway.prototype, "ultimoEstadoVentanilla", null);
VentanillaGateway = __decorate([
    websockets_1.WebSocketGateway(8081, {
        namespace: 'ventanilla',
    }),
    __param(0, typeorm_1.InjectRepository(detestadoventanilla_entity_1.Detestadoventanilla)),
    __param(1, typeorm_1.InjectRepository(ventanilla_entity_1.Ventanilla)),
    __param(2, typeorm_1.InjectRepository(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VentanillaGateway);
exports.VentanillaGateway = VentanillaGateway;
//# sourceMappingURL=ventanilla.gateway.js.map