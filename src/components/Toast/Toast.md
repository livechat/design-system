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
    const variants = ['success', 'warning', 'error', 'info', 'default'];
    const horizontalPositions = ['left', 'center', 'right'];
    const verticalPositions = ['top', 'bottom'];

    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    const randomHorizontalPosition = horizontalPositions[Math.floor(Math.random() * horizontalPositions.length)];
    const randomVerticalPosition = verticalPositions[Math.floor(Math.random() * verticalPositions.length)];

    const opts = {
      content: 'Toast showed!',
      autoHideDelayTime: 2000,
      removable: true,
      horizontalPosition: randomHorizontalPosition,
      verticalPosition: randomVerticalPosition
    };

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
initialState = { isToastVisible: false, vertical: 'top', horizontal: 'center' };

const onClick = (toast) => {
  if (!state.isToastVisible) {
    const opts = {
      content: 'Toast showed!',
      horizontalPosition: state.horizontal,
      verticalPosition: state.vertical,
      onClose: onClick
    };
    toast.success(opts);
  } else {
    toast.removeAllToasts();
  }

  setState({
    isToastVisible: !state.isToastVisible
  });
}

<ToastProvider itemsLimit={6} fixed>
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
  <ToastConsumer>
    {toast => (
      <Button onClick={() => onClick(toast)}>{(state.isToastVisible) ? 'Hide' : 'Show'} toast</Button>
    )}
  </ToastConsumer>
</ToastProvider>
```
