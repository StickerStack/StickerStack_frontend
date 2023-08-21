import cn from 'classnames';

import { PicOverlay } from '../PicOverlay/PicOverlay';
import { useAppDispatch } from '../../hooks/hooks';

import styles from './ImagePick.module.scss';
import { deleteProfileImage, getProfileImage, updateProfileImage } from '../../store/userSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IUserState } from '../../interfaces';

interface IProps {
  image?: string | ArrayBuffer | null;
  className?: string;
  // onLoadImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // deleteImage?: () => void;
}

const ImagePick: React.FC<IProps> = ({ image, className }: IProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: { user: IUserState }) => state.user);

  const allowedTypeFile = ['image/png', 'image/jpeg', 'image/jpg'];

  const onLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && allowedTypeFile.includes(files[0].type)) {
      const file = files[0];
      const data = new FormData();
      data.append('file', file);
      dispatch(updateProfileImage(data));
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getProfileImage()).then((res) => console.log(user.avatar));
    }
  }, []);

  const deleteImage = () => {
    dispatch(deleteProfileImage()).then(() => console.log('Deleted'));
  };

  return (
    <div className={cn(styles.pic, className)}>
      <img className={styles.image} alt='Загруженное изображение' src={user.avatar} />
      <PicOverlay className={styles.overlay} onLoadImage={onLoadImage} deleteImage={deleteImage} />
    </div>
  );
};

export { ImagePick };
