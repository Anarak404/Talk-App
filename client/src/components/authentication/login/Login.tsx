import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { settingsContext } from '../../../context/SettingsContext';
import { ScreenTemplate } from '../../ScreenTemplate';

export function Login() {
  const { getString } = useContext(settingsContext);
  const { navigate } = useNavigation();

  const signupView = useCallback(() => {
    navigate('Register');
  }, [navigate]);

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
        <Button
          title={getString('register')}
          type="outline"
          containerStyle={styles.button}
          onPress={signupView}
        />
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
  button: {
    marginTop: 10,
  },
});
