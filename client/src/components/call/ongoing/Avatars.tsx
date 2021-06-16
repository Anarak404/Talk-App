import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IUser } from '../../../contexts';
import { UserAvatar } from '../UserAvatar';

interface IProps {
  me: IUser;
  attender: IUser;
}

export function Avatars({ me, attender }: IProps) {
  return (
    <View style={styles.avatarContainer}>
      <UserAvatar
        size={avatarSize}
        name={me.name}
        photo={me.photo ? me.photo : undefined}
      />
      <View style={styles.divider} />
      <UserAvatar
        size={avatarSize}
        name={attender.name}
        photo={attender.photo ? attender.photo : undefined}
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
