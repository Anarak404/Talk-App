import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserAvatar } from '../UserAvatar';

interface IUser {
  name: string;
  photo?: string;
}

interface IProps {
  me: IUser;
  attender: IUser;
}

export function Avatars({ me, attender }: IProps) {
  return (
    <View style={styles.avatarContainer}>
      <UserAvatar size={avatarSize} name={me.name} photo={me.photo} />
      <View style={styles.divider} />
      <UserAvatar
        size={avatarSize}
        name={attender.name}
        photo={attender.photo}
      />
    </View>
  );
}

const avatarSize = 90;

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  divider: {
    width: 15,
  },
});
