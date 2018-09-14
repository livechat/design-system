Toast is a small message that by default shows up in the top middle of the screen. It disappears on its own after a few seconds. It provides a feedback about an operation for user.

### Fixed Toast with auto-hide duration

```js
const toastSystem = createToastSystem();

const createRandomToast = () => {
  const opts = {
    content: 'Toast showed!',
    autoHideDelayTime: 2000,
    removable: true
  };
  const variants = ['success', 'warning', 'error', 'info', 'default'];
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];

  return toastSystem[randomVariant](opts);
}

<div>
  <ToastContainer itemsLimit={3} setToastSystem={toastSystem.setContainer} fixed />
  <Button onClick={createRandomToast}>Show toast</Button>
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

### Toast types

#### Success toast

```js
const toastSystem = createToastSystem();

setTimeout(() => {
  toastSystem.success({content: 'Message sent!'});
}, 0);

<ToastContainer setToastSystem={toastSystem.setContainer} fixed={false}/>

```

#### Warning Toast

```js
const toastSystem = createToastSystem();

setTimeout(() => {
  toastSystem.warning({content: 'Check if everything is fine.'});
}, 0);

<ToastContainer setToastSystem={toastSystem.setContainer} fixed={false}/>
```

#### Error Toast

```js
const toastSystem = createToastSystem();

setTimeout(() => {
  toastSystem.error({content: 'Message could not be sent.'});
}, 0);

<ToastContainer setToastSystem={toastSystem.setContainer} fixed={false}/>
```

#### Info Toast

```js
const toastSystem = createToastSystem();

setTimeout(() => {
  toastSystem.info({content: 'Sending message...'});
}, 0);

<ToastContainer setToastSystem={toastSystem.setContainer} fixed={false}/>
```

#### Notification Toast

```js
const toastSystem = createToastSystem();

setTimeout(() => {
  toastSystem.default({content: 'Notification message'});
}, 0);

<ToastContainer setToastSystem={toastSystem.setContainer} fixed={false}/>
```