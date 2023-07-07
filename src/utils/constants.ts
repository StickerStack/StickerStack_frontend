import sticker_page from '../images/sticker_page.svg';
// eslint-disable-next-line no-useless-escape
const REG_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// Только цифры от 1 до 100
const REG_STICKERS = /^[1-9][0-9]?$|^100$/;
const REG_PASS = /(^[A-Za-z0-9!"#$% &'()*+,-./:;<=>?@[\]\\^_`{|}№~])+/g;
const REG_SPACE = /\s/g;
/* Только латинские и кириллические буквы и знак - */
const PROFILE_ONLY_LETTERS = /^[а-яА-ЯёЁa-zA-Z-]+$/;
// http://api.stickerstack.ru/v1   http://localhost:8000/v1  http://93.95.98.73:7080/v1
const API_URL = 'https://api.stickerstack.ru/v1';

// Route paths
const PROFILE = '/profile';
const PAGE_404 = '/page-not-found';
const ADD_STICKERS = '/add-stickers';
const PREVIEW_STICKERS = '/preview';
const VERIFY_FORGOT_PASSWORD = '/auth/verify-forgot-password/:token';
const VERIFY_EMAIL = '/auth/verifyemail/:token';

// Minmax ограничения инпутов
const PROFILE_INPUT_MIN_LENGTH = 2;
const PROFILE_INPUT_MAX_LENGTH = 30;
const AMOUNT_INPUT_MIN_LENGTH = 1;
const AMOUNT_INPUT_MAX_LENGTH = 100;
const SIZE_INPUT_MIN_LENGTH = 1;
const SIZE_INPUT_MAX_LENGTH = 25;

// Мок страниц со стикерами, стоимости одной страницы
const pages = [{ link: sticker_page }, { link: sticker_page }, { link: sticker_page }];
const pagePrice = 490;

// Мок раздела вопросы и ответы

const questions = [
  {
    id: 1,
    question: 'Какие формы стикеров вы можете сделать?',
    answer:
      'Мы можем изготовить стикеры в различных формах, включая круглые, овальные, квадратные, прямоугольные и другие нестандартные формы. Если у вас есть особые пожелания, свяжитесь с нами, и мы постараемся вам помочь.',
  },
  {
    id: 2,
    question: 'Можно ли заказать стикеры нестандартной формы?',
    answer: 'Да, мы можем изготовить стикеры в любой нестандартной форме по вашему желанию.',
  },
  {
    id: 3,
    question: 'Какой формат файлов вы принимаете для загрузки на сайт?',
    answer:
      'Мы принимаем файлы в форматах JPEG, PNG, PDF, SVG, AI, EPS, CDR. Вы также можете загрузить макет стикера в любом другом формате, и мы постараемся его преобразовать в нужный формат.',
  },
  {
    id: 4,
    question: 'Как долго займет изготовление моего заказа?',
    answer:
      'Мы обычно изготавливаем стикеры в течение 1-2 рабочих дней. Время изготовления может зависеть от сложности и объема заказа. Мы свяжемся с вами, если возникнут какие-либо задержки.',
  },
  {
    id: 5,
    question: 'Какая технология печати используется для изготовления стикеров?',
    answer:
      'Мы используем современную технологию цифровой печати на виниловой пленке, которая обеспечивает высокое качество изображения и долговечность стикера.',
  },
  {
    id: 6,
    question: 'Какие способы оплаты вы принимаете?',
    answer:
      'Мы принимаем оплату банковскими картами, электронными кошельками, банковскими переводами и наличными при получении заказа.',
  },
];

export {
  API_URL,
  REG_EMAIL,
  REG_PASS,
  REG_STICKERS,
  PROFILE_ONLY_LETTERS,
  PREVIEW_STICKERS,
  PROFILE,
  PAGE_404,
  ADD_STICKERS,
  VERIFY_FORGOT_PASSWORD,
  VERIFY_EMAIL,
  PROFILE_INPUT_MIN_LENGTH,
  PROFILE_INPUT_MAX_LENGTH,
  AMOUNT_INPUT_MIN_LENGTH,
  AMOUNT_INPUT_MAX_LENGTH,
  SIZE_INPUT_MIN_LENGTH,
  SIZE_INPUT_MAX_LENGTH,
  pages,
  questions,
  pagePrice,
};
