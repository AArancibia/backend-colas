import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    logger: Logger;
    constructor();
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): any;
}
