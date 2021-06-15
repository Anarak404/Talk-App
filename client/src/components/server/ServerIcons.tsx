import React, { useCallback } from 'react';
import { useContext } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { serverContext, settingsContext } from '../../contexts';

export function ServerIcons() {
  const { generateCode } = useContext(serverContext);
  const { getString } = useContext(settingsContext);

  const onSharePress = useCallback(() => {
    generateCode().then((success) =>
      ToastAndroid.show(
        getString(success ? 'copiedCodeToClipboard' : 'failed'),
        ToastAndroid.LONG
      )
    );
  }, [generateCode, getString]);

  return (
    <View style={styles.container}>
      <Icon name="users" type="font-awesome-5" size={size} />
      <Icon
        name="share"
        size={size + 3}
        containerStyle={styles.iconMargin}
        onPress={onSharePress}
      />
    </View>
  );
}

const size = 25;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginLeft: 12,
  },
});
