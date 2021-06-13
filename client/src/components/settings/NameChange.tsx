import React, { useContext, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { changeNick } from '../../api';
import {
  dataStoreContext,
  sessionContext,
  settingsContext,
} from '../../contexts';
import { isValidNick } from '../../utils/validators';
import { ISettingsViewProps } from './Settings';

export function NameChange({ closeModal }: ISettingsViewProps) {
  const { getString } = useContext(settingsContext);
  const { httpClient } = useContext(sessionContext);
  const { saveMe } = useContext(dataStoreContext);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const changeName = () => {
    console.log(name);
    const nick = name.trim();

    if (!isValidNick(nick)) {
      ToastAndroid.show(getString('invalidNickLabel'), ToastAndroid.LONG);
      return;
    }

    setLoading(true);
    changeNick(httpClient, { name: nick })
      .then((x) => {
        closeModal();
        saveMe(x);
      })
      .catch(() => {
        ToastAndroid.show(getString('failed'), ToastAndroid.LONG);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Input placeholder={getString('newName')} onChangeText={setName} />
      <Button
        title={getString('changeName')}
        onPress={changeName}
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
