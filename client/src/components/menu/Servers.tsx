import React from 'react';
import { useContext } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { dataStoreContext } from '../../contexts';
import { UserAvatar } from '../call';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export function Servers({ style }: IProps) {
  const { servers } = useContext(dataStoreContext);

  return (
    <ScrollView contentContainerStyle={[style, styles.container]}>
      {servers.map((e, index) => {
        const isLast = servers.length === index - 1;

        return (
          <UserAvatar
            size={55}
            photo={e.photo ? e.photo : undefined}
            name={e.name}
            style={!isLast ? styles.avatar : undefined}
            key={e.id}
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
