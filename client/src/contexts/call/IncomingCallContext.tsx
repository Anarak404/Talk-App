import React, { createContext, useContext, useState } from 'react';
import { sessionContext } from '../session/SessionContext';
import {
  IIncomingCallContext,
  IIncomingCallContextProps,
} from './IncomingCallTypes';

const defaultValue: IIncomingCallContext = {
  caller: { id: 0, name: '', photo: null },
};

export const incomingCallContext =
  createContext<IIncomingCallContext>(defaultValue);

const { Provider } = incomingCallContext;

export function IncomingCallContextProvider({
  children,
}: IIncomingCallContextProps) {
  const { incomingCall, rejectOrAnswerCall } = useContext(sessionContext);
  const [caller] = useState(incomingCall.caller);
  const [id] = useState(incomingCall.id);

  return <Provider value={{ caller }}>{children}</Provider>;
}
