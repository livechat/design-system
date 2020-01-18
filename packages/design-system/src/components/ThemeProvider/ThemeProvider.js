import * as React from 'react';
import * as PropTypes from 'prop-types';
import themes from '../../../../themes/src';
import ThemeContext from './ThemeContext';
import { DEFAULT_THEME_NAME } from './constants';

function getThemeName(themeName) {
  if (!themeName || !themes[themeName]) {
    return DEFAULT_THEME_NAME;
  }
  
  return themeName;
} 

function ThemeProvider(props) {
  const themeName = getThemeName(props.themeName)

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeName]
      }}
    >
      {this.props.children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  themeName: PropTypes.string
};

export default ThemeProvider;
