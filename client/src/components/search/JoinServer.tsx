import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { settingsContext } from '../../contexts';

interface IProp {
  style?: StyleProp<ViewStyle>;
}

export function JoinServer({ style }: IProp) {
  const { getString } = useContext(settingsContext);
  const [loading, setLoading] = useState(false);

  return (
    <View style={style}>
      <Input placeholder={getString('joinCodePlaceholder')} />
      <Button title={getString('join')} loading={loading} />
    </View>
  );
}
