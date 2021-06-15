import React, { useContext, useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ToastAndroid, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { addFriend } from '../../api';
import { searchByEmail } from '../../api/user/search';
import {
  dataStoreContext,
  IUser,
  sessionContext,
  settingsContext,
} from '../../contexts';
import { UserInfo } from '../settings/UserInfo';

export function FindFriend() {
  const [text, setText] = useState('');
  const { getString } = useContext(settingsContext);
  const { httpClient } = useContext(sessionContext);
  const { saveFriend, saveUser } = useContext(dataStoreContext);
  const [friend, setFriend] = useState<IUser>();
  const [loading, setLoading] = useState(false);

  const search = () => {
    const email = text.trim();
    if (email.length > 0) {
      searchByEmail(httpClient, { email })
        .then((e) => setFriend(e))
        .catch(() => {
          ToastAndroid.show(getString('noResults'), ToastAndroid.LONG);
          setFriend(undefined);
        });
    }
  };

  const add = useCallback(() => {
    const person = friend;

    if (person) {
      setLoading(true);
      addFriend(httpClient, { id: person.id })
        .then((e) => {
          ToastAndroid.show(
            getString(e.success ? 'success' : 'failed'),
            ToastAndroid.LONG
          );
          setFriend(undefined);
          saveFriend(person.id);
          saveUser(person);
        })
        .finally(() => setLoading(false));
    }
  }, [
    friend,
    httpClient,
    setLoading,
    setFriend,
    getString,
    saveFriend,
    saveUser,
  ]);

  return (
    <View>
      <Input
        placeholder={getString('emailPlaceholder')}
        onChangeText={setText}
        rightIcon={<Icon name="search" size={30} onPress={search} />}
      />
      {friend && (
        <View>
          <UserInfo {...friend} />
          <Button
            title={getString('add')}
            containerStyle={styles.button}
            onPress={add}
            loading={loading}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
