import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';

export function Controls() {
  return (
    <View style={styles.container}>
      <FAB
        buttonStyle={[styles.buttonStyle, styles.disconnectButton]}
        icon={<Icon name="call-end" size={iconSize} />}
        containerStyle={styles.buttonContainer}
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
