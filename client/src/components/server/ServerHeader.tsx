import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { ServerIcons } from './ServerIcons';

interface IProps {
  openDrawer(): void;
}

export function ServerHeader({ openDrawer }: IProps) {
  return (
    <Header
      placement="left"
      leftComponent={{
        icon: 'menu',
        onPress: openDrawer,
        size,
      }}
      centerComponent={{
        text: 'Server',
        style: styles.name,
      }}
      rightComponent={<ServerIcons />}
      centerContainerStyle={styles.centerContainer}
    />
  );
}

const size = 30;

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
  },
  name: {
    alignSelf: 'center',
  },
});
