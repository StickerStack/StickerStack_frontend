import {
  PROFILE_INPUT_MAX_LENGTH,
  PROFILE_INPUT_MIN_LENGTH,
  AMOUNT_INPUT_MIN_LENGTH,
  AMOUNT_INPUT_MAX_LENGTH,
  SIZE_INPUT_MIN_LENGTH,
  SIZE_INPUT_MAX_LENGTH,
  REG_EMAIL,
  REG_STICKERS,
  PROFILE_ONLY_LETTERS,
  REG_PASS,
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
    message: 'Только латинские буквы',
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

const registerAmount = {
  required: 'Введите количество стикеров',
  pattern: {
    value: REG_STICKERS,
    message: `Укажите корректное количество от ${AMOUNT_INPUT_MIN_LENGTH} до ${AMOUNT_INPUT_MAX_LENGTH}`,
  },
};

const registerSize = {
  required: 'Введите размеры',
  pattern: {
    value: REG_STICKERS,
    message: `Укажите корректные размеры от ${SIZE_INPUT_MIN_LENGTH} до ${SIZE_INPUT_MAX_LENGTH} см`,
  },
};

export { registerEmail, registerPassword, profileName, registerAmount, registerSize };
