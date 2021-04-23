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

const COLOR_TONES = [950, 900, 800, 700, 600, 500, 400, 300, 200, 150, 100, 75, 50, 25];

export function ColorPalette(props) {
  const { paletteName, fontColor, ignoreContrast } = props;

  if (paletteName === "white") {
    const colorName = "white";
    const colorValue = Colors[colorName]
    return (
      <div>
        <h3>{paletteName.toUpperCase()}</h3>
        <div className={styles.colors__palette}>
          <SingleColor
            key={colorValue}
            title={colorName}
            subtitle={colorValue}
            ignoreContrast={ignoreContrast}
            color1={colorValue}
            color2={fontColor}
            onClick={handleColorClick}
            feedbackText="COPIED!"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>{paletteName.toUpperCase()}</h3>
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
                ignoreContrast={ignoreContrast}
                color1={colorValue}
                color2={fontColor}
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
  fontColor: PropTypes.string.isRequired,
  ignoreContrast: PropTypes.bool
};
