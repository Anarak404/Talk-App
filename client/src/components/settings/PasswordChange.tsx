import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { settingsContext } from '../../contexts';
import { ISettingsViewProps } from './Settings';

export function PasswordChange({ closeModal }: ISettingsViewProps) {
  const { getString } = useContext(settingsContext);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = () => {};

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
        onPress={changePassword}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
