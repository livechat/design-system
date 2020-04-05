import * as React from 'react';
import * as PropTypes from 'prop-types';
import themes from '@livechat/design-system-themes';
import ThemeContext from './ThemeContext';
import { DEFAULT_THEME_NAME } from './constants';

function getThemeName(themeName) {
  if (!themeName || !themes[themeName]) {
    return DEFAULT_THEME_NAME;
  }

  return themeName;
}

export class ThemeProvider extends React.PureComponent {
  componentDidMount() {
    const themeName = getThemeName(this.props.themeName);

    document.querySelector('html').classList.add(`lc-theme--${themeName}`)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.themeName !== this.props.themeName) {
      const themeName = getThemeName(this.props.themeName);
      const previousThemeName = getThemeName(prevProps.themeName);

      const htmlElement = document.querySelector('html');

      htmlElement.classList.remove(`lc-theme--${previousThemeName}`);
      htmlElement.classList.add(`lc-theme--${themeName}`);
    }
  }

  render() {
    const themeName = getThemeName(this.props.themeName);

    return (
      <ThemeContext.Provider
        value={{
          theme: themes[themeName],
          themeName,
          onThemeChange: this.props.onThemeChange
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.defaultProps = {
  themes
}

ThemeProvider.propTypes = {
  themeName: PropTypes.string,
  onThemeChange: PropTypes.func,
  themes: PropTypes.object,
  children: PropTypes.node
};

export default ThemeProvider;
