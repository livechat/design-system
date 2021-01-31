## Color palette

```jsx noeditor
const items = [,
  {title: 'Any color', value: undefined, subtitle: "-", color1: Colors.gray900, color2: Colors.gray50, ignoreContrast: true},
  {title: 'gray900', value: Colors.gray900, subtitle: Colors.gray900, color1: Colors.gray900, color2: Colors.gray50, ignoreContrast: false},
  {title: 'gray800', value: Colors.gray800, subtitle: Colors.gray800, color1: Colors.gray800, color2: Colors.gray50, ignoreContrast: false},
  {title: 'gray700', value: Colors.gray700, subtitle: Colors.gray700, color1: Colors.gray700, color2: Colors.gray50, ignoreContrast: false},
  {title: 'gray600', value: Colors.gray600, subtitle: Colors.gray600, color1: Colors.gray600, color2: Colors.gray50, ignoreContrast: false},
  {title: 'gray500', value: Colors.gray500, subtitle: Colors.gray500, color1: Colors.gray500, color2: Colors.gray50, ignoreContrast: false},
  {title: 'white', value: "#fff", subtitle: "#fff", color1: "#fff", color2: Colors.gray900, ignoreContrast: false}
];

initialState = {
  selectedItemIndex: 1
};

const handleItemSelect = itemIndex => setState({ selectedItemIndex: itemIndex });

<div>
  <p>Check if the color meets WCAG 2.1 contrast criteria (minimal required is 4.5). Select font color:</p>
  <div style={{ display: 'flex', margin: '0 -10px 30px', flexWrap: 'wrap' }}>
    {items.map((item, i) => (
      <SingleColor
        inversed
        key={item.title}
        title={item.title}
        subtitle={item.subtitle}
        color1={item.color1}
        color2={item.color2}
        ignoreContrast={item.ignoreContrast || item.title === 'white'}
        selected={state.selectedItemIndex === i}
        onClick={() => handleItemSelect(i)}
      />
    ))}
  </div>

  <ColorPalette paletteName="gray" darkFontColor={items[state.selectedItemIndex].color1} ignoreContrast={items[state.selectedItemIndex].ignoreContrast} />
  <ColorPalette paletteName="blue" darkFontColor={items[state.selectedItemIndex].color1} ignoreContrast={items[state.selectedItemIndex].ignoreContrast} />
  <ColorPalette paletteName="green" darkFontColor={items[state.selectedItemIndex].color1} ignoreContrast={items[state.selectedItemIndex].ignoreContrast} />
  <ColorPalette paletteName="red" darkFontColor={items[state.selectedItemIndex].color1} ignoreContrast={items[state.selectedItemIndex].ignoreContrast} />
  <ColorPalette paletteName="orange" darkFontColor={items[state.selectedItemIndex].color1} ignoreContrast={items[state.selectedItemIndex].ignoreContrast} />
  <ColorPalette paletteName="yellow" darkFontColor={items[state.selectedItemIndex].color1} ignoreContrast={items[state.selectedItemIndex].ignoreContrast} />
  <ColorPalette paletteName="purple" darkFontColor={items[state.selectedItemIndex].color1} ignoreContrast={items[state.selectedItemIndex].ignoreContrast} />
</div>
```

## Developer instructions

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
