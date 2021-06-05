import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { callContext } from '../../../context/CallContext';

export function Controls() {
  const { endCall } = useContext(callContext);

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

const styles = StyleSheet.create({
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
    backgroundColor: '#ff0000',
  },
});
