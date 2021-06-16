import React, { useContext } from 'react';
import { userContext } from '../../contexts';
import { Messages } from '../messages';
import { SendMessageBar } from '../messages/SendMessageBar';

export function MessagesView() {
  const { sendMessage, messages } = useContext(userContext);

  return (
    <>
      <Messages messages={messages} />
      <SendMessageBar sendMessage={sendMessage} />
    </>
  );
}
