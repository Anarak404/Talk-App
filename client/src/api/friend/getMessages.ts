import { IUser } from '../../contexts';
import { HttpClient } from '../client';

export const getPrivateMessages = async (
  httpClient: HttpClient,
  userId: number
) => {
  return await httpClient.get<IPrivateMessageResponse[]>(
    `/user/friends/${userId}`
  );
};

interface IPrivateMessageResponse {
  id: number;
  message: string;
  user: IUser;
}
