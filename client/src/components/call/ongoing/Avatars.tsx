import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CallAvatar } from '../CallAvatar';

export function Avatars() {
  return (
    <View style={styles.avatarContainer}>
      <CallAvatar size={avatarSize} name="FD" />
      <View style={styles.divider} />
      <CallAvatar
        size={avatarSize}
        name="FD"
        photo="https://i.kym-cdn.com/entries/icons/facebook/000/026/489/crying.jpg"
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
