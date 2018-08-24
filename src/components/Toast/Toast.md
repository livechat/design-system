Toast is a small message that by default shows up in the top middle of the screen. It disappears on its own after a few seconds. It provides a feedback about an operation for user.

### Fixed Toast with auto-hide duration

```js
initialState = { openToast: false };

<div>
    <Button onClick={() => setState({openToast: true})}>Show toast</Button>
    {(state.openToast && 
      <Toast
        success
        autoHideDuration={5000}
        onClose={() => setState({openToast: false})}
      >
        Toast showed! 
      </Toast>
    )}
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
      <Toast
        success
        horizontalPosition={state.horizontal}
        verticalPosition={state.vertical}
        onClose={() => setState({openToast: !state.openToast})}
      >
        Toast showed!
      </Toast>
    )}
</div>
```

### Toast types

#### Success toast

```js
<Toast success fixed={false}>Message sent!</Toast>
```

#### Warning Toast

```js
<Toast warning fixed={false}>Check if everything is fine.</Toast>
```

#### Error Toast

```js
<Toast error fixed={false}>Message could not be sent.</Toast>
```

#### Info Toast

```js
<Toast info fixed={false}>Sending message...</Toast>
```

#### Notification Toast

```js
<Toast fixed={false}>Notification message</Toast>
```