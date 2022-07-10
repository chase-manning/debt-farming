export const stringToNumber = (string: string, decimals: number): number => {
  const whole = string.substring(0, string.length - decimals);
  const fraction = string.substring(string.length - decimals);
  return Number(`${whole}.${fraction}`);
};
