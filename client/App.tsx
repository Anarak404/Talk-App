import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Navigation } from './src/components/Navigation';
import {
  CallContextProvider,
  DataStoreContextProvider,
  SessionContextProvider,
  SettingsContextProvider,
} from './src/contexts';

export default function App() {
  return (
    <ThemeProvider>
      <DataStoreContextProvider>
        <SettingsContextProvider>
          <SessionContextProvider>
            <CallContextProvider>
              <Navigation />
            </CallContextProvider>
          </SessionContextProvider>
        </SettingsContextProvider>
      </DataStoreContextProvider>
    </ThemeProvider>
  );
}
