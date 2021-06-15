import React from 'react';
import { Theme } from 'react-native-elements';

export interface ISettingsContext {
  setLanguage(lang: Language): void;
  setTheme(theme: AppTheme): void;
  getString(text: StringId): string;
  theme: Theme;
  lang: Language;
}

export interface ISettingsContextProps {
  children?: React.ReactNode;
}

export enum Language {
  PL,
  ENG,
}

export enum AppTheme {
  DARK,
  LIGHT,
}

export type StringSet = Record<StringId, string>;

export type StringId =
  | 'emailLabel'
  | 'emailPlaceholder'
  | 'nickLabel'
  | 'nickPlaceholder'
  | 'passwordLabel'
  | 'passwordPlaceholder'
  | 'retypePasswordLabel'
  | 'retypePasswordPlaceholder'
  | 'register'
  | 'login'
  | 'invalidEmailLabel'
  | 'invalidNickLabel'
  | 'invalidPasswordLabel'
  | 'passwordsNotEqualLabel'
  | 'emailConflict'
  | 'serverError'
  | 'authenticationFailed'
  | 'messagePlaceholder'
  | 'settings'
  | 'language'
  | 'theme'
  | 'selectLanguage'
  | 'selectTheme'
  | 'PL'
  | 'ENG'
  | 'light'
  | 'dark'
  | 'changePassword'
  | 'changeName'
  | 'newName'
  | 'currentPassword'
  | 'newPassword'
  | 'profile'
  | 'changePhoto'
  | 'photoUrl'
  | 'signOut'
  | 'failed'
  | 'invalidUrl'
  | 'joinCodePlaceholder'
  | 'join'
  | 'add'
  | 'invalidJoinCode'
  | 'successJoin'
  | 'noResults'
  | 'findServers'
  | 'findFriends'
  | 'success'
  | 'copiedCodeToClipboard';
