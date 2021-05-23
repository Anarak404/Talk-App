import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

interface IProps {
  openDrawer(): void;
}

export function UserHeader({ openDrawer }: IProps) {
  return (
    <Header
      placement="left"
      leftComponent={{
        icon: 'menu',
        onPress: openDrawer,
        size,
      }}
      rightComponent={{
        icon: 'call',
        size,
      }}
      centerContainerStyle={styles.centerContainer}
    />
  );
}

const size = 30;

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
  },
});
