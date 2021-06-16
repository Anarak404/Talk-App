import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { useContext } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { dataStoreContext } from '../../contexts';
import { UserAvatar } from '../call';

interface IProps {
  style?: StyleProp<ViewStyle>;
  navigation: DrawerNavigationHelpers;
}

export function Servers({ navigation }: IProps) {
  const { servers } = useContext(dataStoreContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {servers.map((e, index) => {
        const isLast = servers.length === index - 1;

        return (
          <UserAvatar
            size={55}
            photo={e.photo ? e.photo : undefined}
            name={e.name}
            style={!isLast ? styles.avatar : undefined}
            key={e.id}
            onPress={() => navigation.navigate('Server', { id: e.id })}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginBottom: 5,
  },
  container: {
    alignItems: 'center',
    paddingTop: 5,
  },
});
