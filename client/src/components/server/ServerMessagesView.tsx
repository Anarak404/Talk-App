import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { serverContext } from '../../contexts';
import { Messages } from '../messages';
import { SendMessageBar } from '../messages/SendMessageBar';

export function ServerMessagesView() {
  const { sendMessage, messages } = useContext(serverContext);

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
    flex: 1,
  },
});
