// eslint-disable-next-line no-useless-escape
const REG_EMAIL =/^(([^<>()[\]\\.,;:\s@\"]+[A-Za-z0-9]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([A-Za-z0-9]+\.)+[a-zA-Z]{2,}))$/;
const REG_PASS = /(^[A-Za-z0-9])\w+/g;
/* Только латинские и кириллические буквы и знак - */
const PROFILE_ONLY_LETTERS = /^[а-яА-ЯёЁa-zA-Z-]+$/;
// http://api.stickerstack.ru/api   http://localhost:8000/api  http://93.95.98.73:7080/api
const API_URL = 'http://93.95.98.73:7080/api';


// Route paths
const PROFILE = '/profile';
const PAGE_404 = '/page-not-found';
const ADD_STICKERS = '/add-stickers';
const VERIFY_FORGOT_PASSWORD = '/auth/verify-forgot-password/:token';
const VERIFY_EMAIL = '/auth/verifyemail/:token';
const PROFILE_INPUT_MIN_LENGTH = 2;
const PROFILE_INPUT_MAX_LENGTH = 30;

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
};