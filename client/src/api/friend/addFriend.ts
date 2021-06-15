import { HttpClient } from '../client';
import { IResultResponse } from '../user/types';

export const addFriend = async (httpClient: HttpClient, e: IAddRequest) => {
  return await httpClient.put<IResultResponse>('/user/friends', e);
};

export interface IAddRequest {
  id: number;
}
