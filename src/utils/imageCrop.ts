import { MutableRefObject } from 'react';

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
    return image;
  });

const canvasPreview = async (imageSrc: string, crop: any) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;
  if (ctx) {
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - crop.x,
      0 - safeArea / 2 + image.height * 0.5 - crop.y,
    );
  }

  return canvas;
};

const getCompletedCrop = async (image: string, crop: any) => {
  if (!image) {
    console.log(image);
    throw new Error('Crop canvas does not exist');
  }
  const canvas = await canvasPreview(image, crop);

  canvas.toBlob((blob) => {
    if (!blob) {
      console.error('Canvas is empty');
      return;
    }
    const previewUrl = window.URL.createObjectURL(blob);
    //Пока что скачивание, чтобы наглядно смотреть работу обрезки
    const anchor = document.createElement('a');
    anchor.download = 'image.png';
    anchor.href = URL.createObjectURL(blob);
    anchor.click();

    window.URL.revokeObjectURL(previewUrl);
  }, 'image/png');
};

export { canvasPreview, getCompletedCrop };
