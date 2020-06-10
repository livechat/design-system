### Primary Button

Use when there is an action that is more important than any other actions and you need to draw attention to it. Don’t use more than one primary button per screen to avoid confusing users. Not every screen needs a primary button.

```js
<Button kind="primary">Primary Button</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button kind="primary">Primary Button</Button>
</ComponentHtmlMarkup>
```

### Basic Button

The standard button for most use cases. Can be used for primary actions when the Primary button style is "too much" (e.g. "Edit" vs "Save").

```js
<Button>Basic Button</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button>Basic Button</Button>
</ComponentHtmlMarkup>
```

### Secondary Button

Secondary buttons provide a lighter weight button style. They can be used in isolation, for less prominent actions, or paired with a Primary button, e.g for the ‘Cancel’ action.

```js
<Button kind="secondary">Secondary Button</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button kind="secondary">Secondary Button</Button>
</ComponentHtmlMarkup>
```

### Destructive Button

Use as a final confirmation for a destructive action such as deleting. These are found mostly in confirmation modals.

```js
<Button kind="destructive">Destructive Button</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button kind="destructive">Destructive Button</Button>
</ComponentHtmlMarkup>
```

### Text Button

Used for less important or less commonly used actions. Can have an icon on the left or right. The icon takes the font line height and color.

```js
<Button kind="text">Text Button</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button kind="text">Text Button</Button>
</ComponentHtmlMarkup>
```

### Button Sizes

#### Compact

Use in a table or list where space is tight.

```js
<Button size="compact" kind="primary">
  Compact Button
</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button size="compact" kind="primary">
    Compact Button
  </Button>
</ComponentHtmlMarkup>
```

#### Regular

```js
<Button kind="primary">Regular Button</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button kind="primary">Regular Button</Button>
</ComponentHtmlMarkup>
```

#### Large

Use for the main call to action in empty states or for calls to action shown with large illustrations.

```js
<Button size="large" kind="primary">
  Large Button
</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button size="large" kind="primary">
    Large Button
  </Button>
</ComponentHtmlMarkup>
```

#### Full-width

Button expanded to the full width to fill the parent container (max-width: 320px)

```js
<Button fullWidth kind="primary">
  Full-width Button
</Button>
```

```js noeditor
<ComponentHtmlMarkup>
  <Button fullWidth kind="primary">
    Full-width Button
  </Button>
</ComponentHtmlMarkup>
```

### Button with icon

```js
<div style={{ width: 260, display: 'flex', flexFlow: 'row no-wrap', justifyContent: 'space-between'}}>
  <Button icon={<AlertCircleIcon />} kind="primary" iconPosition="left">
    Icon left
  </Button>
  <Button icon={<AlertCircleIcon />} kind="destructive" iconPosition="right">
    Icon right
  </Button>
</div>
```

```js noeditor
<ComponentHtmlMarkup>
  <div>
    <Button icon={<AlertCircleIcon />} kind="primary" iconPosition="left">
      Icon left
    </Button>
    <Button icon={<AlertCircleIcon />} kind="destructive" iconPosition="right">
      Icon right
    </Button>
  </div>
</ComponentHtmlMarkup>
```

### Loading

```js
  initialState = { loading: true };

  toggleLoading = () => {
    setState({
      loading: !state.loading
    });
  }

  <div>
    <div style={{marginBottom: '10px'}}>
      <Button kind="primary" onClick={toggleLoading}>Turn {state.loading ? 'off' : 'on'} loading</Button>
    </div>
    <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between'}}>
      <Button loading={state.loading}>Loading Button</Button>
      <Button loading={state.loading} kind="secondary">Loading Button</Button>
      <Button loading={state.loading} kind="destructive">Loading Button</Button>
      <Button loading={state.loading} kind="primary">Loading Button</Button>
      <Button loading={state.loading} loaderLabel="Processing">Loading Button</Button>
      <Button loading={state.loading} kind="text" loaderLabel="Loading">Another Text Button</Button>
    </div>
  </div>
```

```js noeditor
<ComponentHtmlMarkup>
  <div>
    <Button loading>Loading Button</Button>
    <Button loading kind="secondary">
      Loading Button
    </Button>
    <Button loading kind="destructive">
      Loading Button
    </Button>
    <Button loading kind="primary">
      Loading Button
    </Button>
    <Button loading loaderLabel="Processing">
      Loading Button
    </Button>
    <Button loading kind="text" loaderLabel="Processing">
      Loading Button
    </Button>
  </div>
</ComponentHtmlMarkup>
```

### Best practices

- Prioritize most important action; don’t use more than 1 primary button per screen.
- Position buttons in consistent locations in the UI.
- Use short yet descriptive labels ({verb} + {noun}).
- Use strong verbs to encourage action.
- Avoid unnecessary words and articles such as the, an, or a.
