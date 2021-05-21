import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { settingsContext } from '../../../context/SettingsContext';
import { ScreenTemplate } from '../../ScreenTemplate';

export function Register() {
  const { getString } = useContext(settingsContext);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Input
          leftIcon={<Icon name="email" />}
          leftIconContainerStyle={styles.icon}
          label={getString('emailLabel')}
          placeholder={getString('emailPlaceholder')}
        />
        <Input
          leftIcon={<Icon name="account" type="material-community" />}
          leftIconContainerStyle={styles.icon}
          label={getString('nickLabel')}
          placeholder={getString('nickPlaceholder')}
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          label={getString('passwordLabel')}
          placeholder={getString('passwordPlaceholder')}
          secureTextEntry
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          label={getString('retypePasswordLabel')}
          placeholder={getString('retypePasswordPlaceholder')}
          secureTextEntry
        />
        <Button title={getString('register')} />
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
