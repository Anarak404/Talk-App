import React from 'react';
import { Overlay, Text } from 'react-native-elements';

export function IncomingCall() {
  return (
    <Overlay isVisible fullScreen>
      <Text>Incoming Call</Text>
    </Overlay>
  );
}
