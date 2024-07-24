import colorConverter from 'color-convert';

export const hexToRgb = (hexColor, returnType = 'string') => {
  let color = hexColor;
  if (typeof hexColor !== 'string') return;
  if (hexColor[0] === '#') color = hexColor.slice(1);
  if (returnType === 'string') return colorConverter.hex.rgb(color).join(' ');
  return colorConverter.hex.rgb(color);
};
