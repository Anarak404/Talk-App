import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { userContext } from '../context/UserContext';
import { Login, Register } from './authentication';
import { Hello } from './Hello';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const windowWidth = Dimensions.get('window').width;

export function Navigation() {
  const { loggedIn } = useContext(userContext);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator edgeWidth={windowWidth / 3} drawerType="slide">
          <Drawer.Screen name="Hello" component={Hello} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
