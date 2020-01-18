import * as React from 'react';
import * as PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';

function ThemeConsumer(props) {
  return (
    <ThemeContext.Consumer>
      {props.children}
    </ThemeContext.Consumer>
  );
}

ThemeConsumer.propTypes = {
  children: PropTypes.func
};

export default ThemeConsumer;
