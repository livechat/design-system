export const getDesignTokenWithOpacity = (
  token: string,
  opacityInPercent: string
): string => {
  return `color-mix(in srgb, var(${token}) ${opacityInPercent}, transparent)`;
};
