import React, { useContext, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { Button, FullTheme, Input, makeStyles } from 'react-native-elements';
import { changePassword } from '../../api';
import { sessionContext, settingsContext } from '../../contexts';
import { isStrongPassword } from '../../utils/validators';
import { ISettingsViewProps } from './Settings';

export function PasswordChange({ closeModal }: ISettingsViewProps) {
  const { getString } = useContext(settingsContext);
  const { httpClient } = useContext(sessionContext);

  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const styles = useStyles();

  const onChangePassword = () => {
    if (!isStrongPassword(newPassword)) {
      ToastAndroid.show(getString('invalidPasswordLabel'), ToastAndroid.LONG);
      return;
    }

    const onErrorCallback = () => {
      ToastAndroid.show(getString('failed'), ToastAndroid.LONG);
      setLoading(false);
    };

    setLoading(true);
    changePassword(httpClient, { currentPassword, newPassword })
      .then((x) => {
        if (x.success) {
          closeModal();
        } else {
          onErrorCallback();
        }
      })
      .catch(() => onErrorCallback());
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={getString('currentPassword')}
        secureTextEntry
        onChangeText={setCurrentPassword}
      />
      <Input
        placeholder={getString('newPassword')}
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <Button
        title={getString('changePassword')}
        onPress={onChangePassword}
        loading={loading}
      />
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    padding: 15,
    backgroundColor: theme.backgroundColor,
  },
}));
