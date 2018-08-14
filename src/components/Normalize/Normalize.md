LiveChat Design System provides a `Normalize` component to create an elegant, consistent, and simple base to build your app upon.

This component appends `<style>` tag to the `<head>` tag. It includes the following CSS code:

```css
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
}
```

Example usage:

```js static
import React from 'react';
import { Normalize } from '@livechat/design-system';

class App extends React.Component {
    render(){
        return (
            <React.Fragment>
                <Normalize />
                {/* The rest of your application */}
            </React.Fragment>
        );
    }
}

export default App;
```