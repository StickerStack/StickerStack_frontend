import { useState } from 'react';
import cn from 'classnames';

import { PicOverlay } from '../PicOverlay/PicOverlay';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteProfileImage, updateProfileImage } from '../../store/userSlice';
import { openMessage } from '../../store/popupSlice';
import { API_URL } from '../../utils/constants';

import EmptyAvatarImage from '../../images/empty-avatar.png';
import styles from './ImagePick.module.scss';

interface IProps {
  className?: string;
}

const ImagePick: React.FC<IProps> = ({ className }: IProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const allowedTypeFile = ['image/png', 'image/jpeg', 'image/jpg'];

  const onLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && allowedTypeFile.includes(files[0].type)) {
      const file = files[0];
      const data = new FormData();
      data.append('file', file);
      setLoading(true);
      dispatch(updateProfileImage(data))
        .unwrap()
        .then(() => {
          dispatch(
            openMessage({
              text: 'Успешно изменено',
              isError: false,
            }),
          );
        })
        .catch((err) => {
          if (err.message) {
            dispatch(
              openMessage({
                text: 'Что-то пошло не так. Попробуйте еще раз.',
                isError: true,
              }),
            );
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const deleteImage = () => {
    setLoading(true);
    dispatch(deleteProfileImage())
      .unwrap()
      .then(() => {
        dispatch(
          openMessage({
            text: 'Успешно изменено',
            isError: false,
          }),
        );
      })
      .catch((err) => {
        if (err.message) {
          dispatch(
            openMessage({
              text: 'Что-то пошло не так. Попробуйте еще раз.',
              isError: true,
            }),
          );
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={cn(styles.pic, className)}>
      {loading ? (
        <div className={styles.loader} />
      ) : (
        <img
          className={styles.image}
          alt='Аватар пользователя'
          crossOrigin='use-credentials'
          src={`${API_URL}/user/profile-image`}
          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = event.target as HTMLImageElement;
            target.src = EmptyAvatarImage ?? '';
          }}
        />
      )}
      <PicOverlay className={styles.overlay} onLoadImage={onLoadImage} deleteImage={deleteImage} />
    </div>
  );
};

export { ImagePick };
