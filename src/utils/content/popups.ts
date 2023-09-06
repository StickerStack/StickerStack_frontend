export const signin = {
  title: 'Вход',
  email: { emailLabel: 'Электронная почта', emailPlaceholder: 'Введите почту' },
  password: {
    passwordLabel: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    forgotPassword: 'Забыли пароль?',
  },
  button: 'Войти',
  link: { text: 'Зарегистрироваться', label: 'Нет аккаунта?' },
  error: 'Неверная почта и/или пароль',
};

export const signup = {
  title: 'Регистрация',
  email: { emailLabel: 'Электронная почта', emailPlaceholder: 'example@gmail.com' },
  password: { passwordLabel: 'Пароль', passwordPlaceholder: 'Введите пароль' },
  passwordRepeat: {
    passwordRepeatLabel: 'Подтвердить пароль',
    passwordRepeatPlaceholder: 'Введите пароль',
  },
  button: 'Зарегистрироваться',
  link: { text: 'Войти', label: 'Уже есть аккаунт?' },
  error: 'Учетная запись с такой почтой уже существует',
  errorMatch: 'Пароли не совпадают',
};

export const reset = {
  title: 'Восстановление пароля',
  email: { emailLabel: 'Электронная почта', emailPlaceholder: 'example@gmail.com' },
  text: 'В течение 5 минут на указанную почту придет ссылка для восстановления пароля',
  button: 'Восстановить пароль',
  links: { text: 'Войти', textSecond: 'Зарегистрироваться' },
};

export const resetInfo = {
  title: 'Восстановление пароля',
  text: 'Перейдите на почту ',
  tectCont: ', чтобы восстановить пароль',
  link: { text: 'Вести другую почту' },
};

export const changePassword = {
  title: 'Смена пароля',
  password: { passwordLabel: 'Новый пароль', passwordPlaceholder: 'Введите пароль' },
  passwordRepeat: {
    passwordRepeatLabel: 'Подтвердить пароль',
    passwordRepeatPlaceholder: 'Введите пароль',
  },
  button: 'Изменить пароль',
};

export const messages = {
  fieldsError: 'Ошибка при заполнении полей. Попробуйте поменять значения.',
  somethingWrong: 'Что-то пошло не так. Попробуйте еще раз.',
};
