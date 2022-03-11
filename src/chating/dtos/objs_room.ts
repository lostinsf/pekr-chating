export class JoinRoomRequest {
  roomId!: string;

  deviceType!: 1 | 2;

  deviceId!: string;
}

export class LeaveRoomRequest {
  roomId!: string;

  deviceType!: 1 | 2;

  deviceId!: string;

  nickName!: string;
}
