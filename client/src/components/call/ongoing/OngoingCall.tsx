import React, { useContext } from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles } from 'react-native-elements';
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
  const styles = useStyles();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Avatars me={me} attender={attender!!!} />
        <Controls showMap={showMap} />
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    padding: 20,
    backgroundColor: theme.darkerBackgroundColor,
  },
}));
