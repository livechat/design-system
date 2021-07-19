## Color palette

```js noeditor
<Banner size="large" type="warning">
  Please note that those colors are not used yet in the components our design
  system. Colors support will be added gradually as we add themes to the
  library.
</Banner>
```

```jsx noeditor
const items = [
  {
    key: "0",
    props: { title: "Any color", value: Colors.gray900, ignoreContrast: true }
  }
];

Object.keys(Colors).forEach((key, i) => {
  items.push({ key: String(i + 1), props: { title: key, value: Colors[key] } });
});

const [selectedColorKey, setSelectedColorKey] = React.useState("0");

const handleItemSelect = itemKey => setSelectedColorKey(itemKey);

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.title}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.title}</div>;
};

const selectedColor = items[selectedColorKey];
const palettes = [
  "gray",
  "blue",
  "green",
  "red",
  "orange",
  "yellow",
  "purple",
  "white"
];

<div>
  <p>
    Check if the color meets WCAG 2.1 contrast criteria (minimal required is
    4.5:1). Select second color (ie. font color):
  </p>
  <div style={{ margin: "0 0 30px", width: "340px" }}>
    <Select
      id="second-color-picker"
      items={items}
      searchProperty="title"
      onItemSelect={handleItemSelect}
      getItemBody={getItemBody}
      search
      required
      placeholder="Select second color"
      getSelectedItemBody={getSelectedItemBody}
      selected={selectedColorKey}
      searchPlaceholder="Search..."
    />
  </div>

  {palettes.map(palette => (
    <ColorPalette
      key={palette}
      paletteName={palette}
      fontColor={selectedColor.props.value}
      ignoreContrast={selectedColor.props.ignoreContrast}
    />
  ))}
</div>;
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
import colors from "@livechat/design-system-colors";
```

- import `design-system-colos.css` file and style UI elements with classes
- import `css/variables.css` (css classes) or `css/styles.css` (css vars) to style UI elements
- import `scss/variables.scss` or `scss/styles.scss` if you are using `scss` in your project

### JavaScript

In your JavaScript files just import the library:

```js static
import colors from "@livechat/design-system-colors";
// or just selected colors
import { blue900 } from "@livechat/design-system-colors";
```

The library also provides JSON file with colors definitions

```js static
import colors from "@livechat/design-system-colors/dist/design-system-colors.json";
```

### Scss

You can import the variables file directly in your scss:

```scss
@import "~@livechat/design-system-colors/dist/scss/variables";
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
@import "~@livechat/design-system-colors/dist/css/variables";
```

These color variables follow the naming convention: `--lcds-<color>-<tone>`.
For example:

```css
color: var(--lcds-blue-900);
```

There is also a file named `styles.css`. This is a group of classes following the naming convention: `.lcds-text-<color>-<tone>` and `.lcds-bg-<color>-<tone>`.
