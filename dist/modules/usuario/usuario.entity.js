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
const typeorm_1 = require("typeorm");
const ventanilla_entity_1 = require("../ventanilla/ventanilla.entity");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let Usuario = class Usuario {
    encriptarPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.password = yield bcrypt.hash(this.password, 10));
        });
    }
    get token() {
        const { idusuario, username } = this;
        return jwt.sign({
            idusuario,
            username,
        }, process.env.SECRET, {
            expiresIn: '1d',
        });
    }
    toResponseObject(mostrarToken = false) {
        const { idusuario, username, idpersonal } = this;
        let responseObject = { idusuario, username, idpersonal };
        if (mostrarToken) {
            responseObject.token = this.token;
        }
        return responseObject;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Usuario.prototype, "idusuario", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Usuario.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        default: true,
        name: 'estado',
        comment: 'Estado del usuario ( ACTIVO - INACTIVO )',
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column('int4', {
        nullable: true,
    }),
    __metadata("design:type", Number)
], Usuario.prototype, "idpersonal", void 0);
__decorate([
    typeorm_1.OneToMany(type => ventanilla_entity_1.Ventanilla, ventanilla => ventanilla.id),
    __metadata("design:type", Array)
], Usuario.prototype, "ventanillas", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Usuario.prototype, "encriptarPassword", null);
Usuario = __decorate([
    typeorm_1.Entity('tb_usuario')
], Usuario);
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.entity.js.map