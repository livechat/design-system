Toast is a small message that by default shows up in the top middle of the screen. It disappears on its own after a few seconds. It provides a feedback about an operation for user.

### Fixed Toast with auto-hide duration

```js
const toastSystem = new ToastSystem();

<div>
  <ToastProvider attachApi={toastSystem.setProvider} fixed />
  <Button onClick={() => toastSystem.addToast({
    content: 'Toast showed!',
    variant: 'success'
  })}>Show toast</Button>
  <Button onClick={() => toastSystem.addToast({
    content: 'Toast showed!',
    variant: 'error'
  })}>Show toast</Button>
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
const toastSystem = new ToastSystem();

setTimeout(() => {
  toastSystem.addToast({content: 'Message sent!', variant: 'success'});
}, 0);

<ToastProvider attachApi={toastSystem.setProvider} fixed={false}/>

```

#### Warning Toast

```js
<ToastWrapper fixed={false} elements={[
  {id: '1', content: 'Check if everything is fine.', variant: 'warning'}
]} />
```

#### Error Toast

```js
<ToastWrapper fixed={false} elements={[
  {id: '1', content: 'Message could not be sent.', variant: 'error'}
]} />
```

#### Info Toast

```js
<ToastWrapper fixed={false} elements={[
  {id: '1', content: 'Sending message...', variant: 'info'}
]} />
```

#### Notification Toast

```js
<ToastWrapper fixed={false} elements={[
  {id: '1', content: 'Notification message', variant: null}
]} />
```