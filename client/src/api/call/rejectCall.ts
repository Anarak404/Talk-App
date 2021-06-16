import { HttpClient } from '../client';
import { IResultResponse } from '../user/types';

export const rejectCall = async (httpClient: HttpClient, callId: number) => {
  return await httpClient.get<IResultResponse>(`/call/end/${callId}`);
};
