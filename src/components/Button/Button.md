### Primary Button

Use when there is an action that is more important than any other actions and you need to draw attention to it. Don’t use more than one primary button per screen to avoid confusing users. Not every screen needs a primary button.
```js
<Button primary>Primary Button</Button>
```

### Basic Button

The standard button for most use cases. Only use another style if a button requires more or less visual attention.
```js
<Button>Basic Button</Button>
```

### Destructive Button

Use as a final confirmation for a destructive action such as deleting. These are found mostly in confirmation modals.
```js
<Button destructive>Destructive Button</Button>
```

### Button Sizes
#### Compact
Use in a table or list where space is tight.
```js
<Button size="compact" primary>Compact Button</Button>
```
#### Regular
```js
<Button primary>Regular Button</Button>
```
#### Large
Use for the main call to action in empty states or for calls to action shown with large illustrations.
```js
<Button size="large" primary>Large Button</Button>
```
#### Full-width

Button expanded to the full width to fill the parent container (max-width: 320px)
```js
<Button fullWidth primary>Full-width Button</Button>
```

### Best practices
 - Prioritize most important action; don’t use more than 1 primary button per screen.
 - Position buttons in consistent locations in the UI.
 - Use short yet descriptive labels ({verb} + {noun}).
 - Use strong verbs to encourage action.
 - Avoid unnecessary words and articles such as the, an, or a.