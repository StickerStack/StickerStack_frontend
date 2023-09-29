import { FC } from 'react';
import cn from 'classnames';

import { TLabel } from '../../../shared/types/TLabel';
import styles from './Label.module.scss';

const Label: FC<TLabel> = ({ className = '', children, ...rest }) => {
  return (
    <label className={cn(styles.label, styles[className])} {...rest}>
      {children}
    </label>
  );
};

export { Label };
