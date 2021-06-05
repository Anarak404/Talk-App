import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatars } from './Avatars';
import { Controls } from './Controls';

export function OngoingCall() {
  return (
    <View style={styles.container}>
      <Avatars />
      <Controls />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
