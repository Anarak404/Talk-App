import React, { useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import ListItem from 'react-native-elements/dist/list/ListItem';
import ListItemTitle from 'react-native-elements/dist/list/ListItemTitle';
import { Language, settingsContext } from '../../contexts';
import { ISettingsViewProps } from './Settings';

export function LanguageSelector({ closeModal }: ISettingsViewProps) {
  const { getString, setLanguage } = useContext(settingsContext);

  const setLangPL = useCallback(() => {
    closeModal();
    setLanguage(Language.PL);
  }, [setLanguage, closeModal]);

  const setLangENG = useCallback(() => {
    closeModal();
    setLanguage(Language.ENG);
  }, [setLanguage, closeModal]);

  return (
    <View>
      <Text style={styles.title}>{getString('selectLanguage')}</Text>
      <Divider />
      <ScrollView>
        <ListItem bottomDivider onPress={setLangPL}>
          <ListItem.Content>
            <ListItemTitle>{getString('PL')}</ListItemTitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider onPress={setLangENG}>
          <ListItem.Content>
            <ListItemTitle>{getString('ENG')}</ListItemTitle>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 20,
  },
});
