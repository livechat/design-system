You can use `ToastWrapper` component to position your toasts.

```js
toasts = [
  { toastId: 1, variant: 'success', content: 'First toast' },
  { toastId: 2, variant: 'info', content: 'Second toast' }
];

<div style={{position: 'relative', width: '100%', height: '200px'}}>
  <ToastWrapper
    fixed={false}
    verticalPosition='bottom'
    horizontalPosition='left'
    toasts={toasts}
  />
</div>
```