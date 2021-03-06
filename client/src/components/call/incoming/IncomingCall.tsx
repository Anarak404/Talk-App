import React, { useContext } from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles, Overlay, Text } from 'react-native-elements';
import { incomingCallContext } from '../../../contexts';
import { UserAvatar } from '../UserAvatar';
import { Controls } from './Controls';

export function IncomingCall() {
  const { caller } = useContext(incomingCallContext);
  const { name, photo } = caller;
  const styles = useStyle();

  return (
    <Overlay isVisible fullScreen overlayStyle={styles.container}>
      <View style={styles.profile}>
        <UserAvatar name={name} size={200} photo={photo ? photo : undefined} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <Controls style={styles.controls} />
    </Overlay>
  );
}

const useStyle = makeStyles((theme: Partial<FullTheme>) => ({
  controls: {
    flex: 2,
  },
  profile: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 25,
    fontSize: 30,
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: theme.backgroundColor,
  },
}));
