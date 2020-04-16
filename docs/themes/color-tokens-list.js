import React from 'react';
import * as PropTypes from 'prop-types';
import { withTheme } from '@livechat/design-system';
import { copyToClipboard } from '../helpers';
import { ColorToken } from './color-token';

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

export const ColorTokensList = withTheme((props) => {
  const theme = props.theme;

  return <div>
    {Object.keys(theme).map((token) => {
      const tokenColor = theme[token];

      return <ColorToken key={token} color={tokenColor} title={token} usage='Usage: TBD' feedbackText='Copied!' onClick={handleColorClick} />
    })}
  </div>;
})

ColorTokensList.propTypes = {
  themeName: PropTypes.string
};
