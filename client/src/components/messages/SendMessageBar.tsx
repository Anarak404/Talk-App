import React, { useCallback, useContext, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { settingsContext } from '../../contexts';

interface IProps {
  sendMessage(message: string): void;
}

export function SendMessageBar({ sendMessage }: IProps) {
  const { getString } = useContext(settingsContext);

  const inputRef = useRef() as React.MutableRefObject<TextInput>;
  const message = useRef('');

  const setMessage = useCallback(
    (text: string) => {
      message.current = text;
    },
    [message]
  );

  const send = useCallback(() => {
    const m = message.current.trim();
    if (m.length > 0) {
      sendMessage(m);
      inputRef.current.clear();
      message.current = '';
    }
  }, [sendMessage, message, inputRef]);

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.input}
        placeholder={getString('messagePlaceholder')}
        renderErrorMessage={false}
        ref={inputRef}
        onChangeText={setMessage}
      />
      <Icon name="send" iconStyle={styles.icon} size={25} onPress={send} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 7,
  },
  input: {
    flex: 1,
    paddingBottom: 10,
  },
  icon: {
    marginHorizontal: 7,
  },
});
