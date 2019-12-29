import { ReferenciaService } from './referencia.service';
export declare class ReferenciaController {
    private referenciaService;
    constructor(referenciaService: ReferenciaService);
    obtenerReferencias(): Promise<import("./referencia.entity").Referencia[]>;
}
