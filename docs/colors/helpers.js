function hexToRGBArray(htmlHexColor) {
  let hexColor = htmlHexColor.replace('#', '');

  if (hexColor.length === 3) {
    const [r, g, b] = hexColor;
    hexColor = `${r}${r}${g}${g}${b}${b}`;
  } else if (hexColor.length !== 6) {
    throw new Error(`Invalid hex color: ${hexColor}`);
  }

  const rgb = [];
  for (let i = 0; i <= 2; i += 1) {
    rgb[i] = parseInt(hexColor.substr(i * 2, 2), 16);
  }

  return rgb;
}

function getLuminanace(r, g, b) {
  const a = [r, g, b].map(value => {
    const divided = value / 255;
    return divided <= 0.03928
      ? divided / 12.92
      : ((divided + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function calculateContrast(fontColor, backgroundColor) {
  const fontColorRGB = hexToRGBArray(fontColor);
  const backgroundColorRGB = hexToRGBArray(backgroundColor);

  const fontColorLuminanace =
    getLuminanace(fontColorRGB[0], fontColorRGB[1], fontColorRGB[2]) + 0.05;
  const backgroundColorLuminanace =
    getLuminanace(
      backgroundColorRGB[0],
      backgroundColorRGB[1],
      backgroundColorRGB[2]
    ) + 0.05;

  const contrast = fontColorLuminanace / backgroundColorLuminanace;

  return parseFloat((contrast > 1 ? contrast : 1 / contrast).toFixed(2));
}

export function copyToClipboard(value) {
  // Create new element
  const el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = value;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);
}
