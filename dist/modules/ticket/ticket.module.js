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
const ticket_controller_1 = require("./ticket.controller");
const ticket_service_1 = require("./ticket.service");
const estadoticket_module_1 = require("./estadoticket/estadoticket.module");
const detestadoticket_module_1 = require("./detestadoticket/detestadoticket.module");
const ticket_entity_1 = require("./ticket.entity");
const estadoticket_entity_1 = require("./estadoticket/estadoticket.entity");
const ticket_gateway_1 = require("../../gateways/ticket.gateway");
const ventanilla_entity_1 = require("../ventanilla/ventanilla.entity");
const ventanilla_service_1 = require("../ventanilla/ventanilla.service");
const ventanilla_module_1 = require("../ventanilla/ventanilla.module");
const ventanilla_gateway_1 = require("../../gateways/ventanilla.gateway");
const detestadoticket_service_1 = require("./detestadoticket/detestadoticket.service");
const estadoventanilla_entity_1 = require("../ventanilla/estadoventanilla/estadoventanilla.entity");
const detestadoventanilla_entity_1 = require("../ventanilla/detestadoventanilla/detestadoventanilla.entity");
const detestadoticket_entity_1 = require("./detestadoticket/detestadoticket.entity");
const usuario_entity_1 = require("../usuario/usuario.entity");
const ventanillareferencia_entity_1 = require("../ventanillareferencia/ventanillareferencia.entity");
let TicketModule = class TicketModule {
};
TicketModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                ticket_entity_1.Ticket,
                estadoticket_entity_1.Estado,
                ventanilla_entity_1.Ventanilla,
                estadoventanilla_entity_1.Estadoventanilla,
                detestadoventanilla_entity_1.Detestadoventanilla,
                detestadoticket_entity_1.Detestadoticket,
                usuario_entity_1.Usuario,
                ventanillareferencia_entity_1.Ventanillareferencia
            ]),
            estadoticket_module_1.EstadoticketModule,
            detestadoticket_module_1.DetestadoticketModule,
            ventanilla_module_1.VentanillaModule,
        ],
        controllers: [ticket_controller_1.TicketController],
        providers: [
            ventanilla_service_1.VentanillaService,
            ticket_service_1.TicketService,
            ticket_gateway_1.TicketGateway,
            detestadoticket_service_1.DetestadoticketService,
            ventanilla_gateway_1.VentanillaGateway,
        ],
    })
], TicketModule);
exports.TicketModule = TicketModule;
//# sourceMappingURL=ticket.module.js.map