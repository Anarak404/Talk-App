import { useNavigation } from '@react-navigation/core';
import { StatusCodes } from 'http-status-codes';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, Keyboard, StyleSheet, ToastAndroid, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { ErrorResponse, register } from '../../../api';
import { settingsContext } from '../../../context/SettingsContext';
import { userContext } from '../../../context/UserContext';
import {
  isEmail,
  isStrongPassword,
  isValidNick,
} from '../../../utils/validators';
import { ScreenTemplate } from '../../ScreenTemplate';

export function Register() {
  const { getString } = useContext(settingsContext);
  const { httpClient, setToken } = useContext(userContext);
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordsNotEqual, setPasswordsNotEqual] = useState(false);

  const signinView = useCallback(() => {
    navigate('Login');
  }, [navigate]);

  const signUp = () => {
    Keyboard.dismiss();

    const validationResults = [
      { result: !isEmail(email), callback: setEmailError },
      { result: !isValidNick(name), callback: setNickError },
      { result: !isStrongPassword(password), callback: setPasswordError },
      { result: password !== repeatedPassword, callback: setPasswordsNotEqual },
    ];

    validationResults.forEach((e) => e.callback(e.result));

    // check if some field is invalid
    if (validationResults.some((e) => e.result)) {
      return;
    }

    setLoading(true);

    register(httpClient, { email, password, name })
      .then((e) => setToken(e.token))
      .catch((e: ErrorResponse) => {
        const message =
          e.error.status === StatusCodes.CONFLICT
            ? getString('emailConflict')
            : getString('serverError');

        ToastAndroid.show(message, ToastAndroid.LONG);
      })
      .finally(() => setLoading(false));
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
          errorMessage={emailError ? getString('invalidEmailLabel') : ''}
        />
        <Input
          leftIcon={<Icon name="account" type="material-community" />}
          leftIconContainerStyle={styles.icon}
          label={getString('nickLabel')}
          placeholder={getString('nickPlaceholder')}
          onChangeText={setName}
          textContentType="nickname"
          errorMessage={nickError ? getString('invalidNickLabel') : ''}
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          label={getString('passwordLabel')}
          placeholder={getString('passwordPlaceholder')}
          secureTextEntry
          onChangeText={setPassword}
          textContentType="password"
          errorMessage={passwordError ? getString('invalidPasswordLabel') : ''}
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          label={getString('retypePasswordLabel')}
          placeholder={getString('retypePasswordPlaceholder')}
          secureTextEntry
          onChangeText={setRepeatedPassword}
          textContentType="password"
          errorMessage={
            passwordsNotEqual ? getString('passwordsNotEqualLabel') : ''
          }
          errorStyle={{ marginBottom: passwordsNotEqual ? 10 : 0 }}
        />
        <Button
          title={getString('register')}
          onPress={signUp}
          loading={loading}
          disabled={loading}
        />
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
