### SearchBar


### Compact search bar

Used for mobile devices or smaller resolution designs

```js
const onChange = value => {
  console.log('Search term: ', value);
}
<SearchBar collapsable onChange={onChange} />
```

### Search bar with onChange handler

Most common use case for search bar is with onChange handler. It can be enhanced with debounce method to reduce many callbacks. It's presented with loader in this example

```js
initialState = {
  loading: false
};
const onChange = value => {
  console.log('Search term: ', value);
    setTimeout(function() {
    setState({ loading: true })
  }, 1000);
  setTimeout(function() {
    setState({ loading: false })
  }, 2000);
}
<SearchBar onChange={onChange} loading={state.loading} />
```

### Search bar with onSubmit handler

The search is triggered after pressing "enter" key. It's the second way of using search bar and it's used only if we want to search by one condition

```js
const onSubmit = value => {
  console.log('Search term: ', value);
}
<SearchBar onSubmit={onSubmit} />
```

### Search bar with debounced search

Search bar with debounce and onChange handler. Debounce let's you slow down the process of searching for a term. Useful if we know that this feature will be used for a longer period of time for example on archive section

```js
const onChange = value => {
  console.log('Search term: ', value);
}
<SearchBar debounceTime={1000} onChange={onChange} />
```