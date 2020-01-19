import * as React from 'react';
import ThemeContext from './ThemeContext';

const withTheme = Component =>
  function ComponentWithTheme(props) {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <Component
            theme={theme}
            themeName={themeName}
            {...props}
          />
        )}
      </ThemeContext.Consumer>
    );
  };

export default withTheme;
