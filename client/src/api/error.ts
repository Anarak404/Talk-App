export interface IError {
  timestamp: string | Date;
  status: number;
  error: string;
  message: string;
  path: string;
}

export class ErrorResponse extends Error {
  private _error: IError;

  public get error() {
    return this._error;
  }

  constructor(error: IError) {
    super(error.message);

    if (typeof error.timestamp === 'string') {
      error.timestamp = new Date(error.timestamp);
    }

    this._error = error;
  }
}

export const mapToErrorResponse = (e: any, url: string) => {
  return new ErrorResponse({
    error: e.toString(),
    message: e.toString(),
    path: url,
    timestamp: new Date(),
    status: 500,
  });
};
