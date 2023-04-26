import cn from 'classnames';

import {TIconFileNames, TIconFiles} from "../../../types/TIcon";

import clearIcon from '../../../images/icons/clear-field.svg';
import passwordHidden from '../../../images/icons/password-hidden.svg';
import passwordShown from '../../../images/icons/password-shown.svg';
import styles from './IconButton.module.scss';

const icons: TIconFiles = {
  'clear-field.svg': clearIcon,
  'password-hidden.svg': passwordHidden,
  'password-shown.svg': passwordShown,
}

interface IProps {
  visible: boolean;
  icon: TIconFileNames;
  className?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IProps> = ({ onClick, visible, icon, className }: IProps) => {
  return (
    <button
      className={ cn( styles.button, { [styles.hidden]: !visible}, className ) }
      style={{
        backgroundImage: `url(${icons[icon]})`
      }}
      onClick={onClick}
    />
  );
};

export { IconButton };