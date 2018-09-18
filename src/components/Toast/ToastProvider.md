The simplest way to use toasts from LiveChat Design System is using our ToastProvider and ToastConsumer components.
These components are based on new React context API.

### Usage
- wrap your components with `ToastProvider` which makes the ToastProvider methods available to the rest of your app:
- use `ToastContext` to get access to toast methods

To create a new toast just use one of method. Each of these methods returns id of created toast.
```js static
{
  success: (opts) => {/* ... */},
  info: (opts) => {/* ... */},
  warning: (opts) => {/* ... */},
  error: (opts) => {/* ... */},
  notification: (opts) => {/* ... */}
}
```
Available options passed as arguments to method:
```js static
{
  content, /* type: node */
  horizontalPosition, /* type: one of ['left', 'right', 'center'] */
  verticalPosition, /* type: one of ['top', 'bottom'] */
  removable, /* type: bool */
  onClose, /* type: func */
  autoHideDelayTime: /* type: number (miliseconds) */
}
```
To remove toast use:
```js static
{
  removeToast: (id) => {/* ... */},
  removeAllToasts: () => {/* ... */}
}
```

### Available Toast positions
You can set vertical and horizontal position of a Toast.
```js static
vertical = ['top', 'bottom'];
horizontal = ['left', 'right', 'center'];
```

```js
initialState = { currentToastId: null, vertical: 'top', horizontal: 'center' };

const onClick = (toast) => {
  let toastId = state.currentToastId;
  if (!state.currentToastId) {
    const opts = {
      content: 'Toast showed!',
      horizontalPosition: state.horizontal,
      verticalPosition: state.vertical,
    };
    toastId = toast.success(opts);
  } else {
    toast.removeToast(toastId);
    toastId = null;
  }
  setState({
    currentToastId: toastId
  });
}

<ToastProvider itemsLimit={6}>
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
      <Button onClick={() => onClick(toast)}>{(state.currentToastId) ? 'Hide' : 'Show'} toast</Button>
    )}
  </ToastConsumer>
</ToastProvider>
```

### Toasts positioned relative to container
```js

initialState = { currentToastId: null };

const ButtonWithToast = ({ toast, children }) => {
  const onClick = () => {
    let toastId = state.currentToastId;
    if (!state.currentToastId) {
      const opts = {
        content: 'Toast showed!',
        removable: false,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      };
      toastId = toast.notification(opts);
    } else {
      toast.removeToast(toastId);
      toastId = null;
    }
    setState({
      currentToastId: toastId
    });
  }

  return <Button onClick={onClick}>{children}</Button>
}

const ToastedButton = withToast(ButtonWithToast);

<div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '200px'}}>
  <ToastProvider fixed={false}>
    <ToastedButton>{state.currentToastId ? 'Hide toast' : 'Show toast'}</ToastedButton>
  </ToastProvider>
</div>
```

### Fixed Toast with auto-hide duration

```js
const ButtonWithToast = ({ toast, children }) => {
  const createRandomToast = () => {
    const variants = ['success', 'warning', 'error', 'info', 'notification'];
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

    return toast[randomVariant](opts);
  }

  return <Button onClick={createRandomToast}>{children}</Button>
}

const ToastedButton = withToast(ButtonWithToast);

<div>
  <ToastProvider itemsLimit={20}>
    <ToastedButton>Show toast</ToastedButton>
  </ToastProvider>
</div>
```
