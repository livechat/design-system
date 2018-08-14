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

Usage:

```js static
<Normalize/>
```