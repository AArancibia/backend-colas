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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UsuarioDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UsuarioDTO.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UsuarioDTO.prototype, "password", void 0);
exports.UsuarioDTO = UsuarioDTO;
class UsuarioRO {
}
__decorate([
    swagger_1.ApiModelProperty({
        description: 'Llave primaria del registro de usuario',
    }),
    __metadata("design:type", Number)
], UsuarioRO.prototype, "idusuario", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        description: 'Nombre de usuario',
    }),
    __metadata("design:type", String)
], UsuarioRO.prototype, "username", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        description: 'Llave foranea de la tabla Personal de la BD-Sistradoc-prod',
    }),
    __metadata("design:type", Number)
], UsuarioRO.prototype, "idpersonal", void 0);
exports.UsuarioRO = UsuarioRO;
//# sourceMappingURL=usuario.dto.js.map