import { DetestadoventanillaService } from './detestadoventanilla.service';
export declare class DetestadoventanillaController {
    private detEstadoVentanillaService;
    constructor(detEstadoVentanillaService: DetestadoventanillaService);
    ultimoDetEstadoVentanilla(): Promise<void>;
}
