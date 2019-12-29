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
const usuario_controller_1 = require("./usuario.controller");
const usuario_service_1 = require("./usuario.service");
const usuario_entity_1 = require("./usuario.entity");
const ventanilla_service_1 = require("../ventanilla/ventanilla.service");
const ventanilla_entity_1 = require("../ventanilla/ventanilla.entity");
const estadoventanilla_entity_1 = require("../ventanilla/estadoventanilla/estadoventanilla.entity");
const detestadoventanilla_entity_1 = require("../ventanilla/detestadoventanilla/detestadoventanilla.entity");
const ventanilla_gateway_1 = require("src/gateways/ventanilla.gateway");
let UsuarioModule = class UsuarioModule {
};
UsuarioModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                usuario_entity_1.Usuario,
                ventanilla_entity_1.Ventanilla,
                estadoventanilla_entity_1.Estadoventanilla,
                detestadoventanilla_entity_1.Detestadoventanilla,
            ]),
        ],
        controllers: [usuario_controller_1.UsuarioController],
        providers: [usuario_service_1.UsuarioService, ventanilla_service_1.VentanillaService, ventanilla_gateway_1.VentanillaGateway],
    })
], UsuarioModule);
exports.UsuarioModule = UsuarioModule;
//# sourceMappingURL=usuario.module.js.map