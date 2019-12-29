import { ContribuyenteService } from './contribuyente.service';
export declare class ContribuyenteController {
    private contribuyenteService;
    private logger;
    constructor(contribuyenteService: ContribuyenteService);
    getContribuyenteByDni(data: any): Promise<any>;
}
