import cn from 'classnames';
import { TooltipCustom } from '../UI';
import styles from './InfoBox.module.scss';

type BoxType = 'simple' | 'number' | 'amount' | 'size';

interface IProps {
  type?: BoxType;
  className?: string;
  description: string;
  descriptionClass?: string;
  children: React.ReactNode;
  numberClass?: string;
  tooltip?: string;
}

const InfoBox: React.FC<IProps> = ({
  type = 'simple',
  description,
  descriptionClass,
  className,
  children,
  numberClass,
  tooltip,
}: IProps) => {
  return (
    <div className={cn(styles.flex, className)}>
      <span className={cn(styles.text, descriptionClass)}>{description}</span>

      {tooltip && <TooltipCustom text={tooltip} />}
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
