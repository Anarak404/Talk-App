import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { FullTheme, Header, makeStyles } from 'react-native-elements';
import { dataStoreContext } from '../../contexts';
import { DrawerParamList } from '../Navigation';
import { Logout } from './Logout';
import { Settings } from './Settings';
import { UserInfo } from './UserInfo';

interface IProps {
  navigation: DrawerNavigationProp<DrawerParamList, 'Settings'>;
}

export function SettingsScreen({ navigation }: IProps) {
  const styles = useStyles();
  const { me } = useContext(dataStoreContext);

  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{
          icon: 'menu',
          onPress: navigation.openDrawer,
          size,
        }}
      />
      <UserInfo {...me} />
      <Settings />
      <Logout />
    </View>
  );
}

const size = 30;

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
}));
