"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../shared/utils");
module.exports = function (ticket, done) {
    setTimeout(() => {
        ticket.fecha = utils_1.formatHora(ticket.fecha);
        done(ticket);
    }, 10000);
};
//# sourceMappingURL=detestadoworker.js.map