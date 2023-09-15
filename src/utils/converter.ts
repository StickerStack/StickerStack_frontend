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
}

export const converter = new Converter();
