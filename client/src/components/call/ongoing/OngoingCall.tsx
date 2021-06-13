import React from 'react';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { callContext, dataStoreContext } from '../../../contexts';
import { Avatars } from './Avatars';
import { Controls } from './Controls';

export function OngoingCall() {
  const { me } = useContext(dataStoreContext);
  const { attender } = useContext(callContext);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Avatars me={me} attender={attender!!!} />
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
