import { REG_EMAIL, REG_PASS } from './constants';

const registerEmail = {
  required: 'Введите E-mail',
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
    message: 'Только латинские буквы'
  }
};

export { registerEmail, registerPassword };
