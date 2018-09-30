The simplest way to use toasts from LiveChat Design System is using our ToastProvider and ToastConsumer components.
These components are based on new React context API.

### Usage
- wrap your components with `ToastProvider` which makes the ToastProvider methods available to the rest of your app:
- use `ToastContext` to get access to toast methods

```js
initialState = { currentToastId: null, vertical: 'top', horizontal: 'center' };

const ButtonWithToast = ({ notification, children }) => {
  const onClick = () => {
    
    let toastId = state.currentToastId;
    // if (!state.currentToastId) {
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
      toastId = notification.add(opts);
    // } else {
    //   notification.remove(toastId);
    //   toastId = null;
    // }
    setState({
      currentToastId: toastId
    });
  }

  return <Button onClick={onClick}>{children}</Button>
}

const ToastedButton = notificationConnect(ButtonWithToast);
<div>
<NotificationProvider>
  <ToastConsumerNew horizontalPosition="center" fixed verticalPosition="top" />
  <ToastConsumerNew horizontalPosition="left" fixed verticalPosition="top" />
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