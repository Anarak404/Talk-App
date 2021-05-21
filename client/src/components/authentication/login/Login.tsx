import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { settingsContext } from '../../../context/SettingsContext';
import { ScreenTemplate } from '../../ScreenTemplate';

export function Login() {
  const { getString } = useContext(settingsContext);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Input
          leftIcon={<Icon name="email" />}
          leftIconContainerStyle={styles.icon}
          placeholder={getString('emailPlaceholder')}
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          placeholder={getString('passwordPlaceholder')}
          secureTextEntry
        />
        <Button title={getString('login')} />
      </View>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
});