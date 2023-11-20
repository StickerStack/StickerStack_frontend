import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ButtonWithText } from '@/components/UI';
import { COOKIE } from '@utils/constants';

import styles from './AcceptCookies.module.scss';

const AcceptCookies: FC = () => {
  const [acceptCookies, setAcceptCookies] = useState(false);

  const getCookie = (name: string) => {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, '\\$1') + '=([^;]*)'),
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

  return (
    <AnimatePresence>
      {!acceptCookies && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            transition: {
              duration: 0.5,
            },
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
            },
          }}
          className={styles.container}
        >
          <div className={styles.texts}>
            <p className={styles.text}>
              При использовании данного сайта, вы&nbsp;подтверждаете свое согласие на&nbsp;использование{' '}
              <ButtonWithText theme='no-border'>
                <Link className={styles.link} to={COOKIE} target='_blank'>
                  файлов cookie
                </Link>
              </ButtonWithText>{' '}
              и&nbsp;других похожих технологий в&nbsp;соответствии с&nbsp;настоящим Уведомлением.
            </p>
          </div>
          <div className={styles.buttons}>
            <ButtonWithText className={styles.button} onClick={onAccept}>
              Принять
            </ButtonWithText>
            <ButtonWithText theme='transparent' className={styles.button} onClick={() => setAcceptCookies(true)}>
              Отклонить
            </ButtonWithText>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { AcceptCookies };
