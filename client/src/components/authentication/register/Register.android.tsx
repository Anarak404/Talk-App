import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, Keyboard, StyleSheet, ToastAndroid, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { ErrorResponse, register } from '../../../api';
import { settingsContext } from '../../../context/SettingsContext';
import { ScreenTemplate } from '../../ScreenTemplate';

const isBlank = (text: string) => {
  return text.trim().length === 0;
};

export function Register() {
  const { getString } = useContext(settingsContext);
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const signinView = useCallback(() => {
    navigate('Login');
  }, [navigate]);

  const signUp = () => {
    Keyboard.dismiss();

    if (password !== repeatedPassword) {
      // TODO: alert user about not equal passwords
      ToastAndroid.show('Incorrect password', ToastAndroid.LONG);
      return;
    }

    register({ email, password, name })
      .then((e) => {
        Alert.alert('Success', `token: ${e.token}`);
      })
      .catch((e: ErrorResponse) => {
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      });
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Input
          leftIcon={<Icon name="email" />}
          leftIconContainerStyle={styles.icon}
          label={getString('emailLabel')}
          placeholder={getString('emailPlaceholder')}
          onChangeText={setEmail}
          textContentType="emailAddress"
        />
        <Input
          leftIcon={<Icon name="account" type="material-community" />}
          leftIconContainerStyle={styles.icon}
          label={getString('nickLabel')}
          placeholder={getString('nickPlaceholder')}
          onChangeText={setName}
          textContentType="nickname"
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          label={getString('passwordLabel')}
          placeholder={getString('passwordPlaceholder')}
          secureTextEntry
          onChangeText={setPassword}
          textContentType="password"
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          label={getString('retypePasswordLabel')}
          placeholder={getString('retypePasswordPlaceholder')}
          secureTextEntry
          onChangeText={setRepeatedPassword}
          textContentType="password"
        />
        <Button title={getString('register')} onPress={signUp} />
        <Button
          title={getString('login')}
          type="outline"
          containerStyle={styles.button}
          onPress={signinView}
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
