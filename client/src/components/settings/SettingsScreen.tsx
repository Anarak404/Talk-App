import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { settingsContext } from '../../contexts';
import { DrawerParamList } from '../Navigation';
import { Settings } from './Settings';
import { UserInfo } from './UserInfo';

interface IProps {
  navigation: DrawerNavigationProp<DrawerParamList, 'Settings'>;
}

export function SettingsScreen({ navigation }: IProps) {
  const { getString } = useContext(settingsContext);

  return (
    <>
      <Header
        placement="left"
        leftComponent={{
          icon: 'menu',
          onPress: navigation.openDrawer,
          size,
        }}
        centerComponent={{
          text: getString('settings'),
          style: styles.name,
        }}
      />
      <UserInfo />
      <Settings />
    </>
  );
}

const size = 30;

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
  },
  name: {
    alignSelf: 'center',
    alignContent: 'center',
  },
});
