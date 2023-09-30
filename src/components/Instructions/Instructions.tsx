import { Container, TitlePage } from '@components/UI';
import { instructions } from '@static/mainpage';

import styles from './Instructions.module.scss';

const Instructions: React.FC = () => {
  return (
    <Container className={styles.container}>
      <TitlePage type='section-title'>{instructions.title}</TitlePage>
      <ul className={styles.list}>
        {instructions.items.map((item) => (
          <li className={styles.step} key={item.id}>
            <img className={styles.image} src={item.image} />
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export { Instructions };
