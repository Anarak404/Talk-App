import { StringSet } from '../context/SettingsTypes';

const strings: StringSet = {
  emailLabel: 'Your email address',
  emailPlaceholder: 'email@address.com',
  nickLabel: 'Your nickname',
  nickPlaceholder: 'Nickname',
  passwordLabel: 'Your password',
  passwordPlaceholder: 'Password',
  retypePasswordLabel: 'Retype password',
  retypePasswordPlaceholder: 'Password',
  register: 'Sign up',
  login: 'Sign in',
  invalidEmailLabel: 'Invalid email address',
  invalidNickLabel: 'Nick must have at least 3 characters',
  invalidPasswordLabel:
    'Password must contains 8-30 characters, 1 upper and lower letter, 1 digit and 1 special character',
  passwordsNotEqualLabel: 'Passwords are not equal',
  emailConflict: 'User with the given email already exists',
  serverError: 'Upss... Something went wrong. Try again later!',
  authenticationFailed: 'Invalid login or password',
};

export default strings;
