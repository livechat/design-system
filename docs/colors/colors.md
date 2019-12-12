To install `@livechat/design-system-colors` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install @livechat/design-system-colors --save
```


There are three ways to use LiveChat design colors palette:
- use JavaScript implementation of colors
```js static
import Colors from '@livechat/design-system-colors'
```
- import `design-system-colos.css` file and style UI elements with classes
- import `scss/variables.scss` or `scss/styles.scss` if you are using `scss` in your project

### JavaScript

In your JavaScript files just import the library:

```js static
import Colors from '@livechat/design-system-colors'
// or just selected colors
import { Blue900 } from '@livechat/design-system-colors'
```

### Scss

You can import the variables file directly in your scss:

```scss
@import '~@livechat/design-system-colors/dist/scss/variables';
```

These color variables follow the naming convention: `$lcds-<swatch>-<grade>`.
For example:

```scss
$lcds-blue-900;
```

There is also a file named `styles.scss`. This is a group of classes following the naming convention: `.lcds-text-<swatch>-<grade>` and `.lcds-bg-<swatch>-<grade>`. You can use those classes directly in your html/js files. Importing it is possible in several ways, ie. you can import it in your scss file (as above) or JavaScript file (e.g. styling React app with css-modules and scss).

```jsx noeditor
const items = [
  {key: Colors.Gray900, props: {name: 'Gray900', value: Colors.Gray900}},
  {key: Colors.Gray700, props: {name: 'Gray700', value: Colors.Gray700}},
  {key: Colors.Gray600, props: {name: 'Gray600', value: Colors.Gray600}}
];

initialState = {
  selectedFontColor: Colors.Gray900
};

const handleItemSelect = item => setState({selectedFontColor: item});

<div>
  <h3>Select text color to use in colors palette:</h3>
  <div style={{ display: 'flex', margin: '0 -10px', flexWrap: 'wrap' }}>
    <SingleColor
      inversed
      title="Gray900"
      subtitle={Colors.Gray900}
      color1={Colors.Gray900}
      color2="#f8f8f8"
      selected={state.selectedFontColor === Colors.Gray900}
      onClick={() => handleItemSelect(Colors.Gray900)}
    />
    <SingleColor
      inversed
      title="Gray700"
      subtitle={Colors.Gray700}
      color1={Colors.Gray700}
      color2="#f8f8f8"
      selected={state.selectedFontColor === Colors.Gray700}
      onClick={() => handleItemSelect(Colors.Gray700)}
    />
    <SingleColor
      inversed
      title="Gray600"
      subtitle={Colors.Gray600}
      color1={Colors.Gray600}
      color2="#f8f8f8"
      selected={state.selectedFontColor === Colors.Gray600}
      onClick={() => handleItemSelect(Colors.Gray600)}
    />
  </div>

  <ColorPalette paletteName="Blue" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="Orange" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="Yellow" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="Green" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="Red" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="Ruby" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="Gray" darkFontColor={state.selectedFontColor} />
</div>
```