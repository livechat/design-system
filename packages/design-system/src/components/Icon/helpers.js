import React from 'react';

export function generateIconFromRequire(icon, iconSize, iconColor) {
  return React.createElement(icon, {
    ...iconSize,
    fill: iconColor || 'inherit'
  });
}

export function generateIcon(icon, iconSize, iconColor) {
  return React.cloneElement(icon, {
    ...iconSize,
    fill: iconColor || 'inherit'
  });
}
