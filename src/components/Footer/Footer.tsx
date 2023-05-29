import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { PAGE_404 } from '../../utils/constants';
import { Container, TextUnderline } from '../UI';

import logo from '../../images/logo.svg';
import { ReactComponent as TelSvg } from '../../images/icons/tel.svg';
import { ReactComponent as MailSvg } from '../../images/icons/mail.svg';
import { ReactComponent as InstSvg } from '../../images/icons/inst.svg';
import { ReactComponent as TelegaSvg } from '../../images/icons/telega.svg';
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
            <li className={styles.item}>
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
              <TextUnderline type='link'>Публичная оферта</TextUnderline>
            </li>
            <li className={styles.text}>
              <TextUnderline type='link'>Пользовательское соглашение</TextUnderline>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  ) : null;
};

export { Footer };
