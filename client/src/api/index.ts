export { startCall } from './call/start';
export { ICallRequest, ICallResponse } from './call/types';
export { ErrorResponse, IError } from './error';
export { addFriend } from './friend/addFriend';
export { generateCode } from './server/generateCode';
export { joinServer } from './server/join';
export { changeNick, IChangeNickRequest } from './user/changeNick';
export { changePassword, IChangePasswordRequest } from './user/changePassword';
export { changePhoto, IChangePhotoRequest } from './user/changePhoto';
export { ILoginRequest, login } from './user/login';
export { IRegisterRequest, register } from './user/register';
export {
  IAuthenticationResponse,
  IProfileResponse,
  IResultResponse,
  IServer,
} from './user/types';
export { getPrivateMessages } from './friend/getMessages';

export const serverAddress = 'http://192.168.0.73:8080';
