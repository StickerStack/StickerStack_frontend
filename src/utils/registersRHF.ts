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
  required: 'Введите электронную почту',
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
    message: 'Электронная почта введена некорректно',
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

const registerAmount = {
  required: 'Введите количество',
  pattern: {
    value: REG_STICKERS,
    message: `Укажите количество от\u00A0${AMOUNT_INPUT_MIN_LENGTH}\u00A0до\u00A0${AMOUNT_INPUT_MAX_LENGTH}`,
  },
};

const registerSize = {
  required: 'Введите размеры',
  min: {
    value: SIZE_INPUT_MIN_LENGTH,
    message: `Укажите размеры от\u00A0${SIZE_INPUT_MIN_LENGTH}\u00A0до\u00A0${SIZE_INPUT_MAX_LENGTH} см`,
  },
  max: {
    value: SIZE_INPUT_MAX_LENGTH,
    message: `Укажите размеры от\u00A0${SIZE_INPUT_MIN_LENGTH}\u00A0до\u00A0${SIZE_INPUT_MAX_LENGTH} см`,
  },
};

export {
  registerEmail,
  registerPassword,
  registerRepeatPassword,
  profileName,
  registerAmount,
  registerSize,
};
