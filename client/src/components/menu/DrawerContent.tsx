import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FullTheme, Icon, makeStyles } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Friends } from './Friends';
import { Servers } from './Servers';

export function DrawerContent({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) {
  const styles = useStyles();

  const goToSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const goToSearchFriend = useCallback(() => {
    navigation.navigate('SearchFriend');
  }, [navigation]);

  const goToCreateServer = useCallback(() => {
    navigation.navigate('CreateServer');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.drawer}>
      <View style={styles.container}>
        <View style={[styles.leftBar]}>
          <Servers style={styles.servers} navigation={navigation} />
          <View>
            <Icon
              name="plus"
              type="material-community"
              size={iconSize}
              onPress={goToCreateServer}
              containerStyle={styles.iconContainer}
            />
            <Icon
              name="search"
              size={iconSize}
              onPress={goToSearchFriend}
              containerStyle={styles.iconContainer}
            />
            <Icon
              name="settings"
              size={iconSize}
              onPress={goToSettings}
              containerStyle={styles.iconContainer}
            />
          </View>
        </View>
        <Friends style={[styles.friends]} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const iconSize = 40;

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  drawer: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  leftBar: {
    flexGrow: 1,
    flexBasis: 1,
    backgroundColor: theme.secondaryBackgroundColor,
  },
  friends: {
    flexGrow: 3,
    flexBasis: 3,
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    paddingBottom: 8,
  },
  servers: {
    flex: 1,
  },
}));
