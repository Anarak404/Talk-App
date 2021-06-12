import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IUser } from '../../contexts';
import { UserAvatar } from '../call';

interface IProps extends IUser {
  navigation: DrawerNavigationHelpers;
}

export function Friend({ id, name, photo, navigation }: IProps) {
  const changeUser = useCallback(() => {
    navigation.navigate('User', { id: id });
  }, [id, navigation]);

  return (
    <TouchableOpacity style={styles.container} onPress={changeUser}>
      <UserAvatar name={name} photo={photo ? photo : undefined} size={45} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
