import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { FullTheme, Header, makeStyles } from 'react-native-elements';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import { settingsContext } from '../../contexts';
import { DrawerParamList } from '../Navigation';
import { FindFriend } from './FindFriend';
import { JoinServer } from './JoinServer';

interface IProps {
  navigation: DrawerNavigationProp<DrawerParamList, 'SearchFriend'>;
}

interface IRoute {
  key: string;
  title: string;
}

export function SearchFriend({ navigation }: IProps) {
  const styles = useStyles();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const { getString } = useContext(settingsContext);

  const renderScene = SceneMap({
    server: JoinServer,
    friend: FindFriend,
  });

  useEffect(() => {
    setRoutes([
      {
        key: 'server',
        title: getString('findServers'),
      },
      {
        key: 'friend',
        title: getString('findFriends'),
      },
    ]);
  }, [getString]);

  const tabs = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<IRoute>;
      }
    ) => {
      return (
        <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
        />
      );
    },
    [styles]
  );

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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        sceneContainerStyle={styles.tabView}
        renderTabBar={tabs}
      />
    </View>
  );
}

const size = 30;
const paddingHorizontal = 15;
const paddingVertical = 10;

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  tabView: {
    paddingHorizontal,
    paddingVertical,
  },
  tabBar: {
    backgroundColor: theme.colors?.primary,
  },
  indicator: {
    backgroundColor: theme.indicatorColor,
  },
}));
