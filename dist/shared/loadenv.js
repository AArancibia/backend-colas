"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
const environment = process.env.NODE_ENV;
exports.cargarConfiguracion = () => {
    const data = dotenv.parse(fs.readFileSync(`${environment}.env`));
    return data;
};
//# sourceMappingURL=loadenv.js.map