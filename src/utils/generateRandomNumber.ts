export const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 1000 * new Date().getTime());
};