export { startCall } from './call/start';
export { ICallRequest, ICallResponse } from './call/types';
export { ErrorResponse, IError } from './error';
export { ILoginRequest, login } from './user/login';
export { IRegisterRequest, register } from './user/register';
export { IAuthenticationResponse } from './user/types';

export const serverAddress = 'http://192.168.0.220:8080';
