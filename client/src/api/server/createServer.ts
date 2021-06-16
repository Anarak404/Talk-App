import { HttpClient } from '../client';
import { IServer } from '../user/types';

export const createServer = async (
  httpClient: HttpClient,
  e: ICreateServerRequest
) => {
  return await httpClient.post<ICreateServerResponse>('/server', e);
};

interface ICreateServerRequest {
  name: string;
  photo?: string;
}

interface ICreateServerResponse {
  server: IServer;
}
