### Toast

Fixed & Autohide Toast
```js
initialState = { openToast: false };

<div>
    <Button onClick={() => setState({openToast: true})}>Show toast</Button>
    {(state.openToast && 
      <Toast
        success
        hideDuration={5000}
        onClose={() => setState({openToast: false})}
      >
        Toast showed!
      </Toast>
    )}
</div>
```

### Close Toast

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