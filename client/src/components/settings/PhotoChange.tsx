import React, { useContext, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { Button, FullTheme, Input, makeStyles } from 'react-native-elements';
import { changePhoto } from '../../api';
import {
  dataStoreContext,
  sessionContext,
  settingsContext,
} from '../../contexts';
import { ISettingsViewProps } from './Settings';

export function PhotoChange({ closeModal }: ISettingsViewProps) {
  const { getString } = useContext(settingsContext);
  const { httpClient } = useContext(sessionContext);
  const { refetchProfile } = useContext(dataStoreContext);

  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = useStyles();

  const changePhotoUrl = () => {
    const url = photo.trim();
    console.log(photo);

    if (url.length < 3) {
      ToastAndroid.show(getString('invalidUrl'), ToastAndroid.LONG);
      return;
    }

    setLoading(true);
    changePhoto(httpClient, { name: url })
      .then(() => {
        refetchProfile(httpClient);
        closeModal();
      })
      .catch(() => {
        ToastAndroid.show(getString('failed'), ToastAndroid.LONG);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Input placeholder={getString('photoUrl')} onChangeText={setPhoto} />
      <Button
        title={getString('changePhoto')}
        onPress={changePhotoUrl}
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
