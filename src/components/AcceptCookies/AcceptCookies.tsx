import { FC, useState, useEffect } from 'react';

import styles from './AcceptCookies.module.scss';
import { ButtonCustom, ButtonWithText } from '../UI';

const AcceptCookies: FC = () => {
  const [acceptCookies, setAcceptCookies] = useState(false);

  const getCookie = (name: string) => {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = (name: string, value: string, days: number) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  const onAccept = () => {
    setCookie('acceptCookies', 'true', 365);
    setAcceptCookies(true);
  };

  useEffect(() => {
    setAcceptCookies(getCookie('acceptCookies') === 'true');
  }, []);

  if (acceptCookies) {
    return null;
  }

  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Чтобы улучшить работу сайта вам необходимо согласиться на использование файлов cookie
      </p>
      <ButtonWithText className={styles.button} onClick={onAccept}>
        Согласен
      </ButtonWithText>
      <ButtonCustom className={styles.close} type='close' label='close-accept-cookies' />
    </div>
  );
};

export { AcceptCookies };
