export interface IServerContext {
  name: string;
}

export interface IServerContextProps {
  serverId: number;
  children?: React.ReactNode;
}
