"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
exports.formatFechaCorta = (fecha) => {
    const fechaFormateada = moment(fecha ? fecha : new Date())
        .tz('America/Lima')
        .format('YYYY-MM-DD');
    return fechaFormateada;
};
exports.formatFechaLarga = (fecha) => {
    const fechaFormateada = moment(fecha ? fecha : new Date())
        .tz('America/Lima')
        .format('YYYY-MM-DD HH:mm:ss:SSS');
    return fechaFormateada;
};
exports.formatHora = (fecha) => {
    const fechaFormateada = moment(fecha ? fecha : new Date())
        .tz('America/Lima')
        .format('HH:mm:SS');
    return fechaFormateada;
};
exports.prueba = () => { };
//# sourceMappingURL=utils.js.map