### Icon

Icon wrapper component. It lets you choose size and color from exported interface <br />
<strong>Note</strong>: specyfing width or height in your svg file will be ignored

### Icon Sizes

One way to show the icon sizes
```js
  <>
    <p>Extra small icon (16x16)</p>
    <Icon icon={ChatsIcon} iconSize={IconSizeName.XSmall} />

    <p>Smal icon (20x20)</p>
    <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorLinkDefault} iconSize={IconSizeName.Small} />

    <p>Mediun icon (24x24)</p>
    <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorPrimaryDefault} iconSize={IconSizeName.Medium} />

    <p>Large icon (32x32)</p>
    <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorWarningDefault} iconSize={IconSizeName.Large} />
  
    <p>Extra large icon (48x48)</p>
    <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorSuccessDefault} iconSize={IconSizeName.XLarge} />
  </>
```

### Icon Sizes

And the other way to show icon sizes

Extra small icon (16x16)

```js
  <Icon icon={ChatsIcon} iconSize={IconSizeName.XSmall} />
```

Small icon (20x20)

```js
  <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorLinkDefault} iconSize={IconSizeName.Small} />
```

Medium icon (24x24)

```js
  <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorPrimaryDefault} iconSize={IconSizeName.Medium} />
```

Large icon (32x32)

```js
  <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorWarningDefault} iconSize={IconSizeName.Large} />
```

Extra large icon (48x48)

```js
  <Icon icon={ChatsIcon} iconColor={IconColorName.IconColorSuccessDefault} iconSize={IconSizeName.XLarge} />
```