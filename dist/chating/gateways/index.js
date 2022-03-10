"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatingGateWay = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const configs_1 = require("../configs");
const dtos_1 = require("../dtos");
let ChatingGateWay = class ChatingGateWay {
    constructor() {
        this.joinedUsers = new Map();
        this.accumulatedUsers = new Map();
    }
    disconnectClient(client) {
        this.joinedUsers.delete(client.id);
        client.disconnect(true);
    }
    afterInit(server) {
        console.log('Method Init');
    }
    handleDisconnect(client) {
        console.log('Method Disconnect');
    }
    handleConnection(client, ...args) {
        console.log('Method Connection');
    }
    async onJoinRoomAsync(client, data) {
        const { deviceType, deviceId, roomId } = data;
        const updatedUserCount = this.accumulatedUsers.get(roomId).countNum === 0
            ? this.accumulatedUsers.get(roomId).countNum + 1
            : 1;
        client.join(roomId);
        this.joinedUsers.set(client.id, { roomId, deviceType, deviceId });
        this.accumulatedUsers.set(roomId, { countNum: updatedUserCount });
        this.server
            .to(client.id)
            .emit(configs_1.ChatingConfigSocketPubTypes.GET_PROFILE, updatedUserCount.toString());
        client
            .to(roomId)
            .emit(configs_1.ChatingConfigSocketPubTypes.JOINED_NEW_MEMBER, updatedUserCount.toString());
    }
    async onLevenRoomAsync(client, data) {
        const { deviceType, deviceId, nickName, roomId } = data;
        const updatedUserCount = this.accumulatedUsers.get(roomId).countNum - 1;
        client.leave(roomId);
        client
            .to(roomId)
            .emit(configs_1.ChatingConfigSocketPubTypes.LEAVED_EXISTING_MEMBER, nickName);
        this.disconnectClient(client);
    }
    async onSendMessageAsync(client, data) {
        const { message, nickName, roomId } = data;
        client.to(roomId).emit(configs_1.ChatingConfigSocketPubTypes.NEW_MESSAGE, {
            nickName,
            message,
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatingGateWay.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(configs_1.ChatingConfigSocketSubTypes.JOIN_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        dtos_1.JoinRoomRequest]),
    __metadata("design:returntype", Promise)
], ChatingGateWay.prototype, "onJoinRoomAsync", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(configs_1.ChatingConfigSocketSubTypes.LEAVE_ROOM),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        dtos_1.LeaveRoomRequest]),
    __metadata("design:returntype", Promise)
], ChatingGateWay.prototype, "onLevenRoomAsync", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(configs_1.ChatingConfigSocketSubTypes.SEND_MESSAGE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        dtos_1.SendMessageRequest]),
    __metadata("design:returntype", Promise)
], ChatingGateWay.prototype, "onSendMessageAsync", null);
ChatingGateWay = __decorate([
    (0, websockets_1.WebSocketGateway)({
        transports: ['websocket'],
        path: '/pekr-chating',
        cors: {
            origin: '*',
        },
    })
], ChatingGateWay);
exports.ChatingGateWay = ChatingGateWay;
//# sourceMappingURL=index.js.map