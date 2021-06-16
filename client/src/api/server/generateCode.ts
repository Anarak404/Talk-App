import { HttpClient } from '../client';

export const generateCode = async (
  httpClient: HttpClient,
  serverId: number
) => {
  return await httpClient.get<ICodeResponse>(`/server/${serverId}/code`);
};

interface ICodeResponse {
  code: string;
}
