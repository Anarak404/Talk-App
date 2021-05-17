import React, { createContext, useMemo, useState } from 'react';
import {
  AppTheme,
  ISettingsContext,
  ISettingsContextProps,
  Language,
  StringId,
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

export function SettingsContextProvider({ children }: ISettingsContextProps) {
  const [lang, setLanguage] = useState(Language.PL);
  const [theme, setTheme] = useState(AppTheme.LIGHT);

  // return <Provider value={{}}>{children}</Provider>;
}
