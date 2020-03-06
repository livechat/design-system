import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ThemeProvider } from '@livechat/design-system';

export default class ThemeWrapper extends React.Component {
  render() {
    return (
      <ThemeProvider themeName="light">{this.props.children}</ThemeProvider>
    );
  }
}

ThemeWrapper.propTypes = {
  children: PropTypes.node
};
