import React, { useContext } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { FullTheme, Icon, makeStyles } from 'react-native-elements';
import { FAB } from 'react-native-elements/dist/buttons/FAB';
import { incomingCallContext } from '../../../contexts';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export function Controls({ style }: IProps) {
  const { answer, reject } = useContext(incomingCallContext);
  const styles = useStyles();

  return (
    <View style={[style, styles.container]}>
      <FAB
        icon={<Icon name="call" size={iconSize} />}
        buttonStyle={[styles.buttonStyle, styles.answerButton]}
        containerStyle={styles.buttonContainer}
        onPress={answer}
      />
      <FAB
        icon={<Icon name="call-end" size={iconSize} />}
        buttonStyle={[styles.buttonStyle, styles.rejectButton]}
        containerStyle={styles.buttonContainer}
        onPress={reject}
      />
    </View>
  );
}

const buttonSize = 85;
const iconSize = 40;

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
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
    backgroundColor: theme.red,
  },
  answerButton: {
    backgroundColor: theme.green,
  },
}));
