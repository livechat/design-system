### SearchBar

This will be info about SearchBar component

### No props

```js
<SearchBar />
```

### Loading state

```js
<SearchBar loading />
```

### Search bar with error

```js
<SearchBar error="Value is too long" />
```

### Search bar with onChange handler

```js
const onChange = value => {
  console.log('Search term: ', value);
}
<SearchBar onChange={onChange} />
```

### Search bar with onSubmit handler

```js
const onSubmit = value => {
  console.log('Search term: ', value);
}
<SearchBar onSubmit={onSubmit} />
```

### Compact search bar

```js
<SearchBar compact />
```

### Search bar with increased debounce

```js
const onChange = value => {
  console.log('Search term: ', value);
}
<SearchBar onChange={onChange} debounceInMs={1000} />
```

```js
const onChange = value => {
  console.log('Search term: ', value);
}
<SearchBar onChange={onChange} value='testing' />
```