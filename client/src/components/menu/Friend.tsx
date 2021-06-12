import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IUser } from '../../contexts';
import { UserAvatar } from '../call';

export function Friend({ id, name, photo }: IUser) {
  return (
    <TouchableOpacity style={styles.container}>
      <UserAvatar name={name} photo={photo ? photo : undefined} size={45} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
