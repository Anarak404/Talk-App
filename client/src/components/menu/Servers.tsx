import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export function Servers({ style }: IProps) {
  return <ScrollView style={[style]}></ScrollView>;
}
