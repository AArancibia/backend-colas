export declare class ContribuyenteService {
    urlReniec: string;
    urlRentas: string;
    private logger;
    constructor();
    getContribuyenteByDniReniec(dni: any): Promise<any>;
    getIdContribuyenteRentas(nuDniConsulta: any, per: any): any;
}
