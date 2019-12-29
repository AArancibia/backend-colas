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
const typeorm_1 = require("@nestjs/typeorm");
const ventanilla_entity_1 = require("./ventanilla.entity");
const typeorm_2 = require("typeorm");
const estadoventanilla_entity_1 = require("./estadoventanilla/estadoventanilla.entity");
const detestadoventanilla_entity_1 = require("./detestadoventanilla/detestadoventanilla.entity");
const utils_1 = require("../../shared/utils");
const ventanilla_gateway_1 = require("../../gateways/ventanilla.gateway");
let VentanillaService = class VentanillaService {
    constructor(ventanillaRepository, estadoVentanillaRepository, detEstadoVentanillaRepository, ventanillaGateway, connection) {
        this.ventanillaRepository = ventanillaRepository;
        this.estadoVentanillaRepository = estadoVentanillaRepository;
        this.detEstadoVentanillaRepository = detEstadoVentanillaRepository;
        this.ventanillaGateway = ventanillaGateway;
        this.connection = connection;
        this.logger = new common_1.Logger('VentanillaService');
    }
    vistaestadoVentanilla() {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = yield this.connection
                .createQueryBuilder()
                .select(['*'])
                .from(qb => {
                return qb
                    .subQuery()
                    .select(['*'])
                    .from(ventanilla_entity_1.Ventanilla, 'ventanilla');
            }, 'R2')
                .getSql();
            return builder;
        });
    }
    viewVentanillaEstado() {
        return __awaiter(this, void 0, void 0, function* () {
            const ultimoEstado = yield this.ventanillaGateway.ultimoEstadoVentanilla();
            return ultimoEstado;
        });
    }
    obtenerVentanillas() {
        return __awaiter(this, void 0, void 0, function* () {
            const ventanillas = yield this.ventanillaGateway.obtenerVentanillas();
            return ventanillas;
        });
    }
    usuarioAVentanilla(idventanilla, idusuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const ventanillaActualizada = yield this.ventanillaGateway.usuarioAVentanilla(idventanilla, idusuario);
            const ventanillas = yield this.ventanillaGateway.obtenerVentanillas();
            this.ventanillaGateway.wsVentanilla.emit('[VENTANILLA] LISTA', ventanillas);
            return ventanillaActualizada;
        });
    }
    obtenerVentanillaporIdUsuario(idusuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const ventanillas = yield this.ventanillaRepository.findOne({
                where: {
                    idusuario,
                },
            });
            return ventanillas;
        });
    }
    guardarVentanilla(ventanilla) {
        return __awaiter(this, void 0, void 0, function* () {
            const estadoVentanilla = yield this.estadoVentanillaRepository.findOne({
                where: { id: 3 },
            });
            const nuevaVentanilla = yield this.ventanillaRepository.create(ventanilla);
            nuevaVentanilla.estados = [estadoVentanilla];
            yield this.ventanillaRepository.save(nuevaVentanilla);
            yield this.detEstadoVentanillaRepository.update({
                tbVentanillaId: nuevaVentanilla.id,
                tbEstadoventanillaId: 3,
            }, {
                fecha: utils_1.formatFechaLarga(),
            });
            return nuevaVentanilla;
        });
    }
    guardarNuevoEstado(idventanilla, idestado, antiguo = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const estadoVentanilla = yield this.estadoVentanillaRepository.findOne({
                where: { id: idestado },
            });
            if (!estadoVentanilla)
                throw new common_1.HttpException(`No existe la Estado Ventanilla con el id: ${idestado}`, common_1.HttpStatus.NOT_FOUND);
            const ventanilla = yield this.ventanillaRepository.findOne({
                where: { id: idventanilla },
            });
            if (!ventanilla)
                throw new common_1.HttpException(`No existe la ventanilla con el id: ${idventanilla}`, common_1.HttpStatus.NOT_FOUND);
            const guardarDetEstadoVentanilla = yield this.detEstadoVentanillaRepository
                .createQueryBuilder()
                .insert()
                .into(detestadoventanilla_entity_1.Detestadoventanilla)
                .values({
                tbEstadoventanillaId: idestado,
                tbVentanillaId: idventanilla,
                fecha: utils_1.formatFechaLarga(),
            })
                .returning(['*'])
                .execute();
            const detEstadoVentanilla = yield this.ventanillaGateway.ultimoEstadoVentanilla();
            if (!antiguo) {
                this.ventanillaGateway.wsVentanilla.emit('[VENTANILLA] ULTIMOESTADO', detEstadoVentanilla);
            }
            return guardarDetEstadoVentanilla.identifiers[0];
        });
    }
    ultimoEstadoVentanilla(idventanilla) {
        return __awaiter(this, void 0, void 0, function* () {
            let ultimoEstado = yield this.ventanillaGateway.ultimoEstadoVentanilla();
            for (let i = 0; i < ultimoEstado.length; i++) {
                if (ultimoEstado[i].tbVentanillaId == idventanilla) {
                    return ultimoEstado[i];
                }
            }
            return null;
        });
    }
    editarTipoAtencion(id, tipoatencion) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ultimoEstadoVentanillas() {
        return __awaiter(this, void 0, void 0, function* () {
            const ultimoEstado = yield this.ventanillaGateway.ultimoEstadoVentanilla();
            return ultimoEstado;
        });
    }
};
VentanillaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(ventanilla_entity_1.Ventanilla)),
    __param(1, typeorm_1.InjectRepository(estadoventanilla_entity_1.Estadoventanilla)),
    __param(2, typeorm_1.InjectRepository(detestadoventanilla_entity_1.Detestadoventanilla)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        ventanilla_gateway_1.VentanillaGateway,
        typeorm_2.Connection])
], VentanillaService);
exports.VentanillaService = VentanillaService;
//# sourceMappingURL=ventanilla.service.js.map