import { ErrorResponse, IError, mapToErrorResponse } from './error';

const apiUrl = 'http://192.168.0.73:8080';

async function handleResponse<T>(response: Response): Promise<T> {
  const data: T | IError = await response.json();

  if (response.ok) {
    return data as T;
  }

  console.error(data);
  throw new ErrorResponse(data as IError);
}

export async function get<T>(url: string): Promise<T> {
  url = apiUrl + url;

  try {
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (e) {
    if (e instanceof ErrorResponse) {
      throw e;
    }
    throw mapToErrorResponse(e, url);
  }
}

export async function post<T>(url: string, data: any): Promise<T> {
  const headers = new Headers();
  url = apiUrl + url;

  headers.append('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    });
    return await handleResponse(response);
  } catch (e) {
    if (e instanceof ErrorResponse) {
      throw e;
    }
    throw mapToErrorResponse(e, url);
  }
}
