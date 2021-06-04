import React, { createContext, useCallback, useState } from 'react';
import { ICallContext, ICallContextProps } from './CallTypes';

const defaultValue: ICallContext = {
  muted: false,
  inCall: false,
  calling: false,
  toggleMute: () => void 0,
  endCall: () => void 0,
  startCall: () => void 0,
  answerCall: () => void 0,
  rejectCall: () => void 0,
};

export const callContext = createContext<ICallContext>(defaultValue);

const { Provider } = callContext;

export function CallContextProvider({ children }: ICallContextProps) {
  const [muted, setMuted] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [calling, setCalling] = useState(false);

  const toggleMute = useCallback(() => {
    setMuted((v) => !v);
  }, [setMuted]);

  const endCall = useCallback(() => {
    setInCall(false);
  }, [setInCall]);

  const startCall = useCallback(() => {
    setInCall(true);
  }, [setInCall]);

  const answerCall = useCallback(() => {
    setCalling(false);
    setInCall(true);
  }, [setCalling, setInCall]);

  const rejectCall = useCallback(() => {
    setCalling(false);
  }, [setCalling]);

  return (
    <Provider
      value={{
        muted,
        inCall,
        calling,
        toggleMute,
        endCall,
        startCall,
        answerCall,
        rejectCall,
      }}
    >
      {children}
    </Provider>
  );
}
