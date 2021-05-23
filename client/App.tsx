import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login, Register } from './src/components/authentication';
import { SettingsContextProvider } from './src/context/SettingsContext';
import { UserContextProvider } from './src/context/UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SettingsContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </SettingsContextProvider>
  );
}
