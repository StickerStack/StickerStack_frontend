import cn from 'classnames';
import { TitlePage } from '@/components/UI';

import styles from './Dots.module.scss';

interface IProps {
  className?: string;
  text: string;
}
const Dots: React.FC<IProps> = ({ className, text }: IProps) => {
  return (
    <TitlePage type='section-title' className={cn(styles.text, className)}>
      {text}
      <div className={styles.dots} />
    </TitlePage>
  );
};

export { Dots };
