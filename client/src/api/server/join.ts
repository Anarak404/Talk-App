import { HttpClient } from '../client';
import { IServer } from '../user/types';

export const joinServer = async (
  httpClient: HttpClient,
  e: IJoinServerRequest
) => {
  return await httpClient.post<IServer>(`/server/code`, e);
};

interface IJoinServerRequest {
  name: string;
}
