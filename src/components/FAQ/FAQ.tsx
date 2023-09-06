import { Container, TitlePage } from '../UI';
import { Dropdown } from '../Dropdown/Dropdown';
import { questions } from '../../utils/content/mainpage';

import styles from './FAQ.module.scss';

const FAQ: React.FC = () => {
  return (
    <Container className={styles.container}>
      <TitlePage type='section-title' className={styles.title}>
        Часто задаваемые вопросы
      </TitlePage>
      <ul className={styles.list}>
        {questions.items.map((item) => (
          <li key={item.id}>
            <Dropdown heading={item.question} content={item.answer} id={item.id} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export { FAQ };
