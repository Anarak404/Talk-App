import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { userContext } from '../../contexts';

interface IProps {
  openDrawer(): void;
}

export function UserHeader({ openDrawer }: IProps) {
  const { startCall, user } = useContext(userContext);

  return (
    <Header
      placement="left"
      leftComponent={{
        icon: 'menu',
        onPress: openDrawer,
        size,
      }}
      centerComponent={{
        text: user?.name,
        style: styles.name,
      }}
      rightComponent={{
        icon: 'call',
        size,
        onPress: startCall,
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
  name: {
    alignSelf: 'center',
  },
});
