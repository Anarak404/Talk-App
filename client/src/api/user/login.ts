import { post } from '../client';
import { IAuthenticationResponse } from './types';

export const login = async (e: ILoginRequest) => {
  return await post<IAuthenticationResponse>('/user/login', e);
};

export interface ILoginRequest {
  email: string;
  password: string;
}
