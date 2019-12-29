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
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const usuario_entity_1 = require("./usuario.entity");
let UsuarioService = class UsuarioService {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.logger = new common_1.Logger('UsuarioService');
    }
    obtenerUsuariosPorNombre(nombreUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.usuarioRepository.find({
                where: {
                    username: typeorm_2.Like(`%${nombreUsuario}%`),
                },
            });
            return usuarios.map(usuario => usuario.toResponseObject(false));
        });
    }
    obtenerUsuarioPorId(idusuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.usuarioRepository.findOne({
                where: { idusuario },
            });
            return usuario;
        });
    }
    obtenerUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.usuarioRepository.find();
            return usuarios.map(usuario => usuario.toResponseObject(false));
        });
    }
    registrar(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = auth;
            let usuario = yield this.usuarioRepository.findOne({ username });
            if (usuario)
                throw new common_1.HttpException(`El usuario ya se encuentra en la base de datos`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            const nuevoUsuario = yield this.usuarioRepository.create(Object.assign({}, auth));
            yield this.usuarioRepository.save(nuevoUsuario);
            return nuevoUsuario.toResponseObject(false);
        });
    }
    login({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.usuarioRepository.findOne({ username });
            if (!usuario)
                throw new common_1.HttpException(`El usuario no se encuentra en la base de datos`, common_1.HttpStatus.NOT_FOUND);
            if (!(yield bcrypt.compare(password, usuario.password))) {
                throw new common_1.HttpException(`La constraseña es incorrecta`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return usuario.toResponseObject(true);
        });
    }
};
UsuarioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map