The simplest way to use toasts from LiveChat Design System is using our ToastProvider and ToastConsumer components.
These components are based on new React context API.

### Usage
- wrap your components with `NotificationProvider` which makes the NotificationProvider methods available to the rest of your app,
- use consumer component (i.e. `ToastConsumer`) where you need your notifications to appear,
- use `NotificationContext` to get access to toast methods

```js
initialState = { currentToastId: null, vertical: 'top', horizontal: 'center' };

const ButtonWithToast = ({ notificationSystem, children }) => {
  const onClick = () => {
    
    let toastId = state.currentToastId;
    if (!state.currentToastId) {
      const opts = {
        type: 'toast',
        payload: {
          variant: 'success',
          content: 'Toast showed!',
          horizontalPosition: state.horizontal,
          verticalPosition: state.vertical,
          removable: true
        }
      };
      toastId = notificationSystem.add(opts);
    } else {
      notificationSystem.remove(toastId);
      toastId = null;
    }
    setState({
      currentToastId: toastId
    });
  }

  return <Button onClick={onClick}>{children}</Button>
}

const ToastedButton = notificationConnect(ButtonWithToast);

<div>
  <NotificationProvider>
    <ToastConsumer horizontalPosition="center" fixed verticalPosition="top" />
    <ToastConsumer horizontalPosition="center" fixed verticalPosition="bottom" />
    <ToastConsumer horizontalPosition="left" fixed verticalPosition="top" />
    <ToastConsumer horizontalPosition="left" fixed verticalPosition="bottom" />
    <ToastConsumer horizontalPosition="right" fixed verticalPosition="top" />
    <ToastConsumer horizontalPosition="right" fixed verticalPosition="bottom" />
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
      <ToastedButton>{(state.currentToastId) ? 'Hide' : 'Show'} toast</ToastedButton>
    </div>
  </NotificationProvider>
</div>
```

Use NotificationSystem components to display Toasts with visible items limit and queue.

```js
const ButtonWithToast = ({ notificationSystem, children }) => {
  const createRandomToast = () => {
    const variants = ['success', 'warning', 'error', 'info', 'notification'];
    const horizontalPositions = ['left', 'center', 'right'];
    const verticalPositions = ['top', 'bottom'];

    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    const randomHorizontalPosition = horizontalPositions[Math.floor(Math.random() * horizontalPositions.length)];
    const randomVerticalPosition = verticalPositions[Math.floor(Math.random() * verticalPositions.length)];

    const opts = {
      type: 'toast',
      autoHideDelayTime: 5000,
      payload: {
        variant: randomVariant,
        content: 'Toast showed!',
        horizontalPosition: randomHorizontalPosition,
        verticalPosition: randomVerticalPosition,
        removable: true,
        action: {
          label: 'Action',
          handler: () => {
            console.log('action');
          },
          closeOnClick: true
        }
      }
    };

    return notificationSystem.add(opts);
  }

  return <Button onClick={createRandomToast}>{children}</Button>
}

const ToastedButton = notificationConnect(ButtonWithToast);

<div>
  <NotificationProvider itemsLimit={5} queueLimit={20}>
    <ToastConsumer horizontalPosition="center" fixed verticalPosition="top" />
    <ToastConsumer horizontalPosition="center" fixed verticalPosition="bottom" />
    <ToastConsumer horizontalPosition="left" fixed verticalPosition="top" />
    <ToastConsumer horizontalPosition="left" fixed verticalPosition="bottom" />
    <ToastConsumer horizontalPosition="right" fixed verticalPosition="top" />
    <ToastConsumer horizontalPosition="right" fixed verticalPosition="bottom" />
    <div>
      <ToastedButton>Show toast</ToastedButton>
    </div>
  </NotificationProvider>
</div>
```
