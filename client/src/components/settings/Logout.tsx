import React, { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { settingsContext } from '../../contexts';

export function Logout() {
  const { getString } = useContext(settingsContext);

  const logOut = useCallback(() => {}, []);

  return (
    <View>
      <Button
        title={getString('signOut')}
        onPress={logOut}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
  },
});
