import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { IMessage } from '.';
import { Message } from './Message';

interface IProps {
  messages: IMessage[];
  style?: StyleProp<ViewStyle>;
}

export function Messages({ messages, style }: IProps) {
  return (
    <ScrollView contentContainerStyle={style}>
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
