import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { settingsContext } from '../../contexts';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';

type SettingsItem = 'theme' | 'language';
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

  const toggleOverlay = useCallback(() => {
    setVisible((v) => !v);
  }, [setVisible]);

  const views: SettingsView = {
    theme: <ThemeSelector closeModal={toggleOverlay} />,
    language: <LanguageSelector closeModal={toggleOverlay} />,
  };

  return (
    <View>
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
});
