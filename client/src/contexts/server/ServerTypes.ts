import { IMessage } from '../../components/messages';

export interface IServerContext {
  name: string;
  generateCode(): Promise<boolean>;
  sendMessage(message: string): void;
  messages: IMessage[];
}

export interface IServerContextProps {
  serverId: number;
  children?: React.ReactNode;
}
