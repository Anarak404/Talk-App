import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IUser } from '../../contexts';
import { UserAvatar } from '../call';
import { UserScreenNavigationProp } from '../Navigation';

export function Friend({ id, name, photo }: IUser) {
  const { navigate } = useNavigation<UserScreenNavigationProp>();

  const changeUser = useCallback(() => {
    navigate('User', { id });
  }, [id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeUser}>
        <UserAvatar name={name} photo={photo ? photo : undefined} size={30} />
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '100%',
  },
});
