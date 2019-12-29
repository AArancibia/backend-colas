import { Detestadoticket } from './detestadoticket.entity';
import { Repository } from 'typeorm';
export declare class DetestadoticketService {
    private detestadoRepository;
    private logger;
    constructor(detestadoRepository: Repository<Detestadoticket>);
    obtenerUltimoEstadoTicket(idticket: number): Promise<any>;
    getDetEstadoTicket(): Promise<Detestadoticket[]>;
}
