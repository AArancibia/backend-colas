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
const request = require("request");
let SistradocService = class SistradocService {
    constructor() {
        this.url = 'http://192.168.10.207:3031/api/';
        this.logger = new common_1.Logger('SistradocService');
    }
    getAreas() {
        return __awaiter(this, void 0, void 0, function* () {
            const select = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const areas = yield request.get(`${this.url}sistradoc/areas`, { json: true }, (err, res, body) => {
                    if (err) {
                        reject('Error en el GET AREAS');
                    }
                    const { statusCode } = res;
                    resolve({
                        statusCode,
                        method: 'GET',
                        body,
                    });
                });
            }));
            return select;
        });
    }
};
SistradocService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SistradocService);
exports.SistradocService = SistradocService;
//# sourceMappingURL=sistradoc.service.js.map