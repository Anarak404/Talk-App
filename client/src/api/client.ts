import { serverAddress } from '.';
import { ErrorResponse, IError, mapToErrorResponse } from './error';

export class HttpClient {
  private static apiUrl = serverAddress;

  constructor(private token: string) {}

  public async get<T>(
    url: string,
    requireAuthorization: boolean = true
  ): Promise<T> {
    url = this.prepareUrl(url);

    try {
      const response = await fetch(url, {
        headers: requireAuthorization ? this.authorizationHeaders() : undefined,
      });
      return await this.handleResponse(response);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        throw e;
      }
      throw mapToErrorResponse(e, url);
    }
  }

  public async send<T>(
    url: string,
    data: any,
    requireAuthorization: boolean = true,
    method: 'POST' | 'PUT'
  ): Promise<T> {
    url = this.prepareUrl(url);
    const headers = requireAuthorization
      ? this.authorizationHeaders()
      : new Headers();

    headers.append('Content-Type', 'application/json');

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers,
      });
      return await this.handleResponse(response);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        throw e;
      }
      throw mapToErrorResponse(e, url);
    }
  }

  public async post<T>(
    url: string,
    data: any,
    requireAuthorization: boolean = true
  ): Promise<T> {
    return this.send(url, data, requireAuthorization, 'POST');
  }

  public async put<T>(
    url: string,
    data: any,
    requireAuthorization: boolean = true
  ): Promise<T> {
    return this.send(url, data, requireAuthorization, 'PUT');
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: T | IError = await response.json();

    if (response.ok) {
      return data as T;
    }

    console.error(data);
    throw new ErrorResponse(data as IError);
  }

  private prepareUrl(url: string) {
    return HttpClient.apiUrl + url;
  }

  private authorizationHeaders() {
    if (this.token.length === 0) {
      throw new Error('User not logged in!');
    }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
