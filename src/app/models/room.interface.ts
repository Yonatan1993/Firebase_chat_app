import {IMassage} from "./" ;

export interface IChatRoom {
  id : string;
  roomName : string;
  messages: Array<IMassage>;
  createdUserId: string;
}
