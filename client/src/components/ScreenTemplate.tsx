import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ITemplateProps {
  children: React.ReactNode;
}

export const ScreenTemplate = ({ children }: ITemplateProps) => {
  return <SafeAreaView style={styles.view}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
