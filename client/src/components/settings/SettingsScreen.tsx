import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Header } from 'react-native-elements';
import { DrawerParamList } from '../Navigation';
import { Logout } from './Logout';
import { Settings } from './Settings';
import { UserInfo } from './UserInfo';

interface IProps {
  navigation: DrawerNavigationProp<DrawerParamList, 'Settings'>;
}

export function SettingsScreen({ navigation }: IProps) {
  return (
    <>
      <Header
        placement="left"
        leftComponent={{
          icon: 'menu',
          onPress: navigation.openDrawer,
          size,
        }}
      />
      <UserInfo />
      <Settings />
      <Logout />
    </>
  );
}

const size = 30;
