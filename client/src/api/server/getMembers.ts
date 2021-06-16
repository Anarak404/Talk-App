import { IUser } from '../../contexts';
import { HttpClient } from '../client';

export const getMembers = async (httpClient: HttpClient, serverId: number) => {
  return await httpClient.get<IUser[]>(`/server/${serverId}/users`);
};
