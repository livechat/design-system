import * as React from 'react';
import ThemeContext from './ThemeContext';

const withTheme = Component => {
  const name = Component.displayName || Component.name || 'Component';

  function ComponentWithTheme(props) {
    return (
      <ThemeContext.Consumer>
        {({ theme, themeName }) => (
          <Component theme={theme} themeName={themeName} {...props} />
        )}
      </ThemeContext.Consumer>
    );
  }

  ComponentWithTheme.displayName = `WithTheme(${name})`;

  return ComponentWithTheme;
};

export default withTheme;
