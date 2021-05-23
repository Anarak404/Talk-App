import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { UserContextProvider } from '../../context/UserContext';
import { DrawerParamList } from '../Navigation';
import { SendMessageBar } from './SendMessageBar';
import { UserHeader } from './UserHeader';

interface IProps {
  route: RouteProp<DrawerParamList, 'User'>;
  navigation: DrawerNavigationProp<DrawerParamList, 'User'>;
}

export function UserView({ route, navigation }: IProps) {
  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <UserContextProvider userId={route.params.id}>
      <UserHeader openDrawer={openDrawer} />
      <SendMessageBar />
    </UserContextProvider>
  );
}
