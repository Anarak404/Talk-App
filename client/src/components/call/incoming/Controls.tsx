import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import { FAB } from 'react-native-elements/dist/buttons/FAB';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export function Controls({ style }: IProps) {
  return (
    <View style={[style, styles.container]}>
      <FAB
        icon={<Icon name="call" size={iconSize} />}
        buttonStyle={[styles.buttonStyle, styles.answerButton]}
        containerStyle={styles.buttonContainer}
      />
      <FAB
        icon={<Icon name="call-end" size={iconSize} />}
        buttonStyle={[styles.buttonStyle, styles.rejectButton]}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
}

const buttonSize = 85;
const iconSize = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    borderRadius: 50,
  },
  buttonStyle: {
    width: buttonSize,
    height: buttonSize,
  },
  rejectButton: {
    backgroundColor: '#ff0000',
  },
  answerButton: {
    backgroundColor: '#00ff00',
  },
});
