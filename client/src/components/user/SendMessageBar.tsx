import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { settingsContext } from '../../context/SettingsContext';

export function SendMessageBar() {
  const { getString } = useContext(settingsContext);

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.input}
        placeholder={getString('messagePlaceholder')}
        renderErrorMessage={false}
      />
      <Icon name="send" iconStyle={styles.icon} size={25} />
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
