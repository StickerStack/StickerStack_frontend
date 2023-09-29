import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { COOKIE, PAGE_404, PRIVACY, TERMS } from '../../utils/constants';
import { Container, TextUnderline } from '../UI';

import logo from '../../assets/images/logo.svg';
import TelSvg from '../../assets/images/icons/tel.svg?react';
import MailSvg from '../../assets/images/icons/mail.svg?react';
import InstSvg from '../../assets/images/icons/inst.svg?react';
import TelegaSvg from '../../assets/images/icons/telega.svg?react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const location = useLocation();
  const phone = '+7 900 123 45 67';
  const email = 'legendsneverdie@mail.ru';

  return location.pathname !== PAGE_404 ? (
    <footer className={styles.footer}>
      <Container className={styles.footer_container}>
        <div className={styles.main}>
          <Link to='/' className={styles.logo}>
            <img className={styles.logo_image} src={logo} alt='Логотип StickerStack' />
          </Link>
          <span className={styles.text}>©&nbsp;2022-2023 ООО&nbsp;«Стикерстак»</span>
        </div>
        <div className={styles.contacts}>
          <h3 className={styles.title}>Контакты</h3>
          <ul className={styles.list}>
            <li>
              <a href={`tel:${phone}`} className={cn(styles.text, styles.item)}>
                <TelSvg />
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className={cn(styles.text, styles.item)}>
                <MailSvg />
                {email}
              </a>
            </li>
            <li className={styles.items}>
              <a href='#' className={styles.item}>
                <InstSvg />
              </a>
              <a href='' className={styles.item}>
                <TelegaSvg />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.contacts}>
          <h3 className={styles.title}>Правовая информация</h3>
          <ul className={styles.list}>
            <li className={styles.text}>
              <TextUnderline theme='contrast' type='link' link={PRIVACY}>
                Политика конфиденциальности
              </TextUnderline>
            </li>
            <li className={styles.text}>
              <TextUnderline theme='contrast' type='link' link={TERMS}>
                Условия использования сервиса
              </TextUnderline>
            </li>
            <li className={styles.text}>
              <TextUnderline theme='contrast' type='link' link={COOKIE}>
                Политика использования cookie-файлов
              </TextUnderline>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  ) : null;
};

export { Footer };
