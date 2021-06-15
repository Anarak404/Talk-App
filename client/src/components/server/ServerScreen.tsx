import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles } from 'react-native-elements';
import { ServerContext } from '../../contexts';
import { DrawerParamList } from '../Navigation';
import { ServerHeader } from './ServerHeader';
import { ServerMessagesView } from './ServerMessagesView';

interface IProps {
  route: RouteProp<DrawerParamList, 'Server'>;
  navigation: DrawerNavigationProp<DrawerParamList, 'Server'>;
}

export function ServerScreen({ navigation, route }: IProps) {
  const styles = useStyles();
  const serverId = route.params.id;

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <ServerContext serverId={serverId}>
      <View style={styles.container}>
        <ServerHeader openDrawer={openDrawer} />
        <ServerMessagesView />
      </View>
    </ServerContext>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
}));
