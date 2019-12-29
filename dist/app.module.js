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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const ticket_module_1 = require("./modules/ticket/ticket.module");
const ventanilla_module_1 = require("./modules/ventanilla/ventanilla.module");
const usuario_module_1 = require("./modules/usuario/usuario.module");
const sistradoc_module_1 = require("./modules/sistradoc/sistradoc.module");
const contribuyente_module_1 = require("./modules/rentas/contribuyente/contribuyente.module");
const socket_gateway_1 = require("./gateways/socket.gateway");
const ventanillareferencia_module_1 = require("./modules/ventanillareferencia/ventanillareferencia.module");
const referencia_module_1 = require("./modules/referencia/referencia.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            ticket_module_1.TicketModule,
            ventanilla_module_1.VentanillaModule,
            usuario_module_1.UsuarioModule,
            sistradoc_module_1.SistradocModule,
            contribuyente_module_1.ContribuyenteModule,
            socket_gateway_1.SocketGateway,
            ventanillareferencia_module_1.VentanillareferenciaModule,
            referencia_module_1.ReferenciaModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map