import sticker_page from '../images/sticker_page.svg';
// eslint-disable-next-line no-useless-escape
const REG_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const REG_PASS = /(^[A-Za-z0-9])\w+/g;
/* Только латинские и кириллические буквы и знак - */
const PROFILE_ONLY_LETTERS = /^[а-яА-ЯёЁa-zA-Z-]+$/;
// http://api.stickerstack.ru/v1   http://localhost:8000/v1  http://93.95.98.73:7080/v1
const API_URL = 'https://api.stickerstack.ru/v1';

// Route paths
const PROFILE = '/profile';
const PAGE_404 = '/page-not-found';
const ADD_STICKERS = '/add-stickers';
const VERIFY_FORGOT_PASSWORD = '/auth/verify-forgot-password/:token';
const VERIFY_EMAIL = '/auth/verifyemail/:token';
const PROFILE_INPUT_MIN_LENGTH = 2;
const PROFILE_INPUT_MAX_LENGTH = 30;

// Мок страниц со стикерами, стоимости одной страницы

const pages = [{ link: sticker_page }, { link: sticker_page }, { link: sticker_page }];
const pagePrice = 490;

export {
  API_URL,
  REG_EMAIL,
  REG_PASS,
  PROFILE_ONLY_LETTERS,
  PROFILE,
  PAGE_404,
  ADD_STICKERS,
  VERIFY_FORGOT_PASSWORD,
  VERIFY_EMAIL,
  PROFILE_INPUT_MIN_LENGTH,
  PROFILE_INPUT_MAX_LENGTH,
  pages,
  pagePrice,
};
