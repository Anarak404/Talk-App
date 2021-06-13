import React from 'react';
import { FullTheme, makeStyles } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ITemplateProps {
  children: React.ReactNode;
}

export const ScreenTemplate = ({ children }: ITemplateProps) => {
  const styles = useStyles();

  return <SafeAreaView style={styles.view}>{children}</SafeAreaView>;
};

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.backgroundColor,
  },
}));
