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
const swagger_1 = require("@nestjs/swagger");
const sistradoc_service_1 = require("./sistradoc.service");
let SistradocController = class SistradocController {
    constructor(sistradocService) {
        this.sistradocService = sistradocService;
    }
    getAreas() {
        return __awaiter(this, void 0, void 0, function* () {
            const areas = yield this.sistradocService.getAreas();
            return areas;
        });
    }
};
__decorate([
    swagger_1.ApiOperation({
        title: 'Obtener Areas ( Centro de Costos )',
        description: 'Servicion para listar los areas de la Municipalidad',
    }),
    swagger_1.ApiResponse({ status: 200, description: 'Listado de Areas', isArray: true }),
    common_1.Get('areas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SistradocController.prototype, "getAreas", null);
SistradocController = __decorate([
    common_1.Controller('sistradoc'),
    swagger_1.ApiUseTags('Sistradoc'),
    __metadata("design:paramtypes", [sistradoc_service_1.SistradocService])
], SistradocController);
exports.SistradocController = SistradocController;
//# sourceMappingURL=sistradoc.controller.js.map