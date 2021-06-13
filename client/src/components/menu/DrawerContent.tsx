import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Friends } from './Friends';
import { Servers } from './Servers';

export function DrawerContent({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.drawer}>
      <View style={styles.container}>
        <View style={[styles.leftBar]}>
          <Servers />
        </View>
        <Friends style={[styles.friends]} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  drawer: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  leftBar: {
    flexGrow: 1,
    flexBasis: 1,
    backgroundColor: theme.secondaryBackgroundColor,
  },
  friends: {
    flexGrow: 3,
    flexBasis: 3,
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
    flexDirection: 'row',
  },
}));
