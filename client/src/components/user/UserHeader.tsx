import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { callContext } from '../../context/CallContext';

interface IProps {
  openDrawer(): void;
}

export function UserHeader({ openDrawer }: IProps) {
  const { startCall } = useContext(callContext);

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
});
