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
const request = require("request");
let ContribuyenteService = class ContribuyenteService {
    constructor() {
        this.urlReniec = 'http://192.168.10.6:5050/platpide/buscardni';
        this.urlRentas = 'http://192.168.10.207:4521/api/rentas/';
        this.logger = new common_1.Logger('ContribuyenteService');
    }
    getContribuyenteByDniReniec(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const persona = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield request.post(`${this.urlReniec}`, { json: true,
                    body: {
                        nuRucUsuario: 20187346488,
                        nuDniUsuario: 47065456,
                        nuDniConsulta: dni,
                        password: 47065456,
                    },
                }, (err, res, body) => {
                    if (err) {
                        reject('Error en el DNI InterOperabilidad');
                    }
                    if (!res)
                        reject(() => {
                            throw new common_1.HttpException('ERROR CONSULTA A RENIEC', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        });
                    const { statusCode } = res;
                    resolve({
                        statusCode,
                        method: 'POST',
                        body,
                    });
                });
            }));
            if (!Object.keys(persona)) {
                this.logger.log('No existe la persona en RENIEC, ');
                throw new common_1.HttpException(`Error No hay Registro, Verificar DNI `, common_1.HttpStatus.NOT_FOUND);
            }
            const per = yield persona;
            return per.body.datosPersona;
        });
    }
    getIdContribuyenteRentas(nuDniConsulta, per) {
        const { apPrimer, apSegundo, prenombres, foto } = per;
        const contribuyente = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield request.get(`${this.urlRentas}contribuyente`, {
                json: true,
                body: {
                    apPrimer, apSegundo, nuDniConsulta, prenombres,
                },
            }, (err, res, body) => {
                if (err) {
                    reject(() => {
                        throw new common_1.HttpException('ERROR', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    });
                }
                if (!res) {
                    reject(() => {
                        throw new common_1.HttpException('Revisar PlatPide', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    });
                }
                const { statusCode } = res;
                resolve({
                    statusCode,
                    method: 'POST',
                    body: body.length < 1 ? null : body[0].codContr,
                });
            });
        }));
        return contribuyente;
    }
};
ContribuyenteService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ContribuyenteService);
exports.ContribuyenteService = ContribuyenteService;
//# sourceMappingURL=contribuyente.service.js.map