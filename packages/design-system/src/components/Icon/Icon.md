### Icon

Icon wrapper component. It lets you choose size and color from exported interface <br />
<strong>Note:</strong> Specyfing width or height in your svg file will be ignored

### Extra small icon (12x12)
These icons are often used inside of other components (like switch) or in places where space is limited and interaction with an icons is optional action (like info icons).<br />
<i><strong>Note:</strong> When using this size consider changing the style of icon to filled instead of outline.</i>

```js
  <Icon source={ChatsIcon} size={IconSizeName.XSmall} />
```

### Small icon (16x16)
Small icons are best used when space is limited. Don’t use this size of icon for actions.<br />
<i><strong>Note:</strong> Recommended to be paired with smaller typography for example Caption.</i>

```js
  <Icon source={ChatsIcon} iconType={IconTypeName.Link} size={IconSizeName.Small} />
```

### Medium icon (20x20)
Medium icons are used in the majority of our interface.<br />
<i><strong>Note:</strong> These are our standard size. Recommended for pairing icon with typography.</i>

```js
  <Icon source={ChatsIcon} />
```

### Large icon (24x24)
Large icons are used to navigate between different sections in the sidebar.<br />
<i><strong>Note:</strong> Recommended for standalone icons.</i>

```js
  <Icon source={ChatsIcon} iconType={IconTypeName.Warning} size={IconSizeName.Large} />
```

### Extra large icon (32x32)
Extra large icons are used sparingly to emphasize a concept or when space is plentiful.


```js
  <Icon source={ChatsIcon} iconType={IconTypeName.Success} size={IconSizeName.XLarge} />
```