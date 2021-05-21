import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Register } from './src/components/authentication';
import { SettingsContextProvider } from './src/context/SettingsContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <View style={styles.view}>
        <Register />
      </View>
    </SettingsContextProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
