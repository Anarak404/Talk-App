import React, { useContext } from 'react';
import { View } from 'react-native';
import { FAB, FullTheme, Icon, makeStyles } from 'react-native-elements';
import { callContext } from '../../../contexts';

export function Controls() {
  const { endCall } = useContext(callContext);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <FAB
        buttonStyle={[styles.buttonStyle, styles.disconnectButton]}
        icon={<Icon name="call-end" size={iconSize} />}
        containerStyle={styles.buttonContainer}
        onPress={endCall}
      />
    </View>
  );
}

const buttonSize = 60;
const iconSize = 25;

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 50,
  },
  buttonStyle: {
    width: buttonSize,
    height: buttonSize,
  },
  disconnectButton: {
    backgroundColor: theme.red,
  },
}));
