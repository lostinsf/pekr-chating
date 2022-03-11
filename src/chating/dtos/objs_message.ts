export class SendMessageRequest {
  roomId!: string;

  nickName!: string;

  message!: string;
}

export class SentMessage {
  nickName!: string;

  message!: string;
}
