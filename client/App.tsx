import React from 'react';
import { Navigation } from './src/components/Navigation';
import { SettingsContextProvider } from './src/context/SettingsContext';
import { SessionContextProvider } from './src/context/SessionContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <SessionContextProvider>
        <Navigation />
      </SessionContextProvider>
    </SettingsContextProvider>
  );
}
