import { VentanillareferenciaService } from './ventanillareferencia.service';
export declare class VentanillareferenciaController {
    private ventanillaReferenciaService;
    constructor(ventanillaReferenciaService: VentanillareferenciaService);
    obtenerVentanillaReferencia(): Promise<import("./ventanillareferencia.entity").Ventanillareferencia[]>;
}
