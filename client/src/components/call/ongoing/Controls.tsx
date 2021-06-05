import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';

export function Controls() {
  return (
    <View style={styles.container}>
      <FAB
        buttonStyle={[styles.buttonStyle, styles.disconnectButton]}
        icon={<Icon name="call-end" size={iconSize} />}
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
  buttonStyle: {
    borderRadius: 50,
    width: buttonSize,
    height: buttonSize,
  },
  disconnectButton: {
    backgroundColor: '#ff0000',
  },
});
