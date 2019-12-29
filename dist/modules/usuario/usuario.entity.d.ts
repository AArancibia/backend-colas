import { Ventanilla } from '../ventanilla/ventanilla.entity';
export declare class Usuario {
    idusuario: number;
    username: string;
    password: string;
    estado: boolean;
    idpersonal: number;
    ventanillas: Ventanilla[];
    encriptarPassword(): Promise<string>;
    readonly token: string;
    toResponseObject(mostrarToken?: boolean): any;
}
