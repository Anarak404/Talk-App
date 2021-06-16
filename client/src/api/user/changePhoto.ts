import { HttpClient } from '../client';
import { IProfileResponse } from './types';

export const changePhoto = async (
  httpClient: HttpClient,
  e: IChangePhotoRequest
) => {
  return await httpClient.put<IProfileResponse>('/user/photo', e);
};

export interface IChangePhotoRequest {
  name: string;
}
