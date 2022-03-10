// 재왕님 채팅 소켓 구성 정리
export enum ChatingConfigSocketSubTypes {
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  SEND_MESSAGE = 'sendMessage',
}

export enum ChatingConfigSocketPubTypes {
  GET_PROFILE = 'getProfile',
  JOINED_NEW_MEMBER = 'joinedNewMember',
  LEAVED_EXISTING_MEMBER = 'leavedExistingMember',
  NEW_MESSAGE = 'newMessage',
}
