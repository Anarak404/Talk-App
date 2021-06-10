import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { callContext, UserContextProvider } from '../../contexts';
import { OngoingCall } from '../call';
import { IMessage, Messages } from '../messages';
import { DrawerParamList } from '../Navigation';
import { NewMessage } from './NewMessage';
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
      <Messages messages={testMessages} style={styles.messages} />
      <NewMessage />
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  messages: {
    padding: 10,
  },
});

const templateMessages = [
  {
    name: 'Test1',
    photo:
      'https://i.kym-cdn.com/entries/icons/facebook/000/026/489/crying.jpg',
    text: 'Test message',
  },
  {
    name: 'Test2',
    text: 'Test message'.repeat(7),
  },
];

const testMessages: IMessage[] = [];
let id = 1;

for (let i = 0; i < 10; i++) {
  testMessages.push(
    ...templateMessages.map((e) => {
      const i = id++;
      return { id: i, ...e };
    })
  );
}
