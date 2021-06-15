export interface IServerContext {
  name: string;
  generateCode(): Promise<boolean>;
}

export interface IServerContextProps {
  serverId: number;
  children?: React.ReactNode;
}
