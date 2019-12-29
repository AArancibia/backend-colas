"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const fs = require("fs");
const environment = process.env.NODE_ENV;
const data = dotenv.parse(fs.readFileSync(`${environment}.env`));
const PORT = data.PORT;
exports.swaggerBaseConfig = new swagger_1.DocumentBuilder()
    .setTitle('API REST - Proyecto Colas - Municipalidad de Villa El Salvador')
    .setDescription('Aquí se encuentran todos los servicios del proyecto de Colas de la MuniVES')
    .setVersion('1.0.0')
    .setHost(String(`http://localhost:${PORT}`).split('//')[1])
    .setBasePath('/api')
    .build();
//# sourceMappingURL=configSwagger.js.map