class Converter {
  pxToCm(value: number): number {
    return value / 38;
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
