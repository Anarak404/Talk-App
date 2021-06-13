import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { settingsContext } from '../../contexts';
import { ISettingsViewProps } from './Settings';

export function PhotoChange({ closeModal }: ISettingsViewProps) {
  const { getString } = useContext(settingsContext);
  const [photo, setPhoto] = useState('');

  const changePhoto = () => {};

  return (
    <View style={styles.container}>
      <Input placeholder={getString('photoUrl')} onChangeText={setPhoto} />
      <Button title={getString('changePhoto')} onPress={changePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
