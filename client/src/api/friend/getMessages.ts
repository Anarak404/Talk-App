import { IUser } from '../../contexts';
import { HttpClient } from '../client';

export const getPrivateMessages = async (
  httpClient: HttpClient,
  userId: number
) => {
  return await httpClient.get<IMessageResponse[]>(`/user/friends/${userId}`);
};

export interface IMessageResponse {
  id: number;
  message: string;
  user: IUser;
}
