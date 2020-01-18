import * as React from 'react';
import ThemeContext from './ThemeContext';

const withTheme = Component =>
  function ComponentWithTheme(props) {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <Component
            {...props}
            theme={theme}
          />
        )}
      </ThemeContext.Consumer>
    );
  };

export default withTheme;
