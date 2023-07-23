import { useState } from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonCustom } from '../UI';

import styles from './Dropdown.module.scss';

interface IProps {
  id: number;
  heading: string;
  content: string;
  className?: string;
}

const Dropdown: React.FC<IProps> = ({ heading, content, id }: IProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.item} onClick={() => setActive(!active)}>
      <div className={styles.heading}>
        <p className={styles.question}>{heading}</p>
        <ButtonCustom
          type='arrow'
          label={active ? 'Скрыть ответ' : 'Показать ответ'}
          className={cn(styles.button, active && styles.button_up)}
        />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{
              opacity: 0.4,
              height: 0,
            }}
            animate={{
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.25, delay: 0.15 },
              },
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.25 },
              },
            }}
          >
            <motion.p className={cn(styles.answer)}>{content}</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Dropdown };
