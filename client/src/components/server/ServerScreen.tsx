import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { FullTheme, makeStyles, Overlay } from 'react-native-elements';
import { ServerContext } from '../../contexts';
import { DrawerParamList } from '../Navigation';
import { ServerHeader } from './ServerHeader';
import { ServerMembers } from './ServerMembers';
import { ServerMessagesView } from './ServerMessagesView';

interface IProps {
  route: RouteProp<DrawerParamList, 'Server'>;
  navigation: DrawerNavigationProp<DrawerParamList, 'Server'>;
}

export function ServerScreen({ navigation, route }: IProps) {
  const styles = useStyles();
  const serverId = route.params.id;
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(
    () => setVisible((v) => !v),
    [setVisible]
  );

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <ServerContext serverId={serverId}>
      <View style={styles.container}>
        <ServerHeader openDrawer={openDrawer} showMembers={toggleVisibility} />
        <ServerMessagesView />
        <Overlay
          isVisible={visible}
          overlayStyle={styles.overlay}
          onBackdropPress={toggleVisibility}
        >
          <ServerMembers />
        </Overlay>
      </View>
    </ServerContext>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  overlay: {
    backgroundColor: theme.backgroundColor,
    width: '75%',
    height: '75%',
  },
}));
