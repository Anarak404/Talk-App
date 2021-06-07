import React, { createContext, useCallback, useContext, useState } from 'react';
import { sessionContext } from '../session/SessionContext';
import { callContext } from './CallContext';
import {
  IIncomingCallContext,
  IIncomingCallContextProps,
} from './IncomingCallTypes';

const defaultValue: IIncomingCallContext = {
  caller: { id: 0, name: '', photo: null },
  answer: () => void 0,
  reject: () => void 0,
};

export const incomingCallContext =
  createContext<IIncomingCallContext>(defaultValue);

const { Provider } = incomingCallContext;

export function IncomingCallContextProvider({
  children,
}: IIncomingCallContextProps) {
  const { incomingCall, rejectOrAnswerCall } = useContext(sessionContext);
  const {} = useContext(callContext);
  const [caller] = useState(incomingCall.caller);
  const [id] = useState(incomingCall.id);

  const answer = useCallback(() => {
    rejectOrAnswerCall();
  }, [rejectOrAnswerCall]);

  const reject = useCallback(() => {
    rejectOrAnswerCall();
  }, [rejectOrAnswerCall]);

  return <Provider value={{ caller, answer, reject }}>{children}</Provider>;
}
