import { post } from '../client';
import { IAuthenticationResponse } from './types';

export const register = async (e: IRegisterRequest) => {
  return await post<IAuthenticationResponse>('/user', e);
};

export interface IRegisterRequest {
  email: string;
  name: string;
  password: string;
}
