import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Friends } from './Friends';
import { Servers } from './Servers';

export function DrawerContent({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) {
  return (
    <SafeAreaView style={styles.drawer}>
      <View style={styles.leftBar}>
        <Servers />
      </View>
      <Friends style={styles.friends} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
  },
  leftBar: {
    flexGrow: 1,
    flexBasis: 1,
  },
  friends: {
    flexGrow: 3,
    flexBasis: 3,
    paddingHorizontal: 10,
  },
});
