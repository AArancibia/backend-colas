import { Ventanillareferencia } from './ventanillareferencia.entity';
import { Repository } from 'typeorm';
import { VentanillaReferenciaDTO } from './ventanillareferencia.dto';
export declare class VentanillareferenciaService {
    private ventanillaReferenciaRepository;
    constructor(ventanillaReferenciaRepository: Repository<Ventanillareferencia>);
    obtenerVentanillaReferencia(): Promise<Ventanillareferencia[]>;
    guardarVentanillaRefencia(ventanillaReferencia: VentanillaReferenciaDTO): Promise<Ventanillareferencia>;
}
