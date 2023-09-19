class Converter {
  pxToCm(value: number): number {
    return value / 38;
  }

  pxToOptimalCm(value: number): number {
    return (value / 300) * 2.54;
  }

  pxToOptimalPx(value: number): number {
    return value / 3.11;
  }

  pxToMm(value: number): number {
    return value / 3.8;
  }

  cmToPx(value: number): number {
    return value * 38;
  }

  mmToPx(value: number): number {
    return value * 3.8;
  }
  colorRgbToCmyk(r: number, g: number, b: number) {
    const rs = r / 255;
    const gs = g / 255;
    const bs = b / 255;
    const k = 1 - Math.max(rs, gs, bs);

    if(rs === 0 && gs === 0 && bs === 0) {
      return {
        c: 0,
        m: 0,
        y: 0,
        k: 1,
      };
    }

    const c = (1 - rs - k)/Math.round(1 - k);
    const m = (1 - gs - k)/Math.round(1 - k);
    const y = (1 - bs - k)/Math.round(1 - k);

    return {
      c: c,
      m: m,
      y: y,
      k: k,
    };
  }
  imageRgbToCmyk(imgSrc: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const image = new Image();

      image.src = imgSrc; // Замените на путь к вашему RGB-изображению

      return new Promise((resolve, reject) => {
        image.onload = function () {
          // Установите размер холста в соответствии с размерами изображения
          canvas.width = image.width;
          canvas.height = image.height;

          // Нарисуйте изображение на холсте
          ctx.drawImage(image, 0, 0);

          // Получите данные изображения
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Конвертируйте пиксели RGB в CMYK
          for (let i = 0; i < data.length; i += 4) {
            const b = data[i];
            const g = data[i + 1];
            const r = data[i + 2];
            const converter = new Converter();
            // Конвертируйте RGB в CMYK
            const { c, m, y, k } = converter.colorRgbToCmyk(r, g, b);

            // Установите значения CMYK
            data[i] = c;
            data[i + 1] = m;
            data[i + 2] = y;
            data[i + 3] = k;
            // Сохраните значение альфа-канала без изменений
          }
          console.log(imageData)
          // Обновите холст с данными CMYK-изображения
          ctx.putImageData(imageData, 0, 0);

          // Экспортируйте холст в виде нового изображения
          const cmykImage = canvas.toDataURL('image/jpeg');

          // Используйте CMYK-изображение по необходимости
          resolve(cmykImage);
        };

        image.onerror = function () {
          reject(new Error('Failed to load the image.'));
        };
      });
    }

    return Promise.reject(new Error('Canvas context is not available.'));
  }
}

export const converter = new Converter();
