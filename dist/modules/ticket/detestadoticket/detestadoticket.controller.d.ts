import { DetestadoticketService } from './detestadoticket.service';
export declare class DetestadoticketController {
    private detEstadoService;
    constructor(detEstadoService: DetestadoticketService);
    getDetalleEstadosTickets(): Promise<import("./detestadoticket.entity").Detestadoticket[]>;
}
