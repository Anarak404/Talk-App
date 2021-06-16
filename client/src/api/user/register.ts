import { HttpClient } from '../client';
import { IAuthenticationResponse } from './types';

export const register = async (httpClient: HttpClient, e: IRegisterRequest) => {
  return await httpClient.post<IAuthenticationResponse>('/user', e, false);
};

export interface IRegisterRequest {
  email: string;
  name: string;
  password: string;
  token: string;
}
