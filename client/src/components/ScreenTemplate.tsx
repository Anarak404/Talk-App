import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ITemplateProps {
  children: React.ReactNode;
}

export const ScreenTemplate = ({ children }: ITemplateProps) => {
  return <View style={styles.view}>{children}</View>;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
