import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { serverContext } from '../../contexts';
import { UserAvatar } from '../call';

export function ServerMembers() {
  const { members } = useContext(serverContext);

  return (
    <ScrollView>
      {members.map((m) => (
        <View key={m.id} style={styles.container}>
          <UserAvatar
            name={m.name}
            photo={m.photo ? m.photo : undefined}
            size={45}
          />
          <Text style={styles.text}>{m.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
