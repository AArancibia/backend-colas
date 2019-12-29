import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthGuard implements CanActivate {
    private logger;
    canActivate(context: ExecutionContext): Promise<boolean>;
    validarToken(auth: string): Promise<string | object>;
}
