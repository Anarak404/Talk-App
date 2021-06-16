import { IMessageResponse } from '../friend/getMessages';
import { HttpClient } from '../client';

export const getServerMessages = async (
  httpClient: HttpClient,
  serverId: number
) => {
  return await httpClient.get<IMessageResponse[]>(`/server/${serverId}`);
};
