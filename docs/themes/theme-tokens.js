import React from 'react';
import * as PropTypes from 'prop-types';
import themes, { tokens } from '@livechat/design-system-themes'; // eslint-disable-line import/no-unresolved
import styles from './style.scss';
import { copyToClipboard } from './helpers';
import { SingleColor } from '../colors/single-color';

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

export function ThemeTokens(props) {
  const { themeName } = props;

  return (
    <div className={styles.colors__palette}>
      {tokens.colors.map(token => {
        const tokenValue = themes[themeName][token];

        if (tokenValue) {
          return (
            <div className={styles.token__tile} key={token}>
              <SingleColor
                noContrast
                noDot
                title={token}
                subtitle={tokenValue}
                ignoreContrast
                color1={tokenValue}
                color2="#ffffff"
                onClick={handleColorClick}
                feedbackText="COPIED!"
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

ThemeTokens.propTypes = {
  themeName: PropTypes.string.isRequired
};
