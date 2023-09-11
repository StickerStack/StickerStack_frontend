import { FC } from 'react';

import styles from './NewSticker.module.scss';
import { ISticker } from '../../interfaces/ISticker-new';
import { DragAndDrop } from '../DragAndDrop-new/DragAndDrop';
import { FieldValues, useForm } from 'react-hook-form';

interface IProps {
  sticker: ISticker
}

export const NewSticker: FC<IProps> = ({ sticker }) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      shape: sticker.shape,
      amount: sticker.amount,
      size:
      sticker.width === sticker.optimal_width && sticker.optimal_height === sticker.optimal_height
          ? 'optimal'
          : 'custom',
      width: sticker.optimal_width,
      height: sticker.optimal_height,
    },
  });

  return (
    <article className={styles.card}>
      <form className={styles.info}>
        <div className={styles.image}>
          <DragAndDrop sticker={sticker} />
        </div>
        <fieldset></fieldset>
      </form>
    </article>
  );
};
