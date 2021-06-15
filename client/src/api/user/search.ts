import { HttpClient } from '../client';
import { IProfileResponse } from './types';

export const searchByEmail = async (
  httpClient: HttpClient,
  e: ISearchRequest
) => {
  return await httpClient.post<IProfileResponse>('/user/search', e);
};

export interface ISearchRequest {
  email: string;
}
