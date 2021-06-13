import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { dataStoreContext } from '../../contexts';
import { UserAvatar } from '../call';

export function UserInfo() {
  const { me } = useContext(dataStoreContext);
  const { name, photo } = me;

  return (
    <View style={styles.container}>
      <UserAvatar size={100} name={name} photo={photo ? photo : undefined} />
      <View style={styles.info}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  info: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});
