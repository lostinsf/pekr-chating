import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JoinRoomRequest, LeaveRoomRequest, SendMessageRequest } from 'src/chating/dtos';
declare type JoinedUser = {
    roomId: string;
    deviceType: 1 | 2;
    deviceId: string;
};
declare type accumulatedUser = {
    countNum: number;
};
export declare class ChatingGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    joinedUsers: Map<string, JoinedUser>;
    accumulatedUsers: Map<string, accumulatedUser>;
    private disconnectClient;
    afterInit(server: any): void;
    handleDisconnect(client: any): void;
    handleConnection(client: any, ...args: any[]): void;
    onJoinRoomAsync(client: Socket, data: JoinRoomRequest): Promise<void>;
    onLevenRoomAsync(client: Socket, data: LeaveRoomRequest): Promise<void>;
    onSendMessageAsync(client: Socket, data: SendMessageRequest): Promise<void>;
}
export {};
