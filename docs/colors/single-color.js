import React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.scss';
import { calculateContrast, copyToClipboard } from './helpers';

function handleElementClick(e) {
  const { color } = e.target.dataset;
  copyToClipboard(color);

  e.target.classList.add('lc-colors__clickable--copied');

  setTimeout(() => {
    const element = document.querySelector(
      `.lc-colors__clickable--copied[data-color="${color}"]`
    );

    if (element) {
      element.classList.remove('lc-colors__clickable--copied');
    }
  }, 1000);
}

const MIN_CONTRAST_RATIO = 4;

export function SingleColor(props) {
  const { hex, name, fontColors, main } = props;
  const firstFontColor = fontColors[0];
  const secondFontColor = fontColors[1] || firstFontColor;

  const contrast1 = calculateContrast(hex, firstFontColor);
  const contrast2 = calculateContrast(hex, secondFontColor);

  const contrastRatio = contrast1 > contrast2 ? contrast1 : contrast2;
  const fontColor = contrast1 > contrast2 ? firstFontColor : secondFontColor;

  if (contrastRatio < MIN_CONTRAST_RATIO) {
    return null;
  }

  return (
    <div className={styles.colors__container}>
      <h4 className={styles.colors__name}>{name}</h4>
      <p className={styles.colors__hex}>
        {String(main === 'box' ? hex : fontColor).toLowerCase()}
      </p>
      <p className={styles.colors__ratio}>{contrastRatio}</p>
      <div className={styles.colors__wrapper}>
        <div
          className={cx(styles.colors__box, {
            [styles.colors__clickable]: main === 'box'
          })}
          style={{ backgroundColor: hex }}
          data-color={hex}
          onClick={main === 'box' ? handleElementClick : null}
        />
        <div
          className={cx(styles.colors__dot, {
            [styles.colors__clickable]: main === 'dot'
          })}
          style={{ backgroundColor: fontColor }}
          data-color={fontColor}
          onClick={main === 'dot' ? handleElementClick : null}
        />
        <div className={styles.colors__feedback} />
      </div>
    </div>
  );
}

SingleColor.defaultProps = {
  main: 'box'
};

SingleColor.propTypes = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fontColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  main: PropTypes.oneOf(['box', 'dot'])
};
