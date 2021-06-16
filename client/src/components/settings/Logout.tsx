import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { sessionContext, settingsContext } from '../../contexts';

export function Logout() {
  const { getString } = useContext(settingsContext);
  const { logout } = useContext(sessionContext);

  return (
    <View>
      <Button
        title={getString('signOut')}
        onPress={logout}
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
