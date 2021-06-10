import React, { createContext, useCallback, useContext, useState } from 'react';
import { callContext } from '../call/CallContext';
import { sessionContext } from '../session/SessionContext';
import { IUserContext, IUserContextProps } from './UserTypes';

const defaultValue: IUserContext = {
  startCall: () => void 0,
  sendMessage: (message: string) => void 0,
};

export const userContext = createContext<IUserContext>(defaultValue);

const { Provider } = userContext;

export function UserContextProvider({ userId, children }: IUserContextProps) {
  const [id] = useState(userId);
  const { startCall } = useContext(callContext);
  const { websocket } = useContext(sessionContext);

  const start = useCallback(() => {
    startCall(id);
  }, [id, startCall]);

  const sendMessage = useCallback(
    (message: string) => {
      websocket?.send(
        '/app/private/message',
        JSON.stringify({ receiverId: id, message })
      );
    },
    [id, websocket]
  );

  return (
    <Provider value={{ startCall: start, sendMessage }}>{children}</Provider>
  );
}
