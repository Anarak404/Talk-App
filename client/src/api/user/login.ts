import { HttpClient } from '../client';
import { IAuthenticationResponse } from './types';

export const login = async (httpClient: HttpClient, e: ILoginRequest) => {
  return await httpClient.post<IAuthenticationResponse>(
    '/user/login',
    e,
    false
  );
};

export interface ILoginRequest {
  email: string;
  password: string;
  token: string;
}
