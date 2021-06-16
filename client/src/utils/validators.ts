import validator from 'validator';

export const isEmail = (email: string) => {
  return validator.isEmail(email);
};

export const isStrongPassword = (password: string) => {
  // minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, maxLength: 30
  return password.length <= 30 && validator.isStrongPassword(password);
};

export const isValidNick = (nick: string) => {
  return nick.trim().length >= 3;
};

export const isBlank = (text: string) => {
  return text.trim().length === 0;
};
