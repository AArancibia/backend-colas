"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const configSwagger_1 = require("./shared/configSwagger");
const loadenv_1 = require("./shared/loadenv");
require("moment/locale/es-us");
var lastmodified = require('lastmodified');
var modified = lastmodified(__dirname);
modified.setBasePath(__dirname);
const data = loadenv_1.cargarConfiguracion();
const PORT = data.PORT;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const environment = process.env.NODE_ENV;
        if (environment === 'development') {
            const document = swagger_1.SwaggerModule.createDocument(app, configSwagger_1.swaggerBaseConfig);
            app.use('/api/docs/swagger.json', (req, res) => {
                res.send(document);
            });
            swagger_1.SwaggerModule.setup('/docs', app, null, {
                swaggerUrl: `http://localhost:${PORT}/api/docs/swagger.json`,
                explorer: true,
                swaggerOptions: {
                    docExpansion: 'list',
                    filter: true,
                    showRequestDuration: true,
                },
            });
        }
        app.setGlobalPrefix('api');
        app.enableCors();
        yield app.listen(PORT, '0.0.0.0');
        common_1.Logger.log(`Server running on http://localhost:${PORT}/api`, 'Bootstrap');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map