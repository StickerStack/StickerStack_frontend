import { converter } from '../utils/converter';
import { IOptions } from '../shared/interfaces';

const REG_SPACE = '';
// eslint-disable-next-line no-useless-escape
const REG_EMAIL = /^[^\._-][0-9а-яА-ЯёЁa-zA-Z-_.]+@[а-яА-ЯёЁa-zA-Z]+\.[а-яА-ЯёЁa-zA-Z]{1,4}[^\._-]$/g;
// Только цифры от 1 до 100
const REG_STICKERS = /^([1-9][0-9]{0,1}|100)$/;
const REG_PASS = /(^[A-Za-z0-9!"#$% &'()*+,-./:;<=>?@[\]\\^_`{|}№~])+/g;

/* Только латинские и кириллические буквы и знак - */
const PROFILE_ONLY_LETTERS = /^(?!(?:.*-){3})(?!.*--)[а-яА-ЯёЁa-zA-Z-]+$/;
// http://api.stickerstack.ru/v1   http://localhost:8000/v1  http://93.95.98.73:7080/v1
const API_URL = 'https://api.stickerstack.ru/v1';

// Route paths
const PROFILE = '/profile';
const PRIVACY = '/privacy';
const TERMS = '/terms';
const COOKIE = '/cookie';
const PAGE_404 = '/page-not-found';
const ADD_STICKERS = '/add-stickers';
const CART = '/cart';
const ORDERS = '/orders';
const VERIFY_FORGOT_PASSWORD = '/auth/verify-forgot-password/:token';
const VERIFY_EMAIL = '/auth/verifyemail/:token';

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pagePrice = 290;
const CARDS_MAXIMUM = 15;

const pageSize: IOptions = {
  widthPage: 266.49,
  heightPage: 382.4,
  paddingList: {
    top: 10.0,
    right: 10.0,
    bottom: 10.0,
    left: 10.0,
  },
  gapX: 5,
  gapY: 5,
};

const pageSizePx = {
  widthPage: converter.mmToPx(pageSize.widthPage),
  heightPage: converter.mmToPx(pageSize.heightPage),
  paddingList: {
    top: converter.mmToPx(pageSize.paddingList.top),
    right: converter.mmToPx(pageSize.paddingList.right),
    bottom: converter.mmToPx(pageSize.paddingList.bottom),
    left: converter.mmToPx(pageSize.paddingList.left),
  },
  gapX: converter.mmToPx(pageSize.gapX),
  gapY: converter.mmToPx(pageSize.gapY),
};

const stickerWhiteBorder = 5;

const PROFILE_INPUT_MIN_LENGTH = 2;
const PROFILE_INPUT_MAX_LENGTH = 30;
const AMOUNT_INPUT_MIN_LENGTH = 1;
const AMOUNT_INPUT_MAX_LENGTH = 100;
const SIZE_INPUT_MIN_LENGTH = 3;
const SIZE_INPUT_MAX_LENGTH = Math.floor(pageSize.widthPage / 10);

export {
  API_URL,
  REG_EMAIL,
  REG_PASS,
  REG_STICKERS,
  PROFILE_ONLY_LETTERS,
  CARDS_MAXIMUM,
  PROFILE,
  PRIVACY,
  TERMS,
  COOKIE,
  ORDERS,
  PAGE_404,
  ADD_STICKERS,
  CART,
  VERIFY_FORGOT_PASSWORD,
  VERIFY_EMAIL,
  PROFILE_INPUT_MIN_LENGTH,
  PROFILE_INPUT_MAX_LENGTH,
  AMOUNT_INPUT_MIN_LENGTH,
  AMOUNT_INPUT_MAX_LENGTH,
  SIZE_INPUT_MIN_LENGTH,
  SIZE_INPUT_MAX_LENGTH,
  pagePrice,
  pageSize,
  pageSizePx,
  stickerWhiteBorder,
  getRandomNumber,
  REG_SPACE,
};
