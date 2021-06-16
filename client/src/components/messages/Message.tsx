import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-elements';
import { UserAvatar } from '../call';
import { IMessage } from './MessageTypes';

interface IProp {
  message: IMessage;
  style?: StyleProp<ViewStyle>;
}

export function Message({ message, style }: IProp) {
  const { name, text, photo } = message;

  return (
    <View style={[style, styles.container]}>
      <View style={styles.avatar}>
        <UserAvatar name={name} photo={photo} size={45} />
      </View>
      <View style={styles.message}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    paddingRight: 10,
  },
  message: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
  },
});
