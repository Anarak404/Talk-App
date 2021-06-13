import { HttpClient } from '../client';
import { IProfileResponse } from './types';

export const changeNick = async (
  httpClient: HttpClient,
  e: IChangeNickRequest
) => {
  return await httpClient.put<IProfileResponse>('/user/nick', e);
};

export interface IChangeNickRequest {
  name: string;
}
