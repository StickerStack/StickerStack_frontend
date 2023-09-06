import { motion } from 'framer-motion';
import { ResetPassword } from '../..';
import { TextUnderline, TextForm, TitlePopup } from '../../UI';
import { openPopup } from '../../../store/popupSlice';

import { useAppDispatch } from '../../../hooks/hooks';
import { resetInfo } from '../../../utils/content/popups';

import styles from './ResetPasswordInfo.module.scss';

const ResetPasswordInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const email = localStorage.getItem('email');
  return (
    <motion.div
      className={styles.resetpassword}
      initial={{
        opacity: 0.1,
      }}
      animate={{
        transition: {
          duration: 0.5,
        },
        opacity: 1,
      }}
      exit={{
        opacity: 0.2,
        transition: {
          duration: 0.5,
        },
      }}
    >
      <TitlePopup>{resetInfo.title}</TitlePopup>
      <TextForm>
        {resetInfo.text}
        {email}
        {resetInfo.tectCont}
      </TextForm>
      <TextUnderline
        type='button'
        className={styles.button}
        onClick={() => dispatch(openPopup(ResetPassword))}
      >
        {resetInfo.link.text}
      </TextUnderline>
    </motion.div>
  );
};

export { ResetPasswordInfo };
