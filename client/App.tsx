import React from 'react';
import { Navigation } from './src/components/Navigation';
import {
  SettingsContextProvider,
  SessionContextProvider,
  CallContextProvider,
} from './src/contexts';

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
