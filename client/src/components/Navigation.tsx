import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IncomingCallContextProvider, sessionContext } from '../contexts';
import { Login, Register } from './authentication';
import { IncomingCall } from './call';
import { DrawerContent } from './menu/DrawerContent';
import { UserView } from './user/UserScreen';

export type DrawerParamList = {
  User: { id: number };
};

export type UserScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'User'
>;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator<DrawerParamList>();

const windowWidth = Dimensions.get('window').width;

export function Navigation() {
  const { loggedIn, isIncomingCall } = useContext(sessionContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {loggedIn ? (
          <>
            <Drawer.Navigator
              edgeWidth={windowWidth / 3}
              drawerType="slide"
              drawerContent={DrawerContent}
              drawerStyle={{ width: '80%' }}
            >
              <Drawer.Screen
                name="User"
                component={UserView}
                initialParams={{ id: 2 }}
              />
            </Drawer.Navigator>
            {isIncomingCall && (
              <IncomingCallContextProvider>
                <IncomingCall />
              </IncomingCallContextProvider>
            )}
          </>
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
    </SafeAreaProvider>
  );
}
