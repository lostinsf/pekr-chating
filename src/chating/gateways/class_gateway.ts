import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketTypesSub, SocketTypesPub } from 'src/chating/configs';
import {
  JoinRoomRequest,
  LeaveRoomRequest,
  SendMessageRequest,
  SentMessage,
} from 'src/chating/dtos';

type JoinedUser = {
  roomId: string;
  deviceType: 1 | 2;
  deviceId: string;
};

type accumulatedUser = {
  countNum: number;
};

// 웹서버 접근경로 및
@WebSocketGateway({
  transports: ['websocket'],
  path: '/pekr-chating',
  cors: {
    origin: '*',
  },
})
export class ChatingGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // 웹서버 소켓정보
  @WebSocketServer() server: Server;

  // 게이트웨이 변수정보
  joinedUsers: Map<string, JoinedUser> = new Map();
  accumulatedUsers: Map<string, accumulatedUser> = new Map();

  // 게이트웨이 함수정보
  private disconnectClient(client: Socket) {
    this.joinedUsers.delete(client.id);
    client.disconnect(true);
  }

  // 각종 소켓 기능
  afterInit(server: any) {
    console.log('Method Init');
  }
  handleDisconnect(client: any) {
    console.log('Method Disconnect');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('Method Connection');
  }

  // 이벤트 메세지 정리
  @SubscribeMessage(SocketTypesSub.JOIN_ROOM)
  async onJoinRoomAsync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomRequest,
  ): Promise<void> {
    // 이벤트: 방입장
    const { deviceType, deviceId, roomId } = data;

    const updatedUserCount: number =
      this.accumulatedUsers.get(roomId).countNum === 0
        ? this.accumulatedUsers.get(roomId).countNum + 1
        : 1;

    client.join(roomId);
    this.joinedUsers.set(client.id, { roomId, deviceType, deviceId });
    this.accumulatedUsers.set(roomId, { countNum: updatedUserCount });

    this.server
      .to(client.id)
      .emit(SocketTypesPub.GET_PROFILE, updatedUserCount.toString());

    client
      .to(roomId)
      .emit(SocketTypesPub.JOINED_NEW_MEMBER, updatedUserCount.toString());
  }

  @SubscribeMessage(SocketTypesSub.LEAVE_ROOM)
  async onLevenRoomAsync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: LeaveRoomRequest,
  ) {
    const { deviceType, deviceId, nickName, roomId } = data;
    const updatedUserCount = this.accumulatedUsers.get(roomId).countNum - 1;

    client.leave(roomId);

    client.to(roomId).emit(SocketTypesPub.LEAVED_EXISTING_MEMBER, nickName);

    this.disconnectClient(client);
  }

  @SubscribeMessage(SocketTypesSub.SEND_MESSAGE)
  async onSendMessageAsync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SendMessageRequest,
  ): Promise<void> {
    const { message, nickName, roomId } = data;

    client.to(roomId).emit(SocketTypesPub.NEW_MESSAGE, {
      nickName,
      message,
    } as SentMessage);
  }
}
