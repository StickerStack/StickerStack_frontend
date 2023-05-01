import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Cropper from 'react-easy-crop';

import { IPopupState } from '../../interfaces';
import { useAppDispatch } from '../../hooks/hooks';
import { setNewCrop, setIsOpen } from '../../store/popupSlice';
import { ButtonWithText, TitleForm } from '../UI';
import { getCompletedCrop } from '../../utils/imageCrop';

import styles from './ImageForm.module.scss';

const ImageForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const imageSrc = useSelector((state: { popup: IPopupState }) => state.popup.imageSrc);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  }, []);

  function handleSave() {
    getCompletedCrop(imageSrc, croppedArea);

    dispatch(setIsOpen(false));
  }

  return (
    <form className={styles.container}>
      <TitleForm>Выберите область</TitleForm>
      <div className={styles.image}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={255 / 263}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{
            containerClassName: styles.crop_container,
            mediaClassName: styles.media,
            cropAreaClassName: styles.crop_area,
          }}
        />
      </div>
      <input
        type='range'
        id='zoom'
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        onChange={(e) => {
          setZoom(Number(e.target.value));
        }}
        className={styles.zoom}
        aria-label='Масштаб'
      />
      <div className={styles.buttons}>
        <ButtonWithText type='button' className={styles.button} onClick={handleSave}>
          Сохранить
        </ButtonWithText>
        <ButtonWithText
          type='button'
          theme='transparent'
          className={styles.button}
          onClick={() => dispatch(setIsOpen(false))}
        >
          Отменить
        </ButtonWithText>
      </div>
    </form>
  );
};

export { ImageForm };
