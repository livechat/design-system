import React from 'react';

class Normalize extends React.Component {
  componentDidMount() {
    const parent = document.getElementsByTagName('style')[0];
    const style = document.createElement('style');
    const css = `
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*, *::before, *::after {
  box-sizing: inherit;
}
body {
  margin: 0;
  padding: 0;
}
@media print {
  body {
    background-color: #fff;
  }
}`;
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.insertBefore(style, parent);
  }

  render() {
    return null;
  }
}

export default Normalize;
