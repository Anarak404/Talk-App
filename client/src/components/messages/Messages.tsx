import React from 'react';
import { ScrollView, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { IMessage } from '.';
import { Message } from './Message';

interface IProps {
  messages: IMessage[];
}

export function Messages({ messages }: IProps) {
  return (
    <ScrollView contentContainerStyle={styles.messages}>
      {messages.map((e, index) => (
        <Message
          message={e}
          key={e.id}
          style={{ paddingBottom: index !== messages.length - 1 ? 15 : 0 }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messages: {
    padding: 10,
  },
});
