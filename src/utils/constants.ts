// eslint-disable-next-line no-useless-escape
const REG_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+[A-Za-z0-9]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([A-Za-z0-9]+\.)+[a-zA-Z]{2,}))$/;
const REG_PASS = /(^[A-Za-z0-9])\w+/g
const API_URL = 'http://api.stickerstack.ru/api';

export { API_URL, REG_EMAIL, REG_PASS };
  
