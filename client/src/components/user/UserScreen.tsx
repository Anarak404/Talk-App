import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useContext } from 'react';
import { callContext, UserContextProvider } from '../../contexts';
import { OngoingCall } from '../call';
import { DrawerParamList } from '../Navigation';
import { MessagesView } from './MessagesView';
import { UserHeader } from './UserHeader';

interface IProps {
  route: RouteProp<DrawerParamList, 'User'>;
  navigation: DrawerNavigationProp<DrawerParamList, 'User'>;
}

export function UserView({ route, navigation }: IProps) {
  const { inCall, attenderId } = useContext(callContext);

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const userId = route.params.id;

  return (
    <UserContextProvider userId={userId}>
      {inCall && userId === attenderId ? (
        <OngoingCall />
      ) : (
        <UserHeader openDrawer={openDrawer} />
      )}
      <MessagesView />
    </UserContextProvider>
  );
}
