You can use `ToastWrapper` component to position your toasts.

```js
const ContentComponent = (props) => <div>{props.children}</div>;
toasts = [
  { id: 1, variant: 'success', content: <ContentComponent>First</ContentComponent> },
  { id: 2, variant: 'info', content: 'Second toast' }
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