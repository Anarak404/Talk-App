import React from 'react';
import { Navigation } from './src/components/Navigation';
import { SettingsContextProvider } from './src/context/SettingsContext';
import { UserContextProvider } from './src/context/UserContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <UserContextProvider>
        <Navigation />
      </UserContextProvider>
    </SettingsContextProvider>
  );
}
