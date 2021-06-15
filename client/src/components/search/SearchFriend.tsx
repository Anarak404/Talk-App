import React from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles } from 'react-native-elements';

export function SearchFriend() {
  const styles = useStyles();

  return <View style={styles.container}></View>;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
}));
