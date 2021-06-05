import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatars } from './Avatars';
import { Controls } from './Controls';

export function OngoingCall() {
  const me = { name: 'Test' };
  const attender = {
    name: 'Test',
    photo:
      'https://i.kym-cdn.com/entries/icons/facebook/000/026/489/crying.jpg',
  };

  return (
    <View style={styles.container}>
      <Avatars me={me} attender={attender} />
      <Controls />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
