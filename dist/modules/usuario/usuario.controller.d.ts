import { UsuarioService } from './usuario.service';
import { UsuarioRO, UsuarioDTO } from './usuario.dto';
import { VentanillaService } from '../ventanilla/ventanilla.service';
export declare class UsuarioController {
    private usuarioService;
    private ventanillaService;
    constructor(usuarioService: UsuarioService, ventanillaService: VentanillaService);
    crearUsuario(auth: UsuarioDTO): Promise<UsuarioRO>;
    login(auth: UsuarioDTO): Promise<any>;
    filtroUsuarios(nombreUsuario: string): Promise<UsuarioRO[]>;
    obtenerUsuarios(): Promise<UsuarioRO[]>;
    obtenerUsuarioPorId(idusuario: number): Promise<UsuarioRO>;
}
