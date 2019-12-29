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
const detestadoticket_entity_1 = require("./detestadoticket.entity");
const typeorm_2 = require("typeorm");
const moment = require("moment");
const utils_1 = require("../../../shared/utils");
let DetestadoticketService = class DetestadoticketService {
    constructor(detestadoRepository) {
        this.detestadoRepository = detestadoRepository;
        this.logger = new common_1.Logger('DetEstadoTicketService');
    }
    obtenerUltimoEstadoTicket(idticket) {
        return __awaiter(this, void 0, void 0, function* () {
            const detEstado = yield this.detestadoRepository.findOne({
                where: {
                    ticketId: idticket,
                },
                relations: ['estado', 'ticket'],
                order: {
                    fecha: 'DESC',
                },
            });
            return detEstado.estadoticketId;
        });
    }
    getDetEstadoTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha2 = moment(utils_1.formatFechaCorta()).add('days', 1).format('YYYY-MM-DD');
            const qb = yield this.detestadoRepository.createQueryBuilder('t1');
            const detTickets = qb
                .innerJoinAndSelect('t1.ticket', 'ticket')
                .where(sq => {
                const subQuery = qb.subQuery()
                    .select('max( fecha )')
                    .from(detestadoticket_entity_1.Detestadoticket, 't2')
                    .where('t1.ticketId = t2.ticketId')
                    .getQuery();
                return 't1.fecha = ' + subQuery;
            })
                .andWhere(' t1.fecha between :fec1 and :fec2 ', {
                fec1: `${utils_1.formatFechaCorta()} ` + '00:00:00',
                fec2: `${fecha2} ` + '00:00:00',
            })
                .getMany();
            return detTickets;
        });
    }
};
DetestadoticketService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(detestadoticket_entity_1.Detestadoticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DetestadoticketService);
exports.DetestadoticketService = DetestadoticketService;
//# sourceMappingURL=detestadoticket.service.js.map