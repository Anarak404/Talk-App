import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useContext } from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles } from 'react-native-elements';
import { callContext, UserContextProvider } from '../../contexts';
import { OngoingCall } from '../call';
import { DrawerParamList } from '../Navigation';
import { MessagesView } from './MessagesView';
import { UserHeader } from './UserHeader';

interface IProps {
  route: RouteProp<DrawerParamList, 'User'>;
  navigation: DrawerNavigationProp<DrawerParamList, 'User'>;
}

export function UserScreen({ route, navigation }: IProps) {
  const { inCall, attenderId } = useContext(callContext);

  const styles = useStyles();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const userId = route.params.id;

  return (
    <UserContextProvider userId={userId}>
      <View style={styles.container}>
        {inCall && userId === attenderId ? (
          <OngoingCall />
        ) : (
          <UserHeader openDrawer={openDrawer} />
        )}
        <MessagesView />
      </View>
    </UserContextProvider>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
}));
