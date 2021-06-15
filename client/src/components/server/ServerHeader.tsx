import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { serverContext } from '../../contexts';
import { ServerIcons } from './ServerIcons';

interface IProps {
  openDrawer(): void;
}

export function ServerHeader({ openDrawer }: IProps) {
  const { name } = useContext(serverContext);

  return (
    <Header
      placement="left"
      leftComponent={{
        icon: 'menu',
        onPress: openDrawer,
        size,
      }}
      centerComponent={{
        text: name,
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
