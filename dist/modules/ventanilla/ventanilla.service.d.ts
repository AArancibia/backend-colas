import { Ventanilla } from './ventanilla.entity';
import { Repository, Connection } from 'typeorm';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { VentanillaDTO } from './ventanilla.dto';
import { Detestadoventanilla } from './detestadoventanilla/detestadoventanilla.entity';
import { VentanillaGateway } from '../../gateways/ventanilla.gateway';
export declare class VentanillaService {
    private ventanillaRepository;
    private estadoVentanillaRepository;
    private detEstadoVentanillaRepository;
    private ventanillaGateway;
    private connection;
    private logger;
    constructor(ventanillaRepository: Repository<Ventanilla>, estadoVentanillaRepository: Repository<Estadoventanilla>, detEstadoVentanillaRepository: Repository<Detestadoventanilla>, ventanillaGateway: VentanillaGateway, connection: Connection);
    vistaestadoVentanilla(): Promise<string>;
    viewVentanillaEstado(): Promise<any[]>;
    obtenerVentanillas(): Promise<Ventanilla[]>;
    usuarioAVentanilla(idventanilla: number, idusuario: number): Promise<Ventanilla>;
    obtenerVentanillaporIdUsuario(idusuario: number): Promise<Ventanilla>;
    guardarVentanilla(ventanilla: VentanillaDTO): Promise<Ventanilla>;
    guardarNuevoEstado(idventanilla: number, idestado: number, antiguo?: boolean): Promise<import("typeorm").ObjectLiteral>;
    ultimoEstadoVentanilla(idventanilla?: any): Promise<any>;
    editarTipoAtencion(id: number, tipoatencion: string): Promise<void>;
    ultimoEstadoVentanillas(): Promise<any[]>;
}
