# @livechat/design-system-colors

> Colors package for apps using LiveChat Design System

## Getting started

To install `@livechat/design-system-colors` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install @livechat/design-system-colors --save
```

## Usage

There are three ways to use LiveChat design colors palette:
- use JavaScript implementation of colors
```
import Colors from '@livechat/design-system-colors'
```
- import `design-system-colos.css` file and style UI elements with classes
- import `scss/variables.scss` or `scss/styles.scss` if you are using `scss` in your project

### JavaScript

In your JavaScript files just import the library:

```js
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
