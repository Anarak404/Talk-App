import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { useContext } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { dataStoreContext } from '../../contexts';
import { Friend } from './Friend';

interface IProps {
  style?: StyleProp<ViewStyle>;
  navigation: DrawerNavigationHelpers;
}

export function Friends({ style, navigation }: IProps) {
  const { friends } = useContext(dataStoreContext);

  return (
    <ScrollView style={[style]}>
      {friends.map(
        (f) => f && <Friend {...f} key={f.id} navigation={navigation} />
      )}
    </ScrollView>
  );
}
