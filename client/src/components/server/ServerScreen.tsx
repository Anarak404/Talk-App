import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ServerContext } from '../../contexts';
import { DrawerParamList } from '../Navigation';
import { ServerHeader } from './ServerHeader';

interface IProps {
  route: RouteProp<DrawerParamList, 'Server'>;
  navigation: DrawerNavigationProp<DrawerParamList, 'Server'>;
}

export function ServerScreen({ navigation, route }: IProps) {
  const serverId = route.params.id;

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <ServerContext serverId={serverId}>
      <View>
        <ServerHeader openDrawer={openDrawer} />
      </View>
    </ServerContext>
  );
}
