import React from 'react';

export function generateIconFromRequire(icon) {
  return React.createElement(icon, {
    width: 24,
    height: 24,
    fill: 'green'
  });
}

export function generateIcon(icon) {
  return React.cloneElement(icon, {
    width: 24,
    height: 24,
    fill: 'red'
  });
}
