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

    if (typeof error.message === 'string') {
      (error.message as unknown as Date) = new Date(error.message);
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
