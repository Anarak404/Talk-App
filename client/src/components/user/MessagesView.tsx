import React, { useContext } from 'react';
import { userContext } from '../../contexts';
import { SendMessageBar } from '../messages/SendMessageBar';
import { StyleSheet } from 'react-native';
import { Messages } from '../messages';

export function MessagesView() {
  const { sendMessage, messages } = useContext(userContext);

  return (
    <>
      <Messages messages={messages} style={styles.messages} />
      <SendMessageBar sendMessage={sendMessage} />
    </>
  );
}

const styles = StyleSheet.create({
  messages: {
    padding: 10,
  },
});
