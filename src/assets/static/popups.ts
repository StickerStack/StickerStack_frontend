import { pagePrice } from '@utils/constants';

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
  text: 'В течение 5\u00A0минут на указанную почту придет ссылка для восстановления пароля',
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
  errorMatch: 'Пароли не совпадают',
};

export const messages = {
  itemTooBig: 'Слишком большой запрос для загрузки.',
  fieldsError: 'Ошибка при заполнении полей. Попробуйте поменять значения.',
  success: 'Успешно изменено',
  somethingWrong: 'Что-то пошло не так. Попробуйте еще раз.',
  orderingDenied: 'Ошибка: перед оформлением заказа подтвердите почту в личном кабинете.',
};

export const verifyPlease = {
  title: 'Подтвердите вашу почту',
  text: 'Мы направили письмо на\u00A0вашу электронную почту, оно придет в\u00A0течение 5\u00A0минут. Для подтверждения профиля перейдите по\u00A0ссылке в\u00A0письме.',
  buttonText: 'Понятно!',
};

export const verifyChanged = {
  title: 'Подтвердите новую почту',
  text: 'Мы направили письмо на\u00A0новую электронную почту, оно придет в\u00A0течение 5\u00A0минут. Для подтверждения перейдите по\u00A0ссылке в\u00A0письме.',
  buttonText: 'Понятно!',
};

export const verified = {
  title: 'Почта подтверждена',
  text: 'Сделай свои вещи уникальными с\u00A0помощью стикеров на\u00A0виниловой пленке.',
  buttonText: 'Перейти к заказу',
};

export const passwordChanged = {
  title: 'Пароль изменен',
  text: 'Сделай свои вещи уникальными с\u00A0помощью стикеров на\u00A0виниловой пленке.',
  buttonText: 'Войти',
  error: 'Срок действия ссылки истек. Попробуйте запросить восстановление пароля еще раз.',
};

export const orderPlaced = {
  title: 'Заказ оформлен!',
  text: 'Вся информация по\u00A0заказу отправлена на\u00A0почту. Следите за\u00A0статусом его готовности в\u00A0личном кабинете',
  buttonText: 'Заказать еще',
  buttonSecondText: 'Перейти к заказам',
};

export const confirmCart = {
  title: 'Очистить корзину?',
  text: 'В вашей корзине еще остались стикеры. Чтобы повторить предыдущий заказ, их\u00A0придется удалить.',
  buttonText: 'Продолжить',
  buttonSecondText: 'Отменить',
};

export const previewShow = {
  text: `Хотим напомнить о\u00A0стоимости печати одного листа, которая составляет ${pagePrice}\u00A0рублей. Размер одного листа - 38х26\u00A0см (это рыба).`,
  ordering: 'Перед оформлением просим ознакомиться с\u00A0финальными макетами',
  warning:
    'Учитывайте, что данные изображения предоставляются для ознакомления с\u00A0приблизительным видом листов и\u00A0могут иметь искажения в\u00A0зависимости от используемого монитора. Окончательные макеты будут тщательно проработаны нашими специалистами перед отправкой в\u00A0печать.',
};

export const verifyBeforeOredering = {
  title: 'Подтвердите вашу почту',
  text: 'Чтобы завершить заказ, необходимо подтвердить электронную почту. Для этого нажмите на\u00A0кнопку ниже, письмо подтверждения придет в течение 5\u00A0минут. Далее перейдите по\u00A0ссылке в\u00A0письме.',
  buttonText: 'Выслать письмо',
};
