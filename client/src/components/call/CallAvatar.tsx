import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

interface IProps {
  size: number | 'small' | 'medium' | 'large' | 'xlarge';
  name: string;
  photo?: string;
}

export function CallAvatar({ size, name, photo }: IProps) {
  if (name.trim().length > 2) {
    name = name.substr(0, 2).toUpperCase();
  }

  return (
    <Avatar
      rounded
      source={photo ? { uri: photo } : undefined}
      size={size}
      title={photo ? undefined : name}
      containerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
});
