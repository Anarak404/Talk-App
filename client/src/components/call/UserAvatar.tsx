import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-elements';

interface IProps {
  size: number | 'small' | 'medium' | 'large' | 'xlarge';
  name: string;
  photo?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function UserAvatar({ size, name, photo, style, onPress }: IProps) {
  name = name.trim().toUpperCase();

  if (name.length > 2) {
    const words = name.split(' ');
    if (words.length > 1) {
      name = words[0].substr(0, 1) + words[1].substr(0, 1);
    } else {
      name = name.substr(0, 2);
    }
  }

  return (
    <Avatar
      rounded
      source={photo ? { uri: photo } : undefined}
      size={size}
      title={photo ? undefined : name}
      containerStyle={[styles.container, style]}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
});
