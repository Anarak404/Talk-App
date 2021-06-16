import { IUser } from '../../contexts';

export interface IMessage {
  id: number;
  name: string;
  photo?: string;
  text: string;
}

export interface IMessageResponse extends IServerMessageResponse {
  receiver: IUser;
}

export interface IServerMessageResponse {
  id: number;
  sender: IUser;
  message: string;
  datetime: string;
}

export interface IMessageStore {
  key: number;
  messages: IMessage[];
}
