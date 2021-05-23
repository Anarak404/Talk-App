import { StringSet } from '../context/SettingsTypes';

const strings: StringSet = {
  emailLabel: 'Twój adres email',
  emailPlaceholder: 'email@adres.pl',
  nickLabel: 'Twoja nazwa użytkownika',
  nickPlaceholder: 'Nazwa użytkownika',
  passwordLabel: 'Hasło',
  passwordPlaceholder: 'Hasło',
  retypePasswordLabel: 'Powtórz hasło',
  retypePasswordPlaceholder: 'Hasło',
  register: 'Zarejestruj się',
  login: 'Zaloguj się',
  invalidEmailLabel: 'Nieprawidłowy adres email',
  invalidNickLabel: 'Nazwa użytkownika musi mieć co najmniej 3 znaki',
  invalidPasswordLabel:
    'Hasło musi zawierać 8-30 znaków, 1 wielką i małą literę, 1 cyfrę oraz 1 znak specjalny',
  passwordsNotEqualLabel: 'Hasła muszą być takie same',
  emailConflict: 'Użytkownik z podanym emailem już istnieje',
  serverError: 'Upss... Coś poszło nie tak. Spróbuj ponownie później!',
  authenticationFailed: 'Nieprawidłowy login lub hasło',
  messagePlaceholder: 'Napisz wiadomość',
};

export default strings;
