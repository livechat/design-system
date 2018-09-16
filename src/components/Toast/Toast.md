Toast is a small message that by default shows up in the top middle of the screen. It disappears on its own after a few seconds. It provides a feedback about an operation for user.

### Toast types
Design System

#### Success toast

```js
<Toast variant='success'>Message sent!</Toast>
```

#### Warning Toast

```js
<Toast variant='warning'>Check if everything is fine.</Toast>
```

#### Error Toast

```js
<Toast variant='error'>Message could not be sent.</Toast>
```

#### Info Toast

```js
<Toast variant='info'>Sending message...</Toast>
```

#### Notification Toast

```js
<Toast>Notification message</Toast>
```

### Fixed Toast with auto-hide duration

```js
const ButtonWithToast = props => {
  const createRandomToast = () => {
    const opts = {
      content: 'Toast showed!',
      autoHideDelayTime: 2000,
      removable: true
    };
    const variants = ['success', 'warning', 'error', 'info', 'default'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];

    return props.toast[randomVariant](opts);
  }

  return <Button onClick={createRandomToast}>{props.children}</Button>
}

const ToastedButton = withToast(ButtonWithToast);

<div>
  <ToastProvider itemsLimit={6} fixed>
    <ToastedButton>Show toast</ToastedButton>
  </ToastProvider>
</div>
```

### Positions

You can set vertical and horizontal position of a Toast. Available options are:
- vertical: `'top' | 'bottom'`
- horizontal: `'left' | 'center' | 'right'`

```js
initialState = { openToast: false, vertical: 'top', horizontal: 'center' };

<div>
    <div style={{marginBottom: "15px"}}>
        <label style={{marginRight: "15px"}}>Vertical position</label>
        <select value={state.vertical} onChange={(event) => setState({ vertical: event.target.value})}>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
        </select>
    </div>
    <div style={{marginBottom: "15px"}}>
        <label style={{marginRight: "15px"}}>Horizontal position</label>
        <select value={state.horizontal} onChange={(event) => setState({ horizontal: event.target.value})}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
        </select>
    </div>
    <Button onClick={() => setState({openToast: !state.openToast})}>{(state.openToast) ? 'Hide' : 'Show'} toast</Button>
    {(state.openToast && 
      <ToastWrapper
        success
        horizontalPosition={state.horizontal}
        verticalPosition={state.vertical}
        onClose={() => setState({openToast: !state.openToast})}
      >
        Toast showed!
      </ToastWrapper>
    )}
</div>
```
