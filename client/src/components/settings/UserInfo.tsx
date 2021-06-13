import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UserAvatar } from '../call';
import { Text } from 'react-native-elements';

export function UserInfo() {
  const name = 'Test';

  return (
    <View style={styles.container}>
      <UserAvatar size={100} name={name} />
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
    marginBottom: 40,
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
