"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ventanilla_controller_1 = require("./ventanilla.controller");
const ventanilla_service_1 = require("./ventanilla.service");
const estadoventanilla_module_1 = require("./estadoventanilla/estadoventanilla.module");
const detestadoventanilla_module_1 = require("./detestadoventanilla/detestadoventanilla.module");
const ventanilla_entity_1 = require("./ventanilla.entity");
const estadoventanilla_entity_1 = require("./estadoventanilla/estadoventanilla.entity");
const detestadoventanilla_entity_1 = require("./detestadoventanilla/detestadoventanilla.entity");
const ventanilla_gateway_1 = require("../../gateways/ventanilla.gateway");
const usuario_entity_1 = require("../usuario/usuario.entity");
let VentanillaModule = class VentanillaModule {
};
VentanillaModule = __decorate([
    common_1.Module({
        controllers: [ventanilla_controller_1.VentanillaController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ventanilla_entity_1.Ventanilla, estadoventanilla_entity_1.Estadoventanilla, detestadoventanilla_entity_1.Detestadoventanilla, usuario_entity_1.Usuario]),
            estadoventanilla_module_1.EstadoventanillaModule,
            detestadoventanilla_module_1.DetestadoventanillaModule,
        ],
        providers: [
            ventanilla_service_1.VentanillaService,
            ventanilla_gateway_1.VentanillaGateway,
        ],
    })
], VentanillaModule);
exports.VentanillaModule = VentanillaModule;
//# sourceMappingURL=ventanilla.module.js.map