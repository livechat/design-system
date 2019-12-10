import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import { calculateContrast, copyToClipboard } from './helpers';

function handleElementClick(e) {
  const { color } = e.target.dataset;
  copyToClipboard(color);

  e.target.classList.add('lc-colors__box--copied');

  setTimeout(() => {
    const element = document.querySelector(
      `.lc-colors__box--copied[data-color="${color}"]`
    );

    if (element) {
      element.classList.remove('lc-colors__box--copied');
    }
  }, 1000);
}

const MIN_CONTRAST_RATIO = 4;

export function SingleColor(props) {
  const { hex, name, fontColors } = props;

  const contrast1 = calculateContrast(hex, fontColors[0]);
  const contrast2 = calculateContrast(hex, fontColors[1]);

  const contrastRatio = contrast1 >= contrast2 ? contrast1 : contrast2;
  const fontColor = contrast1 >= contrast2 ? fontColors[0] : fontColors[1];

  if (contrastRatio < MIN_CONTRAST_RATIO) {
    return null;
  }

  return (
    <div className={styles.colors__container}>
      <h4 className={styles.colors__name}>{name}</h4>
      <p className={styles.colors__hex}>{hex}</p>
      <p className={styles.colors__ratio}>{contrastRatio}</p>
      <div className={styles.colors__wrapper}>
        <div
          className={styles.colors__box}
          style={{ backgroundColor: hex }}
          data-color={hex}
          onClick={handleElementClick}
        />
        <div
          className={styles.colors__dot}
          style={{ backgroundColor: fontColor }}
        />
      </div>
    </div>
  );
}

SingleColor.propTypes = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fontColors: PropTypes.arrayOf(PropTypes.string).isRequired
};
