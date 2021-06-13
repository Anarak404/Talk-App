import React, { useCallback, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Divider,
  FullTheme,
  ListItem,
  makeStyles,
  Text,
} from 'react-native-elements';
import ListItemTitle from 'react-native-elements/dist/list/ListItemTitle';
import { AppTheme, settingsContext } from '../../contexts';
import { ISettingsViewProps } from './Settings';

export function ThemeSelector({ closeModal }: ISettingsViewProps) {
  const { getString, setTheme } = useContext(settingsContext);
  const styles = useStyles();

  const selectLightTheme = useCallback(() => {
    closeModal();
    setTheme(AppTheme.LIGHT);
  }, [setTheme, closeModal]);

  const selectDarkTheme = useCallback(() => {
    closeModal();
    setTheme(AppTheme.DARK);
  }, [setTheme, closeModal]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getString('selectTheme')}</Text>
      <Divider />
      <ScrollView>
        <ListItem bottomDivider onPress={selectLightTheme}>
          <ListItem.Content>
            <ListItemTitle>{getString('light')}</ListItemTitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider onPress={selectDarkTheme}>
          <ListItem.Content>
            <ListItemTitle>{getString('dark')}</ListItemTitle>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  title: {
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 20,
  },
  container: {
    backgroundColor: theme.colors?.primary,
  },
}));
