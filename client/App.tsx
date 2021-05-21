import React from 'react';
import { Register } from './src/components/authentication';
import { SettingsContextProvider } from './src/context/SettingsContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <Register />
    </SettingsContextProvider>
  );
}
