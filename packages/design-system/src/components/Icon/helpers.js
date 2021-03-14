import React from 'react';

export function generateIcon(icon, iconSize, iconColor) {
  return React.createElement(icon, {
    ...iconSize,
    fill: iconColor || 'inherit'
  });
}
