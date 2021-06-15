import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { callContext, dataStoreContext } from '../../../contexts';
import { Avatars } from './Avatars';
import { Controls } from './Controls';

interface IProps {
  showMap(): void;
}

export function OngoingCall({ showMap }: IProps) {
  const { me } = useContext(dataStoreContext);
  const { attender } = useContext(callContext);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Avatars me={me} attender={attender!!!} />
        <Controls showMap={showMap} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
