import React from 'react';
import { Navigation } from './src/components/Navigation';
import {
  CallContextProvider,
  DataStoreContextProvider,
  SessionContextProvider,
  SettingsContextProvider,
} from './src/contexts';

export default function App() {
  return (
    <DataStoreContextProvider>
      <SettingsContextProvider>
        <SessionContextProvider>
          <CallContextProvider>
            <Navigation />
          </CallContextProvider>
        </SessionContextProvider>
      </SettingsContextProvider>
    </DataStoreContextProvider>
  );
}
