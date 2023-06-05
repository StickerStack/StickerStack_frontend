import {
  PROFILE_INPUT_MAX_LENGTH,
  PROFILE_INPUT_MIN_LENGTH,
  REG_EMAIL,
  PROFILE_ONLY_LETTERS,
  REG_PASS,
  PASS_SYMBOLS,
} from './constants';

const registerEmail = {
  required: 'Введите E-mail',
  minLength: {
    value: 6,
    message: 'Минимум 6 символов',
  },
  maxLength: {
    value: 50,
    message: 'Максимум 50 символов',
  },
  pattern: {
    value: REG_EMAIL,
    message: 'E-mail введен некорректно',
  },
};

const registerPassword = {
  required: 'Введите пароль',
  minLength: {
    value: 7,
    message: 'Минимум 7 символов',
  },
  maxLength: {
    value: 32,
    message: 'Максимум 32 символа',
  },
  pattern: {
    value: REG_PASS,
    message: `Только латинские буквы, цифры, символы ${PASS_SYMBOLS}`,
  },
};

const registerRepeatPassword = {
  required: 'Введите пароль повторно',
  minLength: {
    value: 7,
    message: 'Минимум 7 символов',
  },
  maxLength: {
    value: 32,
    message: 'Максимум 32 символа',
  },
};

const profileName = {
  minLength: {
    value: PROFILE_INPUT_MIN_LENGTH,
    message: `Минимум ${PROFILE_INPUT_MIN_LENGTH} символа`,
  },
  maxLength: {
    value: PROFILE_INPUT_MAX_LENGTH,
    message: `Максимум ${PROFILE_INPUT_MAX_LENGTH} символов`,
  },
  pattern: {
    value: PROFILE_ONLY_LETTERS,
    message: 'Только буквы',
  },
};

export { registerEmail, registerPassword, registerRepeatPassword, profileName };
