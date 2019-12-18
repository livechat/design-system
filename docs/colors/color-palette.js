import React from 'react';
import * as PropTypes from 'prop-types';
import Colors from '@livechat/design-system-colors'; // eslint-disable-line import/no-unresolved
import styles from './style.scss';
import { copyToClipboard } from './helpers';
import { SingleColor } from './single-color';

function handleColorClick(e) {
  const { color } = e.currentTarget.dataset;
  const wasCopied = copyToClipboard(color);

  if (!wasCopied) {
    return;
  }

  e.currentTarget.classList.add('lc-colors__box--with-feedback');

  setTimeout(() => {
    const element = document.querySelector(
      `.lc-colors__box--with-feedback[data-color="${color}"]`
    );

    if (element) {
      element.classList.remove('lc-colors__box--with-feedback');
    }
  }, 1000);
}

const COLOR_TONES = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 40, 30];

export function ColorPalette(props) {
  const { paletteName, darkFontColor } = props;

  return (
    <div>
      <h2>{paletteName.toUpperCase()}</h2>
      <div className={styles.colors__palette}>
        {COLOR_TONES.map(tone => {
          const colorName = `${paletteName}${tone}`;
          const colorValue = Colors[colorName];
          if (colorValue) {
            return (
              <SingleColor
                key={colorValue}
                title={colorName}
                subtitle={colorValue}
                color1={colorValue}
                color2={darkFontColor}
                onClick={handleColorClick}
                feedbackText="COPIED!"
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

ColorPalette.propTypes = {
  paletteName: PropTypes.string.isRequired,
  darkFontColor: PropTypes.string.isRequired
};
