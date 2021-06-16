import React, { useContext } from 'react';
import { serverContext } from '../../contexts';
import { Messages } from '../messages';
import { SendMessageBar } from '../messages/SendMessageBar';

export function ServerMessagesView() {
  const { sendMessage, messages } = useContext(serverContext);

  return (
    <>
      <Messages messages={messages} />
      <SendMessageBar sendMessage={sendMessage} />
    </>
  );
}
