import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioRO, UsuarioDTO } from './usuario.dto';
export declare class UsuarioService {
    private usuarioRepository;
    private logger;
    constructor(usuarioRepository: Repository<Usuario>);
    obtenerUsuariosPorNombre(nombreUsuario: string): Promise<UsuarioRO[]>;
    obtenerUsuarioPorId(idusuario: number): Promise<UsuarioRO>;
    obtenerUsuarios(): Promise<UsuarioRO[]>;
    registrar(auth: UsuarioDTO): Promise<UsuarioRO>;
    login({ username, password }: UsuarioDTO): Promise<UsuarioRO>;
}
