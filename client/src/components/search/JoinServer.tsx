import React, { useContext, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  ToastAndroid,
  View,
  ViewStyle,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { joinServer } from '../../api';
import {
  dataStoreContext,
  sessionContext,
  settingsContext,
} from '../../contexts';

interface IProp {
  style?: StyleProp<ViewStyle>;
}

export function JoinServer({ style }: IProp) {
  const { getString } = useContext(settingsContext);
  const { httpClient } = useContext(sessionContext);
  const { saveServer } = useContext(dataStoreContext);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const onButtonClick = () => {
    const code = text.trim();
    if (code.length > 0) {
      setLoading(true);
      joinServer(httpClient, { name: code })
        .then((e) => {
          ToastAndroid.show(
            `${getString('successJoin')} ${e.name}`,
            ToastAndroid.LONG
          );
          saveServer(e);
        })
        .catch(() =>
          ToastAndroid.show(getString('invalidJoinCode'), ToastAndroid.LONG)
        )
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={[style, styles.container]}>
      <Input
        placeholder={getString('joinCodePlaceholder')}
        onChangeText={setText}
      />
      <Button
        title={getString('join')}
        loading={loading}
        onPress={onButtonClick}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: '60%',
  },
});
