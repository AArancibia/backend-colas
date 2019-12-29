"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const jwt = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    constructor() {
        this.logger = new common_1.Logger('AuthGuard');
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            if (req) {
                if (req.headers.authorization) {
                    req.usuario = yield this.validarToken(req.headers.authorization);
                    return true;
                }
            }
            return false;
        });
    }
    validarToken(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth.split(' ')[0] !== 'Bearer') {
                throw new common_1.HttpException('No estas autorizado para este recurso', common_1.HttpStatus.FORBIDDEN);
            }
            const token = auth.split(' ')[1];
            try {
                const decode = jwt.verify(token, process.env.SECRET);
                return decode;
            }
            catch (err) {
                throw new common_1.HttpException('No estas autorizado para este recurso 2', common_1.HttpStatus.FORBIDDEN);
            }
        });
    }
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map