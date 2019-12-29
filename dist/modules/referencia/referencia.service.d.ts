import { Referencia } from './referencia.entity';
import { Repository } from 'typeorm';
export declare class ReferenciaService {
    private referenciaRepository;
    constructor(referenciaRepository: Repository<Referencia>);
    obtenerReferencias(): Promise<Referencia[]>;
}
