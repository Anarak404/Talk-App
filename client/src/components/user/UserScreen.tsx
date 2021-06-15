import { RouteProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles, Overlay } from 'react-native-elements';
import { callContext, UserContextProvider } from '../../contexts';
import { Map, OngoingCall } from '../call';
import { DrawerParamList } from '../Navigation';
import { MessagesView } from './MessagesView';
import { UserHeader } from './UserHeader';

interface IProps {
  route: RouteProp<DrawerParamList, 'User'>;
  navigation: DrawerNavigationProp<DrawerParamList, 'User'>;
}

export function UserScreen({ route, navigation }: IProps) {
  const { inCall, attender } = useContext(callContext);
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const toggleVisible = useCallback(() => {
    setVisible((v) => !v);
  }, [setVisible]);

  const userId = route.params.id;

  return (
    <UserContextProvider userId={userId}>
      <View style={styles.container}>
        {inCall && userId === attender?.id ? (
          <OngoingCall showMap={toggleVisible} />
        ) : (
          <UserHeader openDrawer={openDrawer} />
        )}
        <MessagesView />
        <Overlay
          isVisible={visible && inCall}
          onBackdropPress={toggleVisible}
          fullScreen
        >
          <Map />
        </Overlay>
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
