import cn from 'classnames';
import styles from './InfoBox.module.scss';

type BoxType = 'simple' | 'number' | 'amount' | 'size';

interface IProps {
  type?: BoxType;
  className?: string;
  description: string;
  descriptionClass?: string;
  children: React.ReactNode;
  number?: number;
  numberClass?: string;
}

const InfoBox: React.FC<IProps> = ({
  type = 'simple',
  description,
  descriptionClass,
  number,
  className,
  children,
  numberClass,
}: IProps) => {
  return (
    <div className={cn(styles.flex, className)}>
      <span className={cn(styles.text, descriptionClass)}>{description}</span>
      <span
        className={cn(
          type === 'simple' ? styles.simple : styles.number,
          type === 'number' && styles.number_simple,
          numberClass,
        )}
      >
        {children}
        {type === 'amount' && ' шт'}
        {type === 'size' && ' см'}
      </span>
    </div>
  );
};

export { InfoBox };
