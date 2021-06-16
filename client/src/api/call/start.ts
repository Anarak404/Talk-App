import { HttpClient } from '../client';
import { ICallRequest, ICallResponse } from './types';

export const startCall = async (
  httpClient: HttpClient,
  userId: number,
  e: ICallRequest
) => {
  return await httpClient.post<ICallResponse>(`/call/start/${userId}`, e);
};
