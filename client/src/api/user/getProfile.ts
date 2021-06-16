import { IUser } from '../../contexts';
import { HttpClient } from '../client';
import { IServer } from './types';

export const getProfile = async (httpClient: HttpClient) => {
  return await httpClient.get<IProfileInformation>('/user');
};

export interface IProfileInformation {
  user: IUser;
  friends: IUser[];
  servers: IServer[];
  token: string;
  refreshToken: string;
}
