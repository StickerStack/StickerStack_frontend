import { REG_EMAIL } from "./constants";

const registerEmail = {
  required: 'Введите E-mail',
  minLength: {
    value: 5,
    message: 'Длина поля не менее 5 символов'
  },
  maxLength: {
    value: 50,
    message: 'Длина поля не более 50 символов'
  },
  pattern: {
    value: REG_EMAIL,
    message: 'E-mail введен некорректно'
  }
};

const registerPassword = {
  required: 'Введите пароль',
  minLength: {
    value: 7,
    message: 'Длина поля не менее 7 символов'
  },
  maxLength: {
    value: 32,
    message: 'Длина поля не более 32 символов'
  }
};

export { registerEmail, registerPassword }