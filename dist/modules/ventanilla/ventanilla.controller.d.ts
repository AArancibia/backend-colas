import { VentanillaService } from './ventanilla.service';
import { VentanillaDTO } from './ventanilla.dto';
export declare class VentanillaController {
    private ventanillaService;
    constructor(ventanillaService: VentanillaService);
    vistaestadoventanilla(): Promise<string>;
    obtenerVentanillas(): Promise<import("./ventanilla.entity").Ventanilla[]>;
    obtenerVentanillaporIdPersonal(idusuario: number): Promise<import("./ventanilla.entity").Ventanilla>;
    ventanillaUltimoEstadoPorId(id: number): Promise<any>;
    ventanillaUltimoEstado(): Promise<any[]>;
    ventanillaUltimoEstadoView(): Promise<any[]>;
    asignarUsuarioAVentanilla(idventanilla: number, idusuario: number): Promise<import("./ventanilla.entity").Ventanilla>;
    editarTipoAtencion(id: number, tipo: string): Promise<void>;
    guardarEstadoVentanilla(id: number, idestado: number): Promise<import("typeorm").ObjectLiteral>;
    guardarVentanilla(ventanilla: VentanillaDTO): Promise<import("./ventanilla.entity").Ventanilla>;
}
