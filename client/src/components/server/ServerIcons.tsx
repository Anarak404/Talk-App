import React, { useCallback, useContext } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { serverContext, settingsContext } from '../../contexts';

interface IProps {
  showMembers(): void;
}

export function ServerIcons({ showMembers }: IProps) {
  const { generateCode, fetchMembers } = useContext(serverContext);
  const { getString } = useContext(settingsContext);

  const fetchAndShowMembers = useCallback(() => {
    fetchMembers();
    showMembers();
  }, [showMembers, fetchMembers]);

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
      <Icon
        name="users"
        type="font-awesome-5"
        size={size}
        onPress={fetchAndShowMembers}
      />
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
