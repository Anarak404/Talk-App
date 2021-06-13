import { useAsyncStorage } from '@react-native-community/async-storage';
import React, { createContext, useCallback, useState } from 'react';
import { useEffect } from 'react';
import eng from '../../strings/eng';
import pl from '../../strings/pl';
import {
  AppTheme,
  ISettingsContext,
  ISettingsContextProps,
  Language,
  StringId,
  StringSet,
} from './SettingsTypes';

const defaultValue: ISettingsContext = {
  setLanguage: (lang: Language) => void 0,
  setTheme: (theme: AppTheme) => void 0,
  getString: (text: StringId) => '',
  lang: Language.PL,
  theme: {},
};

export const settingsContext = createContext<ISettingsContext>(defaultValue);

const { Provider } = settingsContext;

const dictionary: Record<Language, StringSet> = {
  [Language.PL]: pl,
  [Language.ENG]: eng,
};

export function SettingsContextProvider({ children }: ISettingsContextProps) {
  const [lang, setLanguage] = useState(Language.PL);
  const [theme, setTheme] = useState(AppTheme.LIGHT);
  const [initialized, setInitialized] = useState(false);

  const { getItem: getLang, setItem: persistLang } = useAsyncStorage('lang');
  const { getItem: getTheme, setItem: persistTheme } = useAsyncStorage('theme');

  useEffect(() => {
    getLang().then((x) => {
      if (x) {
        setLanguage(Language[x as keyof typeof Language]);
      }
    });

    getTheme().then((x) => {
      if (x) {
        setTheme(AppTheme[x as keyof typeof AppTheme]);
      }
    });

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      persistLang(Language[lang]);
    }
  }, [lang]);

  useEffect(() => {
    if (initialized) {
      persistTheme(AppTheme[theme]);
    }
  }, [theme]);

  const getString = useCallback(
    (text: StringId) => {
      return dictionary[lang][text];
    },
    [dictionary, lang]
  );

  return (
    <Provider
      value={{
        setLanguage,
        setTheme,
        getString,
        lang,
        theme: {},
      }}
    >
      {children}
    </Provider>
  );
}
