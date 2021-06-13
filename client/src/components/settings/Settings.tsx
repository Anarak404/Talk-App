import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Overlay } from 'react-native-elements';
import { settingsContext } from '../../contexts';
import { LanguageSelector } from './LanguageSelector';
import { NameChange } from './NameChange';
import { PasswordChange } from './PasswordChange';
import { ThemeSelector } from './ThemeSelector';
import { Icon, Text } from 'react-native-elements';
import { PhotoChange } from './PhotoChange';

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
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '75%',
    padding: 0,
  },
  title: {
    fontSize: 18,
    padding: 15,
    marginTop: 10,
  },
});
