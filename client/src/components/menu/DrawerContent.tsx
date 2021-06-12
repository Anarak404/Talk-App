import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Friends } from './Friends';
import { Servers } from './Servers';

export function DrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>
) {
  return (
    <View style={styles.drawer}>
      <View style={styles.leftBar}>
        <Servers />
      </View>
      <Friends style={styles.friends} />
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '100%',
    display: 'flex',
  },
  leftBar: {
    flexGrow: 1,
    backgroundColor: 'red',
  },
  friends: {
    flexGrow: 3,
    backgroundColor: 'blue',
  },
});
