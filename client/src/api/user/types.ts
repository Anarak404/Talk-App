import { IUser } from '../../contexts/store/DataStoreTypes';

export interface IAuthenticationResponse {
  token: string;
  user: IUser;
  servers: IServer[];
  friends: IUser[];
}

export interface IServer {
  id: number;
  name: string;
  photo: string | null;
  createDateTime: string;
}

export interface IResultResponse {
  success: boolean;
}

export interface IProfileResponse extends IUser {}
