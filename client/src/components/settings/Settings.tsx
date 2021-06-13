import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Icon, ListItem, Overlay, Text } from 'react-native-elements';
import { settingsContext } from '../../contexts';
import { LanguageSelector } from './LanguageSelector';
import { NameChange } from './NameChange';
import { PasswordChange } from './PasswordChange';
import { PhotoChange } from './PhotoChange';
import { ThemeSelector } from './ThemeSelector';

type SettingsItem =
  | 'theme'
  | 'language'
  | 'passwordChange'
  | 'nameChange'
  | 'photoChange';
type SettingsView = Record<
  SettingsItem,
  React.ReactElement<ISettingsViewProps>
>;

export interface ISettingsViewProps {
  closeModal(): void;
}

export function Settings() {
  const { getString } = useContext(settingsContext);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState<SettingsItem>();

  const selectLanguage = useCallback(() => {
    setVisible(true);
    setItem('language');
  }, [setItem]);

  const selectTheme = useCallback(() => {
    setVisible(true);
    setItem('theme');
  }, [setItem]);

  const selectName = useCallback(() => {
    setVisible(true);
    setItem('nameChange');
  }, [setItem]);

  const selectPassword = useCallback(() => {
    setVisible(true);
    setItem('passwordChange');
  }, [setItem]);

  const selectPhoto = useCallback(() => {
    setVisible(true);
    setItem('photoChange');
  }, [setItem]);

  const toggleOverlay = useCallback(() => {
    setVisible((v) => !v);
  }, [setVisible]);

  const views: SettingsView = {
    theme: <ThemeSelector closeModal={toggleOverlay} />,
    language: <LanguageSelector closeModal={toggleOverlay} />,
    nameChange: <NameChange closeModal={toggleOverlay} />,
    passwordChange: <PasswordChange closeModal={toggleOverlay} />,
    photoChange: <PhotoChange closeModal={toggleOverlay} />,
  };

  return (
    <ScrollView>
      <Text style={styles.title}>{getString('profile')}</Text>
      <ListItem bottomDivider onPress={selectName}>
        <ListItem.Content>
          <ListItem.Title>{getString('changeName')}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider onPress={selectPhoto}>
        <ListItem.Content>
          <ListItem.Title>{getString('changePhoto')}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider onPress={selectPassword}>
        <ListItem.Content>
          <ListItem.Title>{getString('changePassword')}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Text style={styles.title}>{getString('settings')}</Text>
      <ListItem bottomDivider onPress={selectLanguage}>
        <ListItem.Content>
          <ListItem.Title>{getString('language')}</ListItem.Title>
        </ListItem.Content>
        <Icon name="keyboard-arrow-right" />
      </ListItem>
      <ListItem bottomDivider onPress={selectTheme}>
        <ListItem.Content>
          <ListItem.Title>{getString('theme')}</ListItem.Title>
        </ListItem.Content>
        <Icon name="keyboard-arrow-right" />
      </ListItem>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        {item && views[item]}
      </Overlay>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '75%',
    padding: 0,
    borderRadius: 3,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    padding: 15,
    marginTop: 10,
  },
});
