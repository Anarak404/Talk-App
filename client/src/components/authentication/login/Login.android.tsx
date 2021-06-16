import { useNavigation } from '@react-navigation/native';
import { StatusCodes } from 'http-status-codes';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, ToastAndroid, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { ErrorResponse, login } from '../../../api';
import { sessionContext, settingsContext } from '../../../contexts';
import { getToken } from '../../../utils/messaging';
import { isBlank } from '../../../utils/validators';
import { ScreenTemplate } from '../../ScreenTemplate';

export function Login() {
  const { getString } = useContext(settingsContext);
  const { httpClient, logIn } = useContext(sessionContext);
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState('');

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  const signupView = useCallback(() => {
    navigate('Register');
  }, [navigate]);

  const signIn = () => {
    Keyboard.dismiss();

    if (isBlank(email) || isBlank(password)) {
      return;
    }

    setLoading(true);

    login(httpClient, { email, password, token })
      .then((e) => logIn(e))
      .catch((e: ErrorResponse) => {
        const message =
          e.error.status === StatusCodes.UNAUTHORIZED
            ? getString('authenticationFailed')
            : getString('serverError');

        ToastAndroid.show(message, ToastAndroid.LONG);
        setLoading(false);
      });
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Input
          leftIcon={<Icon name="email" />}
          leftIconContainerStyle={styles.icon}
          placeholder={getString('emailPlaceholder')}
          onChangeText={setEmail}
        />
        <Input
          leftIcon={<Icon name="lock" />}
          leftIconContainerStyle={styles.icon}
          placeholder={getString('passwordPlaceholder')}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button
          title={getString('login')}
          loading={loading}
          disabled={loading}
          onPress={signIn}
        />
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
