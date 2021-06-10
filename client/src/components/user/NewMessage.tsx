import React, { useContext } from 'react';
import { userContext } from '../../contexts';
import { SendMessageBar } from '../messages/SendMessageBar';

export function NewMessage() {
  const { sendMessage } = useContext(userContext);

  return <SendMessageBar sendMessage={sendMessage} />;
}
