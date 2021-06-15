import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

export function ServerIcons() {
  return (
    <View style={styles.container}>
      <Icon name="users" type="font-awesome-5" size={size} />
      <Icon name="share" size={size + 3} containerStyle={styles.iconMargin} />
    </View>
  );
}

const size = 25;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginLeft: 12,
  },
});
