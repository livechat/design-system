## Themes

```js noeditor
<Banner size="large" type="warning">Please note that those themes are not used yet in the components our design system. It will be added gradually to components.</Banner>
```

```jsx noeditor
const items = [
  {key: "legacy", props: { title: 'Legacy', value: "legacy" }},
  {key: "light", props: { title: 'Light', value: "light" }}
];

const handleItemSelect = itemKey => setState({ selectedItemKey: itemKey });

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.title}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.title}</div>;
};

initialState = {
  selectedItemKey: "legacy"
};

<div>
  <p>Select theme:</p>
  <div style={{ margin: '0 0 30px', width: '340px' }}>
    <Select
      id='theme-picker'
      items={items}
      searchProperty='title'
      onItemSelect={handleItemSelect}
      getItemBody={getItemBody}
      search
      required
      placeholder='Select second color'
      getSelectedItemBody={getSelectedItemBody}
      selected={state.selectedItemKey}
      searchPlaceholder='Search...'
    />
  </div>

  <ThemeTokens themeName={state.selectedItemKey} />
</div>
```

## Developer instructions

To install `@livechat/design-system-themes` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install @livechat/design-system-themes --save
```


There are two ways to use LiveChat themes:
- use JavaScript implementation of colors
```js static
import themes from '@livechat/design-system-themes'
```
- import `scss/mixins.scss`, `scss/tokens.scss` or `scss/themes.scss` if you are using `scss` in your project

### JavaScript

In your JavaScript files just import the library:

```js static
import themes from '@livechat/design-system-themes'
// or just selected colors
import { light } from '@livechat/design-system-themes'
```

### Scss

You can import the mixins and variables directly in your scss:

```scss
@import '~@livechat/design-system-colors/dist/scss/index';
```

By default, the legacy theme will be initialized. If you would like to include another theme, you can do so by calling our mixin. For example:
For example:

```scss
@import '~@livechat/design-system-colors/dist/scss/mixins';

// Use the light theme
@include lcds-theme($lcds-theme--light);
```
or you can set the theme globally:
```scss
$lcds-theme: $lcds-theme--light;
```
Inline theming could be done with mixins:
```scss
@import '~@livechat/design-system-colors/dist/scss/mixins';
.light-theme-class-name {
  @include lcds-theme($lcds-theme--light) {
    // use light theme here
  }
}

.legacy-theme-class-name {
  @include lcds-theme() {
    // use legacy theme here
  }
}
```