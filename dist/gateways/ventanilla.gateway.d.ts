import { Detestadoventanilla } from '../modules/ventanilla/detestadoventanilla/detestadoventanilla.entity';
import { Repository } from 'typeorm';
import { Ventanilla } from '../modules/ventanilla/ventanilla.entity';
import { Usuario } from '../modules/usuario/usuario.entity';
export declare class VentanillaGateway {
    private detEstadoVentanillaRepository;
    private ventanillaRepository;
    private usuarioRepository;
    private logger;
    wsVentanilla: any;
    constructor(detEstadoVentanillaRepository: Repository<Detestadoventanilla>, ventanillaRepository: Repository<Ventanilla>, usuarioRepository: Repository<Usuario>);
    toResponseObject(usuario: Usuario): any;
    obtenerVentanillas(): Promise<Ventanilla[]>;
    usuarioAVentanilla(idventanilla: number, idusuario: number): Promise<Ventanilla>;
    ultimoEstadoVentanilla(): Promise<any[]>;
}
