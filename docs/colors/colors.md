To install `@livechat/design-system-colors` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install @livechat/design-system-colors --save
```


There are three ways to use LiveChat design colors palette:
- use JavaScript implementation of colors
```js static
import colors from '@livechat/design-system-colors'
```
- import `design-system-colos.css` file and style UI elements with classes
- import `css/variables.css` (css classes) or `css/styles.css` (css vars) to style UI elements
- import `scss/variables.scss` or `scss/styles.scss` if you are using `scss` in your project

### JavaScript

In your JavaScript files just import the library:

```js static
import colors from '@livechat/design-system-colors'
// or just selected colors
import { blue900 } from '@livechat/design-system-colors'
```

The library also provides JSON file with colors definitions
```js static
import colors from '@livechat/design-system-colors/dist/design-system-colors.json'
```

### Scss

You can import the variables file directly in your scss:

```scss
@import '~@livechat/design-system-colors/dist/scss/variables';
```

These color variables follow the naming convention: `$lcds-<color><tone>`.
For example:

```scss
$lcds-blue-900;
```

There is also a file named `styles.scss`. This is a group of classes following the naming convention: `.lcds-text-<color>-<tone>` and `.lcds-bg-<color>-<tone>`. You can use those classes directly in your html/js files. Importing it is possible in several ways, ie. you can import it in your scss file (as above) or JavaScript file (e.g. styling React app with css-modules and scss).

### Css

Almost idendital to Scss files you can import css variables directyly in your css file:

```scss
@import '~@livechat/design-system-colors/dist/css/variables';
```

These color variables follow the naming convention: `--lcds-<color>-<tone>`.
For example:

```css
color: var(--lcds-blue-900);
```

There is also a file named `styles.css`. This is a group of classes following the naming convention: `.lcds-text-<color>-<tone>` and `.lcds-bg-<color>-<tone>`.

```jsx noeditor
const items = [
  {key: Colors.gray900, props: {name: 'gray900', value: Colors.gray900}},
  {key: Colors.gray800, props: {name: 'gray800', value: Colors.gray800}},
  {key: Colors.gray600, props: {name: 'gray600', value: Colors.gray600}}
];

initialState = {
  selectedFontColor: Colors.gray900
};

const handleItemSelect = item => setState({selectedFontColor: item});

<div>
  <h3>Select text color to use in colors palette:</h3>
  <div style={{ display: 'flex', margin: '0 -10px', flexWrap: 'wrap' }}>
    <SingleColor
      inversed
      title="gray900"
      subtitle={Colors.gray900}
      color1={Colors.gray900}
      color2={Colors.gray50}
      selected={state.selectedFontColor === Colors.gray900}
      onClick={() => handleItemSelect(Colors.gray900)}
    />
    <SingleColor
      inversed
      title="gray800"
      subtitle={Colors.gray800}
      color1={Colors.gray800}
      color2={Colors.gray50}
      selected={state.selectedFontColor === Colors.gray800}
      onClick={() => handleItemSelect(Colors.gray800)}
    />
    <SingleColor
      inversed
      title="gray600"
      subtitle={Colors.gray600}
      color1={Colors.gray600}
      color2={Colors.gray50}
      selected={state.selectedFontColor === Colors.gray600}
      onClick={() => handleItemSelect(Colors.gray600)}
    />
  </div>

  <ColorPalette paletteName="blue" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="orange" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="yellow" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="green" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="red" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="ruby" darkFontColor={state.selectedFontColor} />
  <ColorPalette paletteName="gray" darkFontColor={state.selectedFontColor} />
</div>
```