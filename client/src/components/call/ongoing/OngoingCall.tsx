import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView>
      <View style={styles.container}>
        <Avatars me={me} attender={attender} />
        <Controls />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
