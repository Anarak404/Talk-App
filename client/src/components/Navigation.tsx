import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useContext } from 'react';
import { Dimensions } from 'react-native';
import { withTheme } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IncomingCallContextProvider, sessionContext } from '../contexts';
import { Login, Register } from './authentication';
import { IncomingCall } from './call';
import { DrawerContent } from './menu/DrawerContent';
import { SearchFriend } from './search/SearchFriend';
import { CreateServer } from './server/CreateServer';
import { ServerScreen } from './server/ServerScreen';
import { SettingsScreen } from './settings/SettingsScreen';
import { UserScreen } from './user/UserScreen';

export type DrawerParamList = {
  User: { id: number };
  Settings: {};
  SearchFriend: {};
  Server: { id: number };
  CreateServer: {};
};

export type UserScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'User'
>;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator<DrawerParamList>();

const windowWidth = Dimensions.get('window').width;

export const Navigation = withTheme(() => {
  const { loggedIn, isIncomingCall } = useContext(sessionContext);

  const drawerContentComponent = useCallback(
    (props: DrawerContentComponentProps<DrawerContentOptions>) => (
      <DrawerContent {...props} />
    ),
    []
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {loggedIn ? (
          <>
            <Drawer.Navigator
              edgeWidth={windowWidth / 3}
              drawerType="slide"
              drawerContent={drawerContentComponent}
              drawerStyle={{ width: '80%' }}
              initialRouteName="Settings"
            >
              <Drawer.Screen name="User" component={UserScreen} />
              <Drawer.Screen name="Settings" component={SettingsScreen} />
              <Drawer.Screen name="SearchFriend" component={SearchFriend} />
              <Drawer.Screen name="Server" component={ServerScreen} />
              <Drawer.Screen name="CreateServer" component={CreateServer} />
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
}, 'theme');
