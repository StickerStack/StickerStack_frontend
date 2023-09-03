import { Container, TitlePage } from '../UI';

import image1 from '../../images/policy-img.png';
import image2 from '../../images/cart-dog.png';
import image3 from '../../images/empty-cart.png';
import styles from './Instructions.module.scss';

const Instructions: React.FC = () => {
  return (
    <Container className={styles.container}>
      <TitlePage type='section-title' className={styles.title}>
        Как получить свои идеальные стикеры
      </TitlePage>
      <ul className={styles.list}>
        <li className={styles.step}>
          <img className={styles.image} src={image1} />
          <div className={styles.content}>
            <h3 className={styles.title}>Шаг 1. Создать стикеры из изображений</h3>
            <p className={styles.text}>
              Перейти к заказу и загрузить свои картинки в формате PNG, JPEG или JPG, выбрать
              желаемые параметры будущего стикера. За каждый стикер одного вида отвечает одна
              каточка. Под всеми карточками можно ознакомиться с предварительным просмотром
              получившихся листов и итоговой ценой, а также выбрать, в каком виде вы хотите получить
              стикеры – вырезанные поштучно или оставить на листе.
            </p>
          </div>
        </li>
        <li className={styles.step}>
          <div className={styles.content}>
            <h3 className={styles.title}>Шаг 2. Оформить заказ</h3>
            <p>
              После добавления стикеров в корзину ознакомьтесь с итоговой информацией о заказе. На
              данном этапе можно удалить лишние стикеры из корзины или вернуться к предыдущему шагу
              и отредактировать стикеры. После оформления информация о заказе появится в личном
              кабинете, а на почту придет уведомление. За статусом готовности можно следить на
              странице «Заказы».
            </p>
          </div>
          <img className={styles.image} src={image2} />
        </li>
        <li className={styles.step}>
          <img className={styles.image} src={image3} />
          <div className={styles.content}>
            <h3 className={styles.title}>Шаг 3. Получить посылку</h3>
            <p>
              Когда стикеры будут готовы, придет уведомление. Заказ можно забрать самовывозом из
              пункта выдачи.
            </p>
          </div>
        </li>
      </ul>
    </Container>
  );
};

export { Instructions };
