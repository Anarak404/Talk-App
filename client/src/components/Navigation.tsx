import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { callContext } from '../context/CallContext';
import { sessionContext } from '../context/SessionContext';
import { Login, Register } from './authentication';
import { IncomingCall } from './call';
import { UserView } from './user/UserScreen';

export type DrawerParamList = {
  User: { id: number };
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator<DrawerParamList>();

const windowWidth = Dimensions.get('window').width;

export function Navigation() {
  const { loggedIn } = useContext(sessionContext);
  const { calling } = useContext(callContext);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator edgeWidth={windowWidth / 3} drawerType="slide">
          <Drawer.Screen
            name="User"
            component={UserView}
            initialParams={{ id: 0 }}
          />
        </Drawer.Navigator>
      ) : (
        <>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
          {calling && <IncomingCall />}
        </>
      )}
    </NavigationContainer>
  );
}