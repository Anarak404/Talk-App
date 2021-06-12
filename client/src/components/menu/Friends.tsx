import React from 'react';
import { useContext } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { dataStoreContext } from '../../contexts';
import { Friend } from './Friend';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export function Friends({ style }: IProps) {
  const { friends } = useContext(dataStoreContext);

  return (
    <ScrollView style={[style]}>
      {friends.map((f) => (
        <Friend {...f} key={f.id} />
      ))}
    </ScrollView>
  );
}
