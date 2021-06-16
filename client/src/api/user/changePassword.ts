import { HttpClient } from '../client';
import { IResultResponse } from './types';

export const changePassword = async (
  httpClient: HttpClient,
  e: IChangePasswordRequest
) => {
  return await httpClient.put<IResultResponse>('/user/password', e);
};

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
