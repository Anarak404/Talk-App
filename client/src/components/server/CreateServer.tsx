import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { TextInput, ToastAndroid, View } from 'react-native';
import {
  Button,
  FullTheme,
  Header,
  Input,
  makeStyles,
} from 'react-native-elements';
import { createServer } from '../../api';
import {
  dataStoreContext,
  sessionContext,
  settingsContext,
} from '../../contexts';
import { DrawerParamList } from '../Navigation';

interface IProps {
  navigation: DrawerNavigationProp<DrawerParamList, 'CreateServer'>;
}

export function CreateServer({ navigation }: IProps) {
  const styles = useStyles();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const { getString } = useContext(settingsContext);
  const { httpClient } = useContext(sessionContext);
  const { refetchProfile } = useContext(dataStoreContext);

  const serverNameRef = useRef() as React.MutableRefObject<TextInput>;
  const photoRef = useRef() as React.MutableRefObject<TextInput>;

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const onPress = () => {
    const serverName = name.trim();

    if (serverName.length < 3) {
      ToastAndroid.show(getString('invalidServerName'), ToastAndroid.LONG);
      return;
    }

    const photoUrl = url.trim();

    setLoading(true);

    createServer(httpClient, {
      name: serverName,
      photo: photoUrl.length > 0 ? photoUrl : undefined,
    })
      .then(() => {
        refetchProfile(httpClient);
        ToastAndroid.show(getString('success'), ToastAndroid.LONG);
        serverNameRef.current.clear();
        photoRef.current.clear();
      })
      .catch(() => ToastAndroid.show(getString('failed'), ToastAndroid.LONG))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{
          icon: 'menu',
          onPress: openDrawer,
          size,
        }}
      />
      <View style={styles.view}>
        <Input
          placeholder={getString('serverName')}
          onChangeText={setName}
          ref={serverNameRef}
        />
        <Input
          placeholder={getString('photoUrl')}
          onChangeText={setUrl}
          ref={photoRef}
        />
        <Button
          title={getString('create')}
          onPress={onPress}
          containerStyle={styles.button}
          loading={loading}
        />
      </View>
    </View>
  );
}

const size = 30;

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  button: {
    width: '60%',
  },
  view: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
}));
