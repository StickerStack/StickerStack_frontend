import { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { useAppDispatch } from '@shared/hooks/hooks';
import { openMessage, deleteProfileImage, updateProfileImage } from '@shared/store';
import { IUserState } from '@shared/interfaces';
import { messages } from '@static/popups';
import { Loader } from '@components/UI';

import EmptyAvatarImage from '@images/empty-avatar.svg';
import styles from './ImagePick.module.scss';

interface IProps {
  className?: string;
}

const ImagePick: React.FC<IProps> = ({ className }: IProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: { user: IUserState }) => state.user);

  const allowedTypeFile = ['image/png', 'image/jpeg', 'image/jpg'];

  const onLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && allowedTypeFile.includes(files[0].type)) {
      const file = files[0];
      const data = new FormData();
      data.append('file', file);
      setLoading(true);
      dispatch(deleteProfileImage());
      dispatch(updateProfileImage(data))
        .unwrap()
        .then(() => {
          dispatch(
            openMessage({
              text: `${messages.success}`,
              isError: false,
            }),
          );
        })
        .catch((err) => {
          if (err.message) {
            dispatch(
              openMessage({
                text: `${messages.somethingWrong}`,
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
            text: `${messages.success}`,
            isError: false,
          }),
        );
      })
      .catch((err) => {
        if (err.message) {
          dispatch(
            openMessage({
              text: `${messages.somethingWrong}`,
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
        <Loader loading={loading} />
      ) : (
        <img
          className={styles.image}
          alt='Аватар пользователя'
          crossOrigin='use-credentials'
          src={user.avatar}
          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = event.target as HTMLImageElement;
            target.src = EmptyAvatarImage ?? '';
          }}
        />
      )}
      {/* <PicOverlay className={styles.overlay} onLoadImage={onLoadImage} deleteImage={deleteImage} /> */}
    </div>
  );
};

export { ImagePick };
