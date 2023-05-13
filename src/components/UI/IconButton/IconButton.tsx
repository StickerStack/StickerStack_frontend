import cn from 'classnames';

import { TIconFileNames, TIconFiles } from "../../../types/TIcon";

import clearIcon from '../../../images/icons/clear-field.svg';
import passwordHidden from '../../../images/icons/password-hidden.svg';
import passwordShown from '../../../images/icons/password-shown.svg';
import tooltipIcon from '../../../images/icons/tooltip-icon.svg';

import styles from './IconButton.module.scss';

const icons: TIconFiles = {
  'clear-field.svg': clearIcon,
  'password-hidden.svg': passwordHidden,
  'password-shown.svg': passwordShown,
  'tooltip-icon.svg': tooltipIcon,
}

interface IProps {
  visible: boolean;
  icon: TIconFileNames;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const IconButton: React.FC<IProps> = ({ onClick, onMouseEnter, onMouseLeave, visible, icon, className }: IProps) => {
  return (
    <button
      type='button'
      className={ cn( styles.button, { [styles.hidden]: !visible}, className ) }
      style={{
        backgroundImage: `url(${icons[icon]})`
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

export { IconButton };