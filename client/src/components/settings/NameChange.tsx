import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { settingsContext } from '../../contexts';
import { ISettingsViewProps } from './Settings';

export function NameChange({ closeModal }: ISettingsViewProps) {
  const { getString } = useContext(settingsContext);
  const [name, setName] = useState('');

  const changeName = () => {};

  return (
    <View style={styles.container}>
      <Input placeholder={getString('newName')} onChangeText={setName} />
      <Button title={getString('changeName')} onPress={changeName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
