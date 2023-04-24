import { useState, useRef, useEffect } from 'react';
import { IPopupState } from '../../interfaces';
import ReactCrop, { Crop, centerCrop, makeAspectCrop, PixelCrop } from 'react-image-crop';

import { useSelector } from 'react-redux';
import cn from 'classnames';
import { ButtonWithText, TitleForm } from '../UI';
import { useAppDispatch } from '../../hooks/hooks';
import { setNewCrop, setIsOpen } from '../../store/popupSlice';

import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageForm.module.scss';

const ImageForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const imageSrc = useSelector((state: { popup: IPopupState }) => state.popup.imageSrc);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number>(1 / 1);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef('');

  function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          x: 25,
          y: 25,
          width: 100,
          height: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  async function canvasPreview(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop,
  ) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();
    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
    );

    ctx.restore();
  }

  useEffect(() => {
    completedCrop &&
      imgRef.current &&
      previewCanvasRef.current &&
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
  });

  async function completeCrop() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist');
    }
    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
    }, 'image/jpeg');
  }

  function handleSubmit() {
    dispatch(setNewCrop(blobUrlRef.current));
    dispatch(setIsOpen(false));
  }

  return (
    <form className={styles.overlay} onSubmit={handleSubmit}>
      <TitleForm>Выберите область</TitleForm>
      <ReactCrop
        crop={crop}
        onChange={(c) => {
          setCrop(c);
        }}
        onComplete={(c) => {
          setCompletedCrop(c);
          completeCrop();
        }}
        aspect={aspect}
        className={styles.crop}
        minWidth={255}
        minHeight={255}
      >
        <img
          className={styles.image}
          ref={imgRef}
          alt='Аватар'
          src={imageSrc}
          onLoad={onImageLoad}
        />
      </ReactCrop>
      <TitleForm>Превью</TitleForm>
      {!!completedCrop && (
        <>
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              borderRadius: '20px',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        </>
      )}
      <div className={cn(styles.buttons, imageSrc && styles.buttons_visible)}>
        <ButtonWithText type='button' onClick={handleSubmit}>
          Сохранить
        </ButtonWithText>
        <ButtonWithText
          type='button'
          theme='transparent'
          onClick={() => dispatch(setIsOpen(false))}
        >
          Отменить
        </ButtonWithText>
      </div>
    </form>
  );
};

export { ImageForm };
