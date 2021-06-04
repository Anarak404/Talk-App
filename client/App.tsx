import React from 'react';
import { Navigation } from './src/components/Navigation';
import { SettingsContextProvider } from './src/context/SettingsContext';
import { SessionContextProvider } from './src/context/SessionContext';
import { CallContextProvider } from './src/context/CallContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <SessionContextProvider>
        <CallContextProvider>
          <Navigation />
        </CallContextProvider>
      </SessionContextProvider>
    </SettingsContextProvider>
  );
}
