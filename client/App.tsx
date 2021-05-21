import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login, Register } from './src/components/authentication';
import { SettingsContextProvider } from './src/context/SettingsContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SettingsContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsContextProvider>
  );
}
