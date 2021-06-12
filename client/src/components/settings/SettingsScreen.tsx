import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Header } from 'react-native-elements';
import { DrawerParamList } from '../Navigation';
import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { settingsContext } from '../../contexts';
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
