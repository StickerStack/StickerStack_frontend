import cn from 'classnames';

import { PicOverlay } from '../PicOverlay/PicOverlay';
import { useAppDispatch } from '../../hooks/hooks';

import styles from './ImagePick.module.scss';
import { deleteProfileImage, getProfileImage, updateProfileImage } from '../../store/userSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IUserState } from '../../interfaces';

interface IProps {
  image?: string;
  className?: string;
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
      dispatch(getProfileImage()).then((res) => console.log(res));
    }
  }, []);

  const deleteImage = () => {
    dispatch(deleteProfileImage()).then(() => console.log('Deleted'));
  };

  return (
    <div className={cn(styles.pic, className)}>
      <img
        className={styles.image}
        alt='Загруженное изображение'
        crossOrigin='use-credentials'
        src='https://api.stickerstack.ru/v1/user/profile-image'
        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = event.target as HTMLImageElement;
          target.src = image ?? '';
        }}
      />
      <PicOverlay className={styles.overlay} onLoadImage={onLoadImage} deleteImage={deleteImage} />
    </div>
  );
};

export { ImagePick };
