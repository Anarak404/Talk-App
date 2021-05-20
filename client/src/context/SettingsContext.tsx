import React, { createContext, useCallback, useState } from 'react';
import eng from '../strings/eng';
import pl from '../strings/pl';
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
