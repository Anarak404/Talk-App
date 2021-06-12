import { IUser } from '../../contexts';

export interface IMessage {
  id: number;
  name: string;
  photo?: string;
  text: string;
}

export interface IMessageResponse {
  id: number;
  sender: IUser;
  message: string;
  dateTime: string;
}

export interface IMessageStore {
  sender: number;
  messages: IMessage[];
}
