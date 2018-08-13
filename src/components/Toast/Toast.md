### Notification Toast

Success toast
```js
<Toast success fixed={false}>Message sent!</Toast>
```

### Warning Toast

Warning Toast
```js
<Toast warning fixed={false}>Check if everything is fine.</Toast>
```

### Error Toast

Error Toast
```js
<Toast error fixed={false}>Message could not be sent.</Toast>
```

### Info Toast

Info Toast
```js
<Toast info fixed={false}>Sending message...</Toast>
```

### Notification Toast

Notification Toast
```js
<Toast fixed={false}>Notification message</Toast>
```

### Close Toast

Close Toast
```js
initialState = { openToast: true };

<div>
    {(!state.openToast && 
      <Button onClick={() => setState({openToast: true})}>
        Show toast
      </Button>
    )}
    {(state.openToast && 
      <Toast
        success
        fixed={false}
        onClose={() => setState({openToast: false})}
      >
        Toast showed!
      </Toast>
    )}
</div>
```

### Fixed Toast

Fixed Toast
```js
initialState = { openToast: false };

<div>
    <Button onClick={() => setState({openToast: true})}>Show toast</Button>
    {(state.openToast && 
      <Toast
        success
        onClose={() => setState({openToast: false})}
      >
        Toast showed!
      </Toast>
    )}
</div>
```

### Autohide Toast

Autohide Toast
```js
initialState = { openToast: false };

<div>
    <Button onClick={() => setState({openToast: true})}>Show toast</Button>
    {(state.openToast && 
      <Toast
        success
        hideDuration={2000}
        onClose={() => setState({openToast: false})}
      >
        Toast showed!
      </Toast>
    )}
</div>
```