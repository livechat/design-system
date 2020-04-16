import React, { Component } from 'react';
import { ThemeProvider } from '@livechat/design-system'
import ReactExample from 'react-styleguidist/lib/rsg-components/ReactExample/ReactExample';

export default class CustomReactExample extends Component {
  state = {
    themeName: 'legacy'
  }

  componentDidMount() {
    this.element = document.querySelector('html');
    this.interval = setInterval(() => {
      this.checkHtmlElementClassList();
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      this.interval.clear();
    }
  }

  checkHtmlElementClassList() {
    if (this.element) {
      if (this.state.themeName !== 'legacy' && this.element.classList.contains("lc-theme--legacy")) {
        return this.setState({
          themeName: 'legacy'
        })
      }

      if (this.state.themeName !== 'light' && this.element.classList.contains("lc-theme--light")) {
        return this.setState({
          themeName: 'light'
        })
      }
    }
  }

	render() {
    return (
      <ThemeProvider themeName={this.state.themeName}>
        <ReactExample {...this.props} />
      </ThemeProvider>
    )
	}
}